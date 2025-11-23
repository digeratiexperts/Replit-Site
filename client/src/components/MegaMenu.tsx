import { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronDown, Shield, Server, Users, FileCheck, Phone, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logoImage from '@assets/DE-Logo-new_1762461524794.webp';

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
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const [isScrolled, setIsScrolled] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const menuContainerRef = useRef<HTMLDivElement>(null);
  const navButtonsRef = useRef<Map<string, HTMLButtonElement>>(new Map());
  const dropdownRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const navItems: NavItem[] = [
    {
      name: 'Solutions',
      sections: [
        {
          title: 'Overview',
          items: [
            { title: 'All Solutions', description: 'Browse all available solutions', icon: <Server className="h-5 w-5" />, url: '/solutions', badge: 'View All' },
          ]
        },
        {
          title: 'ProActive Ecosystem',
          items: [
            { title: 'Office Package', description: 'Complete IT management for small offices', icon: <Server className="h-5 w-5" />, url: '/solutions/office-package' },
            { title: 'Managed IT Support', description: 'Full-service IT support and maintenance', icon: <Shield className="h-5 w-5" />, url: '/solutions/managed-it-support' },
            { title: 'Managed Workplace', description: 'End-to-end workplace technology management', icon: <Users className="h-5 w-5" />, url: '/solutions/managed-workplace' },
            { title: 'Cloud Backup', description: 'Secure cloud backup and recovery', icon: <FileCheck className="h-5 w-5" />, url: '/solutions/cloud-backup' },
            { title: 'Security Awareness', description: 'Employee security training programs', icon: <Shield className="h-5 w-5" />, url: '/solutions/security-awareness' },
          ]
        },
        {
          title: 'Business Solutions',
          featured: true,
          items: [
            { title: 'Co-Managed IT', description: 'Augment your existing IT team', badge: 'Popular', url: '/solutions/co-managed-it' },
            { title: 'Threat Detection & Response', description: '24/7 monitoring and incident response', url: '/solutions/threat-detection' },
            { title: 'Security Operations', description: 'Full SOC-as-a-Service', url: '/solutions/security-operations' },
            { title: 'Backup & Disaster Recovery', description: 'Complete business continuity', url: '/solutions/backup-disaster-recovery' },
          ]
        },
        {
          title: 'Enterprise',
          items: [
            { title: 'vCIO & Strategy', description: 'Strategic IT planning and guidance', badge: 'Best for Compliance', url: '/solutions/vcio-strategy' },
            { title: 'Data Encryption & Control', description: 'Advanced data protection', url: '/solutions/data-encryption' },
            { title: 'Compliance & Risk Reports', description: 'Audit-ready documentation', url: '/solutions/compliance-reports' },
            { title: 'Unified Security Posture', description: 'Comprehensive security management', url: '/solutions/unified-security' },
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
            { title: 'Healthcare', description: 'HIPAA-compliant IT solutions', icon: <Shield className="h-5 w-5" />, url: '/industries/healthcare' },
            { title: 'Law Firms', description: 'Secure document management', icon: <FileCheck className="h-5 w-5" />, url: '/industries/law-firms' },
            { title: 'Accounting & Finance', description: 'PCI DSS compliance support', icon: <Server className="h-5 w-5" />, url: '/industries/accounting-finance' },
            { title: 'Real Estate', description: 'Transaction security solutions', icon: <Users className="h-5 w-5" />, url: '/industries/real-estate' },
            { title: 'Nonprofits', description: 'Cost-effective IT management', icon: <Shield className="h-5 w-5" />, url: '/industries/nonprofits' },
          ]
        },
        {
          title: 'Why Digerati',
          items: [
            { title: 'Audit-Ready Docs', description: 'Complete compliance documentation', url: '/about/compliance' },
            { title: 'Rapid Response', description: '15-minute response time guarantee', url: '/about/support' },
            { title: 'Insurance Aligned', description: 'Meets carrier requirements', url: '/about/insurance' },
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
            { title: 'Case Studies', description: 'Real-world success stories', url: '/resources/case-studies' },
            { title: 'Blog & News', description: 'Latest security insights', url: '/resources/blog' },
            { title: 'Videos & Webinars', description: 'Educational content library', url: '/resources/videos' },
          ]
        },
        {
          title: 'Tools',
          items: [
            { title: 'Downtime Calculator', description: 'Calculate your downtime costs', url: '#calculators' },
            { title: 'Security Checklist', description: 'Complete security assessment', url: '/resources/security-checklist' },
            { title: 'Datasheets', description: 'Technical specifications', url: '/resources/datasheets' },
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
            { title: 'Mission & Values', description: 'Our commitment to partnership', url: '/about/mission-values' },
            { title: 'Case Studies', description: 'Arizona business success stories', url: '/resources/case-studies' },
            { title: 'Meet The Experts', description: 'Our certified Chandler team', url: '/about/team' },
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

  // Explicitly close menu - used by keyboard, click outside, and link clicks
  const closeMenu = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveMenu(null);
    setFocusedIndex(-1);
  }, []);

  // Close mobile menu
  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Escape key closes menu
    if (event.key === 'Escape') {
      closeMenu();
      closeMobileMenu();
      // Return focus to the button that opened the menu
      if (activeMenu && navButtonsRef.current.get(activeMenu)) {
        navButtonsRef.current.get(activeMenu)?.focus();
      }
      return;
    }

    // Arrow key navigation for desktop menu
    if (!mobileMenuOpen && activeMenu) {
      const menuItems = navItems.filter(item => !item.isSimple);
      const currentIndex = menuItems.findIndex(item => item.name === activeMenu);

      if (event.key === 'ArrowLeft' && currentIndex > 0) {
        const prevItem = menuItems[currentIndex - 1];
        setActiveMenu(prevItem.name);
        navButtonsRef.current.get(prevItem.name)?.focus();
      } else if (event.key === 'ArrowRight' && currentIndex < menuItems.length - 1) {
        const nextItem = menuItems[currentIndex + 1];
        setActiveMenu(nextItem.name);
        navButtonsRef.current.get(nextItem.name)?.focus();
      }
    }
  }, [activeMenu, mobileMenuOpen, closeMenu, closeMobileMenu, navItems]);

  // Handle mouse enter with timeout clear
  const handleMouseEnter = useCallback((name: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveMenu(name);
  }, []);

  // Handle mouse leave with delay
  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      closeMenu();
    }, 150);
  }, [closeMenu]);

  // Handle dropdown mouse enter
  const handleDropdownMouseEnter = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  // Handle click on nav button
  const handleNavButtonClick = useCallback((name: string, event: React.MouseEvent) => {
    event.preventDefault();
    if (activeMenu === name) {
      closeMenu();
    } else {
      setActiveMenu(name);
    }
  }, [activeMenu, closeMenu]);

  // Handle link click - close menu when navigating
  const handleLinkClick = useCallback(() => {
    closeMenu();
    closeMobileMenu();
  }, [closeMenu, closeMobileMenu]);

  // Enhanced click outside handler
  useEffect(() => {
    if (!activeMenu) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      // Check if click is on a dropdown trigger button
      const isButtonClick = target.closest('button[data-menu-trigger]');
      if (isButtonClick) {
        // Let the button's onClick handler manage the state
        return;
      }
      
      // Check if click is inside a dropdown
      const isDropdownClick = target.closest('.mega-menu-dropdown');
      if (isDropdownClick) {
        // Don't close if clicking inside dropdown
        return;
      }
      
      // Close menu for any other click
      closeMenu();
    };

    // Use a small delay to avoid immediate closure on open
    const timer = setTimeout(() => {
      document.addEventListener('click', handleClickOutside, true);
    }, 0);
    
    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [activeMenu, closeMenu]);

  // Keyboard event listener
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Top Utility Bar */}
      <div 
        className={`fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-900 to-blue-900 transition-all duration-300 ${
          isScrolled ? 'h-0 overflow-hidden opacity-0' : 'h-10'
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8 h-full flex items-center justify-end">
          <div className="flex items-center space-x-6">
            {/* Phone Number */}
            <a
              href="tel:325-480-9870"
              className="flex items-center text-white/90 hover:text-white text-sm font-medium transition-colors"
              data-testid="utility-phone"
            >
              <Phone className="h-3.5 w-3.5 mr-1.5" />
              <span>325-480-9870</span>
            </a>

            {/* Client Portal */}
            <a
              href="https://portal.digerati-experts.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-white/90 hover:text-white text-sm font-medium transition-colors"
              data-testid="utility-portal"
            >
              Client Portal
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav 
        className={`fixed left-0 right-0 z-50 mega-menu-container bg-black/95 backdrop-blur-sm transition-all duration-300 ${
          isScrolled ? 'top-0 shadow-lg' : 'top-10'
        }`}
        ref={menuContainerRef}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container mx-auto">
          <div className={`flex items-center justify-between px-4 lg:px-8 transition-all duration-300 ${
            isScrolled ? 'h-16' : 'h-20'
          }`}>
            {/* Logo */}
            <div className="flex items-center lg:space-x-12">
              <a href="/" className="flex items-center flex-shrink-0">
                <img 
                  src={logoImage} 
                  alt="Digerati Experts Logo" 
                  className={`transition-all duration-300 ${
                    isScrolled ? 'h-8' : 'h-12'
                  }`}
                  style={{ width: 'auto', maxWidth: '200px' }}
                  data-testid="logo-header"
                />
              </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1 mega-menu-nav">
              {navItems.map((item, index) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => !item.isSimple && handleMouseEnter(item.name)}
                  onMouseLeave={handleMouseLeave}
                >
                  {item.isSimple ? (
                    <a
                      href={item.href}
                      className="px-3 py-2 text-white hover:text-yellow-300 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 rounded"
                      data-testid={`nav-${item.name.toLowerCase()}`}
                      onClick={handleLinkClick}
                      aria-label={`Go to ${item.name}`}
                    >
                      {item.name}
                    </a>
                  ) : (
                    <button
                      ref={(el) => {
                        if (el) navButtonsRef.current.set(item.name, el);
                      }}
                      className={`px-3 py-2 text-white hover:text-yellow-300 font-medium transition-colors flex items-center focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 rounded ${
                        activeMenu === item.name ? 'text-yellow-300' : ''
                      }`}
                      data-testid={`nav-${item.name.toLowerCase()}`}
                      data-menu-trigger="true"
                      onClick={(e) => handleNavButtonClick(item.name, e)}
                      aria-expanded={activeMenu === item.name}
                      aria-haspopup="true"
                      aria-label={`${item.name} menu`}
                    >
                      {item.name}
                      <ChevronDown 
                        className={`ml-1 h-4 w-4 transition-transform ${
                          activeMenu === item.name ? 'rotate-180' : ''
                        }`} 
                        aria-hidden="true"
                      />
                    </button>
                  )}

                  {/* Mega Menu Dropdown */}
                  {item.sections && activeMenu === item.name && (
                    <div
                      ref={(el) => {
                        if (el) dropdownRefs.current.set(item.name, el);
                      }}
                      className="fixed left-0 right-0 top-20 mx-auto w-[90vw] max-w-5xl bg-white shadow-xl rounded-b-lg border-t-4 border-purple-600 mega-menu-dropdown"
                      onMouseEnter={handleDropdownMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      role="menu"
                      aria-label={`${item.name} submenu`}
                    >
                      <div className="p-6 grid grid-cols-3 gap-6">
                        {item.sections.map((section) => (
                          <div key={section.title}>
                            <h3 
                              className={`font-bold text-lg mb-4 ${
                                section.featured ? 'text-purple-600' : 'text-gray-900'
                              }`}
                              id={`menu-section-${section.title.replace(/\s+/g, '-')}`}
                            >
                              {section.title}
                              {section.featured && (
                                <span className="ml-2 text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded">
                                  Popular
                                </span>
                              )}
                            </h3>
                            <ul 
                              className="space-y-3"
                              role="menu"
                              aria-labelledby={`menu-section-${section.title.replace(/\s+/g, '-')}`}
                            >
                              {section.items.map((subItem) => (
                                <li key={subItem.title} role="none">
                                  <a
                                    href={subItem.url || '#'}
                                    className="group flex items-start space-x-3 hover:bg-gray-50 p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    onClick={handleLinkClick}
                                    role="menuitem"
                                    aria-label={`${subItem.title}: ${subItem.description || ''}`}
                                  >
                                    {subItem.icon && (
                                      <span className="text-purple-600 mt-0.5" aria-hidden="true">
                                        {subItem.icon}
                                      </span>
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
            {/* Get Protected Now CTA */}
            <Button
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 border border-purple-500/30"
              data-testid="nav-cta"
              onClick={() => {
                handleLinkClick();
                window.location.href = '#assessment';
              }}
              aria-label="Get protected now - Start your security assessment"
            >
              Get Protected Now
            </Button>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="mobile-menu-toggle"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
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
          <div 
            className="lg:hidden bg-gray-900 border-t border-gray-800"
            role="dialog"
            aria-label="Mobile navigation menu"
          >
            <div className="p-4 space-y-3">
              {navItems.map((item) => (
                <div key={item.name}>
                  {item.isSimple ? (
                    <a
                      href={item.href}
                      className="block py-2 text-gray-700 hover:text-purple-600 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded px-2"
                      onClick={() => setMobileMenuOpen(false)}
                      aria-label={`Go to ${item.name}`}
                    >
                      {item.name}
                    </a>
                  ) : (
                    <details className="group">
                      <summary className="flex items-center justify-between py-2 text-gray-700 hover:text-purple-600 font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded px-2">
                        {item.name}
                        <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" aria-hidden="true" />
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
                                  className="block py-1 text-sm text-gray-600 hover:text-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded px-2"
                                  onClick={() => setMobileMenuOpen(false)}
                                  aria-label={`${subItem.title}: ${subItem.description || ''}`}
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
                  href="tel:325-480-9870"
                  className="flex items-center text-purple-600 font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded px-2 py-1"
                  aria-label="Call us at 325-480-9870"
                >
                  <Phone className="h-4 w-4 mr-2" aria-hidden="true" />
                  325-480-9870
                </a>
                <a
                  href="https://portal.digerati-experts.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-700 hover:text-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded px-2 py-1"
                  aria-label="Access client portal (opens in new window)"
                >
                  Client Portal
                  <ExternalLink className="h-3 w-3 ml-1" aria-hidden="true" />
                </a>
                <Button
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    window.location.href = '#assessment';
                  }}
                  aria-label="Get protected now - Start your security assessment"
                >
                  Get Protected Now
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
    </>
  );
}