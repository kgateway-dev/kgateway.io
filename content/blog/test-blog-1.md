---
title: "From Gloo to Kgateway"
toc: false
description: "Advancing Open Source Gateways with CNCF Alternative title: Donating Gloo to CNCF: Introducing Kgateway for Cloud Connectivity!"
publishDate: 2025-01-01T00:00:00-00:00
author: Lin Sun
---

At KubeCon NA 2024, Solo.io announced its intention to donate the Gloo Gateway open source project to the CNCF, to benefit the broader cloud native ecosystem. In case you are not familiar with Gloo Gateway, it is the most mature and widely deployed Envoy-based gateway in the market today. Built on open source and open standards, Gloo Gateway is Kubernetes-native and implements the Kubernetes Gateway API. Today, we’d like to update you on some exciting developments since the announcement.

# What is a gateway, and why donate Gloo Gateway to CNCF?

If you are using Kubernetes, you most likely need a gateway to control traffic going into or out of your cluster. Gateways are a critical component of the Kubernetes ecosystem, which is why the Kubernetes community collectively developed the Gateway API based on lessons learned from the Ingress API and Istio. With the growth of AI workloads and the rising need for traffic and cost control for calling LLM providers, gateways play an even more critical role in controlling and securing all-direction traffic—north-south, east-west, or inter-service communication.

While Gloo Gateway is the most mature and feature-rich Envoy-based gateway today, we believe that under vendor-neutral governance, the project’s adoption and ecosystem integration will reach new heights. Donating the project to the CNCF will expand the contributor base, foster innovation across organizations, and provide a battle-tested, feature-rich, vendor-neutral gateway project to the diverse global CNCF user community.

# Project Update

In November 2024, we moved the Gloo open source repository to the k8sgateway repository as a preparatory step for the donation. After working with the CNCF TOC, Kubernetes SIG-Network, and steering committee leaders, we renamed the project to kgateway.

# Donation to CNCF

Given Gloo’s large adopter base, we believe kgateway qualifies as a CNCF incubation project. Due to the lengthy due diligence process for incubation projects, we decided to donate it as a CNCF sandbox project instead. We look forward to working with the CNCF TOC and TAG Network leaders for the upcoming sandbox review.

# Open Governance

Working closely with the maintainer community, we established governance for the project that rewards maintainership while ensuring no single company has a controlling stake. Using the git-vote bot for transparency, we successfully held our first governance vote. Out of 10 eligible voters (including 4 maintainers outside Solo.io), nine voted favorably on the proposed governance PR:

## Development focus

In addition to renaming the project, recruiting maintainers, and establishing governance, we’ve been focused on:
1. Vendor Neutrality: Developing buildable, vendor-neutral artifacts, set to launch in the coming weeks.
2. Improved Development Velocity: Establishing robust pipeline checks for PRs, including linting, Kubernetes Gateway API conformance tests, and end-to-end testing.
3. Extensibility: Ensuring the project remains highly extendable, aligning with core design principles of kgateway and Envoy.
A shout-out to our core maintainers and contributors for laying this solid foundation for innovation.

## Gloo Open Source Repo

You may notice that the Gloo open source repository still exists. This is temporary during the transition period. With Gloo’s large open source user base, we understand that migrating from Gloo to kgateway takes time. In upcoming releases, we plan to deprecate the Gloo repository to focus all open-source efforts on kgateway. This change will not impact Gloo Gateway customers at all.
Kgateway Roadmap

We aim to make kgateway the most popular gateway for all-direction traffic—north-south, east-west, or inter-service communication. In addition to implementing the latest Kubernetes Gateway API features, we’re prioritizing:

## Traffic control for AI workloads

As workloads like AI agents run on Kubernetes clusters, questions arise:
* How securely do they connect to LLM services such as OpenAI or Gemini?
* Are these services local or external, with usage-based costs?
* How should credentials and backup LLMs be managed?
* Do you want each developer to develop prompt guard and enrichment in their own AI workloads? 

Kgateway simplifies these challenges with two proposed declarative APIs for routing traffic to LLM providers while applying advanced policies such as secret management, backup LLMs, prompt guard or enrichment, and more. Refer to the enhancement proposal for more information.

The Gateway API Inference extension, sponsored by Kubernetes SIG-Network, focuses on extending the Kubernetes Gateway API with inference-specific routing extensions. It introduces the concept of an “InferencePool” (composed of one or more inference pods), enabling application developers to effectively route requests based on AI workload requirements. Daneyon Hanson has been leading our work for interference extensions and we are proud to see him nominated as a maintainer on the Gateway API Inference extension project as a result!
