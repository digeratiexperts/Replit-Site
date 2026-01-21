import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, Clock, CheckCircle, Building, FileCheck, ShieldCheck, Award, Apple, Check, Loader2 } from "lucide-react";
import { AnimatedShield, NetworkNodes, FloatingParticles, DashboardMockup } from "@/components/graphics";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const assessmentFormSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be less than 50 characters"),
  email: z.string().email("Please enter a valid work email address"),
});

type AssessmentFormData = z.infer<typeof assessmentFormSchema>;

export const ModernHeroSection = (): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { toast } = useToast();
  
  const form = useForm<AssessmentFormData>({
    resolver: zodResolver(assessmentFormSchema),
    defaultValues: { fullName: "", email: "" },
  });

  const handleFormSubmit = async (data: AssessmentFormData) => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast({
        title: "Assessment Request Submitted!",
        description: "We'll contact you within 24 hours to schedule your free assessment.",
      });
      form.reset();
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
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
  // Keep opacity at 1 - no scroll-based fade effect
  const opacity = 1;

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

  const handleScrollToCalculator = () => {
    const calculatorElement = document.getElementById('calculators');
    if (calculatorElement) {
      calculatorElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={containerRef}
      id="home" 
      className="relative min-h-screen overflow-hidden"
    >
      {/* Lighter gradient background - more inviting and visible */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1f1445] via-[#362560] to-[#1f1445]" />
        
        {/* Large gradient orbs - positioned behind content with z-index */}
        <motion.div
          className="absolute top-[-20%] right-[-10%] w-[1000px] h-[1000px] rounded-full -z-10"
          style={{
            background: "radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, rgba(139, 92, 246, 0) 60%)",
          }}
          animate={{
            scale: [1, 1.15, 1],
            x: [0, 60, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-20%] left-[-15%] w-[900px] h-[900px] rounded-full -z-10"
          style={{
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(99, 102, 241, 0) 60%)",
          }}
          animate={{
            scale: [1.1, 1, 1.1],
            x: [0, -40, 0],
            y: [0, -60, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[40%] left-[50%] w-[500px] h-[500px] rounded-full -z-10"
          style={{
            background: "radial-gradient(circle, rgba(34, 211, 238, 0.08) 0%, rgba(34, 211, 238, 0) 60%)",
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
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 w-fit">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-cyan-300">SOC 2 Compliant | Serving Arizona businesses since 2019</span>
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

              {/* Inline Lead Capture Form */}
              <motion.div
                className="mt-6"
                id="assessment-form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-300 text-sm">Full Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="John Smith" 
                                data-testid="input-hero-full-name"
                                className="bg-slate-800 border-slate-600 text-white placeholder:text-gray-400 focus-visible:ring-purple-500 h-12"
                                disabled={isSubmitting}
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-300 text-sm">Work Email</FormLabel>
                            <FormControl>
                              <Input 
                                type="email" 
                                placeholder="john@company.com" 
                                data-testid="input-hero-email"
                                className="bg-slate-800 border-slate-600 text-white placeholder:text-gray-400 focus-visible:ring-purple-500 h-12"
                                disabled={isSubmitting}
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Button 
                      type="submit"
                      size="lg"
                      data-testid="button-hero-submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto h-14 px-10 text-lg font-bold bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white border-0 shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Get Free Assessment
                          <ArrowRight className="ml-2 w-5 h-5" />
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </motion.div>

              {/* Reassurance microcopy */}
              <div className="flex flex-wrap items-center gap-5 text-gray-300 mt-4">
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-sm">No obligation</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-sm">Results in 24-48hrs</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-sm">No credit card</span>
                </div>
              </div>
              
              {/* Phone alternative */}
              <div className="text-gray-400 text-sm mt-3">
                Prefer to call? <a href="tel:325-480-9870" className="text-cyan-400 hover:text-cyan-300 transition-colors" data-testid="link-hero-phone">325-480-9870</a>
              </div>
            </motion.div>

            {/* Right column - Dashboard Visual */}
            <div className="relative flex justify-center lg:justify-end w-full mt-8 lg:mt-0">
              <motion.div
                className="relative w-full max-w-[500px] lg:max-w-[550px] xl:max-w-[600px]"
                initial={{ opacity: 0, x: 60, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
              >
                {/* Subtle glow effect - behind dashboard only */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-indigo-600/10 to-cyan-600/20 blur-2xl scale-105 -z-10" />
                
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
