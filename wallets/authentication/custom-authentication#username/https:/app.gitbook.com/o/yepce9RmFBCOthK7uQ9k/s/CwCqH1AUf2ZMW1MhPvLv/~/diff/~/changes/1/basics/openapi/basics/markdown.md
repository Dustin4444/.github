---
icon: markdown
---

# Data Access Layer

The app exposes a **dual-protocol data access layer**:

* **GraphQL** — frontend-facing, uses **Relay cursor pagination**
* **gRPC** — internal service-to-service calls, with protobuf stubs verified via `grpc_tools.protoc`

Both sit on top of the same Postgres store, with the LISTEN/NOTIFY trigger bridge connecting write-path events to real-time read-path updates (see the Architecture Overview page).
