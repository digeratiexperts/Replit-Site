# DE Desk tokens and structure

Rejected shots (do not restore): `design/approved/desk-ask-de-target.png`, `desk-get-support-target.png` — cream-in-purple.

## Brand tokens

Outer chrome is graphite DE app. Client Tools’ **list only** is a white grouped surface.

| Token | Value | Use |
|-------|-------|-----|
| Shell | `--de-surface` `#0a0a0a` | One outer frame |
| Shell border | `--de-hairline` `rgba(255,255,255,0.10)` | Single hairline — no lavender glow |
| Raised | `--de-raised` `#151217` | Inputs, assistant bubbles, tool icon wells on dark |
| Magenta | `#D3126A` | Active underline, send, submit, featured rail, Fastest badge, security action, 1px shell cap |
| Violet | `#8B5CF6` | Do not fill chrome, badges, or wells. Lighting only if used at all. |
| Ask DE / ticket field | graphite | Light-on-dark transcript and dark raised form fields |
| Tools list | `#fff` on paper-ink | Grouped launcher rows inside the graphite shell |
| Tools ink | `#17141F` / `#5C5668` | Titles and blurbs on the white list |
| Available | Emerald pip | Say “available”, not “online” |

Do **not** paint the whole widget paper. Do **not** nest a cream card in a purple glow.

## Shared chrome (top → bottom)

1. **One `.de-desk-shell`** — `role="dialog"` `aria-label="DE Desk help"` `data-testid="desk-modal"`. `data-tab` is `chat` \| `ticket` \| `resources`.
2. **Header** — compact DE mark + green available pip; title “DE Desk”; subtitle “DE Desk is available” (or “{name} joined · live handoff”). Expand + close. On `sm+` the header moves the window; double-click resets. Drag any edge or the south-east grip to resize.
3. **Tabs** — Ask DE \| Get Support \| Client Tools. Active = light label + magenta underline. Unread count badges Ask DE only.
4. **Body** — same graphite field on every tab. No status row. No footer tab list.
5. **Composer (Ask DE only)** — raised dark input + magenta send. Placeholder: “Type the issue — we're ready now”.
6. **Lock line (Ask DE only)** — “Never share passwords, MFA codes, or private keys.”

## Ask DE

- Dark transcript. Opening: “DE” avatar + “DE Desk” + green **Available**.
- Greeting: “DE Desk is here. Describe the outage, the risk, or the question — we'll take it and give you a clear next step.”
- Discovery chips (IT help, cybersecurity, compliance, evaluating managed IT) plus **Possible security incident** (routes to Get Support).
- After send: magenta user bubbles; raised assistant bubbles.

## Get Support

- Lead: “Get support” / “Tell us what happened. We'll route it to the desk.”
- Featured **Possible security incident** rail, then a vertical list from `DESK_STANDARD_TICKET_CHIPS`, then Name, Work email, What's happening?, Details, Urgency. Default **Medium**.
- Dark raised inputs, white type, magenta **Create ticket**.
- If the incident chip fired, show “Routed as a possible security incident.”
- Company, category, attachment behind **Add company, category, or a file**.

## Client Tools

Unauthenticated (default on the marketing site):

1. “Already a Digerati Experts client?”
2. Magenta **Sign in to Client Tools** → `PORTAL_LOGIN`
3. “Need help right now?” → Submit a support request (Get Support tab) and Start remote support (`REMOTE_SUPPORT_HREF`)

Authenticated (real `/api/portal/me` session only):

- Support: Create ticket, View my tickets, Start remote support
- Secure services: Secure file exchange, Account & password help
- Account: Open client portal, Documents & agreements

Do **not** invent service status, devices, software libraries, or vendor product names. Do **not** put Cyber Risk Assessment, More tools, composer, or a repeated footer on this tab.

## a11y

- Visible `:focus-visible` (magenta ring).
- Interactive controls ~44px where practical.
- `prefers-reduced-motion` on pulse, heads-up, and tool-row motion.
- Ticket submit is fail-closed: treat `!response.ok` or missing `zohoTicketId` as failure.

## Primary file

`client/src/components/ZohoASAPWidget.tsx`
