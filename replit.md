# Digerati Experts - Complete MSP Client Portal + Marketing Website

## Overview
Digerati Experts is a comprehensive platform integrating a public marketing website and an enterprise client portal for small-to-medium Arizona businesses. It showcases cybersecurity solutions, 24/7 protection, and compliance assurance. The platform aims to drive business growth and market leadership in the MSP/MSSP sector by offering security-first IT, continuity planning, client-owned access, and a credit-based helpdesk system, targeting SMBs needing enterprise-grade IT without overhead. Key capabilities include AI-assisted ticket routing, approval workflows, CSAT surveys, shipment tracking, and cross-service communication.

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
The platform uses a modern, responsive SaaS design system with consistent tokens, typography (Space Grotesk, Inter, Oxanium), and a unified purple color scheme (`violet-400/300` primary accent). It features a two-tier navigation, a mobile-first approach, a dark theme with glassmorphism elements, animated particles, and glow effects, ensuring accessibility with `prefers-reduced-motion` support.

### Technical Implementations
The frontend is built with React 18, TypeScript, Wouter for routing, shadcn/ui with Radix UI, Lucide React, and Tailwind CSS. The backend uses an Express.js server with TypeScript. It supports dynamic content generation, comprehensive SEO, and robust security headers (HSTS, CSP, X-Frame-Options), secure cookies, rate limiting, bot detection, input sanitization, and CSRF protection. The application uses `.env` for configuration and is hosted on CyberPanel/OpenLiteSpeed. Performance optimizations include gzip compression via Express `compression` middleware (level 6, 1024-byte threshold), lazy loading, image dimension attributes for CLS, route-level code splitting with `React.lazy()` and `Suspense`, an `OptimizedImage` component, and Vite build optimizations for caching and asset hashing.

### Feature Specifications
Key features include a mega menu, a hero section with a free assessment, core security services, a 4-step protection process, interactive calculators, industry-specific solutions, three-tier pricing, testimonials, FAQ, and a contact form. The blog includes individual article pages. The client portal offers advanced forms, satisfaction surveys, approvals, questionnaires, a calendar, a vCIO Strategic IT Roadmap, and Quarterly Business Review tools. Admin features include import systems, agent management, multi-tenancy access control, and OpenAI billing control. Shipping integration provides real-time tracking, rate quotes, and label generation. Lead generation includes a multi-step quote wizard, corporate email validation, and spam protection. Portal authentication uses email/password, token-based authentication, and a seeded admin user. The homepage features scroll snap functionality, navigation dots, and dynamic theming. An internal sales tools hub and reusable `GuidedSalesPitch` component are available, alongside detailed case studies.

The platform includes a comprehensive e-commerce store at `/store` with sections for managed clients (contract-only services) and co-managed clients (checkout-enabled products across 14 categories including subscriptions, networking, UCaaS, hardware, digital products, and professional services). It features a product catalog (95+ SKUs), a persistent shopping cart, Zoho Payments integration for checkout, and client-specific pricing/products for logged-in portal users. Order history is accessible in the portal.

### Security Implementation
The platform implements enterprise-grade security including HTTPS, HSTS, comprehensive CSP, X-Frame-Options, secure JWT tokens in HttpOnly/Secure/SameSite cookies, session management, email verification, and Multi-Factor Authentication (MFA) using TOTP and email-based 2FA with lockout policies. Role-Based Access Control (RBAC) is enforced server-side for "Public", "Prospect", "Managed Client", "Co-Managed Client", and "Admin" roles. Form protection includes Cloudflare Turnstile, honeypot fields, and rate limiting. Bot detection, input validation against SQL injection and XSS, and CSRF protection are in place. Audit logging tracks security events. Payment security is handled via Zoho Payments with webhook signature verification. JSON-LD structured data is used for SEO rich results.

### Centralized Pricing Configuration
All ProActive Ecosystem tier pricing is managed from `client/src/data/pricing.ts`, defining "Office", "Business", and "Enterprise" tiers with per-site minimums and per-user costs. Helper functions simplify pricing display, and this configuration is used across over 15 components.

### System Design Choices
The project follows a modular structure (`client/` and `server/`) using UUIDs for IDs. Payment processing involves enterprise-grade encryption and webhook signature validation. AI services for ticket classification and priority detection include graceful fallback. Role-based access control manages navigation and features. User storage uses PostgreSQL with bcrypt hashing. Zoho One API integration leverages OAuth with data isolation patterns for authenticated users.

### Event-Driven Architecture
An event-driven architecture via `server/eventBus.ts` facilitates cross-service communication for events like `PAYMENT_COMPLETED`, `TICKET_CREATED`, and `LEAD_CREATED`. A `crossServiceHandler` subscribes to events, triggering actions such as email notifications via ZeptoMail and structured logging for security events.

### Form → Zoho CRM Integration
All website forms integrate with Zoho CRM via OAuth, creating leads with specific sources (e.g., "Website Assessment", "Website Quote Wizard"). Zoho calls are non-blocking, ensuring form submission success even if Zoho integration fails.

### Email Notification System
Transactional email notifications are powered by ZeptoMail for lead alerts, quote confirmations, ticket updates, email verification, password resets, and welcome emails. It includes an admin test endpoint and status endpoint, with `APP_URL` configurable for link generation.

## External Dependencies
- **Zoho Payments**: Primary payment processor.
- **ZeptoMail**: Transactional email notifications.
- **Zoho Bookings**: Scheduling system.
- **Zoho One APIs**: Desk, CRM, Billing.
- **OpenAI**: AI-powered features.
- **PostgreSQL/Neon**: Database.
- **Vite**: Build tool.
- **React 18**: Frontend framework.
- **TypeScript**: Language.
- **Wouter**: Client-side routing.
- **shadcn/ui + Radix UI**: Component libraries.
- **Tailwind CSS**: Styling.
- **Lucide React**: Icons.
- **Express.js**: Backend server.
- **TanStack Query**: Data fetching.
- **react-hook-form + Zod**: Form validation.
- **USPS, FedEx, UPS**: Shipping services.