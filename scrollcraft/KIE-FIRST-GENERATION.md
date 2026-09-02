# First kie.ai generation: proposal, version 2 (reconsidered)

Status: **PROPOSED, NOT APPROVED, NOTHING SENT.** Owner: Claude Code. Date:
2026-09-02, revised the same evening after studying the skill packs Joe
supplied (`AI Website Skills.rar`, vendored by PR #180, refined by PR #185).
Governed by `docs/kie/KIE-RULES.md`. Version 1 of this proposal (GPT Image 2,
a prose prompt, one still) was not approved; this version replaces it. Joe
approves or changes it in a message that names the scope and gives the cap.

## What the skill packs changed

| Then (v1) | Now (v2) | Why |
| --- | --- | --- |
| GPT Image 2, first in the model list | **Nano Banana 2 through the `nano-banana-images` method** (structured JSON prompt: camera maths, material physics, lighting behaviour, a full negative stack). GPT Image 2 stays as the comparison model if the first result disappoints. | The pack Joe supplied is built around this model and this prompt discipline; it also gives `image_input` references (up to 14) for set consistency, which the plan's rule 11 asks for, and 1K/2K/4K output. |
| A prose paragraph as the prompt | A committed JSON prompt file, `artifacts/kie-ai/nano-banana/prompts/homepage/2026-09-02-f02-environment-01.json`, in the skill's Dense Narrative format | Reproducible, diffable, one or two values changed per iteration, as the skill prescribes. |
| One still, then decide | Two scopes to choose from: a **minimal proof** (one image) or a **working set** (frame 01 with up to two rerolls, then frames 02 and 03 by image-to-image from the chosen 01) | The skill's loop is generate, look, tweak one value. A per-call approval for each reroll is slow; a small batch with a total cap keeps Joe's rules and lets the set be made in one sitting. |
| The download assumed one result host | Both kie.ai result hosts are required on the cloud allowlist: `tempfile.redpandaai.co` and `tempfile.aiquickdraw.com` | PR #185 found `google/nano-banana` returns results from `tempfile.aiquickdraw.com`; two paid images were lost to a proxy refusal saved as a ".png". The generator now refuses to save anything that is not an image and prints the task id and URL for a free re-fetch. |
| Diagrams: SVG diagram system only | SVG diagram system stays on the site; **`excalidraw-visuals`** is added for explainer PNGs on blog posts, social and OG images, proposals and internal decks | The A-B in PR #185 shows tidy pastel whiteboard sketches: right for explaining a process, wrong for the graphite homepage. 4 credits each with the mandatory style reference. |
| Version 4 homepage: "recomposed on scroll", method open | Version 4 built on the **`video-to-website` architecture** (Lenis smooth scroll, a fixed canvas spine scrubbed by scroll, side-aligned sections with different entrances, colour zones, one oversized marquee, counters from the sourced facts, a persistent CTA) under the DE brand lock, as an isolated build served at `/version-4` | This is the method behind Joe's reference video and answers his notes directly: parallax, one continuous story, click-to-expand detail. The spine is not a video (video generation is not authorized and no footage exists yet) but the F-02 three-frame set cross-dissolved and connected in code. |

## Scope A, minimal proof: one image

| Field | Value |
| --- | --- |
| What | **F-02 · environment-01**, the establishing frame of the homepage peak: a small office's technology as separate objects on one dark desk, before anything connects. |
| Model | `nano-banana-2` via `kie.mjs nb2` (same request as the skill's `generate_kie.py`, behind the spend gate). |
| Prompt | `artifacts/kie-ai/nano-banana/prompts/homepage/2026-09-02-f02-environment-01.json`, reproduced below. |
| Size | 16:9 at 1K (the proof; 2K for the working set). |
| Listed price | Nano Banana 2 from $0.04 per image at 1K, about 8 credits; 2K and 4K cost more. The manifest records kie.ai's own `creditsConsumed`. |
| Suggested cap | **12 credits** ($0.06). |
| Output | `scrollcraft/assets/f02/environment-01.png` plus the manifest entry (model, prompt file, task id, result URL, hash, credits before/after/consumed, cap, approval text). |
| Classification | Illustration, status `candidate`, mounted nowhere, reviewed by Joe from a crop sheet at 1440 / 768 / 390. |
| Retry | None. A refusal or failure is recorded and the run stops. |

Approval line for scope A (edit as you like):

```
Approved: generate F-02 environment-01 on Nano Banana 2, cap 12 credits.
```

## Scope B, working set: up to five images

1. Frame 01 at 2K, up to three generations (the first plus two rerolls that each change one or two JSON values), Joe or Claude picks one.
2. Frame 02 "designed" and frame 03 "operated", one generation each, by image-to-image from the chosen frame 01 through `image_input`, so the camera and objects hold.
3. Total: at most five images, cap **60 credits** ($0.30) for the set; each call still runs under the per-call guard (listed price against the remaining cap). Balance today is 68 credits, so this leaves 8.

Approval line for scope B:

```
Approved: F-02 working set on Nano Banana 2, up to five images, total cap 60 credits; Claude picks frame 01 unless I say otherwise.
```

## The prompt, sent as one JSON string in `input.prompt`

```json
{
  "prompt": "Editorial still life for a managed IT and cybersecurity company in Chandler, Arizona: a small professional-services office's technology laid out as separate physical objects on one wide dark desk plane, seen from a 30-degree tilt, three-quarter view, eye level slightly above the desk. A closed matte-black laptop, a phone face down, a small desktop router, a two-bay NAS, a compact printer, an employee badge card on a short lanyard, and a paper binder. The objects sit apart from each other with clear gaps and hard shadows; no cables join them; nothing is lit up. The objects are grouped in the right two thirds of the frame and the left third is open and dark, left free for typography. One warm key light from the right, like a low desert sun through a window, with restrained deep-violet ambient fill used as light rather than paint, no glow. Near-black graphite desk surface and background. Real materials with real micro-texture: brushed aluminium with faint micro-scratches, matte plastic with slight surface dust, paper with visible fibre, glass with a faint fingerprint. 35mm lens at f/5.6, ISO 200, tripod, slight perspective correction, photoreal architectural-visualization quality, no retouching. Do not add people, readable text, logos, padlocks, shields, holograms, data streams, dashboards, screens showing content, neon, or cables connecting the devices.",
  "negative_prompt": "people, faces, hands, readable text, logos, watermark, padlock, shield, hologram, data stream, dashboard, glowing screen, neon, cyberpunk, rainbow gradient, excessive glow, toy-like 3D, cartoon, illustration, stock imagery, CGI plastic sheen, oversaturated, blurry, low resolution, cables connecting devices, hacker hoodie, server rack",
  "api_parameters": { "aspect_ratio": "16:9", "resolution": "1K", "output_format": "png" },
  "settings": {
    "style": "photorealistic editorial still life, premium and quiet",
    "lighting": "single warm key from the right, restrained violet fill, no glow",
    "camera_angle": "30-degree tilt, three-quarter view, eye level slightly above the desk",
    "depth_of_field": "moderate, f/5.6, every object in focus",
    "quality": "high detail, realistic micro-roughness, unretouched"
  }
}
```

Why this scene represents DE (rule 15): it is the buyer's own office as
physical objects, not a hacker or a padlock; the "fragmented" state is the
belief DE changes; frames 02 and 03 turn the same scene into "designed"
(hairline connections drawn in code, not in the image) and "operated" (one
soft-lit boundary, the badge lit).

## The command that would run once approved

```
node .claude/skills/scrollcraft/scripts/kie.mjs nb2 \
  artifacts/kie-ai/nano-banana/prompts/homepage/2026-09-02-f02-environment-01.json \
  scrollcraft/assets/f02/environment-01.png \
  --family F-02 --frame environment-01 --page "homepage / peak: the environment, fragmented" \
  --approved "Joe, 2026-09-02, <your words>" --cap <your number>
```

`--dry-run` prints the exact request first. The script refuses without
`--approved` and `--cap`, checks the listed price against the cap and the
balance, makes one `createTask`, records the task id before polling, never
retries, reads the balance after, refuses to save a non-image download, and
prints the task id and URL for a free re-fetch (`kie.mjs fetch`) if the
download host is blocked.

## What the skills mean for the rest of the plan

- **Asset families** (`scrollcraft/ASSET-PLAN.md` §9): F-02 and F-03 by Nano
  Banana 2 with the JSON method and reference chaining; F-07 and F-08 the
  same later; explainer diagrams for blog, social and proposals by
  `excalidraw-visuals`; nothing by video models.
- **Version 4 homepage**: the `video-to-website` architecture with the DE
  brand lock, built at `scrollcraft/builds/de-v4/` and served at
  `/version-4` (noindex) for review before anything touches `/`. Spine: the
  F-02 set plus code-drawn connections; hero: the real dusk plate until the
  photo shoot; every section's depth behind a click-to-expand with its
  diagram inside; stats count up from `cyberAwarenessFacts`; the CTA
  persists. GSAP and Lenis are vendored into the build, not loaded from a CDN.
  No spend; starts on Joe's go-ahead.
- **One spend gate**: paid runs in this repository go through `kie.mjs`
  (`still`, `nb2`); the vendored Python and Node scripts keep working for
  local use under the same rules, and the Excalidraw script still needs the
  proxy fix PR #185 left open.

## What is deliberately not in this proposal

- No video. The F-02 motion plate is done in code.
- No F-03 macros, no phone-format alternates, no Excalidraw explainers yet.
  Each is its own approval with its own cap.
- No page changes and no publishing.
