---
title: Dev contributions
weight: 50
prev: /docs/reference/helm
next: /docs/reference/contribution
---

The {{< reuse "docs/snippets/product-name.md" >}} project welcomes your contribution.

## Ways to contribute

* [Filing issues](#filing-issues)
* [Small bug fixes](#small-bug-fixes)
* [Big pull requests](#big-prs)
* [Documentation](#documentation)

### Filing issues

If you encounter a bug, you can report the issue in one of the following GitHub repositories.

1. Review existing issues. If you find a similar issue, add a comment with more context or a thumbs-up (👍) reaction to indicate your agreement.
2. If you don't find a similar issue, open an issue.

{{< cards >}}
  {{< card link="https://github.com/k8sgateway/k8sgateway/issues" title="Development Code" icon="code">}}
  {{< card link="https://github.com/k8sgateway/community/issues" title="Community, Governance, Maintainers" icon="clipboard">}}
  {{< card link="https://github.com/k8sgateway/k8sgateway.io/issues" title="Docs and Website" icon="book-open">}}
{{< /cards >}}

### Small bug fixes

If your bug fix is small (around 20 lines of code), just open a pull request. The PR template walks you through providing context and tests that verify your fix works. The maintainer team will try to merge the fix as soon as possible.

### Big PRs

Sometimes, you might need to open a larger PR, such as for:

- Big bug fixes
- New features

For significant changes to the {{< reuse "docs/snippets/product-name.md" >}} project, get input on the design before starting on the implementation.

1. **Open an issue**: Refer to [Filing issues](#filing-issues) to find or open an issue with your bug or feature request.
2. **Contact us**: To discuss your proposed changes, message us on the [CNCF Slack, `#k8sgateway` channel](https://cloud-native.slack.com/archives/C080D3PJMS4) or join a community meeting by adding the [`k8sgateway` calendar to your Google account](https://calendar.google.com/calendar/u/1?cid=ZDI0MzgzOWExMGYwMzAxZjVkYjQ0YTU0NmQ1MDJmODA5YTBjZDcwZGI4ZTBhZGNhMzIwYWRlZjJkOTQ4MzU5Y0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t).
3. **Agree on an implementation plan**: Write a plan for how this feature or bug fix should be implemented. For example, should this contribution be in one pull request or in multiple, incremental improvements? Who is going to do each part?
4. **Draft your changes**: Open a draft PR with the `work in progress` label to get feedback on your work.
5. **Review**: Address any review comments that a team member leaves. At least one maintainer signs off before a change is merged. For more information, see [Code review guidelines](#code-review-guidelines).
6. **Close out**: A maintainer merges the PR and lets you know about the next release plan.

## Code review guidelines

Every piece of code in {{< reuse "docs/snippets/product-name.md" >}} is reviewed by at least one team member familiar with that codebase.

1. **Changelog**: The {{< reuse "docs/snippets/product-name.md" >}} project uses GitHub's automatically generated release notes feature. As such, make sure that your PR description includes a clear, concise message of the change, including any user-facing steps to use the feature.
2. **CI check**: A team member needs to kick off the CI process by commenting `/test` on your PR.
3. **Testing**: Please write tests for your changes. Bias towards fast / unit testing. 
4. **Comments**: The code reviewer may leave comments to discuss changes. Minor preferences are often called out with `nit`.

## Documentation

The {{< reuse "docs/snippets/product-name.md" >}} documentation is built from a public GitHub repository that you are welcome to contribute to. For more information, refer to [Doc contributions](/docs/reference/contribution/).

## Community governance

To contribute in the community by participating in regular meetings and governance activities, refer to the [`k8sgateway/community` GitHub repository](https://github.com/k8sgateway/community).

The community guidelines also discuss the role requirements to become a code reviewer.
