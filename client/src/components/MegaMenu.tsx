import { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronDown, Shield, Server, Users, FileCheck, Phone, ExternalLink, X, ArrowRight } from 'lucide-react';
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

  const closeMenu = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveMenu(null);
    setFocusedIndex(-1);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      closeMenu();
      closeMobileMenu();
      if (activeMenu && navButtonsRef.current.get(activeMenu)) {
        navButtonsRef.current.get(activeMenu)?.focus();
      }
      return;
    }

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

  const handleMouseEnter = useCallback((name: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveMenu(name);
  }, []);

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      closeMenu();
    }, 150);
  }, [closeMenu]);

  const handleDropdownMouseEnter = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  const handleNavButtonClick = useCallback((name: string, event: React.MouseEvent) => {
    event.preventDefault();
    if (activeMenu === name) {
      closeMenu();
    } else {
      setActiveMenu(name);
    }
  }, [activeMenu, closeMenu]);

  const handleLinkClick = useCallback(() => {
    closeMenu();
    closeMobileMenu();
  }, [closeMenu, closeMobileMenu]);

  useEffect(() => {
    if (!activeMenu) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      const isButtonClick = target.closest('button[data-menu-trigger]');
      if (isButtonClick) {
        return;
      }
      
      const isDropdownClick = target.closest('.mega-menu-dropdown');
      if (isDropdownClick) {
        return;
      }
      
      closeMenu();
    };

    const timer = setTimeout(() => {
      document.addEventListener('click', handleClickOutside, true);
    }, 0);
    
    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [activeMenu, closeMenu]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        className={`fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-900/90 to-blue-900/90 backdrop-blur-sm transition-all duration-300 ${
          isScrolled ? 'h-0 overflow-hidden opacity-0' : 'h-auto md:h-10'
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8 h-full flex flex-col md:flex-row items-center justify-end py-2 md:py-0">
          <div className="flex items-center flex-wrap gap-2 md:gap-6 justify-center md:justify-end">
            {/* Phone Number */}
            <a
              href="tel:325-480-9870"
              className="flex items-center text-white/90 hover:text-cyan-400 text-xs md:text-sm font-medium transition-colors"
              data-testid="utility-phone"
            >
              <Phone className="h-3.5 w-3.5 mr-1.5" />
              <span className="hidden sm:inline">325-480-9870</span>
              <span className="sm:hidden">Call</span>
            </a>

            {/* Client Portal */}
            <a
              href="https://portal.digeratiexperts.com/portal/login"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-white/90 hover:text-cyan-400 text-xs md:text-sm font-medium transition-colors"
              data-testid="utility-portal"
            >
              <span className="hidden sm:inline">Client Portal</span>
              <span className="sm:hidden">Portal</span>
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav 
        className={`fixed left-0 right-0 z-50 mega-menu-container transition-all duration-300 ${
          isScrolled 
            ? 'top-0 bg-[#050210] backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(139,92,246,0.25)]' 
            : 'top-10 bg-[#0a0118] backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(139,92,246,0.15)]'
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

            {/* Desktop Navigation - Only show at xl breakpoint and above */}
            <div className="hidden xl:flex items-center space-x-1 mega-menu-nav">
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
                      className="group relative px-3 py-2 text-white hover:text-cyan-400 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#0a0118] rounded"
                      data-testid={`nav-${item.name.toLowerCase()}`}
                      onClick={handleLinkClick}
                      aria-label={`Go to ${item.name}`}
                    >
                      {item.name}
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 group-hover:w-full transition-all duration-300" />
                    </a>
                  ) : (
                    <button
                      ref={(el) => {
                        if (el) navButtonsRef.current.set(item.name, el);
                      }}
                      className={`group relative px-3 py-2 text-white hover:text-cyan-400 font-medium transition-colors flex items-center focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#0a0118] rounded ${
                        activeMenu === item.name ? 'text-cyan-400' : ''
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
                      <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300 ${
                        activeMenu === item.name ? 'w-full' : 'w-0 group-hover:w-full'
                      }`} />
                    </button>
                  )}

                  {/* Mega Menu Dropdown */}
                  {item.sections && activeMenu === item.name && (
                    <div
                      ref={(el) => {
                        if (el) dropdownRefs.current.set(item.name, el);
                      }}
                      className="fixed left-0 right-0 top-20 mx-auto w-[90vw] max-w-5xl bg-[#0d0720]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-[0_20px_60px_rgba(139,92,246,0.3)] mega-menu-dropdown"
                      onMouseEnter={handleDropdownMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      role="menu"
                      aria-label={`${item.name} submenu`}
                    >
                      <div className="p-6 grid grid-cols-3 gap-6 relative">
                        {item.sections.map((section) => (
                          <div key={section.title}>
                            <h3 
                              className={`font-bold text-lg mb-4 ${
                                section.featured ? 'text-cyan-400' : 'text-white'
                              }`}
                              id={`menu-section-${section.title.replace(/\s+/g, '-')}`}
                            >
                              {section.title}
                              {section.featured && (
                                <span className="ml-2 text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded border border-purple-500/30">
                                  Popular
                                </span>
                              )}
                            </h3>
                            <ul 
                              className="space-y-2"
                              role="menu"
                              aria-labelledby={`menu-section-${section.title.replace(/\s+/g, '-')}`}
                            >
                              {section.items.map((subItem) => (
                                <li key={subItem.title} role="none">
                                  <a
                                    href={subItem.url || '#'}
                                    className="group/item flex items-start space-x-3 hover:bg-white/5 p-2 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500 border border-transparent hover:border-white/10"
                                    onClick={handleLinkClick}
                                    role="menuitem"
                                    aria-label={`${subItem.title}: ${subItem.description || ''}`}
                                  >
                                    {subItem.icon && (
                                      <span className="text-purple-400 group-hover/item:text-cyan-400 mt-0.5 transition-colors" aria-hidden="true">
                                        {subItem.icon}
                                      </span>
                                    )}
                                    <div className="flex-1">
                                      <div className="flex items-center">
                                        <span className="font-medium text-gray-300 group-hover/item:text-white transition-colors">
                                          {subItem.title}
                                        </span>
                                        {subItem.badge && (
                                          <span className="ml-2 text-xs bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30">
                                            {subItem.badge}
                                          </span>
                                        )}
                                      </div>
                                      {subItem.description && (
                                        <p className="text-sm text-gray-500 group-hover/item:text-gray-400 mt-1 transition-colors">
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
                        
                        {/* Placeholder Box for Industries, Resources, and About */}
                        {(item.name === 'Industries' || item.name === 'Resources' || item.name === 'About') && (
                          <div 
                            className="bg-gradient-to-br from-purple-900/30 to-cyan-900/20 border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center min-h-64 hover:border-purple-500/30 hover:from-purple-900/40 hover:to-cyan-900/30 transition-all"
                            data-testid={`menu-placeholder-${item.name.toLowerCase()}`}
                          >
                            <div className="text-center">
                              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg flex items-center justify-center mb-4 opacity-40">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                              <p className="text-sm font-medium text-white/80 mb-1">Video or PDF Content</p>
                              <p className="text-xs text-gray-500">Coming soon</p>
                            </div>
                          </div>
                        )}

                        {/* All Solutions Link - Bottom Right */}
                        {item.name === 'Solutions' && (
                          <div className="absolute bottom-6 right-6">
                            <a
                              href="/solutions"
                              className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-medium rounded-lg transition-all hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-[#0d0720]"
                              onClick={handleLinkClick}
                              role="menuitem"
                              aria-label="View all solutions"
                            >
                              View All
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 xl:space-x-4">
            {/* Get Protected Now CTA - Hidden on tablet/mobile, shown in mobile menu instead */}
            <a
              href="https://meet.digerati-experts.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden xl:inline-flex items-center justify-center bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white px-6 py-2 rounded-lg font-semibold shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-[#0a0118] border border-white/10"
              data-testid="nav-cta"
              onClick={handleLinkClick}
              aria-label="Get protected now - Schedule a consultation"
            >
              Get Protected Now
            </a>

            {/* Mobile/Tablet Menu Button - Shows below xl breakpoint */}
            <button
              className="xl:hidden relative p-2.5 rounded-xl bg-gradient-to-r from-purple-600/20 to-cyan-600/20 hover:from-purple-600/30 hover:to-cyan-600/30 focus:outline-none focus:ring-2 focus:ring-cyan-400 border border-white/10 hover:border-white/20 transition-all group"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="mobile-menu-toggle"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <div className="relative w-6 h-6 flex items-center justify-center">
                {/* Animated hamburger icon */}
                <span className={`absolute w-5 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full transform transition-all duration-300 ${mobileMenuOpen ? 'rotate-45' : '-translate-y-1.5'}`} />
                <span className={`absolute w-5 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full transition-all duration-300 ${mobileMenuOpen ? 'opacity-0 scale-0' : 'opacity-100'}`} />
                <span className={`absolute w-5 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full transform transition-all duration-300 ${mobileMenuOpen ? '-rotate-45' : 'translate-y-1.5'}`} />
              </div>
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/10 group-hover:to-purple-500/10 transition-all duration-300" />
            </button>
          </div>
        </div>

        {/* Mobile/Tablet Menu - Premium Glassmorphism Slide-out */}
        <div 
          className={`xl:hidden fixed inset-0 z-40 transition-all duration-500 ${
            mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          style={{ top: isScrolled ? '64px' : '104px' }}
        >
          {/* Backdrop with blur */}
          <div 
            className={`absolute inset-0 bg-[#0a0118]/80 backdrop-blur-sm transition-opacity duration-300 ${
              mobileMenuOpen ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Slide-out Panel */}
          <div 
            className={`absolute right-0 top-0 bottom-0 w-full max-w-md bg-gradient-to-b from-[#0d0720] via-[#0a0118] to-[#050210] border-l border-white/10 shadow-[0_0_60px_rgba(139,92,246,0.3)] transform transition-transform duration-500 ease-out ${
              mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
            role="dialog"
            aria-label="Navigation menu"
          >
            {/* Decorative gradient orbs */}
            <div className="absolute top-20 -left-20 w-40 h-40 bg-purple-600/20 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-20 right-0 w-60 h-60 bg-cyan-600/15 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="relative h-full overflow-y-auto p-6 space-y-2">
              {/* Menu Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                  Menu
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all"
                  aria-label="Close menu"
                  data-testid="mobile-menu-close"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Navigation Items */}
              {navItems.map((item, index) => (
                <div 
                  key={item.name}
                  className="transform transition-all duration-300"
                  style={{ 
                    transitionDelay: mobileMenuOpen ? `${index * 50}ms` : '0ms',
                    opacity: mobileMenuOpen ? 1 : 0,
                    transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(20px)'
                  }}
                >
                  {item.isSimple ? (
                    <a
                      href={item.href}
                      className="group flex items-center justify-between py-4 px-4 text-white hover:text-cyan-400 font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded-xl transition-all text-lg bg-white/0 hover:bg-white/5 border border-transparent hover:border-white/10"
                      onClick={() => setMobileMenuOpen(false)}
                      data-testid={`mobile-nav-${item.name.toLowerCase()}`}
                      aria-label={`Go to ${item.name}`}
                    >
                      {item.name}
                      <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-cyan-400 transform group-hover:translate-x-1 transition-all" />
                    </a>
                  ) : (
                    <details className="group">
                      <summary 
                        className="flex items-center justify-between py-4 px-4 text-white hover:text-cyan-400 font-semibold cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded-xl transition-all text-lg bg-white/0 hover:bg-white/5 border border-transparent hover:border-white/10 list-none [&::-webkit-details-marker]:hidden"
                        data-testid={`mobile-nav-${item.name.toLowerCase()}`}
                      >
                        <span className="flex items-center gap-3">
                          {item.name}
                        </span>
                        <ChevronDown className="h-5 w-5 text-gray-500 transition-transform duration-300 group-open:rotate-180 group-open:text-cyan-400" aria-hidden="true" />
                      </summary>
                      {item.sections && (
                        <div className="mt-2 ml-2 space-y-1 bg-gradient-to-br from-white/5 to-white/0 rounded-xl p-3 border border-white/5 backdrop-blur-sm">
                          {item.sections.map((section) => (
                            <div key={section.title} className="mb-4 last:mb-0">
                              <h4 className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-3 px-2 pt-1 text-sm uppercase tracking-wider">
                                {section.title}
                              </h4>
                              <div className="space-y-1">
                                {section.items.map((subItem) => (
                                  <a
                                    key={subItem.title}
                                    href={subItem.url || '#'}
                                    className="group/item flex items-center gap-3 py-2.5 px-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded-lg transition-all border border-transparent hover:border-white/10"
                                    onClick={() => setMobileMenuOpen(false)}
                                    data-testid={`mobile-submenu-${subItem.title.toLowerCase().replace(/\s+/g, '-')}`}
                                    aria-label={`${subItem.title}: ${subItem.description || ''}`}
                                  >
                                    {subItem.icon && (
                                      <span className="text-purple-400 group-hover/item:text-cyan-400 transition-colors">
                                        {subItem.icon}
                                      </span>
                                    )}
                                    <span className="flex-1">{subItem.title}</span>
                                    {subItem.badge && (
                                      <span className="text-xs bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-500/30">
                                        {subItem.badge}
                                      </span>
                                    )}
                                  </a>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </details>
                  )}
                </div>
              ))}
              
              {/* Divider with gradient */}
              <div className="py-4">
                <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </div>
              
              {/* Contact Actions */}
              <div 
                className="space-y-3 transform transition-all duration-300"
                style={{ 
                  transitionDelay: mobileMenuOpen ? `${navItems.length * 50}ms` : '0ms',
                  opacity: mobileMenuOpen ? 1 : 0,
                  transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(20px)'
                }}
              >
                <a
                  href="tel:325-480-9870"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 hover:border-cyan-500/40 transition-all group"
                  data-testid="mobile-call"
                  aria-label="Call us at 325-480-9870"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                    <Phone className="h-5 w-5 text-cyan-400" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Call Us</div>
                    <div className="font-semibold text-white group-hover:text-cyan-400 transition-colors">325-480-9870</div>
                  </div>
                </a>
                
                <a
                  href="https://portal.digeratiexperts.com/portal/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group"
                  data-testid="mobile-portal"
                  aria-label="Access client portal (opens in new window)"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-500/10 flex items-center justify-center border border-purple-500/20">
                    <ExternalLink className="h-5 w-5 text-purple-400" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Existing Client?</div>
                    <div className="font-semibold text-white group-hover:text-purple-400 transition-colors">Client Portal</div>
                  </div>
                </a>
              </div>
              
              {/* CTA Button */}
              <div 
                className="pt-4 transform transition-all duration-300"
                style={{ 
                  transitionDelay: mobileMenuOpen ? `${(navItems.length + 1) * 50}ms` : '0ms',
                  opacity: mobileMenuOpen ? 1 : 0,
                  transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(20px)'
                }}
              >
                <a
                  href="https://meet.digerati-experts.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold py-4 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-[#0d0720] transition-all rounded-xl shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:shadow-[0_0_40px_rgba(34,211,238,0.4)] text-lg"
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid="mobile-cta"
                  aria-label="Get protected now - Schedule a consultation"
                >
                  Get Protected Now
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
              
              {/* Bottom Branding */}
              <div className="pt-8 pb-4 text-center">
                <p className="text-xs text-gray-600">
                  Digerati Experts • Arizona's MSP Leader
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    </>
  );
}
