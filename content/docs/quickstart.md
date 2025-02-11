---
linkTitle: "Get started"
title: Get started with kgateway
weight: 1
next: /docs/about
---

Get started with {{< reuse "docs/snippets/product-name.md" >}}, a cloud-native Layer 7 proxy that is based on the [Envoy](https://www.envoyproxy.io/) and [{{< reuse "docs/snippets/k8s-gateway-api-name.md" >}}](https://gateway-api.sigs.k8s.io/) projects.

## Before you begin

These quick start steps assume that you have `kubectl` and `helm` installed. For full installation instructions, see [Install {{< reuse "docs/snippets/product-name.md" >}}](/docs/operations/install).

## Install kgateway

1. Use a Kubernetes cluster. For quick testing, you can use [Kind](https://kind.sigs.k8s.io/).

   ```sh
   kind create cluster
   ```

2. Deploy the Kubernetes Gateway API CRDs.

   ```sh
   kubectl apply --kustomize "https://github.com/kubernetes-sigs/gateway-api/config/crd/experimental?ref=v1.2.1"
   ```

3. Install {{< reuse "docs/snippets/product-name.md" >}} by using Helm.

   ```sh
   helm install --create-namespace --namespace kgateway-system --version v2.0.0-main kgateway oci://ghcr.io/kgateway-dev/charts/kgateway
   ```

4. Make sure that `kgateway` is running.

   ```sh
   kubectl get pods -n kgateway-system
   ```

   Example output:

   ```
   NAME                        READY   STATUS    RESTARTS   AGE
   kgateway-5495d98459-46dpk   1/1     Running   0          19s
   ```

That's it! Now you're ready to try out {{< reuse "docs/snippets/product-name.md" >}}.

## Next steps

- [Install a sample app such as httpbin](/docs/operations/install/#deploy-app).
- [Set up a listener for your API gateway](/docs/setup/listeners/).
