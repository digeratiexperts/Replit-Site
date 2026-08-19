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

Close any stuck **Authenticate** / MCP OAuth tab. That loop cannot edit zone Redirect Rules.

Zone: **`digeratiexperts.com`** (no hyphen). Do **not** edit `digerati-experts.com`. Do **not** touch Configuration Rule **“Portal and Techsales origin SSL”**.

Live fingerprint (2026-08-14, Cloudflare edge — origin is already correct):

| Request | `Location` (wrong) |
|---|---|
| `/portal` | `https://portal.digeratiexperts.com/` |
| `/portal/login` | `https://portal.digeratiexperts.com//login` |
| `/portal/foo` | `https://portal.digeratiexperts.com//foo` |

That is a host rewrite that **strips the `/portal` prefix** and concatenates the leftover path onto `https://portal.digeratiexperts.com/` (trailing slash + `/login` = `//login`).

### Clicks

1. https://dash.cloudflare.com → open zone **digeratiexperts.com**
2. Left nav **Rules** → **Redirect Rules** (Single Redirects). If the list is empty, also check **Rules** → **Page Rules**, then **Bulk Redirects**.
3. Find the rule whose when/URL matches apex `/portal*` (or “path starts with `/portal`”) and whose then/URL goes to `portal.digeratiexperts.com` **without** keeping `/portal`. Typical names: Portal, Client Portal, `/portal`.

**Best (recommended):** disable or delete that one rule. Origin already 301s apex `/portal/*` to `https://portal.digeratiexperts.com/portal/…` (path kept, single slash).

**Or edit it** so the path is preserved:

| If the rule looks like | Change target to |
|---|---|
| Dynamic: `concat("https://portal.digeratiexperts.com/", regex_replace(http.request.uri.path, "^/portal", ""))` | `concat("https://portal.digeratiexperts.com", http.request.uri.path)` |
| Single Redirect wildcard `https://digeratiexperts.com/portal*` → `https://portal.digeratiexperts.com/$1` | `https://portal.digeratiexperts.com/portal$1` |
| Page Rule `digeratiexperts.com/portal*` Forwarding URL `https://portal.digeratiexperts.com/$1` | `https://portal.digeratiexperts.com/portal$1` |

Preserve query string. Status **301**. Result for `/portal/login` must be:

`https://portal.digeratiexperts.com/portal/login`

Never emit `//login`.

4. **Deploy** / **Save** the rule (live immediately). Optional: Caching → Configuration → Purge Everything.

### Verify

```bash
curl -sSI https://digeratiexperts.com/portal/login | grep -i location
# expect 301 Location: https://portal.digeratiexperts.com/portal/login
# (or 200 on apex — also fine)

curl -sSI https://portal.digeratiexperts.com/portal/login | head -1
# expect HTTP/2 200
```
