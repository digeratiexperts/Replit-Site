interface WaveSeparatorProps {
  variant?: 'default' | 'inverted' | 'gradient' | 'multi' | 'smooth';
  className?: string;
}

export const WaveSeparator = ({ variant = 'default', className = '' }: WaveSeparatorProps): JSX.Element | null => {
  if (variant === 'default') {
    return (
      <div className={`wave-separator relative h-24 md:h-32 -mt-px ${className}`}>
        {/* Layer 1 - Back layer with gradient */}
        <svg
          viewBox="0 0 1440 120"
          className="wave-layer wave-animate-slow h-full opacity-20"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="wave-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#9333ea" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#9333ea" />
            </linearGradient>
          </defs>
          <path
            fill="url(#wave-gradient-1)"
            d="M0,96L48,90.7C96,85,192,75,288,69.3C384,64,480,64,576,74.7C672,85,768,107,864,112C960,117,1056,107,1152,90.7C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          />
        </svg>

        {/* Layer 2 - Middle layer */}
        <svg
          viewBox="0 0 1440 120"
          className="wave-layer wave-animate-reverse h-full opacity-30"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="wave-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7c3aed" />
              <stop offset="50%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
          </defs>
          <path
            fill="url(#wave-gradient-2)"
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          />
        </svg>

        {/* Layer 3 - Front layer with solid color */}
        <svg
          viewBox="0 0 1440 120"
          className="wave-layer wave-animate h-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="wave-gradient-3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6b21a8" />
              <stop offset="50%" stopColor="#1e40af" />
              <stop offset="100%" stopColor="#6b21a8" />
            </linearGradient>
          </defs>
          <path
            fill="url(#wave-gradient-3)"
            d="M0,32L48,42.7C96,53,192,75,288,74.7C384,75,480,53,576,42.7C672,32,768,32,864,48C960,64,1056,96,1152,106.7C1248,117,1344,107,1392,101.3L1440,96L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          />
        </svg>
      </div>
    );
  }

  if (variant === 'inverted') {
    return (
      <div className={`wave-separator relative h-24 md:h-32 -mb-px ${className}`}>
        {/* Layer 1 - Back layer */}
        <svg
          viewBox="0 0 1440 120"
          className="wave-layer wave-animate-slow h-full opacity-20"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="wave-gradient-inv-1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#9333ea" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#9333ea" />
            </linearGradient>
          </defs>
          <path
            fill="url(#wave-gradient-inv-1)"
            d="M0,24L48,29.3C96,35,192,45,288,50.7C384,56,480,56,576,45.3C672,35,768,13,864,8C960,3,1056,13,1152,29.3C1248,45,1344,67,1392,77.3L1440,88L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </svg>

        {/* Layer 2 - Middle layer */}
        <svg
          viewBox="0 0 1440 120"
          className="wave-layer wave-animate-reverse h-full opacity-30"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="wave-gradient-inv-2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7c3aed" />
              <stop offset="50%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
          </defs>
          <path
            fill="url(#wave-gradient-inv-2)"
            d="M0,56L48,50.7C96,45,192,35,288,40C384,45,480,67,576,72C672,77,768,67,864,61.3C960,56,1056,56,1152,61.3C1248,67,1344,77,1392,82.7L1440,88L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </svg>

        {/* Layer 3 - Front layer */}
        <svg
          viewBox="0 0 1440 120"
          className="wave-layer wave-animate h-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="wave-gradient-inv-3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6b21a8" />
              <stop offset="50%" stopColor="#1e40af" />
              <stop offset="100%" stopColor="#6b21a8" />
            </linearGradient>
          </defs>
          <path
            fill="url(#wave-gradient-inv-3)"
            d="M0,88L48,77.3C96,67,192,45,288,45.3C384,45,480,67,576,77.3C672,88,768,88,864,72C960,56,1056,24,1152,13.3C1248,3,1344,13,1392,18.7L1440,24L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </svg>
      </div>
    );
  }

  if (variant === 'gradient') {
    return (
      <div className={`wave-separator relative h-20 md:h-24 ${className}`}>
        {/* Gradient background layer */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 opacity-10"></div>
        
        {/* Main wave */}
        <svg
          viewBox="0 0 1440 120"
          className="wave-layer wave-animate h-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="wave-gradient-main" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#9333ea" stopOpacity="0.8" />
              <stop offset="25%" stopColor="#7c3aed" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="1" />
              <stop offset="75%" stopColor="#2563eb" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#9333ea" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <path
            fill="url(#wave-gradient-main)"
            d="M0,60L60,65C120,70,240,80,360,78.3C480,77,600,63,720,53.3C840,43,960,37,1080,41.7C1200,47,1320,63,1380,71.7L1440,80L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
          />
        </svg>
      </div>
    );
  }

  if (variant === 'multi') {
    return (
      <div className={`wave-separator relative h-32 md:h-40 ${className}`}>
        {/* Layer 1 - Furthest back */}
        <svg
          viewBox="0 0 1440 160"
          className="wave-layer wave-animate-slow h-full opacity-10"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="multi-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#60a5fa" />
            </linearGradient>
          </defs>
          <path
            fill="url(#multi-gradient-1)"
            d="M0,128L80,122.7C160,117,320,107,480,122.7C640,139,800,181,960,181.3C1120,181,1280,139,1360,117.3L1440,96L1440,160L1360,160C1280,160,1120,160,960,160C800,160,640,160,480,160C320,160,160,160,80,160L0,160Z"
          />
        </svg>

        {/* Layer 2 */}
        <svg
          viewBox="0 0 1440 160"
          className="wave-layer wave-animate-reverse h-full opacity-20"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="multi-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
          <path
            fill="url(#multi-gradient-2)"
            d="M0,96L80,106.7C160,117,320,139,480,128C640,117,800,75,960,64C1120,53,1280,75,1360,85.3L1440,96L1440,160L1360,160C1280,160,1120,160,960,160C800,160,640,160,480,160C320,160,160,160,80,160L0,160Z"
          />
        </svg>

        {/* Layer 3 */}
        <svg
          viewBox="0 0 1440 160"
          className="wave-layer wave-animate h-full opacity-40"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="multi-gradient-3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
          </defs>
          <path
            fill="url(#multi-gradient-3)"
            d="M0,64L80,80C160,96,320,128,480,128C640,128,800,96,960,80C1120,64,1280,64,1360,64L1440,64L1440,160L1360,160C1280,160,1120,160,960,160C800,160,640,160,480,160C320,160,160,160,80,160L0,160Z"
          />
        </svg>

        {/* Layer 4 - Front */}
        <svg
          viewBox="0 0 1440 160"
          className="wave-layer h-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="multi-gradient-4" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#1e40af" />
            </linearGradient>
          </defs>
          <path
            fill="url(#multi-gradient-4)"
            d="M0,32L80,53.3C160,75,320,117,480,122.7C640,128,800,96,960,74.7C1120,53,1280,43,1360,37.3L1440,32L1440,160L1360,160C1280,160,1120,160,960,160C800,160,640,160,480,160C320,160,160,160,80,160L0,160Z"
          />
        </svg>
      </div>
    );
  }

  if (variant === 'smooth') {
    return (
      <div className={`wave-separator relative h-16 md:h-20 ${className}`}>
        <svg
          viewBox="0 0 1440 100"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="smooth-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#9333ea" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#9333ea" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <path
            fill="url(#smooth-gradient)"
            d="M0,50Q360,0,720,50T1440,50L1440,100L0,100Z"
            className="wave-animate-slow"
          />
        </svg>
      </div>
    );
  }

  return null;
};