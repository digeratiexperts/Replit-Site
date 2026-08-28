# UX principles

Visual System v2 layers (evidence, HUD, diagrams) sit on this file — they do not replace it. See `VISUAL_SYSTEM_V2.md`.

Act as a senior product designer, UX designer, visual designer, and frontend engineer.

Do not optimize only for code correctness. Optimize for the final rendered experience.

A page can have technically correct code and still be considered a failure if the visual result feels generic, amateur, cluttered, inconsistent, or poorly composed.

## Design first

Before making meaningful UI changes:

1. Inspect the existing page.
2. Inspect related components.
3. Understand the current design system.
4. Identify existing reusable patterns.
5. Consider desktop, tablet, and mobile.
6. Consider hierarchy, spacing, typography, imagery, interaction, and visual rhythm.
7. Then implement.

Do not make isolated changes that create inconsistency elsewhere.

Never judge UI from source code alone. Code → render → screenshot → critique → iterate.

Inspect 390 / 768 / 1440 at minimum.

## Visual quality

Prioritize: clear hierarchy, sophisticated typography, intentional whitespace, strong composition, restrained color, consistent spacing, subtle borders, controlled contrast, meaningful imagery, purposeful interaction, consistent visual language.

Avoid generic AI/SaaS aesthetics: excessive gradients, glow, glassmorphism everywhere, random rounded cards, giant floating blobs, cyberpunk, meaningless particles, excessive animations, generic 3D, stock-looking imagery, arbitrary shadows, decoration without purpose.

## Component consistency

If multiple components perform the same visual/function role: reuse, extend, or create a shared component. Do not create several slightly different implementations of the same UI pattern. Before introducing a new value, check whether an existing design token already exists.

## UX states

Do not design only the happy path. Consider default, hover, focus, active, disabled, loading, empty, error, success. Interactive elements must communicate their state clearly.

Honest empty states over fabricated content (`.cursorrules` §36).

## Accessibility

Maintain sufficient contrast, visible focus states, keyboard accessibility, semantic HTML, accessible labels, usable touch targets (~44×44px), reduced-motion support. Never sacrifice accessibility for aesthetics. Target WCAG 2.2 AA (`.cursorrules` §12).

## Responsiveness

Never simply shrink desktop layouts. Consider whether components should stack, reorder, resize, simplify, change alignment, change navigation behavior, alter imagery, or change interaction patterns for smaller screens.

## Content preservation

Preserve existing DE content, CTAs, nav, and stats unless DE explicitly approves removal. Prefer elevate → consolidate → relocate → reuse.

Canonical portal login: `https://portal.digeratiexperts.com/portal/login` — never invent `//login`.

## Visual QA

For meaningful UI work: run the application, inspect the rendered page, capture at relevant viewports, look for visual problems, fix them, re-inspect. Never assume the UI is correct because the code compiles.

## Definition of done

A UI task is not complete merely because the code compiles, the component renders, or the requested element exists.

It is complete when the rendered experience is visually coherent, responsive, accessible, and consistent with the site's design system.

Use `.cursor/skills/visual-audit/SKILL.md` before implementing UI changes.
