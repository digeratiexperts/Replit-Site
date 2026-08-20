---
name: de-desk-ui
description: >-
  Designs and restyles the DE Desk support widget (Ask DE / Get Support /
  Client Tools) as one graphite application surface that matches the website —
  not a paper theme, not a cream card in a purple shell. Use when editing
  ZohoASAPWidget, DE Desk, Ask DE, ASAP widget, support modal tabs, or Desk UI.
---

# DE Desk UI

DE Desk is a **premium DE application surface** integrated into the website. It uses the same graphite/charcoal field, white type, and magenta actions as the rest of digeratiexperts.com.

Primary file: `client/src/components/ZohoASAPWidget.tsx`

Rejected (do **not** restore):

- Paper / cream whole-widget theme
- Cream Ask DE well floating in a purple/magenta gradient shell
- Giant purple glow, lavender border bloom, nested rounded cards, double chrome
- Screenshots named `desk-*-target.png` that show that cream-in-purple look

## Before you edit

1. Read this skill, then [tokens-and-structure.md](tokens-and-structure.md).
2. Restyle from DE tokens (`--de-surface`, `--de-raised`, `--de-hairline`, `#D3126A`) — not from rejected PNGs.
3. Screenshot after changes at 390 / 768 / 1440.
4. Count Desk dialogs: exactly **one** `.de-desk-shell` / `role="dialog"` labeled “DE Desk help”.

## Non-negotiables

- **One shell.** Near-black/graphite field, hairline border, restrained shadow. No second modal, hero card, or inset “window.”
- **One field for every tab.** Light-on-dark throughout. Do not paint Ask DE cream and the other tabs black.
- Magenta `#D3126A` is the only loud color: active tab underline, send, submit, selected issue, user bubbles. Violet is **subtle header illumination only**.
- **Ask DE** is a conversational UI (conversation first, composer dominant, two quiet suggestion chips).
- **Get Support** is a service-desk form: issue choices, then dark raised fields, magenta submit.
- **Client Tools** is a compact launcher: Portal (featured), Remote Support + Fastest + guide, Help Center, Service Status, then a small security escape. No assessment, no More tools, no composer on this tab.
- **Function labels**, not vendor names (`Start remote support` not `Zoho Assist`). Keep hrefs.
- Do **not** remove the three tabs, ticket-chip routing, unread/heads-up, drag/resize/expand, or the lock disclaimer without asking DE.
- Canonical portal login: `https://portal.digeratiexperts.com/portal/login` via `PORTAL_LOGIN`. Never invent `//login`.
- Do **not** add Pay Invoice / Billing as a Desk choice. Billing lives in Client Portal.
- Preserve advisor chat, poll, agent live, ticket API (fail-closed / real Desk result / visitor name), analytics, ASAP bootstrap.

## Architecture

The modal is **Ask → Support → Tools**, not a miniature site nav.

| Tab (label) | Internal id | Purpose |
|-------------|-------------|---------|
| **Ask DE** | `chat` | One conversation. Visitors who do not yet know what they need |
| **Get Support** | `ticket` | Technical support + security incident routing into a short ticket form |
| **Client Tools** | `resources` | Existing-client launcher: portal, remote, help, status + security escape |

**Possible security incident** is one of the two Ask DE chips. Clicking it **switches to Get Support** and applies `applyDeskTicketChip("security-incident")` (subject, category, priority Urgent, seeded details). It is not a chat prompt.

Composer lives on **Ask DE only**. Incoming replies on Get Support / Client Tools use the heads-up toast + Ask DE unread badge. Do not restack a second chat bar on those tabs.

## Workflow

```
DE Desk UI checklist:
- [ ] Exactly one .de-desk-shell (no double chrome)
- [ ] Graphite shell + simple header + circular expand/close
- [ ] Three tabs; active = magenta underline
- [ ] Ask DE: dark transcript, quiet chips, dominant composer
- [ ] Get Support: issue choices + dark raised fields + magenta submit
- [ ] Client Tools: white grouped list + security escape; no composer/footer
- [ ] Contrast: white type on graphite; magenta only on actions
- [ ] Visible focus, ~44px controls, prefers-reduced-motion
- [ ] Browser screenshot at 390 / 768 / 1440
- [ ] Logic untouched unless requested
```

### Restyle pass

1. Change layout/classes in `ZohoASAPWidget.tsx` only as needed. Do not invent `DeskModalV2`.
2. Keep `RESOURCE_LINKS` as Portal / Remote Support / Help Center / Service Status. Featured Portal; Fastest on Remote Support.
3. Remote support guide stays a **sublink** under Start Remote Support. Security escape is the only extra action.

## Anti-patterns

- Whole-widget paper theme
- Cream card inside a purple/glowing frame
- Nested rounded cards or dual-tone stripes that look like two windows
- Status-row competing CTAs and a footer nav of the same three tabs
- Shared composer on Get Support / Client Tools
- Cream/off-white inputs on a black marketing well
- Purple-filled chrome, glassmorphism stack, neon
- Saying “online” when only AI is available — say **available**
- Billing / Pay Invoice as a prominent Desk choice
