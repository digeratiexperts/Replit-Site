---
name: de-desk-ui
description: >-
  Designs and restyles the DE Desk support widget (Desk / Ticket / Resources)
  as one paper theme. Use when editing ZohoASAPWidget, DE Desk, Ask DE, ASAP
  widget, support modal tabs, desk resources copy, or when DE attaches DE Desk
  mockups / asks for Desk UI polish.
---

# DE Desk UI

## Before you edit

1. Read this skill, then [tokens-and-structure.md](tokens-and-structure.md).
2. Screenshot live site with Browser after changes.
3. Prefer **Gemini 3.1 Pro** or **Composer 2.5** for visual passes when available.

## Non-negotiables

- **One paper theme** for the whole widget: header, tabs, hero, rows, inputs, composer, and footer. No charcoal hero. No black footer. No white/black stripe.
- **Desk / Ticket / Resources** share that language. Do not put a second nested theme per tab.
- Magenta `#D3126A` is the only loud color (avatar, active tab, send, submit, user bubbles).
- **Function labels**, not vendor names (`Remote session` not `Zoho Assist`). Keep hrefs.
- Do **not** remove tabs, CTAs, disclaimers, or resource rows without asking DE.
- Do **not** invent `//login`; use `PORTAL_LOGIN`.
- Preserve advisor chat, poll, agent live, ticket API, analytics, ASAP bootstrap.
- Composer is one shared Desk thread on all three tabs. Do not force a tab switch on send. Incoming replies on Ticket/Resources use the heads-up toast + Desk badge.

## Workflow

```
DE Desk UI checklist:
- [ ] One paper field for the whole chrome
- [ ] White raised cards for hero, rows, and form
- [ ] Paper composer + footer (not charcoal)
- [ ] Copy is function-based
- [ ] Contrast checked (dark ink on paper)
- [ ] Browser screenshot
- [ ] Logic untouched unless requested
```

### Restyle pass

1. Change layout/classes in `client/src/components/ZohoASAPWidget.tsx` only as needed.
2. Keep `RESOURCE_LINKS` titles functional; tags describe capability.

## Anti-patterns

- Dual-tone stripe (light header + charcoal cards + black footer)
- Dark boxes on a light body
- Muddy mid-gradient chat backgrounds
- Product/vendor branding in client-facing resource titles
- Purple-on-cream / generic AI SaaS aesthetics unrelated to DE magenta brand
