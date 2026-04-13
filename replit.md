# Digerati Experts - Complete MSP Client Portal + Marketing Website

## Overview
Digerati Experts is a comprehensive platform integrating a public marketing website and an enterprise client portal for small-to-medium Arizona businesses. It showcases cybersecurity solutions, 24/7 protection, and compliance assurance. The platform includes features like AI-assisted ticket routing, approval workflows, CSAT surveys, shipment tracking, and cross-service communication. Its main purpose is to drive business growth and market leadership in the MSP/MSSP sector by offering security-first IT, continuity planning, client-owned access, and a credit-based helpdesk system, targeting SMBs needing enterprise-grade IT without overhead.

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
The platform features a modern, responsive SaaS design system with consistent tokens, typography, and a unified purple color scheme, utilizing a two-tier navigation and a mobile-first approach. Typography uses Space Grotesk for headings, Inter for body text, and optionally Oxanium for numbers. The design incorporates a dark theme with glassmorphism elements, animated particles, and glow effects, ensuring accessibility with `prefers-reduced-motion` support. The color system uses `violet-400/300` as the primary accent, `violet-300 → purple-300 → fuchsia-300` for gradients, and `emerald-400` for success indicators, predominantly on a dark background.

### Technical Implementations
The frontend is built with React 18 and TypeScript, utilizing Wouter for routing, shadcn/ui with Radix UI for components, Lucide React for icons, and Tailwind CSS for styling. The backend uses an Express.js server with TypeScript. Payment processing integrates Stripe Checkout, Zelle, and Zoho Payments, supported by `stripe-replit-sync` and a PostgreSQL schema. Content is dynamically generated or custom-authored. Comprehensive SEO, HSTS, CSP, X-Frame-Options, secure cookies, rate limiting, bot detection, input sanitization, and CSRF protection are implemented. The platform is hosted on CyberPanel/OpenLiteSpeed.

### Feature Specifications
Key features include a mega menu navigation, a hero section with a free assessment, core security services, a 4-step protection process, interactive calculators, industry-specific solutions, three-tier pricing, testimonials, FAQ, and a contact form. The blog includes individual article pages with a branded reading progress bar. The client portal offers advanced forms, satisfaction surveys, approvals, questionnaires, a calendar, a vCIO Strategic IT Roadmap (`/portal/roadmap`) with budget tracking and project status, and Quarterly Business Review tools (`/portal/qbr`) with security scoring, infrastructure metrics, and actionable recommendations. Admin features include import systems, agent management, multi-tenancy access control, and OpenAI billing control. Shipping integration supports real-time tracking, rate quotes, and label generation. Lead generation includes a multi-step quote wizard, corporate email validation, and spam protection. Portal authentication uses email/password validation, token-based authentication, and a seeded admin user. The homepage utilizes scroll snap functionality with navigation dots, a scroll-down indicator, and a scroll-to-top button for an enhanced landing page experience, with dynamic theming for navigation elements. An internal sales tools hub provides categorized resources, and a reusable `GuidedSalesPitch` component offers sales enablement on customer-facing solution pages. Case studies at `/resources/case-studies` feature 5 detailed Arizona business success stories (Healthcare, Law, Accounting, Manufacturing, Real Estate).

### E-Commerce Store
The platform includes a comprehensive e-commerce store at `/store` with:
- **Managed Clients Section** (`/store/managed`): Contract-only services (ProActive Ecosystem packages, Managed Workplace, Managed Cybersecurity, Managed BCDR) - all CTAs schedule consultant meetings
- **Co-Managed Clients Section** (`/store/co-managed`): Checkout-enabled products across 14 categories:
  - A) Contract-only services (schedule consult)
  - B) Co-Managed IT subscriptions + onboarding
  - C) Networking solutions (Managed Network, project labor)
  - D) UCaaS packages + setup
  - E) Physical hardware + mandatory provisioning
  - F) Digital products (assessments, templates, training)
  - G) Professional services (consulting, support blocks)
- **Product Catalog**: 95+ SKUs defined in `client/src/data/storeProducts.ts` with full pricing from PDF catalog
- **Shopping Cart**: Persistent cart with localStorage, slide-out panel, recurring vs one-time pricing breakdown
- **Checkout Flow**: Stripe Checkout integration for payments, Quote Request option for contract discussions
- **Client Pricing**: Logged-in portal clients see client-specific discounts and exclusive client-only products
- **Portal Integration**: Order history and receipts at `/portal/orders`
- **Database Schema**: `storeProducts`, `storeOrders`, `storeCarts`, `storeQuoteRequests`, `storeClientPricing` tables

### Security Implementation
The platform implements comprehensive security following enterprise best practices:
- **Transport & Headers**: HTTPS + HSTS, CSP (Content-Security-Policy), X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
- **Authentication**: JWT tokens with secure HttpOnly/Secure/SameSite=Lax cookies, session management with rotation, email verification for new accounts
- **Multi-Factor Authentication (MFA)**: TOTP (Google Authenticator/Authy) and email-based 2FA; backup codes generated with `crypto.randomBytes`; MFA challenge on login with 5-attempt lockout per session; setup/confirm/disable/regenerate endpoints under `/api/portal/mfa/*`; MFA settings in portal at `/portal/settings`
- **RBAC Roles**: Public, Prospect, Managed Client, Co-Managed Client, Admin - with server-side enforcement on every route
- **Access Control**: Checkout restricted to comanaged/admin users, separate admin area with stricter rules
- **Form Protection**: Cloudflare Turnstile verification on login, registration, and forgot-password (fail-closed in production, skips in dev without token); honeypot fields; rate limiting (5 login/15min, 10 forms/hour, 10 payments/hour)
- **Bot Detection**: User-agent analysis, request rate monitoring, submission timing checks
- **Input Validation**: Schema validation, SQL injection prevention, XSS defenses
- **CSRF Protection**: Token validation for all state-changing requests
- **Audit Logging**: Security events for auth, MFA, orders, pricing changes, admin actions
- **Payment Security**: Stripe hosted checkout (PCI compliant), webhook signature verification

### Centralized Pricing Configuration
All ProActive Ecosystem tier pricing is managed from a single source of truth at `client/src/data/pricing.ts`:
- **Office Tier**: $750/site minimum + $165/user (5-25 users)
- **Business Tier**: $1,200/site minimum + $245/user (5-50 users)
- **Enterprise Tier**: $1,725/site minimum + $345/user (25-100+ users)
- **Helper Functions**: `formatPrice()`, `formatSiteMin()`, `formatUserPrice()`, `getPricingFooterText()`
- **15+ Components**: Import pricing from this config (DigeratiPricingSection, ServiceMatrix, calculators, MegaMenu, Ecosystem pages, etc.)
- **Note**: BackupDisasterRecovery.tsx has separate BCDR product pricing ($750/mo) which is intentionally independent

### System Design Choices
The project follows a modular structure (`client/` and `server/`), using UUIDs for IDs. Payment processing includes enterprise-grade encryption and webhook signature validation. AI services for ticket classification and priority detection are implemented with graceful fallback. Role-based access control manages navigation and features. User storage uses PostgreSQL via DatabaseStorage with bcrypt hashing and JWT tokens. Zoho One API integration uses OAuth with secrets for various modules, implementing a data isolation pattern to scope queries by authenticated user's email and returning a consistent response format across portal endpoints.

### Event-Driven Architecture
The platform implements an event-driven architecture via `server/eventBus.ts` for cross-service communication:
- **Event Types**: PAYMENT_COMPLETED, TICKET_CREATED, TICKET_RESOLVED, SHIPMENT_DELIVERED, CHAT_MESSAGE_SENT, LEAD_CREATED, CONTACT_FORM_SUBMITTED
- **Cross-Service Handler** (`server/crossServiceHandler.ts`): Subscribes to events and triggers appropriate actions
- **Email Notifications** (`server/services/notificationService.ts`): ZeptoMail integration for transactional emails (lead alerts, quote confirmations, ticket updates, password resets)
- **Structured Logging** (`server/logger.ts`): Environment-aware logging with security event tracking

### Form → Zoho CRM Integration
All website forms now create leads in Zoho CRM via OAuth (ZOHO_CLIENT_ID_API, ZOHO_CLIENT_SECRET_API, ZOHO_REFRESH_TOKEN):
- **Hero Assessment** (`/api/assessment`): Name + email → Zoho CRM lead (source: "Website Assessment")
- **Lead Form** (`/api/assessment`): Name + email + phone + company → Zoho CRM lead (source: "Website Lead Form")
- **Contact Form** (`/api/contact`): Full contact details → Zoho CRM lead (source: "Website Contact Form") — requires Turnstile
- **Newsletter** (`/api/newsletter`): Email → Zoho CRM lead (source: "Newsletter Signup") — deduplicates existing leads
- **Exit Intent/Ebook** (`/api/newsletter`): Email → Zoho CRM lead (source: "Newsletter Signup")
- **Quote Wizard** (`/api/lead-quote`): Full wizard data → Zoho CRM lead (source: "Website Quote Wizard") — requires Turnstile + corporate email
- All Zoho calls are non-blocking: if Zoho fails, the form still succeeds and logs the error
- For production deployment: set ZOHO_CLIENT_ID_API, ZOHO_CLIENT_SECRET_API, ZOHO_REFRESH_TOKEN, ZOHO_DESK_REFRESH_TOKEN env vars on web server

### Email Notification System
Transactional email notifications powered by ZeptoMail (requires `ZEPTOMAIL_API_TOKEN` secret):
- **Lead Notifications**: Alerts sales team (`ADMIN_EMAIL` env var, defaults to `info@digeratiexperts.com`) when new leads are captured
- **Quote Confirmations**: Confirms quote requests; CTA links to `/portal/orders`
- **Ticket Updates**: Notifies clients; CTA links to `/portal/tickets/${ticketId}`
- **Email Verification**: Sent on signup and resend-verification; links to `APP_URL/api/portal/verify-email?token=…`
- **Password Resets**: Full flow — POST `/api/portal/forgot-password` sends reset email; POST `/api/portal/reset-password` completes reset; frontend pages at `/portal/forgot-password` and `/portal/reset-password`
- **Welcome Emails**: Sent via `sendWelcomeEmail()` (wired in crossServiceHandler on USER_CREATED event)
- **Authorization Fix**: `Zoho-enczapikey` prefix handled correctly — token checked before prepending to avoid double-prefix
- **Sender**: noreply@digeratiexperts.com
- **Admin Test Endpoint**: POST `/api/admin/test-email`
- **Status Endpoint**: GET `/api/email-status`
- **APP_URL env var**: Defaults to `https://digeratiexperts.com`; set to override base URL in verification/reset links

## External Dependencies
- **Stripe**: Payments and subscription management
- **ZeptoMail**: Transactional email notifications (requires ZEPTOMAIL_API_TOKEN)
- **Zelle**: Bank transfer payments
- **Zoho Payments**: Checkout widget
- **Zoho Bookings**: Scheduling system
- **Zoho One APIs**: Desk (via ZOHO_DESK_REFRESH_TOKEN with Desk.tickets.ALL, Desk.contacts.READ, Desk.settings.READ scopes), CRM (via ZOHO_REFRESH_TOKEN), Billing
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