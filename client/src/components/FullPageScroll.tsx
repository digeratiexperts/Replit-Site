import { useState, useEffect, useRef, useCallback, createContext, useContext } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ScrollSection {
  id: string;
  label: string;
}

interface FullPageScrollContextType {
  currentSection: number;
  totalSections: number;
  scrollToSection: (index: number) => void;
  isSnapEnabled: boolean;
  toggleSnap: () => void;
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
      }, 1000);
    }
  }, [sections]);

  const toggleSnap = useCallback(() => {
    setIsSnapEnabled(prev => !prev);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (isScrollingRef.current) return;
      
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          if (currentSection !== i) {
            setCurrentSection(i);
          }
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections, currentSection]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isSnapEnabled) return;
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
  }, [isSnapEnabled, isMobile, enableOnMobile, currentSection, sections.length, scrollToSection]);

  const effectiveSnapEnabled = isSnapEnabled && (!isMobile || enableOnMobile);

  return (
    <FullPageScrollContext.Provider value={{
      currentSection,
      totalSections: sections.length,
      scrollToSection,
      isSnapEnabled: effectiveSnapEnabled,
      toggleSnap
    }}>
      <div 
        ref={containerRef}
        className={effectiveSnapEnabled ? 'scroll-snap-container' : ''}
        style={effectiveSnapEnabled ? {
          scrollSnapType: 'y proximity',
          overflowY: 'auto',
          height: '100vh',
          scrollBehavior: 'smooth'
        } : undefined}
      >
        {children}
      </div>
      
      <NavigationDots 
        sections={sections} 
        currentSection={currentSection} 
        onNavigate={scrollToSection}
        isVisible={effectiveSnapEnabled}
      />
      
      <ScrollDownIndicator 
        currentSection={currentSection}
        totalSections={sections.length}
        onScrollDown={() => scrollToSection(currentSection + 1)}
        isVisible={effectiveSnapEnabled && currentSection < sections.length - 1}
      />
      
      <ScrollUpButton
        onScrollUp={() => scrollToSection(0)}
        isVisible={currentSection > 0}
      />
    </FullPageScrollContext.Provider>
  );
}

interface NavigationDotsProps {
  sections: ScrollSection[];
  currentSection: number;
  onNavigate: (index: number) => void;
  isVisible: boolean;
}

function NavigationDots({ sections, currentSection, onNavigate, isVisible }: NavigationDotsProps) {
  if (!isVisible) return null;
  
  return (
    <motion.nav
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="fixed right-4 lg:right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-2"
      aria-label="Section navigation"
    >
      {sections.map((section, index) => (
        <button
          key={section.id}
          onClick={() => onNavigate(index)}
          className="group relative p-1.5 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:ring-offset-black rounded-full"
          aria-label={`Go to ${section.label}`}
          aria-current={currentSection === index ? 'true' : undefined}
          data-testid={`nav-dot-${section.id}`}
        >
          <span 
            className={`block w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              currentSection === index 
                ? 'bg-violet-400 scale-125 shadow-[0_0_10px_rgba(139,92,246,0.6)]' 
                : 'bg-white/20 hover:bg-white/40'
            }`}
          />
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2 py-1 bg-black/80 backdrop-blur-sm text-xs text-white rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10">
            {section.label}
          </span>
        </button>
      ))}
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
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 p-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-violet-400/50 transition-all group focus:outline-none focus:ring-2 focus:ring-violet-400"
          aria-label="Scroll to next section"
          data-testid="scroll-down-btn"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <ChevronDown className="w-6 h-6 text-white/60 group-hover:text-violet-400 transition-colors" />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

interface ScrollUpButtonProps {
  onScrollUp: () => void;
  isVisible: boolean;
}

function ScrollUpButton({ onScrollUp, isVisible }: ScrollUpButtonProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={onScrollUp}
          className="fixed bottom-8 right-4 lg:right-20 z-40 p-3 rounded-full bg-violet-600/80 backdrop-blur-sm border border-violet-500/50 hover:bg-violet-500 transition-all group focus:outline-none focus:ring-2 focus:ring-violet-400 shadow-lg shadow-violet-500/30"
          aria-label="Scroll to top"
          data-testid="scroll-up-btn"
        >
          <ChevronUp className="w-5 h-5 text-white" />
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
