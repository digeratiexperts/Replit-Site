import { useState, useEffect, useRef, useCallback, createContext, useContext } from 'react';
import { ArrowRight, Shield, Phone, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { CTA } from '@/lib/ctaCopy';

interface ScrollSection {
  id: string;
  label: string;
  theme?: 'dark' | 'light';
  /** When false, section is tracked for scroll/theme but hidden from the sticky bar. */
  showInNav?: boolean;
}

interface FullPageScrollContextType {
  currentSection: number;
  totalSections: number;
  scrollToSection: (index: number) => void;
  isSnapEnabled: boolean;
  toggleSnap: () => void;
  currentTheme: 'dark' | 'light';
  sectionProgress: number;
}

const FullPageScrollContext = createContext<FullPageScrollContextType | null>(null);

export const useFullPageScroll = () => {
  const context = useContext(FullPageScrollContext);
  if (!context) {
    throw new Error('useFullPageScroll must be used within FullPageScrollProvider');
  }
  return context;
};

/** Safe for MegaMenu / chrome that also render outside the homepage provider. */
export const useOptionalFullPageScroll = () => useContext(FullPageScrollContext);

/** Viewport Y under the fixed header — logo/nav theme must follow this band, not center. */
const HEADER_THEME_PROBE_Y = 96;

interface FullPageScrollProviderProps {
  children: React.ReactNode;
  sections: ScrollSection[];
  enableOnMobile?: boolean;
}

export function FullPageScrollProvider({ 
  children, 
  sections,
  enableOnMobile = false 
}: FullPageScrollProviderProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const [sectionProgress, setSectionProgress] = useState(0);
  const [headerTheme, setHeaderTheme] = useState<'dark' | 'light'>(
    () => sections[0]?.theme || 'dark'
  );
  const [isSnapEnabled, setIsSnapEnabled] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scrollToSection = useCallback((index: number) => {
    if (index < 0 || index >= sections.length) return;
    
    const sectionElement = document.getElementById(sections[index].id);
    if (sectionElement) {
      isScrollingRef.current = true;
      sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setCurrentSection(index);
      
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 800);
    }
  }, [sections]);

  const toggleSnap = useCallback(() => {
    setIsSnapEnabled(prev => !prev);
  }, []);

  // Center index for keyboard/progress; header-band theme for nav/logo chrome
  useEffect(() => {
    const findCenterSection = () => {
      if (isScrollingRef.current) return;
      
      const viewportCenter = window.scrollY + window.innerHeight / 2;
      let closestSection = 0;
      let closestDistance = Infinity;
      
      sections.forEach((section, index) => {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = window.scrollY + rect.top;
          const elementCenter = elementTop + element.offsetHeight / 2;
          const distance = Math.abs(viewportCenter - elementCenter);
          
          // Also check if viewport center is within the section bounds
          const isWithinSection = viewportCenter >= elementTop && 
                                   viewportCenter <= elementTop + element.offsetHeight;
          
          if (isWithinSection) {
            closestSection = index;
            closestDistance = 0;
          } else if (distance < closestDistance) {
            closestDistance = distance;
            closestSection = index;
          }
        }
      });
      
      if (currentSection !== closestSection) {
        setCurrentSection(closestSection);
      }
    };

    const findHeaderTheme = () => {
      let matched: 'dark' | 'light' | null = null;
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (!element) continue;
        const rect = element.getBoundingClientRect();
        if (rect.top <= HEADER_THEME_PROBE_Y && rect.bottom > HEADER_THEME_PROBE_Y) {
          matched = section.theme || 'dark';
          break;
        }
      }
      const nextTheme = matched ?? sections[currentSection]?.theme ?? 'dark';
      setHeaderTheme((prev) => (prev === nextTheme ? prev : nextTheme));
    };
    
    let rafId: number;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        findCenterSection();
        findHeaderTheme();
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    findCenterSection();
    findHeaderTheme();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [sections, currentSection]);

  // Scroll progress tracking within current section
  useEffect(() => {
    const handleScroll = () => {
      const currentElement = document.getElementById(sections[currentSection]?.id);
      if (currentElement) {
        const rect = currentElement.getBoundingClientRect();
        const sectionHeight = currentElement.offsetHeight;
        const viewportHeight = window.innerHeight;
        
        // Calculate how much of the section has been scrolled
        const scrolled = Math.max(0, -rect.top);
        const progress = Math.min(1, Math.max(0, scrolled / (sectionHeight - viewportHeight * 0.5)));
        setSectionProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections, currentSection]);

  // CSS proximity snap only (html.de-section-snap). No JS scrollIntoView on scroll —
  // that fought the wheel/trackpad and felt like the page was yanking position.
  useEffect(() => {
    const root = document.documentElement;
    const apply = () => {
      if (isSnapEnabled && (!isMobile || enableOnMobile)) {
        root.classList.add('de-section-snap');
      } else {
        root.classList.remove('de-section-snap');
      }
    };
    apply();
    return () => root.classList.remove('de-section-snap');
  }, [isSnapEnabled, isMobile, enableOnMobile]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isMobile && !enableOnMobile) return;
      
      if (e.key === 'Escape') {
        setIsSnapEnabled(false);
        return;
      }
      
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        scrollToSection(Math.min(currentSection + 1, sections.length - 1));
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        scrollToSection(Math.max(currentSection - 1, 0));
      } else if (e.key === 'Home') {
        e.preventDefault();
        scrollToSection(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        scrollToSection(sections.length - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobile, enableOnMobile, currentSection, sections.length, scrollToSection]);

  const effectiveSnapEnabled = isSnapEnabled && (!isMobile || enableOnMobile);

  return (
    <FullPageScrollContext.Provider value={{
      currentSection,
      totalSections: sections.length,
      scrollToSection,
      isSnapEnabled: effectiveSnapEnabled,
      toggleSnap,
      currentTheme: headerTheme,
      sectionProgress
    }}>
      <div 
        ref={containerRef}
        className="scroll-smooth"
        data-header-theme={headerTheme}
      >
        {children}
      </div>
      
      {!isMobile && (
        <SectionNavBar
          sections={sections}
          currentSection={currentSection}
          onNavigate={scrollToSection}
        />
      )}
    </FullPageScrollContext.Provider>
  );
}

interface SectionNavBarProps {
  sections: ScrollSection[];
  currentSection: number;
  onNavigate: (index: number) => void;
}

/** Primary sticky links — rest live under More so the pill does not overflow. */
/** Slim primary row — Team/FAQ/etc. stay under More to cut dock clutter vs top nav. */
const SECTION_NAV_PRIMARY = new Set([
  'hero',
  'stats',
  'services',
  'pricing',
  'industries',
  'contact',
]);

/** Desktop sticky section bar — primary row + More; roomy padding with FAB clearance on the right. */
function SectionNavBar({ sections, currentSection, onNavigate }: SectionNavBarProps) {
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const dockRef = useRef<HTMLDivElement>(null);

  const navSections = sections
    .map((section, index) => ({ section, index }))
    .filter(({ section }) => section.showInNav !== false);

  const primary = navSections.filter(({ section }) => SECTION_NAV_PRIMARY.has(section.id));
  const moreItems = navSections.filter(({ section }) => !SECTION_NAV_PRIMARY.has(section.id));

  // Highlight the nearest nav-visible section when scrolling a hidden-in-nav block.
  const activeNavIndex = (() => {
    if (navSections.some(({ index }) => index === currentSection)) return currentSection;
    let best = navSections[0]?.index ?? 0;
    let bestDist = Infinity;
    for (const { index } of navSections) {
      const dist = Math.abs(index - currentSection);
      if (dist < bestDist) {
        bestDist = dist;
        best = index;
      }
    }
    return best;
  })();

  const moreContainsActive = moreItems.some(({ index }) => index === activeNavIndex);

  useEffect(() => {
    if (!moreOpen) return;
    const onPointer = (event: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setMoreOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMoreOpen(false);
    };
    document.addEventListener('mousedown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [moreOpen]);

  useEffect(() => {
    const el = dockRef.current;
    if (!el) return;

    const publish = () => {
      const root = document.documentElement;
      const rect = el.getBoundingClientRect();
      const visible = rect.height > 0 && window.getComputedStyle(el).display !== "none";
      const offset = visible
        ? Math.round(window.innerHeight - rect.top + 8)
        : 0;
      root.style.setProperty("--de-dock-offset", `${offset}px`);
    };

    publish();
    const ro = new ResizeObserver(publish);
    ro.observe(el);
    window.addEventListener("resize", publish);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", publish);
      document.documentElement.style.setProperty("--de-dock-offset", "0px");
    };
  }, []);

  const renderNavButton = (
    section: ScrollSection,
    index: number,
    opts?: { block?: boolean }
  ) => {
    const isActive = activeNavIndex === index;
    return (
      <button
        key={section.id}
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setMoreOpen(false);
          onNavigate(index);
        }}
        className={`${opts?.block ? 'w-full justify-start text-left' : ''} relative inline-flex items-center px-3.5 py-1.5 text-sm font-semibold rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#FF477F] whitespace-nowrap shrink-0 ${
          isActive
            ? 'bg-[#D3126A] text-white shadow-lg shadow-[#D3126A]/40'
            : 'text-white/75 hover:text-white hover:bg-white/10'
        }`}
        aria-label={`Go to ${section.label}`}
        aria-current={isActive ? 'true' : undefined}
        data-testid={`nav-dot-${section.id}`}
      >
        {section.label}
      </button>
    );
  };

  return (
    <div
      ref={dockRef}
      data-de-section-dock
      className="fixed bottom-3 left-3 right-[17rem] xl:left-4 xl:right-[17.5rem] 2xl:right-[18.5rem] z-40 hidden lg:flex justify-center pointer-events-none min-w-0"
    >
      <motion.nav
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pointer-events-auto flex w-max min-w-0 max-w-full flex-row items-center gap-1 overflow-visible py-2 px-3.5 rounded-full bg-black/95 backdrop-blur-xl border-2 border-[#D3126A]/60 shadow-[0_0_24px_rgba(211,18,106,0.35),0_4px_24px_rgba(0,0,0,0.5)]"
        aria-label="Section navigation"
      >
        <div className="hidden xl:flex items-center gap-2 pr-3 border-r border-white/20 mr-2 shrink-0">
          <Shield className="w-4 h-4 text-[#FF477F]" aria-hidden="true" />
          <span className="text-white font-semibold text-sm whitespace-nowrap">Protected?</span>
        </div>

        <div className="flex items-center gap-1 min-w-0 overflow-x-auto scrollbar-none">
          {primary.map(({ section, index }) => renderNavButton(section, index))}
        </div>

        {moreItems.length > 0 && (
          <div className="relative shrink-0" ref={moreRef}>
            <button
              type="button"
              onClick={() => setMoreOpen((open) => !open)}
              className={`inline-flex items-center gap-1 px-3.5 py-1.5 text-sm font-semibold rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-[#FF477F] ${
                moreOpen || moreContainsActive
                  ? 'bg-white/15 text-white'
                  : 'text-white/75 hover:text-white hover:bg-white/10'
              }`}
              aria-expanded={moreOpen}
              aria-haspopup="menu"
              data-testid="nav-section-more"
            >
              More
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${moreOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
            </button>
            {moreOpen && (
              <div
                role="menu"
                className="absolute bottom-[calc(100%+0.5rem)] right-0 min-w-[11rem] rounded-2xl border border-white/15 bg-black/95 backdrop-blur-xl p-2 shadow-2xl z-50"
              >
                {moreItems.map(({ section, index }) => renderNavButton(section, index, { block: true }))}
              </div>
            )}
          </div>
        )}

        <div className="w-px h-6 bg-white/20 mx-2 shrink-0" aria-hidden="true" />

        <a
          href="tel:480-519-5892"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-white/90 hover:text-white hover:bg-white/10 transition-colors shrink-0 text-sm font-medium"
          data-testid="nav-phone"
          aria-label="Call 480-519-5892"
          title="480-519-5892"
        >
          <Phone className="w-4 h-4 text-[#FF477F]" aria-hidden="true" />
          <span className="hidden xl:inline">480-519-5892</span>
        </a>

        <a
          href="/book"
          className="flex items-center gap-1.5 px-4 py-1.5 text-sm font-semibold rounded-lg bg-gradient-to-r from-fuchsia-600 via-pink-600 to-rose-500 hover:from-fuchsia-500 hover:via-pink-500 hover:to-rose-400 text-white border border-pink-300/25 shadow-lg shadow-pink-500/30 whitespace-nowrap shrink-0"
          data-testid="nav-cta-assessment"
          aria-label={CTA.primary}
        >
          {CTA.primaryNavCompact}
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </a>
      </motion.nav>
    </div>
  );
}


interface ScrollSectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  fullHeight?: boolean;
  minHeight?: boolean;
}

export function ScrollSection({ 
  id, 
  children, 
  className = '',
  fullHeight = false,
  minHeight = true
}: ScrollSectionProps) {
  return (
    <section
      id={id}
      className={`scroll-snap-section ${fullHeight ? 'h-screen' : ''} ${minHeight ? 'min-h-screen' : ''} ${className}`}
      style={{
        scrollSnapAlign: 'start',
        scrollSnapStop: 'normal'
      }}
      data-testid={`section-${id}`}
    >
      {children}
    </section>
  );
}

export function ScrollSectionAuto({ 
  id, 
  children, 
  className = ''
}: Omit<ScrollSectionProps, 'fullHeight' | 'minHeight'>) {
  return (
    <section
      id={id}
      className={`scroll-snap-section-auto ${className}`}
      style={{
        scrollSnapAlign: 'start'
      }}
      data-testid={`section-${id}`}
    >
      {children}
    </section>
  );
}
