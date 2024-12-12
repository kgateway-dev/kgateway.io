---
title: Kubernetes service
weight: 20
---

Instead of referencing a Kubernetes service in your HTTPRoute directly, you can create an Upstream resource that represents your Kubernetes service and reference that Upstream in your HTTPRoute. 

With Kubernetes Upstream resources, you can configure additional settings for your Kubernetes service that cannot be configured when using the KubernetesService resource. For example, you can require communication to your Kubernetes service to use the HTTP/2 protocol, or add health checks. Because Upstreams bypass the `kube-proxy`, you can also improve load balancing times for your workloads. 

{{% callout type="info" %}}
Upstreams of type `kube` are automatically created when service discovery is enabled in {{< reuse "docs/snippets/product-name.md" >}}. However, you can also manually create the Upstream in your cluster as shown in this guide. 
{{% /callout %}}

## Before you begin

{{< reuse "docs/snippets/prereq.md" >}}

## Set up the Upstream

1. Create the Petstore sample app. 
   ```sh
   kubectl apply -f https://raw.githubusercontent.com/solo-io/gloo/v1.16.x/example/petstore/petstore.yaml
   ```
   
2. Create an Upstream resource for the Petstore app. 
   ```yaml
   kubectl apply -f- <<EOF
   apiVersion: gloo.solo.io/v1
   kind: Upstream
   metadata:
     name: petstore
     namespace: gloo-system
   spec:
     kube:
       serviceName: petstore
       serviceNamespace: default
       servicePort: 8080
   EOF
   ```
   
3. Create an HTTPRoute resource that references the Upstream that you created. 
   ```yaml
   kubectl apply -f- <<EOF
   apiVersion: gateway.networking.k8s.io/v1
   kind: HTTPRoute
   metadata:
     name: kube-upstream
     namespace: gloo-system
   spec:
     parentRefs:
     - name: http
       namespace: gloo-system
     hostnames:
       - kube.example
     rules:
       - backendRefs:
         - name: petstore
           kind: Upstream
           group: gloo.solo.io
   EOF
   ```

4. Send a request to the Petstore app. 
   {{< tabs items="Cloud Provider LoadBalancer,Port-forward for local testing" >}}
   {{% tab %}}
   ```sh
   curl -vik http://$INGRESS_GW_ADDRESS:8080/api/pets -H "host: kube.example:8080"
   ```
   {{% /tab %}}
   {{% tab %}}
   ```sh
   curl -vik localhost:8080/api/pets -H "host: kube.example:8080" 
   ```
   {{% /tab %}}
   {{< /tabs >}}
   
   Example output: 
   ```
   ...
   * Mark bundle as not supporting multiuse
   < HTTP/1.1 200 OK
   HTTP/1.1 200 OK
   ...
   [{"id":1,"name":"Dog","status":"available"},{"id":2,"name":"Cat","status":"pending"}]
   ```
   
## Cleanup

{{< reuse "docs/snippets/cleanup.md" >}}

```sh
kubectl delete httproute kube-upstream -n gloo-system
kubectl delete upstream petstore -n gloo-system
kubectl delete -f https://raw.githubusercontent.com/solo-io/gloo/v1.16.x/example/petstore/petstore.yaml
```
   
   
   
   
   