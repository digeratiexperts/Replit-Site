# kie.ai first still — F-03 identity-01 — restricted env — 2026-09-02

**Outcome:** NOT GENERATED — failing step: `createTask` returned `code 401`, `"The API key is not authorized to use this model."` (HTTP 200 transport, API-level 401). No task was created, no credit was spent, no retry was attempted.

## Run facts

| Field | Value |
|---|---|
| Environment | "Digerati KIE Restricted" cloud environment (egress-proxied) |
| Run time (UTC) | 2026-09-02T04:59:36Z |
| API key | present as `KIE_AI_API_KEY` env var, 32 chars (value never printed or committed) |
| Model requested | `seedream/5-pro-text-to-image` |
| Aspect ratio | 16:9 |
| Quality | high |
| Output format | png |
| taskId | none (createTask did not return one) |
| Result URLs | none |
| Credit before | 80 |
| Credit after | 80 (read-only re-check at 04:59:45Z) |
| Generation seconds | n/a (no task) |
| createTask calls made | 1 (the only one permitted; it failed, so no retry) |
| Classification | Illustration (Class D), candidate, not published, no page mounts it |
| PNG | not downloaded (nothing to download) |

## Step log (verbatim from `scrollcraft/assets/f03/kie-run.log`)

```
{"step":"key","present":true,"length":32}
{"t":"2026-09-02T04:59:36.586Z","step":"credit-before","http":200,"code":200,"credit":80}
{"t":"2026-09-02T04:59:36.725Z","step":"createTask","http":200,"code":401,"msg":"The API key is not authorized to use this model."}
{"t":"2026-09-02T04:59:36.725Z","step":"abort","reason":"no taskId"}
{"t":"2026-09-02T04:59:45.130Z","step":"credit-after-readonly","body":"{\"code\":200,\"msg\":\"success\",\"data\":80.0}"}
```

## Download attempts

| Label | Host | HTTP / error |
|---|---|---|
| — | — | no attempts; there was no result URL |

## What this tells us

- The key itself is valid: `GET /api/v1/chat/credit` authenticated fine and returned a balance of 80.
- `api.kie.ai` is reachable through the restricted egress proxy (both calls got HTTP 200).
- The rejection is a per-model authorization on the kie.ai account, not a network or key-format problem. The message text is kie.ai's own: "The API key is not authorized to use this model."
- Likely causes, for Joe to check in the kie.ai dashboard (no action taken here):
  - the `seedream/5-pro-text-to-image` model is not enabled for this key / this account tier, or needs to be switched on per-model;
  - the key was created with a restricted model scope;
  - the model slug has changed or Seedream 5 Pro is gated behind a separate plan.
- Nothing in the restricted environment blocked this step. The previously observed block on `tempfile.redpandaai.co` (download host) was never reached.

## Next step (not done in this run)

One of: enable the model for the key in kie.ai, or pick a model this key is authorized for (e.g. check the account's model list) and re-run the same script once with the new `model` value. The script, prompt, and manifest layout on this branch are reusable as-is.

## Exact prompt used (`scrollcraft/assets/f03/identity-01.prompt.txt`)

```
Premium editorial product photograph, physical technology, technically credible, quiet Arizona evening atmosphere. Real materials with real texture: brushed aluminium, matte plastic, paper, glass. One warm key light from the right, like a low desert sun through a window. Graphite field: a near-black desk surface and background, restrained violet ambient fill, no glow, no neon. The left third of the frame is open and dark, left free for typography. No people, no text, no logos, no padlocks, no shields, no holograms, no data streams, no dashboards, no screens with content, no cyberpunk styling.

Macro still life: a small hardware security key, matte black USB-C body with a brushed-metal tip, lying on the dark desk beside an employee access badge on a short lanyard; the badge is plain matte white with one thin magenta edge stripe (the only saturated colour in the frame). Shallow depth of field, focus on the security key, the badge softening behind it. Photoreal, natural lens rendering, 16:9.
```

## Request body sent to `POST /api/v1/jobs/createTask`

```json
{
  "model": "seedream/5-pro-text-to-image",
  "input": {
    "prompt": "<contents of identity-01.prompt.txt>",
    "aspect_ratio": "16:9",
    "quality": "high",
    "output_format": "png",
    "nsfw_checker": false
  }
}
```

## Files on this branch

- `scrollcraft/assets/f03/identity-01.prompt.txt` — the prompt
- `scrollcraft/assets/f03/gen-one.mjs` — the one-shot generation script (reads the key from env only)
- `scrollcraft/assets/f03/kie-run.log` — raw run log
- `docs/kie/FIRST-STILL-restricted-2026-09-02.md` — this report

No PNG and no `manifest.json` were written because nothing was generated.
