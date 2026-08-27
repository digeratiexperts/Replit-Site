# Motion language

Motion for Visual System v2. Parent: `VISUAL_SYSTEM_V2.md`. Policy: `.cursorrules` §13. Tokens: `DESIGN_SYSTEM.md` (buttons `duration-200 ease-out`, accordion `0.2s ease-out`). Implementation already respects `prefers-reduced-motion` in `client/src/index.css`.

Purpose: motion communicates **state, hierarchy, continuity, and feedback** — not spectacle. DE needs more interactivity without more visual noise.

---

## What motion is for

| Purpose | Example | Allowed |
|---------|---------|---------|
| **State** | Coverage ring selection, StatusToken change, drawer open | Yes — short, local |
| **Hierarchy** | Hover lift on a primary card, not on every chip | Subtle |
| **Continuity** | Shared-element or cross-fade between command-deck views | After VIS-009; keep short |
| **Feedback** | Button `active:scale-[0.98]`, form success / error | Yes |

Not for: proving the site is “cyber,” looping grids, scanlines, particle fields, fake packet flows, blinking LIVE on EXAMPLE content.

---

## Reduced motion

Respect `prefers-reduced-motion`.

When reduce is on:

- no transform loops
- no auto-playing incident timelines
- no hero ken-burns
- snap or fade in one frame if a view must change
- HUD ticks stay static (they should be static by default anyway)

Do not ship a feature whose only explanation is an animation.

---

## Layers and motion

| Layer | Motion |
|-------|--------|
| 0 Foundation | Existing button / accordion / focus — do not reinvent |
| 1 Atmosphere | Grain and plates are still. No drifting fog |
| 2 HUD | No animation by default |
| 3 Metadata | StatusToken may change color; do not pulse EXAMPLE |
| 4 Evidence | Frame does not breathe. Interactive variant may cross-fade slots |
| 5 Command surfaces | View switching, timeline scrub — user-initiated preferred |
| 6 Proof | Review carousel already exists; do not add HUD motion on faces |
| 7 Publishing | Negligible; Journal read-aloud is functional, not brand motion |

---

## Timing and easing

Reuse existing project tokens. Do not invent `350ms` springs per page.

- Interactive chrome: `duration-200 ease-out` (already on buttons)
- Do not add a new animation library (`.cursorrules` §25)
- Framer Motion is already in the tree for some sections; do not expand it for HUD

---

## Interactivity without noise (Layer 5)

Capability switchers, coverage maps, incident timelines, comparison views:

- Change **content and selection state**, not the entire page theme
- Selection uses magenta border / fill per dark-field-accent-pop — not a glow bloom
- IncidentFlow playback is EXAMPLE and labeled; autoplay off when reduced-motion
- Never animate numbers up to an invented SLA

`ProActiveCoverageMap` already lights rings from real tier data. Future decks should feel like that: mapped to truth, not to a movie.

---

## Do

- Prefer CSS transitions already in the system
- Keep focus rings visible; do not animate them away
- Test motion at 390 / 768 / 1440 (no jank, no overflow from transforms)

## Do not

- Loop neon
- Animate every IconWell
- Use motion to hide missing evidence
- Add independent “tactical” hover grids on unowned pages

---

## Related

- `client/src/lib/animations.ts` (existing reveal helpers)
- HUD: `HUD_CHROME.md`
- Command deck: VIS-009 in `docs/SITE-VISUAL-TASKS.md`
