---
icon: plug-circle-plus
---

# Integrations

### Goldsky Edge RPC (pay-per-call)

Pay-per-call RPC access via **x402 through Circle Gateway**. Six files:

* `goldsky-edge.ts`
* `with-fallback.ts`
* `clients.ts`
* `rpc-fallback-events.ts`
* migration
* deposit script

Includes a **Circle Gateway balance pre-check** with a TTL cache and optimistic decrement, so calls don't have to hit Circle Gateway synchronously on every request.

**Chain naming convention:** `SupportedChainName` uses camelCase — e.g. `worldChain`, `hyperEvm`.

### Across Protocol (cross-chain bridging)

`lib/across.ts` — cross-chain bridging integration with `pollBridgeFill` and persistence hook wiring into the settlement pipeline.

### Apify MCP

* `lib/apify.ts`
* A **free** search route
* A **paid** dual-protocol dispatch route (uses its own `Mppx.create()` instance — see the Payment Protocols page)

### Ankr Advanced API (Query API)

`lib/ankr.ts` — a shared `callAnkr` fail-open helper wrapping six `ankr_*` methods:

* `getBlockchainStats`
* `getLogs`
* `getTransactionsByHash`
* `getTransactionsByAddress`
* `getInteractions`

Five paid routes under `app/api/ankr/*`, built via the `base-tempo-payment-routes` skill / `mppx.compose()`:

| Route              | Price |
| ------------------ | ----- |
| `blockchain-stats` | $0.01 |
| `tx`               | $0.01 |
| `interactions`     | $0.01 |
| `logs`             | $0.02 |
| `txs-by-address`   | $0.02 |

See the Open Items page for known gaps in this integration.

### Solana (Helius)

Helius-backed account/balance/transaction modules, replacing deprecated SolanaFM endpoints.

### Etherscan v2

TypeScript wrappers over the Etherscan v2 API, with explicit **fail-open / fail-hard** error contracts per call site.

### Coinbase

Ongoing investigation into Coinbase portfolio/wallet data as a potential integration.
