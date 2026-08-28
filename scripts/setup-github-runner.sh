#!/usr/bin/env bash
set -Eeuo pipefail

# Persistent, repo-scoped GitHub Actions runner bootstrap for Digerati Experts.
# Safe defaults target the production website VPS. The registration token is
# never stored by this script; pass RUNNER_TOKEN or authenticate `gh` with repo
# admin permission so a short-lived token can be requested at runtime.

REPO="${REPO:-digeratiexperts/digeratiexperts-site}"
REPO_URL="https://github.com/${REPO}"
CANONICAL_GIT_URL="${CANONICAL_GIT_URL:-${REPO_URL}.git}"
RUNNER_ROLE="${RUNNER_ROLE:-website-prod}"
RUNNER_LABELS="${RUNNER_LABELS:-de-production,website-prod}"
RUNNER_NAME="${RUNNER_NAME:-$(hostname -s)-${RUNNER_ROLE}}"
RUNNER_USER="${RUNNER_USER:-diger7051}"
RUNNER_ROOT="${RUNNER_ROOT:-/opt/github-runners}"
RUNNER_DIR="${RUNNER_DIR:-${RUNNER_ROOT}/${REPO##*/}-${RUNNER_ROLE}}"
WORK_DIR="${WORK_DIR:-_work}"

log() { printf '[de-runner] %s\n' "$*"; }
die() { printf '[de-runner] ERROR: %s\n' "$*" >&2; exit 1; }

[[ "$(uname -s)" == "Linux" ]] || die "This bootstrap currently supports Linux only."
[[ "$(uname -m)" =~ ^(x86_64|amd64)$ ]] || die "Expected x86_64/amd64 host."

if [[ "$RUNNER_ROLE" == "website-prod" ]]; then
  [[ -d /home/digeratiexperts.com ]] || die "website-prod must run on the canonical website VPS (/home/digeratiexperts.com missing)."
  systemctl show -p LoadState --value digeratiexperts-site 2>/dev/null | grep -qx loaded \
    || die "website-prod requires the digeratiexperts-site systemd unit on this host."
fi

if [[ $EUID -ne 0 ]]; then
  command -v sudo >/dev/null 2>&1 || die "Run as root or install sudo."
  SUDO=sudo
else
  SUDO=""
fi

id "$RUNNER_USER" >/dev/null 2>&1 || die "Runner user '$RUNNER_USER' does not exist."

# The website deployer uses /home/digeratiexperts.com/app as a persistent bare
# mirror. Repair it here before the first queued deployment is allowed to run.
# This also migrates hosts that were still pointed at the retired Replit-Site
# repository. The production deploy must always source the canonical site repo.
if [[ "$RUNNER_ROLE" == "website-prod" ]]; then
  command -v git >/dev/null 2>&1 || die "git is required on the website production VPS."
  SITE_HOME=/home/digeratiexperts.com
  MIRROR_DIR="$SITE_HOME/app"
  SITE_USER="${SITE_USER:-diger7051}"
  id "$SITE_USER" >/dev/null 2>&1 || die "Site user '$SITE_USER' does not exist."

  if [[ ! -d "$MIRROR_DIR" ]]; then
    log "creating canonical production mirror: $CANONICAL_GIT_URL -> $MIRROR_DIR"
    $SUDO -u "$SITE_USER" git clone --mirror "$CANONICAL_GIT_URL" "$MIRROR_DIR"
  else
    git --git-dir="$MIRROR_DIR" rev-parse --is-bare-repository 2>/dev/null | grep -qx true \
      || die "$MIRROR_DIR exists but is not a valid bare Git repository."
    CURRENT_ORIGIN="$(git --git-dir="$MIRROR_DIR" remote get-url origin 2>/dev/null || true)"
    if [[ "$CURRENT_ORIGIN" != "$CANONICAL_GIT_URL" ]]; then
      log "repairing production mirror origin: ${CURRENT_ORIGIN:-<missing>} -> $CANONICAL_GIT_URL"
      if [[ -n "$CURRENT_ORIGIN" ]]; then
        $SUDO -u "$SITE_USER" git --git-dir="$MIRROR_DIR" remote set-url origin "$CANONICAL_GIT_URL"
      else
        $SUDO -u "$SITE_USER" git --git-dir="$MIRROR_DIR" remote add origin "$CANONICAL_GIT_URL"
      fi
    fi
  fi

  VERIFIED_ORIGIN="$(git --git-dir="$MIRROR_DIR" remote get-url origin 2>/dev/null || true)"
  [[ "$VERIFIED_ORIGIN" == "$CANONICAL_GIT_URL" ]] \
    || die "Production mirror origin verification failed: '$VERIFIED_ORIGIN'"
  log "production mirror verified: $VERIFIED_ORIGIN"
fi

get_token() {
  if [[ -n "${RUNNER_TOKEN:-}" ]]; then
    printf '%s' "$RUNNER_TOKEN"
    return 0
  fi
  if command -v gh >/dev/null 2>&1 && gh auth status >/dev/null 2>&1; then
    gh api --method POST "repos/${REPO}/actions/runners/registration-token" --jq .token
    return 0
  fi
  return 1
}

TOKEN="$(get_token || true)"
[[ -n "$TOKEN" ]] || die "No registration token. Set RUNNER_TOKEN to the short-lived token from GitHub > Settings > Actions > Runners > New self-hosted runner, or authenticate gh with repo admin access."

command -v curl >/dev/null 2>&1 || die "curl is required."
command -v tar >/dev/null 2>&1 || die "tar is required."

VERSION="${RUNNER_VERSION:-}"
if [[ -z "$VERSION" ]]; then
  VERSION="$(curl -fsSL https://api.github.com/repos/actions/runner/releases/latest | sed -n 's/.*"tag_name": *"v\([^"]*\)".*/\1/p' | head -n1)"
fi
[[ -n "$VERSION" ]] || die "Could not determine actions/runner version."

ARCHIVE="actions-runner-linux-x64-${VERSION}.tar.gz"
URL="https://github.com/actions/runner/releases/download/v${VERSION}/${ARCHIVE}"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

log "repo=$REPO role=$RUNNER_ROLE name=$RUNNER_NAME labels=$RUNNER_LABELS"
log "installing actions/runner v$VERSION in $RUNNER_DIR"

$SUDO mkdir -p "$RUNNER_DIR"
$SUDO chown -R "$RUNNER_USER":"$(id -gn "$RUNNER_USER")" "$RUNNER_DIR"

curl -fL --retry 3 --retry-delay 2 "$URL" -o "$TMP/$ARCHIVE"
$SUDO -u "$RUNNER_USER" tar -xzf "$TMP/$ARCHIVE" -C "$RUNNER_DIR"

cd "$RUNNER_DIR"

# Dependencies are additive and distribution-aware in the upstream helper.
$SUDO ./bin/installdependencies.sh >/dev/null 2>&1 || true

# Stop an existing service before reconfiguration. svc.sh may not yet be installed.
$SUDO ./svc.sh stop >/dev/null 2>&1 || true

# --replace makes repeated runs idempotent for the same runner name.
$SUDO -u "$RUNNER_USER" ./config.sh \
  --unattended \
  --replace \
  --url "$REPO_URL" \
  --token "$TOKEN" \
  --name "$RUNNER_NAME" \
  --labels "$RUNNER_LABELS" \
  --work "$WORK_DIR"

$SUDO ./svc.sh install "$RUNNER_USER" >/dev/null 2>&1 || true
$SUDO ./svc.sh start

SERVICE_NAME="$(basename "$(ls -1 /etc/systemd/system/actions.runner.*.service 2>/dev/null | grep -F "${REPO##*/}" | tail -n1)" 2>/dev/null || true)"

log "runner configured and service started"
[[ -n "$SERVICE_NAME" ]] && log "service=$SERVICE_NAME"
$SUDO ./svc.sh status || true

cat <<EOF

Runner fleet result
  Repository : $REPO
  Name       : $RUNNER_NAME
  Labels     : self-hosted, Linux, X64, $RUNNER_LABELS
  User       : $RUNNER_USER
  Directory  : $RUNNER_DIR

This runner is intentionally repo-scoped. Because these DE repositories are
owned by the digeratiexperts user account, repeat the bootstrap separately for
each repository that needs a self-hosted runner.
EOF
