import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Sparkles, Shield, Zap, Clock, CheckCircle, Building, FileCheck, ShieldCheck, Award, Apple, Check } from "lucide-react";
import { AnimatedShield, NetworkNodes, FloatingParticles, DashboardMockup } from "@/components/graphics";

export const ModernHeroSection = (): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 150]);
  const opacity = useTransform(scrollYProgress, isMobile ? [0, 1] : [0, 0.85], [1, 0]);

  const stats = [
    { icon: Shield, value: "99.9%", label: "Uptime SLA", delay: 0 },
    { icon: Zap, value: "<15min", label: "Response Time", delay: 0.1 },
    { icon: Clock, value: "24/7", label: "Monitoring", delay: 0.2 },
  ];

  const features = [
    { icon: CheckCircle, text: "Insurance & Compliance-Ready", color: "text-green-400" },
    { icon: Shield, text: "24/7 Human-Led Monitoring", color: "text-blue-400" },
    { icon: Building, text: "Built for Small Businesses", color: "text-purple-400" },
    { icon: FileCheck, text: "Easy-to-Read Risk Reports", color: "text-yellow-400" },
  ];

  const trustBadges = [
    { name: "SOC 2-Compliant Vendors", icon: ShieldCheck },
    { name: "Microsoft Partner", icon: Award },
    { name: "Apple Consultants", icon: Apple },
  ];

  const handleScrollToForm = () => {
    const formElement = document.getElementById('assessment-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={containerRef}
      id="home" 
      className="relative min-h-screen overflow-hidden"
    >
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0118] via-[#1a0a2e] to-[#0f0720]" />
        
        {/* Large gradient orbs */}
        <motion.div
          className="absolute top-[-20%] right-[-10%] w-[1000px] h-[1000px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, rgba(139, 92, 246, 0) 60%)",
          }}
          animate={{
            scale: [1, 1.15, 1],
            x: [0, 60, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-20%] left-[-15%] w-[900px] h-[900px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, rgba(99, 102, 241, 0) 60%)",
          }}
          animate={{
            scale: [1.1, 1, 1.1],
            x: [0, -40, 0],
            y: [0, -60, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[40%] left-[50%] w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(34, 211, 238, 0.12) 0%, rgba(34, 211, 238, 0) 60%)",
          }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 100, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Grid overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Floating particles */}
        <FloatingParticles count={30} />
      </div>

      {/* Main content - FULL WIDTH layout */}
      <motion.div 
        className="relative z-10 w-full px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-24 pt-28 pb-12 sm:pt-32 lg:pt-36 xl:pt-40 lg:pb-16 xl:pb-20"
        style={{ y, opacity }}
      >
        {/* Fluid container - wide feel but never edge-to-edge */}
        <div className="mx-auto w-[min(94vw,1680px)] 2xl:w-[min(92vw,1800px)]">
          
          {/* Main grid - Content on left, Dashboard on right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
            
            {/* Left column - Content with CTA */}
            <motion.div 
              className="flex flex-col gap-6 w-full"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-sm w-fit">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-purple-300">Arizona's Trusted Cybersecurity Partner</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold leading-[1.1] tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                  Hackers Don't Wait.
                </span>
                <br />
                <span className="text-white">
                  Protect Arizona Businesses 24/7.
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-lg text-gray-300 leading-relaxed max-w-xl">
                IT and cybersecurity for Arizona law firms, medical practices, CPAs, and professional services. 
                Flat-rate pricing, compliance-ready, and backed by 24/7 monitoring.
              </p>

              {/* Feature pills - 2x2 grid */}
              <div className="grid grid-cols-2 gap-3">
                {features.map((feature) => (
                  <div 
                    key={feature.text}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
                  >
                    <feature.icon className={`h-4 w-4 ${feature.color} flex-shrink-0`} />
                    <span className="text-xs text-gray-300 leading-tight">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* Trust Badges - Credibility row */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                <span className="text-gray-300 font-medium">Trusted by:</span>
                {trustBadges.map((badge) => (
                  <span 
                    key={badge.name}
                    className="flex items-center gap-1.5"
                    data-testid={`trust-badge-${badge.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <badge.icon className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300">{badge.name}</span>
                  </span>
                ))}
              </div>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 mt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Button 
                  size="lg"
                  data-testid="button-hero-assessment"
                  onClick={handleScrollToForm}
                  className="h-14 px-8 text-lg font-bold bg-purple-600 hover:bg-purple-700 text-white border-0 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 justify-center gap-2"
                >
                  Get Free Assessment
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  data-testid="button-hero-call"
                  className="h-14 px-8 text-lg font-medium border-2 border-white/30 text-white bg-transparent hover:bg-white/10 hover:border-white/50 transition-all duration-300 gap-2"
                  onClick={() => window.location.href = 'tel:325-480-9870'}
                >
                  <Phone className="w-5 h-5" />
                  Call 325-480-9870
                </Button>
              </motion.div>

              {/* Reassurance microcopy */}
              <div className="flex items-center gap-5 text-gray-300 mt-2">
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-sm">No obligation</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-sm">Results in 24-48hrs</span>
                </div>
                <div className="hidden sm:flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-sm">No credit card</span>
                </div>
              </div>

              {/* Stats row - compact, subtle styling */}
              <div className="grid grid-cols-3 gap-3 mt-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    data-testid={`stat-card-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}
                    className="flex flex-col items-center text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
                  >
                    <stat.icon className="w-5 h-5 text-purple-400 mb-2" />
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-gray-300 mt-0.5">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right column - Dashboard Visual */}
            <div className="relative flex justify-center lg:justify-end w-full mt-8 lg:mt-0">
              
              {/* Dashboard Mockup - Primary visual */}
              <motion.div
                className="relative w-full max-w-[500px] lg:max-w-[550px] xl:max-w-[600px]"
                initial={{ opacity: 0, x: 60, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-indigo-600/15 to-cyan-600/30 blur-3xl scale-110" />
                
                {/* Dashboard with 3D effect */}
                <motion.div
                  className="relative"
                  style={{ 
                    transform: "perspective(1200px) rotateY(-8deg) rotateX(3deg)",
                    transformStyle: "preserve-3d"
                  }}
                  animate={{
                    rotateY: [-8, -5, -8],
                    rotateX: [3, 4, 3],
                  }}
                  transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                >
                  <DashboardMockup className="w-full drop-shadow-2xl" />
                </motion.div>

                {/* Floating shield accent */}
                <motion.div
                  className="absolute -top-8 -left-4 w-24 h-28 z-30"
                  animate={{ y: [0, -12, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <AnimatedShield className="w-full h-full drop-shadow-lg" />
                </motion.div>

                {/* Network nodes accent */}
                <motion.div
                  className="absolute bottom-4 -right-6 w-32 h-40 opacity-60"
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <NetworkNodes className="w-full h-full" />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0118] to-transparent z-10" />

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 rounded-full bg-white/60"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};
