---
icon: bullseye-arrow
---

# Quickstart

> Fill in the exact commands from `package.json` / `.env.example` — the steps below reflect the known shape of the project.

1.  **Clone and install**

    ```bash
    git clone <repo-url>
    cd x402-ai-dct555
    npm install
    ```
2. **Environment variables** — the app needs credentials/config for:
   * Postgres connection string (transaction ledger + LISTEN/NOTIFY pipeline)
   * `mppx` / x402 signer config for Base (chain `8453`)
   * MPP/Tempo session config (chain `4217`)
   * Circle Gateway credentials (used for Goldsky Edge RPC pay-per-call balance checks)
   * RPC/API keys: Goldsky, Apify, Helius, Etherscan v2, Ankr
3. **Database** — run the Postgres migrations (ledger table `x402_transactions`, plus per-integration migrations for Goldsky and Ankr) before starting the app.
4.  **Run locally**

    ```bash
    npm run dev
    ```
5. **Vercel project**
   * Project: `prj_XKKYQahZAVHghJ1J8DuFZfPhsvjx`
   * Team: `team_0gAidhUy9q9LWdy8KJYxE2Es`
   * No production deployments yet as of this writing (`live: false`) — this is still pre-launch.
