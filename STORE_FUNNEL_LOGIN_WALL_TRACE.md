# Store Purchase Funnel — Full Trace of the Login-Wall Issue

No sales/account architecture has been changed. This document only traces the current behavior, precisely, with file/line references, and proposes alternatives for a decision. Written after the Phase-1 report first flagged this; this version replaces that summary with the full trace requested.

## Summary of the finding

A brand-new visitor — never logged into the Client Portal — cannot complete **any** path to purchase or request pricing in the Store. Both "buy" and "get a quote" terminate at a portal login requirement. There is currently no self-serve conversion path for a net-new prospect anywhere in the Store.

## The two paths, traced exactly

### Path A — "Pay Now" (card checkout)

1. Visitor adds items to cart (`CartContext`, no auth required — works for anyone).
2. Visitor opens `/store/checkout` ([Checkout.tsx](client/src/pages/store/Checkout.tsx)). No login is required to *view* this page or fill in the billing form.
3. Visitor selects the "Credit/Debit Card" radio (`paymentMethod === "zoho"`) and submits.
4. **Client-side gate #1** ([Checkout.tsx:84-95](client/src/pages/store/Checkout.tsx#L84-L95)): the submit handler reads `localStorage.getItem("portalToken")`. If absent, it never calls the API — it shows a toast ("Identity captured — portal sign-in still required to pay") and silently flips `paymentMethod` to `"quote_request"`. The visitor's billing info is not lost, but the button they clicked did not do what its label said.
5. If a `portalToken` *is* present, the request goes to `POST /api/store/checkout/zoho` with `Authorization: Bearer <portalToken>`.
6. **Server-side gate #2** ([server/secureStoreCheckout.ts:265-268](server/secureStoreCheckout.ts#L265-L268)): the route is registered with middleware `[authMiddleware, requireRole("comanaged", "admin")]`. This is stricter than "logged in" — a portal user must specifically hold the `comanaged` role (or `admin`). A logged-in `"managed"`-tier client is rejected here too, not just anonymous visitors.
7. **Server-side gate #3, per line item** ([server/secureStoreCheckout.ts:52-57](client/src/pages/store/Checkout.tsx), `isPurchasableForRole`): even a `comanaged`/`admin` caller is rejected if a cart line's `requiredClientType` isn't `"public"` or `"comanaged"`, or if the product is `isContractOnly` / not `isCheckoutEnabled`.
8. **Server-side gate #4** ([server/secureStoreCheckout.ts:59-63](server/secureStoreCheckout.ts#L59-L63) and the `SUBSCRIPTION_BILLING_REQUIRED` branch in [Checkout.tsx:120-128](client/src/pages/store/Checkout.tsx#L120-L128)): recurring-billing categories (`comanaged_subscriptions`, `networking_managed`, `ucaas_subscriptions`) are blocked from one-time hosted payment entirely — the majority of the co-managed catalog. The client again auto-flips to `quote_request` with a toast.
9. Only if all four gates pass does the app POST to Zoho and redirect to a hosted payment URL or `/store/order-confirmation`.

**Net effect:** "Pay Now" only ever completes for an already-authenticated `comanaged`/`admin` portal user buying non-recurring, checkout-enabled items. Every other visitor — which includes 100% of new prospects — is silently rerouted to quote request.

### Path B — "Request Formal Quote"

1. Visitor opens `/store/quote-request` ([QuoteRequest.tsx](client/src/pages/store/QuoteRequest.tsx)) — reachable directly, or auto-redirected here from Checkout (step 4/8 above).
2. The form itself renders and is fillable with no login check on page load.
3. On submit, **client-side gate** ([QuoteRequest.tsx:79-88](client/src/pages/store/QuoteRequest.tsx#L79-L88)): reads `localStorage.getItem("portalToken")`. If absent, shows a "Sign in required" toast and calls `navigate("/portal/login?redirect=/store/quote-request")` — a hard redirect to the login page, losing the in-progress form state (the cart/solution itself survives in `localStorage`, but the quote-request form fields the visitor just typed do not).
4. If a token is present, `POST /api/store/quote-requests` runs with `[authMiddleware]` only ([server/routes.ts:5557](server/routes.ts#L5557)) — any authenticated portal role, not restricted to `comanaged`/`admin` like checkout is. This is a **narrower** gate than checkout's, but it is still a login gate.

**Net effect:** a visitor who was rerouted here specifically *because* they weren't logged in hits the exact same requirement a second time, after having already typed their name, email, company, and message into the form.

### Where this leaves a new prospect

A first-time visitor who fills in billing info and picks "Pay Now" → gets silently rerouted to Request Quote → fills in the quote form and submits → gets bounced to `/portal/login`, losing the quote message they wrote. There is no point in this journey where they are told, *before* investing effort, that an account is required. Both nominal "conversion" actions dead-end at the same wall.

## Every CTA that leads into this funnel

| CTA | Location | Destination |
|---|---|---|
| Product card "Add" / "Configure" | `StoreProductCard.tsx` | Adds to cart (no gate) |
| Cart drawer "Continue to Checkout" | `ShoppingCart.tsx:510-517` | `/store/checkout`, `paymentMethod="zoho"` |
| Cart drawer "Request Formal Quote" | `ShoppingCart.tsx:518-526` | **Also** `/store/checkout` — same page, `paymentMethod` set to `"quote_request"` via `goQuote()`. They only differ by which radio is pre-selected; a user who reads both buttons as distinct destinations lands on the identical screen. |
| Checkout page's own "Credit/Debit Card" vs. "Request a Quote" radios | `Checkout.tsx:283-343` | Same page, branches per §Path A/B above |
| "Already a co-managed client?" login link | `Checkout.tsx:346-352` | `/portal/login?redirect=/store/checkout` (the one place the login requirement is stated *before* a failed attempt) |

## Why this wasn't changed here

Whether a new prospect should be able to self-serve buy or request a quote without a portal account is a decision that touches auth architecture, Zoho subscription provisioning, and possibly security/compliance posture (e.g., is the current gate intentional friction to force a human sales touch for co-managed contracts?). That's a business call, not a design call — so this stays a trace + options document, not a shipped change.

## Three alternatives, for your decision

### Option 1 — Guest quote request, no account required
Let `/store/quote-request` accept an unauthenticated submission (drop the `authMiddleware` requirement on `POST /api/store/quote-requests` specifically, keep it on checkout). Capture name/email/company/message exactly as today; the quote becomes a lead record rather than a portal-linked record. A human (sales) still turns it into a real order — nothing about fulfillment or checkout changes.
- **Pro:** Smallest change; solves the "quote request" half of the funnel for every net-new visitor immediately; no payment/security surface touched.
- **Con:** Doesn't fix "Pay Now" — card checkout still requires `comanaged`/`admin`, which is arguably correct if only existing clients should be able to self-checkout instant purchases. Requires the quote-requests endpoint to tolerate anonymous submissions safely (rate-limiting/spam controls would need review, since it's currently protected by requiring auth).

### Option 2 — Guest checkout for genuinely self-serve, non-recurring, non-contract SKUs
Introduce a real anonymous purchase path for the subset of the catalog that's already `isCheckoutEnabled`, not `isContractOnly`, and not in a recurring-billing category — the products already flagged as safe to auto-route around (the ones currently reaching `SUBSCRIPTION_BILLING_REQUIRED`/role-gating for other reasons would stay quote-only). This means: a new server route (or a relaxed role check) that accepts an unauthenticated Zoho checkout for exactly that safe SKU subset, and creates an order tied to the billing email rather than a portal account.
- **Pro:** Actually fixes the "biggest lever on conversion" — lets a genuine self-serve buyer complete a purchase today, for the products where that's commercially safe (one-time assessments, templates, etc. — the digital/one-time SKUs already in the catalog).
- **Con:** Real engineering scope — new auth-optional order-creation path, decisions about how a guest later claims/links that order to a portal account if they sign up, and a security review of the relaxed role check (`requireRole` currently exists specifically to keep checkout restricted).

### Option 3 — Make the wall honest and move it earlier, without removing it
Keep both gates exactly as they are today, but stop silently rerouting after a failed attempt. Instead, show the login/signup requirement **before** the visitor invests effort: e.g., a visible "Sign in or create a free account to check out or request pricing" state on the payment-method radio itself (not just a toast after clicking submit), and preserve the quote-request form's field values across the redirect to `/portal/login` (e.g., stash them in `sessionStorage` keyed to the redirect target, and restore on return) so nothing typed is lost.
- **Pro:** Zero backend/auth changes, lowest risk, directly fixes the "confusing dead-end" and "lost quote message" UX problems even if the underlying policy (must have an account) doesn't change.
- **Con:** Does not increase actual self-serve conversion — a prospect who doesn't want to create an account still can't buy or get a quote. Treats the symptom (confusing UX) rather than the funnel's actual ceiling.

These are independent — Option 3 could ship regardless of whether 1 or 2 is chosen later, and Options 1 and 2 could both ship (guest quote *and* guest checkout for a safe SKU subset).
