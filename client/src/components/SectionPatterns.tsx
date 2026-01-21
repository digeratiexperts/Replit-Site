import { motion, useReducedMotion } from "framer-motion";

interface PatternOverlayProps {
  variant?: "grid" | "dots" | "diagonal" | "noise";
  opacity?: number;
  className?: string;
}

export const PatternOverlay = ({ 
  variant = "grid", 
  opacity = 0.03,
  className = ""
}: PatternOverlayProps) => {
  const patterns = {
    grid: {
      backgroundImage: `
        linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
      `,
      backgroundSize: '60px 60px'
    },
    dots: {
      backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)`,
      backgroundSize: '24px 24px'
    },
    diagonal: {
      backgroundImage: `repeating-linear-gradient(
        45deg,
        transparent,
        transparent 10px,
        rgba(255,255,255,0.02) 10px,
        rgba(255,255,255,0.02) 20px
      )`
    },
    noise: {
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      backgroundSize: '128px 128px'
    }
  };

  return (
    <div 
      className={`absolute inset-0 pointer-events-none z-0 ${className}`}
      style={{ ...patterns[variant], opacity }}
    />
  );
};

interface WaveDividerProps {
  position?: "top" | "bottom";
  fromColor?: string;
  toColor?: string;
  height?: number;
  flip?: boolean;
}

export const WaveDivider = ({ 
  position = "bottom",
  fromColor = "#0a0118",
  toColor = "#F7FAFC",
  height = 80,
  flip = false
}: WaveDividerProps) => {
  return (
    <div 
      className={`absolute left-0 right-0 overflow-hidden pointer-events-none z-0 ${position === "top" ? "top-0" : "bottom-0"}`}
      style={{ 
        height: `${height}px`,
        transform: flip ? "scaleY(-1)" : undefined
      }}
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="absolute w-full h-full"
        style={{ transform: position === "top" ? "rotate(180deg)" : undefined }}
      >
        <path
          d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,40 1440,60 L1440,120 L0,120 Z"
          fill={toColor}
        />
      </svg>
    </div>
  );
};

interface DiagonalDividerProps {
  position?: "top" | "bottom";
  fromColor?: string;
  toColor?: string;
  height?: number;
  angle?: "left" | "right";
  accent?: boolean;
}

export const DiagonalDivider = ({ 
  position = "bottom",
  toColor = "#0a0a0a",
  height = 40,
  accent = true
}: DiagonalDividerProps) => {
  // Simple gradient fade - no diagonal, just a clean blend
  const gradientDirection = position === "top" ? "to top" : "to bottom";
  const fromColor = "transparent";
  
  return (
    <div 
      className={`absolute left-0 right-0 pointer-events-none z-10 ${position === "top" ? "top-0" : "bottom-0"}`}
      style={{ height: `${height}px` }}
    >
      {/* Clean gradient fade */}
      <div 
        className="absolute inset-0"
        style={{ 
          background: `linear-gradient(${gradientDirection}, ${fromColor} 0%, ${toColor} 100%)`
        }}
      />
      {/* Subtle violet accent line at edge */}
      {accent && (
        <div 
          className={`absolute left-0 right-0 h-px ${position === "top" ? "top-0" : "bottom-0"}`}
          style={{
            background: `linear-gradient(to right, transparent 10%, rgba(139, 92, 246, 0.3) 30%, rgba(139, 92, 246, 0.4) 50%, rgba(139, 92, 246, 0.3) 70%, transparent 90%)`
          }}
        />
      )}
    </div>
  );
};

interface GlowOrbProps {
  color?: string;
  size?: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  blur?: number;
  animate?: boolean;
}

export const GlowOrb = ({ 
  color = "rgba(139, 92, 246, 0.15)",
  size = 400,
  top,
  left,
  right,
  bottom,
  blur = 120,
  animate = true
}: GlowOrbProps) => {
  const prefersReducedMotion = useReducedMotion();
  
  const OrbElement = animate && !prefersReducedMotion ? motion.div : "div";
  
  const animationProps = animate && !prefersReducedMotion ? {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.8, 1, 0.8],
    },
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
    }
  } : {};

  return (
    <OrbElement
      className="absolute rounded-full pointer-events-none z-0"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: `blur(${blur}px)`,
        top,
        left,
        right,
        bottom,
      }}
      {...animationProps}
    />
  );
};

interface SectionBackgroundProps {
  variant: "dark-primary" | "dark-secondary" | "light" | "accent" | "gradient-mesh";
  children?: React.ReactNode;
  className?: string;
  withPattern?: boolean;
  patternVariant?: "grid" | "dots" | "diagonal";
}

export const SectionBackground = ({
  variant,
  children,
  className = "",
  withPattern = true,
  patternVariant = "grid"
}: SectionBackgroundProps) => {
  const backgrounds = {
    "dark-primary": "bg-[#0a0118]",
    "dark-secondary": "bg-gradient-to-b from-[#0f0720] to-[#0a0118]",
    "light": "bg-gradient-to-br from-[#F7FAFC] via-[#EDF2F7] to-[#E2E8F0]",
    "accent": "bg-gradient-to-br from-[#1a1040] via-[#251654] to-[#1a1040]",
    "gradient-mesh": ""
  };

  return (
    <div className={`relative ${backgrounds[variant]} ${className}`}>
      {variant === "gradient-mesh" && (
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.15), transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.12), transparent 45%),
              radial-gradient(circle at 50% 80%, rgba(34, 211, 238, 0.1), transparent 50%),
              linear-gradient(to bottom, #0a0118, #0d0720, #0a0118)
            `
          }}
        />
      )}
      {withPattern && <PatternOverlay variant={patternVariant} opacity={variant === "light" ? 0.04 : 0.02} />}
      {children}
    </div>
  );
};
