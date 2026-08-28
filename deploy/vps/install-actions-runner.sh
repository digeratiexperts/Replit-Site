#!/usr/bin/env bash
#
# Install or repair the GitHub Actions runner that deploys digeratiexperts-site.
# Run on de-vps (192.227.158.46) only. Do not install a runner on any other host.
# Do not touch Intelligence Hub (:3100).
#
# Usage (as root or a user that can write the runner dir and systemd):
#   RUNNER_TOKEN=... bash deploy/vps/install-actions-runner.sh
#
# Get RUNNER_TOKEN from the repo: Settings → Actions → Runners → New self-hosted runner.
# The token is short-lived. Do not commit it.
#
set -euo pipefail

REPO_URL="${REPO_URL:-https://github.com/digeratiexperts/digeratiexperts-site}"
RUNNER_USER="${RUNNER_USER:-de-cursor}"
RUNNER_DIR="${RUNNER_DIR:-/home/${RUNNER_USER}/actions-runner}"
RUNNER_VERSION="${RUNNER_VERSION:-2.328.0}"
SITE_HOME="${SITE_HOME:-/home/digeratiexperts.com}"
UNIT_SRC="$(cd "$(dirname "$0")" && pwd)/actions-runner.service"

fail() { echo "ERROR: $*" >&2; exit 1; }

test -n "${RUNNER_TOKEN:-}" || fail "Set RUNNER_TOKEN from GitHub runner registration."
test -d "$SITE_HOME" || fail "This host is not the DE production VPS: $SITE_HOME missing."
id "$RUNNER_USER" >/dev/null 2>&1 || fail "Runner user $RUNNER_USER does not exist. Create it before installing."

if [ "$(id -u)" -ne 0 ]; then
  fail "Run this installer as root so it can write systemd and $RUNNER_DIR."
fi

install -d -o "$RUNNER_USER" -g "$RUNNER_USER" -m 0750 "$RUNNER_DIR"
cd "$RUNNER_DIR"

TGZ="actions-runner-linux-x64-${RUNNER_VERSION}.tar.gz"
if [ ! -x ./config.sh ]; then
  curl -fsSL -o "$TGZ" \
    "https://github.com/actions/runner/releases/download/v${RUNNER_VERSION}/${TGZ}"
  tar xzf "$TGZ"
  chown -R "$RUNNER_USER:$RUNNER_USER" "$RUNNER_DIR"
fi

if [ ! -f .runner ]; then
  sudo -u "$RUNNER_USER" ./config.sh --unattended \
    --url "$REPO_URL" \
    --token "$RUNNER_TOKEN" \
    --name de-vps-production \
    --labels "self-hosted,Linux,X64,de-vps,production" \
    --work _work \
    --replace
fi

install -m 0644 "$UNIT_SRC" /etc/systemd/system/actions-runner-digeratiexperts-site.service
systemctl daemon-reload
systemctl enable --now actions-runner-digeratiexperts-site.service
systemctl --no-pager --full status actions-runner-digeratiexperts-site.service

echo "Runner should now accept jobs labeled [self-hosted, Linux, X64]."
echo "If a deploy job is already queued, it should start without another commit."
