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
The platform features a modern, responsive SaaS design system with consistent tokens, typography, and a purple-blue gradient color scheme, utilizing a two-tier navigation and a mobile-first approach. Typography uses Space Grotesk for headings, Inter for body text, and optionally Oxanium for numbers. The design incorporates a dark theme with glassmorphism elements, animated particles, and glow effects, ensuring accessibility with `prefers-reduced-motion` support.

### Technical Implementations
The frontend is built with React 18 and TypeScript, using Wouter for routing, shadcn/ui with Radix UI for components, Lucide React for icons, and Tailwind CSS for styling. The backend uses an Express.js server with TypeScript. Payment processing integrates Stripe Checkout, Zelle, and Zoho Payments, supported by `stripe-replit-sync` and a PostgreSQL schema. Content is dynamically generated or custom-authored for solutions and industry pages. SEO is comprehensive, including meta tags, Open Graph, and Twitter cards. Security features include HSTS, CSP, X-Frame-Options, secure cookies, rate limiting, bot detection, input sanitization, and CSRF protection. The platform is hosted on CyberPanel/OpenLiteSpeed.

### Feature Specifications
Key features include a mega menu navigation, a hero section with a free assessment, core security services, a 4-step protection process, interactive calculators, industry-specific solutions, three-tier pricing, testimonials, FAQ, and a contact form. The client portal offers advanced forms, satisfaction surveys, approvals, questionnaires, and a calendar. Admin features include import systems for companies/users, agent management, multi-tenancy access control, and OpenAI billing control. Integrations with Zoho ASAP, Zoho Service Class, and Zoho Flow are present. Shipping integration supports real-time tracking, rate quotes, and label generation for USPS, FedEx, and UPS. Local SEO is addressed with dedicated location pages. Lead generation includes a multi-step quote wizard, corporate email validation, and spam protection. Portal authentication uses email/password validation, token-based authentication, and a seeded admin user.

### System Design Choices
The project follows a modular structure (`client/` and `server/`), using UUIDs for IDs. Payment processing includes enterprise-grade encryption and webhook signature validation. AI services for ticket classification and priority detection are implemented with graceful fallback. Role-based access control manages navigation and features. User storage is in-memory, designed for future PostgreSQL migration, using bcrypt hashing and JWT tokens.

## External Dependencies
- **Stripe**: Payments and subscription management (`stripe-replit-sync`)
- **Zelle**: Bank transfer payments
- **Zoho Payments**: Checkout widget
- **Zoho Bookings**: Scheduling system
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