# kie.ai read-only availability probe — Digerati KIE Restricted

- Environment: **Digerati KIE Restricted**
- Run time (UTC): **2026-09-02T05:17:14Z**
- Script: `docs/kie/probe-availability.mjs` (single pass, no retries)
- Raw log: `docs/kie/AVAIL-restricted-2026-09-02.log`
- Mode: read-only. No generation requested, no task created, no credits spent.

## Key presence

```
KIE_AI_API_KEY: present(32)   KIE_API_KEY: present(32)
```

Only presence and length are recorded. No key value appears in this report, the log, or the script.

## Hosts

| url | http | error |
|-----|------|-------|
| https://api.kie.ai/ | 404 | `Not Found` (JSON body at root path; host reached) |
| https://kieai.redpandaai.co/ | 200 | — |
| https://tempfile.redpandaai.co/ | 403 | — (root path forbidden; host reached) |
| https://docs.kie.ai/ | 403 | — (root path forbidden; host reached) |

All four hosts answered with an HTTP status. No connection, DNS, TLS, or proxy error occurred.

## Credit

| when | http | code | msg | credit |
|------|------|------|-----|--------|
| before | 200 | 200 | success | 80 |
| after | 200 | 200 | — | 80 |

## Models

`POST /api/v1/jobs/createTask` with `{ "model": <slug>, "input": {} }`. No `taskId` was returned for any model.

| model | http | code | msg | classification |
|-------|------|------|-----|----------------|
| gpt-image-2-text-to-image | 200 | 500 | This field is required | AVAILABLE |
| nano-banana-2 | 200 | 500 | This field is required | AVAILABLE |
| google/imagen4-ultra | 200 | 500 | This field is required | AVAILABLE |
| google/imagen4-fast | 200 | 500 | prompt is required | AVAILABLE |
| google/imagen4 | 200 | 500 | This field is required | AVAILABLE |
| flux-2/pro-text-to-image | 200 | 500 | prompt is required | AVAILABLE |
| seedream/5-pro-text-to-image | 200 | 500 | This field is required | AVAILABLE |

Classification key: AVAILABLE = validation error on the missing prompt field (the key may use the model); NOT-AUTHORIZED = key not authorized for the model; UNKNOWN-MODEL = model not found; BLOCKED = network error; OTHER = anything else, quoted.

## Scrollcraft doctor output

`node .claude/skills/scrollcraft/scripts/doctor.mjs` (exit 1; the ffmpeg failure is expected in this environment, which has no npm or apt access):

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

## Summary

The Digerati KIE Restricted environment has the kie.ai key (both `KIE_AI_API_KEY` and `KIE_API_KEY` are set, 32 characters each). It reaches all three kie.ai service hosts: `api.kie.ai` (404 at the bare root, which is a real server response), `kieai.redpandaai.co` (200), and `tempfile.redpandaai.co` (403 at the bare root, again a real server response); `docs.kie.ai` also answered (403 at root). The credit endpoint authenticated successfully. All seven probed text-to-image models are AVAILABLE to this key: each empty-input createTask was rejected with a required-field validation error, none returned a taskId, and none reported a not-authorized or unknown-model condition. Nothing was spent: credit was 80 before the model probes and 80 after. The only environment gap is a full ffmpeg build (and playwright-core) for Scrollcraft encode/verify steps, which cannot be installed here.
