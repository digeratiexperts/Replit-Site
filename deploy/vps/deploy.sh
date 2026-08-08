#!/usr/bin/env bash
#
# Digerati Experts public website — VPS deployment script.
#
# Release-based deploy with health check and automatic rollback:
#
#   GitHub <branch>
#        ↓  git fetch (bare mirror in $SITE_HOME/app)
#   releases/<timestamp>/   (checkout + npm ci + npm run build)
#        ↓  build validation
#   current -> releases/<timestamp>   (atomic symlink flip)
#        ↓  sudo -n /usr/bin/systemctl restart $SERVICE_NAME
#        ↓  sudo -n /usr/bin/systemctl is-active $SERVICE_NAME
#   health check (127.0.0.1 /healthz + /; production also public /healthz)
#        ↓  on failure: flip symlink back, restart, exit 1
#
# Production (authoritative):
#   User:        diger7051
#   Code:        /home/digeratiexperts.com/current
#   Service:     digeratiexperts-site (systemd — NOT PM2)
#   Do NOT deploy from /root/Replit-Site
#
# Usage:
#   deploy.sh staging          # deploys to /home/staging.digeratiexperts.com
#   deploy.sh production       # deploys to /home/digeratiexperts.com
#
# Overridable environment variables (defaults set per target below):
#   DEPLOY_BRANCH        git branch to deploy            (default: main)
#   SITE_HOME            website home directory
#   APP_PORT             private 127.0.0.1 port the app listens on
#   SERVICE_NAME         systemd service to restart
#   PUBLIC_HEALTH_URL    public HTTPS healthz URL (production default set)
#   REPO_URL             git remote
#   KEEP_RELEASES        how many old releases to keep   (default: 3)
#   NO_SYSTEMD=1         test mode: start node directly instead of systemd
#                        (used for local/CI validation only)
#
set -euo pipefail

SYSTEMCTL="/usr/bin/systemctl"

TARGET="${1:-}"
case "$TARGET" in
  staging)
    SITE_HOME="${SITE_HOME:-/home/staging.digeratiexperts.com}"
    APP_PORT="${APP_PORT:-3200}"
    SERVICE_NAME="${SERVICE_NAME:-digeratiexperts-staging}"
    PUBLIC_HEALTH_URL="${PUBLIC_HEALTH_URL:-https://staging.digeratiexperts.com/healthz}"
    ;;
  production)
    SITE_HOME="${SITE_HOME:-/home/digeratiexperts.com}"
    APP_PORT="${APP_PORT:-3300}"
    SERVICE_NAME="${SERVICE_NAME:-digeratiexperts-site}"
    PUBLIC_HEALTH_URL="${PUBLIC_HEALTH_URL:-https://digeratiexperts.com/healthz}"
    ;;
  *)
    echo "Usage: $0 staging|production" >&2
    exit 64
    ;;
esac

REPO_URL="${REPO_URL:-https://github.com/digeratiexperts/Replit-Site.git}"
DEPLOY_BRANCH="${DEPLOY_BRANCH:-main}"
KEEP_RELEASES="${KEEP_RELEASES:-3}"
NO_SYSTEMD="${NO_SYSTEMD:-0}"

MIRROR_DIR="$SITE_HOME/app"
RELEASES_DIR="$SITE_HOME/releases"
SHARED_ENV="$SITE_HOME/shared/.env"
CURRENT_LINK="$SITE_HOME/current"
LOG_DIR="$SITE_HOME/logs"
TS="$(date +%Y%m%d%H%M%S)"
NEW_RELEASE="$RELEASES_DIR/$TS"

log() { printf '[deploy %s] %s\n' "$(date +%H:%M:%S)" "$*"; }
fail() { log "ERROR: $*"; exit 1; }

# ---------------------------------------------------------------- preflight
command -v node >/dev/null || fail "node not found on PATH"
command -v npm  >/dev/null || fail "npm not found on PATH"
NODE_MAJOR="$(node -p 'process.versions.node.split(".")[0]')"
[ "$NODE_MAJOR" -ge 20 ] || fail "Node 20+ required, found $(node --version)"

[ -f "$SHARED_ENV" ] || fail "$SHARED_ENV missing — create it before deploying (see deploy/vps/env.production.example)"
mkdir -p "$RELEASES_DIR" "$LOG_DIR"

if [ "$NO_SYSTEMD" != "1" ]; then
  # Fail fast if passwordless least-privilege sudo is missing (do not prompt).
  # Note: do NOT probe with `sudo -n true` — diger7051 sudoers only allows
  # specific systemctl verbs for this unit.
  set +e
  SUDO_PROBE_ERR="$(sudo -n "$SYSTEMCTL" is-active "$SERVICE_NAME" 2>&1 >/dev/null)"
  SUDO_PROBE_RC=$?
  set -e
  if printf '%s' "$SUDO_PROBE_ERR" | grep -Eqi 'password is required|a password is required|not allowed|not permitted|a terminal is required'; then
    fail "passwordless sudo required for: $SYSTEMCTL restart|is-active|status $SERVICE_NAME (deploy as diger7051 — not root/PM2//root/Replit-Site)"
  fi
  # rc 0 = active; rc 3 = inactive (both mean sudo worked). Other unexpected codes: warn only.
  if [ "$SUDO_PROBE_RC" -ne 0 ] && [ "$SUDO_PROBE_RC" -ne 3 ]; then
    log "WARN: systemctl is-active probe returned $SUDO_PROBE_RC ($SUDO_PROBE_ERR) — continuing; restart step will enforce success"
  fi
fi

# ---------------------------------------------------------------- fetch
if [ ! -d "$MIRROR_DIR" ]; then
  log "Cloning $REPO_URL (bare mirror) into $MIRROR_DIR"
  git clone --mirror "$REPO_URL" "$MIRROR_DIR"
else
  log "Fetching latest $DEPLOY_BRANCH"
  git --git-dir="$MIRROR_DIR" fetch --prune origin
fi
COMMIT="$(git --git-dir="$MIRROR_DIR" rev-parse "$DEPLOY_BRANCH")"
log "Deploying $DEPLOY_BRANCH @ $COMMIT"

# ---------------------------------------------------------------- build
log "Checking out release into $NEW_RELEASE"
mkdir -p "$NEW_RELEASE"
git --git-dir="$MIRROR_DIR" --work-tree="$NEW_RELEASE" checkout -f "$DEPLOY_BRANCH" -- .

cd "$NEW_RELEASE"
log "Installing dependencies (npm ci)"
npm ci --no-audit --no-fund

log "Building production bundle"
npm run build

# ---------------------------------------------------------------- validate
[ -f dist/index.js ] || fail "build validation failed: dist/index.js missing"
[ -f dist/public/index.html ] || fail "build validation failed: dist/public/index.html missing"
JS_COUNT="$(find dist/public/assets -name '*.js' | wc -l)"
[ "$JS_COUNT" -gt 0 ] || fail "build validation failed: no JS assets emitted"

log "Scanning built bundle for internal content and secret patterns"
if grep -rqE 'internal/(pricing-tiers|sales-process|security-stack|usp-worksheet)' dist/public/assets/; then
  fail "bundle contains internal page routes — refusing to deploy"
fi
if grep -rqE 'sk_live_[A-Za-z0-9]|whsec_[A-Za-z0-9]|jca_[A-Za-z0-9]{20}|client_secret["'"'"']?\s*[:=]\s*["'"'"'][a-f0-9]{30}' dist/public/assets/; then
  fail "bundle appears to contain credentials — refusing to deploy"
fi

# link the shared env into the release for tooling that expects a local .env
ln -sfn "$SHARED_ENV" "$NEW_RELEASE/.env"

# ---------------------------------------------------------------- switch
PREVIOUS_RELEASE=""
if [ -L "$CURRENT_LINK" ]; then
  PREVIOUS_RELEASE="$(readlink -f "$CURRENT_LINK")"
fi

log "Activating release $TS"
ln -sfn "$NEW_RELEASE" "$CURRENT_LINK"

restart_app() {
  if [ "$NO_SYSTEMD" = "1" ]; then
    # Test mode only: run the server directly, fully detached (setsid) so the
    # deploy script never blocks waiting on it.
    pkill -f "node $CURRENT_LINK/dist/index.js" 2>/dev/null || true
    sleep 1
    (cd "$CURRENT_LINK" && set -a && . "$SHARED_ENV" && set +a \
      && NODE_ENV=production PORT="$APP_PORT" setsid nohup node "$CURRENT_LINK/dist/index.js" \
         >> "$LOG_DIR/app.log" 2>&1 < /dev/null &) &
    wait $! 2>/dev/null || true
    return 0
  fi

  # Least-privilege passwordless restart — failure is a failed deployment.
  if ! sudo -n "$SYSTEMCTL" restart "$SERVICE_NAME"; then
    log "ERROR: sudo -n $SYSTEMCTL restart $SERVICE_NAME failed"
    return 1
  fi
  if ! sudo -n "$SYSTEMCTL" is-active --quiet "$SERVICE_NAME"; then
    log "ERROR: $SERVICE_NAME is not active after restart"
    return 1
  fi
  log "systemd: $SERVICE_NAME is active"
  return 0
}

local_health_check() {
  local tries=15
  for i in $(seq 1 "$tries"); do
    if curl -sf -o /dev/null -m 5 "http://127.0.0.1:$APP_PORT/healthz" \
       && [ "$(curl -s -o /dev/null -m 5 -w '%{http_code}' "http://127.0.0.1:$APP_PORT/")" = "200" ]; then
      return 0
    fi
    sleep 2
  done
  return 1
}

public_health_check() {
  # Skip when NO_SYSTEMD or PUBLIC_HEALTH_URL explicitly emptied.
  [ "$NO_SYSTEMD" = "1" ] && return 0
  [ -z "${PUBLIC_HEALTH_URL:-}" ] && return 0
  local tries=10
  for i in $(seq 1 "$tries"); do
    if curl -fsS -m 10 "$PUBLIC_HEALTH_URL" >/dev/null; then
      return 0
    fi
    sleep 2
  done
  return 1
}

health_check() {
  local_health_check || return 1
  public_health_check || return 1
  return 0
}

restart_app || fail "service restart failed — deployment aborted (no silent continue)"
log "Waiting for health check on 127.0.0.1:$APP_PORT (and public healthz if configured)"
if health_check; then
  log "Health check passed"
else
  log "Health check FAILED — rolling back"
  if [ -n "$PREVIOUS_RELEASE" ] && [ -d "$PREVIOUS_RELEASE" ]; then
    ln -sfn "$PREVIOUS_RELEASE" "$CURRENT_LINK"
    if restart_app && health_check; then
      log "Rollback to $(basename "$PREVIOUS_RELEASE") succeeded"
    else
      log "Rollback restart/health ALSO failing — manual intervention required"
    fi
  else
    log "No previous release available to roll back to"
  fi
  exit 1
fi

# ---------------------------------------------------------------- cleanup
log "Pruning old releases (keeping $KEEP_RELEASES + current)"
ls -1dt "$RELEASES_DIR"/*/ 2>/dev/null | tail -n "+$((KEEP_RELEASES + 1))" | while read -r old; do
  [ "$(readlink -f "$old")" = "$(readlink -f "$CURRENT_LINK")" ] && continue
  log "Removing old release $old"
  rm -rf "$old"
done

log "Deploy complete: $DEPLOY_BRANCH @ $COMMIT is live on 127.0.0.1:$APP_PORT"
