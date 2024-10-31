---
linkTitle: "FAQs"
title: Frequently asked questions
---

## What is k8sgateway?

{{< reuse "docs/snippets/product-name.md" >}} is an open source, cloud-native Layer 7 proxy that is based on the [Envoy](https://www.envoyproxy.io/) and [{{< reuse "docs/snippets/k8s-gateway-api-name.md" >}}](https://gateway-api.sigs.k8s.io/) projects.

## Why would I want to use k8sgateway?

The {{< reuse "docs/snippets/product-name.md" >}} project was built to support the difficult challenges of monolith to microservice migration, which includes being able to connect multiple types of compute resources, such as virtual machines (VMs) and on-premises monolithic apps with cloud-native, Kuberentes-based apps.

Other use cases {{< reuse "docs/snippets/product-name.md" >}} can solve include the following:

* Kubernetes cluster ingress with a custom {{< reuse "docs/snippets/product-name.md" >}} API as well as native support for the {{< reuse "docs/snippets/k8s-gateway-api-name.md" >}}.
* API gateway functionality for services that run outside Kubernetes
* GraphQL endpoint for the services that {{< reuse "docs/snippets/product-name.md" >}} can discover

## What’s the difference between k8sgateway and Envoy? 

The Envoy proxy is a data-plane component with powerful routing, observability, and resilience capabilities. However, Envoy can be difficult to operationalize and complex to configure. 

The {{< reuse "docs/snippets/product-name.md" >}} project comes with a simple yet powerful control plane for managing Envoy as an edge ingress, API Gateway, or service proxy. The {{< reuse "docs/snippets/product-name.md" >}} control plane is built on a plugin model that enables extension and customization depending on your environment. This flexibility lets {{< reuse "docs/snippets/product-name.md" >}} adapt both to the fast pace of development in the open source Envoy community, as well as to the unique needs of differing operational environments.

The {{< reuse "docs/snippets/product-name.md" >}} includes the following capabilities beyond open source Envoy:

* A flexible control plane with extensibility in mind
* More ergonomic, domain-specific APIs to drive Envoy configuration
* Function-level routing beyond routing a `host:port` for clusters, but instead extending to a Swagger/OpenAPI spec endpoint, gRPC function, cloud provider function such as AWS Lambda, and more
* Transformation of request/response via a super-fast C++ templating filter built on Inja
* Envoy filters to call AWS Lambda directly, handling the complex security handshaking
* Discovery of services running in a hybrid platform such as of virtual machines (VMs), containers, infrastructure as code (IaC), function as a service (FaaS), and so on

## What license is k8sgateway under?

The {{< reuse "docs/snippets/product-name.md" >}} project uses [Apache License 2.0](http://www.apache.org/licenses/).

## What is the project roadmap?

The {{< reuse "docs/snippets/product-name.md" >}} project organizes issues into milestones for release. For more details, see the GitHub project.

## What is the version support policy?

The {{< reuse "docs/snippets/product-name.md" >}} project supports one `n` latest version.

The `main` branch of the `k8sgateway` Git repository is for feature work under development, and is not stable.

## Is there enterprise software that is based on k8sgateway?

Yes, Solo.io provides an enterprise product called Gloo Gateway that is based on the {{< reuse "docs/snippets/product-name.md" >}} project. As an enterprise product, Gloo Gateway includes features such as:

* `n-3` version support
* Hardened {{< reuse "docs/snippets/product-name.md" >}} images for security and compliance, such as FIPS
* AI gateway
* External auth for OAuth, OIDC, JWT, and more
* Rate limiting
* Advanced traffic management, including extra upstreams for cloud providers such as Google
* Resiliency features such as caching and traffic tapping
* Data loss prevention (DLP)
* Web application firewall (WAF)

For more information, see the [Solo.io product website](https://www.solo.io/products/gloo-gateway/) and [Gloo Gateway documentation](https://docs.solo.io/gateway/latest/quickstart/).

{{< callout type="info" >}}
Intersted in becoming an enterprise provider of {{< reuse "docs/snippets/product-name.md" >}}? Contact the project maintainers.
{{< /callout >}}

## Can I use k8sgateway in a service mesh?

Yes, you can install {{< reuse "docs/snippets/product-name.md" >}} in a service mesh environment, such as Istio.

The {{< reuse "docs/snippets/product-name.md" >}} project is not a service mesh, but can be deployed complementary to a service mesh like Istio. Istio solves the challenges of service-to-service communication by controlling requests as they flow through the system. {{< reuse "docs/snippets/product-name.md" >}} can be deployed at the edge of the service-mesh boundary, between service meshes, or within the mesh to add the following capabilities:

* OAuth flows for end-user authentication
* GraphQL endpoints for aggregation of multiple services/APIs
* Transformation of request/response to decouple backend APIs from front end
* Function routing such as AWS Lambda
* Request/response caching
* Unified discovery services of infrastructure like Kubernetes, Consul, Vault, AWS EC2
* Unified discovery services of functions like REST/OAS spec, gRPC reflection, SOAP/WSDL, GraphQL, WebSockets, Cloud Functions, AWS Lambda

For an example of a {{< reuse "docs/snippets/product-name.md" >}} product that works with Istio, see the [Gloo Gateway and Istio integration guide](https://docs.solo.io/gateway/latest/integrations/istio/).

## How do you pronounce k8sgateway?

We say "kates" gateway, although you might commonly hear people say, "Kubernetes gateway."

In the international phonetic alphabet (IPA), this pronunciation is as follows:

```
/keɪts ˈɡeɪtˌweɪ/
```
