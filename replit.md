# Digerati Experts - Managed Security Service Provider (MSP/MSSP) Website

## Overview
Digerati Experts is a modern, fully responsive website for a Managed Security Service Provider (MSP/MSSP) based in Chandler, Arizona. Built with React, TypeScript, and Tailwind CSS, the site features cybersecurity-focused messaging including "Hackers Don't Wait. Protect Your Business Now" as the hero headline, showcasing managed IT and security services with a professional purple gradient design.

## Recent Changes (January 2025)
- **Major Pivot**: Transformed from generic digital agency to MSP/MSSP cybersecurity-focused website
- Updated all content to reflect managed security services and IT support offerings
- Added Chandler, Arizona location with updated phone number (480) 519-5892
- Implemented "Hackers Don't Wait. Protect Your Business Now" hero messaging
- Created comprehensive services sections: Managed Security, Managed IT, Compliance & Governance
- Added security-focused statistics and value propositions throughout
- Updated testimonials to reflect Arizona business clients
- Added pricing tiers: Basic IT ($165/user), Advanced Security ($245/user), Enterprise ($345/user)
- Added emergency support hotline and 24/7 SOC monitoring emphasis
- **Latest Updates**:
  - Implemented comprehensive mega menu navigation system with dropdown sections
  - Added actual company logo to replace text branding
  - Created multi-level navigation structure matching live site at digerati-experts.com
  - Preserved "Get Protected Now" CTA button and Client Portal link
  - Added interactive calculators (downtime cost and service estimator)
  - Implemented testimonial carousel with navigation
  - Added 7 new website sections including Industries We Serve, FAQ, Free Pen Test offer

## Business Information

### Company Details
- **Company Name**: Digerati Experts
- **Type**: Managed Security Service Provider (MSP/MSSP)
- **Location**: 3165 S Alma School Rd Suite 29, Chandler, AZ 85248
- **Phone**: (480) 848-6116
- **Email**: info@digerati-experts.com
- **Domain**: digerati-experts.com
- **Office Hours**: Monday-Friday 7:00 AM - 6:00 PM MST
- **24/7 Security Operations Center**: Always Active

### Core Services

#### Managed Security Services
- SOC-as-a-Service
- Endpoint Detection & Response
- Vulnerability Management
- Incident Response
- 24/7 Security Monitoring

#### Managed IT Services
- Network Management
- Help Desk Support
- Cloud Migration
- Backup & Disaster Recovery

#### Compliance & Governance
- HIPAA Compliance
- PCI DSS Compliance
- NIST Framework
- Security Audits

### Key Differentiators
- **Local Presence**: Based in Chandler, serving Phoenix metropolitan area
- **Rapid Response**: 15-minute response time for critical incidents
- **Certifications**: Team holds CISSP, CCSP, CEH, and Security+ certifications
- **Track Record**: 500+ Arizona businesses protected, 99.9% uptime, 0 breaches
- **24/7 Protection**: Round-the-clock Security Operations Center

## Project Architecture

### Frontend
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter with hash-based navigation for smooth scrolling
- **UI Components**: shadcn/ui with Radix UI primitives
- **Icons**: Lucide React for consistent iconography
- **Styling**: Tailwind CSS with custom purple-blue gradients
- **Layout**: Fully responsive design with mobile-first approach

### Backend (Currently Minimal)
- **Server**: Express.js with TypeScript
- **Database**: PostgreSQL available (not actively used for the landing page)
- **Build Tool**: Vite for fast development and optimized builds

## Key Features

### Website Sections
1. **Mega Menu Navigation**: Comprehensive dropdown navigation with Solutions, Industries, Resources, About sections
   - Solutions: ProActive Ecosystem (Office, Business, Enterprise tiers)
   - Industries: Healthcare, Law Firms, Accounting, Real Estate, Nonprofits
   - Resources: Case Studies, Blog, Videos, Tools (Calculators, Checklists)
   - About: Company information and client-focused content
   - Includes "Get Protected Now" CTA and Client Portal link
2. **Hero Section**: Cybersecurity-focused messaging with free assessment form
3. **Alert Banner**: Critical security alerts for Arizona businesses
4. **Services**: Six core security services with icons and descriptions
5. **How We Protect Your Business**: 4-step process visualization
6. **Interactive Calculators**: Downtime cost and service pricing estimators
7. **Industries We Serve**: Targeted industry solutions
8. **Pricing**: Three-tier transparent pricing model ($165-$345/user)
9. **Testimonials**: Carousel with navigation for client reviews
10. **FAQ Section**: Expandable questions and answers
11. **Free Pen Test Offer**: $20,000 value security assessment
12. **Contact**: Comprehensive contact form with Chandler office location
13. **Footer**: Industry links, resources, and emergency hotline

### Design Features
- **Modern Gradients**: Purple to blue gradient themes throughout
- **Security Icons**: Shield, lock, and security-focused iconography
- **Responsive Design**: Mobile-first approach with breakpoint optimization
- **Professional Typography**: Clean, readable fonts with proper hierarchy
- **Trust Indicators**: Certifications, statistics, and client testimonials
- **Urgency Elements**: Alert banners and security statistics

## Project Structure
```
├── client/
│   ├── public/          # Static assets
│   └── src/
│       ├── components/  # Reusable UI components (shadcn/ui)
│       ├── hooks/       # Custom React hooks
│       ├── lib/         # Utilities (API client, WebSocket, query client)
│       ├── pages/       # Page components
│       │   ├── DigeratiHomepage.tsx  # Main MSP/MSSP website
│       │   └── Homepage.tsx          # Legacy component (unused)
│       └── App.tsx      # Main application component
├── server/
│   ├── index.ts         # Server entry point
│   ├── routes.ts        # API routes (unused for landing page)
│   ├── storage.ts       # Database operations (unused)
│   ├── db.ts            # Database connection
│   └── vite.ts          # Vite dev server integration
├── shared/
│   └── schema.ts        # Database schema (unused for landing page)
└── package.json         # Dependencies and scripts
```

## Development Workflow

### Running the Application
```bash
npm run dev          # Start development server (port 5000)
npm run build        # Build for production
npm start            # Start production server
```

### Database Management (Currently Unused)
```bash
npm run db:push      # Push schema changes to database
npm run check        # TypeScript type checking
```

### Environment Variables
The application uses the following environment variables (automatically configured in Replit):
- `DATABASE_URL`: PostgreSQL connection string
- `PORT`: Server port (default: 5000)
- `NODE_ENV`: Environment mode (development/production)

## Content Strategy

### Target Audience
- Small to medium businesses in Arizona
- Companies needing HIPAA, PCI DSS compliance
- Organizations concerned about ransomware and cyber threats
- Businesses looking to reduce IT costs while improving security

### Key Messaging
- **Primary**: "Hackers Don't Wait. Protect Your Business Now"
- **Value Props**: 24/7 protection, reduced cyber liability, compliance assurance
- **Urgency**: Statistics about breach costs and frequency
- **Trust**: Local presence, certifications, client testimonials

### SEO Optimization
- **Title**: "Digerati Experts - Managed Security Service Provider | Chandler, AZ"
- **Description**: "Arizona's trusted MSP/MSSP. Get 24/7 cybersecurity monitoring, managed IT services, and compliance support. Protect your business from hackers today."
- **Keywords**: MSP, MSSP, managed security, cybersecurity, Chandler Arizona, IT support

## Future Enhancements (Potential)
- Client portal integration
- Real-time threat dashboard
- Security blog and resources section
- Automated vulnerability assessment tool
- Integration with ticketing system
- Live chat support
- Security training portal
- API for client security metrics

## Notes
- The website is optimized for conversion with multiple CTAs and forms
- Emergency support phone number is prominently displayed
- Uses fear-based marketing balanced with solution-focused messaging
- Backend infrastructure exists but is unused (could be leveraged for client portal)
- All IDs use UUID format for future scalability
- The application is ready for production deployment
