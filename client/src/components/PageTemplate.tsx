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


export const PageTemplate = ({ 
  title, 
  subtitle, 
  children, 
  showBackButton = true,
  gradientColors = "from-purple-600 via-indigo-600 to-blue-600",
  icon,
  breadcrumbs,
  variant = "dark"
}: PageTemplateProps): JSX.Element => {
  const prefersReducedMotion = useReducedMotion() ?? false;
  
  const bgClass = variant === "dark" 
    ? "bg-[#0a0118]" 
    : variant === "light" 
      ? "bg-gray-50" 
      : "bg-[#0a0118]";
  
  const contentBgClass = variant === "dark"
    ? "bg-[#0d0720]"
    : variant === "light"
      ? "bg-white"
      : "bg-[#0d0720]";
  
  const textClass = variant === "dark" ? "text-white" : "text-gray-900";
  const subtextClass = variant === "dark" ? "text-gray-400" : "text-gray-600";

  return (
    <div className={`min-h-screen ${bgClass}`}>
      <MegaMenu />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${gradientColors}`} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
        
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
          </div>
        </div>
        
        {/* Bottom gradient fade */}
        <div className={`absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t ${
          variant === "dark" ? "from-[#0d0720]" : variant === "light" ? "from-white" : "from-gray-50"
        } to-transparent`} />
      </section>

      {/* Content Section */}
      <section className={`py-12 md:py-16 ${contentBgClass}`}>
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className={textClass}>
            {children}
          </div>
        </motion.div>
      </section>

      <DigeratiEnhancedFooterSection />
    </div>
  );
};
