import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Building, FileCheck, Check, Loader2, Shield } from "lucide-react";
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
    { icon: CheckCircle, text: "Compliance-Ready" },
    { icon: Shield, text: "24/7 Monitoring" },
    { icon: Building, text: "Built for SMBs" },
    { icon: FileCheck, text: "Risk Reports" },
  ];

  return (
    <section 
      ref={containerRef}
      id="home" 
      className="relative min-h-screen overflow-hidden"
    >
      {/* Clean black background with subtle purple glow */}
      <div className="absolute inset-0 bg-black">
        {/* Single subtle accent - top right corner only */}
        <div 
          className="absolute top-0 right-0 w-[600px] h-[600px] -z-10 pointer-events-none"
          style={{
            background: "radial-gradient(circle at 100% 0%, rgba(139, 92, 246, 0.08) 0%, transparent 50%)",
          }}
        />
      </div>

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
              className="flex flex-col gap-6 w-full"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Headline - clean and bold */}
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold leading-[1.1] tracking-[-0.02em]">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">
                  Hackers Don't Wait.
                </span>
                <br />
                <span className="text-white mt-2 block">
                  Protect Your Business 24/7.
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-lg text-white/60 leading-relaxed max-w-lg">
                Enterprise cybersecurity for Arizona law firms, medical practices, and professional services. 
                Flat-rate pricing with 24/7 monitoring.
              </p>

              {/* Simple feature list */}
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {features.map((feature) => (
                  <div key={feature.text} className="flex items-center gap-2">
                    <feature.icon className="h-4 w-4 text-violet-400" />
                    <span className="text-sm text-white/70">{feature.text}</span>
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
                              <Input 
                                placeholder="Your name" 
                                data-testid="input-hero-full-name"
                                className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus-visible:ring-violet-500/50 focus-visible:border-violet-500/50 h-12"
                                disabled={isSubmitting}
                                {...field} 
                              />
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
                              <Input 
                                type="email" 
                                placeholder="Work email" 
                                data-testid="input-hero-email"
                                className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus-visible:ring-violet-500/50 focus-visible:border-violet-500/50 h-12"
                                disabled={isSubmitting}
                                {...field} 
                              />
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
                        className="h-12 px-8 font-semibold bg-white hover:bg-white/90 text-black border-0 transition-all"
                      >
                        {isSubmitting ? (
                          <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                          <>
                            Get Free Assessment
                            <ArrowRight className="ml-2 w-4 h-4" />
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
              <p className="text-white/40 text-sm">
                Or call <a href="tel:325-480-9870" className="text-violet-400 hover:text-violet-300 transition-colors" data-testid="link-hero-phone">325-480-9870</a>
              </p>
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
