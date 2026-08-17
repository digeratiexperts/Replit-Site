# DE Desk tokens and structure

## Brand tokens

One paper sheet. Magenta pops because the field stays cream.

| Token | Value | Use |
|-------|-------|-----|
| Magenta | `#D3126A` | Avatar, active underline, send, CTAs, user bubbles |
| Violet | `#8B5CF6` | Icon-well accent only — never a wash fill or CTA gradient |
| Field | paper `#F7F5F2` | Entire chrome: header, body, composer, footer |
| Raised | `#FFFFFF` | Hero, rows, form card, composer input |
| Hairline | `rgba(20,16,30,0.10)` | Paper borders |
| Ink | `#17141F` / `#5C5668` | Titles and body on every tab |
| Online | Emerald pip | Availability |

Do **not** use charcoal hero/rows, black footer, plum washes, or magenta→violet CTA gradients.

## Shared chrome (top → bottom)

1. **Header** — magenta DE mark + green pip; title “DE Desk”; subtitle “Answers · Tickets · Assist”; close
2. **Tabs** — Desk | Ticket | Resources; active = dark label + magenta underline
3. **Status row** — paper field; green/sky/amber dot + “DE Desk is online” | “Need help now?”
4. **Content** — paper body; white raised hero + white raised rows / light inputs
5. **Composer** — paper ask bar + white input + solid magenta send
6. **Footer** — paper; “DE Desk · Ticket · Resources · Assist” (Assist → remote session) | Create ticket

## Resources

- Hero: “Get where you need to go”
- Rows: colored icon well + title + description + external + chevron
- Assessment highlight + security alert with Create ticket
- Labels are **functions** (Remote session, Remote support guide, Knowledge base, Client portal)

## Desk

- Paper hero “Talk to DE Desk” + paper prompt rows (all four visible)
- After send: magenta user bubbles, paper assistant bubbles
- Shared paper composer under all tabs

## Ticket

- Paper hero “Create a support ticket”
- Subject chips in a 2×2 grid (Email or Microsoft 365, Can't sign in, Computer or printer, Possible security incident). Clicking one selects it, fills subject/category/priority, seeds a prompt, and moves focus into the form.
- Form on paper: Secure & private pill; light fields; solid magenta submit

## Primary file

`client/src/components/ZohoASAPWidget.tsx`
