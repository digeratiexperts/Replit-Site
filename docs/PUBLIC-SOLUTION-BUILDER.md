# Public Solution Builder (Door 2)

Public `/store` is a **Business Solution Builder**, not a storefront cart.

```text
PUBLIC
Business Solution Builder
No vendor catalog
No real shopping cart
No Pay Now
        ↓ qualified handoff
CLIENT MARKETPLACE
Authenticated cart / checkout
        ↓ internal mappings
DE DIGITAL WAREHOUSE
Staff only
```

## Buyer journey

1. What are you trying to improve? Pick one or several business needs (13 canonical families, with an optional 5-goal entry layer).
2. How should DE be involved? DE managed / work with internal IT / help me decide.
3. Environment facts: users, sites, device ownership, mix, internal IT, compliance, current provider, urgency.
4. Your Solution: one composed draft.
5. One recommended next step (today: Cyber Risk Assessment). Ask DE remains available.

## Persistence

- Browser: `de-solution-draft-v1` (`client/src/lib/solutionDraft.ts`)
- Server: `/api/public/solutions/request` accepts `selectedNeeds[]` + `environment` as **one** request / one CRM opportunity
- `/store/checkout` is an alias of `/store/solution` so old links do not reopen a grocery checkout

Client Marketplace is a **separate door**. The Store “Open Client Marketplace” link must send existing clients through `https://portal.digeratiexperts.com/portal/login?returnTo=/portal/marketplace`. After Zoho or email sign-in they continue to `/portal/marketplace`, not portal home. Do not drop `returnTo`. Never use apex `/portal/login` (Cloudflare can emit `//login`).

Do not put vendor names, SKUs, costs, margins, or CRM-implementation commentary on these pages.
Customer language is: **No payment is required. We'll confirm fit, scope, and pricing before you commit.**
