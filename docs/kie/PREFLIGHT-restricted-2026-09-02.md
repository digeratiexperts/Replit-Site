# KIE Preflight — "Digerati KIE Restricted" environment — 2026-09-02

Read-only, no-spend preflight run from the Claude Code cloud environment
**Digerati KIE Restricted** (repo `digeratiexperts/digeratiexperts-site`,
checked out at `origin/main` `1ec1457`). No media was generated and no KIE task
was created. No secret values or credit balances are recorded here.

## 1. Runtime

| Check | Result |
| --- | --- |
| `node --version` | `v22.22.2` |

## 2. Key presence (booleans and lengths only)

| Check | Result |
| --- | --- |
| `process.env.KIE_AI_API_KEY` present | `true` (length 32) |
| `process.env.KIE_API_KEY` present | `true` (length 32) |
| `.env` file exists in repo root | `false` |
| `.env` contains a `KIE_AI_API_KEY=` line | `false` (no file) |

Both keys are supplied by the environment, not by a checked-in or local `.env`.

## 3. Egress

Command: `curl -sS -o /dev/null -w '%{http_code}' --max-time 15 <url>`

| URL | HTTP code | curl error |
| --- | --- | --- |
| `https://api.kie.ai/` | `404` | none (host reachable; root path has no route) |
| `https://kieai.redpandaai.co/` | `200` | none |
| `https://tempfile.redpandaai.co/` | `000` | `curl: (56) CONNECT tunnel failed, response 403` |

`tempfile.redpandaai.co` is **blocked by this environment's network allowlist**.
The KIE API host and the `kieai.redpandaai.co` asset host are reachable.

## 4. Credit endpoint (non-generation, single call)

`GET https://api.kie.ai/api/v1/chat/credit` with `Authorization: Bearer <KIE_AI_API_KEY>`
via a small Node script reading the key from the environment.

| Field | Value |
| --- | --- |
| HTTP status | `200` |
| JSON `code` | `200` |
| JSON `msg` | `success` |

The `data` field (balance) was deliberately not printed or recorded. The key
authenticates successfully against the KIE API from this environment.

## 5. `node .claude/skills/scrollcraft/scripts/doctor.mjs` (no `--probe`)

```
scrollcraft preflight

 [ ok ] node                   v22.22.2
 [FAIL] ffmpeg (full build)    not found
        A stripped ffmpeg lacks scale/fps/psnr and the webp muxer. Install a full build (Windows: winget install Gyan.FFmpeg) or set SCROLLCRAFT_FFMPEG to one.
 [warn] playwright-core        not installed
        Run `npm i playwright-core` inside the build folder. Only needed for the verification pass.
 [ ok ] Chrome                 /opt/pw-browsers/chromium-1194/chrome-linux/chrome
 [ ok ] KIE_AI_API_KEY         env
 [ ok ] workspace              /home/user/digeratiexperts-site/scrollcraft
      via project root (.git)
 [ ok ]   └ registry           present

1 required check(s) failed. Fix these before building.
```

Exit code: `1`.

The session-start hook also reported that `npm install` failed and that no full
ffmpeg build could be installed (neither `ffmpeg-static` nor `apt-get` succeeded),
consistent with the restricted network policy.

## Summary

- **KIE auth works** from this environment: key present in env, credit endpoint returns `200 / code 200 / success`.
- **Egress**: `api.kie.ai` and `kieai.redpandaai.co` reachable; `tempfile.redpandaai.co` blocked (proxy `403`). Any KIE flow that downloads results from `tempfile.redpandaai.co` will fail here until that host is allowlisted.
- **Scrollcraft doctor fails** on the required full-ffmpeg check; `playwright-core` is also missing. `npm install` failed at session start. Encode/verify steps cannot run in this environment as configured.
- No generation calls were made and no credits were spent.
