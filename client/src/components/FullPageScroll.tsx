import { useState, useEffect, useRef, useCallback, createContext, useContext } from 'react';
import { ChevronDown, Lock, Unlock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ScrollSection {
  id: string;
  label: string;
  theme?: 'dark' | 'light';
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

  // Center-based section tracking for reliable theme switching
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
    
    // Use requestAnimationFrame for smooth updates
    let rafId: number;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(findCenterSection);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    findCenterSection();
    
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
      currentTheme: sections[currentSection]?.theme || 'dark',
      sectionProgress
    }}>
      <div 
        ref={containerRef}
        className="scroll-smooth"
      >
        {children}
      </div>
      
      <NavigationDots 
        sections={sections} 
        currentSection={currentSection} 
        onNavigate={scrollToSection}
        isSnapEnabled={effectiveSnapEnabled}
        onToggleSnap={toggleSnap}
        sectionProgress={sectionProgress}
      />
      
      <ScrollDownIndicator 
        currentSection={currentSection}
        totalSections={sections.length}
        onScrollDown={() => scrollToSection(currentSection + 1)}
        isVisible={effectiveSnapEnabled && currentSection < sections.length - 1}
      />
      
    </FullPageScrollContext.Provider>
  );
}

interface NavigationDotsProps {
  sections: ScrollSection[];
  currentSection: number;
  onNavigate: (index: number) => void;
  isSnapEnabled: boolean;
  onToggleSnap: () => void;
  sectionProgress: number;
}

function NavigationDots({ sections, currentSection, onNavigate, isSnapEnabled, onToggleSnap, sectionProgress }: NavigationDotsProps) {
  return (
    <motion.nav
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      className="fixed right-3 z-50 hidden lg:flex flex-col items-center gap-1 py-2 px-1 rounded-full"
      style={{
        top: '50%',
        transform: 'translateY(-50%)',
        marginTop: '-40px',
      }}
      aria-label="Section navigation"
    >
      {/* Scroll mode toggle */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onToggleSnap();
        }}
        className="group relative p-1 mb-0.5 rounded-full transition-all duration-300 hover:bg-violet-500/20"
        aria-label={isSnapEnabled ? 'Switch to free scroll' : 'Switch to guided scroll'}
        data-testid="scroll-mode-toggle"
      >
        {isSnapEnabled ? (
          <Lock className="w-2.5 h-2.5 text-violet-400 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
        ) : (
          <Unlock className="w-2.5 h-2.5 text-violet-400/60 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
        )}
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2 py-1 bg-black/80 backdrop-blur-md text-white text-[10px] font-medium rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-50 shadow-lg">
          {isSnapEnabled ? 'Guided scroll' : 'Free scroll'}
        </span>
      </button>
      
      {/* Divider */}
      <div className="w-2 h-px mb-0.5 bg-violet-400/30" />
      
      {sections.map((section, index) => {
        const isActive = currentSection === index;
        
        return (
          <button
            key={section.id}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onNavigate(index);
            }}
            className="group relative p-0.5 focus:outline-none rounded-full"
            aria-label={`Go to ${section.label} (section ${index + 1} of ${sections.length})`}
            aria-current={isActive ? 'true' : undefined}
            data-testid={`nav-dot-${section.id}`}
          >
            {/* Progress ring for active dot */}
            {isActive && (
              <motion.span
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute inset-0 rounded-full"
                style={{
                  background: `conic-gradient(from 0deg, rgba(167, 139, 250, 0.9) ${sectionProgress * 360}deg, transparent ${sectionProgress * 360}deg)`,
                  transform: 'scale(1.8)',
                  opacity: 0.5
                }}
              />
            )}
            
            <motion.span 
              animate={isActive ? {
                scale: [1, 1.15, 1],
              } : {}}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className={`block rounded-full transition-all duration-300 relative z-10 ${
                isActive 
                  ? 'w-1.5 h-1.5 bg-violet-400'
                  : 'w-1 h-1 bg-violet-400/40 hover:bg-violet-400/80'
              }`}
              style={{
                boxShadow: isActive 
                  ? '0 0 8px rgba(167, 139, 250, 0.8), 0 1px 3px rgba(0, 0, 0, 0.4)' 
                  : '0 1px 2px rgba(0, 0, 0, 0.3)',
                transition: 'all 0.3s ease'
              }}
            />
            <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2 py-1 bg-black/80 backdrop-blur-md text-white text-[10px] font-medium rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-50 shadow-lg">
              {section.label}
            </span>
          </button>
        );
      })}
    </motion.nav>
  );
}

interface ScrollDownIndicatorProps {
  currentSection: number;
  totalSections: number;
  onScrollDown: () => void;
  isVisible: boolean;
}

function ScrollDownIndicator({ onScrollDown, isVisible }: ScrollDownIndicatorProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          onClick={onScrollDown}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 p-2 rounded-full group focus:outline-none focus:ring-2 focus:ring-violet-400 hidden lg:flex bg-violet-500/20 backdrop-blur-sm border border-violet-400/30 hover:bg-violet-500/30 hover:border-violet-400/50"
          style={{
            boxShadow: '0 2px 8px rgba(0,0,0,0.3), 0 0 12px rgba(167, 139, 250, 0.2)',
          }}
          aria-label="Scroll to next section"
          data-testid="scroll-down-btn"
        >
          <motion.div
            animate={{ y: [0, 3, 0] }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <ChevronDown className="w-4 h-4 text-violet-300 group-hover:text-violet-200 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
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
