import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Building, FileCheck, Check, Loader2, Shield, User, Mail, Clock, Activity, Zap } from "lucide-react";
import { DashboardMockup } from "@/components/graphics";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
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
  const [selectedField, setSelectedField] = useState<'fullName' | 'email'>('fullName');
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

  const y = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 80]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? ["0%", "0%"] : ["0%", "30%"]);
  const floatingY1 = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : -100]);
  const floatingY2 = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : -60]);
  const floatingY3 = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : -40]);
  const opacity = 1;

  const features = [
    { icon: FileCheck, text: "Insurance & Compliance-Ready" },
    { icon: Shield, text: "24/7 Human-Led Monitoring" },
    { icon: Building, text: "Built for Small Businesses" },
    { icon: CheckCircle, text: "Easy-to-Read Risk Reports" },
  ];

  return (
    <section 
      ref={containerRef}
      id="home" 
      className="relative min-h-screen overflow-hidden"
    >
      {/* Clean black background with parallax purple glows */}
      <div className="absolute inset-0 bg-black">
        {/* Main accent - top right corner with parallax */}
        <motion.div 
          className="absolute top-0 right-0 w-[700px] h-[700px] -z-10 pointer-events-none"
          data-testid="hero-parallax-orb-1"
          style={{
            y: backgroundY,
            background: "radial-gradient(circle at 100% 0%, rgba(139, 92, 246, 0.12) 0%, transparent 50%)",
          }}
        />
        {/* Secondary accent - bottom left with parallax */}
        <motion.div 
          className="absolute bottom-0 left-0 w-[500px] h-[500px] -z-10 pointer-events-none"
          data-testid="hero-parallax-orb-2"
          style={{
            y: floatingY3,
            background: "radial-gradient(circle at 0% 100%, rgba(168, 85, 247, 0.08) 0%, transparent 50%)",
          }}
        />
      </div>

      {/* Floating decorative elements with parallax */}
      <motion.div 
        className="absolute top-32 right-20 w-4 h-4 rounded-full bg-violet-500/20 pointer-events-none hidden lg:block"
        style={{ y: floatingY1 }}
        data-testid="hero-floating-element-1"
      />
      <motion.div 
        className="absolute top-48 right-40 w-2 h-2 rounded-full bg-purple-400/30 pointer-events-none hidden lg:block"
        style={{ y: floatingY2 }}
        data-testid="hero-floating-element-2"
      />
      <motion.div 
        className="absolute bottom-32 left-20 w-3 h-3 rounded-full bg-fuchsia-500/20 pointer-events-none hidden lg:block"
        style={{ y: floatingY3 }}
        data-testid="hero-floating-element-3"
      />

      {/* Main content */}
      <motion.div 
        className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-16 pt-32 pb-16 sm:pt-36 lg:pt-40 xl:pt-44 lg:pb-20"
        style={{ y, opacity }}
      >
        {/* Container */}
        <div className="mx-auto max-w-7xl">
          
          {/* Main grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left column - Content with CTA */}
            <motion.div 
              className="flex flex-col gap-4 sm:gap-5 lg:gap-6 w-full"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Headline - clean and bold */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold leading-[1.1] tracking-[-0.02em]">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">
                  Hackers Don't Wait.
                </span>
                <br />
                <span className="text-white mt-2 block">
                  Your Arizona Business. Protected 24/7.
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-base md:text-lg text-white/60 leading-relaxed max-w-lg">
                Enterprise-grade cybersecurity for small businesses. Get 24/7 protection, 
                cut cyber liability, and pass compliance checks.
              </p>

              {/* Simple feature list - 2 columns on mobile */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 sm:flex sm:flex-wrap sm:gap-x-6">
                {features.map((feature) => (
                  <div key={feature.text} className="flex items-center gap-1.5 sm:gap-2">
                    <feature.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-violet-400 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-white/70">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* Lead Capture Form */}
              <div className="mt-2" id="assessment-form">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <div className="relative">
                                <User className={`absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 pointer-events-none transition-colors duration-200 ${
                                  selectedField === 'fullName' ? 'text-violet-400' : 'text-white/30'
                                }`} />
                                <Input 
                                  placeholder="Your name" 
                                  data-testid="input-hero-full-name"
                                  className={`h-12 pl-11 text-white placeholder:text-white/40 transition-all duration-200 ${
                                    selectedField === 'fullName' 
                                      ? 'bg-white/10 border-violet-500/60 ring-1 ring-violet-500/30' 
                                      : 'bg-white/5 border-white/10 hover:border-white/20'
                                  }`}
                                  disabled={isSubmitting}
                                  onFocus={() => setSelectedField('fullName')}
                                  {...field} 
                                />
                              </div>
                            </FormControl>
                            <FormMessage className="text-red-400 text-xs" />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <div className="relative">
                                <Mail className={`absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 pointer-events-none transition-colors duration-200 ${
                                  selectedField === 'email' ? 'text-violet-400' : 'text-white/30'
                                }`} />
                                <Input 
                                  type="email" 
                                  placeholder="Work email" 
                                  data-testid="input-hero-email"
                                  className={`h-12 pl-11 text-white placeholder:text-white/40 transition-all duration-200 ${
                                    selectedField === 'email' 
                                      ? 'bg-white/10 border-violet-500/60 ring-1 ring-violet-500/30' 
                                      : 'bg-white/5 border-white/10 hover:border-white/20'
                                  }`}
                                  disabled={isSubmitting}
                                  onFocus={() => setSelectedField('email')}
                                  {...field} 
                                />
                              </div>
                            </FormControl>
                            <FormMessage className="text-red-400 text-xs" />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit"
                        size="lg"
                        data-testid="button-hero-submit"
                        disabled={isSubmitting}
                        className="h-12 px-6 font-semibold bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white border-0 shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/30 transition-all duration-300 whitespace-nowrap"
                      >
                        {isSubmitting ? (
                          <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                          <>
                            Get Started
                            <ArrowRight className="ml-2 w-5 h-5" />
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
                
                {/* Reassurance */}
                <div className="flex items-center gap-4 mt-3 text-white/40 text-sm">
                  <span className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    No obligation
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    24hr response
                  </span>
                </div>
              </div>
              
              {/* Phone */}
              <p className="text-white/50 text-base md:text-lg">
                Or call <a href="tel:325-480-9870" className="text-violet-400 hover:text-violet-300 font-medium transition-colors" data-testid="link-hero-phone">325-480-9870</a>
              </p>

              {/* Stats Bar */}
              <motion.div 
                className="grid grid-cols-3 gap-3 sm:flex sm:flex-wrap sm:gap-6 mt-4 pt-5 sm:pt-6 border-t border-white/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="flex flex-col sm:flex-row items-center sm:items-center gap-1.5 sm:gap-3 text-center sm:text-left">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-violet-500/20 flex items-center justify-center">
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-violet-400" />
                  </div>
                  <div>
                    <div className="text-lg sm:text-2xl font-bold text-white">99.9%</div>
                    <div className="text-xs sm:text-sm text-white/50">Uptime SLA</div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center sm:items-center gap-1.5 sm:gap-3 text-center sm:text-left">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-violet-500/20 flex items-center justify-center">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-violet-400" />
                  </div>
                  <div>
                    <div className="text-lg sm:text-2xl font-bold text-white">&lt;15min</div>
                    <div className="text-xs sm:text-sm text-white/50">Response</div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center sm:items-center gap-1.5 sm:gap-3 text-center sm:text-left">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-violet-500/20 flex items-center justify-center">
                    <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-violet-400" />
                  </div>
                  <div>
                    <div className="text-lg sm:text-2xl font-bold text-white">24/7</div>
                    <div className="text-xs sm:text-sm text-white/50">Monitoring</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right column - Dashboard Visual (hidden on mobile, visible tablet+) */}
            <div className="hidden lg:flex relative justify-end w-full">
              <motion.div
                className="relative w-full max-w-[520px] xl:max-w-[560px]"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              >
                {/* Subtle glow behind dashboard */}
                <div className="absolute inset-0 bg-violet-500/10 blur-3xl scale-110 -z-10 rounded-3xl" />
                
                {/* Dashboard - clean, no animation */}
                <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-violet-500/5">
                  <DashboardMockup className="w-full" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
    </section>
  );
};
