---
title: Security posture
weight: 50
---

Review the following information about the security posture of Solo's {{< reuse "docs/snippets/product-name.md" >}} Envoy extensions.

For more information, see the [Envoy threat model](https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/security/threat_model).

## About the security posture {#about}

```yaml
# ---OPEN SOURCE--
extensions:
- name: filters/http/aws_lambda
  security_posture: robust_to_untrusted_downstream
- name: filters/http/nats/streaming
  security_posture: robust_to_untrusted_downstream
- name: filters/http/transformation
  security_posture: robust_to_untrusted_downstream
```