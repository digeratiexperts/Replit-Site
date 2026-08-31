# Staging review deployments — mutation safety

Purpose: run a **review deployment** of an unmerged branch (e.g. PR #146) on
`staging.digeratiexperts.com` so Joe can interact with the real Ask DE LLM,
auth, and UI — **without** creating production tickets, CRM records, orders,
payments, emails, or Hub events.

Companion: `deploy/vps/README.md` (staging setup, port 3200, unit
`digeratiexperts-staging`). Governance: `docs/AI-ENGINEERING-GOVERNANCE.md`.

## The safety model: credential scoping

Every outbound mutation in this codebase is gated behind a configuration
check. Nothing writes outward unless its credentials are present:

| Mutation | Guard | Omit these keys to disable |
|---|---|---|
| Zoho Desk ticket create / comment | `zohoClient.isConfigured()` | `ZOHO_CLIENT_ID`, `ZOHO_CLIENT_SECRET`, `ZOHO_REFRESH_TOKEN` |
| Zoho CRM lead create (Door 2 requests) | `zohoClient.isConfigured()` (`publicSolutionRequestCrm.ts`) | same as above |
| Payments / order sessions | `zohoPayments.isConfigured()` | `ZOHO_PAYMENTS_*` |
| Outbound email (leads, quotes, orders) | `ZEPTOMAIL_API_TOKEN` present | `ZEPTOMAIL_API_TOKEN` |
| Intelligence Hub sync (deSync outbox) | hub config present | `TECHSALES_SYNC_URL`, `TECHSALES_SYNC_TOKEN`, `TECHSALES_HUB_URL`, `*_SECRET` |
| Vendor APIs | per-key | `BLACKPOINT_API_KEY`, `JUMPCLOUD_API_KEY`, `CORO_*` |

Because the staging release reads its **own** `/home/staging.digeratiexperts.com/shared/.env`,
isolation requires **no code changes** — only a deliberately reduced env file.

## Tier 1 — default review deployment (recommended)

Exercises real LLM + real auth + real UI. **Zero** production mutations.

Populate:

- `NODE_ENV=production`, `PORT=3200`
- `APP_URL=https://staging.digeratiexperts.com`, `WEBSITE_BASE_URL`, `MAIN_DOMAIN`, `ALLOWED_ORIGINS` → staging host
- `DATABASE_URL` → **a separate staging database** (never the production DSN)
- `JWT_SECRET`, `SESSION_SECRET` → freshly generated, staging-only
- `OPENAI_API_KEY` → real (exercises the true Ask DE advisor; costs tokens, mutates no DE record)
- Zoho **OIDC portal login** keys → real (sign-in is a read path; lets Joe test authenticated flows)
- `VITE_TURNSTILE_SITE_KEY` → staging key if available

Deliberately **omit**: `ZOHO_CLIENT_ID/SECRET/REFRESH_TOKEN`, `ZOHO_PAYMENTS_*`,
`ZEPTOMAIL_API_TOKEN`, `TECHSALES_*`, `*_TO_HUB_SECRET`, vendor API keys,
`STRIPE_*`.

Expected staging behavior with Tier 1:

- Ask DE chat → **real LLM answers**
- Get Support ticket submit → friendly *"Support desk is temporarily unavailable"* (fails closed, writes nothing)
- Door 2 solution request → saved locally, CRM sync logs `skipped — Zoho is not configured`
- Checkout → `503` "Payment processing is not configured" (and see payment eligibility below)
- Hub sync → `/api/integrations/health` reports `not_configured`; no events emitted

## Tier 2 — opt-in end-to-end ticket test

Only if Joe explicitly wants a true Desk write verified. The DE Zoho Desk org
(`641745124`) is **not a sandbox** (`isSandboxPortal: false`) and currently has
a **single** department ("Digerati Experts"), so real Desk credentials on
staging would drop test tickets into the live support queue.

Before enabling, pick one:

1. **Dedicated staging department** in Zoho Desk, with staging configured to
   target it — keeps the live queue clean (preferred).
2. **Zoho Desk sandbox portal**, if available on the Zoho One plan.
3. **Agreed convention + cleanup**: `[STAGING TEST]` subject prefix, a
   dedicated test contact, notifications/SLA muted, tickets deleted after the
   session. Least safe; requires Joe's explicit go-ahead.

Never enable `ZOHO_PAYMENTS_*` on staging. Payment sessions are real money
movement; there is no safe staging equivalent without a Zoho test account.

## Pre-flight checklist

- [ ] `DATABASE_URL` is **not** the production DSN
- [ ] `ZOHO_PAYMENTS_*` absent
- [ ] `ZEPTOMAIL_API_TOKEN` absent (no mail to real leads)
- [ ] `TECHSALES_*` / `*_TO_HUB_SECRET` absent (no Hub events)
- [ ] Desk credentials absent, or Tier 2 option chosen and approved
- [ ] Staging robots/noindex confirmed so review URLs never index
- [ ] Deployed branch SHA recorded in the PR
- [ ] After review: `systemctl stop digeratiexperts-staging` or redeploy `main`

## Deploy an unmerged branch to staging

```bash
sudo -u <staging-site-user> bash -lc \
  'DEPLOY_BRANCH=claude/homepage-ask-de-visual-19b3aa bash /home/staging.digeratiexperts.com/current/deploy/vps/deploy.sh staging'
```

Production is untouched by this: separate directory, systemd unit, port, env,
and database. A staging deployment is **never** a release.
