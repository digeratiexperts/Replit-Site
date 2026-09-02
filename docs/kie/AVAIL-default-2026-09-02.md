# kie.ai read-only availability probe — Default environment — 2026-09-02

- **Environment:** Default (Claude Code remote session, outbound HTTPS via the managed agent proxy)
- **Run time (UTC):** 2026-09-02T05:17:17Z
- **Script:** `docs/kie/probe-availability.mjs` (one pass, unmodified)
- **Raw log:** `docs/kie/AVAIL-default-2026-09-02.log`
- **Key presence:** `KIE_AI_API_KEY: missing`, `KIE_API_KEY: missing`

No key value was printed, logged, or written anywhere. No task was created and nothing was spent.

## Hosts

| url | http | error |
| --- | --- | --- |
| https://api.kie.ai/ | 403 | — |
| https://kieai.redpandaai.co/ | 403 | — |
| https://tempfile.redpandaai.co/ | 403 | — |
| https://docs.kie.ai/ | 403 | — |

All four 403s are returned by the environment's agent proxy at the `CONNECT` step, not by kie.ai. A `curl` to the same URL shows `CONNECT tunnel failed, response 403`, and the proxy's plain-text body reads `request blocked: no rule or allowlist entry allows host …`. The environment network policy does not allow these hosts, so none of the kie.ai endpoints were actually reached.

## Credit

| when | http | code | credit |
| --- | --- | --- | --- |
| before | not sent | — | — |
| after | not sent | — | — |

The script aborted after the host checks with `abort: no key in environment`, so the credit endpoint was never called and no model probes were sent.

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

Even if a key had been present, the per-model `createTask` requests would have failed at the proxy the same way the host checks did.

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

The Default environment does **not** have a kie.ai key: both `KIE_AI_API_KEY` and `KIE_API_KEY` are absent, and the scrollcraft doctor reports the same. It does **not** reach the three kie.ai hosts (`api.kie.ai`, `kieai.redpandaai.co`, `tempfile.redpandaai.co`), nor `docs.kie.ai`: every request is refused with a 403 by the session's agent proxy because no network-policy rule or allowlist entry permits those hosts. Because the script aborted for lack of a key, no credit lookup and no model probes were sent, so model availability for the key is unknown from this environment and every model row is classified BLOCKED. Nothing was spent: credit before and after were never queried, and no `createTask` request left this container. To get a real availability answer, this probe needs to run in an environment that both carries the key and allows outbound access to the kie.ai hosts.
