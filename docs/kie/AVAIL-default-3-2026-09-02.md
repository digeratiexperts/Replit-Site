# kie.ai read-only availability probe — Default environment (third pass) — 2026-09-02

- **Environment:** Default (third pass) — Claude Code remote session, outbound HTTPS via the managed agent proxy
- **Run time (UTC):** 2026-09-02T09:35:28Z (pre-checks), 2026-09-02T09:35:35Z (probe script)
- **Script:** `docs/kie/probe-availability.mjs` (one pass, unmodified)
- **Raw log:** `docs/kie/AVAIL-default-3-2026-09-02.log`
- **Key presence:** `env | grep -c '^KIE_AI_API_KEY='` → `0`; `env | grep -c '^KIE_API_KEY='` → `0`. Length of both variables: 0. Script confirms `KIE_AI_API_KEY: missing`, `KIE_API_KEY: missing`.

No key value was printed, logged, or written anywhere (there was none to print). No task was created and nothing was spent.

## Hosts

| url | http (curl) | http (script) | error | body: proxy block or real server? |
| --- | --- | --- | --- | --- |
| https://api.kie.ai/ | 000 | 403 | `curl: (56) CONNECT tunnel failed, response 403` | proxy block (CONNECT step) |
| https://kieai.redpandaai.co/ | 000 | 403 | `curl: (56) CONNECT tunnel failed, response 403` | proxy block (CONNECT step) |
| https://tempfile.redpandaai.co/ | 000 | 403 | `curl: (56) CONNECT tunnel failed, response 403` | proxy block (CONNECT step) |
| https://docs.kie.ai/ (script only) | — | 403 | — | proxy block (CONNECT step) |

`curl -sS -o /dev/null -w '%{http_code}'` prints `000` for all three because the TLS tunnel is never established; the `403` is the proxy's answer to the `CONNECT` request, which Node's `fetch` surfaces as `http: 403`. The `curl -sS <url> | head -c 160` body capture returned **no page body** for any host, only the curl error text `curl: (56) CONNECT tunnel failed, response 403` on stderr. A CONNECT-level refusal carries no server page through to the client, so there is no `request blocked: no rule or allowlist entry allows host` body to quote on this pass, and no real kie.ai server answer either. As on the second pass, these are proxy policy denials; none of the three hosts was actually reached.

## Credit

| when | http | code | credit |
| --- | --- | --- | --- |
| before | not sent | — | — |
| after | not sent | — | — |

The script aborted after the host checks with `abort: no key in environment`, so the credit endpoint was never called and no model probes were sent. Credit before → after: not queried → not queried; no change possible.

## Models

| model | http | code | msg | classification |
| --- | --- | --- | --- | --- |
| gpt-image-2-text-to-image | — | — | not probed (no key; host blocked by proxy) | BLOCKED |
| nano-banana-2 | — | — | not probed (no key; host blocked by proxy) | BLOCKED |
| google/imagen4-ultra | — | — | not probed (no key; host blocked by proxy) | BLOCKED |
| google/imagen4-fast | — | — | not probed (no key; host blocked by proxy) | BLOCKED |
| google/imagen4 | — | — | not probed (no key; host blocked by proxy) | BLOCKED |
| flux-2/pro-text-to-image | — | — | not probed (no key; host blocked by proxy) | BLOCKED |
| seedream/5-pro-text-to-image | — | — | not probed (no key; host blocked by proxy) | BLOCKED |

Classification key: AVAILABLE = validation error on the missing prompt; NOT-AUTHORIZED; UNKNOWN-MODEL; BLOCKED = request could not reach kie.ai; OTHER = anything else, with the msg quoted. Even if a key had been present, every per-model `createTask` request would have been refused at the proxy CONNECT step exactly as the host checks were.

## scrollcraft doctor

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

## Summary

On this third pass the Default environment still has **no kie.ai key**: both `KIE_AI_API_KEY` and `KIE_API_KEY` are absent from the environment, and the scrollcraft doctor reports the same. **None of the three hosts is reachable** through this environment: `api.kie.ai`, `kieai.redpandaai.co`, and `tempfile.redpandaai.co` (and `docs.kie.ai`) are all refused with a 403 at the proxy `CONNECT` step; no request reached a kie.ai server. Because the script aborted for lack of a key, the credit endpoint was never queried and **no model probes were sent**, so all seven models are classified BLOCKED and their availability for the key remains unknown from this environment. **Nothing was spent**: credit before and after were both "not sent", and no `createTask` request left this container. The result is identical to the first and second Default passes earlier today; a real availability answer requires an environment that both carries the key and allows outbound access to the kie.ai hosts.

Limitation to keep in mind for any environment where the probe does run: an empty-input validation error proves only that the model name is valid and reachable, not that the key is authorized for it — on 2026-09-02 `seedream/5-pro-text-to-image` passed this same probe, yet a full request was refused with API code 401.
