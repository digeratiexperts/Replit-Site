# DE Master Status Ledger

Maintained by Claude Cowork acting as project coordinator, per Joe's direction
and the plan drafted in ChatGPT (thread: "Design direction choice").
Every line below is either directly verified against the running repo/Zoho
account, or explicitly marked as unverified/owner-input-needed. Nothing here
is claimed fixed just because code exists.

CURRENT MAIN SHA: 95a513cfc653e28383063f229888114b47161243
BRANCH: main (in sync with origin/main)
LAST VERIFIED: 2026-08-25 (this session)

## COMPLETED
- (none yet from this workstream — recon only so far)

## IN PROGRESS
- Nationwide sales-tax / Avalara + Zoho architecture planning (with ChatGPT)
- Fulfillment model confirmed by Joe: **both** direct-drop-ship and DE-handled,
  depending on the order (affects ship-from sourcing, must be a per-line/per-order field, not a global setting)

## BLOCKED / OWNER INPUT NEEDED
- **Which Zoho Books org is authoritative for the live DE Store?** Three orgs exist
  on this Zoho One account:
  - "Digerati Experts" (org_id 693714437) — default org, has Store/Checkout/Subscriptions
    active, is what `zohoBilling.ts` will auto-select (`organizations[0]`) — but Zoho's own
    settings show `is_registered_for_tax: false` / `is_tax_registered: false`.
  - "Digerati Experts, LLC" (org_id 641746578) — shows `is_tax_registered: true`, but is an
    **expired PREMIUM TRIAL** and does not have Store/Subscriptions in its active app list.
  - "Joseph Petro Creator Org" (814892336) — unrelated/personal, not in scope.
  Before any tax classification or Avalara/Zoho integration work touches Zoho, Joe needs to
  confirm 693714437 is correct and get its tax-registration flag corrected inside Zoho itself
  (or clarify why the trial org shows registered instead).

## KNOWN REPO HYGIENE ISSUES (found this session, not caused by this session)
- **Working tree is CRLF, git history is LF** — `git status` currently shows every tracked
  file as modified because of this alone (verified via byte-level diff on package.json: repo
  blob is LF-only, working copy is CRLF). This is almost certainly just how Windows checked
  the repo out, not real content drift. **No blanket `git add -A` / commit should ever be run**
  until this is resolved (e.g. via a `.gitattributes` normalizing line endings) — doing so would
  create a multi-thousand-line noise commit touching the entire codebase.
- `CANONICAL-LOCAL.md` is stale: it points to a different local path
  (`C:\Users\Joe\Projects\digeratiexperts-site`) and a different remote name (`Replit-Site.git`)
  than what's actually checked out here, and references branch `fix/homepage-hero-nav-2026-08-08`
  which is not the branch in use (repo is on `main`, in sync with origin). The actual remote here
  (`digeratiexperts/digeratiexperts-site.git`) and HEAD are healthy and current — this looks like
  leftover documentation from an earlier clone/rename, not a sign this is the wrong clone.
- No `.gitattributes` file exists in the repo.
- No existing Avalara integration code found anywhere in `server/`, `shared/`, `client/src`, or `docs/`
  (confirmed via search) — this is greenfield.

## READY FOR TEST / STAGING / PRODUCTION
- (nothing from this workstream yet)

## NEXT ACTIONABLE STEP
Resolve the Zoho org question above, then begin the SKU tax-classification data model
(PHYSICAL_HARDWARE / SOFTWARE_SAAS / MANAGED_IT_SERVICE / MANAGED_SECURITY_SERVICE /
PROFESSIONAL_SERVICE / INSTALLATION_SERVICE / DIGITAL_PRODUCT / ASSESSMENT / SHIPPING /
HANDLING) as an additive change to `shared/storeCommerce.ts` / `shared/schema.ts`, on its
own branch, without touching checkout/payment logic until that's reviewed separately.

## GUARDRAILS
Adopted 2026-08-25: `docs/MASTER-GUARDRAILS.md` (master agent guardrails + UI/UX
improvement policy), pointer added to `AGENTS.md`. Binding on Cowork, Claude Code,
Cursor, and Antigravity for this repo.

## USAGE MANAGEMENT (informational, not a code concern)
Joe is on Claude Pro (not Max) with a temporary +50% Claude Code weekly boost
through Aug 31. Operating policy: work efficiently, avoid re-reading the whole
repo repeatedly, avoid redundant whole-project audits, avoid parallel agents
solving the same problem. Monitor and mention if a work session looks like it's
consuming unusually large context. Enabling usage credits / upgrading plan tier
is Joe's own account decision in Settings, not something this agent can or should
do unilaterally.

## ACTIVE OWNERSHIP
(none currently assigned — single-agent session so far)

Area: —
Owner: —
Branch: —
Files: —
Task: —
Do Not Touch: —
Status: —

## VERIFIED FINDING — Portal live authorization (priority item A)
Checked 2026-08-25 against current main (95a513c).

- The **actually-wired** auth middleware is `authMiddleware` in `server/routes.ts`
  (NOT the unused/dead `server/middleware/auth.ts`, which nothing imports — that
  file is stale legacy code and a candidate for removal after confirming zero
  usage elsewhere).
- `server/routes.ts` `authMiddleware` DOES re-derive authorization from a live
  user record on every request (`portalAuthGetUser(decoded.email) || findUserById(decoded.userId)`),
  and explicitly denies when the live record is `disabled` or `status === "disabled"/"revoked"`.
  Role, storeRole, clientId, orgRole, departmentId all prefer the live record over
  the JWT claim (`live?.field ?? decoded.field`).
- **This means item A ("Portal live authorization hardening") is substantially
  already done**, not still open as the earlier priority list assumed — consistent
  with ChatGPT's note that payment fulfillment was "recently substantially
  hardened" and a reminder to verify current main before assuming old issues remain.
- **Residual gap (real, narrow, not yet fixed):** if `getUser`/`findUserById`
  return no record at all (`live` is `undefined` — as opposed to a record marked
  disabled), the code falls through to trusting the JWT's embedded role/storeRole/
  clientId entirely, rather than denying. No user-deletion function currently
  exists in `portalAuthStore.ts` (grepped, none found), so this path may not be
  reachable today, but it's a fail-open edge case worth closing per guardrail #7
  (security fails closed) — treat "no live record found" the same as "disabled"
  and deny, rather than falling back to the token.
- Next scoped PR (small, single-concern, per guardrail #4): in `server/routes.ts`
  `authMiddleware`, when `live` is `undefined`/`null`, return 401 instead of
  falling through to `decoded.*`. Add a regression test for "JWT valid, user
  record missing/removed -> 401".

## COMPLETED (local, not yet pushed)
- **Portal auth fail-closed fix** — branch `fix/portal-auth-fail-closed-20260825`,
  commit `04af768`, on top of `95a513c` (origin/main at time of branch). Traced
  every JWT-issuing code path in `server/routes.ts` (password login, MFA verify,
  Zoho SSO first-login provisioning via `resolveOrProvisionZohoPortalUser`, admin
  impersonation/stop-impersonation) and confirmed none currently rely on the
  fail-open fallback — `indexUser()` in `portalAuthStore.ts` is a synchronous
  in-memory Map write, so every token-issuing path has already indexed its user
  before signing. Changed `authMiddleware` to return 401 when the live user
  lookup finds nothing, instead of falling back to the JWT's embedded claims.
  Added `server/portalAuthFailClosed.test.ts` (2 cases). `tsc --noEmit` passes
  clean (0 errors, confirming the repo's TypeScript baseline claim is real).
  **Could not run `npm test`** in this sandbox — `node_modules` here were
  installed on Windows and vitest's `rollup` dependency needs a Linux-native
  binary that's missing, and this sandbox has no network to `npm ci` fresh.

## OWNER ACTION NEEDED — push + verify + PR
This sandbox has no outbound network access (git fetch/push both fail with a
407/403 from its proxy), so this commit exists only in the local working copy
at `C:\Users\Joe\Documents\GitHub\Replit-Site`. From a terminal on that machine
(PowerShell/Cursor/etc, which has real network):

    cd C:\Users\Joe\Documents\GitHub\Replit-Site
    git status                      # confirm you're on fix/portal-auth-fail-closed-20260825
    npm test                        # confirm portalAuthFailClosed.test.ts passes
    npm run check                   # optional re-confirmation, already verified here
    git push -u origin fix/portal-auth-fail-closed-20260825
    gh pr create --fill             # or open the PR in the GitHub UI

## ENVIRONMENT NOTE (not a repo problem)
Git operations through this session's device bridge leave stale zero-byte
`.git/*.lock` files behind (the sandbox blocks `unlink()` but allows `rename()`/
`mv()`, so git's own lock cleanup silently fails while the underlying operation
still succeeds). Harmless so far — every `git add`/`commit`/`status` still
completed correctly — but if a future git command from this bridge ever
refuses with "Unable to create '.git/index.lock': File exists", `mv` the
stale lock file aside rather than trying to `rm` it (`rm` fails here with
"Operation not permitted").

## VERIFIED FINDING — store order pricing/status was client-trusted (priority item, P0 payment/revenue)
Checked 2026-08-25 against current main (95a513c), during the same session as the
Portal auth fail-closed fix above.

- `POST /api/store/orders` in `server/routes.ts` accepted client-supplied
  `lineItems`, `subtotal`, `total`, and `status` and persisted them as-is —
  including `status: "paid"` straight from the request body.
- Confirmed exploitable, not just theoretical: `server/services/orderFulfillment.ts`'s
  `reconcilePaidOrders()` sweep does `SELECT ... FROM storeOrders WHERE status = 'paid'`
  unconditionally and calls `fulfillPaidOrder()` on every row it finds, with no check
  on how that row reached "paid". A forged POST to this endpoint would have resulted
  in real fulfillment of a free/underpriced fraudulent order.
- This is the same class of bug as the already-hardened
  `POST /api/store/checkout/zoho` path (`server/secureStoreCheckout.ts`), which this
  endpoint sat right next to without the same protection — confirmed via
  `server/index.ts` that the two are independent, non-overlapping routes (no route-order
  shadowing involved here, unlike the dead duplicate `/api/store/checkout/zoho` handler
  noted below).
- Also found and flagged, not yet acted on: `server/routes.ts` (~line 5443) contains a
  second, vulnerable `POST /api/store/checkout/zoho` handler that duplicates the path
  already registered by `registerSecureZohoStoreCheckout()` in `server/index.ts` (line 272,
  registered before `registerRoutes()` at line 401). Confirmed dead/unreachable — Express
  uses the first-registered handler for a given path — so it poses no live risk, but it's
  a confusing hygiene issue and a landmine for future refactors. Candidate for its own
  small removal-only commit later.

## COMPLETED (local, not yet pushed)
- **Store order server-authoritative pricing/status fix** — branch
  `fix/store-orders-server-authoritative-20260825`, commit `6c4c74e`, on top of
  `95a513c` (origin/main at time of branch). `POST /api/store/orders` now always
  recomputes `lineItems`/`subtotal`/`total` server-side via
  `canonicalizeCheckoutLineItems()`/`canonicalCheckoutTotal()` (reused from
  `secureStoreCheckout.ts`) against the real catalog and the caller's actual
  role-based pricing (`resolveClientPricingRows`/`toPriceOverrides` from
  `storeClientPricing.ts`), ignoring client-supplied prices/totals entirely.
  `status` is now always forced to `"pending"` regardless of what the client
  sends; `paymentMethod` is whitelisted. `tsc --noEmit` passes clean (0 errors).
  **Could not run `npm test`** in this sandbox for the same Windows/Linux
  `node_modules` mismatch reason as the auth fix above — existing coverage in
  `server/secureStoreCheckout.test.ts` already exercises the reused
  canonicalization functions, but no new test was added for this route directly
  since it couldn't be executed/verified here.

## OWNER ACTION NEEDED — push + verify + PR (store-orders fix)
Same no-network constraint as the auth fix. From a terminal with real network,
on `C:\Users\Joe\Documents\GitHub\Replit-Site`:

    git status                      # confirm you're on fix/store-orders-server-authoritative-20260825
    npm test                        # confirm existing secureStoreCheckout tests still pass
    npm run check                   # optional re-confirmation, already verified here
    # manual/integration check: POST to /api/store/orders with a forged
    # status/total/lineItems payload and confirm the response reflects
    # server-computed values, and status is always "pending"
    git push -u origin fix/store-orders-server-authoritative-20260825
    gh pr create --fill

## OWNER ACTION NEEDED — docs branch (guardrails + status ledger)
`docs/MASTER-GUARDRAILS.md`, this file (`MASTER-STATUS.md`), and the `AGENTS.md`
pointer addition were written directly to the working tree and are being
committed to their own branch (`docs/master-guardrails-status-20260825`,
branched from `main`) rather than riding along on either fix branch, per the
one-concern-per-branch rule. Push/PR that branch the same way as the two fix
branches above once you're on a machine with network.
