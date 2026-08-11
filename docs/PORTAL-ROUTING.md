# Portal routing (no //login)

## Canonical

- Website: `https://digeratiexperts.com`
- Client Portal host: `https://portal.digeratiexperts.com` (NO hyphen)
- Canonical login: **`https://portal.digeratiexperts.com/portal/login`**
- Same Node app on `:3300` — portal is `/portal/*`, not Intelligence Hub (`:3100`)
- Hyphen host `portal.digerati-experts.com` → 301 to marketing site only

## Failure pattern (confirmed 2026-08-11)

```
curl -sSI https://digeratiexperts.com/portal/login
→ 301 Location: https://portal.digeratiexperts.com//login
```

That is **Cloudflare** on zone `digeratiexperts.com` stripping the `/portal` path segment when redirecting to the portal host. Origin/OLS return 200 for `/portal/login` when CF is bypassed.

## App mitigations

1. Marketing / nav / store login CTAs use absolute `PORTAL_LOGIN` from `client/src/lib/portalUrls.ts` — never apex-relative `/portal/login`.
2. Express heal in `server/index.ts`: collapse `//…`, map portal `/login` → `/portal/login`, and if apex receives `/portal/*` without CF, redirect to portal host **keeping** `/portal`.

## Cloudflare fix (required — DE dashboard)

Zone: **digeratiexperts.com** → Rules → Redirect / Dynamic Redirects / Bulk Redirects / Page Rules.

Find any rule that sends `/portal*` (or similar) to `portal.digeratiexperts.com` while rewriting the path.

**Wrong:** target that drops `/portal` and produces `//login`.

**Right options:**

1. **Best:** Delete the apex→portal path-stripping redirect. Serve `/portal/*` on apex via the same origin (already works), OR
2. Redirect with path preserved — target must be:
   `https://portal.digeratiexperts.com${http.request.uri.path}`
   so `/portal/login` → `https://portal.digeratiexperts.com/portal/login` (single slash, keep `/portal`).

Never emit `//login`.

After changing the rule: purge cache, re-test:

```bash
curl -sSI https://digeratiexperts.com/portal/login | grep -i location
# expect either 200 on apex, or 301 to https://portal.digeratiexperts.com/portal/login
```
