---
title: Web Application Firewall (WAF)
weight: 10
description: 
---

## About Web Application Firewalls

WAFs protect your web apps by monitoring, filtering, and blocking potentially harmful HTTP traffic. You write a WAF policy by following a framework and ruleset. Then, you apply the WAF policy to the route for the apps that you want to protect. When Gloo Gateway receives an incoming request for that route (ingress traffic), the WAF intercepts and inspects the network packets and uses the rules that you set in the policy to determine access to the web app. The WAF policy also applies to any outgoing responses (egress traffic) along the route. This setup provides an additional layer of protection between your apps and end users.

In this section, you can learn about the following WAF topics:
* [ModSecurity rule sets](#about-rule-sets)
* [The WAF API](#about-api)

### ModSecurity rule sets {#about-rule-sets}

Gloo Gateway supports the popular Web Application Firewall framework and ruleset [ModSecurity](https://www.github.com/SpiderLabs/ModSecurity) **version 3.0.4**. ModSecurity uses a simple rules language to interpret and process incoming HTTP traffic. Because it is open source, ModSecurity is a flexible, cross-platform solution that incorporates transparent security practices to protect apps against a range web attacks. 

You have several options for using ModSecurity to write WAF policies:
* Use publicly available rule sets that provide a generic set of detection rules to protect against the most common security threats. For example, the [OWASP Core Rule Set](https://github.com/coreruleset/coreruleset) is an open source project that protects apps against a wide range of attacks, including the "OWASP Top Ten."
* Write your own custom rules by following the [ModSecurity rules language](https://github.com/owasp-modsecurity/ModSecurity/wiki/Reference-Manual-(v3.x)). For examples, see [Configure WAF policies](#config).

For more information, see the [WAF API](https://docs.solo.io/gloo-edge/latest/reference/api/github.com/solo-io/gloo/projects/gloo/api/v1/enterprise/options/waf/waf.proto.sk/).

### Understand the WAF API {#about-api}

The WAF filter supports a list of `RuleSet` objects which are loaded into the ModSecurity library. The Gloo Gateway API has a few conveniences built on top of that to allow easier access to the OWASP Core Rule Set (via the [`coreRuleSet`](https://docs.solo.io/gloo-edge/latest/reference/api/github.com/solo-io/gloo/projects/gloo/api/v1/enterprise/options/waf/waf.proto.sk/#coreruleset) field). 

You can disable each rule set on a route independently of other rule sets. Rule sets are applied on top of each other in order. This order means that later rule sets overwrite any conflicting rules in previous rule sets. For more fine-grained control, you can add a custom `rule_str`, which is applied after any files of the rule sets.

Review the following `RuleSet` API example and explanation. For more information, see the [WAF API](https://docs.solo.io/gloo-edge/latest/reference/api/github.com/solo-io/gloo/projects/gloo/api/v1/enterprise/options/waf/waf.proto.sk/).

```proto
message ModSecurity {
    // Disable all rules on the current route
    bool disabled = 1;
    // Global rule sets for the current http connection manager
    repeated RuleSet rule_sets = 2;
    // Custom message to display when an intervention occurs
    string custom_intervention_message = 3;
}

message RuleSet {
    // string of rules which are added directly
    string rule_str = 1;
    // array of files to include
    repeated string files = 3;
}
```

## Before you begin

{{< reuse "docs/snippets/prereq.md" >}}

## Set up a WAF filter

1. Create a VirtualHostOption resource to define your WAF rules. The following example denies requests that have the `User-Agent: scammer` request header with a 403 HTTP response code. In addition, a custom message `ModSecurity intervention! Custom message details here..` is configured.
   ```yaml
   kubectl apply -n gloo-system -f- <<EOF
   apiVersion: gateway.solo.io/v1
   kind: VirtualHostOption
   metadata:
     name: waf
     namespace: gloo-system
   spec:
     options:
       waf:
         customInterventionMessage: 'ModSecurity intervention! Custom message details here..'
         ruleSets:
         - ruleStr: |
             # Turn rule engine on
             SecRuleEngine On
             SecRule REQUEST_HEADERS:User-Agent "scammer" "deny,status:403,id:107,phase:1,msg:'blocked scammer'"
     targetRefs:
     - group: gateway.networking.k8s.io
       kind: Gateway
       name: http
       namespace: gloo-system
   EOF
   ```
   
2. Send a request to the httpbin app without the `User-Agent: scammer` request header. Verify that you get back a 200 HTTP response code.
   {{< tabs items="Gateway-level configuration,Route-level config" >}}
   {{% tab  %}}
   ```sh
   curl -i http://$INGRESS_GW_ADDRESS:8080/status/200 -H "host: www.example.com:8080" 
   ```
   {{% /tab %}}
   {{% tab  %}}
   ```sh
   curl -i localhost:8080/status/200 -H "host: www.example.com" 
   ```
   {{% /tab %}}
   {{< /tabs >}}
   
   Example output: 
   ```
   HTTP/1.1 200 OK
   access-control-allow-credentials: true
   access-control-allow-origin: *
   date: Wed, 24 Apr 2024 21:04:14 GMT
   x-envoy-upstream-service-time: 0
   server: envoy
   transfer-encoding: chunked
   ```

3. Send another request to the httpbin app. This time, you include the `User-Agent: scammer` request header. Verify that you get back a 403 HTTP response code because the WAF policy denies requests when the `User-Agent: scammer` request header is detected. Check that you also see the custom WAF message that you configured in the VirtualHostOption resource.
   {{< tabs items="Gateway-level configuration,Route-level config" >}}
   {{% tab  %}}
   ```sh
   curl -vik http://$INGRESS_GW_ADDRESS:8080/status/200 -H "host: www.example.com:8080" -H User-Agent:scammer 
   ```
   {{% /tab %}}
   {{% tab %}}
   ```sh
   curl -vik localhost:8080/status/200 -H "host: www.example.com" -H User-Agent:scammer 
   ```
   {{% /tab %}}
   {{< /tabs >}}
   
   Example output: 
   ```console {hl_lines=[2,3,13]}
   * Mark bundle as not supporting multiuse
   < HTTP/1.1 403 Forbidden
   HTTP/1.1 403 Forbidden
   < content-length: 55
   content-length: 55
   < content-type: text/plain
   content-type: text/plain
   < date: Wed, 24 Apr 2024 20:45:51 GMT
   date: Wed, 24 Apr 2024 20:45:51 GMT
   < server: envoy
   server: envoy

   ModSecurity intervention! Custom message details here..%  
   ```
   
4. Optional: Clean up the resources that you created. 
   ```sh
   kubectl delete virtualhostoption waf -n gloo-system 
   ```
   