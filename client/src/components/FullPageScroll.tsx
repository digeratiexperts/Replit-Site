import { useState, useEffect, useRef, useCallback, createContext, useContext } from 'react';

interface ScrollSection {
  id: string;
  label: string;
  theme?: 'dark' | 'light';
  /** When false, section is tracked for scroll/theme but omitted from On this page jumps. */
  showInNav?: boolean;
}

interface FullPageScrollContextType {
  currentSection: number;
  totalSections: number;
  scrollToSection: (index: number, opts?: { hash?: boolean }) => void;
  isSnapEnabled: boolean;
  toggleSnap: () => void;
  currentTheme: 'dark' | 'light';
  sectionProgress: number;
  sections: ScrollSection[];
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

function isNavChapter(section: ScrollSection): boolean {
  return section.showInNav !== false;
}

function adjacentNavIndex(
  sections: ScrollSection[],
  from: number,
  direction: 1 | -1
): number {
  let index = from + direction;
  while (index >= 0 && index < sections.length) {
    if (isNavChapter(sections[index])) return index;
    index += direction;
  }
  return from;
}

function lastNavIndex(sections: ScrollSection[]): number {
  for (let index = sections.length - 1; index >= 0; index -= 1) {
    if (isNavChapter(sections[index])) return index;
  }
  return Math.max(0, sections.length - 1);
}

function cssVarPx(name: string): number {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  if (!raw) return 0;
  if (raw.endsWith("rem")) {
    const rem = parseFloat(raw);
    const root = parseFloat(getComputedStyle(document.documentElement).fontSize) || 14;
    return rem * root;
  }
  return parseFloat(raw) || 0;
}

/** Live sticky MegaMenu bottom (utility + nav + spy, or compact scrolled bar). */
function getStickyNavBottom(): number {
  const nav = document.querySelector(".mega-menu-container");
  if (nav instanceof HTMLElement) {
    const bottom = nav.getBoundingClientRect().bottom;
    if (bottom > 0) return Math.round(bottom);
  }
  const live = cssVarPx("--de-nav-current-bottom");
  if (live > 0) return live;
  return cssVarPx("--de-nav-chrome");
}

/**
 * Chrome height after a non-hero jump: utility collapses, and on lg+ the spy TOC
 * hands off to the dock. Predicting this avoids a gap of the previous section.
 */
function getDestinationChromePx(): number {
  const compactNav = cssVarPx("--de-nav-h-scrolled");
  const spy = window.innerWidth < 1024 ? cssVarPx("--de-spy-h") : 0;
  if (compactNav > 0) return Math.round(compactNav + spy);
  return getStickyNavBottom();
}

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
  const [isSnapEnabled, setIsSnapEnabled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navGenRef = useRef(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scrollToSection = useCallback((index: number, opts?: { hash?: boolean }) => {
    if (index < 0 || index >= sections.length) return;

    const target = sections[index];
    const sectionElement = document.getElementById(target.id);
    if (!sectionElement) return;

    isScrollingRef.current = true;
    const gen = ++navGenRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;
    root.classList.add("de-snap-suppress");

    const isHero = index === 0 || target.id === "hero";
    const chromePx = isHero ? 0 : getDestinationChromePx();
    const rect = sectionElement.getBoundingClientRect();
    const targetY = isHero
      ? 0
      : Math.max(0, Math.round(window.scrollY + rect.top - chromePx));

    window.scrollTo({ top: targetY, behavior: reduceMotion ? "auto" : "smooth" });
    setCurrentSection(index);

    if (opts?.hash !== false) {
      const nextHash = `#${target.id}`;
      if (window.location.hash !== nextHash) {
        history.pushState(null, "", nextHash);
      }
    }

    const unlock = () => {
      isScrollingRef.current = false;
      root.classList.remove("de-snap-suppress");
    };

    const settle = () => {
      if (gen !== navGenRef.current) return;
      if (!isHero) {
        const drift = Math.round(
          sectionElement.getBoundingClientRect().top - getStickyNavBottom()
        );
        if (Math.abs(drift) > 2) {
          window.scrollTo({
            top: Math.max(0, window.scrollY + drift),
            behavior: "auto",
          });
        }
      }
      unlock();
    };

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Header utility collapse is 300ms — settle after that even for reduced motion.
    const finish = () => {
      if (gen !== navGenRef.current) return;
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(settle, reduceMotion ? 320 : 80);
    };

    if (reduceMotion) {
      finish();
      return;
    }

    const onScrollEnd = () => {
      window.removeEventListener("scrollend", onScrollEnd);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = null;
      }
      finish();
    };
    window.addEventListener("scrollend", onScrollEnd, { once: true });
    scrollTimeoutRef.current = setTimeout(() => {
      window.removeEventListener("scrollend", onScrollEnd);
      finish();
    }, 1200);
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
    return () => {
      root.classList.remove('de-section-snap');
      root.classList.remove('de-snap-suppress');
    };
  }, [isSnapEnabled, isMobile, enableOnMobile]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSnapEnabled(false);
        return;
      }

      // Snap is off by default. Do not steal native page/form scrolling.
      if (!isSnapEnabled || (isMobile && !enableOnMobile)) return;

      const target = e.target;
      if (
        target instanceof HTMLElement &&
        target.closest('input, textarea, select, [contenteditable="true"]')
      ) {
        return;
      }

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        scrollToSection(adjacentNavIndex(sections, currentSection, 1));
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        scrollToSection(adjacentNavIndex(sections, currentSection, -1));
      } else if (e.key === 'Home') {
        e.preventDefault();
        scrollToSection(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        scrollToSection(lastNavIndex(sections));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobile, enableOnMobile, isSnapEnabled, currentSection, sections, scrollToSection]);

  useEffect(() => {
    const onHashNav = () => {
      const id = window.location.hash.replace("#", "");
      if (!id) {
        scrollToSection(0, { hash: false });
        return;
      }
      const idx = sections.findIndex((section) => section.id === id);
      if (idx >= 0) {
        scrollToSection(idx, { hash: false });
      }
    };
    window.addEventListener("popstate", onHashNav);
    window.addEventListener("hashchange", onHashNav);
    return () => {
      window.removeEventListener("popstate", onHashNav);
      window.removeEventListener("hashchange", onHashNav);
    };
  }, [sections, scrollToSection]);

  const didInitHashRef = useRef(false);
  useEffect(() => {
    if (didInitHashRef.current) return;
    const id = window.location.hash.replace("#", "");
    if (!id) {
      didInitHashRef.current = true;
      return;
    }
    const idx = sections.findIndex((section) => section.id === id);
    didInitHashRef.current = true;
    if (idx < 0) return;
    const timer = window.setTimeout(() => {
      scrollToSection(idx, { hash: false });
    }, 100);
    return () => window.clearTimeout(timer);
  }, [sections, scrollToSection]);

  const effectiveSnapEnabled = isSnapEnabled && (!isMobile || enableOnMobile);

  return (
    <FullPageScrollContext.Provider value={{
      currentSection,
      totalSections: sections.length,
      scrollToSection,
      isSnapEnabled: effectiveSnapEnabled,
      toggleSnap,
      currentTheme: headerTheme,
      sectionProgress,
      sections,
    }}>
      <div
        ref={containerRef}
        data-header-theme={headerTheme}
      >
        {children}
      </div>
    </FullPageScrollContext.Provider>
  );
}

interface ScrollSectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  fullHeight?: boolean;
  minHeight?: boolean;
  /** Nav chapter: fill the viewport and snap under sticky chrome. */
  chapter?: boolean;
}

export function ScrollSection({ 
  id, 
  children, 
  className = '',
  fullHeight = false,
  minHeight = true,
  chapter = true
}: ScrollSectionProps) {
  return (
    <section
      id={id}
      className={`scroll-snap-section ${chapter ? 'scroll-snap-chapter' : ''} ${fullHeight ? 'h-screen' : ''} ${minHeight && !chapter ? 'min-h-[100svh] lg:min-h-screen' : ''} ${className}`}
      data-testid={`section-${id}`}
    >
      {children}
    </section>
  );
}

export function ScrollSectionAuto({ 
  id, 
  children, 
  className = '',
  chapter = false
}: Omit<ScrollSectionProps, 'fullHeight' | 'minHeight'>) {
  return (
    <section
      id={id}
      className={`scroll-snap-section-auto ${chapter ? 'scroll-snap-chapter' : ''} ${className}`}
      data-testid={`section-${id}`}
    >
      {children}
    </section>
  );
}
