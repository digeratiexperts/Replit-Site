import { useState, useEffect, useRef, useCallback, createContext, useContext } from 'react';
import { ArrowRight, Shield, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

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
const HEADER_THEME_PROBE_Y = 72;

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
  const snapTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollY = useRef(0);
  const sectionVisibility = useRef<Map<string, number>>(new Map());

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

  // Debounced snap-to-section on scroll end
  useEffect(() => {
    if (!isSnapEnabled || isMobile) return;
    
    const handleScrollEnd = () => {
      if (isScrollingRef.current) return;
      
      // Clear any existing snap timeout
      if (snapTimeoutRef.current) {
        clearTimeout(snapTimeoutRef.current);
      }
      
      // Debounce: wait for scroll to settle
      snapTimeoutRef.current = setTimeout(() => {
        // Find the section closest to the viewport center
        const viewportCenter = window.scrollY + window.innerHeight / 2;
        let closestSection = 0;
        let closestDistance = Infinity;
        
        sections.forEach((section, index) => {
          const element = document.getElementById(section.id);
          if (element) {
            const sectionCenter = element.offsetTop + element.offsetHeight / 2;
            const distance = Math.abs(viewportCenter - sectionCenter);
            if (distance < closestDistance) {
              closestDistance = distance;
              closestSection = index;
            }
          }
        });
        
        // Only snap if we're not already at the closest section
        const currentElement = document.getElementById(sections[closestSection]?.id);
        if (currentElement) {
          const rect = currentElement.getBoundingClientRect();
          // Only snap if section is partially visible but not well-aligned
          if (Math.abs(rect.top) > 50 && Math.abs(rect.top) < window.innerHeight * 0.4) {
            scrollToSection(closestSection);
          }
        }
      }, 150); // 150ms debounce
    };
    
    const handleScroll = () => {
      lastScrollY.current = window.scrollY;
      handleScrollEnd();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (snapTimeoutRef.current) {
        clearTimeout(snapTimeoutRef.current);
      }
    };
  }, [isSnapEnabled, isMobile, sections, scrollToSection]);

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

/** Desktop sticky section bar — matches live digeratexperts.com chrome. */
function SectionNavBar({ sections, currentSection, onNavigate }: SectionNavBarProps) {
  const navSections = sections
    .map((section, index) => ({ section, index }))
    .filter(({ section }) => section.showInNav !== false);

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

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 hidden lg:flex justify-center pointer-events-none px-4">
      <motion.nav
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pointer-events-auto flex flex-row items-center gap-1 py-2 px-4 rounded-full bg-black/95 backdrop-blur-xl border-2 border-[#D3126A]/60 shadow-[0_0_24px_rgba(211,18,106,0.35),0_4px_24px_rgba(0,0,0,0.5)]"
        aria-label="Section navigation"
      >
        <div className="flex items-center gap-2 pr-3 border-r border-white/20 mr-2">
          <Shield className="w-5 h-5 text-[#FF477F]" aria-hidden="true" />
          <span className="text-white font-medium text-sm whitespace-nowrap">Is Your Business Protected?</span>
        </div>

        {navSections.map(({ section, index }) => {
          const isActive = activeNavIndex === index;
          return (
            <button
              key={section.id}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onNavigate(index);
              }}
              className={`relative px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#FF477F] whitespace-nowrap ${
                isActive
                  ? 'bg-gradient-to-r from-[#D3126A] to-[#D3126A] text-white shadow-lg shadow-[#D3126A]/40'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
              aria-label={`Go to ${section.label} (section ${index + 1} of ${sections.length})`}
              aria-current={isActive ? 'true' : undefined}
              data-testid={`nav-dot-${section.id}`}
            >
              {section.label}
            </button>
          );
        })}

        <div className="w-px h-6 bg-white/20 mx-2" aria-hidden="true" />

        <a
          href="tel:325-480-9870"
          className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors text-sm whitespace-nowrap"
          data-testid="nav-phone"
        >
          <Phone className="w-4 h-4" aria-hidden="true" />
          <span>325-480-9870</span>
        </a>

        <a
          href="/book"
          className="flex items-center gap-1.5 px-4 py-1.5 text-sm font-semibold rounded-full bg-white text-[#D3126A] hover:bg-pink-50 transition-all duration-300 shadow-lg whitespace-nowrap ml-2"
          data-testid="nav-cta-assessment"
        >
          Free Assessment
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
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
