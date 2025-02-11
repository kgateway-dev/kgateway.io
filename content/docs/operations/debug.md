---
title: Debug your setup
weight: 15
---

Use built-in tools to troubleshoot issues in your {{< reuse "docs/snippets/product-name.md" >}} setup.

{{< reuse "docs/snippets/product-name-caps.md" >}} is based on [Envoy proxy](https://www.envoyproxy.io). If you experience issues in your environment, such as policies that are not applied or traffic that is not routed correctly, in a lot of cases, these errors can be observed at the proxy. In this guide you learn how to use the {{< reuse "docs/snippets/product-name.md" >}} and Envoy debugging tools to troubleshoot misconfigurations on the gateway.  

## Before you begin

If you have not done yet, install the `{{< reuse "docs/snippets/cli-name.md" >}}` CLI. The `{{< reuse "docs/snippets/cli-name.md" >}}` CLI is a convenient tool that helps you gather important information about your gateway proxy. To install the `{{< reuse "docs/snippets/cli-name.md" >}}`, you run the following command: 
```sh
curl -sL https://run.solo.io/gloo/install | sh
export PATH=$HOME/.gloo/bin:$PATH
```

{{% callout type="info" %}}
Make sure to use the version of `{{< reuse "docs/snippets/cli-name.md" >}}` that matches your installed version.
{{% /callout %}}

## Debug your gateway setup

1. Check the {{< reuse "docs/snippets/product-name.md" >}} installation. You can do that by using the `{{< reuse "docs/snippets/cli-name.md" >}} check` [command](/docs/reference/cli/glooctl_check/) that quickly checks the health of {{< reuse "docs/snippets/product-name.md" >}} deployments, pods, and custom resources, and verifies Gloo resource configuration. Any issues that are found are reported back in the CLI output. 
   ```sh
   {{< reuse "docs/snippets/cli-name.md" >}} check
   ```
   
   Example output for a misconfigured VirtualHostOption:
   ```console
   Found rejected VirtualHostOption by 'gloo-system': gloo-system jwt (Reason: 2 errors occurred:
	* invalid virtual host [http~bookinfo_example] while processing plugin enterprise_warning: Could not load configuration for the following Enterprise features: [jwt]
   ```
   
2. Get the details for the failed resource. For example to get the details of a VirtualHostOption, you can use the following command. 
   ```sh
   kubectl get virtualhostoption <name> -n <namespace>
   ```
   
3. If the resources seem to be ok, you can check the configuration that is applied on your gateway. Configuration might be missing on the gateway or might be applied to the wrong route. For example, if you apply multiple RouteOption resources to the same route by using the `targetRefs` section, only the oldest RouteOption is applied. The newer RouteOption configuration is ignored and not applied to the gateway. 
   ```sh
   {{< reuse "docs/snippets/cli-name.md" >}} get proxy -o yaml
   ```

4. If the proxy resource seems to be ok, you can access the debugging interface of your gateway proxy on your localhost. 
    ```sh
   kubectl port-forward deploy/gloo-proxy-http -n gloo-system 19000 &  
   ```
   
   {{< reuse-image src="img/gateway-admin-interface.png" caption="Figure: Debugging interface of the gateway proxy.">}}
   
   Common endpoints that can help troubleshoot your setup further, include: 
   | Endpoint | Description| 
   | -- | -- | 
   | config_dump | Get the configuration that is available in the Envoy proxy. Any {{< reuse "docs/snippets/product-name.md" >}} resources that you create are translated in to Envoy configuration. Depending on whether or not you enabled resource validation, you might have applied invalid configuration that is rejected Envoy. You can also use `{{< reuse "docs/snippets/cli-name.md" >}} proxy dump` to get the Envoy proxy configuration. | 
   | listeners | See the listeners that are configured on your gateway. | 
   | logging | Review the log level that is set for each component. |  
   | stats/prometheus | View metrics that Envoy emitted and sent to the built-in Prometheus instance. |

5. Check the proxy configuration that is served by the {{< reuse "docs/snippets/product-name.md" >}} xDS server. When you create {{< reuse "docs/snippets/product-name.md" >}} resources, these resources are translated into Envoy configuration and sent to the xDS server. If {{< reuse "docs/snippets/product-name.md" >}} resources are configured correctly, the configuration must be included in the proxy configuration that is served by the xDS server. 
   ```sh
   {{< reuse "docs/snippets/cli-name.md" >}} proxy served-config --name gloo-proxy-http
   ```
   
6. Review the components of your {{< reuse "docs/snippets/product-name.md" >}} setup. The number of components varies depending on whether you installed the Open source or Enterprise Edition of {{< reuse "docs/snippets/product-name.md" >}}. 
   ```sh
   kubectl get pods -n gloo-system
   ```
   
   Example output for open source: 
   ```console
   NAME                                     READY   STATUS    RESTARTS   AGE
   gloo-6bf6478bd8-rdghl                    1/1     Running   0          141m
   gloo-proxy-http-77454f4df9-vchvf         2/2     Running   0          140m
   redis-54757c7964-zxnb8                   1/1     Running   0          141m
   ```
   
   Example output for Enterprise edition:
   ```console
   NAME                                     READY   STATUS    RESTARTS   AGE
   extauth-7f67b6bc68-2xsth                 1/1     Running   0          141m
   gloo-6bf6478bd8-rdghl                    1/1     Running   0          141m
   gloo-proxy-http-77454f4df9-vchvf         2/2     Running   0          140m
   rate-limit-5fc5fc9b8c-g4mfm              1/1     Running   0          141m
   redis-54757c7964-zxnb8                   1/1     Running   0          141m
   ```
   
7. Review the logs for each component. Each component logs the sync loops that it runs, such as syncing with various environment signals like the Kubernetes API. You can fetch the latest logs for all the components with the following command. 
   ```bash
   {{< reuse "docs/snippets/cli-name.md" >}} debug logs
   # save the logs to a file
   {{< reuse "docs/snippets/cli-name.md" >}} debug logs -f gloo.log
   # only print errors
   {{< reuse "docs/snippets/cli-name.md" >}} debug logs --errors-only
   ```
   
   You can use the `kubectl logs` command to view logs for individual components. 
   ```bash
   kubectl logs -f -n gloo-system -l gloo=gloo
   ```

   To follow the logs of other {{< reuse "docs/snippets/product-name.md" >}} components, simply change the value of the `gloo` label as shown in the table below.

   | Component | Command |
   | ------------- | ------------- |
   | Gloo control plane | `kubectl logs -f -n gloo-system -l gloo=gloo` |
   | Gloo gateway proxy {{< callout type="info" >}}To view logs for incoming requests to your gateway proxy, be sure to <a href="/docs/security/access-logging/" >enable access logging</a> first.{{< /callout >}}| `kubectl logs -f -n gloo-system -l gloo=kube-gateway` |
   | Redis | `kubectl logs -f -n gloo-system -l gloo=redis` |

8. If you still cannot troubleshoot the issue, capture the logs and the state of {{< reuse "docs/snippets/product-name.md" >}} in a file. 
   ```bash
   {{< reuse "docs/snippets/cli-name.md" >}} debug logs -f gloo-logs.log
   {{< reuse "docs/snippets/cli-name.md" >}} debug yaml -f gloo-yamls.yaml
   ```
   


