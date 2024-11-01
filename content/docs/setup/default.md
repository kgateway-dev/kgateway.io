---
title: Default gateway proxy setup
weight: 10
---

Learn about the different {{< reuse "docs/snippets/product-name.md" >}} and Kubernetes resources that make up your gateway proxy deployment.

## GatewayClass

The GatewayClass is a {{< reuse "docs/snippets/k8s-gateway-api-name.md" >}}-native resource that defines the controller that spins up and configures gateway proxies in your environment. 

When you install {{< reuse "docs/snippets/product-name.md" >}}, a GatewayClass resource is automatically created with the following configuration. 

```yaml
apiVersion: gateway.networking.k8s.io/v1
kind: GatewayClass
metadata:
  name: gloo-gateway
spec:
  controllerName: solo.io/gloo-gateway
```

The `solo.io/gloo-gateway` controller implements the {{< reuse "docs/snippets/k8s-gateway-api-name.md" >}} and provides an abstraction of the gateway's underlying infrastructure. The controller watches the resources in your cluster. When a Gateway resource is created that references this GatewayClass, the controller spins up an Envoy-based gateway proxy by using the configuration that is defined in the GatewayParameters resource. The controller also translates other resources, such as HTTPRoute, RouteOption, VirtualHostOption, and more, into valid Envoy configuration, and applies the configuration to the gateway proxies it manages. 

## Gateway proxy template

When you create a Gateway resource, a default [gateway proxy template](https://github.com/solo-io/gloo/blob/main/projects/gateway2/helm/gloo-gateway/templates/gateway/proxy-deployment.yaml) is used to automatically spin up and bootstrap a gateway proxy deployment and service in your cluster. The template includes Envoy configuration that binds the gateway proxy deployment to the Gateway resource that you created. In addition, the settings in the [GatewayParameters](#gatewayparameters) and [Settings](#settings) resources are used to configure the gateway proxy. 

The resulting gateway proxy is managed for you and its configuration is automatically updated based on the settings in the GatewayParameters or Settings resources. To publicly expose the gateway proxy deployment, a service of type LoadBalancer is created for you. Depending on the cloud provider that you use, the LoadBalancer service is assigned a public IP address or hostname that you can use to reach the gateway. To expose an app on the gateway, you must create an HTTPRoute resource and define the matchers and filter rules that you want to apply before forwarding the request to the app in your cluster. You can review the [Get started](/docs/quickstart/), [traffic management](/docs/traffic-management/), [security](/docs/security/), and [resiliency](/docs/resiliency/) guides to find examples for how to route and secure traffic to an app. 

You can change the default configuration of your gateway proxy by changing the GatewayParameters and Settings values. In most cases, you add the values via the {{< reuse "docs/snippets/product-name.md" >}} Helm chart. {{< reuse "docs/snippets/product-name.md" >}} automatically updates the GatewayParameters and Settings resources for you. But you can also update the values in these two resources directly. Keep in mind that values that you manually add to the GatewayParameters and Settings resources do not persist between upgrades. To persist these values, you must add the values to the {{< reuse "docs/snippets/product-name.md" >}} Helm chart.

If you do not want to use the default gateway proxy template to bootstrap your proxies, you can choose to create a self-managed gateway. With self-managed gateways, you are responsible for defining the proxy deployment template that you want to bootstrap your proxies with. For more information, see [Self-managed gateways (BYO)](/docs/setup/customize/selfmanaged/).

## GatewayParameters 

{{< reuse "docs/gatewayparameters.md" >}}


## Settings

Settings is a {{< reuse "docs/snippets/product-name.md" >}} custom resource that is used to set global values for {{< reuse "docs/snippets/product-name.md" >}} components, such as the gateway proxies or the {{< reuse "docs/snippets/product-name.md" >}} control plane. The Settings resource is automatically created based on the values that you set in the {{< reuse "docs/snippets/product-name.md" >}} Helm chart, but you can also manually update the Settings resource to enable or disable certain features in {{< reuse "docs/snippets/product-name.md" >}}. For example, the Settings resource determines whether [resource validation](/docs/about/resource-validation/) is enabled in your environment. 

{{< callout type="info" >}}
Note that when you manually update values in the Settings resource, these values do not persist between Helm upgrades. To ensure that your values are still present even after you upgrade to a new {{< reuse "docs/snippets/product-name.md" >}} version, add the values to your Helm chart instead.
{{< /callout >}}

To view the default Settings resource, run the following command:
```sh
kubectl get settings default -n gloo-system -o yaml
```

When you follow the [Get started](/docs/quickstart/) guide, the following Settings resource is created for you. To understand each setting, check out the [Settings custom resource documentation](/docs/reference/api/settings). 
```yaml
apiVersion: gloo.solo.io/v1
kind: Settings
metadata:
  annotations:
    meta.helm.sh/release-name: gloo-gateway
    meta.helm.sh/release-namespace: gloo-system
  generation: 1
  labels:
    app: gloo
    app.kubernetes.io/managed-by: Helm
    gloo: settings
  name: default
  namespace: gloo-system
spec:
  consoleOptions:
    apiExplorerEnabled: true
    readOnly: false
  discovery:
    fdsMode: WHITELIST
  discoveryNamespace: gloo-system
  extauth:
    extauthzServerRef:
      name: extauth
      namespace: gloo-system
    transportApiVersion: V3
    userIdHeader: x-user-id
  gateway:
    enableGatewayController: true
    isolateVirtualHostsBySslConfig: false
    readGatewaysFromAllNamespaces: false
    validation:
      allowWarnings: true
      alwaysAccept: true
      disableTransformationValidation: false
      proxyValidationServerAddr: gloo:9988
      serverEnabled: true
      validationServerGrpcMaxSizeBytes: 104857600
      warnRouteShortCircuiting: false
  gloo:
    disableKubernetesDestinations: false
    disableProxyGarbageCollection: false
    enableRestEds: false
    invalidConfigPolicy:
      invalidRouteResponseBody: {{< reuse "docs/snippets/product-name.md" >}} has invalid configuration. Administrators
        should run `glooctl check` to find and fix config errors.
      invalidRouteResponseCode: 404
      replaceInvalidRoutes: false
    istioOptions:
      appendXForwardedHost: true
      enableAutoMtls: false
      enableIntegration: false
    proxyDebugBindAddr: 0.0.0.0:9966
    regexMaxProgramSize: 1024
    restXdsBindAddr: 0.0.0.0:9976
    xdsBindAddr: 0.0.0.0:9977
  graphqlOptions:
    schemaChangeValidationOptions:
      processingRules: []
      rejectBreakingChanges: false
  kubernetesArtifactSource: {}
  kubernetesConfigSource: {}
  kubernetesSecretSource: {}
  ratelimitServer:
    rateLimitBeforeAuth: false
    ratelimitServerRef:
      name: rate-limit
      namespace: gloo-system
  refreshRate: 60s
status:
  statuses: {}
```

