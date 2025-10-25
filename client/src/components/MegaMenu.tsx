import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Shield, Server, Users, FileCheck, Phone, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logoImage from '@assets/Transparent_Logo_1761416551861.png';

interface MegaMenuItem {
  title: string;
  icon?: JSX.Element;
  url?: string;
  description?: string;
  badge?: string;
}

interface MegaMenuSection {
  title: string;
  items: MegaMenuItem[];
  featured?: boolean;
}

interface NavItem {
  name: string;
  sections?: MegaMenuSection[];
  href?: string;
  isSimple?: boolean;
}

export function MegaMenu() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const navItems: NavItem[] = [
    {
      name: 'Solutions',
      sections: [
        {
          title: 'ProActive Ecosystem',
          items: [
            { title: 'Office Package', description: 'Complete IT management for small offices', icon: <Server className="h-5 w-5" /> },
            { title: 'Managed IT Support', description: 'Full-service IT support and maintenance', icon: <Shield className="h-5 w-5" /> },
            { title: 'Managed Workplace', description: 'End-to-end workplace technology management', icon: <Users className="h-5 w-5" /> },
            { title: 'Cloud Backup', description: 'Secure cloud backup and recovery', icon: <FileCheck className="h-5 w-5" /> },
            { title: 'Security Awareness', description: 'Employee security training programs', icon: <Shield className="h-5 w-5" /> },
          ]
        },
        {
          title: 'Business Solutions',
          featured: true,
          items: [
            { title: 'Co-Managed IT', description: 'Augment your existing IT team', badge: 'Popular' },
            { title: 'Threat Detection & Response', description: '24/7 monitoring and incident response' },
            { title: 'Security Operations', description: 'Full SOC-as-a-Service' },
            { title: 'Backup & Disaster Recovery', description: 'Complete business continuity' },
          ]
        },
        {
          title: 'Enterprise',
          items: [
            { title: 'vCIO & Strategy', description: 'Strategic IT planning and guidance', badge: 'Best for Compliance' },
            { title: 'Data Encryption & Control', description: 'Advanced data protection' },
            { title: 'Compliance & Risk Reports', description: 'Audit-ready documentation' },
            { title: 'Unified Security Posture', description: 'Comprehensive security management' },
          ]
        }
      ]
    },
    {
      name: 'Industries',
      sections: [
        {
          title: 'Industries We Serve',
          items: [
            { title: 'Healthcare', description: 'HIPAA-compliant IT solutions', icon: <Shield className="h-5 w-5" /> },
            { title: 'Law Firms', description: 'Secure document management', icon: <FileCheck className="h-5 w-5" /> },
            { title: 'Accounting & Finance', description: 'PCI DSS compliance support', icon: <Server className="h-5 w-5" /> },
            { title: 'Real Estate', description: 'Transaction security solutions', icon: <Users className="h-5 w-5" /> },
            { title: 'Nonprofits', description: 'Cost-effective IT management', icon: <Shield className="h-5 w-5" /> },
          ]
        },
        {
          title: 'Why Digerati',
          items: [
            { title: 'Audit-Ready Docs', description: 'Complete compliance documentation' },
            { title: 'Rapid Response', description: '15-minute response time guarantee' },
            { title: 'Insurance Aligned', description: 'Meets carrier requirements' },
          ]
        }
      ]
    },
    {
      name: 'Resources',
      sections: [
        {
          title: 'Learn',
          items: [
            { title: 'Case Studies', description: 'Real-world success stories' },
            { title: 'Blog & News', description: 'Latest security insights' },
            { title: 'Videos & Webinars', description: 'Educational content library' },
          ]
        },
        {
          title: 'Tools',
          items: [
            { title: 'Downtime Calculator', description: 'Calculate your downtime costs' },
            { title: 'Security Checklist', description: 'Complete security assessment' },
            { title: 'Datasheets', description: 'Technical specifications' },
          ]
        }
      ]
    },
    {
      name: 'Pricing',
      href: '#pricing',
      isSimple: true
    },
    {
      name: 'About',
      sections: [
        {
          title: 'Is This You?',
          items: [
            { title: 'Frustrated with IT?', description: 'Slow response and recurring issues' },
            { title: 'Worried about Security?', description: 'Concerned about ransomware and breaches' },
            { title: 'Need Compliance?', description: 'HIPAA, SOC 2, or FTC requirements' },
          ]
        },
        {
          title: 'Company',
          items: [
            { title: 'Mission & Values', description: 'Our commitment to partnership' },
            { title: 'Case Studies', description: 'Arizona business success stories' },
            { title: 'Meet The Experts', description: 'Our certified Chandler team' },
          ]
        }
      ]
    },
    {
      name: 'Contact',
      href: '#contact',
      isSimple: true
    }
  ];

  const handleMouseEnter = (name: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveMenu(name);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 100);
  };

  const handleMenuMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16 px-4 lg:px-8">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <a href="/" className="flex items-center">
              <img 
                src={logoImage} 
                alt="Digerati Experts" 
                className="h-12 w-auto object-contain" 
                style={{ maxWidth: '180px' }}
              />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => !item.isSimple && handleMouseEnter(item.name)}
                  onMouseLeave={handleMouseLeave}
                >
                  {item.isSimple ? (
                    <a
                      href={item.href}
                      className="px-3 py-2 text-gray-700 hover:text-purple-600 font-medium transition-colors"
                      data-testid={`nav-${item.name.toLowerCase()}`}
                    >
                      {item.name}
                    </a>
                  ) : (
                    <button
                      className={`px-3 py-2 text-gray-700 hover:text-purple-600 font-medium transition-colors flex items-center ${
                        activeMenu === item.name ? 'text-purple-600' : ''
                      }`}
                      data-testid={`nav-${item.name.toLowerCase()}`}
                    >
                      {item.name}
                      <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${
                        activeMenu === item.name ? 'rotate-180' : ''
                      }`} />
                    </button>
                  )}

                  {/* Mega Menu Dropdown */}
                  {item.sections && activeMenu === item.name && (
                    <div
                      className="absolute left-0 mt-0 w-screen max-w-7xl bg-white shadow-xl rounded-b-lg border-t-4 border-purple-600"
                      onMouseEnter={handleMenuMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="p-8 grid grid-cols-3 gap-8">
                        {item.sections.map((section) => (
                          <div key={section.title}>
                            <h3 className={`font-bold text-lg mb-4 ${
                              section.featured ? 'text-purple-600' : 'text-gray-900'
                            }`}>
                              {section.title}
                              {section.featured && (
                                <span className="ml-2 text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded">
                                  Popular
                                </span>
                              )}
                            </h3>
                            <ul className="space-y-3">
                              {section.items.map((subItem) => (
                                <li key={subItem.title}>
                                  <a
                                    href={subItem.url || '#'}
                                    className="group flex items-start space-x-3 hover:bg-gray-50 p-2 rounded-lg transition-colors"
                                  >
                                    {subItem.icon && (
                                      <span className="text-purple-600 mt-0.5">{subItem.icon}</span>
                                    )}
                                    <div className="flex-1">
                                      <div className="flex items-center">
                                        <span className="font-medium text-gray-900 group-hover:text-purple-600">
                                          {subItem.title}
                                        </span>
                                        {subItem.badge && (
                                          <span className="ml-2 text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded">
                                            {subItem.badge}
                                          </span>
                                        )}
                                      </div>
                                      {subItem.description && (
                                        <p className="text-sm text-gray-600 mt-1">
                                          {subItem.description}
                                        </p>
                                      )}
                                    </div>
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Phone Number */}
            <a
              href="tel:480-519-5892"
              className="hidden lg:flex items-center text-purple-600 hover:text-purple-700 font-semibold"
              data-testid="nav-phone"
            >
              <Phone className="h-4 w-4 mr-2" />
              (480) 519-5892
            </a>

            {/* Client Portal */}
            <a
              href="https://portal.digerati-experts.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center text-gray-700 hover:text-purple-600 font-medium"
              data-testid="client-portal"
            >
              Client Portal
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>

            {/* Get Protected Now CTA */}
            <Button
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
              data-testid="nav-cta"
              onClick={() => window.location.href = '#assessment'}
            >
              Get Protected Now
            </Button>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="mobile-menu-toggle"
            >
              <svg className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t">
            <div className="p-4 space-y-3">
              {navItems.map((item) => (
                <div key={item.name}>
                  {item.isSimple ? (
                    <a
                      href={item.href}
                      className="block py-2 text-gray-700 hover:text-purple-600 font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                  ) : (
                    <details className="group">
                      <summary className="flex items-center justify-between py-2 text-gray-700 hover:text-purple-600 font-medium cursor-pointer">
                        {item.name}
                        <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                      </summary>
                      {item.sections && (
                        <div className="mt-2 ml-4 space-y-2">
                          {item.sections.map((section) => (
                            <div key={section.title} className="mb-3">
                              <h4 className="font-semibold text-purple-600 mb-2">{section.title}</h4>
                              {section.items.map((subItem) => (
                                <a
                                  key={subItem.title}
                                  href={subItem.url || '#'}
                                  className="block py-1 text-sm text-gray-600 hover:text-purple-600"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  {subItem.title}
                                </a>
                              ))}
                            </div>
                          ))}
                        </div>
                      )}
                    </details>
                  )}
                </div>
              ))}
              
              {/* Mobile Actions */}
              <div className="pt-4 border-t space-y-3">
                <a
                  href="tel:480-519-5892"
                  className="flex items-center text-purple-600 font-semibold"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  (480) 519-5892
                </a>
                <a
                  href="https://portal.digerati-experts.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-700 hover:text-purple-600"
                >
                  Client Portal
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
                <Button
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    window.location.href = '#assessment';
                  }}
                >
                  Get Protected Now
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}