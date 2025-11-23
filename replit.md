# Digerati Experts - Managed Security Service Provider (MSP/MSSP) Website

## Overview
Digerati Experts is a modern, fully responsive website for a Managed Security Service Provider (MSP/MSSP) based in Chandler, Arizona. The site focuses on cybersecurity messaging ("Hackers Don't Wait. Protect Your Business Now"), showcasing managed IT and security services with a professional purple gradient design. It includes comprehensive service offerings, multi-payment system integration (Stripe, Zelle, Zoho), dynamic solutions pages, and a complete design system for a modern SaaS aesthetic. The project aims to convert visitors into clients by emphasizing 24/7 protection, compliance assurance, and local expertise for small to medium businesses in Arizona.

## User Preferences
Not specified. The agent should infer preferences from the project's structure and goals.

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
- **Stripe**: For credit/debit card payments and subscription management, integrated via `stripe-replit-sync`.
- **Zelle**: For manual bank transfers via QR code.
- **Zoho Payments**: Architected for future integration.
- **PostgreSQL**: Used for database operations, particularly by `stripe-replit-sync` for managing Stripe data.
- **Vite**: Build tool for fast development and optimized production builds.
- **React 18**: Frontend framework.
- **TypeScript**: For type-safe development.
- **Wouter**: For client-side routing.
- **shadcn/ui** and **Radix UI**: UI component libraries.
- **Lucide React**: Icon library.
- **Tailwind CSS**: For styling.
- **Express.js**: Backend server framework.