---
title: CLI
weight: 10
---

Manage the `glooctl` command line interface (CLI) tool.

## Quick installation {#latest}

Install the latest version of `glooctl`. Make sure to add `glooctl` to your PATH (see [macOS](https://osxdaily.com/2014/08/14/add-new-path-to-path-command-line/) or [Linux](https://linuxize.com/post/how-to-add-directory-to-path-in-linux/) for specific instructions).

* Linux and macOS:
  ```shell
  curl -sL https://run.solo.io/gloo/install | sh
  export PATH=$HOME/.gloo/bin:$PATH
  ```
* Windows: Notes that this script requires OpenSSL.
  ```shell
  (New-Object System.Net.WebClient).DownloadString("https://run.solo.io/gloo/windows/install") | iex
  $env:Path += ";$env:userprofile/.gloo/bin/"
  ```

## Install a specific version of the CLI {#specific}

You can download a specific version of `glooctl` directly from the GitHub releases page.

1. In your browser, navigate to the [{{< reuse "docs/snippets/product-name.md" >}} project releases](https://github.com/k8sgateway/k8sgateway.io/releases).
2. Choose the version of `glooctl` to install.
3. Click the version of `glooctl` that you want to install.
4. In the **Assets**, download the `glooctl` package that matches your operating system, and follow your operating system procedures for replacing your existing `glooctl` binary file with the upgraded version.
5. After downloading, rename the executable to `glooctl` and add it to your system's `PATH`.

## Upgrade the CLI

When it's time to upgrade {{< reuse "docs/snippets/product-name.md" >}}, make sure to update the `glooctl` CLI version before upgrading.

You can use the `glooctl upgrade` command to upgrade or roll back the `glooctl` version. For example, you might change versions during an upgrade process, or when you have multiple versions of {{< reuse "docs/snippets/product-name.md" >}} across clusters that you manage from the same workstation. For more options, run `glooctl upgrade --help`.

{{< callout type="info" >}}
Upgrading the `glooctl` CLI does _not_ upgrade the {{< reuse "docs/snippets/product-name.md" >}} version that you run in your clusters.
{{< /callout >}}

1. Set the version to upgrade `glooctl` to in an environment variable. Include the patch version.
   ```sh
   export GLOOCTL_VERSION=<version>
   ```
   
2. Upgrade your version of `glooctl`.
   ```bash
   glooctl upgrade --release v${GLOOCTL_VERSION}
   ```

3. Verify the `glooctl` CLI is installed and running the appropriate version. In the output, the **Client** is your local version. The **Server** is the version that runs in your cluster, and is `undefined` if {{< reuse "docs/snippets/product-name.md" >}} is not installed yet.
   ```bash
   glooctl version -o table
   ```

## Uninstall the CLI

To uninstall `glooctl`, you can delete the executable file from your system, such as on macOS in the following example.

```shell
rm ~/.gloo/bin/glooctl
```

## Skew policy

Use the same version of the `glooctl` CLI as the {{< reuse "docs/snippets/product-name.md" >}} version that you installed in your cluster.

* Slight skews within minor versions typically work, such as `glooctl` 1.18.1 and {{< reuse "docs/snippets/product-name.md" >}} 1.18.0.
* Compatibility across beta versions is not guaranteed, even within minor version skews.
* To resolve bugs in `glooctl`, you might have to upgrade the CLI to a specific or latest version.

## Reference documentation

For more information about each `glooctl` command, see the [CLI documentation](/docs/reference/cli/) or run the help flag for a command.

```shell
glooctl --help
```

## Other command line tools {#other-cli}

As you use {{< reuse "docs/snippets/product-name.md" >}}, you might need the following common cluster management command line tools on your local system.

| CLI tool | Description |
| -------- | ----------- |
| Cloud provider CLI | The CLI to interact with your preferred cloud provider, such as `aws` or `gcloud`. You might also have local cluster testing tools such as `kind` or `k3d`. `gcloud`. |
| [`istioctl`](https://istio.io/latest/docs/setup/getting-started/#download) | The Istio command line tool, if you plan to use the Istio integration in your {{< reuse "docs/snippets/product-name.md" >}} environment. The guides in this documentation use Istio version {{< reuse "docs/versions/istio_patch.md" >}}. To check your installed version, run `istioctl version`. |
| [`helm`](https://helm.sh/docs/intro/install/)| The Kubernetes package manager, to customize multiple settings in a {{% reuse "docs/snippets/product-name.md" %}} installation. |
| [`jq`](https://stedolan.github.io/jq/download/) | Parse JSON output, such as from logs, to get values that you can use in subsequent commands, environment variables, or other contexts. |
| [`kubectl`](https://kubernetes.io/docs/tasks/tools/#kubectl) | The Kubernetes command line tool. Download the `kubectl` version that is within one minor version of the Kubernetes clusters you plan to use with {{< reuse "docs/snippets/product-name.md" >}}. |
| `openssl` | {{< reuse "docs/snippets/cert_openssl.md" >}} |