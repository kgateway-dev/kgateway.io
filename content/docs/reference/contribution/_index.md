---
title: Doc contributions
weight: 50
---

The {{< reuse "docs/snippets/product-name.md" >}} project welcomes your documentation contributions. This section contains all the information you need to contribute content to {{< reuse "docs/snippets/product-name.md" >}}.

## Before you begin

- Install Hugo 0.1.35

## Documentation language

All documentation content must be written in English. Currently, no other languages are supported. 

## GitHub 




## Local preview



Before you begin
To contribute to the Istio documentation, you need to:

Create a GitHub account.

Sign the Contributor License Agreement.

Install Docker on your authoring system to preview and test your changes.

The Istio documentation is published under the Apache 2.0 license.

Perform quick edits
Anyone with a GitHub account who signs the CLA can contribute a quick edit to any page on the Istio website. The process is very simple:

Visit the page you wish to edit.
Click the pencil icon in the lower right corner.
Perform your edits on the GitHub UI.
Submit a Pull Request with your changes.
Please see our guides on how to contribute new content or review content to learn more about submitting more substantial changes.

Branching strategy
Active content development takes place using the master branch of the istio/istio.io repository. On the day of an Istio release, we create a release branch of master for that release. The following button takes you to the repository on GitHub:


The {{< reuse "docs/snippets/product-name.md" >}} documentation repository uses multiple branches to publish documentation for all Istio releases. Each Istio release has a corresponding documentation branch. For example, there are branches called release-1.0, release-1.1, release-1.2 and so forth. These branches were created on the day of the corresponding release. To view the documentation for a specific release, see the archive page.

This branching strategy allows us to provide the following Istio online resources:

The public site shows the content from the current release branch.

The preliminary site at https://preliminary.istio.io shows the content from the master branch.

The archive site shows the content from all prior release branches.

Given how branching works, if you submit a change into the master branch, that change won’t appear on istio.io until the next major Istio release happens. If your documentation change is relevant to the current Istio release, then it’s probably worth also applying your change to the current release branch. You can do this easily and automatically by using the special cherry-pick labels on your documentation PR. For example, if you introduce a correction in a PR to the master branch, you can apply the cherrypick/release-1.4 label in order to merge this change to the release-1.4 branch.

When your initial PR is merged, automation creates a new PR in the release branch which includes your changes.




