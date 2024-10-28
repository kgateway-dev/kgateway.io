---
title: Port reference
description: Review the ports that are used by Gloo Gateway open source.
weight: 50
---

Gloo Gateway deploys containers that listen on certain ports for incoming traffic. In the following sections, you can review the pods and services that make up Gloo Gateway, and the ports that these pods and services listen on. Note that if you choose to set up mutual TLS (mTLS) for communication between Gloo Gateway components, alternate ports and traffic flows are used.

{{% callout type="info" %}}
This list of ports reflects the default values that are included in an unmodified installation of Gloo Gateway. You can optionally change some port settings by providing custom values in your Gloo Gateway Helm chart.
{{% /callout %}}


## Gloo Gateway open source

Gloo Gateway open source software is the free, open source version of Gloo Gateway. The installation process uses a Helm chart to create the necessary custom resource definitions (CRDs), deployments, services, pods, etc. The services and pods listen on specific ports to enable communication between the components that make up Gloo Gateway and outside sources that will consume Upstream resources through Gloo Gateway.

### What's included

A standard installation of Gloo Gateway includes four primary components:

* **Gateway**
  * Translates Gloo Gateway custom resources, such as RouteOption and VirtualHostOption into a Proxy custom resource.
  * Validates proposed configurations before application.
* **Gloo Gateway**
  * Creates an Envoy configuration from multiple custom resources.
  * Serves Envoy configurations using xDS.
  * Validates Proxy configurations for the gateway.
* **Proxy**
  * Receives and loads configuration from Gloo Gateway xDS.
  * Proxies incoming traffic.
* **Discovery**
  * Discovers Upstreams in the cluster.
  * Discovers functions with the Function Discovery Service.

### Pods and ports

The four primary components are instantiated using pods and services. The following table lists the deployed pods and ports in use by each pod, as well as the optional `access-log` pod if Access Logging has been enabled.

| Pod | Port | Usage |
|-----|------|-------|
| gloo | 8443 | Validation |
| gloo | 9976 | REST xDS | 
| gloo | 9977 | xDS Server |
| gloo | 9988 | Validation |
| gloo | 9979 | WASM cache |
| gateway-proxy | 8080 | HTTP |
| gateway-proxy | 8443 | HTTPS |
| gateway-proxy | 19000 | Envoy admin |
| access-log | 8083 | Access logging |

The `discovery` pod does not listen on any ports as it uses outbound connections only.

### Services and ports

The following table lists the services backed by the deployed pods.

| Service | Port | Target | Target Port | Usage            |
|---------|------|--------|-------------|------------------|
| gloo | 443 | gateway | 8443 | Validation       |
| gloo | 9976 | gloo | 9976 | REST xDS         |
| gloo | 9977 | gloo | 9977 | xDS Server       |
| gloo | 9988 | gloo | 9988 | Validation       |
| gloo | 9979 | gloo | 9979 | WASM cache       |
| gloo | 9966 | gloo | 9966 | Proxy Debug gRPC |
| gateway-proxy | 80 | gateway-proxy | 8080 | HTTP             |
| gateway-proxy | 443 | gateway-proxy | 8443 | HTTPS            |
| access-log | 8083 | access-log | 8083 | Access logging   |


## mTLS considerations

Gloo Gateway supports the use of mutual TLS (mTLS) communication between the Gloo Gateway pod and other services, including the Envoy proxy, external auth server, and rate limiting server. Enabling mTLS includes the addition of sidecars for multiple pods, Envoy proxy for TLS termination, and SDS for certificate rotation and management. 

### Updated pods

The following pods are updated to support mTLS:
* **Gloo Gateway pod**: Envoy and SDS sidecars are added.
* **Gateway proxies**: SDS sidecars are added and the ConfigMap is updated for mTLS.
* **ExtAuth**: Envoy and SDS sidecars are added.
* **Rate-limit**: Envoy and SDS sidecars are added.

The additional Envoy sidecar has an admin port listening on 8081 for each pod.

### Updated traffic flow

The Envoy sidecar on the Gloo Gateway, extauth, and rate-limit pods intercepts the inbound traffic for each pod and performs the TLS decryption before passing the traffic to the main container. This process does not alter the ports that are used by the pods and services, but it does create additional ports that are used for internal communication within the pod. For instance, the Gloo Gateway pod continues to listen on 9977 as the xDS server. Internally, the Gloo Gateway container listens on 127.0.0.1:9999 for xDS requests. The Envoy sidecar in the pod accepts requests on 9977, decrypts the request, and sends it to port 9999 on the localhost for processing.
