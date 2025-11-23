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
- **OpenAI**: AI-powered features with billing control (Replit AI Integrations)
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

## Latest Features Implemented (Session 2)
- **Import System**: Sync companies/users from Zoho Desk, Zoho CRM, JumpCloud, Seamless.ai
- **AdminImport Page**: Import job management with status tracking
- **AdminAgents Page**: Upload and manage third-party agents (JumpCloud, Coro.net, BlackPoint)
- **Agent Management**: Display uploaded agents on client's Desktop Agent page
- **Multi-Tenancy Access Control**: 
  - Digerati admin view: See all clients, all agents, manage imports
  - Client view: See only their own company data, download agents for their company
- **3 New API Endpoints**: 
  - POST /api/portal/admin/import - Start import job
  - GET /api/portal/admin/agents - Digerati admin view (all agents)
  - GET /api/portal/clients/:clientId/agents - Client-specific agents (multi-tenant)
- **Role-Based Navigation**: Admin-only menu section in sidebar with import & agent management
- **3 New Database Tables**: external_integration_mappings, desktop_agents, integration_sync_logs

## Latest Features Implemented (Session 3)
- **Comprehensive Security System**: Enterprise-grade protection against spam and MITM attacks
- **MITM Protection**: HSTS, CSP, X-Frame-Options, X-Content-Type-Options, secure cookies
- **Spam Prevention**: Multi-layer rate limiting (login: 5/15m, chat: 50/15m, forms: 10/1h, API: 300/15m, imports: 5/1h, payments: 10/1h)
- **Bot Detection**: Automatic blocking of crawler/bot user agents, tracks suspicious activity
- **Input Security**: HTML escaping, SQL injection prevention, email/phone/URL validation, 1MB request limits
- **CSRF Protection**: Token generation, validation, 1-hour expiration with secure cookies
- **Duplicate Request Detection**: SHA256 hashing to prevent replay attacks
- **Security Monitoring**: Real-time event logging, admin dashboard at /api/security/events
- **8 New Security Middleware Functions**:
  - CSRF token generation and validation
  - Bot detection with automatic blocking
  - Honeypot spam field detection
  - Input sanitization and validation
  - Request size limiting
  - Duplicate request detection
  - IP blacklist/whitelist support
  - Security event logging
- **3 New Security Endpoints**:
  - GET /api/security/health - Security status check
  - POST /api/security/csrf-token - Generate CSRF tokens
  - GET /api/security/events - Admin security event logs (admin only)

## Latest Features Implemented (Session 7)
- **DE Questionnaires & Calendar Page**: New portal page for important dates and assessments
  - Beautiful calendar view with month navigation
  - Event types: Deployments, Projects, TBRs, Cyber Assessments, Site Assessments, Risk Assessments, Questionnaires
  - Color-coded event badges for visual identification
  - Timeline view for chronological event listing
  - Filter by status: All, Scheduled, In Progress, Completed
  - Detailed event panel with descriptions and action buttons
  - Interactive calendar grid with events displayed on dates
  - Integrated at: /portal/questionnaires
  - Sidebar navigation with Calendar icon
- **Vendor Integration Credentials Stored**:
  - ✅ Zoho (Client ID & Secret)
  - ✅ JumpCloud (API Key)
  - ✅ Coro.net (Client ID & Secret)
  - ⏳ Pending: Griffin IT, Sherweb, Pax8, ClimbCS, BlackPoint, Seamless.ai
  - 🔮 Future: Uplevel Systems, Cytracom, Galactic Advisors, Atakama
- **VENDOR_SETUP_STATUS.md**: Tracking document for all vendor integration status

## Latest Features Implemented (Session 5+6)
- **OpenAI Billing Control System**: Full admin control over OpenAI API usage
  - Enable/disable OpenAI integration anytime to manage billing
  - Admin-only endpoints for toggling
  - Environment variable support (ENABLE_OPENAI_INTEGRATION)
  - Guard function for safe API calls
  - Comprehensive audit logging
  - 4 API endpoints for control
- **OpenAI Configuration Service**: `server/services/openai-config.ts`
  - `openaiConfig.isEnabled()` - Check current state
  - `openaiConfig.enable()` / `.disable()` - Control state
  - `openaiConfig.toggle()` - Switch state
  - `withOpenAIGuard()` - Safe API call wrapper
- **Admin OpenAI Dashboard**: New portal page for billing control
  - Real-time status display with visual indicators
  - Enable/disable/toggle buttons with loading states
  - Configuration display
  - Affected features list
  - Billing information card
  - Integrated at: /portal/admin/openai
- **4 New OpenAI Control Endpoints**:
  - GET /api/portal/admin/openai/status - Check status
  - POST /api/portal/admin/openai/toggle - Toggle on/off
  - POST /api/portal/admin/openai/enable - Enable explicitly
  - POST /api/portal/admin/openai/disable - Disable explicitly
- **AI Ticket Classification Service**: `server/services/ticket-classifier.ts`
  - Auto-detect ticket category (Authentication, System Error, Performance, Security, Connectivity, Billing, General)
  - Priority detection (low/medium/high/critical)
  - Suggested resolutions
  - Tag generation
  - SLA response time calculation
  - Graceful fallback when OpenAI disabled
- **Hybrid AI/Human Chat System**: `server/services/hybrid-chat.ts`
  - AI response generation with graceful degradation
  - Human escalation triggers
  - Message routing (AI vs Human)
  - Sentiment analysis
  - Follow-up suggestions
  - Three chat modes: human, ai, hybrid
  - Three tones: professional, friendly, technical
- **Vendor Integration Scaffolding**: Full framework ready for all 8 vendors
  - 4 Procurement partners: Griffin IT, Sherweb, Pax8, ClimbCS
  - 3 Security vendors: JumpCloud, Coro.net, BlackPoint
  - 1 Sales vendor: Seamless.ai
  - Common interface for all vendors
  - Vendor registry with getVendorIntegration()
  - Placeholder implementations ready for API credential setup
- **Documentation**: 
  - OPENAI_BILLING_CONTROL.md - Full OpenAI control guide
  - VENDOR_INTEGRATION_GUIDE.md - What you need to provide for each vendor

## Latest Features Implemented (Session 4)
- **Zoho One & Flow Integration**: Full compatibility with Zoho ecosystem
- **Zoho ASAP Widget**: Custom support widget on homepage mimicking Zoho Desk functionality
  - Floating help widget (bottom-right)
  - Support ticket submission
  - Knowledge base browsing
  - System status checking
- **Zoho Service Class**: Complete OAuth 2.0 API wrapper for Zoho Desk
  - Ticket CRUD operations
  - Comment management
  - Flow execution support
  - Token refresh automation
- **Zoho Flow Webhooks**: Ready for workflow automation
  - Ticket creation triggers
  - Ticket update handling
  - Custom event routing
- **Database Schema**: 4 new Zoho integration tables
  - zoho_configurations - API credentials & settings
  - zoho_integration_logs - Sync/event logging
  - zoho_ticket_sync - Local ticket copies
  - zoho_flow_triggers - Active workflows tracking
- **5 New Zoho API Endpoints**:
  - POST /api/portal/zoho/ticket - Create support tickets
  - GET /api/portal/zoho/tickets - Retrieve user tickets
  - GET /api/portal/zoho/flows - List active flows
  - POST /api/portal/zoho/flow-webhook - Webhook handler
  - GET /api/portal/admin/zoho/status - Integration status
  - POST /api/portal/admin/zoho/test-connection - Test connection
- **USPS, FedEx & UPS Shipping Integration**: Full multi-carrier support
  - Real-time tracking from all 3 carriers
  - Live shipping rate quotes with comparison
  - Automated shipping label generation
  - Admin carrier configuration & testing
  - Tracking history & event logging
  - Rates cache for performance optimization
- **Database Schema**: 4 new shipping tables
  - shippingCarriers - Carrier credentials & configuration
  - shippingTrackingHistory - Full tracking history
  - shippingRatesCache - Cached rates for performance
  - Enhanced portalShipments with carrier-specific fields
- **8 New Shipping API Endpoints**:
  - GET /api/portal/shipping/track/:trackingNumber - Track packages
  - POST /api/portal/shipping/rates - Get live quotes from all carriers
  - POST /api/portal/shipping/label - Create shipping labels
  - GET /api/portal/shipping/shipments - List client shipments
  - POST /api/portal/admin/shipping/carriers - Configure carriers
  - GET /api/portal/admin/shipping/carriers - List configured carriers
  - POST /api/portal/admin/shipping/test-carrier - Test connections
  - GET /api/portal/admin/shipping/rates-cache - Monitor cache