# Visual Asset Inventory — Digerati Experts site

**Date:** 2026-08-08  
**Repo:** `C:\Users\Joe\Projects\Replit-Site`  
**Related:** `docs/VISUAL-ASSET-AUDIT.md` (Envato Phase 1), `docs/MESHY-BATCH-01.md`, `docs/MESHY-ASSET-BACKLOG.md`

---

## Verdict

| Source | Status |
|---|---|
| Meshy Batch 01 (4 approved) | **Ready** — interim clay preview derivatives published + placed selectively |
| Meshy Identity v4 | On disk under licensed ORIGINAL — **await DE re-approval** (not on site) |
| Envato `4THD2PH` | **Not arrived** — scaffold only under `assets/licensed/envato-4THD2PH/` |
| DE / Joseph Petro headshots | **Missing** — no real founder photos in repo; drop path prepared |

---

## 1. Meshy batch-01 (licensed sources)

Path: `assets/licensed/meshy-batch-01/ORIGINAL/{identity,endpoint,email,network,backup}/`

| Concept | Formats on disk | Preview PNG | DE status | Public derivative |
|---|---|---|---|---|
| Endpoint | glb/fbx/obj + preview | yes (~81 KB) | **Approved** | `/images/visual-system/meshy-batch-01/endpoint.{webp,png}` + `-256.webp` |
| Email | glb/fbx/obj + preview | yes (~90 KB) | **Approved** | `.../email.*` |
| Network | glb/fbx/obj + preview | yes (~114 KB) | **Approved** | `.../network.*` |
| Backup | glb/fbx/obj + preview | yes (~107 KB) | **Approved** | `.../backup.*` |
| Identity (v4) | glb/fbx/obj + preview | yes (~75 KB) | **Await re-approval** | **Not published** |
| Identity v3 | under `_rejected/v3-checkmark-shield-019fe3f2/` | archived | Rejected | Never use |

Licensed binaries/PNGs are **gitignored**. Derivatives were built from preview-alpha PNGs with near-black knockout → true transparency (interim until Meshy refine adds violet/fuchsia materials).

Optimize script: `scripts/optimize-meshy-batch01.mjs` (uses local `sharp`; not a permanent dependency).

---

## 2. DE photography / headshots search

Searched (no Joseph Petro / founder headshot found):

| Location | Result |
|---|---|
| `client/public/` | SVG figma chrome only — no headshots |
| `client/src/assets/` | logo + patterns + ebook cover — no headshots |
| `attached_assets/` | Arizona dusk / office / trust desk atmosphere + UI frames — **no DE portrait** |
| `assets/licensed/` | Meshy + empty Envato scaffold |
| `uploads/` | missing |
| Downloads / Desktop / Documents (name match) | no `headshot` / `petro` / `joseph` portrait assets suitable for team page |

**Where DE should drop originals:**

```
C:\Users\Joe\Projects\Replit-Site\assets\photography\de-headshots\ORIGINAL\
  joseph-petro-headshot.jpg   (preferred name)
```

See `assets/photography/de-headshots/README.md`. After drop, optimize → `client/public/images/team/` and set `photography.founderHeadshot.available = true` in `visualAssets.ts`.

Do **not** invent AI portraits or substitute stock faces.

---

## 3. Envato `4THD2PH`

| Check | Result |
|---|---|
| `assets/licensed/envato-4THD2PH/ORIGINAL/` | scaffold `.gitkeep` only — **no ZIP** |
| Downloads / Desktop / Documents / Projects | no `4THD2PH` package |

Drop complete ZIP at:

```
C:\Users\Joe\Projects\Replit-Site\assets\licensed\envato-4THD2PH\ORIGINAL\4THD2PH.zip
```

(Details unchanged from `docs/VISUAL-ASSET-AUDIT.md`.)

---

## 4. Current site image usage (key surfaces)

| Surface | File | Current visuals | Action this pass |
|---|---|---|---|
| Homepage hero | `ModernHeroSection.tsx` | Arizona dusk photo + Lucide trust chips + `DashboardMockup` SVG | **Left alone** — refined DashboardMockup beats a corny Meshy icon swarm; ecosystem composition = later stage |
| Homepage outcomes | `HomepageOutcomesSection.tsx` | Endpoint / Backup / Network on 3 matching cards | **Polished** — shared `MeshyStillAccent` (smaller, opacity ~85%, soft frame, no heavy glow) |
| Homepage engagement | `HomepageEngagementSection.tsx` | Lucide on relationship cards | **+1** Email still on assessment band only (copy names email); cards stay Lucide |
| Homepage process | `HomepageHowItWorks.tsx` | Numbered steps | **+1** Network still as section intro accent only — not on each step |
| Homepage trust rail / proof / stats | various | Lucide | Unchanged (selective rule) |
| Mega-menu | `MegaMenu` | Lucide | **Do not replace** |
| Portal menus | portal | Lucide | **Do not replace** |
| Services section (legacy) | `DigeratiServicesSection.tsx` | Lucide — **not mounted** on current homepage | Untouched |
| Solutions index | `SolutionsIndex.tsx` | Lucide grids | **Selective** Network / Threat (endpoint) / Backup stills |
| About / Team | `about/Team.tsx` | Role cards + Lucide only | Founder spotlight **wired but gated** until photo exists |
| Trust photo | `DigeratiTrustPhotoSection.tsx` | `de-trust-assessment-desk.png` atmosphere | Keep (real scene, not founder) |
| ProActive ecosystem pages | `solutions/ProActive*EcosystemPage.tsx` | mostly Lucide / layout | Deferred — need more Batch 02+ concepts |

Shared accent component: `client/src/components/visual/MeshyStillAccent.tsx`  
Registry accents: `homepageSectionAccents` in `visualAssets.ts`

---

## 5. Destination map

| Concept | Public path | Primary placement | Secondary | Blocked / next |
|---|---|---|---|---|
| Endpoint | `/images/visual-system/meshy-batch-01/endpoint.webp` | Outcomes: “Protect identities and devices” | Solutions: Threat Detection | Refine materials later |
| Email | `.../email.webp` | Engagement assessment band (homepage) | Future email-security page | Do not duplicate on outcomes (endpoint already leads that card) |
| Network | `.../network.webp` | Outcomes: “Protect and monitor…” | Process section intro + Solutions: Managed Network | — |
| Backup | `.../backup.webp` | Outcomes: “Keep the business recoverable” | Solutions: Backup & DR | — |
| Identity | — | — | — | DE approve v4 → publish derivative → outcomes / identity cards |
| Founder headshot | `/images/team/joseph-petro-headshot.webp` | `/about/team` founder spotlight | Ebook / trust / About | Waiting for DE drop |
| Hero ecosystem | composed still / GLB | `ModernHeroSection` replace/augment `DashboardMockup` | ProActive pages | Needs Batch 10 composition + inventory support |
| Envato pack | TBD derivatives | Selective fill for gaps Meshy doesn’t cover | — | Waiting for ZIP |

Registry: `client/src/lib/visualAssets.ts`

---

## 6. What’s still needed from DE

1. **Approve or reject Identity v4** (`identity-preview.png` under licensed ORIGINAL).
2. **Drop founder headshot(s)** into `assets/photography/de-headshots/ORIGINAL/`.
3. **Drop Envato `4THD2PH` ZIP** into `assets/licensed/envato-4THD2PH/ORIGINAL/` when ready.
4. After Identity approval: refine Batch 01 (5×) for violet/fuchsia materials — then re-export public stills.

---

## 7. Guardrails honored

- No homepage redesign / no CTA / form / SEO removal
- No mega-menu or portal Lucide replacement
- Licensed sources stay private; only optimized derivatives public
- Identity not placed pending approval
- Hero mockup left for composition stage
