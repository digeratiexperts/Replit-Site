import { motion, useScroll, useTransform, useReducedMotion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Phone, Sparkles, Shield, Zap, Clock, CheckCircle, Building, FileCheck, Loader2, X, ShieldCheck, Award, Apple, Check } from "lucide-react";
import { AnimatedShield, NetworkNodes, FloatingParticles, DashboardMockup } from "@/components/graphics";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// Step 1 schema - minimal friction
const step1Schema = z.object({
  fullName: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z.string()
    .email("Please enter a valid email address"),
});

// Step 2 schema - qualification questions
const step2Schema = z.object({
  phone: z.string().optional(),
  company: z.string().optional(),
  endpoints: z.string().min(1, "Please select an option"),
  hasProvider: z.string().min(1, "Please select an option"),
  primaryConcern: z.string().min(1, "Please select an option"),
});

type Step1Data = z.infer<typeof step1Schema>;
type Step2Data = z.infer<typeof step2Schema>;

export const ModernHeroSection = (): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showStep2Modal, setShowStep2Modal] = useState(false);
  const [step1Data, setStep1Data] = useState<Step1Data | null>(null);
  const { toast } = useToast();
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
  const opacity = useTransform(scrollYProgress, isMobile ? [0, 0.9] : [0, 0.5], [1, 0]);

  // Step 1 form
  const step1Form = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      fullName: "",
      email: "",
    },
  });

  // Step 2 form
  const step2Form = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      phone: "",
      company: "",
      endpoints: "",
      hasProvider: "",
      primaryConcern: "",
    },
  });

  const handleStep1Submit = async (data: Step1Data) => {
    setStep1Data(data);
    setShowStep2Modal(true);
  };

  const handleStep2Submit = async (data: Step2Data) => {
    setIsSubmitting(true);
    
    try {
      // Combine step 1 and step 2 data
      const fullData = { ...step1Data, ...data };
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Assessment Request Submitted!",
        description: "We'll contact you within 24 hours to schedule your free assessment.",
        variant: "default",
      });
      
      step1Form.reset();
      step2Form.reset();
      setShowStep2Modal(false);
      setStep1Data(null);
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

  const handleSkipStep2 = async () => {
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Request Received!",
        description: "We'll be in touch within 24 hours.",
        variant: "default",
      });
      
      step1Form.reset();
      setShowStep2Modal(false);
      setStep1Data(null);
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
          
          {/* Main grid - Form on left, Dashboard on right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
            
            {/* Left column - Vertical Form with integrated info */}
            <motion.div 
              className="flex flex-col gap-6 w-full"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              id="assessment-form"
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
                  Protect Your Business{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Now.</span>
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-lg text-gray-300 leading-relaxed max-w-xl">
                Enterprise-grade cybersecurity for small businesses. Get 24/7 protection, 
                cut cyber liability, and pass compliance checks.
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

              {/* Form Card - Glassmorphism - STEP 1: Just Name + Email */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 via-transparent to-cyan-600/20 blur-2xl" />
                
                <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
                  <Form {...step1Form}>
                    <form onSubmit={step1Form.handleSubmit(handleStep1Submit)} className="space-y-4">
                      {/* Form fields - Just Name + Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={step1Form.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm text-gray-300">Full Name</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="John Smith" 
                                  data-testid="input-hero-full-name"
                                  className="h-11 bg-white/10 border-white/20 text-white placeholder:text-gray-500 focus-visible:ring-purple-500 focus-visible:border-purple-500"
                                  disabled={isSubmitting}
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={step1Form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm text-gray-300">Work Email</FormLabel>
                              <FormControl>
                                <Input 
                                  type="email" 
                                  placeholder="john@company.com" 
                                  data-testid="input-hero-email"
                                  className="h-11 bg-white/10 border-white/20 text-white placeholder:text-gray-500 focus-visible:ring-purple-500 focus-visible:border-purple-500"
                                  disabled={isSubmitting}
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Trust Badges - Inside form container */}
                      <div className="flex flex-wrap items-center justify-center gap-3 py-3 px-4 rounded-xl bg-white/5 border border-white/10">
                        {trustBadges.map((badge, index) => (
                          <div 
                            key={badge.name}
                            className="flex items-center gap-2"
                            data-testid={`trust-badge-${badge.name.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            <badge.icon className="w-5 h-5 text-cyan-400" />
                            <span className="text-xs sm:text-sm text-gray-300 font-medium">{badge.name}</span>
                            {index < trustBadges.length - 1 && (
                              <div className="hidden sm:block w-px h-4 bg-white/20 ml-2" />
                            )}
                          </div>
                        ))}
                      </div>

                      {/* CTA Buttons row */}
                      <div className="flex flex-col sm:flex-row gap-3 pt-1">
                        <Button 
                          type="submit"
                          size="lg"
                          data-testid="button-hero-submit"
                          disabled={isSubmitting}
                          className="flex-1 h-12 text-base font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 border-0 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                              Submitting...
                            </>
                          ) : (
                            <>
                              Get Free Assessment
                              <ArrowRight className="w-5 h-5 ml-2" />
                            </>
                          )}
                        </Button>
                        
                        <a href="tel:325-480-9870" data-testid="button-hero-phone" className="sm:flex-shrink-0">
                          <Button 
                            type="button"
                            variant="outline" 
                            size="lg"
                            className="w-full sm:w-auto h-12 px-6 text-base font-semibold border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30 text-white transition-all duration-300"
                          >
                            <Phone className="w-5 h-5 mr-2" />
                            325-480-9870
                          </Button>
                        </a>
                      </div>

                      {/* Reassurance microcopy */}
                      <p className="text-center text-xs text-gray-500 pt-1">
                        No obligation • Results in 24-48 hours • No credit card required
                      </p>
                    </form>
                  </Form>
                </div>
              </motion.div>

              {/* Enhanced Stats row - Contained boxes with icons */}
              <div className="grid grid-cols-3 gap-3">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    data-testid={`stat-card-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}
                    className="relative flex flex-col items-center text-center p-4 rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/15 overflow-hidden"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                  >
                    {/* Background glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-50" />
                    
                    <div className="relative z-10">
                      <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-br from-purple-500/30 to-indigo-500/30 flex items-center justify-center border border-purple-500/20">
                        <stat.icon className="w-6 h-6 text-cyan-400" />
                      </div>
                      <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{stat.value}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{stat.label}</div>
                    </div>
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

      {/* Step 2 Modal */}
      <AnimatePresence>
        {showStep2Modal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isSubmitting && setShowStep2Modal(false)}
            />

            {/* Modal */}
            <motion.div
              className="relative w-full max-w-lg bg-gradient-to-br from-[#1a0a2e] to-[#0f0720] border border-white/15 rounded-2xl shadow-2xl overflow-hidden"
              initial={{ scale: 0.9, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Close button */}
              <button
                onClick={() => !isSubmitting && setShowStep2Modal(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
                disabled={isSubmitting}
              >
                <X className="w-5 h-5 text-white/70" />
              </button>

              {/* Glow effect */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-purple-500/20 blur-3xl" />

              <div className="relative p-6 sm:p-8">
                {/* Progress indicator */}
                <div className="flex items-center justify-center gap-2 mb-6">
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm text-green-400">Step 1</span>
                  </div>
                  <div className="w-8 h-px bg-white/20" />
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white text-sm font-medium">
                      2
                    </div>
                    <span className="text-sm text-purple-400">Step 2</span>
                  </div>
                </div>

                {/* Header */}
                <div className="text-center mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    Almost there! Just 3 quick questions
                  </h3>
                  <p className="text-sm text-gray-400">
                    Help us personalize your security assessment
                  </p>
                </div>

                {/* User info recap */}
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 mb-6">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-medium">
                    {step1Data?.fullName?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{step1Data?.fullName}</p>
                    <p className="text-xs text-gray-400">{step1Data?.email}</p>
                  </div>
                </div>

                {/* Step 2 Form */}
                <Form {...step2Form}>
                  <form onSubmit={step2Form.handleSubmit(handleStep2Submit)} className="space-y-4">
                    {/* Endpoints dropdown */}
                    <FormField
                      control={step2Form.control}
                      name="endpoints"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm text-gray-300">How many devices/computers do you have?</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-11 bg-white/10 border-white/20 text-white">
                                <SelectValue placeholder="Select range" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-[#1a0a2e] border-white/20">
                              <SelectItem value="1-10">1-10 devices</SelectItem>
                              <SelectItem value="11-25">11-25 devices</SelectItem>
                              <SelectItem value="26-50">26-50 devices</SelectItem>
                              <SelectItem value="51-100">51-100 devices</SelectItem>
                              <SelectItem value="100+">100+ devices</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Current provider dropdown */}
                    <FormField
                      control={step2Form.control}
                      name="hasProvider"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm text-gray-300">Do you currently have an IT provider?</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-11 bg-white/10 border-white/20 text-white">
                                <SelectValue placeholder="Select option" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-[#1a0a2e] border-white/20">
                              <SelectItem value="no">No, managing internally</SelectItem>
                              <SelectItem value="yes-happy">Yes, but exploring options</SelectItem>
                              <SelectItem value="yes-switching">Yes, looking to switch</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Primary concern dropdown */}
                    <FormField
                      control={step2Form.control}
                      name="primaryConcern"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm text-gray-300">What's your primary concern?</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-11 bg-white/10 border-white/20 text-white">
                                <SelectValue placeholder="Select concern" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-[#1a0a2e] border-white/20">
                              <SelectItem value="compliance">Compliance requirements</SelectItem>
                              <SelectItem value="insurance">Cyber insurance requirements</SelectItem>
                              <SelectItem value="breach">Recent breach or threat</SelectItem>
                              <SelectItem value="protection">General protection</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Optional fields */}
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <FormField
                        control={step2Form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm text-gray-400">Phone (optional)</FormLabel>
                            <FormControl>
                              <Input 
                                type="tel" 
                                placeholder="(480) 000-0000" 
                                data-testid="input-step2-phone"
                                className="h-10 bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                                {...field} 
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={step2Form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm text-gray-400">Company (optional)</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Your Company" 
                                data-testid="input-step2-company"
                                className="h-10 bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                                {...field} 
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Submit button */}
                    <div className="flex flex-col gap-3 pt-2">
                      <Button 
                        type="submit"
                        size="lg"
                        data-testid="button-step2-submit"
                        disabled={isSubmitting}
                        className="w-full h-12 text-base font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 border-0 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            Complete My Assessment
                            <ArrowRight className="w-5 h-5 ml-2" />
                          </>
                        )}
                      </Button>

                      <button
                        type="button"
                        onClick={handleSkipStep2}
                        disabled={isSubmitting}
                        className="text-sm text-gray-400 hover:text-white transition-colors"
                      >
                        Skip for now, just send my request
                      </button>
                    </div>
                  </form>
                </Form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
