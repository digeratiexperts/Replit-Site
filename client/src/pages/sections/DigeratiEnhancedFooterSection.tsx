import { Shield, Phone, Mail, MapPin, Linkedin, Twitter, Facebook, Instagram, ExternalLink, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export const DigeratiEnhancedFooterSection = (): JSX.Element => {
  const currentYear = new Date().getFullYear();

  const quickAccess = [
    { name: "Client Portal", href: "#", icon: <ExternalLink className="h-3 w-3" /> },
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
    "Chandler",
    "Phoenix", 
    "Gilbert",
    "Tempe",
    "Mesa",
    "Scottsdale"
  ];

  const certifications = [
    { name: "Microsoft Partner", icon: "🏆" },
    { name: "Apple Consultants", icon: "🍎" },
    { name: "SOC 2 Type II", icon: "🔒" }
  ];

  return (
    <footer className="bg-gradient-to-b from-slate-900 to-black pt-16 pb-8">
      {/* Main footer content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-gray-800">
          {/* Company info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-white rounded-lg p-2">
                <img 
                  src="/logo.png" 
                  alt="Digerati Experts" 
                  className="h-8 w-auto object-contain"
                />
              </div>
              <div>
                <h3 className="text-white font-bold">DIGERATI</h3>
                <p className="text-xs text-gray-400">Experts</p>
              </div>
            </div>
            
            <p className="text-gray-400 text-sm mb-4">
              Your trusted partner for managed IT, cybersecurity, and compliance.
            </p>

            {/* Social links */}
            <div className="flex gap-3">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Access */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Access</h4>
            <ul className="space-y-2">
              {quickAccess.map((item, index) => (
                <li key={index}>
                  <a 
                    href={item.href} 
                    className="text-gray-400 hover:text-purple-400 text-sm transition-colors flex items-center gap-1"
                  >
                    {item.icon}
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {services.map((item, index) => (
                <li key={index}>
                  <a 
                    href={item.href} 
                    className="text-gray-400 hover:text-purple-400 text-sm transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              {legal.map((item, index) => (
                <li key={index}>
                  <a 
                    href={item.href} 
                    className="text-gray-400 hover:text-purple-400 text-sm transition-colors flex items-center gap-2"
                  >
                    {item.name}
                    {item.badge && (
                      <span className="text-xs bg-purple-600/20 text-purple-400 px-1.5 py-0.5 rounded">
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
            <h4 className="text-white font-semibold mb-4">Trust</h4>
            <ul className="space-y-2">
              {trust.map((item, index) => (
                <li key={index}>
                  <a 
                    href={item.href} 
                    className="text-gray-400 hover:text-purple-400 text-sm transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Compliance section */}
        <div className="py-8 border-b border-gray-800">
          <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-lg p-6 border border-purple-500/20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Lock className="h-6 w-6 text-purple-400" />
                <div>
                  <h5 className="text-white font-semibold">Need SOC 2 or Security Documentation?</h5>
                  <p className="text-gray-400 text-sm">Request compliance documents for vendor onboarding and security reviews</p>
                </div>
              </div>
              <Button 
                variant="outline"
                className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
              >
                Request Docs →
              </Button>
            </div>
          </div>
        </div>

        {/* Locations and certifications */}
        <div className="py-8 border-b border-gray-800">
          <div className="text-center mb-6">
            <h5 className="text-gray-400 text-sm uppercase tracking-wider mb-4">Serving Greater Phoenix</h5>
            <div className="flex flex-wrap justify-center gap-4">
              {locations.map((location, index) => (
                <button
                  key={index}
                  className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors text-sm flex items-center gap-1"
                >
                  <MapPin className="h-3 w-3" />
                  {location}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mt-8">
            {certifications.map((cert, index) => (
              <div key={index} className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-lg">
                <span className="text-2xl">{cert.icon}</span>
                <span className="text-gray-300 text-sm font-medium">{cert.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright and final info */}
        <div className="pt-8 text-center">
          <p className="text-gray-500 text-sm mb-2">
            © {currentYear} Digerati Experts, LLC. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs">
            Proudly Protecting Businesses Since [Year] | 
            <span className="mx-2">Arizona Technology Council Member</span> | 
            <span className="ml-2">BBB A+ Rated</span>
          </p>
        </div>
      </div>
    </footer>
  );
};