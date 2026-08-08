# Client Portal authentication (authoritative)

> Updated: 2026-08-08
> Product: Client Portal on portal.digeratiexperts.com (same Node app as the public website).

## Intended model

Clients authenticate with Digerati Experts-native credentials:

| Mechanism | Status |
|-----------|--------|
| Email + password | Canonical |
| JWT (Bearer portalToken) + optional httpOnly sessionId cookie | Canonical |
| MFA (TOTP + email challenge / backup codes) | Supported |
| Password reset + email verification | Supported |
| Zoho OIDC / Sign in with Zoho for clients | Out of scope — do not implement for Client Portal |

Zoho remains a backend integration for CRM, Desk, Billing, Payments, Bookings — not the client identity provider.

TechSales (techsales.digerati-experts.com) keeps its own internal auth (session + OIDC). Do not merge portal and employee auth systems.

## Documentation discrepancy

Some older notes mentioned Zoho SSO paths such as /api/portal/auth/zoho/*. Those are not the Client Portal login model in this repo.

## Roles

| Layer | Values |
|-------|--------|
| Portal role | admin / user / viewer |
| Store role | public / prospect / managed / comanaged / admin |

Checkout requires comanaged or admin. Admin APIs use requireAdmin.

## Verification checklist

- [ ] Password login (POST /api/portal/login + Turnstile)
- [ ] MFA enrollment / challenge / recovery
- [ ] Password reset flow
- [ ] Session / JWT expiration (24h JWT)
- [ ] Logout clears token + session
- [ ] Tenant/clientId association on JWT
- [ ] Role enforcement on admin routes
- [ ] Deep-link return after login
- [ ] Client isolation (ticket/invoice/order scoped to clientId / email)
