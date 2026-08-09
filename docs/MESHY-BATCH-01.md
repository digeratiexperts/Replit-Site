# Meshy batch-01 — generation log

**Date:** 2026-08-08  
**Status:** Complete (Text-to-3D preview meshes downloaded)  
**MCP server:** `user-meshy`  
**Mode:** Text-to-3D · `ai_model: meshy-6` · formats `glb` + `fbx` + `obj` · `alpha_thumbnail: true`  
**Website code:** Not touched (generation + docs only)

---

## Credit estimate

| Item | Credits |
|---|---|
| Opening balance | **3100** |
| Closing balance | **2960** (verified via `meshy_check_balance`) |
| First-pass 5 concepts | 5 × 20 = **100** |
| Identity retries (hooded → avatar → checkmark shield) | 2 × 20 = **40** |
| **Approx used** | **~140** |
| Refine / remesh / animate | **Not run** (left for DE approval) |
| Budget band | ~150–200 — **under**, headroom for refine (~10 each) if approved |

---

## Export root (gitignored binaries)

```
C:\Users\Joe\Projects\Replit-Site\assets\licensed\meshy-batch-01\ORIGINAL\
  identity\
  endpoint\
  email\
  network\
  backup\
```

Each concept folder contains:

- `{slug}.glb` — primary web/viewing
- `{slug}.fbx` — DCC / engine
- `{slug}.obj` — interchange
- `{slug}-preview.png` — Meshy clay preview
- `{slug}-preview-alpha.png` — transparent-background preview

Sources stay under `assets/licensed/` (gitignored for binaries). Never copy into `client/public` / `public/` until inventory + DE approval.

---

## Results per concept

| Concept | Status | Canonical task ID | Notes |
|---|---|---|---|
| **Identity** | Success (retry) | `019fe3f2-e43b-7160-af02-922442e66961` | See retry log — on-disk files are **v3** (shield + checkmark prompt; no person). Review preview carefully. |
| **Endpoint** | Success | `019fe3ec-a126-7062-adb2-a56579f77ef7` | Soft laptop + embossed shield on screen — strong MSP read. |
| **Email** | Success | `019fe3ec-a412-7063-b9fb-da51cf638d8f` | Rounded envelope + padlock — clean product icon. |
| **Network** | Success | `019fe3ec-a5a1-7773-b921-3304bae929e5` | Node cluster / cloud base — MSP-safe, no hooded hacker. |
| **Backup** | Success | `019fe3ec-aaca-7064-add0-3e2109cee9bc` | Cloud over stacked drive cylinders — clear metaphor. |

All first-pass tasks are `text-to-3d-preview` (untextured clay). Violet/fuchsia accents appear only after **refine** (`meshy_text_to_3d_refine`, ~10 credits each).

---

## Prompts used

### Shared style (embedded in each prompt)

Soft plastic clay-like 3D marketing icon · dark charcoal / graphite · violet / fuchsia / soft pink accents · premium MSP product look · single centered object · studio soft lighting · clean rounded design.  
Exclusions: hood / hooded figure / hacker / skull / malware insect / green matrix / cyberpunk clutter / photoreal people.

### Identity (canonical v3 — on disk)

> Soft plastic clay-like 3D marketing icon of a classic rounded heraldic shield with a bold raised checkmark in the center. No human figure, no face, no avatar, no person silhouette. Dark charcoal graphite shield, violet fuchsia and soft pink accent rim and checkmark, premium MSP identity verification product look, single centered object, studio soft lighting, clean rounded product design. No hood, no hacker, no skull, no malware, no green matrix, no cyberpunk clutter.

**Identity retry log**

| Ver | Task ID | Outcome |
|---|---|---|
| v1 | `019fe3ec-9e59-7061-8dfb-083aad46e7f2` | Clear shield geometry but **hooded silhouette** — rejected / overwritten |
| v2 | `019fe3f0-cc59-7100-9029-6519a1e65031` | Open-face avatar prompt — weak/ambiguous badge read — overwritten |
| v3 | `019fe3f2-e43b-7160-af02-922442e66961` | Checkmark shield, no person — **kept** |

### Endpoint

> Soft plastic clay-like 3D marketing icon of a sleek laptop computer with a soft rounded corner shield badge, dark charcoal graphite laptop, violet fuchsia and soft pink accent shield and highlights, premium MSP endpoint protection product look, single centered object, studio soft lighting, clean rounded product design. No hooded figure, no hacker, no skull, no malware bug, no green matrix, no cyberpunk clutter, no photoreal people.

### Email

> Soft plastic clay-like 3D marketing icon of a rounded closed envelope with a small padlock and checkmark accent, dark charcoal graphite envelope, violet fuchsia and soft pink lock accents, premium MSP email security product look, single centered object, studio soft lighting, clean rounded product design. No hooded figure, no hacker, no skull, no malware bug, no green matrix, no cyberpunk clutter, no photoreal people.

### Network

> Soft plastic clay-like 3D marketing icon of a clean network node cluster: three rounded spheres linked by soft curved tubes with a gentle cloud base, dark charcoal graphite nodes, violet fuchsia and soft pink connection accents, premium MSP network infrastructure product look, single centered object, studio soft lighting. No hooded figure, no hacker, no skull, no malware insect, no green matrix, no cyberpunk overload, no photoreal people.

### Backup

> Soft plastic clay-like 3D marketing icon of a soft cloud resting above a stacked cylinder hard-drive disk pack, dark charcoal graphite drives and cloud, violet fuchsia and soft pink accent rings, premium MSP backup and recovery product look, single centered object, studio soft lighting, clean rounded product design. No hooded figure, no hacker, no skull, no malware bug, no green matrix, no cyberpunk clutter, no photoreal people.

---

## How to preview

1. **PNG stills (fastest):** open  
   `assets/licensed/meshy-batch-01/ORIGINAL/<slug>/<slug>-preview.png`
2. **GLB (best):** drag `.glb` into [https://gltf-viewer.donmccurdy.com/](https://gltf-viewer.donmccurdy.com/) or Blender / Windows 3D Viewer.
3. **Meshy web:** open task by ID in the Meshy dashboard (same account as `Digerati-Cursor`).

---

## Recommended next steps (not done)

1. DE reviews the five PNG previews (especially **Identity** v3).
2. If shapes are good: run `meshy_text_to_3d_refine` on each (~10 × 5 ≈ **50** credits) for dark + violet/fuchsia materials — stay inside ~200 total if selective.
3. Optional: Image-to-3D for Identity using an Envato soft-plastic still as style reference.
4. Only after approval: export website-ready derivatives (not raw ORIGINALs into `client/public`).
5. Do **not** remesh / rig / animate unless a specific deliverable needs it.
