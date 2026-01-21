import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Building, FileCheck, ShieldCheck, Award, Apple, Check, Loader2, Shield } from "lucide-react";
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
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 150]);
  // Keep opacity at 1 - no scroll-based fade effect
  const opacity = 1;

  // COLOR SYSTEM:
  // Primary accent: Purple (violet-400) - CTAs, key highlights
  // Secondary accent: Cyan (cyan-400) - Icons, badges  
  // Text: White with opacity hierarchy (100%, 70%, 50%, 40%)
  // Success: Green (emerald-400) - Checkmarks only
  
  const features = [
    { icon: CheckCircle, text: "Insurance & Compliance-Ready" },
    { icon: Shield, text: "24/7 Human-Led Monitoring" },
    { icon: Building, text: "Built for Small Businesses" },
    { icon: FileCheck, text: "Easy-to-Read Risk Reports" },
  ];

  const trustBadges = [
    { name: "SOC 2-Compliant Vendors", icon: ShieldCheck },
    { name: "Microsoft Partner", icon: Award },
    { name: "Apple Consultants", icon: Apple },
  ];

  return (
    <section 
      ref={containerRef}
      id="home" 
      className="relative min-h-screen overflow-hidden"
    >
      {/* Pitch black background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black" />
        
        {/* Accent orbs - purple only (primary brand color) */}
        <motion.div
          className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full -z-10"
          style={{
            background: "radial-gradient(circle, rgba(139, 92, 246, 0.06) 0%, rgba(139, 92, 246, 0) 60%)",
          }}
          animate={prefersReducedMotion ? {} : {
            scale: [1, 1.1, 1],
            x: [0, 40, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-20%] left-[-15%] w-[700px] h-[700px] rounded-full -z-10"
          style={{
            background: "radial-gradient(circle, rgba(139, 92, 246, 0.05) 0%, rgba(139, 92, 246, 0) 60%)",
          }}
          animate={prefersReducedMotion ? {} : {
            scale: [1.1, 1, 1.1],
            x: [0, -30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Grid overlay - subtle on black */}
        <div 
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.2) 1px, transparent 1px)
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
              {/* Trust Badge - uses secondary accent (cyan) */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] w-fit">
                <ShieldCheck className="w-4 h-4 text-violet-400" />
                <span className="text-sm text-white/60 font-medium tracking-wide">SOC 2 Compliant · Serving Arizona since 2019</span>
              </div>

              {/* Headline - Purple gradient (primary brand color) */}
              <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold leading-[1.08] tracking-[-0.03em]">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-purple-300 to-fuchsia-300">
                  Hackers Don't Wait.
                </span>
                <br />
                <span className="text-white">
                  Protect Arizona Businesses 24/7.
                </span>
              </h1>

              {/* Subheadline - white/70 for secondary text */}
              <p className="text-lg sm:text-xl text-white/70 leading-[1.7] max-w-xl font-normal tracking-[-0.01em]">
                IT and cybersecurity for Arizona law firms, medical practices, CPAs, and professional services. 
                Flat-rate pricing, compliance-ready, and backed by 24/7 monitoring.
              </p>

              {/* Feature pills - all icons use violet (primary accent) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                {features.map((feature) => (
                  <div 
                    key={feature.text}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] transition-colors"
                  >
                    <feature.icon className="h-4 w-4 text-violet-400 flex-shrink-0" />
                    <span className="text-[13px] sm:text-sm text-white/70 font-medium tracking-[-0.01em]">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* Trust Badges - icons use white/40, text white/60 */}
              <div className="flex flex-wrap items-center gap-x-5 sm:gap-x-6 gap-y-2 text-sm">
                <span className="text-white/40 font-medium w-full sm:w-auto tracking-wide uppercase text-xs">Trusted by:</span>
                {trustBadges.map((badge) => (
                  <span 
                    key={badge.name}
                    className="flex items-center gap-2"
                    data-testid={`trust-badge-${badge.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <badge.icon className="w-4 h-4 text-white/30" />
                    <span className="text-white/60 text-[13px] font-medium">{badge.name}</span>
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
                            <FormLabel className="text-white/60 text-sm font-medium tracking-wide">Full Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="John Smith" 
                                data-testid="input-hero-full-name"
                                className="bg-white/[0.08] border-white/[0.12] text-white placeholder:text-white/30 focus-visible:ring-white/30 focus-visible:border-white/30 h-12 font-medium"
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
                            <FormLabel className="text-white/60 text-sm font-medium tracking-wide">Work Email</FormLabel>
                            <FormControl>
                              <Input 
                                type="email" 
                                placeholder="john@company.com" 
                                data-testid="input-hero-email"
                                className="bg-white/[0.08] border-white/[0.12] text-white placeholder:text-white/30 focus-visible:ring-white/30 focus-visible:border-white/30 h-12 font-medium"
                                disabled={isSubmitting}
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    {/* CTA Button - white with purple text (inverted primary) */}
                    <Button 
                      type="submit"
                      size="lg"
                      data-testid="button-hero-submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto h-14 px-10 text-lg font-semibold bg-white hover:bg-white/95 text-violet-700 border-0 shadow-2xl shadow-violet-500/10 hover:shadow-violet-500/20 transition-all duration-300 tracking-[-0.01em]"
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

              {/* Reassurance microcopy - green for success/trust signals */}
              <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4 sm:gap-6 mt-5">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-[13px] text-white/50 font-medium">No obligation</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-[13px] text-white/50 font-medium">Results in 24-48hrs</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-[13px] text-white/50 font-medium">No credit card</span>
                </div>
              </div>
              
              {/* Phone alternative - violet accent for link */}
              <div className="text-white/40 text-sm mt-4">
                Prefer to call? <a href="tel:325-480-9870" className="text-violet-300 hover:text-violet-200 font-medium transition-colors" data-testid="link-hero-phone">325-480-9870</a>
              </div>
            </motion.div>

            {/* Right column - Dashboard Visual (hidden on mobile, visible tablet+) */}
            <div className="hidden md:flex relative justify-center lg:justify-end w-full">
              <motion.div
                className="relative w-full max-w-[420px] md:max-w-[480px] lg:max-w-[520px] xl:max-w-[580px]"
                initial={{ opacity: 0, x: 40, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              >
                {/* Subtle glow effect - purple tones only */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/15 via-purple-500/10 to-fuchsia-500/10 blur-3xl scale-110 -z-10" />
                
                {/* Dashboard with subtle 3D effect */}
                <motion.div
                  className="relative"
                  style={{ 
                    transform: "perspective(1200px) rotateY(-6deg) rotateX(2deg)",
                    transformStyle: "preserve-3d"
                  }}
                  animate={prefersReducedMotion ? {} : {
                    rotateY: [-6, -4, -6],
                    rotateX: [2, 3, 2],
                  }}
                  transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                >
                  <DashboardMockup className="w-full drop-shadow-2xl" />
                </motion.div>

                {/* Floating shield accent - hidden on tablet */}
                <motion.div
                  className="hidden lg:block absolute -top-6 -left-2 w-20 h-24 z-30"
                  animate={prefersReducedMotion ? {} : { y: [0, -10, 0], rotate: [0, 3, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <AnimatedShield className="w-full h-full drop-shadow-lg" />
                </motion.div>

                {/* Network nodes accent - hidden on tablet */}
                <motion.div
                  className="hidden lg:block absolute bottom-4 -right-4 w-28 h-36 opacity-50"
                  animate={prefersReducedMotion ? {} : { y: [0, 6, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <NetworkNodes className="w-full h-full" />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom gradient fade - matches next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-[#0d0720] to-transparent z-10 pointer-events-none" />

      {/* Scroll indicator - hidden on mobile */}
      <motion.div
        className="hidden sm:block absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
          animate={prefersReducedMotion ? {} : { opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 rounded-full bg-white/50"
            animate={prefersReducedMotion ? {} : { y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};
