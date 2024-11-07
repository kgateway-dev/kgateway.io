---
title: "glooctl upgrade"
weight: 5
---

Reference docs for the `{{< reuse "docs/snippets/cli-name.md" >}} upgrade` command.

## glooctl upgrade

Upgrade the {{< reuse "docs/snippets/cli-name.md" >}} binary.

```
{{< reuse "docs/snippets/cli-name.md" >}} upgrade [flags]
```

### Options

```
  -h, --help             help for upgrade
      --path string      Desired path for your upgraded {{< reuse "docs/snippets/cli-name.md" >}} binary. Defaults to the location of your currently executing binary.
      --release string   Which {{< reuse "docs/snippets/cli-name.md" >}} release to download. Specify a release tag corresponding to the desired version of {{< reuse "docs/snippets/cli-name.md" >}},"experimental" to use the version currently under development, or a major+minor release like v1.10.x to get the most recent patch version. (default "latest")
```

### Options inherited from parent commands

```
  -c, --config string              set the path to the {{< reuse "docs/snippets/cli-name.md" >}} config file (default "<home_directory>/.gloo/glooctl-config.yaml")
  -i, --interactive                use interactive mode
      --kube-context string        kube context to use when interacting with kubernetes
      --kubeconfig string          kubeconfig to use, if not standard one
```


