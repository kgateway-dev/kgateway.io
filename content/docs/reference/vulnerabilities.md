---
title: Security vulnerabilities
weight: 50
---

Review how the {{< reuse "docs/snippets/product-name.md" >}} project handles the lifecycle of Common Vulnerability and Exposures (CVEs).

{{< callout type="warning" >}}
CNCF app says "Clearly defined and discoverable process to report security issues."
<br>
Removed from our existing CVE docs:
* Anything about FEDramp.
* Specific `security@solo.io email`. I just say to contact the project maintainers.
* The {{< reuse "docs/snippets/product-name.md" >}} team maintains a public security site that is open to all users to report potential security issues.
{{< /callout >}}

## CVE lifecycle stages

The end-to-end lifecycle for CVE handing consists of the following stages.

{{< reuse-image src="img/cve-process.svg" caption="Figure: Lifecycle stages for CVE handling" >}}

|Stage|Description|
|--|--|
|[Inbound](#inbound)|Inbound channels for reporting potential CVEs that affect {{< reuse "docs/snippets/product-name.md" >}} releases. |
|[Tracking](#tracking)|Continuous monitoring of reported CVEs with details on assessment and remediation status.|
|[Analysis](#analysis)|Determination of whether a given CVE affects {{< reuse "docs/snippets/product-name.md" >}} releases, the CVE severity, and suggested remediation plan if required.|
|[Remediation](#remediation)|A change introduced to a component (code fix, dependency bump, etc.) that is incorporated into a {{< reuse "docs/snippets/product-name.md" >}} release.|
|[Reporting](#reporting)|Communication of CVE-related information to parties outside of the {{< reuse "docs/snippets/product-name.md" >}} team, including users.|

## Inbound 

The following sources are used to determine product exposure to CVEs:

* The {{< reuse "docs/snippets/product-name.md" >}} team scans {{< reuse "docs/snippets/product-name.md" >}} components to detect vulnerabilities.
* The {{< reuse "docs/snippets/product-name.md" >}} team participates in early disclosure and security workgroups of multiple upstream communities.
* Users may share output from their own security scanning tools for analysis and response from the {{< reuse "docs/snippets/product-name.md" >}} team.

### Inbound reporting guidance

{{< callout type="warning" >}}
Istio docs add this extra info about reporting; do we want to include these?
{{< /callout >}}

The {{< reuse "docs/snippets/product-name.md" >}} project appreciates the efforts of our users in helping us to discover and resolve security vulnerabilities.

To report an issue, contact a {{< reuse "docs/snippets/product-name.md" >}} maintainer.

✅ Send a report in the following circumstances:

* You discover that a {{< reuse "docs/snippets/product-name.md" >}} component has a potential security vulnerability.
* You are unsure whether or how a vulnerability affects {{< reuse "docs/snippets/product-name.md" >}}.

🔔 If in doubt, send a private message about potential vulnerabilities such as:

* Any crash, especially in Envoy.
* Any potential Denial of Service (DoS) attack.

❌ Do not send a report for vulnerabilities that are not part of the {{< reuse "docs/snippets/product-name.md" >}} project, such as:

* You want help configuring {{< reuse "docs/snippets/product-name.md" >}} components for security purposes.
* You want help applying security related updates to your {{< reuse "docs/snippets/product-name.md" >}} configuration or environment.
* Your issue is not related to security vulnerabilities.
* Your issue is related to base image dependencies, such as Envoy.


## Tracking

All reported CVEs that meet the minimum threshold enter the tracking process step. The minimal threshold for tracking includes:
* All CVEs reported with a severity of CRITICAL or HIGH.
* Any CVEs with severity of MODERATE or LOW that are determined to have a significant impact on the {{< reuse "docs/snippets/product-name.md" >}} project's security posture.

Embargoed CVEs are tracked in a separate repository and subject to the constraints set forth by the associated upstream security workgroup.


## Analysis

Analysis of reported CVEs consists of the following steps:
* Perform an initial review to filter out CVEs that do not apply to {{< reuse "docs/snippets/product-name.md" >}} releases (e.g., false positives due to invalid scan results).
* Conduct an initial assessment of the severity based on industry standards such as NIST or other community scoring methods. 
* Review each CVE that is eligible for remediation to determine if an attack vector exists in the context of {{< reuse "docs/snippets/product-name.md" >}} releases. If no attack vector exists, then the CVE is downgraded with no further remediation activity.


## Remediation

Remediation of a CVE involves introducing a fix to the affected code and releasing the associated component. The process and timing for these activities can be separated into two categories:
* Direct control: The {{< reuse "docs/snippets/product-name.md" >}} team has the ability to contribute fixes and release the associated component. This is generally the case with code in the {{< reuse "docs/snippets/product-name.md" >}} codebase.
* Indirect control: The {{< reuse "docs/snippets/product-name.md" >}} team is subject to the contribution and release policies of a third-party community. This is generally the case with upstream dependencies that are included in {{< reuse "docs/snippets/product-name.md" >}}.

Fixes for CVEs that impact dependencies are subject to the ability of the third-party community to accept these fixes and to incorporate them into a release. 

## Reporting

Security scan results for product images are published in the {{< reuse "docs/snippets/product-name.md" >}} documentation with each release.

In addition to public reporting on security scanning, the {{< reuse "docs/snippets/product-name.md" >}} team may work directly with users reporting and compliance requirements related to CVE scan results. The {{< reuse "docs/snippets/product-name.md" >}} team reviews customer scan reports, evaluates CVEs, remediates CVEs based on the {{< reuse "docs/snippets/product-name.md" >}} team’s analysis, and provides vendor responses to identified CVEs.  

Certain CVEs require special attention due to their disclosure status, severity, or heightened awareness (e.g., Heartbleed, Log4j). In these cases, the {{< reuse "docs/snippets/product-name.md" >}} team may use additional reporting channels, including direct email or messaging, to communicate CVE information.

{{< callout type="warning" >}}
Both [Istio](https://github.com/istio/community/blob/master/EARLY-DISCLOSURE.md) and [Envoy](https://github.com/envoyproxy/envoy/blob/main/SECURITY.md#security-reporting-process) have early disclosure groups. Do we want something similar?
{{< /callout >}}

## Updates and questions

The {{< reuse "docs/snippets/product-name.md" >}} team reserves the right to change this process in its sole discretion. The {{< reuse "docs/snippets/product-name.md" >}} team’s security processes are reviewed regularly to ensure compliance with industry standards and the current security landscape. For questions or additional details, contact the {{< reuse "docs/snippets/product-name.md" >}} project maintainers.
