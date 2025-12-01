import { Shield, Phone, Mail, MapPin, Linkedin, Twitter, Facebook, Instagram, ExternalLink, Lock, FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImage from '@assets/DE-Logo-new_1762461524794.webp';

export const DigeratiEnhancedFooterSection = (): JSX.Element => {
  const currentYear = new Date().getFullYear();

  const quickAccess = [
    { name: "Client Portal", href: "https://portal.digeratiexperts.com/portal/login" },
    { name: "Submit Ticket", href: "/support/submit-ticket" },
    { name: "Remote Support", href: "/support/remote-support" },
    { name: "Pay Invoice", href: "/support/pay-invoice" },
    { name: "Knowledge Base", href: "/support/knowledge-base" },
    { name: "System Status", href: "/support/system-status" }
  ];

  const services = [
    { name: "Managed IT", href: "#services" },
    { name: "Cybersecurity", href: "#services" },
    { name: "Compliance & Risk", href: "#services" },
    { name: "Backup & DR", href: "#services" },
    { name: "Networking", href: "#services" },
    { name: "UCaaS & VoIP", href: "#services" }
  ];

  const legal = [
    { name: "MSA", badge: "v2025.1", href: "/legal/msa" },
    { name: "SLA", badge: "v2025.1", href: "/legal/sla" },
    { name: "AUP", badge: "v2025.1", href: "/legal/aup" },
    { name: "DPA", badge: "v2025.1", href: "/legal/dpa" },
    { name: "Privacy Policy", href: "/legal/privacy-policy" },
    { name: "Terms of Use", href: "/legal/terms-of-use" },
    { name: "Sample SOW", href: "/legal/sample-sow" }
  ];

  const trust = [
    { name: "Trust Center", href: "/trust/trust-center" },
    { name: "Status Page", href: "/support/system-status" },
    { name: "Vulnerability Disclosure", href: "/trust/vulnerability-disclosure" },
    { name: "security.txt", href: "/.well-known/security.txt" },
    { name: "Accessibility", href: "/trust/accessibility" }
  ];

  const locations = [
    { name: "Chandler", href: "/locations/chandler-az", primary: true },
    { name: "Phoenix", href: "/locations/phoenix-az", primary: false },
    { name: "Gilbert", href: "/locations/gilbert-az", primary: false },
    { name: "Tempe", href: "/locations/tempe-az", primary: false },
    { name: "Mesa", href: "/locations/mesa-az", primary: false },
    { name: "Scottsdale", href: "/locations/scottsdale-az", primary: false }
  ];

  const partners = [
    { name: "Microsoft Partner", verified: true },
    { name: "Apple Consultants", verified: true },
    { name: "SOC 2 Type II", verified: true }
  ];

  return (
    <footer className="bg-gradient-to-b from-[#030228] via-[#0f0d2e] to-[#1a1545] border-t border-white/10">
      {/* Main footer content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 max-w-[1440px]">
        {/* Logo and company info section */}
        <div className="mb-12 pl-4 md:pl-8 lg:pl-0">
          <img 
            src={logoImage} 
            alt="Digerati Experts Logo" 
            className="h-12 w-auto"
            data-testid="logo-footer"
          />
        </div>

        {/* Footer columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 px-4 md:px-8 lg:px-0">
          {/* Quick Access */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider [font-family:'Poppins',Helvetica]">Quick Access</h4>
            <ul className="space-y-3">
              {quickAccess.map((item, index) => (
                <li key={index}>
                  <a 
                    href={item.href} 
                    className="text-gray-300 hover:text-white text-sm transition-colors [font-family:'Poppins',Helvetica] font-normal"
                    data-testid={`footer-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider [font-family:'Poppins',Helvetica]">Services</h4>
            <ul className="space-y-3">
              {services.map((item, index) => (
                <li key={index}>
                  <a 
                    href={item.href} 
                    className="text-gray-300 hover:text-white text-sm transition-colors [font-family:'Poppins',Helvetica] font-normal"
                    data-testid={`footer-service-${index}`}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider [font-family:'Poppins',Helvetica]">Legal</h4>
            <ul className="space-y-3">
              {legal.map((item, index) => (
                <li key={index}>
                  <a 
                    href={item.href} 
                    className="text-gray-300 hover:text-white text-sm transition-colors inline-flex items-center gap-2 [font-family:'Poppins',Helvetica] font-normal"
                    data-testid={`footer-legal-${index}`}
                  >
                    <span>{item.name}</span>
                    {item.badge && (
                      <span className="text-xs bg-white text-[#5034ff] px-2 py-0.5 rounded">
                        {item.badge}
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider [font-family:'Poppins',Helvetica]">Trust</h4>
            <ul className="space-y-3">
              {trust.map((item, index) => (
                <li key={index}>
                  <a 
                    href={item.href} 
                    className="text-gray-300 hover:text-white text-sm transition-colors [font-family:'Poppins',Helvetica] font-normal"
                    data-testid={`footer-trust-${index}`}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Compliance Section */}
        <div className="border-t border-white/10 py-8 px-4 md:px-8 lg:px-0">
          <div className="bg-white rounded-lg p-6 mb-8 shadow-lg">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <Shield className="h-6 w-6 text-[#5034ff] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-[#030228] font-semibold mb-1 flex items-center gap-2 [font-family:'Poppins',Helvetica]">
                    COMPLIANCE READY
                  </h3>
                  <p className="text-gray-700 text-sm [font-family:'Poppins',Helvetica] font-normal">
                    Need SOC 2 or Security Documentation?
                  </p>
                  <p className="text-gray-600 text-sm mt-1 [font-family:'Poppins',Helvetica] font-normal">
                    Request compliance documents for vendor onboarding and security reviews
                  </p>
                </div>
              </div>
              <a
                href="https://meet.digerati-experts.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#5034ff] text-white hover:bg-[#4028dd] font-semibold px-6 py-2 shadow-lg rounded [font-family:'Poppins',Helvetica] whitespace-nowrap transition-all"
                data-testid="footer-request-docs"
              >
                Request Docs
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Areas Served Section */}
        <div className="border-t border-white/10 pt-8 pb-8 px-4 md:px-8 lg:px-0">
          <h4 className="text-white text-sm font-semibold mb-6 uppercase tracking-wider [font-family:'Poppins',Helvetica]">
            Serving Greater Phoenix
          </h4>
          <div className="flex flex-wrap gap-3">
            {locations.map((location, index) => (
              <a
                key={index}
                href={location.href}
                className={`
                  px-4 py-2 rounded-lg font-medium transition-all duration-300 text-sm [font-family:'Poppins',Helvetica]
                  ${location.primary 
                    ? 'text-white hover:bg-[#5034ff]/20' 
                    : 'text-gray-400 hover:text-white hover:bg-white/10'}
                `}
                data-testid={`footer-location-${location.name.toLowerCase()}`}
              >
                {location.name}
              </a>
            ))}
          </div>
        </div>

        {/* Partner Badges Section */}
        <div className="border-t border-white/10 pt-8 pb-6 px-4 md:px-8 lg:px-0">
          <h4 className="text-white text-sm font-semibold mb-6 uppercase tracking-wider [font-family:'Poppins',Helvetica]">
            Certifications & Partnerships
          </h4>
          <div className="flex flex-wrap items-center gap-6">
            {partners.map((partner, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors [font-family:'Poppins',Helvetica]"
                data-testid={`footer-partner-${index}`}
              >
                {partner.verified && (
                  <Shield className="h-5 w-5 text-[#5034ff] flex-shrink-0" />
                )}
                <span className="text-sm font-medium">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom section with social and copyright */}
        <div className="border-t border-white/10 pt-6 pb-8 px-4 md:px-8 lg:px-0">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Social links */}
            <div className="flex items-center gap-4">
              <a 
                href="https://www.linkedin.com/company/digerati-experts" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#5034ff] transition-colors"
                aria-label="LinkedIn"
                data-testid="footer-linkedin"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com/digerati_experts" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#5034ff] transition-colors"
                aria-label="Twitter"
                data-testid="footer-twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="https://www.facebook.com/digeratiexperts" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#5034ff] transition-colors"
                aria-label="Facebook"
                data-testid="footer-facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://www.instagram.com/digerati.experts" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#5034ff] transition-colors"
                aria-label="Instagram"
                data-testid="footer-instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
            
            {/* Copyright */}
            <div className="text-gray-400 text-sm text-center [font-family:'Poppins',Helvetica] font-normal">
              © {currentYear} Digerati Experts, LLC. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};