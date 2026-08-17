# DE Desk tokens and structure

## Brand tokens

One paper sheet. Magenta pops because the field stays cream.

| Token | Value | Use |
|-------|-------|-----|
| Magenta | `#D3126A` | Avatar, active underline, send, CTAs, user bubbles, incident rail, Urgent badge |
| Violet | `#8B5CF6` | Icon-well accent only — never a wash fill or CTA gradient |
| Field | paper `#F7F5F2` | Entire chrome: header, body, composer, footer |
| Raised | `#FFFFFF` | Hero, rows, form card, composer input |
| Hairline | `rgba(20,16,30,0.10)` | Paper borders |
| Ink | `#17141F` / `#5C5668` | Titles and body on every tab |
| Available | Emerald pip | Availability — say “available”, not “online” |

Do **not** use charcoal hero/rows, black footer, plum washes, or magenta→violet CTA gradients.

## Shared chrome (top → bottom)

1. **Header** — magenta DE mark + green pip; title “DE Desk”; subtitle “Ask · Support · Tools”; Expand (desktop) + close. On `sm+` the header moves the window; double-click resets size and position. Drag any edge or the south-east grip to resize. Expand grows toward the page from a bottom-right dock.
2. **Tabs** — Ask DE | Get Support | Client Tools; active = dark label + magenta underline
3. **Status row** — paper field; green/sky/amber dot + “DE Desk available” | “Open a support ticket” / on Get Support: “Ask DE instead”. When a person joins: “{name} joined the conversation”.
4. **Content** — paper body; white raised hero + white raised rows / light inputs
5. **Composer** — paper ask bar + white input + solid magenta send
6. **Footer** — paper; “Ask DE · Get Support · Client Tools · Assist” (Assist → remote session) | Open a support ticket

## Ask DE

- Paper hero “How can we help?”
- Intent prompts (all four visible): Something isn't working · Possible security incident · Help me choose IT/security services · I have an IT or security question
- Security prompt switches to Get Support and applies the incident chip
- After send: magenta user bubbles, paper assistant bubbles labeled “Ask DE”
- Shared paper composer under all tabs

## Get Support

- Paper hero “Get technical support” / “Tell us what's happening and we'll route it to the right place.”
- Featured full-width **Possible security incident** (Urgent badge, magenta left rail, phishing/malware blurb)
- Then 2×2: Email or Microsoft 365 · Can't sign in / MFA · Computer or device · Something else
- Clicking a chip selects it, fills subject/category/priority, seeds a prompt, and moves focus into the form
- Taxonomy under the form stays: Email, Access & Security, Network & VPN, Software & Applications, Hardware & Devices, Backup & Recovery, Collaboration, Other
- Form on paper: Secure & private pill; light fields; solid magenta submit

## Client Tools

- Hero: “Client tools”
- Major rows: Client portal · Start remote support · Knowledge base · System status
- Remote support guide is a small sibling link under Start remote support
- Assessment highlight + security alert with Create ticket stay
- Do not add Pay Invoice / Billing here

## Primary file

`client/src/components/ZohoASAPWidget.tsx`
