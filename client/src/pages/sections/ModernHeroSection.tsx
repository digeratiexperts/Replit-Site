import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Sparkles, Shield, Zap, Clock, CheckCircle, Building, FileCheck } from "lucide-react";
import { AnimatedShield, NetworkNodes, FloatingParticles, DashboardMockup } from "@/components/graphics";

export const ModernHeroSection = (): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const scrollToForm = () => {
    const formSection = document.getElementById('assessment-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
          
          {/* Main grid - Left content gets more space on wider screens */}
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(400px,480px)] xl:grid-cols-[minmax(0,1.2fr)_minmax(420px,500px)] 2xl:grid-cols-[minmax(0,1.3fr)_minmax(440px,520px)] gap-8 lg:gap-10 xl:gap-12 items-start">
            
            {/* Left column - Badge, Headline, Description, Pills, CTAs, Stats */}
            <div className="flex flex-col gap-5 w-full">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-sm w-fit"
              >
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-purple-300">Arizona's Trusted Cybersecurity Partner</span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                  Hackers Don't Wait.
                </span>
                <br />
                <span className="text-white">
                  Protect Your Business{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Now.</span>
                </span>
              </motion.h1>
              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg sm:text-xl xl:text-2xl text-gray-300 leading-relaxed"
              >
                Enterprise-grade cybersecurity for small businesses. Get 24/7 protection, 
                cut cyber liability, and pass compliance checks — all without hiring in-house IT.
              </motion.p>

              {/* Feature pills */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="grid grid-cols-2 gap-3"
              >
                {features.map((feature) => (
                  <div 
                    key={feature.text}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
                  >
                    <feature.icon className={`h-4 w-4 ${feature.color} flex-shrink-0`} />
                    <span className="text-xs text-gray-300 leading-tight">{feature.text}</span>
                  </div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 pt-2"
              >
                <Button 
                  size="lg"
                  onClick={scrollToForm}
                  data-testid="button-hero-cta-primary"
                  className="relative group px-8 py-6 text-lg font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 border-0 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Get Free Assessment
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
                
                <a href="tel:325-480-9870" data-testid="button-hero-phone">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="px-8 py-6 text-lg font-semibold border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/30 text-white transition-all duration-300"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    325-480-9870
                  </Button>
                </a>
              </motion.div>

              {/* Stats row */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap gap-4 pt-4"
              >
                {stats.map((stat) => (
                  <motion.div
                    key={stat.label}
                    data-testid={`stat-card-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + stat.delay, duration: 0.4 }}
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-indigo-500/20 flex items-center justify-center">
                      <stat.icon className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <div className="text-xl font-bold text-white">{stat.value}</div>
                      <div className="text-xs text-gray-400">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Trust badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="flex flex-wrap items-center gap-4 pt-2"
              >
                <span className="text-sm text-gray-500">Trusted by:</span>
                <div className="flex flex-wrap items-center gap-3" data-testid="trust-badges-container">
                  {["SOC 2 Type II", "Microsoft Partner", "Apple Consultants"].map((badge) => (
                    <div 
                      key={badge}
                      data-testid={`trust-badge-${badge.toLowerCase().replace(/\s+/g, '-')}`}
                      className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-xs text-gray-400"
                    >
                      {badge}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right column - Dashboard Visual */}
            <div className="relative flex justify-center lg:justify-end w-full mt-8 lg:mt-0">
              
              {/* Dashboard Mockup - Now the primary visual */}
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
