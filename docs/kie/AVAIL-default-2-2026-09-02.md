# kie.ai read-only availability probe — Default environment (second pass) — 2026-09-02

- **Environment:** Default (second pass) — Claude Code remote session, outbound HTTPS via the managed agent proxy
- **Run time (UTC):** 2026-09-02T07:27:16Z (pre-checks), 2026-09-02T07:27:32Z (probe script)
- **Script:** `docs/kie/probe-availability.mjs` (one pass, unmodified)
- **Raw log:** `docs/kie/AVAIL-default-2-2026-09-02.log`
- **Key presence:** `env | grep -c '^KIE_AI_API_KEY='` → `0`; `env | grep -c '^KIE_API_KEY='` → `0`. Script confirms `KIE_AI_API_KEY: missing`, `KIE_API_KEY: missing`.

No key value was printed, logged, or written anywhere (there was none to print). No task was created and nothing was spent.

## Hosts

| url | http (curl) | http (script) | error | body: proxy block or real server? |
| --- | --- | --- | --- | --- |
| https://api.kie.ai/ | 000 | 403 | `curl: (56) CONNECT tunnel failed, response 403` | proxy block (CONNECT step) |
| https://kieai.redpandaai.co/ | 000 | 403 | `curl: (56) CONNECT tunnel failed, response 403` | proxy block (CONNECT step) |
| https://tempfile.redpandaai.co/ | 000 | 403 | `curl: (56) CONNECT tunnel failed, response 403` | proxy block (CONNECT step) |
| https://docs.kie.ai/ (script only) | — | 403 | — | proxy block (CONNECT step) |

`curl -sS -o /dev/null -w '%{http_code}'` prints `000` for all three because the TLS tunnel is never established; the `403` is the proxy's answer to the `CONNECT` request, which Node's `fetch` surfaces as `http: 403`. The `curl -sS https://tempfile.redpandaai.co/ | head -c 200` body capture returned **no body at all**, only the curl error on stderr, because a CONNECT-level refusal carries no page through to the client. `curl -v` shows the exchange directly:

```
> CONNECT tempfile.redpandaai.co:443 HTTP/1.1
< HTTP/1.1 403 Forbidden
< Connection: close
* CONNECT tunnel failed, response 403
```

The proxy's own status endpoint (`$HTTPS_PROXY/__agentproxy/status`) records each attempt as `kind: "connect_rejected"`, `detail: "gateway answered 403 to CONNECT (policy denial or upstream failure)"` for `api.kie.ai:443`, `kieai.redpandaai.co:443`, and `tempfile.redpandaai.co:443`. So these are proxy policy denials, not responses from any kie.ai server; none of the three hosts was actually reached. (The first-pass report quoted the proxy's plain-text `request blocked: no rule or allowlist entry allows host …` body; on this pass curl did not surface any body text, but the proxy status log confirms the same policy denial.)

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

On this second pass the Default environment still has **no kie.ai key**: both `KIE_AI_API_KEY` and `KIE_API_KEY` are absent from the environment, and the scrollcraft doctor reports the same. **None of the three hosts is reachable** through this environment: `api.kie.ai`, `kieai.redpandaai.co`, and `tempfile.redpandaai.co` (and `docs.kie.ai`) are all refused with a 403 at the proxy `CONNECT` step, which the proxy status log records as a policy denial; no request reached a kie.ai server. Because the script aborted for lack of a key, the credit endpoint was never queried and **no model probes were sent**, so all seven models are classified BLOCKED and their availability for the key remains unknown from this environment. **Nothing was spent**: credit before and after were both "not sent", and no `createTask` request left this container. The result is identical to the first Default pass earlier today; a real availability answer requires an environment that both carries the key and allows outbound access to the kie.ai hosts.

Limitation to keep in mind for any environment where the probe does run: an empty-input validation error proves only that the model name is valid and reachable, not that the key is authorized for it — on 2026-09-02 `seedream/5-pro-text-to-image` passed this same probe, yet a full request was refused with API code 401.
