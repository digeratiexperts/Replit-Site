# Meshy batch-01 — generation log

**Date:** 2026-08-08  
**Status:** Previews ready — **awaiting DE Identity approval** before any refine  
**MCP server:** `user-meshy`  
**Mode:** Text-to-3D · `ai_model: meshy-6` · formats `glb` + `fbx` + `obj` · `alpha_thumbnail: true`  
**Website code:** Not touched (generation + docs only)

---

## DE review (post first-pass)

| Concept | DE decision |
|---|---|
| Endpoint | **APPROVED** |
| Email | **APPROVED** |
| Network | **APPROVED** (abstract OK) |
| Backup | **APPROVED** |
| Identity | **REJECTED** → regenerated as **v4** (below) — **awaiting re-approval** |

**Refine:** Do **not** refine any of the five until Identity is approved. Then refine all five together.

---

## Credit estimate

| Item | Credits |
|---|---|
| Opening balance | **3100** |
| First-pass 5 concepts | 5 × 20 = **100** |
| Identity retries (v2–v3, first session) | 2 × 20 = **40** |
| Identity regenerate v4 (ID badge) | 1 × 20 = **20** |
| **Approx used** | **~160** |
| Closing balance | **2940** (verified via `meshy_check_balance`) |
| Refine / remesh / animate | **Not run** |
| Budget band | ~150–200 — at ~160; refine ×5 ≈ +50 if approved later |

---

## Export root (gitignored binaries)

```
C:\Users\Joe\Projects\Replit-Site\assets\licensed\meshy-batch-01\ORIGINAL\
  identity\          ← current v4 on disk
  identity\_rejected\v3-checkmark-shield-019fe3f2\   ← archived reject
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
| **Identity** | Regenerated — **await DE approve** | `019fe3fb-5218-7280-a649-860f5f1e09ef` | **v4** upright ID badge + shield/keyhole (+ small secondary emboss). Preview: `ORIGINAL/identity/identity-preview.png`. No people/hoods/dishes. |
| **Endpoint** | Approved | `019fe3ec-a126-7062-adb2-a56579f77ef7` | Soft laptop + embossed shield on screen. |
| **Email** | Approved | `019fe3ec-a412-7063-b9fb-da51cf638d8f` | Rounded envelope + padlock. |
| **Network** | Approved | `019fe3ec-a5a1-7773-b921-3304bae929e5` | Node cluster / cloud base — abstract OK. |
| **Backup** | Approved | `019fe3ec-aaca-7064-add0-3e2109cee9bc` | Cloud over stacked drive cylinders. |

All tasks are `text-to-3d-preview` (untextured clay). Violet/fuchsia accents come from later **refine**.

---

## Prompts used

### Shared style (embedded in each prompt)

Soft plastic clay-like 3D marketing icon · dark charcoal / graphite · violet / fuchsia accent-ready · premium MSP product look · single centered object · studio soft lighting · clean rounded design.  
Exclusions: hood / hooded figure / hacker / skull / malware insect / green matrix / cyberpunk clutter / photoreal people.

### Identity (canonical v4 — on disk)

> Soft plastic clay 3D icon: upright rectangular ID badge access card with rounded corners and clip slot; raised shield emblem with keyhole and MFA checkmark on the face. Reads as identity authentication. Tall standing card, chunky product look, dark charcoal, violet fuchsia accent-ready, studio lighting, single object. No people, faces, heads, hoods, fabric, rings, bowls, dishes, portals, coiled rings, shallow dish, circular puck, or plate.

**Identity retry log**

| Ver | Task ID | Outcome |
|---|---|---|
| v1 | `019fe3ec-9e59-7061-8dfb-083aad46e7f2` | Clear shield but **hooded silhouette** — rejected |
| v2 | `019fe3f0-cc59-7100-9029-6519a1e65031` | Weak/ambiguous badge — rejected |
| v3 | `019fe3f2-e43b-7160-af02-922442e66961` | Dish/ring-like — **DE REJECTED**; archived under `identity/_rejected/v3-checkmark-shield-019fe3f2/` |
| **v4** | `019fe3fb-5218-7280-a649-860f5f1e09ef` | Upright ID badge + shield/keyhole — **on disk; await DE approve** |

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
   Identity specifically: `ORIGINAL/identity/identity-preview.png`
2. **GLB:** drag `.glb` into [https://gltf-viewer.donmccurdy.com/](https://gltf-viewer.donmccurdy.com/) or Blender / Windows 3D Viewer.
3. **Meshy web:** open task by ID in the Meshy dashboard (same account as `Digerati-Cursor`).

---

## Recommended next steps

1. **DE approve or reject Identity v4** (preview path above).
2. If Identity approved: run `meshy_text_to_3d_refine` on **all five** together (~10 × 5 ≈ **50** credits) for dark + violet/fuchsia materials.
3. If Identity still wrong: regenerate again (up to 2 more attempts were budgeted in the regenerate brief; v4 used 1).
4. Only after refine approval: website-ready derivatives (not raw ORIGINALs into `client/public`).
5. Do **not** remesh / rig / animate unless a specific deliverable needs it.
