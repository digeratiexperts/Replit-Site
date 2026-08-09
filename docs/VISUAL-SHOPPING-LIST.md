# Visual shopping list — cybersecurity packs

**Date:** 2026-08-08  
**Goal:** Dark premium MSP visuals (violet/fuchsia), not hooded-hacker.  
**Sources stay private** under `assets/licensed/*/ORIGINAL/` — never in `client/public` or `public/`.

---

## Buy / download order

### TODAY — Envato only ([pricing](https://elements.envato.com/pricing))

Core plan (~$16.50/mo annual or $39/mo) is enough. Unlimited stock downloads; each download licenses one project; **no redistributing source ZIPs/BLEND/OBJ/FBX/PSD**.

| Priority | Pack | Action |
|---|---|---|
| **1 — do now** | [Envato `4THD2PH`](https://elements.envato.com/cyber-security-3d-icon-pack-4THD2PH) (macmaster3d) | Download **entire** ZIP → `assets/licensed/envato-4THD2PH/ORIGINAL/` |
| **2 — same session** | [Envato `QUCF9E5`](https://elements.envato.com/cyber-security-3d-icon-pack-QUCF9E5) (GavStd) | Optional backup style (16 icons). Drop at `assets/licensed/envato-QUCF9E5/ORIGINAL/` if you grab it |

### IconScout — wait

Do **not** subscribe yet. Inventory Envato #1 first.

| Pack | Verdict |
|---|---|
| [Semusim Kreatif 20](https://iconscout.com/3d-icon-pack/cybersecurity-3d-icon-pack_234707) (`234707`) | **Preferred if still needed** — MSP-safe themes (cloud/device/biometrics). Skip **Incognito** icon. |
| [Design Circle 50](https://iconscout.com/3d-icon-pack/cyber-security-707_365019) (`365019`) | **Wait / skip** — larger set but heavier malware/carding/bug threat look. Only if #1 + Semusim leave real gaps. |

### Lottie — later (after static 3D system)

| Pack | Verdict |
|---|---|
| [LottieFiles `260657`](https://lottiefiles.com/marketplace/cybersecurity-icon-pack_260657) | **Not 50 Lotties** — IconScout lists this ID as **50 line icons (SVG/PNG)** by Blinix. Skip for hero 3D / motion. |
| [Data Protection 25](https://lottiefiles.com/marketplace/cybersecurity-data-protection-animation-pack_372187) / [IconScout mirror](https://iconscout.com/lottie-animation-pack/cybersecurity-data-protection-animation-pack_372187) | Real **25 Lottie JSON + GIF**. Useful later for motion; many skull/malware frames — cherry-pick padlock/VPN/encrypt only, or find a cleaner pack. |

### Skip for now

- FreeVector / Magnific (Freepik) — free catalogs exist; brand/license/quality not worth the detour until paid packs are in.

### Meshy.ai — Pro monthly for API / Cursor MCP (DE decision 2026-08-08)

**Envato `4THD2PH` remains the primary stock pack.** Meshy is complementary: custom / brand-unique 3D via API so Cursor can generate through the official Meshy MCP — not a replacement for the Envato library.

Verified 2026-08-08 from [meshy.ai/pricing](https://www.meshy.ai/pricing), [API pricing](https://docs.meshy.ai/en/api/pricing), [API auth](https://docs.meshy.ai/en/api/authentication), [AI / MCP docs](https://docs.meshy.ai/en/api/ai), and [meshy-mcp-server](https://github.com/meshy-dev/meshy-mcp-server):

| Topic | Finding |
|---|---|
| Plan for this workflow | **Pro monthly** (~$20/mo, **1,000 credits/mo**) — includes **API access**. Skip Premium / Ultra / yearly for now. |
| API key requirement | Official MCP README: API key requires **Pro plan or above**. Create key at [meshy.ai/settings/api](https://www.meshy.ai/settings/api) (name e.g. `Digerati-Cursor`). |
| Commercial license | **Paid plans (Pro+):** full commercial use + private ownership (no CC BY attribution). **Free:** CC BY 4.0 — not for DE brand work. |
| API credit burn (Meshy-6) | Text→3D preview / Image→3D mesh ≈ **20 credits**; with texture ≈ **30**; refine/retexture ≈ **10** (2k/4k). MCP tools cost the same as REST. |
| MCP package | Official npm: `@meshy-ai/meshy-mcp-server` · env var: `MESHY_API_KEY` · never commit the key. |
| Training / proprietary | Non-Enterprise data **may** be used anonymized for future training. Enterprise is the contractual opt-out. Marketing 3D for the website does **not** require Enterprise. |

**Buy recommendation (current):**

1. Keep **Envato `4THD2PH`** as the stock pack (download entire ZIP when ready).
2. Subscribe **Meshy Pro monthly** (not yearly, not Premium/Ultra) for API + Cursor MCP.
3. Create API key `Digerati-Cursor` — **do not paste the key in chat**. Say “I have the Meshy key” and use the prepared PowerShell template to store it in the user env + wire `~/.cursor/mcp.json`.
4. Skip Free. Skip Enterprise for this project. Upgrade credits later only if Pro@1k is too tight in practice.

**Cursor + Meshy (MCP):** With Pro + `MESHY_API_KEY`, Cursor can call Meshy tools via MCP (`meshy_text_to_3d`, download, balance check, etc.). Still drop finished exports under `assets/licensed/meshy-<batch>/ORIGINAL/` for inventory — do not put sources in `client/public` or `public/`.

Rough credit burn on Pro@1k (Meshy-6, some retries): ~50 mesh previews or fewer textured assets per month — enough for targeted gap-fill; Envato covers the bulk icon set.

---

## Pack comparison (public pages)

| # | Pack | Count / themes | Formats (listed) | Style / brand fit | License note |
|---|---|---|---|---|---|
| 1 | Envato macmaster3d `4THD2PH` | **20** premium cyber icons | **BLEND, OBJ, FBX, PNG** 3000×3000 | Soft plastic 3D — best primary for DE | Website end-product OK; **no source redistribution** |
| 2 | Envato GavStd `QUCF9E5` | **16** minimal 3D | **OBJ, PSD, PNG** 2000×2000 (no BLEND/FBX listed) | Minimal clay 3D — good backup | Same Envato rules |
| 3 | IconScout Semusim `234707` | **20** — cloud secure, biometrics, folder/PC/phone, wifi; + Incognito | IconScout 3D: typically **PNG, BLEND, FBX, GLTF** | Soft plastic colorful 3D — strong MSP fit if Envato gaps | IconScout RF digital; sources not public |
| 4 | IconScout Design Circle `365019` | **50** — VPN, firewall, cloud… plus malware/carding/bugs | Same IconScout 3D set | Mixed; threat-heavy subset risks hacker aesthetic | Same |
| 5 | Marketplace `260657` | **50 line icons** (not Lottie) | **SVG, PNG** | Flat line UI icons — wrong lane for 3D hero | Skip for this phase |
| 6 | Iconique `372187` | **25** Lotties — encrypt, VPN, malware/skull alerts | **Lottie JSON, GIF** (+ AE-friendly workflow) | Motion later; filter out skull/threat frames | No AE/source dump in `/public` |

---

## Cursor + subscriptions

| Source | Can Cursor use DE’s subscription directly? |
|---|---|
| Envato / IconScout / LottieFiles | **No** — DE downloads ZIPs / exports → drop locally → agent inventories. |
| Meshy (Pro + API key + MCP) | **Yes, via MCP** — after `MESHY_API_KEY` is stored in the user environment and `@meshy-ai/meshy-mcp-server` is enabled in Cursor MCP. Never paste the key in chat; never commit it. |

Drop pattern (stock packs):

```
C:\Users\Joe\Projects\Replit-Site\assets\licensed\envato-4THD2PH\ORIGINAL\<envato-zip>.zip
C:\Users\Joe\Projects\Replit-Site\assets\licensed\envato-QUCF9E5\ORIGINAL\<envato-zip>.zip   (if bought)
C:\Users\Joe\Projects\Replit-Site\assets\licensed\meshy-<batch>/ORIGINAL/   (MCP or web exports)
```

Then ping the agent to unpack (private folders only) and continue `docs/VISUAL-ASSET-AUDIT.md`.
