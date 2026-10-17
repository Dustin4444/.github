---
icon: pen-to-square
---

# Dual-Protocol Gating (x402 + MPP)

Each payment-gated route can settle via:

| Protocol | Chain      | Chain ID | Notes                                                |
| -------- | ---------- | -------- | ---------------------------------------------------- |
| x402     | Base (EVM) | `8453`   | Standard x402 HTTP 402 challenge/response flow       |
| MPP      | Tempo      | `4217`   | Machine Payments Protocol — session-based settlement |

**Key implementation detail:** the `mppx` `Receipt` object exposes `.reference`, **not** `.id` — a recurring gotcha when wiring up settlement-status lookups.

Routes are generated using conventions from the `base-tempo-payment-routes` skill, which scaffolds Next.js App Router routes with dual-protocol gating pre-wired.

## Design decision: per-route vs. shared `Mppx` instance

Most routes share a single `Mppx` instance from `lib/x402.ts`. The **Apify integration is a deliberate exception** — its paid dispatch route uses a **per-route `Mppx.create()` instance** to isolate its settlement hooks from the shared instance. This trade-off (isolation vs. simplicity/shared state) is worth keeping in mind before copying that pattern elsewhere.

## MPP protocol research notes

Background research feeding the MPP integration includes:

* Sessions v2
* TIP-1034 (reserve precompile)
* `settlementSchedule`
* `tempo.session.charge` / `.settle` / `.settleBatch`
