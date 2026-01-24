import { useState, useRef, useEffect, useCallback, useId } from 'react';
import { ChevronDown, Shield, Server, Users, FileCheck, Phone, ExternalLink, X, ArrowRight, Monitor, Cloud, Lock, Zap, HeadphonesIcon, Building, BarChart3, ClipboardCheck, Layers, TrendingUp, Star, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logoImage from '@assets/DE-Logo-new_1762461524794.webp';
import { motion, AnimatePresence } from 'framer-motion';

const NoiseTexture = ({ id }: { id: string }) => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.025]" aria-hidden="true">
    <defs>
      <filter id={`noise-${id}`}>
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch"/>
        <feColorMatrix type="saturate" values="0"/>
      </filter>
    </defs>
    <rect width="100%" height="100%" filter={`url(#noise-${id})`}/>
  </svg>
);

const DotMatrixTexture = () => (
  <div 
    className="absolute inset-0 pointer-events-none opacity-[0.04]"
    style={{
      backgroundImage: `radial-gradient(circle at center, white 1px, transparent 1px)`,
      backgroundSize: '10px 10px',
    }}
    aria-hidden="true"
  />
);

const HexagonPattern = ({ id }: { id: string }) => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.02]" aria-hidden="true">
    <defs>
      <pattern id={`hex-${id}`} width="50" height="43.3" patternUnits="userSpaceOnUse" patternTransform="scale(1)">
        <polygon 
          points="25,0 50,14.4 50,43.3 25,28.9 0,43.3 0,14.4" 
          fill="none" 
          stroke="rgba(139,92,246,1)" 
          strokeWidth="0.5"
        />
        <polygon 
          points="25,14.4 50,28.9 50,57.7 25,43.3 0,57.7 0,28.9" 
          fill="none" 
          stroke="rgba(139,92,246,1)" 
          strokeWidth="0.5"
          transform="translate(25, 0)"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill={`url(#hex-${id})`}/>
  </svg>
);

const CircuitLines = ({ id }: { id: string }) => (
  <div className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none overflow-hidden opacity-[0.08]" aria-hidden="true">
    <svg className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`circuit-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="transparent"/>
          <stop offset="20%" stopColor="rgba(139,92,246,1)"/>
          <stop offset="80%" stopColor="rgba(139,92,246,1)"/>
          <stop offset="100%" stopColor="transparent"/>
        </linearGradient>
      </defs>
      <path d="M0,20 L100,20 L120,10 L200,10 L220,20 L350,20 L370,30 L450,30" stroke={`url(#circuit-${id})`} strokeWidth="1" fill="none"/>
      <path d="M500,25 L600,25 L620,15 L700,15 L720,25 L850,25" stroke={`url(#circuit-${id})`} strokeWidth="1" fill="none"/>
      <circle cx="120" cy="10" r="2" fill="rgba(139,92,246,0.5)"/>
      <circle cx="370" cy="30" r="2" fill="rgba(139,92,246,0.5)"/>
      <circle cx="620" cy="15" r="2" fill="rgba(139,92,246,0.5)"/>
    </svg>
  </div>
);

const DiagonalLinesBadge = ({ children, variant }: { children: React.ReactNode; variant: 'popular' | 'bestValue' | 'compliance' }) => {
  const baseClasses = variant === 'popular' 
    ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
    : variant === 'bestValue'
    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
    : 'bg-purple-500/20 text-purple-300 border border-purple-500/30';
    
  return (
    <span className={`relative text-[10px] px-1.5 py-0.5 rounded font-medium overflow-hidden ${baseClasses}`}>
      <span 
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, white 0px, white 1px, transparent 1px, transparent 4px)`,
        }}
        aria-hidden="true"
      />
      <span className="relative">{children}</span>
    </span>
  );
};

interface MegaMenuItem {
  title: string;
  icon?: JSX.Element;
  url?: string;
  description?: string;
  badge?: string;
  price?: string;
}

interface MegaMenuSection {
  title: string;
  items: MegaMenuItem[];
  featured?: boolean;
  viewAllUrl?: string;
}

interface NavItem {
  name: string;
  sections?: MegaMenuSection[];
  href?: string;
  isSimple?: boolean;
  featuredPanel?: {
    title: string;
    stats: { value: string; label: string }[];
    cta: { text: string; url: string };
  };
}

export function MegaMenu() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [hoveredColumn, setHoveredColumn] = useState<number | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const menuContainerRef = useRef<HTMLDivElement>(null);
  const navButtonsRef = useRef<Map<string, HTMLButtonElement>>(new Map());
  const dropdownRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const columnRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const rafRef = useRef<number | null>(null);
  const uniqueId = useId();

  const handleColumnMouseMove = useCallback((e: React.MouseEvent, columnIdx: number) => {
    if (rafRef.current) return;
    
    rafRef.current = requestAnimationFrame(() => {
      const rect = columnRefs.current.get(columnIdx)?.getBoundingClientRect();
      if (rect) {
        setCursorPos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
      rafRef.current = null;
    });
  }, []);

  const navItems: NavItem[] = [
    {
      name: 'Solutions',
      featuredPanel: {
        title: 'Why Digerati?',
        stats: [
          { value: '99.9%', label: 'Uptime SLA' },
          { value: '<15min', label: 'Response Time' },
          { value: '$50K+', label: 'Avg. Savings' },
        ],
        cta: { text: 'Get Free Assessment', url: 'https://meet.digerati-experts.com/' }
      },
      sections: [
        {
          title: 'Most Popular',
          featured: true,
          viewAllUrl: '/solutions',
          items: [
            { title: 'ProActive Ecosystem', description: 'Everything your office needs in one plan', icon: <Monitor className="h-5 w-5" />, url: '/solutions/office-package', badge: 'Best Value', price: 'From $165/user' },
            { title: 'Co-Managed IT', description: 'Extend your IT team without hiring', icon: <Users className="h-5 w-5" />, url: '/solutions/co-managed-it', badge: 'Popular', price: 'Custom' },
            { title: 'Managed IT Support', description: 'End recurring IT headaches for good', icon: <HeadphonesIcon className="h-5 w-5" />, url: '/solutions/managed-it-support' },
          ]
        },
        {
          title: 'Managed Services',
          viewAllUrl: '/solutions',
          items: [
            { title: 'Managed Workplace', description: 'Focus on work, not technology', icon: <Building className="h-5 w-5" />, url: '/solutions/managed-workplace' },
            { title: 'Cloud Backup', description: 'Never lose critical business data', icon: <Cloud className="h-5 w-5" />, url: '/solutions/cloud-backup' },
            { title: 'Security Training', description: 'Turn staff into security assets', icon: <Shield className="h-5 w-5" />, url: '/solutions/security-awareness' },
          ]
        },
        {
          title: 'Security',
          viewAllUrl: '/solutions',
          items: [
            { title: 'Threat Detection', description: 'Stop attacks before damage occurs', icon: <Zap className="h-5 w-5" />, url: '/solutions/threat-detection' },
            { title: 'Security Operations', description: '24/7 expert eyes on your systems', icon: <Lock className="h-5 w-5" />, url: '/solutions/security-operations' },
            { title: 'Backup & DR', description: 'Recover in hours, not weeks', icon: <Server className="h-5 w-5" />, url: '/solutions/backup-disaster-recovery' },
          ]
        },
        {
          title: 'Compliance',
          viewAllUrl: '/solutions',
          items: [
            { title: 'vCIO & Strategy', description: 'Executive IT guidance on demand', icon: <BarChart3 className="h-5 w-5" />, url: '/solutions/vcio-strategy', badge: 'For Compliance' },
            { title: 'Compliance Reports', description: 'Pass audits with confidence', icon: <ClipboardCheck className="h-5 w-5" />, url: '/solutions/compliance-reports' },
            { title: 'Unified Security', description: 'Complete security visibility', icon: <Layers className="h-5 w-5" />, url: '/solutions/unified-security' },
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
            { title: 'Healthcare', description: 'HIPAA compliance made simple', icon: <Shield className="h-5 w-5" />, url: '/industries/healthcare' },
            { title: 'Law Firms', description: 'Protect client confidentiality', icon: <FileCheck className="h-5 w-5" />, url: '/industries/law-firms' },
            { title: 'Accounting', description: 'Secure tax & financial data', icon: <Server className="h-5 w-5" />, url: '/industries/accounting-finance' },
          ]
        },
        {
          title: 'More Industries',
          items: [
            { title: 'Real Estate', description: 'Prevent wire fraud attacks', icon: <Building className="h-5 w-5" />, url: '/industries/real-estate' },
            { title: 'Nonprofits', description: 'Affordable IT for mission', icon: <Users className="h-5 w-5" />, url: '/industries/nonprofits' },
            { title: 'Professional Services', description: 'Secure client data', icon: <BarChart3 className="h-5 w-5" />, url: '/industries/professional-services' },
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
            { title: 'Case Studies', description: 'Real Arizona success stories', icon: <TrendingUp className="h-5 w-5" />, url: '/resources/case-studies' },
            { title: 'Blog & News', description: 'Latest security insights', icon: <FileCheck className="h-5 w-5" />, url: '/resources/blog' },
            { title: 'Videos & Webinars', description: 'Educational content library', icon: <Monitor className="h-5 w-5" />, url: '/resources/videos' },
          ]
        },
        {
          title: 'Tools',
          items: [
            { title: 'Downtime Calculator', description: 'See what downtime really costs', icon: <BarChart3 className="h-5 w-5" />, url: '/resources/downtime-calculator' },
            { title: 'Security Checklist', description: 'Assess your security posture', icon: <ClipboardCheck className="h-5 w-5" />, url: '/resources/security-checklist' },
            { title: 'Datasheets', description: 'Technical specifications', icon: <FileCheck className="h-5 w-5" />, url: '/resources/datasheets' },
          ]
        }
      ]
    },
    {
      name: 'Pricing',
      href: '/proactive-ecosystem-pricing',
      isSimple: true
    },
    {
      name: 'About',
      sections: [
        {
          title: 'Is This You?',
          items: [
            { title: 'Frustrated with IT?', description: 'Slow response and recurring issues', icon: <Zap className="h-5 w-5" /> },
            { title: 'Worried about Security?', description: 'Concerned about ransomware', icon: <Shield className="h-5 w-5" /> },
            { title: 'Need Compliance?', description: 'HIPAA, SOC 2, or FTC needs', icon: <ClipboardCheck className="h-5 w-5" /> },
          ]
        },
        {
          title: 'Company',
          items: [
            { title: 'Mission & Values', description: 'Our commitment to partnership', icon: <Star className="h-5 w-5" />, url: '/about/mission-values' },
            { title: 'Case Studies', description: 'Arizona business success stories', icon: <TrendingUp className="h-5 w-5" />, url: '/resources/case-studies' },
            { title: 'Meet The Experts', description: 'Our certified Chandler team', icon: <Users className="h-5 w-5" />, url: '/about/team' },
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
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when resizing to desktop viewport
  useEffect(() => {
    const handleResize = () => {
      const isDesktop = window.innerWidth >= 1024; // lg breakpoint
      if (isDesktop && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
      if (!isDesktop && activeMenu) {
        setActiveMenu(null);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen, activeMenu]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Top Utility Bar - solid dark violet with fade effect */}
      <div 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'h-0 overflow-hidden opacity-0' : 'h-auto md:h-10'
        }`}
        style={{
          background: '#0a0a0a',
        }}
      >
        {/* Fade-in gradient from left (black) to right (subtle purple tint) */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, #0a0a0a 0%, #0a0a0a 40%, rgba(18, 8, 31, 0.8) 70%, rgba(13, 6, 20, 0.9) 100%)',
          }}
        />
        {/* Bottom edge fade line - only visible on right side */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, transparent 50%, rgba(139, 92, 246, 0.3) 80%, rgba(139, 92, 246, 0.2) 100%)',
          }}
        />
        <div className="container mx-auto px-4 lg:px-8 h-full flex flex-col md:flex-row items-center justify-end py-2 md:py-0 relative z-10">
          <div className="flex items-center flex-wrap gap-3 md:gap-8 justify-center md:justify-end">
            <a
              href="tel:325-480-9870"
              className="flex items-center text-white/70 hover:text-violet-300 text-xs md:text-sm font-medium transition-colors"
              data-testid="utility-phone"
            >
              <Phone className="h-3.5 w-3.5 mr-1.5 text-violet-400" />
              <span className="hidden sm:inline">325-480-9870</span>
              <span className="sm:hidden">Call</span>
            </a>

            <a
              href="https://portal.digeratiexperts.com/portal/login"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-white/70 hover:text-violet-300 text-xs md:text-sm font-medium transition-colors"
              data-testid="utility-portal"
            >
              <span className="hidden sm:inline">Client Portal</span>
              <span className="sm:hidden">Portal</span>
              <ExternalLink className="h-3 w-3 ml-1.5 text-violet-400" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation - clean black background */}
      <nav 
        className={`fixed left-0 right-0 z-50 mega-menu-container transition-all duration-300 ${
          isScrolled 
            ? 'top-0 bg-black/95 backdrop-blur-xl border-b border-white/[0.08]' 
            : 'top-10 bg-black/90 backdrop-blur-xl border-b border-white/[0.05]'
        }`}
        ref={menuContainerRef}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto">
          <div className={`flex items-center justify-between px-4 xl:px-8 transition-all duration-300 ${
            isScrolled ? 'h-16' : 'h-20'
          }`}>
            {/* Logo */}
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

            {/* Desktop Navigation - Center */}
            <div className="hidden lg:flex items-center space-x-0.5 xl:space-x-1 mega-menu-nav">
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
                      className="group relative px-2 xl:px-3 py-2 text-sm xl:text-base text-white/80 hover:text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:ring-offset-black rounded whitespace-nowrap"
                      data-testid={`nav-${item.name.toLowerCase()}`}
                      onClick={handleLinkClick}
                      aria-label={`Go to ${item.name}`}
                    >
                      {item.name}
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-violet-400 group-hover:w-full transition-all duration-300" />
                    </a>
                  ) : (
                    <button
                      ref={(el) => {
                        if (el) navButtonsRef.current.set(item.name, el);
                      }}
                      className={`group relative px-2 xl:px-3 py-2 text-sm xl:text-base text-white/80 hover:text-white font-medium transition-colors flex items-center focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:ring-offset-black rounded whitespace-nowrap ${
                        activeMenu === item.name ? 'text-white' : ''
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
                      <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-violet-400 transition-all duration-300 ${
                        activeMenu === item.name ? 'w-full' : 'w-0 group-hover:w-full'
                      }`} />
                    </button>
                  )}

                  {/* Mega Menu Dropdown */}
                  <AnimatePresence>
                    {item.sections && activeMenu === item.name && (
                      <motion.div
                        ref={(el) => {
                          if (el) dropdownRefs.current.set(item.name, el);
                        }}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className={`fixed left-0 right-0 top-20 mx-auto ${
                          item.name === 'Solutions' ? 'w-[95vw] max-w-6xl' : 'w-[90vw] max-w-5xl'
                        } bg-[#0a0118] backdrop-blur-xl border border-white/15 rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.6),0_0_40px_rgba(139,92,246,0.2)] mega-menu-dropdown overflow-hidden`}
                        onMouseEnter={handleDropdownMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        role="menu"
                        aria-label={`${item.name} submenu`}
                      >
                        {/* Texture Overlays */}
                        <NoiseTexture id={uniqueId} />
                        <DotMatrixTexture />
                        {item.name === 'Solutions' && <CircuitLines id={uniqueId} />}
                        
                        <div className={`p-6 relative ${
                          item.name === 'Solutions' 
                            ? 'grid grid-cols-[1fr_1.1fr_1.1fr_1.1fr_1fr] gap-6' 
                            : 'grid grid-cols-3 gap-6'
                        }`}>
                          {item.sections.map((section, sectionIdx) => (
                            <motion.div 
                              key={section.title}
                              ref={(el) => {
                                if (el && item.name === 'Solutions') columnRefs.current.set(sectionIdx, el);
                              }}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: sectionIdx * 0.05 }}
                              className={`min-w-0 relative overflow-hidden ${
                                item.name === 'Solutions' 
                                  ? 'bg-white/[0.02] rounded-xl p-3 border border-white/[0.06]' 
                                  : ''
                              }`}
                              onMouseMove={(e) => item.name === 'Solutions' && handleColumnMouseMove(e, sectionIdx)}
                              onMouseEnter={() => item.name === 'Solutions' && setHoveredColumn(sectionIdx)}
                              onMouseLeave={() => item.name === 'Solutions' && setHoveredColumn(null)}
                            >
                              {/* Cursor-following radial gradient for Solutions columns */}
                              {item.name === 'Solutions' && hoveredColumn === sectionIdx && (
                                <div 
                                  className="absolute inset-0 pointer-events-none transition-opacity duration-200"
                                  style={{
                                    background: `radial-gradient(200px circle at ${cursorPos.x}px ${cursorPos.y}px, rgba(139,92,246,0.1), transparent 70%)`,
                                  }}
                                  aria-hidden="true"
                                />
                              )}
                              {/* Section Header */}
                              <div className="mb-4">
                                <h3 
                                  className={`font-bold text-sm uppercase tracking-wider flex items-center gap-2 ${
                                    section.featured ? 'text-violet-400' : 'text-gray-400'
                                  }`}
                                  id={`menu-section-${section.title.replace(/\s+/g, '-')}`}
                                >
                                  {section.title}
                                  {section.featured && (
                                    <span className="text-[10px] bg-violet-600 text-white px-2 py-0.5 rounded-full font-medium normal-case tracking-normal">
                                      ★ Top Picks
                                    </span>
                                  )}
                                </h3>
                                <div className={`h-px mt-2 ${
                                  section.featured 
                                    ? 'bg-gradient-to-r from-violet-500/50 to-purple-500/50' 
                                    : 'bg-white/10'
                                }`} />
                              </div>
                              
                              <ul 
                                className="space-y-1"
                                role="menu"
                                aria-labelledby={`menu-section-${section.title.replace(/\s+/g, '-')}`}
                                onMouseLeave={() => setHoveredItem(null)}
                              >
                                {section.items.map((subItem, itemIdx) => {
                                  const itemKey = `${section.title}-${subItem.title}`;
                                  const isHovered = hoveredItem === itemKey;
                                  const hasHoveredSibling = hoveredItem !== null && !isHovered;
                                  
                                  return (
                                  <motion.li 
                                    key={subItem.title} 
                                    role="none"
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: itemIdx * 0.03, duration: 0.2, ease: 'easeOut' }}
                                  >
                                    <a
                                      href={subItem.url || '#'}
                                      className={`group/item flex items-start gap-3 p-2.5 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-violet-500 border ${
                                        isHovered 
                                          ? 'bg-violet-600/20 border-violet-500/40 shadow-[0_0_15px_rgba(139,92,246,0.3)]' 
                                          : hasHoveredSibling
                                          ? 'border-transparent opacity-50'
                                          : 'border-transparent hover:border-white/10 hover:bg-white/5'
                                      }`}
                                      onClick={handleLinkClick}
                                      onMouseEnter={() => setHoveredItem(itemKey)}
                                      role="menuitem"
                                      aria-label={`${subItem.title}: ${subItem.description || ''}`}
                                    >
                                      {subItem.icon && (
                                        <span className={`mt-0.5 transition-colors flex-shrink-0 ${
                                          isHovered ? 'text-violet-400' : hasHoveredSibling ? 'text-violet-400/50' : 'text-violet-400 group-hover/item:text-violet-300'
                                        }`} aria-hidden="true">
                                          {subItem.icon}
                                        </span>
                                      )}
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                          <span className={`font-medium transition-colors text-sm ${
                                            isHovered ? 'text-white' : hasHoveredSibling ? 'text-gray-400' : 'text-gray-200 group-hover/item:text-white'
                                          }`}>
                                            {subItem.title}
                                          </span>
                                          {subItem.badge && (
                                            <DiagonalLinesBadge
                                              variant={
                                                subItem.badge === 'Popular' 
                                                  ? 'popular' 
                                                  : subItem.badge === 'Best Value'
                                                  ? 'bestValue'
                                                  : 'compliance'
                                              }
                                            >
                                              {subItem.badge}
                                            </DiagonalLinesBadge>
                                          )}
                                        </div>
                                        {subItem.description && (
                                          <p className="text-xs text-gray-500 group-hover/item:text-gray-400 mt-1 transition-colors leading-snug">
                                            {subItem.description}
                                          </p>
                                        )}
                                        {subItem.price && (
                                          <p className="text-[11px] text-violet-400/70 mt-1 font-medium">
                                            {subItem.price}
                                          </p>
                                        )}
                                      </div>
                                    </a>
                                  </motion.li>
                                  );
                                })}
                              </ul>
                              
                              {/* View All Link */}
                              {section.viewAllUrl && (
                                <a
                                  href={section.viewAllUrl}
                                  className="inline-flex items-center gap-1 mt-3 px-2 text-xs text-gray-500 hover:text-violet-400 transition-colors group/view"
                                  onClick={handleLinkClick}
                                >
                                  View all
                                  <ArrowRight className="w-3 h-3 group-hover/view:translate-x-0.5 transition-transform" />
                                </a>
                              )}
                            </motion.div>
                          ))}
                          
                          {/* Featured Panel for Solutions */}
                          {item.featuredPanel && (
                            <motion.div 
                              className="relative bg-gradient-to-br from-violet-900/30 to-purple-900/20 border border-violet-500/20 rounded-xl p-4 flex flex-col justify-between overflow-hidden"
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.15 }}
                            >
                              {/* Hexagon pattern background */}
                              <HexagonPattern id={uniqueId} />
                              
                              <div className="relative z-10">
                                <h4 className="font-bold text-white text-sm mb-3 flex items-center gap-2">
                                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                                  {item.featuredPanel.title}
                                </h4>
                                <div className="space-y-2">
                                  {item.featuredPanel.stats.map((stat, idx) => (
                                    <div key={idx} className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0">
                                      <span className="text-gray-400 text-xs">{stat.label}</span>
                                      <span className="text-violet-400 font-bold text-sm">{stat.value}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <a
                                href={item.featuredPanel.cta.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative z-10 mt-3 w-full inline-flex items-center justify-center px-3 py-2 bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold rounded-lg transition-all hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] focus:outline-none focus:ring-2 focus:ring-violet-500"
                                onClick={handleLinkClick}
                              >
                                {item.featuredPanel.cta.text}
                                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                              </a>
                            </motion.div>
                          )}
                          
                          {/* Placeholder Box for Industries, Resources, and About */}
                          {(item.name === 'Industries' || item.name === 'Resources' || item.name === 'About') && (
                            <motion.div 
                              className="bg-gradient-to-br from-purple-900/30 to-violet-900/20 border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center min-h-64"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.2 }}
                              data-testid={`menu-placeholder-${item.name.toLowerCase()}`}
                            >
                              <div className="text-center">
                                <div className="w-16 h-16 mx-auto bg-violet-600/30 rounded-lg flex items-center justify-center mb-4">
                                  <svg className="w-8 h-8 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                </div>
                                <p className="text-sm font-medium text-white/60 mb-1">Video or Case Study</p>
                                <p className="text-xs text-gray-500">Coming soon</p>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Right Side Actions */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            <a
              href="https://meet.digerati-experts.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center justify-center bg-violet-600 hover:bg-violet-500 text-white px-4 xl:px-5 py-2 rounded-lg text-sm font-semibold whitespace-nowrap shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] transition-all focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-[#0a0a0a] border border-white/10"
              data-testid="nav-cta"
              onClick={handleLinkClick}
              aria-label="Get protected now - Schedule a consultation"
            >
              Get Protected
            </a>

            {/* Mobile/Tablet Menu Button */}
            <button
              className="lg:hidden relative p-2.5 rounded-xl bg-violet-600/20 hover:bg-violet-600/30 focus:outline-none focus:ring-2 focus:ring-violet-400 border border-white/10 hover:border-white/20 transition-all group"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="mobile-menu-toggle"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <div className="relative w-6 h-6 flex items-center justify-center">
                <span className={`absolute w-5 h-0.5 bg-violet-400 rounded-full transform transition-all duration-300 ${mobileMenuOpen ? 'rotate-45' : '-translate-y-1.5'}`} />
                <span className={`absolute w-5 h-0.5 bg-violet-400 rounded-full transition-all duration-300 ${mobileMenuOpen ? 'opacity-0 scale-0' : 'opacity-100'}`} />
                <span className={`absolute w-5 h-0.5 bg-violet-400 rounded-full transform transition-all duration-300 ${mobileMenuOpen ? '-rotate-45' : 'translate-y-1.5'}`} />
              </div>
              <div className="absolute inset-0 rounded-xl bg-violet-500/0 group-hover:bg-violet-500/10 transition-all duration-300" />
            </button>
          </div>
        </div>

        {/* Mobile/Tablet Menu - Premium Glassmorphism Slide-out */}
        <div 
          className={`lg:hidden fixed left-0 right-0 z-40 transition-all duration-500 ${
            mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          style={{ 
            top: isScrolled ? '64px' : '104px',
            height: isScrolled ? 'calc(100dvh - 64px)' : 'calc(100dvh - 104px)'
          }}
        >
          {/* Backdrop with blur */}
          <div 
            className={`absolute inset-0 bg-[#0a0118]/95 backdrop-blur-md transition-opacity duration-300 ${
              mobileMenuOpen ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Slide-out Panel */}
          <div 
            className={`absolute right-0 top-0 h-full w-full max-w-md bg-gradient-to-b from-[#0d0720] via-[#0a0118] to-[#050210] border-l border-white/10 shadow-[0_0_60px_rgba(139,92,246,0.3)] transform transition-transform duration-500 ease-out overflow-hidden ${
              mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
            role="dialog"
            aria-label="Navigation menu"
          >
            {/* Decorative gradient orbs */}
            <div className="absolute top-20 -left-20 w-40 h-40 bg-purple-600/20 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-20 right-0 w-60 h-60 bg-violet-600/15 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="relative h-full overflow-y-auto overscroll-contain p-6 pb-24 space-y-2">
              {/* Menu Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">
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
                      className="group flex items-center justify-between py-4 px-4 text-white hover:text-violet-400 font-semibold focus:outline-none focus:ring-2 focus:ring-violet-500 rounded-xl transition-all text-lg bg-white/0 hover:bg-white/5 border border-transparent hover:border-white/10"
                      onClick={() => setMobileMenuOpen(false)}
                      data-testid={`mobile-nav-${item.name.toLowerCase()}`}
                      aria-label={`Go to ${item.name}`}
                    >
                      {item.name}
                      <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-violet-400 transform group-hover:translate-x-1 transition-all" />
                    </a>
                  ) : (
                    <details className="group">
                      <summary 
                        className="flex items-center justify-between py-4 px-4 text-white hover:text-violet-400 font-semibold cursor-pointer focus:outline-none focus:ring-2 focus:ring-violet-500 rounded-xl transition-all text-lg bg-white/0 hover:bg-white/5 border border-transparent hover:border-white/10 list-none [&::-webkit-details-marker]:hidden"
                        data-testid={`mobile-nav-${item.name.toLowerCase()}`}
                      >
                        <span className="flex items-center gap-3">
                          {item.name}
                        </span>
                        <ChevronDown className="h-5 w-5 text-gray-500 transition-transform duration-300 group-open:rotate-180 group-open:text-violet-400" aria-hidden="true" />
                      </summary>
                      {item.sections && (
                        <div className="mt-2 ml-2 space-y-1 bg-gradient-to-br from-white/5 to-white/0 rounded-xl p-3 border border-white/5 backdrop-blur-sm">
                          {item.sections.map((section) => (
                            <div key={section.title} className="mb-4 last:mb-0">
                              <h4 className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400 mb-3 px-2 pt-1 text-sm uppercase tracking-wider">
                                {section.title}
                              </h4>
                              <div className="space-y-1">
                                {section.items.map((subItem) => (
                                  <a
                                    key={subItem.title}
                                    href={subItem.url || '#'}
                                    className="group/item flex items-center gap-3 py-2.5 px-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-violet-500 rounded-lg transition-all border border-transparent hover:border-white/10"
                                    onClick={() => setMobileMenuOpen(false)}
                                    data-testid={`mobile-submenu-${subItem.title.toLowerCase().replace(/\s+/g, '-')}`}
                                    aria-label={`${subItem.title}: ${subItem.description || ''}`}
                                  >
                                    {subItem.icon && (
                                      <span className="text-violet-400 group-hover/item:text-violet-300 transition-colors">
                                        {subItem.icon}
                                      </span>
                                    )}
                                    <span className="flex-1">{subItem.title}</span>
                                    {subItem.badge && (
                                      <span className="text-xs bg-violet-500/20 text-violet-300 px-2 py-0.5 rounded-full border border-violet-500/30">
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
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-violet-500/10 border border-violet-500/20 hover:border-violet-500/40 transition-all group"
                  data-testid="mobile-call"
                  aria-label="Call us at 325-480-9870"
                >
                  <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center border border-violet-500/20">
                    <Phone className="h-5 w-5 text-violet-400" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Call Us</div>
                    <div className="font-semibold text-white group-hover:text-violet-400 transition-colors">325-480-9870</div>
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
                  className="w-full inline-flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-bold py-4 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-[#0a0a0a] transition-all rounded-xl shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:shadow-[0_0_40px_rgba(139,92,246,0.4)] text-lg"
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
