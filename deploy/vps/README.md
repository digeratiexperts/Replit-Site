# VPS deployment — Digerati Experts public website

Migration of digeratiexperts.com from Replit Autoscale to the
CyberPanel/OpenLiteSpeed VPS (192.227.158.46), staging first.

**Ownership split**

- **CyberPanel** owns the domain: website entry, OLS virtual host, SSL,
  domain logs, backups, file ownership, redirects/proxy. The site must appear
  normally under CyberPanel → Websites → List Websites.
- **This kit** (run by Cursor or an admin) owns the app: clone, `npm ci`,
  build, systemd service, deploys, health checks, rollback.

**Do not** copy files manually into `public_html`, and do not install
Coolify/Dokploy/Docker panels. Everything runs inside the existing
CyberPanel installation.

## Directory layout (per site)

```
/home/staging.digeratiexperts.com/     (production: /home/digeratiexperts.com/)
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

## One-time setup (staging)

```bash
# 0. Prerequisites (as root, once per server):
#    - Node.js 20 LTS installed system-wide (node --version)
#    - CyberPanel website created: staging.digeratiexperts.com + SSL issued
#    - Cloudflare: staging A record -> 192.227.158.46 (proxied)

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

## Deploying updates

```bash
sudo -u <site-user> bash deploy/vps/deploy.sh staging      # or: production
```

The script fetches the deploy branch (default `main`, override with
`DEPLOY_BRANCH=`), builds a fresh release, validates the build, **scans the
bundle for internal content and credential patterns**, flips the `current`
symlink, restarts the systemd service, health-checks `/healthz` and `/`,
and **rolls back to the previous release automatically** if the health
check fails.

Automatic deploys: either a cron entry polling `main`, or CyberPanel's Git
Manager webhook calling the script. Choose ONE mechanism — if this script
becomes the deployer, disable any competing timer/webhook so there are
never two systems deploying the same site.

## Verification checklist (staging, before DNS cutover)

- [ ] `curl -I https://staging.digeratiexperts.com/` → 200, valid SSL
- [ ] All sitemap routes return 200 (`deploy/vps/verify.sh staging.digeratiexperts.com`)
- [ ] `/internal` and `/internal/pricing-tiers` → 301 to `/`
- [ ] Built JS contains no internal page content or credentials
      (deploy script enforces this at build time)
- [ ] `http://` redirects to `https://`
- [ ] Lead forms, Turnstile, analytics fire correctly
- [ ] `systemctl kill --signal=SIGKILL digeratiexperts-staging` → app
      auto-restarts (Restart=always) and site recovers
- [ ] `reboot` → service comes back automatically

## Production cutover (after staging verified)

1. Create/finalize the `digeratiexperts.com` website entry in CyberPanel
   (it may already exist), issue SSL.
2. Repeat setup with `deploy.sh production` (port 3300,
   `digeratiexperts-site.service`).
3. Cloudflare: point apex + `www` A records at 192.227.158.46 (proxied),
   confirm SSL mode Full, then purge the zone cache.
4. Re-run the verification checklist against https://digeratiexperts.com.
5. Watch logs (`journalctl -u digeratiexperts-site -f`) through the first
   hours; retire the Replit deployment only after verification.

## Database note

The app requires `DATABASE_URL` (Postgres/Drizzle). For the initial
migration keep pointing at the existing production database used by the
Replit deployment, so cutover involves no data migration. Moving Postgres
onto the VPS is a separate decision — do not bundle it into this cutover.
