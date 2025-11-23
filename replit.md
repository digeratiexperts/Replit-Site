# Digerati Experts - Complete MSP Client Portal + Marketing Website

## Overview
Digerati Experts is a comprehensive platform integrating a public marketing website and an enterprise client portal. The platform showcases cybersecurity solutions, 24/7 protection, and compliance assurance for small-to-medium Arizona businesses. It includes features like AI-assisted ticket routing, approval workflows, CSAT surveys, shipment tracking, and cross-service communication to drive business growth and market leadership in the MSP/MSSP sector.

## User Preferences
- Complete feature coverage per requirements document
- Production-ready deployment
- Event-driven architecture for cross-service communication
- AI-powered intelligent features (classification, suggestions, auto-routing)
- Enterprise security and compliance

## System Architecture

### UI/UX Decisions
The platform features a modern, responsive SaaS design system with consistent tokens, typography, and a purple-blue gradient color scheme for interactive elements. It utilizes a two-tier navigation system and a mobile-first approach.

### Technical Implementations
**Frontend**: Built with React 18 and TypeScript, using Wouter for routing, shadcn/ui with Radix UI for components, Lucide React for icons, and Tailwind CSS for styling.
**Backend**: Utilizes an Express.js server with TypeScript.
**Payment System**: Integrates Stripe Checkout, Zelle QR codes, and Zoho Payments architecture, with `stripe-replit-sync` for webhook management and PostgreSQL schema.
**Content Management**: Solutions pages are dynamically generated from `servicePageData`.
**Navigation**: Implements a comprehensive mega menu.
**SEO**: Includes extensive SEO meta tags, Open Graph, and Twitter card meta tags.
**Security**: Incorporates enterprise-grade protection against MITM attacks (HSTS, CSP, X-Frame-Options, secure cookies), multi-layer rate limiting, bot detection, input sanitization, CSRF protection, and duplicate request detection.

### Feature Specifications
- **Navigation**: Mega menu with sections for Solutions, Industries, Resources, About, and CTAs.
- **Key Sections**: Hero section with free assessment, alert banner, six core security services, a 4-step protection process, interactive calculators, industry-specific solutions, three-tier pricing, client testimonials, FAQ, free pen test offer, and a contact form.
- **Client Portal**: Includes pages for Advanced Forms, Satisfaction Surveys, Approvals, Questionnaires & Calendar.
- **Admin Features**: Import system for companies/users (Zoho Desk, Zoho CRM, JumpCloud, Seamless.ai), agent management (JumpCloud, Coro.net, BlackPoint), multi-tenancy access control, and OpenAI billing control.
- **Zoho Integration**: Zoho ASAP widget for support, Zoho Service Class for API interaction, and Zoho Flow webhooks.
- **Shipping Integration**: Real-time tracking, rate quotes, and label generation for USPS, FedEx, and UPS.
- **Local SEO**: Dedicated location pages for Chandler, Phoenix, Mesa, Gilbert, Tempe, Scottsdale.

### System Design Choices
The project follows a modular structure with `client/` and `server/` directories. UUIDs are used for IDs. Payment processing includes enterprise-grade encryption and webhook signature validation. AI services for ticket classification, priority detection, and hybrid AI/human chat are implemented with graceful fallback mechanisms and admin control over OpenAI usage. Role-based access control is applied to navigation and features.

## External Dependencies
- **Stripe**: Credit/debit payments, subscription management (`stripe-replit-sync`)
- **Zelle**: Bank transfer payments
- **Zoho Payments**: Checkout widget
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
- **Griffin IT, Sherweb, Pax8, ClimbCS**: Procurement partners

## Latest Update: Complete Link Audit & Dead Link Fixes

### Issues Found & Fixed (Session 8)
- **3 Dead Links Identified**: /about/compliance, /about/support, /about/insurance were referenced in MegaMenu but had no corresponding pages
- **Status**: ALL FIXED ✅

### New Pages Created
1. **`/about/compliance`** - Audit-Ready Compliance Documentation
   - Features: Framework mapping, evidence retention, audit packets, compliance reports
   - Use case: Help customers pass audits with documented evidence

2. **`/about/support`** - Fast, Reliable Support & Response  
   - Features: 15-minute response SLA, expert support team, escalation procedures
   - Use case: Highlight rapid response guarantee and vendor coordination

3. **`/about/insurance`** - Insurance-Aligned Security & Compliance
   - Features: Insurance control alignment, claims documentation, premium justification
   - Use case: Show how Digerati helps meet cyber insurance requirements

### Link Audit Results
**Total Links Audited**: 50+
- Solutions: 13 links ✅ (all have routes + dynamic content)
- Industries: 5 links ✅ (all have pages or dynamic routes)
- Resources: 5 links ✅ (all in resourcePageData with routes)
- About: 5 links ✅ (4 original + 3 new pages created)
- Support: 5+ links ✅ (all in supportPageData)
- Legal: 7 links ✅ (all have dedicated pages)
- Trust: 4 links ✅ (all have pages)
- Locations: 6 links ✅ (all have dedicated pages)

**Status**: 100% link integrity - No remaining dead links