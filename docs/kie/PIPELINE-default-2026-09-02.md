# KIE pipeline proof — Default cloud environment — 2026-09-02

**Outcome: NOT GENERATED.** Every kie.ai host is blocked by the cloud
environment's egress proxy, so the end-to-end proof stopped before Step 4.
No credits were spent. No image exists. Nothing under `scrollcraft/assets/`
was created.

## Step 1 — key file

- `.env` created in the repo root with `KIE_AI_API_KEY` (value not recorded here).
- `git check-ignore .env` → `.env` (ignored via `.gitignore:7`).
- `git status` never listed `.env`.

## Step 2 — network probe

Direct `curl -sS -o /dev/null -w '%{http_code}' --max-time 15 <host>`:

| Host | HTTP code | curl result |
| --- | --- | --- |
| `https://api.kie.ai/` | `000` | `curl: (56) CONNECT tunnel failed, response 403` |
| `https://kieai.redpandaai.co/` | `000` | `curl: (56) CONNECT tunnel failed, response 403` |
| `https://tempfile.redpandaai.co/` | `000` | `curl: (56) CONNECT tunnel failed, response 403` |

The `403` is from the agent proxy's CONNECT step, not from kie.ai. The proxy
status endpoint (`$HTTPS_PROXY/__agentproxy/status`) recorded all three as:

```
kind:   connect_rejected
detail: gateway answered 403 to CONNECT (policy denial or upstream failure)
```

So the environment's network policy does not allow these three hosts.

`node .claude/skills/scrollcraft/scripts/kie.mjs probe` (output digit-masked):

```
ERROR: Unexpected token 'H', "Host not i"... is not valid JSON
exit 1
```

Probe **failed**. The script received the proxy's plain-text "Host not in
allowlist" denial instead of JSON from `/api/v1/chat/credit`. The key itself
was therefore never validated against kie.ai; this run says nothing about
whether the key or the credit balance is good.

## Step 3 — doctor

SessionStart hook exported `SCROLLCRAFT_FFMPEG=/root/.cache/scrollcraft/node_modules/ffmpeg-static/ffmpeg`,
so no ffmpeg install was needed.

```
scrollcraft preflight

 [ ok ] node                   v22.22.2
 [ ok ] ffmpeg (full build)    /root/.cache/scrollcraft/node_modules/ffmpeg-static/ffmpeg  (495 filters)
 [ ok ]   └ libwebp encoder    present
 [ ok ] playwright-core        resolves from cwd
 [ ok ] Chrome                 /opt/pw-browsers/chromium-1194/chrome-linux/chrome
 [warn] KIE_AI_API_KEY         not set
        Only needed to GENERATE imagery. Building from your own photos and footage needs no key and no spend. Copy .env.example to .env to set one.
 [ ok ] workspace              /home/user/digeratiexperts-site/scrollcraft
      via project root (.git)
 [ ok ]   └ registry           present

Ready, with 1 optional item(s) missing (see above).
```

Note: doctor ran before `.env` was written, hence the key warning; `kie.mjs`
reads the key from `.env` on its own, and did so for the probe above.

## Steps 4–7 — skipped

Gate in Step 4 not met (all three hosts answered `000`, probe failed).
Per Step 8, no still was generated, no `.webp` encoded, no `manifest.json`
written, and no assets were committed.

## What unblocks the next attempt

The local toolchain is complete (node, ffmpeg with libwebp, Chrome, workspace,
registry). The only blocker is network policy. To rerun the proof unchanged:

1. Add these hosts to the Default environment's allowed egress list
   (Claude Code on the web → environment → network policy):
   - `api.kie.ai` (jobs + credit API)
   - `kieai.redpandaai.co` (base64 upload for `--ref` and `shot` inputs)
   - `tempfile.redpandaai.co` (result download host)
2. Rerun the same eight-step brief. Steps 1–3 already pass locally.

Alternatively, run the proof from a machine whose network is not policy
restricted (a local checkout with `.env` in place), which needs no
environment change.

## Planned target (unchanged, for the rerun)

- Family `F-03`, frame `identity-01`, page "homepage / What we protect"
- Provider `kie.ai`, model `seedream/5-pro-text-to-image`, aspect `16:9`
- Output `scrollcraft/assets/f03/identity-01.png` + `identity-01.webp` (1600 wide, quality 82)
- Classification `ILLUSTRATIVE`, status `candidate, not published`
