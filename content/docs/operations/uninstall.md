---
title: Uninstall
weight: 50
description: Uninstall {{< reuse "docs/snippets/product-name.md" >}} and related components.
---

If you no longer need your {{< reuse "docs/snippets/product-name.md" >}} environment, you can uninstall the control plane and all gateway proxies. You can also optionally remove related components such as Prometheus and sample apps.

## Uninstall kgateway

Remove the {{< reuse "docs/snippets/product-name.md" >}} control plane and gateway proxies.

{{< callout type="info" >}}
Did you use Argo CD to install {{< reuse "docs/snippets/product-name.md" >}}? Skip to the [Argo CD steps](#argocd).
{{< /callout >}}

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
   {{< reuse "docs/snippets/cli-name.md" >}} uninstall
   ```

   {{% callout type="info" %}}
   By default, the `gloo-system` namespace and {{< reuse "docs/snippets/product-name.md" >}} CRDs created by the `{{< reuse "docs/snippets/cli-name.md" >}} install` command are not removed. To remove the namespace and CRDs, include the `--all` option.
   ```shell
   {{< reuse "docs/snippets/cli-name.md" >}} uninstall --all
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


8. Remove the {{< reuse "docs/snippets/k8s-gateway-api-name.md" >}} CRDs. 
   ```sh
   kubectl delete -f https://github.com/kubernetes-sigs/gateway-api/releases/download/v1.0.0/standard-install.yaml
   ```

## Uninstall with ArgoCD {#argocd}

For ArgoCD installations, use the following steps to clean up your environment.

{{< tabs items="Argo CD UI,Argo CD CLI" >}}
{{% tab %}}
1. Port-forward the Argo CD server on port 9999.
   ```sh
   kubectl port-forward svc/argocd-server -n argocd 9999:443
   ```

2. Open the [Argo CD UI](https://localhost:9999/applications).

3. Log in with the `admin` username and `kgateway` password.
4. Find the application that you want to delete and click **x**. 
5. Select **Foreground** and click **Ok**. 
6. Verify that the pods were removed from the `gloo-system` namespace. 
   ```sh
   kubectl get pods -n gloo-system
   ```
   
   Example output: 
   ```txt
   No resources found in gloo-system namespace.
   ```

{{% /tab %}}
{{% tab %}}
1. Port-forward the Argo CD server on port 9999.
   ```sh
   kubectl port-forward svc/argocd-server -n argocd 9999:443
   ```
   
2. Log in to the Argo CD UI. 
   ```sh
   argocd login localhost:9999 --username admin --password kgateway --insecure
   ```
   
3. Delete the application.
   
   ```sh
   argocd app delete gloo-gateway-oss-helm --cascade --server localhost:9999 --insecure
   ```
   
   Example output: 
   ```txt
   Are you sure you want to delete 'gloo-gateway-oss-helm' and all its resources? [y/n] y
   application 'gloo-gateway-oss-helm' deleted   
   ```

4. Verify that the pods were removed from the `gloo-system` namespace. 
   ```sh
   kubectl get pods -n gloo-system
   ```
   
   Example output: 
   ```txt  
   No resources found in gloo-system namespace.
   ```
{{% /tab %}}
{{< /tabs >}}

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