---
title: Add documentation
weight: 10
---

To contribute new documentation to {{< reuse "docs/snippets/product-name.md" >}}, follow these steps:

- Identify the audience and intended use for the content.
- Choose the type of content you wish to contribute.
- Choose a file name, title, and add your front matter
- Write your contribution following the {{< reuse "docs/snippets/product-name.md" >}} contribution guidelines.
- Submit your contribution to the {{< reuse "docs/snippets/product-name.md" >}} GitHub repository.
- Follow the review process until your contribution is merged.


## Audience and intended use

The best documentation starts by knowing the intended readers, their knowledge, and what you expect them to do with the information. Otherwise, you cannot determine the appropriate scope and depth of information to provide, its ideal structure, or the necessary supporting information. The following examples show this principle in action:

The reader needs to perform a specific task: Tell them how to recognize when the task is necessary and provide the task itself as a list of numbered steps, don’t simply describe the task in general terms.

The reader must understand a concept before they can perform a task: Before the task, tell them about the prerequisite information and provide a link to it.

The reader needs to make a decision: Provide the conceptual information necessary to know when to make the decision, the available options, and when to choose one option instead of the other.

The reader is an administrator but not a SWE: Provide a script, not a link to a code sample in a developer’s guide.

The reader needs to extend the features of the product: Provide an example of how to extend the feature, using a simplified scenario for illustration purposes.

The reader needs to understand complex feature relationships: Provide a diagram showing the relationships, rather than writing multiple pages of content that is tedious to read and understand.

The most important thing to avoid is the common mistake of simply giving readers all the information you have, because you are unsure about what information they need.

If you need help identifying the audience for you content, we are happy to help and answer all your questions during the Docs Working Group biweekly meetings.

## Content types
When you understand the audience and the intended use for the information you provide, you can choose the content type that best addresses their needs. To make it easy for you to choose, the following table shows the supported content types, their intended audiences, and the goals each type strives to achieve:

|Content type |	Goals | Audiences |
| -- | -- | -- |
|Concepts | Explain some significant aspect of Istio. For example, a concept page describes the configuration model of a feature and explains its functionality. Concept pages don't include sequences of steps. Instead, provide links to corresponding tasks.	| Readers that want to understand how features work with only basic knowledge of the project. | 
| Reference pages| Provide exhaustive and detailed technical information. Common examples include API parameters, command-line options, configuration settings, and advanced procedures. Reference content is generated from the Istio code base and tested for accuracy. | Readers with advanced and deep technical knowledge of the project that needs specific bits of information to complete advanced tasks. |
| Tasks	| Shows how to achieve a single goal using Istio features. Tasks contain procedures written as a sequence of steps. Tasks provide minimal explanation of the features, but include links to the concepts that provide the related background and knowledge. Tasks must include automated tests since they are tested and maintained for technical accuracy.	| Readers that want to use Istio features. |
| Setup pages | Focus on the installation steps needed to complete an Istio deployment. Setup pages must include automated tests since they are tested and maintained for technical accuracy. |	New and existing Istio users that want to complete a deployment. |
| FAQs | Provide quick answers to common questions. Answers don't introduce any concepts. Instead, they provide practical advice or insights. Answers must link to tasks, concepts, or examples in the documentation for readers to learn more.	| Readers with specific questions who are looking for brief answers and resources to learn more. |
| Operation guides	| Focus on practical solutions that address specific problems encountered while running Istio in a real-world setting. |	Service mesh operators that want to fix problems or implement solutions for running Istio deployments. |


## File names and title 

All documentation in the {{< reuse "docs/snippets/product-name.md" >}} project is written in markdown and built by using the static site generator Hugo. In Hugo, the name of the file or folder becomes part of the link to your page. Becaues, of that, it is important to carefully choose the name for the file or folder that you want to add. If the file name consists of multiple words, separate them by hyphens. For example, to add a topic about external authentication, your file name might be `ext-auth.md`. All file names must be lowercase. Keep file and folder names as short as possible to ensure easy cross-linking between topics. 

Pick a title for your topic that has the keywords you want search engines to find. If you want to add a folder or "twistie" to the docs that has multipe sub-topics, create the folder with at least one `_index.md` file. This file has the title of your twistie and can be used to provide general overview information about the section that you want to add. 


## Front matter

Each file must start with a front matter that includes the title and weight of the file. In the following example, the topic shows up as `External authentication` in the left-hand navigation. The weight configures the order of the page relative to the other pages in the directory, and therefore determines the order in which files are displayed in the left-hand navigation. 
```
---
title: External authentication
weight: 20
---
```

## Hugo shortcodes

As mentioned earlier, the documentation in the {{< reuse "docs/snippets/product-name.md" >}} project is built by using the static site generator Hugo. Hugo uses reusable templates, commonly referred to as shortcodes, to display, style, and render site elements, such as tables, videos, or cards and to manage the content for these elements more easily. Supported shortcodes can be found [here](https://github.com/k8sgateway/k8sgateway.io/tree/main/layouts/shortcodes) as well as [here](https://github.com/imfing/hextra/tree/main/exampleSite/content/docs/guide/shortcodes). 

Review common shortcodes that you find throughout the documentation: 

### reuse
You can use the reuse shortcode to reuse content in multiple places while maintaining a single source of truth. A common use case for this shortcode is a reference to the latest version, product names, or short paragraphs. The source of the reused content is stored as a markdown file in the `assets/docs` directory. 

The following example shows the example syntax for using this shortcode: 
```markdown
The guide includes steps to install {{</* reuse "docs/snippets/product-name.md" */>}} in three ways.
```

The content of `product-name.md` is as follows: 
```
K8sGateway
```

### reuse-image
Similar to the reuse shortcode, the reuse-image shortcode is used to display images in the documentation. Images are stored in the `assets/img` folder.

The following example shows the example syntax for using this shortcode: 

```markdown
{{</* reuse-image src="img/translation.svg" */>}}
```

To support different screen sizes, make sure to use images of type `.svg` only. 


### cards

Use the cards shortcode to display a card in the documentation that links to a specific topic within or outside the documentation. You can read more about this shortcode [here](https://imfing.github.io/hextra/docs/guide/shortcodes/cards/). 

### callout

A box that displays important information to the user. You can read more about this shortcode [here](https://imfing.github.io/hextra/docs/guide/shortcodes/callout/).


## Create a PR in GitHub

The {{< reuse "docs/snippets/product-name.md" >}} documentation follows the standard GitHub collaboration flow for pull requests (PRs). This well-established collaboration model helps open source projects manage the following types of contributions:

- Add new files to the repository.
- Edit existing files.
- Review the added or modified files.
- Manage multiple release or development branches.

The contribution guidelines assume you can complete the following tasks:

- Fork the [{{< reuse "docs/snippets/product-name.md" >}} repository](https://github.com/k8sgateway/k8sgateway.io/).
- Create a branch for your changes.
- Add commits to that branch.
- Open a PR to share your contribution.

## Review

The documentation maintainers of the {{< reuse "docs/snippets/product-name.md" >}} project will review your pull request to ensure the PR follows the documentation contribution guidelines. Once reviewed and approved by the maintainers, your PR is merged into the documentation codebase and your changes will show up on the documentation site. 