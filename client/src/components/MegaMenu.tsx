import { useState, useRef, useEffect, useCallback, useId } from 'react';
import { Link } from 'wouter';
import { ChevronDown, Shield, Server, Users, FileCheck, Phone, ExternalLink, X, ArrowRight, Monitor, Cloud, Lock, Zap, HeadphonesIcon, Building, BarChart3, ClipboardCheck, Layers, TrendingUp, Star, CheckCircle, Award, LayoutGrid, BookOpen, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logoImage from '@assets/DE-Logo-new_1762461524794.webp';
import { IconWell } from '@/components/visual/IconWell';
import { motion, AnimatePresence } from 'framer-motion';
import * as Tooltip from '@radix-ui/react-tooltip';
import { pricing } from '@/data/pricing';
import { useBooking } from '@/contexts/BookingContext';
import { useOptionalFullPageScroll } from '@/components/FullPageScroll';
import { HomepageOnPageNav } from '@/components/HomepageSectionNav';
import { PORTAL_LOGIN } from '@/lib/portalUrls';
import { CTA } from '@/lib/ctaCopy';

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
  const { openBooking } = useBooking();
  const [hoveredColumn, setHoveredColumn] = useState<number | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const menuContainerRef = useRef<HTMLDivElement>(null);
  const utilityBarRef = useRef<HTMLDivElement>(null);
  const navBarRef = useRef<HTMLDivElement>(null);
  const spyBarRef = useRef<HTMLDivElement>(null);
  const navButtonsRef = useRef<Map<string, HTMLButtonElement>>(new Map());
  const dropdownRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const columnRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const rafRef = useRef<number | null>(null);
  /** Unscrolled utility height — kept so page offset does not shrink when the bar collapses. */
  const utilityNaturalHRef = useRef(0);
  const uniqueId = useId();
  const scrollContext = useOptionalFullPageScroll();
  const isMenuOpen = Boolean(activeMenu) || mobileMenuOpen;
  // Solid dark strip over light page sections so the white/gold logo stays legible.
  // Keep the live translucent bar over dark hero sections.
  const isOverLight = scrollContext?.currentTheme === 'light';
  const useSolidChrome = isOverLight || isMenuOpen;

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
      sections: [
        {
          title: 'Ways to Work With Us',
          viewAllUrl: '/solutions',
          items: [
            { title: 'ProActive Ecosystem', description: 'Cybersecurity-first operating model: IT → Office → Business → Enterprise', icon: <Layers className="h-5 w-5" />, url: '/solutions/proactive-ecosystem' },
            { title: 'Co-Managed IT', description: 'Extend your internal IT team without replacing it', icon: <Users className="h-5 w-5" />, url: '/solutions/co-managed-it' },
            { title: 'Standalone Services', description: 'A specific gap — backup, UCaaS, awareness, or a project', icon: <Server className="h-5 w-5" />, url: '/solutions/standalone-services' },
            { title: 'Cyber Risk Assessment', description: 'Match the operating model to your environment', icon: <ClipboardCheck className="h-5 w-5" />, url: '/book' },
          ]
        },
        {
          title: 'ProActive Ecosystem',
          viewAllUrl: '/proactive-ecosystem-pricing',
          items: [
            { title: 'IT', description: pricing.it.idealBuyer, icon: <Monitor className="h-5 w-5" />, url: pricing.it.learnMoreUrl, price: `From $${pricing.it.user}/user` },
            { title: 'Office', description: pricing.office.idealBuyer, icon: <Building className="h-5 w-5" />, url: pricing.office.learnMoreUrl, price: `From $${pricing.office.user}/user` },
            { title: 'Business', description: pricing.business.idealBuyer, icon: <BarChart3 className="h-5 w-5" />, url: pricing.business.learnMoreUrl, price: `From $${pricing.business.user}/user` },
            { title: 'Enterprise', description: pricing.enterprise.idealBuyer, icon: <Award className="h-5 w-5" />, url: pricing.enterprise.learnMoreUrl, price: `From $${pricing.enterprise.user}/user` },
            { title: 'Compare All Packages', description: 'Capabilities and operating depth — not a ranking', icon: <LayoutGrid className="h-5 w-5" />, url: '/proactive-ecosystem-pricing' },
          ]
        },
        {
          title: 'Managed IT & Workplace',
          viewAllUrl: '/solutions',
          items: [
            { title: 'Managed IT Support', description: 'Service desk and day-to-day issue ownership', icon: <HeadphonesIcon className="h-5 w-5" />, url: '/solutions/managed-it-support' },
            { title: 'Managed Workplace', description: 'Identity, devices, apps, and employee lifecycle', icon: <Building className="h-5 w-5" />, url: '/solutions/managed-workplace' },
            { title: 'Identity & Access', description: 'SSO, MFA, and access architecture', icon: <Lock className="h-5 w-5" />, url: '/solutions/unified-security' },
            { title: 'Managed Network & Connectivity', description: 'Firewall, Wi-Fi, and connectivity operations', icon: <Server className="h-5 w-5" />, url: '/solutions/managed-it-support' },
            { title: 'Cloud / SaaS Backup', description: 'Endpoint, M365, and Google backup — not BCDR', icon: <Cloud className="h-5 w-5" />, url: '/solutions/cloud-backup' },
            { title: 'UCaaS', description: 'Unified phone and meeting systems', icon: <Phone className="h-5 w-5" />, url: '/services/ucaas' },
          ]
        },
        {
          title: 'Cybersecurity & Resilience',
          viewAllUrl: '/solutions',
          items: [
            { title: 'Endpoint & Email Protection', description: 'Device and mailbox defenses', icon: <Shield className="h-5 w-5" />, url: '/solutions/threat-detection' },
            { title: 'Threat Detection & Response', description: 'Find and contain attacks before damage spreads', icon: <Zap className="h-5 w-5" />, url: '/solutions/threat-detection' },
            { title: 'Security Operations / SOC', description: 'Human-led monitoring and response', icon: <Lock className="h-5 w-5" />, url: '/solutions/security-operations' },
            { title: 'Security Awareness', description: 'Training and phishing simulations for staff', icon: <Users className="h-5 w-5" />, url: '/solutions/security-awareness' },
            { title: 'Data Encryption', description: 'Protect data even if an endpoint is lost', icon: <Shield className="h-5 w-5" />, url: '/solutions/data-encryption' },
            { title: 'Backup & Disaster Recovery', description: 'Continuity, RPO/RTO, failover, and restore testing', icon: <Server className="h-5 w-5" />, url: '/solutions/backup-disaster-recovery' },
          ]
        },
        {
          title: 'Strategy & Compliance',
          viewAllUrl: '/solutions',
          items: [
            { title: 'vCIO', description: 'Executive technology and security guidance', icon: <BarChart3 className="h-5 w-5" />, url: '/solutions/vcio-strategy' },
            { title: 'Compliance & Risk Reporting', description: 'Evidence and reporting for audits and insurers', icon: <ClipboardCheck className="h-5 w-5" />, url: '/solutions/compliance-reports' },
            { title: 'Cyber Insurance Readiness', description: 'Controls and documentation carriers typically ask for', icon: <FileCheck className="h-5 w-5" />, url: '/solutions/compliance-reports' },
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
            { title: 'Digerati Journal', description: 'Cybersecurity & managed IT field notes', icon: <FileCheck className="h-5 w-5" />, url: '/resources/blog' },
            { title: 'Cyber Facts', description: 'Interactive credibility stats & sources', icon: <Shield className="h-5 w-5" />, url: '/resources/cyber-facts' },
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
            { title: 'Frustrated with IT?', description: 'Slow response and recurring issues', icon: <Zap className="h-5 w-5" />, url: '/#contact' },
            { title: 'Worried about Security?', description: 'Concerned about ransomware', icon: <Shield className="h-5 w-5" />, url: '/solutions/threat-detection' },
            { title: 'Need Compliance?', description: 'HIPAA, SOC 2, or FTC needs', icon: <ClipboardCheck className="h-5 w-5" />, url: '/solutions/compliance-reports' },
          ]
        },
        {
          title: 'Company',
          items: [
            { title: 'Mission & Values', description: 'Our commitment to partnership', icon: <Star className="h-5 w-5" />, url: '/about/mission-values' },
            { title: 'Case Studies', description: 'Arizona business success stories', icon: <TrendingUp className="h-5 w-5" />, url: '/resources/case-studies' },
            { title: 'Meet The Experts', description: 'Chandler, AZ team', icon: <Users className="h-5 w-5" />, url: '/about/team' },
            { title: 'Client Bill of Rights', description: 'Our 8 pledges to you', icon: <Award className="h-5 w-5" />, url: '/about/client-bill-of-rights' },
            { title: '100% Guarantee', description: '30-day money-back promise', icon: <CheckCircle className="h-5 w-5" />, url: '/about/guarantee' },
            { title: '21 Questions to Ask', description: 'Before hiring any IT company', icon: <ClipboardCheck className="h-5 w-5" />, url: '/about/21-questions' },
          ]
        }
      ]
    },
    {
      name: 'Store',
      href: '/store',
      isSimple: true
    },
    {
      name: 'Contact',
      href: '/#contact',
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

  // Publish sticky chrome height so pages can clear the fixed MegaMenu centrally.
  useEffect(() => {
    const root = document.documentElement;
    const BREATHING_PX = 12;

    const publish = () => {
      const utilityEl = utilityBarRef.current;
      const navEl = navBarRef.current;
      const navH = navEl?.offsetHeight ?? 0;
      const spyH = spyBarRef.current?.offsetHeight ?? 0;
      const liveBottom = menuContainerRef.current?.getBoundingClientRect().bottom ?? 0;
      root.style.setProperty('--de-spy-h', `${Math.round(spyH)}px`);

      if (utilityEl && !isScrolled && utilityEl.offsetHeight > 0) {
        utilityNaturalHRef.current = utilityEl.offsetHeight;
        root.style.setProperty('--de-utility-h', `${utilityEl.offsetHeight}px`);
      }

      // Live bottom tracks the collapsed/expanded chrome for drawers + dropdowns.
      if (liveBottom > 0) {
        root.style.setProperty('--de-nav-current-bottom', `${Math.round(liveBottom)}px`);
      }

      // Content offset must stay at worst-case (utility + full nav) so padding does
      // not jump when the utility bar collapses on scroll.
      if (!isScrolled && navH > 0) {
        const utilityH = utilityNaturalHRef.current || utilityEl?.offsetHeight || 0;
        const chromeH = utilityH + navH + spyH;
        root.style.setProperty('--de-nav-chrome', `${Math.round(chromeH)}px`);
        root.style.setProperty('--de-nav-offset', `${Math.round(chromeH + BREATHING_PX)}px`);
      }
    };

    publish();
    const ro = new ResizeObserver(() => publish());
    if (utilityBarRef.current) ro.observe(utilityBarRef.current);
    if (navBarRef.current) ro.observe(navBarRef.current);
    if (spyBarRef.current) ro.observe(spyBarRef.current);
    window.addEventListener('resize', publish);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', publish);
    };
  }, [isScrolled]);

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
    <Tooltip.Provider delayDuration={0}>
      <>
        {/* Top Utility Bar - solid dark violet with fade effect */}
      <div 
        ref={utilityBarRef}
        className={`fixed top-0 de-fixed-in-canvas z-[60] transition-all duration-300 ${
          /* Never lock height to --de-utility-h: that chicken-eggs measurement and
             clips enlarged utility glyphs above the viewport (only letter bottoms show). */
          isScrolled
            ? 'h-0 min-h-0 overflow-hidden opacity-0 pointer-events-none'
            : 'h-auto min-h-[var(--de-utility-h)] overflow-visible opacity-100'
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
        <div className="max-w-[100rem] mx-auto px-3 lg:px-5 flex flex-col md:flex-row items-center justify-end py-1.5 relative z-10 w-full">
          <div className="flex items-center flex-wrap gap-x-5 gap-y-1.5 md:gap-x-7 justify-center md:justify-end">
            <a
              href="tel:480-519-5892"
              className="flex items-center text-white/95 hover:text-pink-300 text-sm md:text-base font-semibold leading-none tracking-wide transition-colors"
              data-testid="utility-phone"
            >
              <Phone className="h-4 w-4 mr-1.5 text-pink-400 shrink-0" />
              <span className="hidden sm:inline">480-519-5892</span>
              <span className="sm:hidden">Call</span>
            </a>

            {/* Restored from 61f25fc / live release 20260810193831 — Assist near Portal */}
            <a
              href="https://assist.zoho.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-white/90 hover:text-pink-300 text-sm md:text-base font-medium leading-none transition-colors"
              data-testid="utility-zoho-assist"
            >
              <Monitor className="h-4 w-4 mr-1.5 text-pink-400 shrink-0" />
              <span>Support</span>
            </a>

            <a
              href={PORTAL_LOGIN}
              className="flex items-center text-white/90 hover:text-pink-300 text-sm md:text-base font-medium leading-none transition-colors"
              data-testid="utility-portal"
            >
              <span className="hidden sm:inline">Client Portal</span>
              <span className="sm:hidden">Portal</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation — live presence + solid chrome only when needed */}
      <nav 
        className={`fixed de-fixed-in-canvas z-[55] mega-menu-container transition-all duration-300 ${
          isScrolled ? 'top-0' : 'top-[var(--de-utility-h)]'
        } ${
          useSolidChrome
            ? 'bg-[#050312] border-b border-white/[0.10] shadow-[0_10px_28px_rgba(0,0,0,0.45)]'
            : isScrolled
              ? 'bg-black/95 backdrop-blur-xl border-b border-white/[0.08]'
              : 'bg-black/90 backdrop-blur-xl border-b border-white/[0.05]'
        }`}
        ref={menuContainerRef}
        role="navigation"
        aria-label="Main navigation"
        data-nav-theme={isOverLight ? 'over-light' : 'over-dark'}
      >
        <div className="max-w-[100rem] mx-auto w-full">
          <div
            ref={navBarRef}
            className={`flex items-center justify-between gap-3 px-3 xl:px-5 overflow-visible transition-all duration-300 ${
            isScrolled ? 'min-h-[var(--de-nav-h-scrolled)] h-[var(--de-nav-h-scrolled)]' : 'min-h-[var(--de-nav-h)] h-[var(--de-nav-h)]'
          }`}>
            {/* Logo */}
            <a
              href="/"
              className="flex items-center flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded"
              aria-label="Digerati Experts home"
            >
              <img 
                src={logoImage} 
                alt="Digerati Experts Logo" 
                className={`transition-all duration-300 ${
                  isScrolled ? 'h-10' : 'h-[3.25rem]'
                }`}
                style={{ width: 'auto', maxWidth: '220px' }}
                data-testid="logo-header"
              />
            </a>

            {/* Desktop Navigation - Center */}
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-1.5 mega-menu-nav overflow-visible">
              {navItems.map((item, index) => (
                <div
                  key={item.name}
                  className="relative overflow-visible"
                  onMouseEnter={() => !item.isSimple && handleMouseEnter(item.name)}
                  onMouseLeave={handleMouseLeave}
                >
                  {item.isSimple ? (
                    <a
                      href={item.href}
                      className="group relative inline-flex items-center px-3 xl:px-4 py-2 text-lg xl:text-xl leading-normal text-white/85 hover:text-white font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:ring-offset-black rounded whitespace-nowrap overflow-visible"
                      data-testid={`nav-${item.name.toLowerCase()}`}
                      onClick={handleLinkClick}
                      aria-label={`Go to ${item.name}`}
                    >
                      {item.name}
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-violet-400 group-hover:w-full transition-all duration-300" />
                    </a>
                  ) : (
                    <button
                      ref={(el) => {
                        if (el) navButtonsRef.current.set(item.name, el);
                      }}
                      className={`group relative inline-flex items-center px-3 xl:px-4 py-2 text-lg xl:text-xl leading-normal text-white/85 hover:text-white font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:ring-offset-black rounded whitespace-nowrap overflow-visible ${
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
                        className={`ml-1 h-4 w-4 shrink-0 transition-transform ${
                          activeMenu === item.name ? 'rotate-180' : ''
                        }`} 
                        aria-hidden="true"
                      />
                      <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-violet-400 transition-all duration-300 ${
                        activeMenu === item.name ? 'w-full' : 'w-0 group-hover:w-full'
                      }`} />
                    </button>
                  )}

                  {/* Mega Menu Dropdown — opacity-only motion (no transform) so
                      position:fixed stays viewport-sized, not nav-trigger-sized. */}
                  <AnimatePresence>
                    {item.sections && activeMenu === item.name && (
                      <motion.div
                        ref={(el) => {
                          if (el) dropdownRefs.current.set(item.name, el);
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className={`fixed inset-x-0 top-[var(--de-nav-current-bottom)] mx-auto ${
                          item.name === 'Solutions' || item.name === 'About'
                            ? 'w-[min(98vw,92rem)]'
                            : 'w-[min(96vw,72rem)]'
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
                        
                        <div className={`relative ${
                          item.name === 'Solutions' 
                            ? 'grid grid-cols-5 divide-x divide-white/5' 
                            : item.name === 'About'
                              ? 'p-8 grid grid-cols-3 gap-8 items-start'
                              : item.name === 'Industries'
                                ? 'p-8 grid grid-cols-3 gap-8 items-start'
                                : item.sections.length === 3 
                                  ? 'p-8 grid grid-cols-3 gap-8 items-start' 
                                  : 'p-8 flex gap-8 items-start'
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
                              className={`relative overflow-hidden ${
                                item.name === 'Solutions' 
                                  ? 'min-w-0 p-6' 
                                  : 'flex-1 min-w-0'
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
                                  className={`font-bold text-xs uppercase tracking-[0.18em] flex items-center gap-2 ${
                                    section.featured ? 'text-violet-400' : 'text-gray-400'
                                  }`}
                                  id={`menu-section-${section.title.replace(/\s+/g, '-')}`}
                                >
                                  {section.title}
                                </h3>
                                <div className={`h-px mt-2 ${
                                  section.featured 
                                    ? 'bg-violet-500/30' 
                                    : 'bg-white/5'
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
                                  
                                  return (
                                  <motion.li 
                                    key={subItem.title} 
                                    role="none"
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: itemIdx * 0.03, duration: 0.2, ease: 'easeOut' }}
                                  >
                                    <Tooltip.Root>
                                      <Tooltip.Trigger asChild>
                                        <a
                                          href={subItem.url || '#'}
                                          className={`group/item flex items-start gap-3.5 px-3 py-3 rounded-xl transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-violet-500/50 border ${
                                            isHovered 
                                              ? 'bg-violet-600/10 border-violet-500/20' 
                                              : 'border-transparent hover:bg-white/[0.03]'
                                          }`}
                                          onClick={handleLinkClick}
                                          onMouseEnter={() => setHoveredItem(itemKey)}
                                          role="menuitem"
                                        >
                                          {subItem.icon && (
                                            <span className={`mt-0.5 transition-colors flex-shrink-0 ${
                                              isHovered ? 'text-violet-400' : 'text-violet-400/60 group-hover/item:text-violet-400'
                                            }`} aria-hidden="true">
                                              <div className="scale-100">{subItem.icon}</div>
                                            </span>
                                          )}
                                          <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                              <span className={`font-semibold transition-colors text-[15px] leading-snug ${
                                                isHovered ? 'text-white' : 'text-gray-200 group-hover/item:text-white'
                                              }`}>
                                                {subItem.title}
                                              </span>
                                              {subItem.badge && (
                                                <DiagonalLinesBadge
                                                  variant={
                                                    subItem.badge === 'Popular' ? 'popular' : subItem.badge === 'Best Value' ? 'bestValue' : 'compliance'
                                                  }
                                                >
                                                  {subItem.badge}
                                                </DiagonalLinesBadge>
                                              )}
                                            </div>
                                            {subItem.description && (
                                              <p className="text-[13px] text-gray-500 group-hover/item:text-gray-400 mt-1 transition-colors leading-snug line-clamp-2">
                                                {subItem.description}
                                              </p>
                                            )}
                                          </div>
                                        </a>
                                      </Tooltip.Trigger>
                                      {subItem.description && (
                                        <Tooltip.Portal>
                                          <Tooltip.Content
                                            className="z-[100] max-w-[250px] bg-[#1a0b2e] border border-white/20 px-3 py-2 rounded-lg text-xs text-gray-200 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
                                            sideOffset={5}
                                            side="right"
                                          >
                                            {subItem.description}
                                            <Tooltip.Arrow className="fill-[#1a0b2e] stroke-white/20" />
                                          </Tooltip.Content>
                                        </Tooltip.Portal>
                                      )}
                                    </Tooltip.Root>
                                  </motion.li>
                                  );
                                })}
                              </ul>
                              
                              {/* View All Link */}
                              {section.viewAllUrl && (
                                <a
                                  href={section.viewAllUrl}
                                  className="inline-flex items-center gap-1.5 mt-3 px-3 text-xs font-bold text-gray-500 hover:text-violet-400 transition-colors group/view uppercase tracking-wider"
                                  onClick={handleLinkClick}
                                >
                                  Explore
                                  <ArrowRight className="w-3.5 h-3.5 group-hover/view:translate-x-0.5 transition-transform" />
                                </a>
                              )}
                            </motion.div>
                          ))}
                          
                          {item.featuredPanel && (
                            <motion.div 
                              className="relative bg-white/[0.02] p-6 flex flex-col justify-between overflow-hidden min-h-[22rem]"
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.15 }}
                            >
                              <HexagonPattern id={uniqueId} />
                              
                              <div className="relative z-10">
                                <h4 className="font-bold text-white text-base mb-4 flex items-center gap-2">
                                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                                  {item.featuredPanel.title}
                                </h4>
                                <div className="space-y-3">
                                  {item.featuredPanel.stats.map((stat, idx) => (
                                    <div key={idx} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                                      <span className="text-gray-400 text-xs uppercase tracking-wider font-semibold">{stat.label}</span>
                                      <span className="text-violet-300 font-bold text-base">{stat.value}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <a
                                href={item.featuredPanel.cta.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative z-10 mt-6 w-full inline-flex items-center justify-center px-4 py-3 bg-violet-600 hover:bg-violet-500 text-white text-sm font-bold rounded-lg transition-all shadow-lg shadow-violet-500/20"
                                onClick={handleLinkClick}
                              >
                                {item.featuredPanel.cta.text}
                                <ArrowRight className="w-3 h-3 ml-1.5" />
                              </a>
                            </motion.div>
                          )}
                          
                          {item.name === 'Industries' && (
                            <motion.div
                              className="flex flex-1 flex-col rounded-xl border border-white/10 bg-[#151217] p-5"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.2 }}
                              data-testid="menu-featured-industries"
                            >
                              <IconWell icon={Building} size="sm" surface="dark" />
                              <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">Arizona industries</p>
                              <h4 className="mt-1 text-sm font-semibold leading-snug text-white">Healthcare, legal, accounting, and more</h4>
                              <p className="mt-2 flex-1 text-xs leading-relaxed text-white/55">
                                Industry-specific IT and security — we publish client stories with permission.
                              </p>
                              <a
                                href="/resources/case-studies"
                                className="mt-4 inline-flex items-center text-xs font-semibold text-[#A78BFA] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
                                data-testid="link-featured-case-study-industries"
                                onClick={handleLinkClick}
                              >
                                See case studies
                                <ArrowRight className="ml-1.5 h-3 w-3" />
                              </a>
                            </motion.div>
                          )}

                          {item.name === 'About' && (
                            <motion.div
                              className="flex flex-1 flex-col rounded-xl border border-white/10 bg-[#151217] p-5"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.2 }}
                              data-testid="menu-featured-about"
                            >
                              <IconWell icon={MapPin} size="sm" surface="dark" />
                              <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">Chandler, AZ</p>
                              <h4 className="mt-1 text-sm font-semibold leading-snug text-white">Local accountability</h4>
                              <p className="mt-2 flex-1 text-xs leading-relaxed text-white/55">
                                An Arizona team you can reach — not an anonymous remote NOC.
                              </p>
                              <a
                                href="/about/team"
                                className="mt-4 inline-flex items-center text-xs font-semibold text-[#A78BFA] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
                                data-testid="link-featured-team-about"
                                onClick={handleLinkClick}
                              >
                                Meet the experts
                                <ArrowRight className="ml-1.5 h-3 w-3" />
                              </a>
                            </motion.div>
                          )}

                          {item.name === 'Resources' && (
                            <motion.div
                              className="flex flex-1 flex-col rounded-xl border border-white/10 bg-[#151217] p-5"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.2 }}
                              data-testid="menu-ebook-feature"
                            >
                              <Link
                                href="/resources/ebook/defending-digital-realm"
                                onClick={handleLinkClick}
                                className="flex h-full flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
                              >
                                <IconWell icon={BookOpen} size="sm" surface="dark" />
                                <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">Free ebook</p>
                                <h4 className="mt-1 text-sm font-semibold leading-snug text-white">Defending the Digital Realm</h4>
                                <p className="mt-2 flex-1 text-xs leading-relaxed text-white/55">
                                  A cyber risk assessment framework for modern businesses.
                                </p>
                                <span className="mt-4 inline-flex items-center text-xs font-semibold text-[#A78BFA]">
                                  Read the ebook
                                  <ArrowRight className="ml-1.5 h-3 w-3" />
                                </span>
                              </Link>
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Right Side Actions — short label on lg so Schedule isn’t truncated */}
          <div className="flex items-center space-x-2 lg:space-x-3 flex-shrink-0">
            <button
              type="button"
              className="hidden lg:inline-flex items-center justify-center bg-gradient-to-r from-fuchsia-600 via-pink-600 to-rose-500 hover:from-fuchsia-500 hover:via-pink-500 hover:to-rose-400 text-white px-3 xl:px-4 py-2 rounded-lg text-sm xl:text-base font-semibold whitespace-nowrap shadow-[0_0_22px_rgba(236,72,153,0.35)] hover:shadow-[0_0_30px_rgba(236,72,153,0.45)] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black border border-pink-300/25"
              data-testid="nav-cta"
              onClick={() => { handleLinkClick(); openBooking("megamenu"); }}
              aria-label={CTA.primary}
            >
              <span className="xl:hidden">{CTA.primaryNavCompact}</span>
              <span className="hidden xl:inline">{CTA.primaryShort}</span>
            </button>

            {/* Mobile/Tablet Menu Button */}
            <button
              className="lg:hidden relative p-3 rounded-xl bg-violet-600/20 hover:bg-violet-600/30 focus:outline-none focus:ring-2 focus:ring-violet-400 border border-white/10 hover:border-white/20 transition-all group"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="mobile-menu-toggle"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <div className="relative w-7 h-7 flex items-center justify-center">
                <span className={`absolute w-6 h-0.5 bg-violet-400 rounded-full transform transition-all duration-300 ${mobileMenuOpen ? 'rotate-45' : '-translate-y-2'}`} />
                <span className={`absolute w-6 h-0.5 bg-violet-400 rounded-full transition-all duration-300 ${mobileMenuOpen ? 'opacity-0 scale-0' : 'opacity-100'}`} />
                <span className={`absolute w-6 h-0.5 bg-violet-400 rounded-full transform transition-all duration-300 ${mobileMenuOpen ? '-rotate-45' : 'translate-y-2'}`} />
              </div>
              <div className="absolute inset-0 rounded-xl bg-violet-500/0 group-hover:bg-violet-500/10 transition-all duration-300" />
            </button>
          </div>
        </div>
        </div>

        <div
          ref={spyBarRef}
          className={`w-full overflow-hidden motion-reduce:transition-none ${
            isScrolled ? "lg:hidden" : ""
          }`}
        >
          <HomepageOnPageNav />
        </div>

        {/* Mobile/Tablet Menu - Premium Glassmorphism Slide-out */}
        <div 
          className={`lg:hidden fixed de-fixed-in-canvas z-40 transition-all duration-500 ${
            mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          style={{ 
            top: 'var(--de-nav-current-bottom)',
            height: 'calc(100dvh - var(--de-nav-current-bottom))'
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
                <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">
                  Menu
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all"
                  aria-label="Close menu"
                  data-testid="mobile-menu-close"
                >
                  <X className="w-6 h-6 text-gray-400" />
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
                      className="group flex items-center justify-between py-5 px-4 text-white hover:text-violet-400 font-semibold focus:outline-none focus:ring-2 focus:ring-violet-500 rounded-xl transition-all text-xl bg-white/0 hover:bg-white/5 border border-transparent hover:border-white/10"
                      onClick={() => setMobileMenuOpen(false)}
                      data-testid={`mobile-nav-${item.name.toLowerCase()}`}
                      aria-label={`Go to ${item.name}`}
                    >
                      {item.name}
                      <ArrowRight className="w-6 h-6 text-gray-600 group-hover:text-violet-400 transform group-hover:translate-x-1 transition-all" />
                    </a>
                  ) : (
                    <details className="group">
                      <summary 
                        className="flex items-center justify-between py-5 px-4 text-white hover:text-violet-400 font-semibold cursor-pointer focus:outline-none focus:ring-2 focus:ring-violet-500 rounded-xl transition-all text-xl bg-white/0 hover:bg-white/5 border border-transparent hover:border-white/10 list-none [&::-webkit-details-marker]:hidden"
                        data-testid={`mobile-nav-${item.name.toLowerCase()}`}
                      >
                        <span className="flex items-center gap-3">
                          {item.name}
                        </span>
                        <ChevronDown className="h-6 w-6 text-gray-500 transition-transform duration-300 group-open:rotate-180 group-open:text-violet-400" aria-hidden="true" />
                      </summary>
                      {item.sections && (
                        <div className="mt-2 ml-2 space-y-1 bg-gradient-to-br from-white/5 to-white/0 rounded-xl p-3 border border-white/5 backdrop-blur-sm">
                          {item.sections.map((section) => (
                            <div key={section.title} className="mb-4 last:mb-0">
                              <h4 className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400 mb-3 px-2 pt-1 text-base uppercase tracking-wider">
                                {section.title}
                              </h4>
                              <div className="space-y-1">
                                {section.items.map((subItem) => (
                                  <a
                                    key={subItem.title}
                                    href={subItem.url || '#'}
                                    className="group/item flex items-center gap-3 py-3.5 px-3 text-base text-gray-300 hover:text-white hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-violet-500 rounded-lg transition-all border border-transparent hover:border-white/10"
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
                                      <span className="text-sm bg-violet-500/20 text-violet-300 px-2 py-0.5 rounded-full border border-violet-500/30">
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
                  href="tel:480-519-5892"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-violet-500/10 border border-violet-500/20 hover:border-violet-500/40 transition-all group"
                  data-testid="mobile-call"
                  aria-label="Call us at 480-519-5892"
                >
                  <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center border border-violet-500/20">
                    <Phone className="h-5 w-5 text-violet-400" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Call Us</div>
                    <div className="font-semibold text-white group-hover:text-violet-400 transition-colors">480-519-5892</div>
                  </div>
                </a>

                <a
                  href="https://assist.zoho.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-violet-500/10 border border-violet-500/20 hover:border-violet-500/40 transition-all group"
                  data-testid="mobile-zoho-assist"
                  aria-label="Open Support remote session"
                >
                  <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center border border-violet-500/20">
                    <Monitor className="h-5 w-5 text-violet-400" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Remote Support</div>
                    <div className="font-semibold text-white group-hover:text-violet-400 transition-colors">Support</div>
                  </div>
                </a>
                
                <a
                  href={PORTAL_LOGIN}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group"
                  data-testid="mobile-portal"
                  aria-label="Access client portal"
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
                <button
                  type="button"
                  className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-fuchsia-600 via-pink-600 to-rose-500 hover:from-fuchsia-500 hover:via-pink-500 hover:to-rose-400 text-white font-bold py-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0118] transition-all rounded-xl border border-pink-300/25 shadow-[0_0_24px_rgba(236,72,153,0.28)] hover:shadow-[0_0_32px_rgba(236,72,153,0.36)] text-lg sm:text-xl"
                  onClick={() => { setMobileMenuOpen(false); openBooking("megamenu_mobile"); }}
                  data-testid="mobile-cta"
                  aria-label={CTA.primary}
                >
                  {CTA.primary}
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </button>
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
    </nav>
      </>
    </Tooltip.Provider>
  );
}
