---
title: "glooctl uninstall"
description: "Reference for the 'glooctl uninstall' command."
weight: 5
---
## glooctl uninstall

Uninstall {{< reuse "docs/snippets/product-name.md" >}}.

```
glooctl uninstall [flags]
```

### Options

```
      --all                   Deletes all {{< reuse "docs/snippets/product-name.md" >}} resources, including the namespace, crds, and cluster role
      --delete-crds           Delete all {{< reuse "docs/snippets/product-name.md" >}} crds (all custom {{< reuse "docs/snippets/product-name.md" >}} objects will be deleted)
      --delete-namespace      Delete the namespace (all objects written to this namespace will be deleted)
  -h, --help                  help for uninstall
  -n, --namespace string      namespace in which {{< reuse "docs/snippets/product-name.md" >}} is installed (default "gloo-system")
      --release-name string   helm release name (default "gloo")
  -v, --verbose               If true, output from kubectl commands will print to stdout/stderr
```

### Options inherited from parent commands

```
  -c, --config string              set the path to the glooctl config file (default "<home_directory>/.gloo/glooctl-config.yaml")
  -i, --interactive                use interactive mode
      --kube-context string        kube context to use when interacting with kubernetes
      --kubeconfig string          kubeconfig to use, if not standard one
```



