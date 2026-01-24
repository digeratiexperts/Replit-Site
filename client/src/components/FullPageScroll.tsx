import { useState, useEffect, useRef, useCallback, createContext, useContext } from 'react';
import { ChevronDown, ChevronUp, Lock, Unlock } from 'lucide-react';
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
      toggleSnap,
      currentTheme: sections[currentSection]?.theme || 'dark'
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
        isVisible={true}
        currentTheme={sections[currentSection]?.theme || 'dark'}
        isSnapEnabled={effectiveSnapEnabled}
        onToggleSnap={toggleSnap}
      />
      
      <ScrollDownIndicator 
        currentSection={currentSection}
        totalSections={sections.length}
        onScrollDown={() => scrollToSection(currentSection + 1)}
        isVisible={effectiveSnapEnabled && currentSection < sections.length - 1}
        currentTheme={sections[currentSection]?.theme || 'dark'}
      />
      
      <ScrollUpButton
        onScrollUp={() => scrollToSection(0)}
        isVisible={currentSection > 0}
        currentTheme={sections[currentSection]?.theme || 'dark'}
      />
    </FullPageScrollContext.Provider>
  );
}

interface NavigationDotsProps {
  sections: ScrollSection[];
  currentSection: number;
  onNavigate: (index: number) => void;
  isVisible: boolean;
  currentTheme: 'dark' | 'light';
  isSnapEnabled: boolean;
  onToggleSnap: () => void;
}

function NavigationDots({ sections, currentSection, onNavigate, isVisible, currentTheme, isSnapEnabled, onToggleSnap }: NavigationDotsProps) {
  const isDark = currentTheme === 'dark';
  
  return (
    <motion.nav
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="fixed right-4 z-50 hidden lg:flex flex-col items-center gap-1.5 py-3 px-2 rounded-full backdrop-blur-md transition-colors duration-500"
      style={{
        top: '50%',
        transform: 'translateY(-50%)',
        marginTop: '-60px',
        backgroundColor: isDark ? 'rgba(0, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.8)',
        border: isDark ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(0, 0, 0, 0.1)',
        boxShadow: isDark ? '0 4px 20px rgba(0, 0, 0, 0.4)' : '0 4px 20px rgba(0, 0, 0, 0.15)'
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
        className={`group relative p-1.5 mb-1 rounded-full transition-all duration-300 ${
          isDark 
            ? 'hover:bg-white/20' 
            : 'hover:bg-gray-200/80'
        }`}
        aria-label={isSnapEnabled ? 'Switch to free scroll' : 'Switch to guided scroll'}
        data-testid="scroll-mode-toggle"
      >
        {isSnapEnabled ? (
          <Lock className={`w-3 h-3 transition-colors ${isDark ? 'text-violet-400' : 'text-violet-600'}`} />
        ) : (
          <Unlock className={`w-3 h-3 transition-colors ${isDark ? 'text-white/60' : 'text-gray-500'}`} />
        )}
        <span className={`absolute right-full mr-4 top-1/2 -translate-y-1/2 px-2.5 py-1.5 backdrop-blur-md text-xs font-medium rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-50 ${
          isDark 
            ? 'bg-black/90 text-white border border-white/20 shadow-xl' 
            : 'bg-white text-gray-800 border border-gray-200 shadow-xl'
        }`}>
          {isSnapEnabled ? 'Guided scroll' : 'Free scroll'}
        </span>
      </button>
      
      {/* Divider */}
      <div className={`w-4 h-px mb-1 ${isDark ? 'bg-white/20' : 'bg-gray-300'}`} />
      
      {sections.map((section, index) => {
        const isActive = currentSection === index;
        const useDarkStyle = isDark;
        
        return (
          <button
            key={section.id}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onNavigate(index);
            }}
            className={`group relative p-0.5 focus:outline-none rounded-full transition-all duration-300`}
            aria-label={`Go to ${section.label} (section ${index + 1} of ${sections.length})`}
            aria-current={isActive ? 'true' : undefined}
            data-testid={`nav-dot-${section.id}`}
          >
            <span 
              className={`block rounded-full transition-all duration-300 ${
                isActive 
                  ? useDarkStyle
                    ? 'w-2.5 h-2.5 bg-white shadow-[0_0_10px_rgba(255,255,255,0.6)]'
                    : 'w-2.5 h-2.5 bg-violet-600 shadow-[0_0_10px_rgba(139,92,246,0.6)]'
                  : useDarkStyle
                    ? 'w-2 h-2 bg-white/30 hover:bg-white/60'
                    : 'w-2 h-2 bg-gray-400/60 hover:bg-violet-500/80'
              }`}
            />
            <span className={`absolute right-full mr-4 top-1/2 -translate-y-1/2 px-2.5 py-1.5 backdrop-blur-md text-xs font-medium rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-50 ${
              useDarkStyle 
                ? 'bg-black/90 text-white border border-white/20 shadow-xl' 
                : 'bg-white text-gray-800 border border-gray-200 shadow-xl'
            }`}>
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
  currentTheme: 'dark' | 'light';
}

function ScrollDownIndicator({ onScrollDown, isVisible, currentTheme }: ScrollDownIndicatorProps) {
  const isDark = currentTheme === 'dark';
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          onClick={onScrollDown}
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-30 p-2.5 rounded-full backdrop-blur-sm transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-violet-400 hidden lg:flex ${
            isDark 
              ? 'bg-white/5 border border-white/20 hover:bg-white/10 hover:border-violet-400/50' 
              : 'bg-black/5 border border-gray-300 hover:bg-black/10 hover:border-violet-500/50 shadow-sm'
          }`}
          aria-label="Scroll to next section"
          data-testid="scroll-down-btn"
        >
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <ChevronDown className={`w-5 h-5 transition-colors duration-300 ${
              isDark 
                ? 'text-white/60 group-hover:text-violet-400' 
                : 'text-gray-500 group-hover:text-violet-600'
            }`} />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

interface ScrollUpButtonProps {
  onScrollUp: () => void;
  isVisible: boolean;
  currentTheme: 'dark' | 'light';
}

function ScrollUpButton({ onScrollUp, isVisible, currentTheme }: ScrollUpButtonProps) {
  const isDark = currentTheme === 'dark';
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={onScrollUp}
          className={`fixed bottom-6 right-[5.5rem] z-30 p-2.5 rounded-full backdrop-blur-sm transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-violet-400 hidden lg:flex ${
            isDark 
              ? 'bg-violet-600/80 border border-violet-500/50 hover:bg-violet-500 shadow-lg shadow-violet-500/30' 
              : 'bg-violet-600 border border-violet-500 hover:bg-violet-500 shadow-lg shadow-violet-500/40'
          }`}
          aria-label="Scroll to top"
          data-testid="scroll-up-btn"
        >
          <ChevronUp className="w-4 h-4 text-white" />
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
