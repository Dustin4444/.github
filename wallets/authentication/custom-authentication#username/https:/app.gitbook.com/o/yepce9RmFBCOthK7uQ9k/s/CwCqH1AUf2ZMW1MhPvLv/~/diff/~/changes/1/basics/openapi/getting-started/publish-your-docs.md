---
icon: globe-pointer
---

# Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                     Next.js App Routes                   │
│   (payment-gated via mppx: x402 on Base + MPP on Tempo)  │
└───────────────┬───────────────────────────┬─────────────┘
                │                           │
        ┌───────▼────────┐         ┌────────▼────────┐
        │  GraphQL (FE)   │         │  gRPC (internal) │
        │ Relay cursor    │         │ protobuf stubs   │
        │ pagination      │         │ (grpc_tools)     │
        └───────┬────────┘         └────────┬────────┘
                └───────────────┬───────────┘
                                │
                    ┌───────────▼────────────┐
                    │   Postgres              │
                    │ - x402_transactions     │
                    │   (reference, chain,    │
                    │    status)              │
                    │ - LISTEN/NOTIFY bridge  │
                    └───────────┬────────────┘
                                │
                ┌───────────────▼────────────────┐
                │  SSE route + React hook          │
                │  (real-time settlement updates,  │
                │   with backfill GET route)       │
                └───────────────────────────────────┘
```

The **Postgres LISTEN/NOTIFY event pipeline** is the backbone for real-time settlement status. It spans six interdependent files:

1. Migration (schema for the ledger + notify triggers)
2. Instrumentation hook (fires on transaction state changes)
3. Notify-bridge with backoff (listens on the Postgres channel, re-subscribes on failure)
4. SSE route (streams events to clients)
5. React hook with backfill (subscribes to SSE, backfills missed events)
6. Backfill GET route (catch-up endpoint)
7. Shared pool singleton (single Postgres connection pool reused across the above)
