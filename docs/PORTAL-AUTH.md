# Client Portal authentication (authoritative)

> Updated: 2026-08-08
> Product: Client Portal on portal.digeratiexperts.com (same Node app as the public website).

## Intended model

Clients authenticate with Digerati Experts-native credentials **and** optional Zoho Public Platform SSO:

| Mechanism | Status |
|-----------|--------|
| Email + password | Canonical |
| JWT (Bearer portalToken) + optional httpOnly sessionId cookie | Canonical |
| MFA (TOTP + email challenge / backup codes) | Supported |
| Password reset + email verification | Supported |
| Zoho Public Platform SSO (`/api/portal/auth/zoho/*`) | Supported when `ZOHO_CLIENT_ID` + `ZOHO_CLIENT_SECRET` are set |

Zoho CRM / Desk / Billing / Payments remain backend integrations. Portal SSO uses the shared website Zoho Public Platform OAuth client (same `shared/.env` on the VPS).

TechSales (`techsales.digerati-experts.com`) keeps its own Hub SSO (`/api/login?provider=zoho` → `/api/callback`). Do **not** merge portal and Hub auth paths.

## Zoho SSO routes

| Route | Purpose |
|-------|---------|
| `GET /api/portal/auth/zoho/status` | `{ configured: boolean }` for login UI |
| `GET /api/portal/auth/zoho/start` | Begin OIDC authorize redirect |
| `GET /api/portal/auth/zoho/callback` | Canonical callback |
| `GET /api/zoho/oauth/callback` | Alias matching `ZOHO_PORTAL_OIDC_REDIRECT_URI` on VPS |

Env (VPS `shared/.env`, never commit secrets):

- `ZOHO_CLIENT_ID` / `ZOHO_CLIENT_SECRET` (aliases of `*_API` OK)
- `ZOHO_PORTAL_OIDC_REDIRECT_URI` or `ZOHO_OAUTH_PORTAL_REDIRECT_URI`
- `ZOHO_OAUTH_STATE_SECRET` (optional; falls back to JWT/SESSION secret)
- `PORTAL_OAUTH_EMAIL_ALLOWLIST` (exact emails and/or `@domain` entries)
- `ZOHO_OIDC_ISSUER` (optional; default `https://accounts.zoho.com`)

Master emails (always admin on SSO): `admin@digeratiexperts.com`, `admin@digerati-experts.com`.

## Roles

| Layer | Values |
|-------|--------|
| Portal role | admin / user / viewer |
| Store role | public / prospect / managed / comanaged / admin |

Checkout requires comanaged or admin. Admin APIs use requireAdmin.

## Verification checklist

- [ ] Password login (POST /api/portal/login + Turnstile)
- [ ] Zoho button visible on `/portal/login` when status.configured
- [ ] Zoho start → Zoho accounts → callback → portal dashboard
- [ ] MFA enrollment / challenge / recovery
- [ ] Password reset flow
- [ ] Session / JWT expiration (24h JWT)
- [ ] Logout clears token + session
- [ ] Tenant/clientId association on JWT
- [ ] Role enforcement on admin routes
- [ ] Deep-link return after login
- [ ] Client isolation (ticket/invoice/order scoped to clientId / email)
