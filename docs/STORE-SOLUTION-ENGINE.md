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

## Explicitly not in this slice

- Stripe Checkout / Billing / Tax
- Typesense
- Company RBAC, PO terms, admin catalog CMS
- PDF quotes, share links, provisioning state machine
- Changing Zoho as the payment authority

## Source of truth

| Object | Owner |
|--------|--------|
| Solution (items, qty, saved-for-later) | DE API + local cache |
| Catalog / list price | `client/src/data/storeProducts.ts` |
| Money movement | Zoho Payments via `secureStoreCheckout.ts` |
| Identity | Existing portal JWT |

## Next slices (when DE asks)

1. Persist Solutions in Postgres `store_carts` (schema already exists)
2. Honor `store_client_pricing` inside canonical checkout
3. Quote PDF + Zoho CRM quote sync
4. Shareable read-only solution links
