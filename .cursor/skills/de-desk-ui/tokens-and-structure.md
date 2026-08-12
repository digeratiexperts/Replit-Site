# DE Desk tokens and structure

## Brand tokens

| Token | Value | Use |
|-------|-------|-----|
| Magenta | `#D3126A` | Primary CTA, active underline glow, user bubbles, brand mark |
| Violet | `#5B45E0` / `#7c3aed` | Secondary accents, ticket submit gradient start |
| Shell bg | `#0b0c10` | Modal background |
| Nested dark | `#12141c` / `#171922` | Ticket & Resources panels / cards |
| Nested light | `#ffffff` / `#faf8fc` | Desk chat panel |
| Online | Emerald glow on status dot | Availability |
| Text light-on-dark | `white` / `white/65` / `white/45` | Hierarchy on dark |
| Text dark-on-light | `#1a1228` / `#5A3A5E` / plum secondary | Desk chat body |

Shell border/glow: subtle `border-[#D3126A]/20` + soft magenta/violet outer shadow.

## Shared chrome (top → bottom)

1. **Header** — gradient DE mark + green online pip; title “DE Desk”; subtitle “Answers · Tickets · Assist”; status pill + close
2. **Tabs** — Desk | Ticket | Resources; active = `#F0B4CC` + magenta underline glow
3. **Status row** — green/sky/amber dot + “DE Desk is online” | “Need a human? →”
4. **Content** — nested rounded panel (`rounded-[1.2rem]`, `border-white/10`)
5. **Footer** — “DE Desk · Ticket · Resources · Assist” | Create ticket

## Resources (approved)

- Hero: “Your AI help desk” / “Get clear answers, fast.” + benefit row
- Rows: colored icon well + title + description + capability tags + CTA arrow
- Security CTA card with Create ticket
- Labels are **functions** (Remote session, Remote support guide, Knowledge base, Client portal)

## Desk

- Light nested card fills content area
- Assistant bubble: light surface, DE badge magenta
- User bubble: magenta
- Quick chips: icon well + label + chevron (2×2)
- Composer: light field + magenta send; lock disclaimer under input

## Ticket

- Dark nested panel matching Resources card language
- Hero “How can we help?”
- Quick subject chips (4)
- Form card: Secure & Private badge; icon-prefixed fields; violet→magenta submit
- Optional bottom ask bar that routes to Desk chat

## Primary file

`client/src/components/ZohoASAPWidget.tsx`
