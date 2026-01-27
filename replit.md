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
Key features include a mega menu navigation, a hero section with a free assessment, core security services, a 4-step protection process, interactive calculators, industry-specific solutions, three-tier pricing, testimonials, FAQ, and a contact form. The blog includes individual article pages with a branded reading progress bar. The client portal offers advanced forms, satisfaction surveys, approvals, questionnaires, and a calendar. Admin features include import systems, agent management, multi-tenancy access control, and OpenAI billing control. Shipping integration supports real-time tracking, rate quotes, and label generation. Lead generation includes a multi-step quote wizard, corporate email validation, and spam protection. Portal authentication uses email/password validation, token-based authentication, and a seeded admin user. The homepage utilizes scroll snap functionality with navigation dots, a scroll-down indicator, and a scroll-to-top button for an enhanced landing page experience, with dynamic theming for navigation elements. An internal sales tools hub provides categorized resources, and a reusable `GuidedSalesPitch` component offers sales enablement on customer-facing solution pages.

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
- **RBAC Roles**: Public, Prospect, Managed Client, Co-Managed Client, Admin - with server-side enforcement on every route
- **Access Control**: Checkout restricted to comanaged/admin users, separate admin area with stricter rules
- **Form Protection**: Cloudflare Turnstile verification, honeypot fields, rate limiting (5 login/15min, 10 forms/hour, 10 payments/hour)
- **Bot Detection**: User-agent analysis, request rate monitoring, submission timing checks
- **Input Validation**: Schema validation, SQL injection prevention, XSS defenses
- **CSRF Protection**: Token validation for all state-changing requests
- **Audit Logging**: Security events for auth, orders, pricing changes, admin actions
- **Payment Security**: Stripe hosted checkout (PCI compliant), webhook signature verification

### System Design Choices
The project follows a modular structure (`client/` and `server/`), using UUIDs for IDs. Payment processing includes enterprise-grade encryption and webhook signature validation. AI services for ticket classification and priority detection are implemented with graceful fallback. Role-based access control manages navigation and features. User storage is in-memory, designed for future PostgreSQL migration, using bcrypt hashing and JWT tokens. Zoho One API integration uses OAuth with secrets for various modules, implementing a data isolation pattern to scope queries by authenticated user's email and returning a consistent response format across portal endpoints.

## External Dependencies
- **Stripe**: Payments and subscription management
- **Zelle**: Bank transfer payments
- **Zoho Payments**: Checkout widget
- **Zoho Bookings**: Scheduling system
- **Zoho One APIs**: Desk, CRM, Billing
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