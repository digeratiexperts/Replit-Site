# DE Desk tokens and structure

## Brand tokens

| Token | Value | Use |
|-------|-------|-----|
| Magenta | `#D3126A` | Avatar, active underline, send, CTAs, user bubbles |
| Violet | `#8B5CF6` | Icon-well accent only — never a wash fill |
| Shell | `#FFFFFF` / `#F6F5FA` | Header, tabs, status, body |
| Shell text | `#17141F` / `#68637A` | Titles and labels on light chrome |
| Dark box | `#1A1820` / `#0F0E14` | Hero, rows, inputs, footer |
| Composer | `#131218` | Shared ask bar above the footer |
| Online | Emerald pip | Availability |

## Shared chrome (top → bottom)

1. **Header** — magenta DE mark + green pip; title “DE Desk”; subtitle “Answers · Tickets · Assist”; close
2. **Tabs** — Desk | Ticket | Resources; active = dark label + magenta underline
3. **Status row** — green/sky/amber dot + “DE Desk is online” | “Need help now?”
4. **Content** — light body; dark hero + dark rows / dark inputs
5. **Composer** — dark ask bar + send
6. **Footer** — “DE Desk · Ticket · Resources · Assist” | Create ticket

## Resources

- Hero: “Get where you need to go”
- Rows: colored icon well + title + description + external + chevron
- Assessment highlight + security alert with Create ticket
- Labels are **functions** (Remote session, Remote support guide, Knowledge base, Client portal)

## Desk

- Dark hero “Talk to DE Desk” + dark prompt rows
- After send: magenta user bubbles, dark assistant bubbles
- Shared dark composer under all tabs

## Ticket

- Dark hero “Create a support ticket”
- Dark subject rows (4)
- Form on the light body: Secure & private pill; dark icon-prefixed fields; magenta→violet submit

## Primary file

`client/src/components/ZohoASAPWidget.tsx`
