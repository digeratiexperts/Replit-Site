#!/usr/bin/env bash
# OBSOLETE — do not use.
#
# This script previously assumed /root/Replit-Site + rsync into public_html.
# Production is systemd `digeratiexperts-site` as user diger7051 under:
#   /home/digeratiexperts.com/current
#
# Canonical deploy:
#   sudo -u diger7051 bash -lc \
#     'DEPLOY_BRANCH=main bash /home/digeratiexperts.com/current/deploy/vps/deploy.sh production'
#
# See deploy/vps/README.md
set -euo pipefail
echo "ERROR: scripts/deploy.sh is obsolete (no /root/Replit-Site, no PM2, no public_html rsync)." >&2
echo "Use: sudo -u diger7051 bash deploy/vps/deploy.sh production" >&2
echo "Docs: deploy/vps/README.md" >&2
exit 1
