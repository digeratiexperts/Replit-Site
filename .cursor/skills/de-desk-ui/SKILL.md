---
name: de-desk-ui
description: >-
  Designs and restyles the DE Desk support widget (Ask DE / Get Support /
  Client Tools) as one paper theme. Use when editing ZohoASAPWidget, DE Desk,
  Ask DE, ASAP widget, support modal tabs, desk client-tools copy, or when DE
  attaches DE Desk mockups / asks for Desk UI polish.
---

# DE Desk UI

## Before you edit

1. Read this skill, then [tokens-and-structure.md](tokens-and-structure.md).
2. Screenshot live site with Browser after changes.
3. Prefer **Gemini 3.1 Pro** or **Composer 2.5** for visual passes when available.

## Non-negotiables

- **One paper theme** for the whole widget: header, tabs, hero, rows, inputs, composer, and footer. No charcoal hero. No black footer. No white/black stripe.
- **Ask DE / Get Support / Client Tools** share that language. Do not put a second nested theme per tab.
- Magenta `#D3126A` is the only loud color (avatar, active tab, send, submit, user bubbles, incident rail).
- **Function labels**, not vendor names (`Start remote support` not `Zoho Assist`). Keep hrefs.
- Do **not** remove tabs, CTAs, disclaimers, or tool rows without asking DE.
- Do **not** invent `//login`; use `PORTAL_LOGIN`.
- Do **not** add Pay Invoice / Billing as a Desk choice. Billing lives in Client Portal.
- Preserve advisor chat, poll, agent live, ticket API, analytics, ASAP bootstrap.
- Composer is one shared Ask DE thread on all three tabs. Do not force a tab switch on send. Incoming replies on Get Support / Client Tools use the heads-up toast + Ask DE badge.

## Architecture

The modal is **Ask → Support → Tools**, not a miniature site nav.

| Tab (label) | Internal id | Purpose |
|-------------|-------------|---------|
| **Ask DE** | `chat` | Visitors and clients who do not yet know what they need |
| **Get Support** | `ticket` | Technical support + security incident routing |
| **Client Tools** | `resources` | Portal, remote support, knowledge base, system status |

**Possible security incident** is visually dominant on Get Support (featured Urgent card + magenta left rail). From Ask DE it switches to Get Support and applies that chip — it does not stay a chat prompt.

## Workflow

```
DE Desk UI checklist:
- [ ] One paper field for the whole chrome
- [ ] White raised cards for hero, rows, and form
- [ ] Paper composer + footer (not charcoal)
- [ ] Copy is function-based and intent-based
- [ ] Security incident is unmistakable
- [ ] Contrast checked (dark ink on paper)
- [ ] Browser screenshot
- [ ] Logic untouched unless requested
```

### Restyle pass

1. Change layout/classes in `client/src/components/ZohoASAPWidget.tsx` only as needed.
2. Keep `RESOURCE_LINKS` titles functional; tags describe capability.
3. Remote support guide is a **sublink** under Start remote support, not a fourth major card.

## Anti-patterns

- Dual-tone stripe (light header + charcoal cards + black footer)
- Dark boxes on a light body
- Muddy mid-gradient chat backgrounds
- Product/vendor branding in client-facing tool titles
- Purple-on-cream / generic AI SaaS aesthetics unrelated to DE magenta brand
- Saying “online” when only AI is available
- Vague “Need help now?” as the status CTA
- Billing / Pay Invoice as a prominent Desk choice
