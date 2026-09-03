# FLAGSHIP-PROTOTYPE-REPORT — Experience v1, Acts 1–3 and the first frame of Act 4 (Phase 5)

Built 2026-09-03 on Joe's "Build it": one persistent, code-built visual world
behind the passage's own typography, under the existing imagery rule, with
zero generated assets. Build: `scrollcraft/builds/experience-v1/`. Review:
the lab copy at `/scrollcraft/experience-v1/` once merged, and the single-file
artifact published from this session.

## What was built

- **The world** (`scene.js`, 28 KB): a small business at first light, drawn in
  code with three.js. A floor with a slight sheen, two rows of three desks
  with lit screens (a gradient interface texture, no logos), keyboards,
  phones, chairs, a meeting table with four chairs, a window wall with dawn
  light, a network closet with a switch, a ceiling access point, four people
  as luminous presence (shoulders and a head, no faces), three glass cloud
  slabs overhead, a vault beneath the floor, a horizon beyond the far wall.
  A procedural room environment gives every surface something to reflect.
  Every object's position, material, colour and connection is a pure function
  of one timeline value t ∈ [0, 4), so the four acts are states of one world.
- **The states.** `disorder` (1 → 0 during the correction) places every desk,
  slab and the access point off the grid by seeded offsets and stops every
  thread short of its target; the camera rolls 2° (1.4° in portrait). `reveal`
  turns the room to dark glass and draws relationships in the storyboard's
  order (identity → device → email → data → network → applications →
  customers), then dashed dependencies, vendor tags, partial boundary loops,
  and four amber exception markers (backup untested, unpatched, shared
  mailbox, guest network open). The correction closes the gaps, completes the
  boundaries, dissolves the exceptions, thins the dependencies, runs magenta
  light along the identity chains (DE entering) and completes a magenta
  perimeter: the boundary DE is responsible for. The heading readout goes
  348° → 360°.
- **The glue** (`experience.js`, 8 KB): the Scrollcraft engine pins four acts
  and cues the type; the glue maps scroll to one continuous timeline (inside a
  pin, p → [i, i+0.85]; the seam between stages → [i+0.85, i+1]) so the world
  keeps moving while one stage slides out and the next slides in. DOM labels
  are projected from 3D anchors every frame. A frame counter feeds this
  report.
- **Fallbacks.** Five stills rendered *from the world* by the build's own
  script (`tools/render-stills.mjs`, WebP, 13–56 KB each) carry the first
  paint, the no-WebGL path, low-power devices, and reduced motion (stepped by
  t, no interpolation; the copy reads in full).
- **Copy.** Every line is from the canonical spine or #186: "Everything is
  here." / "It all works. Just not as one." / "Identity. Devices. Email. Data.
  Network. Applications. Customers." / "Nobody is steering the whole thing." /
  "This environment isn't broken. It's been drifting." / "We do not promise
  outcomes before we understand the environment." / "You lead the business. We
  lead the technology." / "DE sees the whole environment."

## Rendering strategy and why

| Option | Verdict |
| --- | --- |
| DOM + CSS layers | Cannot do a real camera, real depth or light; would have been parallax plates, which is the failure being replaced. |
| SVG | Fine for the evidence layer; a 2.5D isometric world in SVG would read as an illustration, and the correction needs true rotation and lighting. |
| Canvas 2D | Possible but every lighting and depth cue is hand-built. |
| **WebGL via three.js, hybrid with DOM type** | Chosen. A real camera, lights, materials and depth; the DOM keeps the type crisp and accessible; the engine keeps scroll native. |
| React Three Fiber | Not needed: the build is a static Scrollcraft page, no React. |

## Measurements (this environment)

| Item | Value |
| --- | --- |
| First paint payload (HTML, CSS, engine, glue, fonts) | 14 + 20 + 56 + 8 + 85 KB raw; ≈ 32 KB gzip + 85 KB fonts |
| WebGL library (vendored, lazy after first paint) | three.module 366 KB + three.core 385 KB raw; 87 + 101 KB gzip |
| World code | scene.js 28 KB raw, 9 KB gzip; no textures except a 128×80 canvas gradient |
| Stills (fallback / poster) | 13, 50, 49, 56, 52 KB WebP |
| Page load → world live (headless, local server, software GL) | 1440×900: 2.7 s · 768×1024: 0.8 s · 390×844: 1.0 s · 2560×1440: 5.2 s |
| Frame cost (update + render, SwiftShader software GL) | 5–13 ms per frame across the four viewports |
| Horizontal overflow | 0 px at all four viewports |
| Console errors | none (one deprecation warning fixed) |
| Reduced motion | stills path at 1440 and 390: poster index follows t (0, 1, 2, 3, 4), no canvas, no errors |
| Single-file artifact | 1.08 MB (bundled scene + three.js 580 KB, fonts and stills inline); renders live, fonts load, no failed requests |

**Frame-time caveat.** SwiftShader is a software rasterizer; the headless
numbers are an upper bound on CPU cost and say nothing about a real GPU. On a
laptop GPU this scene (about 120 draw calls, ~20 k triangles, one shadow map on
desktop, no post-processing) is comfortably a 60 fps scene; on a mid phone the
pixel ratio is capped at 1.25 and shadows are off. **Real hardware has not
been measured.** That, and a real phone's touch scrolling, are the two manual
gates.

## Mobile behaviour

Portrait framing is its own composition: the camera sits further back and
higher so the floor fits, the look-at rises so the copy owns the lower third,
the tilt is 1.4°, three labels and two exceptions are hidden, the primary
control reads "Start here". Verified at 390×844 and 768×1024 by emulation.

## Compromises and risks

1. **Craft is geometry-level, not surface-level.** Desks, chairs and screens
   are boxes with good materials and light. They read as a place at the
   elevated views (Acts 2–4) and as furniture at the eye-level opening. The
   opening is the least premium frame; it needs a better foreground (a
   plant, a bag, a coat: presence without people) and softer shadows.
2. **The seam mapping** keeps the world moving between pinned stages, but the
   type still changes by stage. The type is the only thing that "cuts".
3. **Labels** are DOM projected from 3D; at some scroll positions a label
   sits under the copy. They are hidden when they would leave the frame,
   not when they collide with type.
4. **No real-device measurement** (frame rate, thermal, iOS toolbar).
5. **The library is 190 KB gzip after first paint.** Acceptable for a
   flagship; not for every page.
6. **Static-site only.** This is a Scrollcraft build, not a React route;
   mounting it on `/` is Phase 7 work and a different engineering job.

## Quality Gate A

Joe's primary question: *does it feel like I entered one world, and my
scrolling caused that same world to reveal complexity, expose that it was
off-course, correct itself, and begin becoming an intelligible managed
system? If it feels like sections, slides, diagrams or successive
compositions, even attractive ones, it fails.*

**Honest answer: yes on the mechanism, with one weak act.** The same desks,
slabs, people and threads are on screen from the first frame to the last;
the reveal draws relationships onto objects the visitor already saw; the
drift is the same objects off the grid; the correction moves those objects,
nothing is swapped; DE arrives as light on existing threads. Nothing in the
sequence is a card, a plate, or a diagram introduced for a beat. The weak
act is the opening: at eye level the world is furniture in a dark room and
the "disconnected" state reads mostly through the copy and a few stopped
threads; the sense of wrongness only becomes visceral once the camera rises.

The seven questions:

| Question | Answer |
| --- | --- |
| Materially different from a modern SaaS template? | Yes. A lit place with a camera, not a grid. |
| Communicates DE without paragraphs? | Acts 2–4 yes: the reveal, the drift, the correction and the magenta boundary carry it. Act 1 leans on its two lines. |
| Is the motion teaching something? | Yes: every move is a state change of an existing object with a meaning (revealed, off, corrected, held). |
| Depth in the composition? | Yes: real perspective, foreground figures, slabs above, vault below, horizon beyond. |
| Premium? | Partly. Materials and light yes; the furniture geometry is simple and the opening frame is not yet rich enough. |
| Original? | Yes for the category. |
| Old design obviously inferior beside it? | Yes for Acts 2–4 beside any diagram section; the opening frame does not yet win on its own. |

Two partials out of seven, both in Act 1's opening frame, both fixable inside
the same world without any new asset: a richer foreground, softer shadows, a
slower first dolly, and a visible "almost meets" moment (two threads reaching
and stopping) in the first viewport. Recommendation: **fix the opening frame
before expanding**, then extend to Acts 4–10 as further states of this world.

## What this proves and what it does not

Proved: one code-built world can carry the storyboard's grammar (states, not
scenes) in real time on a static page with native scroll, with stills as an
honest fallback and zero generated material. Not proved: real-device
performance; the opening frame's premium quality; the later acts (the eight
blocks emerging, the capabilities, the route, the assessment door) which are
designed but not built.

## Stop conditions checked

None hit. Scrollcraft achieves the effect cleanly; the concept is not
expensive (no post-processing, no textures); the asset plan is defined (all
code); the build did not regress into template sections; no kie.ai use was
proposed; performance did not collapse in the software renderer; and the
improvement over the current direction is real for Acts 2–4.

Money gate closed, PR #184 draft, Version 4 parked, 14 domains unresolved,
`HTTPS_PROXY` parked: all unchanged.
