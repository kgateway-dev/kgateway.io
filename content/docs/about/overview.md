---
title: Overview
weight: 10
description: Learn more about k8sgateway, its architecture, and benefits. 
---

Learn more about k8sgateway, its architecture, and benefits. 

## About k8sgateway

{{< reuse "docs/snippets/product-name.md" >}} is a feature-rich, fast, and flexible Kubernetes-native ingress controller and next-generation API gateway that is built on top of [Envoy proxy](https://www.envoyproxy.io/) and the Kubernetes Gateway API. An API Gateway is a reverse proxy that serves as a security barrier between your clients and the microservices that make up your app. In order to access a microservice, all clients must send a request to the API Gateway. The API Gateway then verifies and routes the request to the microservice.

{{< reuse "docs/snippets/product-name.md" >}} is fully conformant with the Kubernetes Gateway API and extends its functionality with custom Gateway APIs, such as RouteOption, VirtualHostOption, or Upstreams. These resources help to centrally configure advanced traffic management, security, and resiliency rules for a specific component, such as a host, route, or gateway listener.

## Extensions

The following image shows the extensions that {{< reuse "docs/snippets/product-name.md" >}} provides on top of the Kubernetes Gateway API to configure advanced routing, security, and resiliency capabilities.

{{< reuse-image src="img/gateway-extensions.svg" width="700px" >}}

  * [Access logging](/docs/security/access-logging/)
  * [AWS ALB and NLB](/docs/setup/customize/aws-elb/)
  * [AWS Lambda](/docs/traffic-management/destination-types/upstreams/lambda)
  * [Buffering](/docs/traffic-management/buffering/)
  * [Cross-Origin Resource Sharing (CORS)](/docs/security/cors/)
  * [Cross-Site Request Forgery (CSRF)](/docs/security/csrf/)
  * [Delegation](/docs/traffic-management/route-delegation/)
  * [Direct responses](/docs/traffic-management/direct-response/)
  * [Fault injection](/docs/resiliency/fault-injection/)
  * [Gateway customization](/docs/setup/customize/)
  * [Header control](/docs/traffic-management/header-control/)
  * [Health checks](/docs/traffic-management/health-checks/)
  * [Integrations](/docs/integrations/)
  * [Local rate limiting](/docs/security/local/)
  * [Proxy protocol](/docs/traffic-management/proxy-protocol/)
  * [Redirects](/docs/traffic-management/redirect/)
  * [Request matching](/docs/traffic-management/match/)
  * [Resource validation](/docs/about/resource-validation/) 
  * [Retries](/docs/resiliency/retry/)
  * [Rewrites](/docs/traffic-management/rewrite/)
  * [Shadowing](/docs/resiliency/shadowing/)
  * [TCP keepalive](/docs/traffic-management/tcp_keepalive/)
  * [Timeouts](/docs/resiliency/timeouts/)
  * [Transformations](/docs/traffic-management/transformations/)</br></br>


## Default gateway proxy setup

{{< reuse "docs/snippets/product-name.md" >}} automatically spins up, bootstraps, and manages gateway proxy deployments when you create a Kubernetes Gateway resource. To do that, a combination of {{< reuse "docs/snippets/product-name.md" >}} and Kubernetes resources are used, such as GatewayClass, GatewayParameters, Settings, and a gateway proxy template that includes the Envoy configuration that each proxy is bootstrapped with. 

To learn more about the default setup and how these resources interact with each other, see the [Default gateway proxy setup](/docs/setup/default/).