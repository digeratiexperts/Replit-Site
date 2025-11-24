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

## Session 9: Enterprise Lead Generation Form + Spam Security

### Multi-Step Lead Quote Wizard Implemented ✅
A sophisticated 3-step lead generation form with plan matching, corporate email validation, and comprehensive spam protection.

**Components Created:**
1. **`client/src/lib/emailValidator.ts`** - Corporate email validation utility
   - Blocks 20+ personal email domains (Gmail, Yahoo, Outlook, etc.)
   - Only accepts business/corporate emails
   - Reusable validation function with error messages

2. **`client/src/pages/LeadQuoteWizard.tsx`** - 3-step form component
   - Step 1: User seat sizing (1-100 users + enterprise toggle)
   - Step 2: Infrastructure needs (connectivity, devices)
   - Step 3: Lead capture (email, name, company) + consent
   - Plan matching logic determines best fit recommendation
   - Progress indicator and step navigation
   - Form state preservation between steps

3. **`client/src/pages/QuoteConfirmation.tsx`** - Results page
   - Shows personalized plan recommendation
   - Displays 3 reasons why that plan is the best fit
   - Dual CTAs: Schedule call + Email details
   - Trust messaging about data privacy
   - Marketing-focused confirmation for conversion tracking

4. **`server/routes.ts`** - API endpoint `/api/lead-quote`
   - POST endpoint with rate limiting (3 requests per 10 minutes)
   - Corporate email validation on backend
   - Honeypot spam detection
   - Request logging for security audit trail
   - Ready for CRM integration (Zoho, etc.)
   - Lead data stored with timestamp, IP, user agent

**Security Features:**
✅ Corporate email validation (blocks personal domains)
✅ Rate limiting (3 submissions per 10 minutes per IP)
✅ Honeypot field for bot detection
✅ Server-side email validation
✅ Request payload size check
✅ Security event logging
✅ Consent requirement
✅ Input sanitization via Zod schemas

**Plan Matching Logic:**
- Enterprise toggle or >100 users → Enterprise Plan
- Needs connectivity + devices → Techtility Plan  
- Needs connectivity only → Connectivity Plan
- Needs devices only → Productivity Plan
- Default → Productivity Plan

**Routes Added:**
- `/quote-wizard` - Multi-step form entry point
- `/quote-confirmation` - Results/confirmation page with plan recommendation

**Data Captured:**
- Company size (seats)
- Infrastructure needs (connectivity, devices)
- Contact info (email, first/last name, company)
- User consent for follow-up
- Source tracking (header-instant-quote)
- Timestamp, page URL, IP address, user agent

**Next Steps (To Complete Lead Gen System):**
1. Integrate form into homepage hero section (add "Get Instant Plan Match" CTA button)
2. Connect to CRM/email automation (Zoho Desk/Flow for follow-up)
3. Add Google reCAPTCHA v3 for additional bot protection
4. Set up email automation for lead notifications
5. Connect to CRM for lead scoring and nurture sequences
6. Add analytics tracking for conversion monitoring

## Session 10: CyberPanel/OpenLiteSpeed Deployment & Subdomain Configuration

### Issues Encountered & Fixed ✅

**Problem 1: Main Site Showing CyberPanel Default Page (404)**
- **Root Cause**: docRoot in vHost Conf pointed to non-existent folder (`/client/dist`)
- **Solution**: Updated docRoot to actual build output location: `/home/digeratiexperts.com/public_html/dist/public`
- **Key Learning**: vite outputs to `dist/public/`, NOT `dist/`

**Problem 2: SPA Routing Broken (Portal Routes Returning 404)**
- **Root Cause**: `.htaccess` rewrite rules not applied properly
  - Wrong location (outside docRoot)
  - Permissions blocked reads/writes in `dist/public` folder
  - `.htaccess` files can disappear after `npm run build` (volatile build folder)
- **Solution**: Created `.htaccess` in the actual docRoot with correct SPA rewrite rules:
  ```apache
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
  ```
- **Permissions Fixed**: Set `755` for folders, `644` for files, owned by `diger6692`

**Problem 3: Portal Subdomain Showing 404**
- **Root Cause**: Subdomain vHost had incorrect docRoot and missing SPA rewrites
- **Solution**: 
  - Configured subdomain vHost to use same docRoot as main domain
  - Added same SPA rewrite rules
  - Both domains now share same `dist/public` folder

### CyberPanel/OpenLiteSpeed Deployment SOP

**1. Build the project in Replit:**
```bash
npm run build
```
Creates `dist/public/index.html` and all assets.

**2. Upload to CyberPanel:**
Upload entire `dist/public/` folder contents to:
```
/home/digeratiexperts.com/public_html/dist/public/
```

**3. Configure Main Domain vHost Conf:**
```
docRoot                   /home/digeratiexperts.com/public_html/dist/public
rewrite {
  enable                  1
  autoLoadHtaccess        1
  rewriteRules {
    RewriteCond %{REQUEST_FILENAME} -f [OR]
    RewriteCond %{REQUEST_FILENAME} -d
    RewriteRule ^ - [L]
    RewriteRule ^ /dist/public/index.html [L]
  }
}
context /.well-known/acme-challenge {
  rewrite { enable 0 }
}
```

**4. Create `.htaccess` in docRoot:**
Path: `/home/digeratiexperts.com/public_html/dist/public/.htaccess`
```apache
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

**5. Fix Permissions:**
```bash
chmod 755 /home/digeratiexperts.com/public_html/dist/public
chmod 644 /home/digeratiexperts.com/public_html/dist/public/*
chown -R diger6692:diger6692 /home/digeratiexperts.com/public_html/dist/public
```

**6. Configure Portal Subdomain (if needed):**
- Point subdomain docRoot to same main domain folder
- Add same SPA rewrite rules
- Both can share same built files

**7. Restart OpenLiteSpeed:**
```bash
sudo systemctl restart lsws
```

### Key Takeaways for Future Deployments
- **docRoot must match actual Vite build output** (`dist/public/`, NOT `dist/`)
- **Build output is volatile** - recreated on each `npm run build`
- **SPA rewrite rules must live in vHost Conf or inside docRoot/.htaccess**
- **Permissions matter** - OpenLiteSpeed runs as `nobody`, needs read access to all files
- **Restart required** - All vHost changes require `sudo systemctl restart lsws`
- **Subdomains share build folder** - No need to duplicate files if using same build
- **CyberPanel reinstall page** usually means docRoot is wrong or permissions are broken

### Active Deployment Status ✅
- Main domain (`digeratiexperts.com`): Working
- Portal path (`digeratiexperts.com/portal/...`): Working
- Portal subdomain (`portal.digeratiexperts.com`): Working
- SPA routing: Working (all paths route to `index.html`)
- SSL/TLS: Active on both domains