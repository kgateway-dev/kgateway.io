---
title: Contribution guidelines
weight: 50
---

The {{< reuse "docs/snippets/product-name.md" >}} project welcomes your contribution.

## Ways to contribute

* [Filing issues](#filing-issues)
* [Small bug fixes](#small-bug-fixes)
* [Big pull requests](#big-prs)
* [Documentation](#documentation)

### Filing issues

If you encounter a bug, you can report the issue on GitHub.

1. Review [existing issues](https://github.com/k8sgateway/k8sgateway.io/issues). If you find a similar issue, add a comment with more context or a 👍 reaction to indicate your agreement.
2. If you don't find a similar issue, [open an issue](https://github.com/k8sgateway/k8sgateway.io/issues/new/choose).


### Small bug fixes

If your bug fix is small (around 20 lines of code), just open a pull request. The PR template walks you through providing context and tests that verify your fix works. The maintainer team will try to merge the fix as soon as possible.

### Big PRs

Sometimes, you might need to open a larger PR, such as for:

- Big bug fixes
- New features

For significant changes to the {{< reuse "docs/snippets/product-name.md" >}} project, get input on the design before starting on the implementation.

1. Refer to [Filing issues](#filing-issues) to find or open an issue with your idea.
2. Refer to the [`devel` directory](https://github.com/k8sgateway/k8sgateway.io/tree/main/devel) in the {{< reuse "docs/snippets/product-name.md" >}} project for tools and helpful information to contribute, debug, and test your code.
3. Open a draft PR with the `work in progress` label to get feedback on your work.
4. Address any review comments that a team member leaves.

**The {{< reuse "docs/snippets/product-name.md" >}} codeowners will merge and release your code changes!**

## Code review guidelines

Every piece of code in {{< reuse "docs/snippets/product-name.md" >}} is reviewed by at least one team member familiar with that codebase.

1. **Changelog** Every PR in {{< reuse "docs/snippets/product-name.md" >}} needs a changelog entry. For more information about changelogs, see the [readme](https://github.com/solo-io/go-utils/tree/main/changelogutils). 
2. **CI check** A team member needs to kick off the CI process by commenting `/test` on your PR.
3. **Testing** Please write tests for your changes. Bias towards fast / unit testing. 
4. **Comments** The code reviewer may leave comments to discuss changes. Minor preferences are often called out with `nit`.

## Testing with coverage

To check coverage, run your tests in the package, such as:

```shell
ginkgo -cover && go tool cover -html *.coverprofile
```

## Documentation

The {{< reuse "docs/snippets/product-name.md" >}} ({{< reuse "docs/snippets/k8s-gateway-api-name.md" >}}) documentation is built from a public GitHub repository that you are welcome to contribute to.

To request changes to the documentation or report an issue, follow the steps in [Filing issues](#filing-issues). 
