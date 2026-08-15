# DE Desk tokens and structure

## Brand tokens

Map dark surfaces to the site ladder. Magenta pops because the field stays charcoal.

| Token | Value | Use |
|-------|-------|-----|
| Magenta | `#D3126A` | Avatar, active underline, send, CTAs, user bubbles |
| Violet | `#8B5CF6` | Icon-well accent only — never a wash fill or CTA gradient |
| Shell | `#FFFFFF` / paper `#F7F5F2` | Header, tabs, status, body |
| Shell text | `#17141F` / `#5C5668` | Titles and labels on light chrome |
| Raised | `#151217` | Hero, rows, composer |
| Well | `#050312` | Inputs, footer, icon wells |
| Hairline | `rgba(255,255,255,0.10)` | Dark borders |
| Dark ink | `#fff` / 78% / 55% | Type on dark surfaces |
| Online | Emerald pip | Availability |

Do **not** use plum washes (`#2e1d2a`), composer `#131218`, or magenta→violet CTA gradients.

## Shared chrome (top → bottom)

1. **Header** — magenta DE mark + green pip; title “DE Desk”; subtitle “Answers · Tickets · Assist”; close
2. **Tabs** — Desk | Ticket | Resources; active = dark label + magenta underline
3. **Status row** — paper field; green/sky/amber dot + “DE Desk is online” | “Need help now?”
4. **Content** — light body; charcoal hero + charcoal rows / well inputs
5. **Composer** — raised `#151217` ask bar + solid magenta send
6. **Footer** — well `#050312`; “DE Desk · Ticket · Resources · Assist” (Assist → remote session) | Create ticket

## Resources

- Hero: “Get where you need to go”
- Rows: colored icon well + title + description + external + chevron
- Assessment highlight + security alert with Create ticket
- Labels are **functions** (Remote session, Remote support guide, Knowledge base, Client portal)

## Desk

- Charcoal hero “Talk to DE Desk” + charcoal prompt rows (all four visible)
- After send: magenta user bubbles, dark assistant bubbles
- Shared raised composer under all tabs

## Ticket

- Charcoal hero “Create a support ticket”
- Subject chips in a 2×2 grid so the form starts in view
- Form on the light body: Secure & private pill; well fields; solid magenta submit

## Primary file

`client/src/components/ZohoASAPWidget.tsx`
