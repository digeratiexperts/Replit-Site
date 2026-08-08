import { MegaMenu } from "@/components/MegaMenu";
import { DigeratiEnhancedFooterSection } from "@/pages/sections/DigeratiEnhancedFooterSection";
import { ArrowLeft, Shield, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "wouter";

interface PageTemplateProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  showBackButton?: boolean;
  gradientColors?: string;
  icon?: React.ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
  variant?: "default" | "dark" | "light";
}

const FloatingOrbs = ({ prefersReducedMotion }: { prefersReducedMotion: boolean }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <motion.div
      className="absolute -top-20 -right-20 w-96 h-96 rounded-full"
      style={{ background: "radial-gradient(circle, rgba(236, 72, 153, 0.2) 0%, rgba(139, 92, 246, 0.12) 45%, transparent 68%)" }}
      animate={prefersReducedMotion ? {} : {
        x: [0, 20, 0],
        y: [0, -15, 0],
        scale: [1, 1.05, 1],
      }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full"
      style={{ background: "radial-gradient(circle, rgba(217, 70, 239, 0.16) 0%, transparent 65%)" }}
      animate={prefersReducedMotion ? {} : {
        x: [0, -15, 0],
        y: [0, 20, 0],
        scale: [1, 1.08, 1],
      }}
      transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full"
      style={{ background: "radial-gradient(circle, rgba(244, 63, 94, 0.1) 0%, transparent 65%)" }}
      animate={prefersReducedMotion ? {} : {
        scale: [1, 1.12, 1],
        opacity: [0.3, 0.45, 0.3],
      }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>
);

const GridPattern = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.08]">
    <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid-pattern" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M 48 0 L 0 0 0 48" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-white/30" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-pattern)" />
    </svg>
  </div>
);

const NoiseTexture = () => (
  <div 
    className="absolute inset-0 opacity-[0.025] pointer-events-none mix-blend-overlay"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      backgroundRepeat: 'repeat',
      backgroundSize: '128px 128px'
    }}
  />
);

const GlowEffects = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/[0.06] rounded-full blur-3xl" />
    <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-pink-500/[0.14] rounded-full blur-3xl" />
  </div>
);

const ShieldBadge = () => (
  <motion.div
    className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:block"
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.5, duration: 0.6 }}
  >
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-400/40 to-pink-600/40 rounded-full blur-xl" />
      <div className="relative w-28 h-28 bg-white/[0.07] backdrop-blur-sm rounded-full border border-white/15 flex items-center justify-center">
        <Shield className="w-14 h-14 text-pink-300/85" />
      </div>
    </div>
  </motion.div>
);

export const PageTemplate = ({ 
  title, 
  subtitle, 
  children, 
  showBackButton = true,
  gradientColors = "from-[#2a0a32] via-[#1a0b3a] to-[#050312]",
  icon,
  breadcrumbs,
  variant = "dark"
}: PageTemplateProps): JSX.Element => {
  const prefersReducedMotion = useReducedMotion() ?? false;
  
  const bgClass = variant === "dark" 
    ? "bg-[#050312]" 
    : variant === "light" 
      ? "bg-gray-50" 
      : "bg-[#050312]";
  
  const contentBgClass = variant === "dark"
    ? "bg-[#0a0714]"
    : variant === "light"
      ? "bg-white"
      : "bg-[#0a0714]";
  
  const textClass = variant === "dark" ? "text-white" : "text-gray-900";
  const proseClass = variant === "dark" ? "de-prose-dark" : "de-prose-light";

  return (
    <div className={`min-h-screen ${bgClass}`}>
      <MegaMenu />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${gradientColors}`} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
        <FloatingOrbs prefersReducedMotion={prefersReducedMotion} />
        <GridPattern />
        <NoiseTexture />
        <GlowEffects />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 md:pt-36 md:pb-20">
          {/* Breadcrumbs */}
          {breadcrumbs && breadcrumbs.length > 0 && (
            <motion.nav
              className="flex items-center gap-2 text-sm text-white/70 mb-6"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              {breadcrumbs.map((crumb, index) => (
                <span key={index} className="flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" />
                  {crumb.href ? (
                    <Link href={crumb.href} className="hover:text-white transition-colors">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-white">{crumb.label}</span>
                  )}
                </span>
              ))}
            </motion.nav>
          )}
          
          {showBackButton && !breadcrumbs && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Button
                variant="ghost"
                className="text-white/80 hover:text-white hover:bg-white/10 mb-6 -ml-4"
                onClick={() => window.history.back()}
                data-testid="button-back"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </motion.div>
          )}
          
          <div className="flex items-start gap-6">
            {/* Custom Icon */}
            {icon && (
              <motion.div
                className="hidden md:flex items-center justify-center w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {icon}
              </motion.div>
            )}
            
            <div className="flex-1">
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {title}
              </motion.h1>
              
              {subtitle && (
                <motion.p 
                  className="text-lg md:text-xl text-white/90 max-w-3xl leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                >
                  {subtitle}
                </motion.p>
              )}
            </div>

            <ShieldBadge />
          </div>
        </div>
        
        {/* Bottom gradient fade */}
        <div className={`absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t ${
          variant === "dark" ? "from-[#0a0714]" : variant === "light" ? "from-white" : "from-gray-50"
        } to-transparent`} />
      </section>

      {/* Content Section — readable rhythm for long marketing copy */}
      <section className={`py-14 md:py-20 ${contentBgClass}`}>
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className={`${textClass} ${proseClass}`}>
            {children}
          </div>
        </motion.div>
      </section>

      <DigeratiEnhancedFooterSection />
    </div>
  );
};
