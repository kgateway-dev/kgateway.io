---
title: Overview
weight: 10
description: Learn more about k8sgateway, its architecture, and benefits. 
---

Learn more about k8sgateway, its architecture, and benefits. 

## About {{< reuse "docs/snippets/product-name.md" >}}

{{< reuse "docs/snippets/product-name.md" >}} is a feature-rich, fast, and flexible Kubernetes-native ingress controller and next-generation API gateway that is built on top of [Envoy proxy](https://www.envoyproxy.io/). An API Gateway is a reverse proxy that serves as a security barrier between your clients and the microservices that make up your app. In order to access a microservice, all clients must send a request to the API Gateway. The API Gateway then verifies and routes the request to the microservice.

To let you set up and leverage advanced routing, traffic management, security, resiliency, and integration capabilities, you can choose to run a {{< reuse "docs/snippets/product-name.md" >}} proxy with one of the following APIs: the **Kubernetes Gateway API with custom {{< reuse "docs/snippets/product-name.md" >}} extensions** or the **Gloo Edge API**. The {{< reuse "docs/snippets/product-name.md" >}} control plane can process custom resource requests from both APIs and translate these resources into valid Envoy configuration that the Envoy proxies can pick up and apply. 

Because of that, {{< reuse "docs/snippets/product-name.md" >}} gives you the flexibility to run both Kubernetes Gateway API and Gloo Edge API Envoy proxies in your environment at the same time so that you can customize your API gateway to the needs of your app and organization. {{< reuse "docs/snippets/one-install.md" >}}

### K8s Gateway API

{{< reuse "docs/snippets/product-name.md" >}} is fully conformant with the Kubernetes Gateway API and extends its functionality with Solo's custom Gateway APIs, such as RouteOption, VirtualHostOption, Upstreams, RateLimitConfig, or AuthConfig. These resources help to centrally configure routing, security, and resiliency rules for a specific component, such as a host, route, or gateway listener.
s
The following image shows the extensions that {{< reuse "docs/snippets/product-name.md" >}} provides on top of the Kubernetes Gateway API:



The capabilities that you can leverage in your API Gateway, such as applying the following features to a host or route, depend on the {{< reuse "docs/snippets/product-name.md" >}} edition that you install:

- **Open source (OSS)**: </br>
  Set up an Envoy proxy that is based on the Kubernetes Gateway API and use Kubernetes Gateway API-native features and the following {{< reuse "docs/snippets/product-name.md" >}} extensions to configure basic routing, security, and resiliency capabilities. Note that this list provides a general overview of major features, and is not exhaustive.
  * [Access logging](/docs/security/access-logging/)
  * [Buffering](/docs/traffic-management/buffering/)
  * [Cross-Origin Resource Sharing (CORS)](/docs/security/cors/)
  * [Cross-Site Request Forgery (CSRF)](/docs/security/csrf/)
  * [Fault injection](/docs/resiliency/fault-injection/)
  * [Header control](/docs/traffic-management/header-control/)
  * [Local rate limiting](/docs/security/ratelimit/local/)
  * [Proxy protocol](/docs/traffic-management/proxy-protocol/)
  * [Retries](/docs/resiliency/retry/)
  * [Timeouts](/docs/resiliency/timeouts/)
  * [Transformations](/docs/resiliency/traffic-management/transformations/)</br></br>


## Default gateway proxy setup

{{< reuse "docs/snippets/product-name.md" >}} automatically spins up, bootstraps, and manages gateway proxy deployments when you create a Kubernetes Gateway resource. To do that, a combination of {{< reuse "docs/snippets/product-name.md" >}} and Kubernetes resources are used, such as GatewayClass, GatewayParameters, Settings, and a gateway proxy template that includes the Envoy configuration that each proxy is bootstrapped with. 

To learn more about the default setup and how these resources interact with each other, see the [Default gateway proxy setup](/docs/setup/default/).