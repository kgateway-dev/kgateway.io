---
title: Upstreams
weight: 20
---


Use Upstream resources to define a backing destination for a route that you want {{< reuse "docs/snippets/product-name.md" >}} to route to.

Upstreams can be compared to a [cluster](https://www.envoyproxy.io/docs/envoy/latest/api-v3/config/cluster/v3/cluster.proto) in Envoy terminology. Each Upstream must define a type. Supported types include `static` and `kubernetes`. Each type is handled by a different plugin in {{< reuse "docs/snippets/product-name.md" >}}. For more information, see [Types](#types). 

Upstreams allow you to add additional configuration to instruct {{< reuse "docs/snippets/product-name.md" >}} how to handle the request to the backing destination. For example, you can define that the destination requires the requests to be sent with the HTTP/2 protocol or that you want requests to be load balanced by using a specific load balancing algorithm. To route to an Upstream resource, you reference the Upstream in the `backendRefs` section of your HTTPRoute, just like you do when routing to a Kubernetes service directly. For more information, see [Routing](#routing). 

You can manually create Upstreams or enable Upstream discovery in {{< reuse "docs/snippets/product-name.md" >}} to automatically create Upstreams for any Kubernetes service that is created and discovered in the cluster. 

For more information, see the [Upstream API reference](/docs/reference/api/upstream). 

## Types

Check out the following guides for examples on how to use the supported Upstreams types with {{< reuse "docs/snippets/product-name.md" >}}. 

{{< cards >}}
  {{< card link="static" title="Static IP address or hostname" >}}
  {{< card link="kubernetes" title="Kubernetes Service" >}}
  {{< card link="lambda" title="AWS Lambda" >}}
  {{< card link="http2" title="HTTP/2" >}}
{{< /cards >}}

<!-- TODO supported upstreams

You can create Upstreams of type `static`, `kube`, `aws`, and `gcp`. 

{{% callout type="info" %}}
Upstreams of type `azure`, `consul`, `grpc`, `rest`, or `awsEc2` are not supported in {{< reuse "docs/snippets/product-name.md" >}} when using the {{< reuse "docs/snippets/k8s-gateway-api-name.md" >}}. You can use these types of Upstreams when using a gateway proxy that is configured for the {{< reuse "docs/snippets/product-name.md" >}} API. For more information, see [Destination types in the {{< reuse "docs/snippets/product-name.md" >}} ({{< reuse "docs/snippets/product-name.md" >}} API) documentation](https://docs.solo.io/gloo-edge/latest/guides/traffic_management/destination_types/).
{{% /callout %}}

Check out the following guides for examples on how to use Upstreams with {{< reuse "docs/snippets/product-name.md" >}}:  
* [Static](/traffic-management/destination-types/upstreams/static/)
* [Kubernetes service](/traffic-management/destination-types/upstreams/kubernetes/)
* [Google Cloud Run](/traffic-management/destination-types/upstreams/cloud-run/)
* [AWS Lambda](/traffic-management/destination-types/upstreams/lambda/)
* [HTTP/2](/traffic-management/destination-types/upstreams/http2/)

-->

<!--

### Static

Static Upstreams are the 

### Kubernetes
-->

## Discovery

{{< reuse "docs/snippets/discovery-about.md" >}}

To enable service discovery: 

1. Get the current values for your Helm chart. 
   ```sh
   helm get values gloo-gateway -n gloo-system -o yaml > gloo-gateway.yaml
   open gloo-gateway.yaml
   ```

2. In your Helm values file, enable service discovery. 
   ```yaml
   gloo:
     discovery:
       enabled: true
   ```

3. Upgrade your {{< reuse "docs/snippets/product-name.md" >}} installation to enable service discovery. 
   ```sh
   helm upgrade -n gloo-system gloo-gateway gloo/gloo\
   --values gloo-gateway.yaml \
   --version {{< reuse "docs/versions/n-patch.md" >}} 
   ```
   
4. Review the Upstream resources that are automatically created for the Kubernetes services that you have in your cluster. 
   ```sh
   kubectl get upstreams -n gloo-system
   ```

## Routing

You can route to an Upstream by simply referencing that Upstream in the `backendRefs` section of your HTTPRoute resource as shown in the following example. Note that if your Upstream and HTTPRoute resources exist in different namespaces, you must create a Kubernetes ReferenceGrant resource to allow the HTTPRoute to access the Upstream.

{{< callout type="warning" >}}
Do not specify a port in the `spec.backendRefs.port` field when referencing your Upstream. The port is defined in your Upstream resource and ignored if set on the HTTPRoute resource.
{{< /callout >}}

```yaml {linenos=table,hl_lines=[13,14,15,16],linenostart=1,filename="upstream-httproute.yaml"}
apiVersion: gateway.networking.k8s.io/v1beta1
kind: HTTPRoute
metadata:
  name: static-upstream
  namespace: default
spec:
  parentRefs:
  - name: http
    namespace: gloo-system
  hostnames:
    - static.example
  rules:
    - backendRefs:
      - name: json-upstream
        kind: Upstream
        group: gloo.solo.io
      filters:
      - type: ExtensionRef
        extensionRef:
          group: gateway.solo.io
          kind: RouteOption
          name: rewrite
```

For an example, see the [Static](/docs/traffic-management/destination-types/upstreams/static/) Upstream guide. 
