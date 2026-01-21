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

  return (
    <section 
      ref={containerRef}
      id="home" 
      className="relative min-h-screen overflow-hidden"
    >
      {/* Pitch black background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black" />
        
        {/* Subtle accent orbs - minimal on black */}
        <motion.div
          className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full -z-10"
          style={{
            background: "radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, rgba(139, 92, 246, 0) 60%)",
          }}
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 40, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-20%] left-[-15%] w-[700px] h-[700px] rounded-full -z-10"
          style={{
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.06) 0%, rgba(59, 130, 246, 0) 60%)",
          }}
          animate={{
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
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/40 bg-cyan-400/10 w-fit">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-cyan-300 font-medium">SOC 2 Compliant | Serving Arizona businesses since 2019</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold leading-[1.1] tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                  Hackers Don't Wait.
                </span>
                <br />
                <span className="text-white">
                  Protect Arizona Businesses 24/7.
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-lg text-gray-200 leading-relaxed max-w-xl">
                IT and cybersecurity for Arizona law firms, medical practices, CPAs, and professional services. 
                Flat-rate pricing, compliance-ready, and backed by 24/7 monitoring.
              </p>

              {/* Feature pills - responsive grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {features.map((feature) => (
                  <div 
                    key={feature.text}
                    className="flex items-center gap-2.5 px-3.5 py-3 rounded-xl bg-white/[0.06] border border-white/10 hover:bg-white/[0.1] hover:border-white/20 transition-colors"
                  >
                    <feature.icon className={`h-4 w-4 ${feature.color} flex-shrink-0`} />
                    <span className="text-sm sm:text-xs text-gray-100 leading-tight">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* Trust Badges - Credibility row */}
              <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-2 text-sm">
                <span className="text-gray-300 font-medium w-full sm:w-auto">Trusted by:</span>
                {trustBadges.map((badge) => (
                  <span 
                    key={badge.name}
                    className="flex items-center gap-1.5"
                    data-testid={`trust-badge-${badge.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <badge.icon className="w-4 h-4 text-cyan-400/70" />
                    <span className="text-gray-200 text-xs sm:text-sm">{badge.name}</span>
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
                            <FormLabel className="text-gray-200 text-sm font-medium">Full Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="John Smith" 
                                data-testid="input-hero-full-name"
                                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-cyan-500 focus-visible:border-cyan-400 h-12"
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
                            <FormLabel className="text-gray-200 text-sm font-medium">Work Email</FormLabel>
                            <FormControl>
                              <Input 
                                type="email" 
                                placeholder="john@company.com" 
                                data-testid="input-hero-email"
                                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-cyan-500 focus-visible:border-cyan-400 h-12"
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
                      className="w-full sm:w-auto h-14 px-10 text-lg font-bold bg-white hover:bg-gray-100 text-purple-700 border-0 shadow-xl shadow-white/20 hover:shadow-white/40 transition-all duration-300"
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
              <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 sm:gap-5 mt-4">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-white/80">No obligation</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-white/80">Results in 24-48hrs</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-white/80">No credit card</span>
                </div>
              </div>
              
              {/* Phone alternative */}
              <div className="text-gray-400 text-sm mt-3">
                Prefer to call? <a href="tel:325-480-9870" className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors underline underline-offset-2" data-testid="link-hero-phone">325-480-9870</a>
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
                {/* Subtle glow effect - behind dashboard only */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/15 via-blue-500/10 to-cyan-500/15 blur-3xl scale-110 -z-10" />
                
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
