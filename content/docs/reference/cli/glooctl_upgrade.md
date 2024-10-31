---
title: "glooctl upgrade"
description: "Reference for the 'glooctl upgrade' command."
weight: 5
---
## glooctl upgrade

Upgrade the glooctl binary

```
glooctl upgrade [flags]
```

### Options

```
  -h, --help             help for upgrade
      --path string      Desired path for your upgraded glooctl binary. Defaults to the location of your currently executing binary.
      --release string   Which glooctl release to download. Specify a release tag corresponding to the desired version of glooctl,"experimental" to use the version currently under development, or a major+minor release like v1.10.x to get the most recent patch version. (default "latest")
```

### Options inherited from parent commands

```
  -c, --config string              set the path to the glooctl config file (default "<home_directory>/.gloo/glooctl-config.yaml")
  -i, --interactive                use interactive mode
      --kube-context string        kube context to use when interacting with kubernetes
      --kubeconfig string          kubeconfig to use, if not standard one
```


