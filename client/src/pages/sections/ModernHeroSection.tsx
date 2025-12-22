import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Phone, Sparkles, Shield, Zap, Clock, Loader2, CheckCircle, Building, FileCheck } from "lucide-react";
import { AnimatedShield, NetworkNodes, FloatingParticles, DashboardMockup } from "@/components/graphics";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const assessmentFormSchema = z.object({
  fullName: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z.string()
    .email("Please enter a valid email address"),
  phone: z.string()
    .regex(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, "Please enter a valid phone number"),
  company: z.string()
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name must be less than 100 characters"),
});

type AssessmentFormData = z.infer<typeof assessmentFormSchema>;

export const ModernHeroSection = (): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const form = useForm<AssessmentFormData>({
    resolver: zodResolver(assessmentFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      company: "",
    },
  });

  const handleSubmit = async (data: AssessmentFormData) => {
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Assessment Request Submitted!",
        description: "We'll contact you within 24 hours to schedule your free assessment.",
        variant: "default",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
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
      {/* Animated gradient mesh background - FULL WIDTH */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0118] via-[#1a0a2e] to-[#0f0720]" />
        
        {/* Large gradient orbs for immersive feel */}
        <motion.div
          className="absolute top-[-30%] right-[-20%] w-[1200px] h-[1200px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(139, 92, 246, 0.35) 0%, rgba(139, 92, 246, 0) 60%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 80, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-30%] left-[-20%] w-[1000px] h-[1000px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, rgba(99, 102, 241, 0) 60%)",
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -50, 0],
            y: [0, -80, 0],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[30%] left-[40%] w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(34, 211, 238, 0.15) 0%, rgba(34, 211, 238, 0) 60%)",
          }}
          animate={{
            scale: [1, 1.4, 1],
            x: [0, 150, 0],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Grid overlay */}
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "120px 120px",
          }}
        />

        {/* Floating particles */}
        <FloatingParticles count={35} />
      </div>

      {/* FULL WIDTH container - removed max-w-7xl for wider layout */}
      <motion.div 
        className="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32 pt-28 pb-16 lg:pt-36 lg:pb-24"
        style={{ y, opacity }}
      >
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-20 items-start">
          {/* Left column - Content (takes more space) */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-6 lg:space-y-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-sm"
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-300">Arizona's Trusted Cybersecurity Partner</span>
            </motion.div>

            {/* Headline - LARGER for wide layout */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className="text-5xl sm:text-6xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-[1.1] tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                  Hackers Don't Wait.
                </span>
                <br />
                <span className="text-white">
                  Protect Your Business{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Now.</span>
                </span>
              </h1>
            </motion.div>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl xl:text-2xl text-gray-300 max-w-2xl leading-relaxed"
            >
              Enterprise-grade cybersecurity for small businesses. Get 24/7 protection, 
              cut cyber liability, and pass compliance checks — all without hiring in-house IT.
            </motion.p>

            {/* Feature pills */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-3"
            >
              {features.map((feature, index) => (
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
              <a 
                href="https://meet.digerati-experts.com/"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="button-hero-cta-primary"
              >
                <Button 
                  size="lg"
                  className="relative group px-8 py-6 text-lg font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 border-0 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Get Free Security Assessment
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </a>
              
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
              className="flex flex-wrap gap-4 xl:gap-6 pt-4"
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
              className="flex flex-wrap items-center gap-4 pt-4"
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

          {/* Right column - Lead Capture Form + Graphics */}
          <motion.div
            className="lg:col-span-5 xl:col-span-5 relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            id="assessment-form"
          >
            {/* Dashboard Mockup - floats behind/beside form on wide screens */}
            <motion.div 
              className="absolute -right-[40%] top-1/2 -translate-y-1/2 w-[500px] h-[400px] hidden 2xl:block opacity-80 z-0"
              initial={{ opacity: 0, x: 100, rotateY: -15 }}
              animate={{ opacity: 0.8, x: 0, rotateY: -15 }}
              transition={{ duration: 1, delay: 0.5 }}
              style={{ perspective: "1000px" }}
            >
              <DashboardMockup className="w-full h-full" />
            </motion.div>

            {/* Background graphics */}
            <div className="absolute -top-10 -right-10 w-40 h-48 opacity-30 hidden lg:block 2xl:hidden">
              <AnimatedShield className="w-full h-full" />
            </div>
            <div className="absolute -bottom-20 -left-16 w-48 h-60 opacity-20 hidden lg:block">
              <NetworkNodes className="w-full h-full" />
            </div>
            
            {/* Animated shield on very wide screens - repositioned */}
            <motion.div 
              className="absolute -top-16 -right-20 w-32 h-40 hidden 2xl:block z-20"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <AnimatedShield className="w-full h-full" />
            </motion.div>

            {/* Glassmorphism Form Card */}
            <Card className="relative z-10 backdrop-blur-xl bg-white/95 dark:bg-gray-900/90 shadow-2xl border-0 ring-1 ring-white/20">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl xl:text-3xl bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Get Started Today
                </CardTitle>
                <CardDescription className="text-base">
                  Lock In 80% Off Your Cyber Risk Assessment — Act Now to Identify Vulnerabilities Before Hackers Do.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="John Smith" 
                              data-testid="input-full-name"
                              className="h-11 focus-visible:ring-purple-600 focus-visible:ring-offset-0 transition-all duration-200"
                              disabled={isSubmitting}
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address *</FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              placeholder="john@company.com" 
                              data-testid="input-email"
                              className="h-11 focus-visible:ring-purple-600 focus-visible:ring-offset-0 transition-all duration-200"
                              disabled={isSubmitting}
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number *</FormLabel>
                          <FormControl>
                            <Input 
                              type="tel" 
                              placeholder="(480) 000-0000" 
                              data-testid="input-phone"
                              className="h-11 focus-visible:ring-purple-600 focus-visible:ring-offset-0 transition-all duration-200"
                              disabled={isSubmitting}
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Name *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your Company Inc." 
                              data-testid="input-company"
                              className="h-11 focus-visible:ring-purple-600 focus-visible:ring-offset-0 transition-all duration-200"
                              disabled={isSubmitting}
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <p className="text-xs text-gray-500">
                      All information submitted is protected and handled in compliance with our Privacy Policy.
                    </p>
                    
                    <Button 
                      className="w-full h-12 text-base bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl" 
                      data-testid="button-submit"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Get My Free Assessment"
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* Floating accent elements */}
            <motion.div
              className="absolute -bottom-6 -left-6 w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-cyan-500/20 hidden lg:block"
              animate={{
                y: [0, -15, 0],
                rotate: [0, 5, 0],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -top-6 -right-6 w-20 h-20 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-500/20 hidden lg:block"
              animate={{
                y: [0, 12, 0],
                rotate: [0, -5, 0],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a0118] to-transparent z-10" />

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
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
