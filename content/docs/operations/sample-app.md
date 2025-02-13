---
title: Sample app
weight: 7
description: Deploy httpbin as a sample app.
---

The httpbin app lets you test your API gateway by sending requests to it and receiving responses.

## Before you begin

- Set up {{< reuse "docs/snippets/product-name.md" >}} by following the [Quick start](/docs/quickstart/) or [Installation](/docs/operations/install/) guides.

## Deploy a sample app {#deploy-app}

The following configuration file creates the httpbin app, as well as the gateway resources that you need to expose the app. To review the source file, see [the kgateway project](https://github.com/kgateway-dev/kgateway/blob/main/examples/httpbin.yaml).

```shell
kubectl apply -f https://raw.githubusercontent.com/kgateway-dev/kgateway/refs/heads/main/examples/httpbin.yaml
```

Example output:

```txt
namespace/httpbin created
serviceaccount/httpbin created
service/httpbin created
deployment.apps/httpbin created
gateway.gateway.networking.k8s.io/http created
httproute.gateway.networking.k8s.io/httpbin created
```

## Verify your sample app {#verify-app}

1. Verify that the httpbin app is running.

   ```sh
   kubectl get pods -n httpbin
   ```

   Example output:

   ```txt
   NAME                             READY   STATUS     RESTARTS    AGE
   gloo-proxy-http-7dd94b74-m8rb5   1/1     Running    0           13s
   httpbin-5cf4b9b48f-w2gqd         2/2     Running    0           13s
   ```

2. Review the Gateway resource with an HTTP listener that was created. Note the following features:
   
   * The gateway is created in the same `httpbin` namespace as your app. You might also create your gateways in the `kgateway-system` namespace, just to keep all your gateway resources in one place.
   * The gateway can serve HTTP resources from all namespaces.
   * Depending on your load balancer setup, you can review the external address that is assigned to the gateway. It might take a few minutes for the address to be assigned. 
   
   ```sh
   kubectl get gateway http -n httpbin
   ```
   
   Example output:

   ```txt
   NAME   CLASS          ADDRESS                                                                  PROGRAMMED   AGE
   http   httpbin   a3a6c06e2f4154185bf3f8af46abf22e-139567718.us-east-2.elb.amazonaws.com   True         93s
   ```

3. Review the HTTPRoute resource that was created on the gateway.

   ```sh
   kubectl get -n httpbin httproute/httpbin -o yaml
   ```

   | Field | Description |
   | ----- | ----------- |
   |`spec.parentRefs`|The name and namespace of the gateway resource that serves the route. In this example, you use the HTTP gateway that you created earlier.  |
   |`spec.hostnames`|A list of hostnames that the route is exposed on. The example uses `www.example.com` as the hostname. |
   |`spec.rules.backendRefs`| The Kubernetes service that serves the incoming request. In this example, requests to `www.example.com` are forwarded to the httpbin app on port 9000. Note that you must create the HTTP route in the same namespace as the service that serves that route. To create the HTTP route resource in a different namespace, you must create a ReferenceGrant resource to allow the HTTP route to forward requests to a service in a different namespace. For more information, see the [Kubernetes API Gateway documentation](https://gateway-api.sigs.k8s.io/api-types/referencegrant/). |
   | `status` | The status of the HTTPRoute resource. Check for `Accepted` and `ResolvedRefs` messages. The `parentRef` refers to the Gateway that that HTTPRoute is exposed on. |

## Send a request {#send-request}

Now that your httpbin app is running and you verified that the gateway resources are created, you can send a request to the app. The steps vary depending on your load balancer setup.

{{< tabs items="Cloud Provider LoadBalancer,Port-forward for local testing" >}}
{{% tab %}}
1. Get the external address of the gateway and save it in an environment variable.
   
   ```sh
   export INGRESS_GW_ADDRESS=$(kubectl get svc -n kgateway-system gloo-proxy-http -o=jsonpath="{.status.loadBalancer.ingress[0]['hostname','ip']}")
   echo $INGRESS_GW_ADDRESS
   ```

2. Send a request to the httpbin app and verify that you get back a 200 HTTP response code. Note that it might take a few seconds for the load balancer service to become fully ready and accept traffic.
   
   ```sh
   curl -i http://$INGRESS_GW_ADDRESS:8080/headers -H "host: www.example.com:8080"
   ```
   
   Example output: 
   
   ```txt
   HTTP/1.1 200 OK
   server: envoy
   date: Wed, 17 Jan 2024 17:32:21 GMT
   content-type: application/json
   content-length: 211
   access-control-allow-origin: *
   access-control-allow-credentials: true
   x-envoy-upstream-service-time: 2
   ```
{{% /tab %}}
{{% tab %}}
1. Port-forward the `kgateway-proxy-http` pod on port 8080. 
   
   ```sh
   kubectl port-forward deployment/gloo-proxy-http -n kgateway-system 8080:8080
   ```

2. Send a request to the httpbin app and verify that you get back a 200 HTTP response code. 
   
   ```sh
   curl -i localhost:8080/headers -H "host: www.example.com"
   ```
   
   Example output: 
   
   ```txt
   HTTP/1.1 200 OK
   server: envoy
   date: Wed, 17 Jan 2024 17:32:21 GMT
   content-type: application/json
   content-length: 211
   access-control-allow-origin: *
   access-control-allow-credentials: true
   x-envoy-upstream-service-time: 2
   ```
{{% /tab %}}
{{< /tabs >}}

## Next steps

Now that you have {{< reuse "docs/snippets/product-name.md" >}} set up and running, check out the following guides to expand your API gateway capabilities.

- Add routing capabilities to your httpbin route by using the [Traffic management](/docs/traffic-management) guides. 
- Explore ways to make your routes more resilient by using the [Resiliency](/docs/resiliency) guides. 
- Secure your routes with external authentication and rate limiting policies by using the [Security](/docs/security) guides.

## Cleanup

{{< reuse "docs/snippets/cleanup.md" >}}

```sh
kubectl delete -f https://raw.githubusercontent.com/kgateway-dev/kgateway/refs/heads/main/examples/httpbin.yaml
```
