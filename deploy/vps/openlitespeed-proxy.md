# OpenLiteSpeed proxy configuration (CyberPanel)

Public HTTPS traffic terminates at OpenLiteSpeed (managed by CyberPanel);
OLS proxies to the private Node app on `127.0.0.1:<port>`.

Ports on this VPS:

| App | Port |
|---|---|
| Intelligence Hub (techsales) | 3100 — **do not reuse** |
| digeratiexperts.com staging | 3200 |
| digeratiexperts.com production | 3300 |

This is the same pattern already used for `techsales.digerati-experts.com`
(OLS → 127.0.0.1:3100), so the vhost for that site can be used as a working
reference.

## Steps (staging shown; production is identical with port 3300)

1. In CyberPanel create the website `staging.digeratiexperts.com`
   (Websites → Create Website), then issue SSL (SSL → Manage SSL).

2. OpenLiteSpeed WebAdmin (https://SERVER_IP:7080) →
   Virtual Hosts → `staging.digeratiexperts.com`:

   **a. External App** (Tab: External App → Add → Web Server):

   ```
   Name:             nodeapp-staging
   Address:          127.0.0.1:3200
   Max Connections:  100
   Initial Request Timeout (secs): 60
   Retry Timeout (secs):           0
   Response Buffering:             No   (the app streams; keep off)
   ```

   **b. Rewrite** (Tab: Rewrite → Rewrite Rules), enable rewriting and set:

   ```
   RewriteEngine On
   REWRITERULE ^(.*)$ http://nodeapp-staging/$1 [P,E=Proxy-Host:staging.digeratiexperts.com]
   ```

   Everything is proxied — the Node server serves both the SPA and `/api/*`,
   and performs the `/internal/*` 301 itself. Do NOT add a docroot static
   context in front, or stale files in public_html could shadow the app.

3. Graceful restart OLS (Actions → Graceful Restart, or
   `systemctl restart lsws`).

4. Verify from the VPS:

   ```bash
   curl -s -o /dev/null -w '%{http_code}\n' http://127.0.0.1:3200/healthz   # 200
   curl -s -o /dev/null -w '%{http_code}\n' -H 'Host: staging.digeratiexperts.com' https://127.0.0.1/ -k  # 200
   ```

## Cloudflare notes

- Staging: add `staging` A record → 192.227.158.46 (proxied) in the
  digeratiexperts.com zone, and extend the origin SSL rule if one is host-scoped.
- Production cutover: change the `digeratiexperts.com` apex (and `www`)
  records from the Replit deployment to 192.227.158.46, keep proxied,
  confirm SSL mode Full, then purge the zone cache.
- Do not touch the existing `portal`/`techsales` records in the
  digerati-experts.com zone.
