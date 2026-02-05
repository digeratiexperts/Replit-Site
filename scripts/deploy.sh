#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/root/Replit-Site"
LIVE_DOCROOT="/home/digeratiexperts.com/public_html"

cd "$APP_DIR"

npm ci
npm run build

if [ -d "$APP_DIR/dist/public" ]; then
  OUT="$APP_DIR/dist/public"
elif [ -d "$APP_DIR/dist" ]; then
  OUT="$APP_DIR/dist"
elif [ -d "$APP_DIR/build" ]; then
  OUT="$APP_DIR/build"
else
  echo "ERROR: build output dir not found (dist/public, dist, build)."
  exit 1
fi

rsync -av --delete "$OUT"/ "$LIVE_DOCROOT"/

GIT_SHA="$(git rev-parse --short HEAD 2>/dev/null || echo unknown)"
date -u +"%Y-%m-%dT%H:%M:%SZ" | awk -v sha="$GIT_SHA" '{print "{\n  \"git_sha\": \""sha"\",\n  \"built_at_utc\": \""$0"\"\n}"}' \
  > "$LIVE_DOCROOT/build-info.json"
