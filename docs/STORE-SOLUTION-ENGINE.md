# Store Solution Engine

**Decision:** DE has three intentionally separate commerce surfaces. They share terminology and handoff contracts, but they do not share one giant client-side cart.

```text
Door 2 — Public Business Solution Builder
Profile + need + offer + package + fulfillment + contact
No public payment

Door 3 — Authenticated Client Marketplace
Approved client items + client pricing + real cart + checkout

Door 4 — DE Digital Warehouse
Internal commercial, sourcing, implementation, and mapping data
```

## 1. Public builder object

The public canonical object is `SolutionDraft` in `client/src/lib/solutionDraft.ts`.

It owns:

- business profile
- selected pains / needs
- standalone / co-managed relationship
- fulfillment preferences
- request intent

`client/src/lib/solutionPackage.ts` converts the approved public solution family into the package presentation shown to the prospect:

- customer-readable line items
- quantity basis from the profile
- standard vs preferred commercial position
- assessment policy
- shipping / provisioning behavior
- installation modes
- technician policy
- remote support behavior

The public object deliberately does not become a payment cart.

## 2. Authenticated commerce object

The existing Store/Marketplace Solution engine remains the durable commerce object for standardized client purchasing.

It owns:

- approved purchasable items
- quantities
- save-for-later
- client-facing prices
- quote/payment eligibility
- checkout
- post-order state

Money movement remains on the existing payment authority. Portal authentication remains the identity path.

## 3. Internal warehouse object

The warehouse owns internal-only information needed to assemble, source, price, approve, and implement what the public and client surfaces describe.

The warehouse is not imported into the public builder.

## Cross-layer law

### One concept, one owner

| Concept | Owner |
|---|---|
| Public business profile | `SolutionDraft.environment` |
| Public selected needs | `SolutionDraft.needs` |
| Standalone / co-managed relationship | `SolutionDraft.deliveryPreference` |
| Public package and fulfillment rules | `solutionPackage.ts` |
| Public browser persistence | `de-solution-draft-v2` |
| Public server-session save | `/api/public/solutions/request` `PUT` |
| Public final submission | `/api/public/solutions/request` `POST` |
| Authenticated purchasing | Client Marketplace commerce engine |
| Money movement | Existing payment integration |
| Internal commercial/implementation mapping | Digital Warehouse / authoritative back-office systems |

### No duplicate qualification questionnaires

Users, computers, mobile devices, sites, ownership model, and internal IT status are captured once in Step 0 and reused throughout the public builder.

Additional questions should be conditional and package-specific. Do not rebuild a second generic environment questionnaire later in the funnel.

### No public cart vocabulary

The public surface uses:

- Your Solution
- Solution Draft
- Package
- Delivery & Setup
- Submit Solution

Real cart and checkout vocabulary belongs to the authenticated purchasing surface.

### No universal assessment

Assessment behavior is a package policy:

- `required`
- `recommended`
- `not_required`

A package that does not require an assessment must not be routed through one just because another legacy service flow used that pattern.

### No false standalone semantics

Standalone means the buyer is purchasing a packaged solution without joining DE's traditional managed-services operating model. It must never be labeled "DE managed."

Co-managed means shared responsibilities and may qualify for preferred pricing when the commercial engine supports it. It is not a blanket percentage discount.

## Persistence

Public browser draft: `de-solution-draft-v2`.

Public server-session draft:

- 30-day browser-session cookie
- `GET` creates/returns current draft record
- `PUT` saves progress without contact information and without creating a lead
- `POST` submits after company, name, email, and phone are supplied

The current server request store is memory-backed. Durable database persistence remains a follow-on requirement before the public save feature should be marketed as cross-device or guaranteed long-term storage.

## Follow-on engineering priorities

1. Persist public solution drafts in the database instead of memory-only server storage.
2. Add package-specific compatibility questions and dependencies without duplicating the Step 0 profile.
3. Connect preferred co-managed pricing to the authoritative pricing engine rather than hardcoding discounts in UI.
4. Add inventory/availability-backed shipment estimates for hardware-bearing packages.
5. Add technician scheduling eligibility and calendar handoff after scope determines on-site work is needed.
6. Add shareable authenticated/read-only solution links only after authorization rules are defined.
7. Keep client marketplace checkout and public builder regression suites separate so one door cannot accidentally re-enable another door's behavior.
