---
title: Upgrade
weight: 710
description: Upgrade the `gloo` control plane and any {{< reuse "docs/snippets/product-name.md" >}} proxies that run in your cluster. 
---

You can use this guide to upgrade the version of your {{< reuse "docs/snippets/product-name.md" >}} components, or to apply changes to the components’ configuration settings.

## Considerations
Consider the following rules before you plan your {{< reuse "docs/snippets/product-name.md" >}} upgrade.

### Testing upgrades

During the upgrade, pods that run the new version of the control plane and proxies are created. Then, the old pods are terminated. Because zero downtime is not guaranteed, try testing the upgrade in a staging environment before upgrading your production environment.

### Patch and minor versions

**Patch version upgrades**: </br>
- You can skip patch versions within the same minor release. For example, you can upgrade from version {{< reuse "docs/versions/gloo_short.md" >}}.0 to {{< reuse "docs/versions/gloo_oss_patch.md" >}} directly, and skip the patch versions in between.

**Minor version upgrades**: </br>
- Before you upgrade the minor version, always upgrade your _current_ minor version to the latest patch. This ensures that your current environment is up-to-date with any bug fixes or security patches before you begin the minor version upgrade process.
- Always upgrade to the latest patch version of the target minor release. Do not upgrade to a lower patch version, such as {{< reuse "docs/versions/gloo_short.md" >}}.0, {{< reuse "docs/versions/gloo_short.md" >}}.1, and so on.
- Do not skip minor versions during your upgrade. Upgrade minor release versions one at a time. 

## Step 1: Prepare to upgrade

1. **Minor version upgrades**: Before you upgrade to a new minor version, first upgrade your _current_ minor version to the latest patch.
   1. Find the latest patch of your minor version by checking the [release changelog](https://github.com/k8sgateway/k8sgateway/releases).
   2. Follow this upgrade guide to upgrade to the latest patch for your current minor version.
   3. Then, you can repeat the steps in this guide to upgrade to the latest patch of the next minor version.

2. Check that your underlying infrastructure platform, such as Kubernetes, and other dependencies run supported versions for the {{< reuse "docs/snippets/product-name.md" >}} version that you want to upgrade to.
   1. Review the [supported versions](/docs/reference/versions/) for dependencies such as Kubernetes, Istio, Helm, and more.
   2. Compare the supported version against the versions that you currently use. 
   3. If necessary, upgrade your dependencies, such as consulting your cluster infrastructure provider to upgrade the version of Kubernetes that your cluster runs.

3. Set the version to upgrade {{< reuse "docs/snippets/product-name.md" >}} to in an environment variable, such as the latest patch version (`{{< reuse "docs/versions/gloo_oss_patch.md" >}}`) .
   ```sh
   export NEW_VERSION={{< reuse "docs/versions/gloo_oss_patch.md" >}}
   ```

## Step 2: Upgrade the CLI

1. Upgrade `{{< reuse "docs/snippets/cli-name.md" >}}` to the new version. Note that this command only updates the CLI binary version, and does not upgrade your {{< reuse "docs/snippets/product-name.md" >}} installation.
   ```shell
   {{< reuse "docs/snippets/cli-name.md" >}} upgrade --release v${NEW_VERSION}
   ```

2. Verify that the **client** version matches the version you installed.
   ```shell
   {{< reuse "docs/snippets/cli-name.md" >}} version
   ```

   Example output:
   ```json
   {
   "client": {
     "version": "{{< reuse "docs/versions/gloo_oss_patch.md" >}}"
   },
   ```

## Step 3: Upgrade kgateway

1. Install the custom resources of the {{< reuse "docs/snippets/k8s-gateway-api-name.md" >}} version 1.2.0. 
   ```sh
   kubectl apply -f https://github.com/kubernetes-sigs/gateway-api/releases/download/v1.2.0/standard-install.yaml
   ```
   Example output: 
   ```
   customresourcedefinition.apiextensions.k8s.io/gatewayclasses.gateway.networking.k8s.io created
   customresourcedefinition.apiextensions.k8s.io/gateways.gateway.networking.k8s.io created
   customresourcedefinition.apiextensions.k8s.io/httproutes.gateway.networking.k8s.io created
   customresourcedefinition.apiextensions.k8s.io/referencegrants.gateway.networking.k8s.io created
   customresourcedefinition.apiextensions.k8s.io/grpcroutes.gateway.networking.k8s.io created
   ```
   
   {{< callout type="info" >}}
   If you want to use TCPRoutes to set up a TCP listener on your Gateway, you must install the TCPRoute CRD, which is part of the {{< reuse "docs/snippets/k8s-gateway-api-name.md" >}} experimental channel. Use the following command to install the CRDs. 
   ```sh
   kubectl apply -f https://github.com/kubernetes-sigs/gateway-api/releases/download/v1.2.0/experimental-install.yaml 
   ```
   {{< /callout >}}

1. Update the {{< reuse "docs/snippets/product-name.md" >}} Helm repositories.
   ```sh
   helm repo update
   ```
   
2. Apply the Gloo custom resource definitions (CRDs) for the upgrade version.
   1. Download and apply the new CRDs.
      ```sh
      helm pull gloo/gloo --version $NEW_VERSION --untar
      kubectl apply -f gloo/crds
      ```
   2. Check the deployed CRDs to ensure that none of them are out of date.
      ```sh
      {{< reuse "docs/snippets/cli-name.md" >}} check-crds
      ```
     
3. Make any changes to your Helm values.
   1. Get the Helm values file for your current version.
      ```sh
      helm get values gloo-gateway -n gloo-system -o yaml > gloo-gateway.yaml
      open gloo-gateway.yaml
      ```

   2. Compare your current Helm chart values with the version that you want to upgrade to. You can get a values file for the upgrade version with the `helm show values` command.
      ```sh
      helm show values gloo/gloo --version $NEW_VERSION > all-values.yaml
      open all-values.yaml
      ```

   3. Make any changes that you want by editing your `gloo-gateway.yaml` Helm values file or preparing the `--set` flags.

4. Upgrade the {{< reuse "docs/snippets/product-name.md" >}} Helm installation.
   {{< callout type="warning" >}}
   Make sure to include your Helm values when you upgrade either as a configuration file or with <code>--set</code> flags. Otherwise, any previous custom values that you set might be overwritten.
   {{< /callout >}}
   ```sh
   helm upgrade -n gloo-system gloo-gateway gloo/gloo \
     -f gloo-gateway.yaml \
     --version=$NEW_VERSION
   ```
   
5. Verify that {{< reuse "docs/snippets/product-name.md" >}} runs the upgraded version.
   ```sh
   kubectl -n gloo-system get pod -l gloo=gloo -ojsonpath='{.items[0].spec.containers[0].image}'
   ```
   
   Example output:
   ```
   quay.io/solo-io/gloo:{{< reuse "docs/versions/gloo_oss_patch.md" >}}@sha256:582ab27a995e9526522f81a9325584aefb528fa4d939455fd285e5148615991b
   ```

6. Confirm that the {{< reuse "docs/snippets/product-name.md" >}} control plane is up and running. 
   ```sh
   kubectl get pods -n gloo-system
   ``` 