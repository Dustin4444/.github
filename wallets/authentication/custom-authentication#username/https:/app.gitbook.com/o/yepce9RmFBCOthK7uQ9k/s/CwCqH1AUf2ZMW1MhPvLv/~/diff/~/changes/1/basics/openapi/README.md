---
icon: hand-wave
cover: https://gitbookio.github.io/onboarding-template-images/header.png
coverY: 0
layout:
  width: default
  cover:
    visible: true
    size: full
    mask: none
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
  metadata:
    visible: true
  tags:
    visible: true
  actions:
    visible: true
  anchors:
    visible: true
---

# Welcome

**x402-ai-dct555** is a Next.js application (deployed on Vercel) implementing **dual-protocol HTTP 402 payment gating** — combining:

* **x402 / EVM** on **Base mainnet** (chain `8453`)
* **MPP (Machine Payments Protocol) / Tempo** (chain `4217`)

via the `mppx` library. A single API route can require payment through either protocol, giving callers (humans or agents) a choice of settlement rail.

This space documents the architecture, the payment layer, the external data integrations built on top of it, and the reference contract addresses used across the project.

> **Status note:** This is a working project doc, not a finished spec. Several integrations have open items called out explicitly on the Integrations and Open Items pages — treat those as known gaps, not oversights.
