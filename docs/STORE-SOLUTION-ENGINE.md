# Store Solution Engine

**Decision:** The DE Solution is the canonical commerce object. Zoho Payments remains the money path. Portal auth remains the identity path. Stripe, Typesense, Redis, and a second customer identity system are **not** introduced in this slice.

## Why this exists

The storefront already had a client-side “Your Solution” cart (`localStorage`) plus Zoho checkout. That cart died across devices and was not recalculated server-side except at payment time.

This layer adds a durable Solution so:

`Store → product → another page → login → return later → request quote`

can keep the same configuration.

## What shipped (P0 / P1 slice)

- Shared pricing math in `shared/storeCommerce.ts` — catalog list prices only
- In-memory Solution store + `/api/store/solutions/current` and `/claim`
- Cart drawer: Due today / Monthly / Annual, undo remove, save for later, continue shopping, checkout via `/store/checkout` (billing required)
- Anonymous session persist + merge on portal login
- Coverage and “recommended because” copy (heuristic stack coverage, not a security audit)
- Mobile sticky solution bar on `/store*`

## What shipped (persistence / pricing / quote slice)

- Solutions write through to Postgres `store_carts` when `DATABASE_URL` is healthy. The `items` jsonb holds `{ version, items, savedForLater, name, status }`. Guest TTL 30 days, signed-in 90 days. Memory remains the fallback when the database is unset or the write fails (including userId FK misses).
- Canonical Zoho checkout honors `store_client_pricing` (DB rows when present, otherwise the existing demo overlay). Browser `unitPrice` is still ignored. Overrides apply only when `0 < customPrice < catalog list`.
- Quote requests canonicalize against the catalog (including contract-only SKUs), generate a preliminary PDF at `GET /api/store/quote-requests/:id/pdf`, and best-effort sync Contact / Account / Deal / Lead / Quotes to Zoho CRM. CRM failure never fails the HTTP create. PDF is regenerated from stored lines — no Puppeteer, no filesystem source of truth.

## Explicitly not in this slice

- Stripe Checkout / Billing / Tax
- Typesense
- Company RBAC, PO terms, admin catalog CMS
- Shareable read-only solution links
- Changing Zoho as the payment authority

## Source of truth

| Object | Owner |
|--------|--------|
| Solution (items, qty, saved-for-later) | DE API + `store_carts` (memory fallback) |
| Catalog / list price | `client/src/data/storeProducts.ts` |
| Client list price | `store_client_pricing` then demo overlay |
| Money movement | Zoho Payments via `secureStoreCheckout.ts` |
| Quote PDF | Regenerated from stored canonical lines |
| Identity | Existing portal JWT |

## Next slices (when DE asks)

1. Shareable read-only solution links
2. Provisioning state machine after paid Zoho orders
