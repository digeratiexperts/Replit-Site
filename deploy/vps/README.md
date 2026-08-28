# VPS deployment — Digerati Experts public website

Production runtime for https://digeratiexperts.com (and Client Portal on
portal.digeratiexperts.com) on the CyberPanel/OpenLiteSpeed VPS
(192.227.158.46).

## Authoritative production layout

| Item | Value |
|---|---|
| Deploy / app user | `diger7051` |
| Active code | `/home/digeratiexperts.com/current` |
| Releases | `/home/digeratiexperts.com/releases/<timestamp>/` |
| Shared secrets | `/home/digeratiexperts.com/shared/.env` |
| Process manager | **systemd** unit `digeratiexperts-site` (NOT PM2) |
| Private port | `127.0.0.1:3300` |
| Public health | https://digeratiexperts.com/healthz |

**Do not** deploy from `/root/Replit-Site`. **Do not** use PM2 for this site.
**Do not** rsync build output into `public_html` — OLS proxies to Node.

**Ownership split**

- **CyberPanel** owns the domain: website entry, OLS virtual host, SSL,
  domain logs, backups, file ownership, redirects/proxy.
- **This kit** (run as `diger7051`) owns the app: clone, `npm ci`, build,
  systemd restart (via least-privilege sudo), health checks, rollback.

## Directory layout (per site)

```
/home/digeratiexperts.com/             (staging: /home/staging.digeratiexperts.com/)
├── public_html/          # CyberPanel-managed; placeholder only (app is proxied)
├── app/                  # bare git mirror of digeratiexperts/Replit-Site
├── releases/<timestamp>/ # built releases (last 3 kept)
├── current -> releases/<timestamp>    # active release (atomic symlink)
├── shared/
│   └── .env              # production secrets — never in git or public_html
└── logs/                 # app.log / app-error.log
```

## Ports

| Service | Port |
|---|---|
| Intelligence Hub (techsales) | 3100 — already in use, do not touch |
| Website staging | 127.0.0.1:3200 |
| Website production | 127.0.0.1:3300 |

## Least-privilege sudoers (production)

`diger7051` must restart the unit without a password prompt, and without
unrestricted sudo. Install via `visudo -f /etc/sudoers.d/digeratiexperts-site`:

```
diger7051 ALL=(root) NOPASSWD: /usr/bin/systemctl restart digeratiexperts-site, /usr/bin/systemctl is-active digeratiexperts-site, /usr/bin/systemctl status digeratiexperts-site
```

Do **not** grant `NOPASSWD: ALL`.

## Deploying updates (normal path)

As `diger7051` (no manual root SSH restart required):

```bash
sudo -u diger7051 bash -lc 'DEPLOY_BRANCH=main bash /home/digeratiexperts.com/current/deploy/vps/deploy.sh production'
```

Or from a checked-out tree the site user can read:

```bash
sudo -u diger7051 bash deploy/vps/deploy.sh production
```

The script:

1. Fetches `DEPLOY_BRANCH` (default `main`) into the bare mirror
2. Builds a fresh release under `releases/<timestamp>/`
3. Validates the build and scans the bundle for internal/credential leaks
4. Flips `current` → new release
5. Runs `sudo -n /usr/bin/systemctl restart digeratiexperts-site`
6. Verifies `sudo -n /usr/bin/systemctl is-active digeratiexperts-site`
7. Health-checks `http://127.0.0.1:3300/healthz` + `/`, then
   `https://digeratiexperts.com/healthz`
8. On any restart/inactive/health failure: rolls back the symlink, restarts,
   and **exits non-zero** (failed deployment — never treated as optional)

Automatic deploys: GitHub Actions job **Deploy and verify production VPS**
on `main`, using a self-hosted runner **on this VPS**. Labels required:
`self-hosted`, `Linux`, `X64`. Install or repair it with
`deploy/vps/install-actions-runner.sh` and keep
`actions-runner-digeratiexperts-site.service` enabled.

Do **not** rely on cron or CyberPanel Git Manager for production rollout.
If the runner is offline, `main` CI stays green and production stays stale.

If a deploy job is already queued, starting the runner is enough — do not
push another commit just to retry. `workflow_dispatch` on the CI workflow
can also re-run check + deploy after the runner is online.

## One-time setup (staging)

```bash
# 0. Prerequisites (as root, once per server):
#    - Node.js 20 LTS installed system-wide (node --version)
#    - CyberPanel website created: staging.digeratiexperts.com + SSL issued
#    - Cloudflare: staging A record -> 192.227.158.46 (proxied)
#    - sudoers entry for the staging site user (mirror production pattern)

SITE=/home/staging.digeratiexperts.com
SITE_USER=<cyberpanel-site-user>       # see CyberPanel or: ls -ld $SITE

# 1. Directory skeleton + env
mkdir -p $SITE/{app,releases,shared,logs}
cp deploy/vps/env.production.example $SITE/shared/.env
vi $SITE/shared/.env                   # fill real values; PORT=3200
chown -R $SITE_USER:$SITE_USER $SITE/{app,releases,shared,logs}
chmod 600 $SITE/shared/.env

# 2. systemd service
cp deploy/vps/digeratiexperts-site.service /etc/systemd/system/digeratiexperts-staging.service
#    edit: User/Group=$SITE_USER, WorkingDirectory=$SITE/current,
#          EnvironmentFile=$SITE/shared/.env, PORT=3200
systemctl daemon-reload
systemctl enable digeratiexperts-staging

# 3. First deploy (as the site user)
sudo -u $SITE_USER bash deploy/vps/deploy.sh staging

# 4. OLS proxy — see deploy/vps/openlitespeed-proxy.md
```

## Production cutover notes

Production is already on this layout (`diger7051` + `digeratiexperts-site`).
For a fresh host: install `digeratiexperts-site.service` with
`User=diger7051`, create the sudoers snippet above, then run
`deploy.sh production`.

## Verification checklist

- [ ] `curl -fsS https://digeratiexperts.com/healthz` → 200
- [ ] `sudo -n /usr/bin/systemctl is-active digeratiexperts-site` → `active`
- [ ] All sitemap routes return 200 (`deploy/vps/verify.sh digeratiexperts.com`)
- [ ] `/internal` and `/internal/pricing-tiers` → 301 to `/`
- [ ] Built JS contains no internal page content or credentials
- [ ] Lead forms, Turnstile, analytics fire correctly
- [ ] `systemctl kill --signal=SIGKILL digeratiexperts-site` → app
      auto-restarts (`Restart=always`) and site recovers
- [ ] `reboot` → service comes back automatically

## Obsolete paths (do not use)

| Obsolete | Why |
|---|---|
| `/root/Replit-Site` + PM2 | Former layout; not production |
| `scripts/deploy.sh` (rsync to `public_html`) | Conflicts with OLS→Node proxy |
| `ecosystem.config.js` | PM2 config; superseded by systemd |
| Manual root `systemctl restart` after every deploy | `deploy.sh` performs restart + verify |
