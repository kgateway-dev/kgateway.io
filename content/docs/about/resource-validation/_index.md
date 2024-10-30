---
title: Resource validation
weight: 40
---

Prevent invalid gateway configuration from being applied to your Kubernetes cluster by using the {{< reuse "docs/snippets/product-name.md" >}} validating admission webhook.

## About the validating admission webhook

<!--TODO link for validation webhook configuration yaml-->

The validating admission webhook configuration is enabled by default when you install {{< reuse "docs/snippets/product-name.md" >}}. By default, the webhook only logs the validation result without rejecting invalid {{< reuse "docs/snippets/product-name.md" >}} resource configuration. If the configuration you provide is written in valid YAML format, it is accepted by the Kubernetes API server and written to etcd. However, the configuration might contain invalid settings or inconsistencies that {{< reuse "docs/snippets/product-name.md" >}} cannot interpret or process. This mode is also referred to as permissive validation. 

You can enable strict validation by setting the `alwaysAcceptResources` Helm option to false. Note that only resources that result in a `rejected` status are rejected on admission. Resources that result in a `warning` status are still admitted. To also reject resources with a `warning` status, set `alwaysAcceptResources=false` and `allowWarnings=false` in your Helm file. 

For more information, see [Enable resource validation](/docs/about/resource-validation/setup/). 

## Validated resources

The following {{< reuse "docs/snippets/product-name.md" >}} custom resources can be validated:

- [RouteOption](/docs/about/policies/routeoption)
- [VirtualHostOption](/docs/about/policies/virtualhostoption)

To see an example for how to trigger the resource validation API, see [Test resources](/docs/about/resource-validation/usage/). 

