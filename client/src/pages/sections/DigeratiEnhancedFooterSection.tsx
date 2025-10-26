import { Shield, Phone, Mail, MapPin, Linkedin, Twitter, Facebook, Instagram, ExternalLink, Lock, FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const DigeratiEnhancedFooterSection = (): JSX.Element => {
  const currentYear = new Date().getFullYear();

  const quickAccess = [
    { name: "Client Portal", href: "https://portal.digerati-experts.com" },
    { name: "Submit Ticket", href: "#" },
    { name: "Remote Support", href: "#" },
    { name: "Pay Invoice", href: "#" },
    { name: "Knowledge Base", href: "#" },
    { name: "System Status", href: "#" }
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
    { name: "MSA", badge: "v2025.1", href: "#" },
    { name: "SLA", badge: "v2025.1", href: "#" },
    { name: "AUP", badge: "v2025.1", href: "#" },
    { name: "DPA", badge: "v2025.1", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Use", href: "#" },
    { name: "Sample SOW", href: "#" }
  ];

  const trust = [
    { name: "Trust Center", href: "#" },
    { name: "Status Page", href: "#" },
    { name: "Vulnerability Disclosure", href: "#" },
    { name: "security.txt", href: "#" },
    { name: "Accessibility", href: "#" }
  ];

  const locations = [
    { name: "Chandler", primary: true },
    { name: "Phoenix", primary: false },
    { name: "Gilbert", primary: false },
    { name: "Tempe", primary: false },
    { name: "Mesa", primary: false },
    { name: "Scottsdale", primary: false }
  ];

  const partners = [
    { name: "Microsoft Partner", verified: true },
    { name: "Apple Consultants", verified: true },
    { name: "SOC 2 Type II", verified: true }
  ];

  return (
    <footer className="bg-gradient-to-b from-slate-900 via-slate-950 to-black">
      {/* Main footer content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        {/* Logo and company info section */}
        <div className="mb-12">
          <div className="text-3xl font-bold">
            <span className="text-yellow-400" style={{fontWeight: '300', letterSpacing: '0.05em'}}>DIGERATI</span>
            <span className="text-white ml-1" style={{fontWeight: '400'}}>Experts</span>
          </div>
        </div>

        {/* Footer columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12">
          {/* Quick Access */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Quick Access</h4>
            <ul className="space-y-3">
              {quickAccess.map((item, index) => (
                <li key={index}>
                  <a 
                    href={item.href} 
                    className="text-gray-400 hover:text-purple-400 text-sm transition-colors"
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
            <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Services</h4>
            <ul className="space-y-3">
              {services.map((item, index) => (
                <li key={index}>
                  <a 
                    href={item.href} 
                    className="text-gray-400 hover:text-purple-400 text-sm transition-colors"
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
            <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Legal</h4>
            <ul className="space-y-3">
              {legal.map((item, index) => (
                <li key={index}>
                  <a 
                    href={item.href} 
                    className="text-gray-400 hover:text-purple-400 text-sm transition-colors inline-flex items-center gap-2"
                    data-testid={`footer-legal-${index}`}
                  >
                    <span>{item.name}</span>
                    {item.badge && (
                      <span className="text-xs bg-purple-600/20 text-purple-300 px-2 py-0.5 rounded">
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
            <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Trust</h4>
            <ul className="space-y-3">
              {trust.map((item, index) => (
                <li key={index}>
                  <a 
                    href={item.href} 
                    className="text-gray-400 hover:text-purple-400 text-sm transition-colors"
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
        <div className="border-t border-gray-800 py-8">
          <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-lg p-6 mb-8 border border-purple-800/30">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <Shield className="h-6 w-6 text-purple-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-white font-semibold mb-1 flex items-center gap-2">
                    COMPLIANCE READY
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Need SOC 2 or Security Documentation?
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    Request compliance documents for vendor onboarding and security reviews
                  </p>
                </div>
              </div>
              <Button 
                className="bg-white text-purple-700 hover:bg-gray-100 font-semibold px-6 py-2 shadow-lg flex items-center gap-2"
                data-testid="footer-request-docs"
              >
                Request Docs
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Areas Served Section */}
        <div className="border-t border-gray-800 pt-8 pb-6">
          <h4 className="text-gray-400 text-sm font-semibold mb-4 uppercase tracking-wider">
            Serving Greater Phoenix
          </h4>
          <div className="flex flex-wrap gap-4">
            {locations.map((location, index) => (
              <div 
                key={index} 
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-full 
                  ${location.primary 
                    ? 'bg-purple-900/30 border border-purple-700/50 text-purple-300' 
                    : 'bg-gray-800/50 border border-gray-700/50 text-gray-400'}
                  transition-all hover:bg-purple-900/40 hover:border-purple-700/70 hover:text-purple-300
                `}
                data-testid={`footer-location-${location.name.toLowerCase()}`}
              >
                <MapPin className="h-3 w-3" />
                <span className="text-sm font-medium">{location.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Partner Badges Section */}
        <div className="border-t border-gray-800 pt-6 pb-4">
          <div className="flex flex-wrap items-center gap-6">
            {partners.map((partner, index) => (
              <div 
                key={index}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-lg border border-gray-700/50"
                data-testid={`footer-partner-${index}`}
              >
                {partner.verified && (
                  <Shield className="h-4 w-4 text-green-400" />
                )}
                <span className="text-gray-300 text-sm font-medium">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom section with social and copyright */}
        <div className="border-t border-gray-800 pt-6 pb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Social links */}
            <div className="flex items-center gap-4">
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
                data-testid="footer-linkedin"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
                data-testid="footer-twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
                data-testid="footer-facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
                data-testid="footer-instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
            
            {/* Copyright */}
            <div className="text-gray-400 text-sm text-center">
              © {currentYear} Digerati Experts, LLC. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};