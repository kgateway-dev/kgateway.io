---
title: Install
weight: 5
description: Install {{< reuse "docs/snippets/product-name.md" >}} and related components.
---

In this installation guide, you install {{< reuse "docs/snippets/product-name.md" >}} in a Kubernetes cluster, set up an API gateway, deploy a sample app, and access that app through the API gateway.

The guide includes steps to install {{< reuse "docs/snippets/product-name.md" >}} in three ways.

{{< tabs items="CLI,Helm,Argo CD" >}}

  {{% tab %}}The [`{{< reuse "docs/snippets/cli-name.md" >}}` CLI](/docs/operations/cli) is an open source command line interface (CLI) tool that is built for the {{< reuse "docs/snippets/product-name.md" >}} project. It uses Helm files under the covers to quickly install {{< reuse "docs/snippets/product-name.md" >}} for you. As such, this approach is suitable for quick testing, but also adaptable for larger installations down the road.{{% /tab %}}
  
  {{% tab %}}[Helm](https://helm.sh/) is a popular package manager for Kubernetes configuration files. This approach is flexible for adopting to your own command line, continuous delivery, or other workflows.{{% /tab %}}
  
  {{% tab %}}[Argo CD](https://argoproj.github.io/cd/) is a declarative continuous delivery tool that is especially popular for large, production-level installations at scale. This approach incorporates Helm configuration files.{{% /tab %}}

{{< /tabs >}}

## Before you begin

{{< tabs items="CLI,Helm,Argo CD" >}}
{{% tab %}}
1. Create or use an existing Kubernetes cluster. 
2. Install the following command-line tools.
   * [`kubectl`](https://kubernetes.io/docs/tasks/tools/#kubectl), the Kubernetes command line tool. Download the `kubectl` version that is within one minor version of the Kubernetes clusters you plan to use.
   * [`helm`](https://helm.sh/docs/intro/install/), the Kubernetes package manager.
   * [`{{< reuse "docs/snippets/cli-name.md" >}}`](/docs/operations/cli/), the {{< reuse "docs/snippets/product-name.md" >}} command line tool.
      * Linux and macOS:
        ```shell
        curl -sL https://run.solo.io/glooctl/install | GLOO_VERSION=v{{< reuse "docs/versions/gloo_oss_patch.md" >}} sh -
        export PATH=$HOME/.gloo/bin:$PATH
        ```
      * Windows: Notes that this script requires OpenSSL.
        ```shell
        (New-Object System.Net.WebClient).DownloadString("https://run.solo.io/gloo/windows/install") | iex
        $env:Path += ";$env:userprofile/.gloo/bin/"
        ```
{{% /tab %}}
{{% tab %}}
1. Create or use an existing Kubernetes cluster. 
2. Install the following command-line tools.
   * [`kubectl`](https://kubernetes.io/docs/tasks/tools/#kubectl), the Kubernetes command line tool. Download the `kubectl` version that is within one minor version of the Kubernetes clusters you plan to use.
   * [`helm`](https://helm.sh/docs/intro/install/), the Kubernetes package manager.
   * [`{{< reuse "docs/snippets/cli-name.md" >}}`](/docs/operations/cli/), the {{< reuse "docs/snippets/product-name.md" >}} command line tool.
      * Linux and macOS:
        ```shell
        curl -sL https://run.solo.io/glooctl/install | GLOO_VERSION=v{{< reuse "docs/versions/gloo_oss_patch.md" >}} sh -
        export PATH=$HOME/.gloo/bin:$PATH
        ```
      * Windows: Notes that this script requires OpenSSL.
        ```shell
        (New-Object System.Net.WebClient).DownloadString("https://run.solo.io/gloo/windows/install") | iex
        $env:Path += ";$env:userprofile/.gloo/bin/"
        ```
{{% /tab %}}
{{% tab %}}
1. Create or use an existing Kubernetes cluster. 
2. Install the following command-line tools.
   * [`kubectl`](https://kubernetes.io/docs/tasks/tools/#kubectl), the Kubernetes command line tool. Download the `kubectl` version that is within one minor version of the Kubernetes clusters you plan to use.
   * [`argo`](https://argo-cd.readthedocs.io/en/stable/cli_installation/), the Argo CD command line tool.
3. Install Argo CD in your cluster.
   ```shell
   kubectl create namespace argocd
   until kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/v2.12.3/manifests/install.yaml > /dev/null 2>&1; do sleep 2; done
   # wait for deployment to complete
   kubectl -n argocd rollout status deploy/argocd-applicationset-controller
   kubectl -n argocd rollout status deploy/argocd-dex-server
   kubectl -n argocd rollout status deploy/argocd-notifications-controller
   kubectl -n argocd rollout status deploy/argocd-redis
   kubectl -n argocd rollout status deploy/argocd-repo-server
   kubectl -n argocd rollout status deploy/argocd-server   
   ```
4. Update the default Argo CD password for the admin user to `kgateway`.
   ```shell
   # bcrypt(password)=$2a$10$g3bspLL4iTNQHxJpmPS0A.MtyOiVvdRk1Ds5whv.qSdnKUmqYVyxa
   # password: kgateway
   kubectl -n argocd patch secret argocd-secret \
     -p '{"stringData": {
       "admin.password": "$2a$10$g3bspLL4iTNQHxJpmPS0A.MtyOiVvdRk1Ds5whv.qSdnKUmqYVyxa",
       "admin.passwordMtime": "'$(date +%FT%T%Z)'"
     }}'
   ```
{{% /tab %}}
{{< /tabs >}}

## Install kgateway

Install the open source {{< reuse "docs/snippets/product-name.md" >}} project in your Kubernetes cluster.

{{< tabs items="CLI,Helm,Argo CD" >}}
{{% tab %}}
1. Install the custom resources of the {{< reuse "docs/snippets/k8s-gateway-api-name.md" >}} version 1.2.0. 
   ```sh
   kubectl apply -f https://github.com/kubernetes-sigs/gateway-api/releases/download/v1.2.0/standard-install.yaml
   ```
   Example output: 
   ```console
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

2. Install {{< reuse "docs/snippets/product-name.md" >}}.

   This command creates the `gloo-system` namespace and installs the {{< reuse "docs/snippets/product-name.md" >}} control plane into it.
   ```sh
   {{< reuse "docs/snippets/cli-name.md" >}} install gateway \
   --version {{< reuse "docs/versions/n-patch.md" >}} \
   --values - << EOF
   discovery:
     enabled: false
   gatewayProxies:
     gatewayProxy:
       disabled: true
   gloo:
     disableLeaderElection: true
   kubeGateway:
     enabled: true
   EOF
   ```

3. Verify that the {{< reuse "docs/snippets/product-name.md" >}} control plane is up and running. 
   
   ```sh
   kubectl get pods -n gloo-system | grep gloo
   ```

   Example output: 
   ```txt
   NAME                                  READY   STATUS    RESTARTS   AGE
   gloo-78658959cd-cz6jt                 1/1     Running   0          12s
   ```

4. Verify that the `gloo-gateway` GatewayClass is created. You can optionally take a look at how the gateway class is configured by adding the `-o yaml` option to your command. 
   ```sh
   kubectl get gatewayclass gloo-gateway 
   ```
{{% /tab %}}
{{% tab %}}
1. Install the custom resources of the {{< reuse "docs/snippets/k8s-gateway-api-name.md" >}} version 1.2.0. 
   ```sh
   kubectl apply -f https://github.com/kubernetes-sigs/gateway-api/releases/download/v1.2.0/standard-install.yaml
   ```
   Example output: 
   ```console
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

2. Add the Helm repository for {{< reuse "docs/snippets/product-name.md" >}} Open Source. 
   ```sh
   helm repo add gloo https://storage.googleapis.com/solo-public-helm
   helm repo update
   ```
      
3. Install {{< reuse "docs/snippets/product-name.md" >}}. This command creates the `gloo-system` namespace and installs the {{< reuse "docs/snippets/product-name.md" >}} control plane into it.
   ```sh
   helm install -n gloo-system gloo-gateway gloo/gloo \
   --create-namespace \
   --version {{< reuse "docs/versions/n-patch.md" >}} \
   -f -<<EOF
   discovery:
     enabled: false
   gatewayProxies:
     gatewayProxy:
       disabled: true
   gloo:
     disableLeaderElection: true
   kubeGateway:
     enabled: true
   EOF
   ```
   
   Example output: 
   ```txt
   NAME: gloo-gateway
   LAST DEPLOYED: Thu Apr 18 11:50:39 2024
   NAMESPACE: gloo-system
   STATUS: deployed
   REVISION: 2
   TEST SUITE: None
   ```

4. Verify that the {{< reuse "docs/snippets/product-name.md" >}} control plane is up and running. 
   ```sh
   kubectl get pods -n gloo-system | grep gloo
   ```

   Example output: 
   ```txt
   NAME                                  READY   STATUS    RESTARTS   AGE
   gloo-78658959cd-cz6jt                 1/1     Running   0          12s
   ```

5. Verify that the `gloo-gateway` GatewayClass is created. You can optionally take a look at how the gateway class is configured by adding the `-o yaml` option to your command. 
   ```sh
   kubectl get gatewayclass gloo-gateway 
   ```
{{% /tab %}}
{{% tab %}}
1. Install the custom resources of the {{< reuse "docs/snippets/k8s-gateway-api-name.md" >}} version 1.2.0. 
   ```sh
   kubectl apply -f https://github.com/kubernetes-sigs/gateway-api/releases/download/v1.2.0/standard-install.yaml
   ```
   Example output: 
   ```console
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
   
2. Port-forward the Argo CD server on port 9999.
   
   ```sh
   kubectl port-forward svc/argocd-server -n argocd 9999:443
   ```

3. Open the [Argo CD UI](https://localhost:9999/).

4. Log in with the `admin` username and `kgateway` password.
   
   {{< reuse-image src="img/argocd-welcome.png" >}}

5. Create an Argo CD application to install the {{% reuse "docs/snippets/product-name.md" %}} Helm chart. 
   
   ```yaml
   kubectl apply -f- <<EOF
   apiVersion: argoproj.io/v1alpha1
   kind: Application
   metadata:
     name: kgateway-oss-helm
     namespace: argocd
   spec:
     destination:
       namespace: gloo-system
       server: https://kubernetes.default.svc
     project: default
     source:
       chart: gloo
       helm:
         skipCrds: false
         values: |
           kubeGateway:
             # Enable {{< reuse "docs/snippets/k8s-gateway-api-name.md" >}} integration
             enabled: true
           gatewayProxies:
             gatewayProxy:
               disabled: true
           gloo:
             disableLeaderElection: true
           discovery:
             # For demo purposes, disable discovery
             enabled: false
       repoURL: https://storage.googleapis.com/solo-public-helm
       targetRevision: {{< reuse "docs/versions/n-patch.md" >}}
     syncPolicy:
       automated:
         # Prune resources during auto-syncing (default is false)
         prune: true 
         # Sync the app in part when resources are changed only in the target Kubernetes cluster
         # but not in the git source (default is false).
         selfHeal: true 
       syncOptions:
       - CreateNamespace=true 
   EOF
   ```
   
6. Verify that the `gloo` control plane is up and running.
   
   ```sh
   kubectl get pods -n gloo-system 
   ```
   
   Example output: 
   ```txt
   NAME                                  READY   STATUS      RESTARTS   AGE
   gateway-certgen-wfz9z                 0/1     Completed   0          35s
   gloo-78f4cc8fc6-6hmsq                 1/1     Running     0          21s
   gloo-resource-migration-sx5z4         0/1     Completed   0          48s
   gloo-resource-rollout-28gj6           0/1     Completed   0          21s
   gloo-resource-rollout-check-tjdp7     0/1     Completed   0          2s
   gloo-resource-rollout-cleanup-nj4t8   0/1     Completed   0          39s
   ```

7. Verify that the `gloo-gateway` GatewayClass is created. You can optionally take a look at how the gateway class is configured by adding the `-o yaml` option to your command.
   
   ```sh
   kubectl get gatewayclass gloo-gateway
   ```

8. Open the Argo CD UI and verify that you see the Argo CD application with a `Healthy` and `Synced` status.
   
   {{< reuse-image src="/img/argo-gg-oss.png" >}}

{{% /tab %}}
{{< /tabs >}}

## Set up an API gateway {#api-gateway}

1. Create a gateway resource and configure an HTTP listener. The following gateway can serve HTTP resources from all namespaces.  
   
   ```yaml
   kubectl apply -n gloo-system -f- <<EOF
   kind: Gateway
   apiVersion: gateway.networking.k8s.io/v1
   metadata:
     name: http
   spec:
     gatewayClassName: gloo-gateway
     listeners:
     - protocol: HTTP
       port: 8080
       name: http
       allowedRoutes:
         namespaces:
           from: All
   EOF
   ```

2. Verify that the gateway is created successfully. You can also review the external address that is assigned to the gateway. Note that depending on your environment it might take a few minutes for the load balancer service to be assigned an external address. 
   
   ```sh
   kubectl get gateway http -n gloo-system
   ```

   Example output: 
   
   ```txt
   NAME   CLASS          ADDRESS                                                                  PROGRAMMED   AGE
   http   gloo-gateway   a3a6c06e2f4154185bf3f8af46abf22e-139567718.us-east-2.elb.amazonaws.com   True         93s
   ```

## Deploy a sample app {#deploy-app}

1. Create the httpbin namespace.
   
   ```sh
   kubectl create ns httpbin
   ```

2. Deploy the httpbin app.
   
   ```sh
   kubectl -n httpbin apply -f https://raw.githubusercontent.com/solo-io/gloo-mesh-use-cases/main/policy-demo/httpbin.yaml
   ```

3. Verify that the httpbin app is running.
   
   ```sh
   kubectl -n httpbin get pods
   ```

   Example output: 
   
   ```txt
   NAME                      READY   STATUS    RESTARTS   AGE
   httpbin-d57c95548-nz98t   3/3     Running   0          18s
   ```

## Expose the app on the gateway {#expose-app}

1. Create an HTTPRoute resource to expose the httpbin app on the gateway. The following example exposes the app on the `wwww.example.com` domain. 
   
   ```yaml
   kubectl apply -f- <<EOF
   apiVersion: gateway.networking.k8s.io/v1
   kind: HTTPRoute
   metadata:
     name: httpbin
     namespace: httpbin
     labels:
       example: httpbin-route
   spec:
     parentRefs:
       - name: http
         namespace: gloo-system
     hostnames:
       - "www.example.com"
     rules:
       - backendRefs:
           - name: httpbin
             port: 8000
   EOF
   ```

   |Setting|Description|
   |--|--|
   |`spec.parentRefs`|The name and namespace of the gateway resource that serves the route. In this example, you use the HTTP gateway that you created earlier.  |
   |`spec.hostnames`|A list of hostnames that the route is exposed on.|
   |`spec.rules.backendRefs`| The Kubernetes service that serves the incoming request. In this example, requests to `www.example.com` are forwarded to the httpbin app on port 9000. Note that you must create the HTTP route in the same namespace as the service that serves that route. To create the HTTP route resource in a different namespace, you must create a ReferenceGrant resource to allow the HTTP route to forward requests to a service in a different namespace. For more information, see the [Kubernetes API Gateway documentation](https://gateway-api.sigs.k8s.io/api-types/referencegrant/). |

2. Verify that the HTTPRoute is applied successfully. 
   
   ```sh
   kubectl get -n httpbin httproute/httpbin -o yaml
   ```

3. Send a request to the httpbin app. 
   
   {{< tabs items="Cloud Provider LoadBalancer,Port-forward for local testing" >}}
   {{% tab %}}
   1. Get the external address of the gateway and save it in an environment variable.
      ```sh
      export INGRESS_GW_ADDRESS=$(kubectl get svc -n gloo-system gloo-proxy-http -o=jsonpath="{.status.loadBalancer.ingress[0]['hostname','ip']}")
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
   1. Port-forward the `gloo-proxy-http` pod on port 8080. 
      ```sh
      kubectl port-forward deployment/gloo-proxy-http -n gloo-system 8080:8080
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
- Learn more about [{{< reuse "docs/snippets/product-name.md" >}}, its features and benefits](/docs/about/overview). 
- Add routing capabilities to your httpbin route by using the [Traffic management](/docs/traffic-management) guides. 
- Explore ways to make your routes more resilient by using the [Resiliency](/docs/resiliency) guides. 
- Secure your routes with external authentication and rate limiting policies by using the [Security](/docs/security) guides. 

{{< callout type="warning" >}}
{{< reuse "docs/snippets/one-install.md" >}}
{{< /callout >}}

## Cleanup

{{< reuse "docs/snippets/cleanup.md" >}}

{{< tabs items="CLI,Helm,Argo CD" >}}

  {{% tab %}}Follow the [Uninstall guide](/docs/operations/uninstall).{{% /tab %}}
  
  {{% tab %}}Follow the [Uninstall guide](/docs/operations/uninstall).{{% /tab %}}
  
  {{% tab %}}Follow the [Uninstall with Argo CD guide](/docs/operations/uninstall#argocd).{{% /tab %}}

{{< /tabs >}}
