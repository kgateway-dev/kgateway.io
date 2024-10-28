---
title: Uninstall
weight: 720
description: Uninstall {{< reuse "docs/snippets/product-name.md" >}} and related components.
---

If you no longer need your {{< reuse "docs/snippets/product-name.md" >}} environment, you can uninstall the control plane and all gateway proxies. You can also optionally remove related components such as Prometheus and sample apps.

## Uninstall k8sgateway

Remove the {{< reuse "docs/snippets/product-name.md" >}} control plane and gateway proxies.

1. Get all HTTP routes in your environment. 
   ```sh
   kubectl get httproutes -A
   ```

2. Remove each HTTP route. 
   ```sh
   kubectl delete -n <namespace> httproute <httproute-name>
   ```

3. Get all reference grants in your environment. 
   ```sh
   kubectl get referencegrants -A
   ```

4. Remove each reference grant. 
   ```sh
   kubectl delete -n <namespace> referencegrant <referencegrant-name>
   ```

5. Get all gateways in your environment that are configured by the `gloo-gateway` gateway class. 
   ```sh
   kubectl get gateways -A | grep gloo-gateway
   ```

6. Remove each gateway. 
   ```sh
   kubectl delete -n <namespace> gateway <gateway-name>
   ```

7. Uninstall {{< reuse "docs/snippets/product-name.md" >}}.
   {{< tabs items="glooctl,Helm" >}}
   {{% tab %}}
   If you installed {{< reuse "docs/snippets/product-name.md" >}} in a different namespace than `gloo-system`, include the `-n <namespace>` option.
   ```shell
   glooctl uninstall
   ```

   {{% callout type="info" %}}
   By default, the `gloo-system` namespace and {{< reuse "docs/snippets/product-name.md" >}} CRDs created by the `glooctl install` command are not removed. To remove the namespace and CRDs, include the `--all` option.
   ```shell
   glooctl uninstall --all
   ```
   {{% /callout %}}
   {{% /tab %}}
   {{% tab %}}
   1. Uninstall the {{< reuse "docs/snippets/product-name.md" >}} release.
      ```sh
      helm uninstall gloo-gateway -n gloo-system
      ```

   2. Remove the `gloo-system` namespace. 
      ```sh
      kubectl delete namespace gloo-system
      ```
   {{% /tab %}}
   {{< /tabs >}}


8. Remove the Kubernetes Gateway API CRDs. 
   ```sh
   kubectl delete -f https://github.com/kubernetes-sigs/gateway-api/releases/download/v1.0.0/standard-install.yaml
   ```

## Uninstall optional components {#optional}

Remove any optional components that you no longer need, such as sample apps.

1. If you no longer need the Prometheus stack to monitor resources in your cluster, uninstall the release and delete the namespace.
   ```sh
   helm uninstall kube-prometheus-stack -n monitoring
   kubectl delete namespace monitoring
   ```

2. Remove the httpbin sample app.
   ```sh
   kubectl delete namespace httpbin
   ```

3. Remove the Petstore sample app.
   ```sh
   kubectl delete -f https://raw.githubusercontent.com/solo-io/gloo/v1.13.x/example/petstore/petstore.yaml
   ```