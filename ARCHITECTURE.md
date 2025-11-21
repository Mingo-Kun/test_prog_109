# Architecture Documentation

## Overview
This prototype demonstrates a multi-tenant e-commerce application using Next.js App Router. It supports strict data isolation between tenants and handles high-concurrency checkout scenarios.

## Multi-tenancy & Data Isolation
- **Routing**: Tenant is identified via the URL path `/:tenant/...`.
- **Middleware**: `middleware.ts` validates the tenant against a list of allowed tenants (`brand-a`, `brand-b`). Invalid tenants are redirected or blocked.
- **Data Access**: All data access goes through `lib/store.ts`. The `getTenantData` function requires a `tenantId` and strictly returns data only for that tenant key. This ensures that Tenant A cannot access Tenant B's data.
- **Theme**: Tenant-specific themes (e.g., primary color) are stored in the data store and applied via `app/[tenant]/layout.tsx`.

## Caching & ISR
- **Catalog Page**: Uses Incremental Static Regeneration (ISR) with `revalidate = 60`. This means the catalog page is static but updates every 60 seconds, balancing performance and freshness.
- **Product Page**: Dynamic rendering (default) to ensure real-time stock checking, or could be ISR with client-side stock fetching. In this prototype, we fetch on the server for simplicity but the checkout updates stock.

## Race Condition Handling
- **Problem**: When multiple users try to buy the last item simultaneously, standard read-then-write logic can fail (overselling).
- **Simulation**: The `decrementStock` function in `lib/store.ts` includes a `delay(100)` between reading the stock and writing the new stock. This artificially widens the race window.
- **Reproduction**: The `reproduce_race.sh` script sends 15 concurrent requests for an item with 10 stock. Without proper locking, stock might drop below 0.
- **Solution (Not fully implemented in prototype)**: In a real system, we would use database transactions with `SELECT FOR UPDATE` or optimistic locking (versioning). In this in-memory prototype, Node.js is single-threaded so the "race" is simulated via async delays. To fix it here, we would need a mutex or queue for the critical section.

## Trade-offs
- **In-Memory Store**: Fast but not persistent. Good for prototyping.
- **Path-based Tenancy**: Simple to implement but less "white-label" than subdomain-based.
- **Client-side Tabs**: Better UX than page reloads for simple content.
