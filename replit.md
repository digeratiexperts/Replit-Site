# Digerati Experts - Complete MSP Client Portal + Marketing Website

## Overview
Digerati Experts is now a comprehensive platform combining:
1. **Public Marketing Website** - Modern, responsive website for MSP/MSSP showcasing cybersecurity solutions
2. **Enterprise Client Portal** - White-labeled, feature-complete portal with 20 pages, AI-powered support, and multi-payment processing

The platform focuses on cybersecurity messaging, 24/7 protection, compliance assurance, and local expertise for small-to-medium Arizona businesses. Includes advanced features: AI-assisted ticket routing, approval workflows, CSAT surveys, shipment tracking, and cross-service communication.

## User Preferences
- Complete feature coverage per requirements document
- Production-ready deployment
- Event-driven architecture for cross-service communication
- AI-powered intelligent features (classification, suggestions, auto-routing)
- Enterprise security and compliance

## System Architecture

### UI/UX Decisions
The website implements a modern, light SaaS design system with consistent tokens, typography, and spacing. It features purple-blue gradients for CTAs and interactive elements. A two-tier navigation system includes a top utility bar and a main navigation bar with a scaling logo and menu items that adjust on scroll. The design is fully responsive with a mobile-first approach, using professional typography and security-focused iconography.

### Technical Implementations
**Frontend**: Built with React 18 and TypeScript, utilizing Wouter for hash-based routing, shadcn/ui with Radix UI primitives for components, and Lucide React for icons. Styling is managed with Tailwind CSS.
**Backend**: Features an Express.js server with TypeScript.
**Payment System**: Implements Stripe Checkout, Zelle QR codes, and a future-ready Zoho Payments architecture. Stripe integration uses a Replit connector with `stripe-replit-sync` for automatic webhook management and PostgreSQL schema creation.
**Solutions Pages**: Dynamically generated from `servicePageData` in App.tsx, ensuring scalability and maintainability for the 11 detailed service pages.
**Navigation**: A comprehensive mega menu navigation system provides multi-level access to solutions, industries, resources, and company information.
**SEO & Meta Optimization**: Includes comprehensive SEO meta tags (title, description, keywords), Open Graph, and Twitter card meta tags.

### Feature Specifications
- **Mega Menu Navigation**: Solutions (ProActive Ecosystem, Business Solutions, Enterprise tiers), Industries, Resources, About sections, with a "Get Protected Now" CTA and Client Portal link.
- **Hero Section**: Cybersecurity messaging with a free assessment form.
- **Alert Banner**: For critical security alerts.
- **Services Section**: Six core security services.
- **How We Protect Your Business**: A 4-step process visualization.
- **Interactive Calculators**: Downtime cost and service pricing estimators.
- **Industries We Serve**: Targeted industry solutions.
- **Pricing**: Three-tier transparent pricing model.
- **Testimonials**: Client reviews carousel.
- **FAQ Section**: Expandable questions and answers.
- **Free Pen Test Offer**: $20,000 value security assessment.
- **Contact**: Comprehensive contact form with office location.
- **Footer**: Industry links, resources, and emergency hotline.

### System Design Choices
The project prioritizes a modular structure with `client/` and `server/` directories. UUIDs are used for IDs to ensure scalability. The system includes robust security features for payment processing, such as enterprise-grade encryption, webhook signature validation, and UUID-based routing.

## External Dependencies
- **Stripe**: Credit/debit payments, subscription management (`stripe-replit-sync`)
- **Zelle**: Bank transfer payments via QR code
- **Zoho Payments**: Checkout widget with webhook verification
- **PostgreSQL/Neon**: Database with 40+ tables
- **Vite**: Build tool and dev server
- **React 18**: Frontend framework
- **TypeScript**: Type-safe development
- **Wouter**: Client-side routing
- **shadcn/ui + Radix UI**: Component libraries
- **Tailwind CSS + custom theme**: Styling (purple #5034ff, navy #030228)
- **Lucide React**: Icons
- **Express.js**: Backend server
- **TanStack Query**: Data fetching and caching
- **react-hook-form + Zod**: Form validation

## Latest Features Implemented (Session 1)
- **Event Bus System**: Real-time cross-service communication
- **AI Service**: Ticket classification, suggestions, resolution prediction
- **Cross-Service Handler**: Automatic workflows triggered by events
- **3 New Portal Pages**: Advanced Forms, Satisfaction Surveys, Approvals
- **Announcement Banner Component**: For broadcast notifications
- **6 New API Endpoints**: AI classification, smart recommendations, event history, health checks
- **4 New Database Tables**: AI classifications, suggestions, shipments, procurement products