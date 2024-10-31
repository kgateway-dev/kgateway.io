---
title: "glooctl check"
description: "Reference for the 'glooctl check' command."
weight: 5
---
## glooctl check

Checks {{< reuse "docs/snippets/product-name.md" >}} resources for errors.

### Synopsis

usage: glooctl check [-o FORMAT]

```
glooctl check [flags]
```

### Options

```
  -x, --exclude strings                   check to exclude: (deployments, pods, upstreams, upstreamgroup, auth-configs, rate-limit-configs, virtual-host-options, route-options, secrets, virtual-services, gateways, proxies, xds-metrics, kube-gateway-classes, kube-gateways, kube-http-routes)
  -h, --help                              help for check
  -n, --namespace string                  namespace for reading or writing resources (default "gloo-system")
  -o, --output OutputType                 output format: (json, table) (default table)
  -p, --pod-selector string               Label selector for pod scanning (default "gloo")
      --read-only                         only do checks that dont require creating resources (i.e. port forwards)
  -r, --resource-namespaces stringArray   Namespaces in which to scan {{< reuse "docs/snippets/product-name.md" >}} custom resources. If not provided, all watched namespaces (as specified in settings) will be scanned.
```

### Options inherited from parent commands

```
  -c, --config string              set the path to the glooctl config file (default "<home_directory>/.gloo/glooctl-config.yaml")
  -i, --interactive                use interactive mode
      --kube-context string        kube context to use when interacting with kubernetes
      --kubeconfig string          kubeconfig to use, if not standard one
```



