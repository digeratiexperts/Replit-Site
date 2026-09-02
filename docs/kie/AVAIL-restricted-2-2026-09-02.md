# kie.ai read-only availability probe — Digerati KIE Restricted (second pass) — 2026-09-02

- **Environment:** Digerati KIE Restricted (second pass) (Claude Code remote session, outbound HTTPS via the managed agent proxy)
- **Run time (UTC):** 2026-09-02T07:47:29Z (host checks) / 2026-09-02T07:47:34Z (script)
- **Script:** `docs/kie/probe-availability.mjs` (one pass, unmodified)
- **Raw log:** `docs/kie/AVAIL-restricted-2-2026-09-02.log`
- **Key presence:** `KIE_AI_API_KEY: present(32)`, `KIE_API_KEY: present(32)` (`env | grep -c` returned 1 for each)

No key value was printed, logged, or written anywhere. No task was created and nothing was spent.

## Hosts

| url | curl code | curl stderr | script http | proxy-block or server-response |
| --- | --- | --- | --- | --- |
| https://api.kie.ai/ | 404 | — | 404 (`Not Found`) | server response (tunnel OK; 404 is kie.ai's answer for `/`) |
| https://kieai.redpandaai.co/ | 200 | — | 200 | server response |
| https://tempfile.redpandaai.co/ | 000 | `curl: (56) CONNECT tunnel failed, response 403` | 403 | **proxy block** |
| https://docs.kie.ai/ | 000 | `curl: (56) CONNECT tunnel failed, response 403` | 403 | **proxy block** |

`curl -v` evidence for tempfile.redpandaai.co:

```
* Connected to 127.0.0.1 (127.0.0.1) port 43239
* CONNECT tunnel: HTTP/1.1 negotiated
* allocate connect buffer
> CONNECT tempfile.redpandaai.co:443 HTTP/1.1
> Proxy-Connection: Keep-Alive
< HTTP/1.1 403 Forbidden
< Connection: close
* CONNECT tunnel failed, response 403
```

The 403 is returned by the agent proxy at the `CONNECT` step, so no request ever reached tempfile.redpandaai.co. The proxy's own diagnostic reported both `tempfile.redpandaai.co:443` and `docs.kie.ai:443` as `connect_rejected (the egress proxy denied the CONNECT (organization policy) or could not reach the destination)`. The script's `403` for these two hosts is the same proxy refusal seen through `fetch`, not a server status.

## Credit

| when | http | code | msg | credit |
| --- | --- | --- | --- | --- |
| before | 200 | 200 | success | 80 |
| after | 200 | 200 | — | 80 |

## Models

Each row is one `createTask` with `input: {}`. No `taskId` was returned for any model.

| model | http | code | msg | classification |
| --- | --- | --- | --- | --- |
| gpt-image-2-text-to-image | 200 | 500 | This field is required | AVAILABLE |
| nano-banana-2 | 200 | 500 | This field is required | AVAILABLE |
| google/imagen4-ultra | 200 | 500 | This field is required | AVAILABLE |
| google/imagen4-fast | 200 | 500 | prompt is required | AVAILABLE |
| google/imagen4 | 200 | 500 | This field is required | AVAILABLE |
| flux-2/pro-text-to-image | 200 | 500 | prompt is required | AVAILABLE |
| seedream/5-pro-text-to-image | 200 | 500 | This field is required | AVAILABLE |

**Limitation:** an empty-input validation error proves the model name is valid and reachable, not that the key is authorized for it (seedream/5-pro-text-to-image passed this probe on 2026-09-02 yet a full request was refused with API code 401). AVAILABLE here means "name accepted, input validation reached", nothing more.

## Summary

In the Digerati KIE Restricted environment on this second pass, the kie.ai key is present (both variables, 32 characters), the API host `api.kie.ai` and the CDN host `kieai.redpandaai.co` are reachable through the agent proxy, and the credit endpoint answered with 80 credits before and 80 credits after the seven empty-input probes, so nothing was spent and no task was created. `tempfile.redpandaai.co` is **not** reachable from this environment: the proxy refuses the `CONNECT` with 403 before any TLS handshake, exactly as `docs.kie.ai` is refused, so any workflow that needs to download generated files from the tempfile host will still fail here until the network policy allows it. All seven models returned a field-validation error rather than a not-authorized error, so their names are valid and the endpoint is reachable with this key, subject to the limitation above that this does not prove the key is authorized to run them.
