import { useEffect, useState } from "react";

interface ReadingProgressBarProps {
  targetRef?: React.RefObject<HTMLElement>;
}

export function ReadingProgressBar({ targetRef }: ReadingProgressBarProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const calculateProgress = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const scrollProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
          
          setProgress(Math.min(100, Math.max(0, scrollProgress)));
          setIsVisible(scrollTop > 150);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", calculateProgress, { passive: true });
    calculateProgress();
    
    return () => window.removeEventListener("scroll", calculateProgress);
  }, []);

  return (
    <div 
      className={`fixed top-0 left-0 right-0 z-[100] transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="h-1 bg-white/10 w-full">
        <div 
          className="h-full bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 transition-transform duration-150 ease-out origin-left"
          style={{ transform: `scaleX(${progress / 100})` }}
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Reading progress"
          data-testid="reading-progress-bar"
        />
      </div>
      {isVisible && (
        <div className="absolute right-4 top-2 text-xs text-white/50 font-medium">
          {Math.round(progress)}% read
        </div>
      )}
    </div>
  );
}
