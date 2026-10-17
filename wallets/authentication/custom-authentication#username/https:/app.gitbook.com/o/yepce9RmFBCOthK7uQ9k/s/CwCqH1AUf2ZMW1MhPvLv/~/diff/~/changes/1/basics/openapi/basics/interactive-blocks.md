---
icon: hand-pointer
---

# Open Items

Known gaps, tracked here so they don't get lost:

* No refund path for post-payment Ankr failures.
* Required-parameter validation on some Ankr routes (`tx`, `txs-by-address`, `interactions`) happens _after_ the charge settles — a malformed request still gets charged.
* No production Vercel deployment yet — project is pre-launch.
