---
linkTitle: "Gateway setup"
title: Default gateway proxy setup
next: /docs/traffic-management
---

Learn about the different {{< boilerplate product-name >}} and Kubernetes resources that make up your gateway proxy deployment.

## GatewayClass

The GatewayClass is a {{< boilerplate k8s-gateway-api-name >}}-native resource that defines the controller that spins up and configures gateway proxies in your environment. 

When you install {{< boilerplate product-name >}}, a GatewayClass resource is automatically created with the following configuration. 

```yaml
apiVersion: gateway.networking.k8s.io/v1
kind: GatewayClass
metadata:
  name: gloo-gateway
spec:
  controllerName: solo.io/gloo-gateway
```

The `solo.io/gloo-gateway` controller implements the {{< boilerplate k8s-gateway-api-name >}} and provides an abstraction of the gateway's underlying infrastructure. The controller watches the resources in your cluster. When a Gateway resource is created that references this GatewayClass, the controller spins up an Envoy-based gateway proxy by using the configuration that is defined in the GatewayParameters resource. The controller also translates other resources, such as HTTPRoute, RouteOption, VirtualHostOption, and more, into valid Envoy configuration, and applies the configuration to the gateway proxies it manages. 

## Gateway proxy template

When you create a Gateway resource, a default [gateway proxy template](https://github.com/solo-io/gloo/blob/main/projects/gateway2/helm/gloo-gateway/templates/gateway/proxy-deployment.yaml) is used to automatically spin up and bootstrap a gateway proxy deployment and service in your cluster. The template includes Envoy configuration that binds the gateway proxy deployment to the Gateway resource that you created. In addition, the settings in the [GatewayParameters](#gatewayparameters) and [Settings](#settings) resources are used to configure the gateway proxy. 

The resulting gateway proxy is managed for you and its configuration is automatically updated based on the settings in the GatewayParameters or Settings resources. To publicly expose the gateway proxy deployment, a service of type LoadBalancer is created for you. Depending on the cloud provider that you use, the LoadBalancer service is assigned a public IP address or hostname that you can use to reach the gateway. To expose an app on the gateway, you must create an HTTPRoute resource and define the matchers and filter rules that you want to apply before forwarding the request to the app in your cluster. You can review the [Get started](/quickstart/), [traffic management](/traffic-management/), [security](/security/), and [resiliency](/resiliency/) guides to find examples for how to route and secure traffic to an app. 

You can change the default configuration of your gateway proxy by changing the GatewayParameters and Settings values. In most cases, you add the values via the {{< boilerplate product-name >}} Helm chart. {{< boilerplate product-name >}} automatically updates the GatewayParameters and Settings resources for you. But you can also update the values in these two resources directly. Keep in mind that values that you manually add to the GatewayParameters and Settings resources do not persist between upgrades. To persist these values, you must add the values to the {{< boilerplate product-name >}} Helm chart.

If you do not want to use the default gateway proxy template to bootstrap your proxies, you can choose to create a self-managed gateway. With self-managed gateways, you are responsible for defining the proxy deployment template that you want to bootstrap your proxies with. For more information, see [Self-managed gateways (BYO)](/setup/customize/selfmanaged/).

## GatewayParameters 

{{< boilerplate gatewayparameters >}}


## Settings

Settings is a {{< boilerplate product-name >}} custom resource that is used to set global values for {{< boilerplate product-name >}} components, such as the gateway proxies or the {{< boilerplate product-name >}} control plane. The Settings resource is automatically created based on the values that you set in the {{< boilerplate product-name >}} Helm chart, but you can also manually update the Settings resource to enable or disable certain features in {{< boilerplate product-name >}}. For example, the Settings resource determines whether [resource validation](/about/resource-validation/) is enabled in your environment. 

{{% info %}}
Note that when you manually update values in the Settings resource, these values do not persist between Helm upgrades. To ensure that your values are still present even after you upgrade to a new {{< boilerplate product-name >}} version, add the values to your Helm chart instead.
{{% /info %}}
{{% info %}}
The Settings resource is shared between {{< boilerplate product-name >}} proxies that are based on the {{< boilerplate k8s-gateway-api-name >}} and proxies that use the [Gloo Edge API](https://docs.solo.io/gloo-edge). However, some Settings fields can be set only for proxies that use the Gloo Edge API. If you run both types of proxies side-by-side in your cluster, follow these general steps: 
1. Ensure that you want to apply the Settings values to all of your proxies. 
2. Thoroughly test Settings changes for each proxy type to verify the expected behavior. 
3. Proceed with the update by either manually changing the respective Settings fields or by setting these values in the Helm values file and upgrading your {{< boilerplate product-name >}} installation. 
{{% /info %}}

To view the default Settings resource, run the following command:
```sh
kubectl get settings default -n gloo-system -o yaml
```

When you follow the [Get started](/quickstart/) guide, the following Settings resource is created for you. To understand each setting, check out the [Settings custom resource documentation](https://docs.solo.io/gloo-edge/latest/reference/api/github.com/solo-io/gloo/projects/gloo/api/v1/settings.proto.sk/). 
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
      invalidRouteResponseBody: {{< boilerplate product-name >}} has invalid configuration. Administrators
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

