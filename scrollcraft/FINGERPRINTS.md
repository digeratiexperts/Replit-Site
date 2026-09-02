# Fingerprints

Every site you build with **scrollcraft** gets one row here, appended after it
ships. The registry exists so your next build can prove it is a different page
rather than a re-skin of one you already made.

This file is **yours**. It starts empty on purpose: the gate is about not
repeating *yourself*, so it has nothing to say until you have built something.

The rules and the gate live in the skill's
`references/uniqueness.md`. Short version:

**A new build must differ from EVERY row below on at least 4 of the 6
dimensions.** Four against each row individually, not four on average across the
table. If a planned build fails, change the plan. Never edit a row to make room
for it.

The six dimensions are: **grammar**, **nav treatment**, **hero device**,
**act-sequence shape**, **close pattern**, **signature move**.

Dimension 6 is free, because a signature move is unique by definition. So the
gate really asks for three more out of the remaining five, and a build that
changes only grammar and world will fail it.

---

## The registry

| Build | Grammar | Nav treatment | Hero device | Act-sequence shape | Close pattern | Signature move | World | Port |
|---|---|---|---|---|---|---|---|---|
| de-v2 | Chaptered editorial | No bar; fixed machine-room rail: folio + live mini technology map (top ribbon under 1100px) | Title page: type on paper, kinetic lines, no media above the fold | 10 chapters ≈ 14.1vh: flow, flow+field/silence, pin 2.4 (peak: figure draws itself), flow+interactive, flow+in dossier, pan 1.6, flow+reveal, flow+reveal+tilt, flow+parallax, pin 1.15 (merged edition, same build evolved) | Colophon plate on paper; CTA as running text; completed map holds | The technology map as persistent margin instrument: scatters, snaps together at the peak, answers outcome choices, stands complete at the close | Technical drawing (ink on graphite + paper) with real documentary photography | 4500 |
| proactive-ecosystem-amplify | Chaptered editorial (amplification of an existing React page; site chrome retained) | Global site nav + fixed margin environment folio (2xl+), chapter number, title, live map, jump list | Existing title page (PageTemplate text hero, no media) into staggered pillar chapter | flow, pin(2.2), flow(reveal), flow(parallax), flow(stagger), flow(reveal LR), flow(hold); 7 chapters | Compare panel lands and holds inside the page's existing CTA section, folio map complete | Accumulating margin environment map: one domain node lit and linked per chapter passed, complete and clickable by the close | Coded technical drawing on the site's dark ground, no photography, no generation | /solutions/proactive-ecosystem |
| why-passage | Passage: one continuous plotted traverse, distinct chapters, transformative transitions | No folio and no map. A 1px course line down the left gutter whose run fills with scroll, plus a fixed bearing gauge reading 348 to 360 degrees and a stage name | Off-axis: the opening screen sits 1.2 degrees off true and stays crooked for two full acts. Type only, no media | 7 acts, spans 1.0 to 2.8vh, about 11.7vh total, zero scrub acts (no video anywhere) | Assessment as a universal entry door spanning above three pathways it flows into, then five published refusals in the same type size as the promises, then the mark holds | **The heading correction**: every stage is rotated off true from the first frame and the whole page rolls level, over 900ms, at the exact moment the operating principle lands | Coded technical chart on the DE dark ground. No photography, no generation, no kie.ai spend | scrollcraft/builds/why-passage |

---

## What is taken

Add a bullet here whenever a build claims something a later build should avoid
reusing: a grammar, a nav treatment, a close pattern, a signature move, an
act-count-and-length band. The shared columns are what the next build inherits
as a constraint, so writing them down is the whole point.

- Chaptered editorial grammar, the margin machine-room rail with a live figure, the title-page hero on paper, the accumulating-legend peak, the colophon close with a running-text CTA, and the 9-act ≈ 14vh band are taken by de-v2.
- Chaptered editorial as an amplification layer over an existing page is taken.
- **Collision on record:** de-v2 and proactive-ecosystem-amplify were built in
  parallel, neither seeing the other's row, and converged on chaptered
  editorial, a fixed margin folio carrying a live environment map, a
  type-only title-page hero, and an accumulating-map signature move. They
  differ on act shape, close pattern, and interactivity, but they share more
  than the gate allows between planned builds. The next build must clear BOTH
  rows on 4 of 6, which in practice rules out the folio-plus-live-map margin
  and the chaptered-editorial grammar together.
- The pinned scatter-to-assembly diagram peak is taken.
- The accumulating margin environment map (folio + trace) is taken.
- The hold-on-existing-CTA close is taken.
- The passage grammar, the course-line-plus-bearing-gauge instrument, the off-axis hero, the whole-page heading correction, and the published-refusals close are taken by why-passage.
- why-passage is also the first row with **no scrub act at all**. A later build that wants a video-free page has to differ from it elsewhere.

---

## Appending a row

After shipping, add one line to the table and one bullet to **What is taken** if
the build claimed something new. Fill every column. Say what the build shares
with existing rows.

Rows are append-only. A build that has been superseded stays in the table,
because the space it occupies is still occupied.

---

## Worked example

The skill's author kept a registry of twelve builds across eight page grammars.
If you want to see what a filled-in table looks like, and which shapes tend to
collide, read `EXAMPLES.md` in the scrollcraft repository. Treat it as
illustration only: those rows are somebody else's builds and they do **not**
constrain yours.
