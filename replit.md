# Digerati Experts - Complete MSP Client Portal + Marketing Website

## Overview
Digerati Experts is a comprehensive platform integrating a public marketing website and an enterprise client portal. It showcases cybersecurity solutions, 24/7 protection, and compliance assurance for small-to-medium Arizona businesses. The platform includes features like AI-assisted ticket routing, approval workflows, CSAT surveys, shipment tracking, and cross-service communication, aiming to drive business growth and market leadership in the MSP/MSSP sector. The project emphasizes security-first IT, continuity planning, client-owned access, and a credit-based helpdesk system, targeting SMBs needing enterprise-grade IT without overhead.

## User Preferences
- Complete feature coverage per requirements document
- Production-ready deployment
- Event-driven architecture for cross-service communication
- AI-powered intelligent features (classification, suggestions, auto-routing)
- Enterprise security and compliance
- All CTAs link to Zoho Bookings (https://meet.digerati-experts.com/)
- Corporate email validation (no public email providers)
- Domain: digeratiexperts.com (no hyphen)

## System Architecture

### UI/UX Decisions
The platform features a modern, responsive SaaS design system with consistent tokens, typography, and a unified purple color scheme, utilizing a two-tier navigation and a mobile-first approach. Typography uses Space Grotesk for headings, Inter for body text, and optionally Oxanium for numbers. The design incorporates a dark theme with glassmorphism elements, animated particles, and glow effects, ensuring accessibility with `prefers-reduced-motion` support.

### Color System (Consistent Pattern)
| Role | Color | Usage |
|------|-------|-------|
| **Primary Accent** | `violet-400/300` | CTAs, icons, links, headline gradients, highlights |
| **Primary Gradient** | `violet-300 → purple-300 → fuchsia-300` | Headlines on dark backgrounds |
| **Success** | `emerald-400` | Checkmarks, confirmation indicators only |
| **Text Primary** | `white` or `text-white` | Headlines, important content |
| **Text Secondary** | `white/70` | Body text, descriptions |
| **Text Tertiary** | `white/50` | Labels, captions, secondary info |
| **Text Muted** | `white/40` | Subtle hints, less important text |
| **Borders** | `white/10` or `white/[0.08]` | Cards, containers, separators |
| **Backgrounds** | `white/[0.04]` or `white/[0.02]` | Subtle card fills |
| **Button Text (on white)** | `violet-700` | CTA buttons with white background |

**Rules:**
- Never mix cyan/blue with purple in the same element
- All colored icons should use `violet-400` (except success checkmarks use `emerald-400`)
- Links use `violet-300` with hover `violet-200`
- Background glows/orbs use only purple tones (rgba(139, 92, 246, opacity))

### Technical Implementations
The frontend is built with React 18 and TypeScript, using Wouter for routing, shadcn/ui with Radix UI for components, Lucide React for icons, and Tailwind CSS for styling. The backend uses an Express.js server with TypeScript. Payment processing integrates Stripe Checkout, Zelle, and Zoho Payments, supported by `stripe-replit-sync` and a PostgreSQL schema. Content is dynamically generated or custom-authored for solutions and industry pages. SEO is comprehensive, including meta tags, Open Graph, and Twitter cards. Security features include HSTS, CSP, X-Frame-Options, secure cookies, rate limiting, bot detection, input sanitization, and CSRF protection. The platform is hosted on CyberPanel/OpenLiteSpeed.

### Feature Specifications
Key features include a mega menu navigation with tooltips for truncated descriptions, a hero section with a free assessment, core security services, a 4-step protection process, interactive calculators, industry-specific solutions, three-tier pricing, testimonials, FAQ, and a contact form. The blog includes individual article pages with a branded reading progress bar (violet/purple/fuchsia gradient) showing scroll percentage at the top of the page. The client portal offers advanced forms, satisfaction surveys, approvals, questionnaires, and a calendar. Admin features include import systems for companies/users, agent management, multi-tenancy access control, and OpenAI billing control. Integrations with Zoho ASAP, Zoho Service Class, and Zoho Flow are present. Shipping integration supports real-time tracking, rate quotes, and label generation for USPS, FedEx, and UPS. Local SEO is addressed with dedicated location pages. Lead generation includes a multi-step quote wizard, corporate email validation, and spam protection. Portal authentication uses email/password validation, token-based authentication, and a seeded admin user.

### Full-Page Scroll / Section Snapping
The homepage uses scroll snap functionality for a polished landing page experience:
- **Navigation dots**: White outline circles on the right side showing current section (desktop only)
- **Scroll-down indicator**: Bouncing chevron at bottom center encouraging scroll
- **Scroll-to-top button**: Fixed button at bottom-right (positioned to avoid chat widget overlap)
- **Keyboard navigation**: Arrow keys, Page Up/Down, Home, End, Escape to disable snap
- **Mobile behavior**: Normal scrolling on mobile (snap disabled for better UX)
- **CSS**: Uses `scroll-snap-type: y proximity` for non-jarring snapping
- **Component**: `FullPageScrollProvider` wraps homepage sections with `ScrollSectionAuto`

### System Design Choices
The project follows a modular structure (`client/` and `server/`), using UUIDs for IDs. Payment processing includes enterprise-grade encryption and webhook signature validation. AI services for ticket classification and priority detection are implemented with graceful fallback. Role-based access control manages navigation and features. User storage is in-memory, designed for future PostgreSQL migration, using bcrypt hashing and JWT tokens.

## Zoho One API Integration

### Credentials (stored as secrets)
- `ZOHO_CLIENT_ID_API` - OAuth client ID
- `ZOHO_CLIENT_SECRET_API` - OAuth client secret  
- `ZOHO_REFRESH_TOKEN` - Permanent refresh token (never expires)

### API Endpoints
| Endpoint | Description | Auth Required |
|----------|-------------|---------------|
| `GET /api/zoho/status` | Check Zoho connection status | No |
| `GET /api/zoho/desk/tickets` | Get all support tickets | Admin |
| `GET /api/zoho/desk/tickets/:id` | Get ticket by ID | Yes |
| `POST /api/zoho/desk/tickets` | Create new ticket | Yes |
| `GET /api/zoho/desk/my-tickets` | Get logged-in user's tickets | Yes |
| `GET /api/zoho/desk/departments` | Get Desk departments | Yes |
| `GET /api/zoho/crm/accounts` | Get CRM companies | Admin |
| `GET /api/zoho/crm/accounts/:id` | Get company by ID | Yes |
| `GET /api/zoho/crm/contacts` | Get CRM contacts | Admin |
| `GET /api/zoho/crm/deals` | Get CRM deals | Admin |
| `GET /api/zoho/billing/subscriptions` | Get all subscriptions | Admin |
| `GET /api/zoho/billing/my-subscription` | Get user's subscription | Yes |
| `GET /api/zoho/billing/invoices` | Get all invoices | Admin |
| `GET /api/zoho/billing/my-invoices` | Get user's invoices | Yes |
| `GET /api/zoho/billing/plans` | Get billing plans | Yes |

### Scopes Configured
- `Desk.tickets.ALL` - Full ticket access
- `Desk.contacts.ALL` - Full contact access
- `ZohoCRM.modules.ALL` - Full CRM access
- `ZohoSubscriptions.subscriptions.READ` - Read subscriptions
- `aaaserver.profile.READ` - Required for self-client

### Service Files
- `server/zoho/zohoClient.ts` - Token management
- `server/zoho/zohoDesk.ts` - Desk API service
- `server/zoho/zohoCRM.ts` - CRM API service
- `server/zoho/zohoBilling.ts` - Billing API service

## External Dependencies
- **Stripe**: Payments and subscription management (`stripe-replit-sync`)
- **Zelle**: Bank transfer payments
- **Zoho Payments**: Checkout widget
- **Zoho Bookings**: Scheduling system
- **Zoho One APIs**: Desk, CRM, Billing (see above)
- **OpenAI**: AI-powered features
- **PostgreSQL/Neon**: Database
- **Vite**: Build tool
- **React 18**: Frontend framework
- **TypeScript**: Language
- **Wouter**: Client-side routing
- **shadcn/ui + Radix UI**: Component libraries
- **Tailwind CSS**: Styling
- **Lucide React**: Icons
- **Express.js**: Backend server
- **TanStack Query**: Data fetching
- **react-hook-form + Zod**: Form validation
- **Zoho One & Flow**: CRM, support, and workflow automation
- **USPS, FedEx, UPS**: Shipping services
- **JumpCloud, Coro.net, BlackPoint**: Third-party agent management
- **Seamless.ai**: Sales integration

## CyberPanel/OpenLiteSpeed Deployment Configuration

When deploying the Replit app to digeratiexperts.com via CyberPanel reverse proxy, follow these steps to avoid 404 errors:

### Step 1: Create External Application
In OpenLiteSpeed WebAdmin (`https://your-server:7080`):
1. Go to **Server Configuration > External App > Add**
2. Type: **Web Server**
3. Configure:
   - **Name**: `replit_app`
   - **Address**: Your Replit deployment URL (e.g., `your-app.replit.app:443`)
   - **Max Connections**: 100

### Step 2: Add Rewrite Rules for SPA
In your vhost configuration, add these rewrite rules to handle React client-side routing:

```apache
RewriteEngine On

# Preserve well-known paths (SSL cert renewal)
RewriteCond %{REQUEST_URI} !^/\.well-known

# Forward all requests to Replit
RewriteRule ^(.*)$ HTTPS://replit_app/$1 [P,L]
```

### Step 3: SSL Listener Mapping
Edit `/usr/local/lsws/conf/httpd_config.conf` and verify:

```apache
listener SSL {
  address *:443
  secure 1
  map digeratiexperts.com digeratiexperts.com
}
```

### Step 4: Restart LiteSpeed
```bash
systemctl restart lsws
```

### Troubleshooting 404 Errors
- Verify the external app address matches your Replit deployment URL
- Check `/usr/local/lsws/logs/error.log` for configuration issues
- Test vhost config: `/usr/local/lsws/bin/lswsctrl configtest`
- Ensure SSL certificates are properly configured in CyberPanel