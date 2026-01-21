import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Shield, CheckCircle, Clock, Award } from "lucide-react";
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

const benefits = [
  { icon: Shield, text: "Full vulnerability assessment included", color: "text-violet-400" },
  { icon: CheckCircle, text: "Results delivered within 48 hours", color: "text-green-400" },
  { icon: Clock, text: "No commitment required", color: "text-purple-400" },
  { icon: Award, text: "Expert recommendations included", color: "text-yellow-400" },
];

export const LeadCaptureBand = (): JSX.Element => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

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

  return (
    <section 
      id="assessment-form"
      className="relative py-16 lg:py-20 overflow-hidden bg-gradient-to-b from-[#0a0118] via-[#0d0720] to-[#0a0118]"
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at 30% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(34, 211, 238, 0.1) 0%, transparent 50%)"
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-[min(94vw,1400px)] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* Left side - Value proposition */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-600/20 border border-violet-500/30">
              <span className="text-violet-400 text-base font-medium">Limited Time Offer</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Get Your{" "}
              <span className="bg-gradient-to-r from-violet-300 via-purple-300 to-fuchsia-300 bg-clip-text text-transparent">
                Free Assessment
              </span>
            </h2>
            
            <p className="text-lg text-gray-300 leading-relaxed max-w-lg">
              Lock in 80% off your Cyber Risk Assessment. Our security experts will identify vulnerabilities before hackers do.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.text}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className={`p-2 rounded-lg bg-white/5 ${benefit.color}`}>
                    <benefit.icon className="w-4 h-4" />
                  </div>
                  <span className="text-gray-300 text-base">{benefit.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right side - Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Glow effect behind card */}
            <div className="absolute -inset-4 bg-gradient-to-br from-violet-600/20 via-transparent to-purple-600/20 blur-3xl" />
            
            <Card className="relative backdrop-blur-xl bg-white/95 dark:bg-gray-900/95 shadow-[0_20px_70px_-15px_rgba(139,92,246,0.4)] border-0 ring-1 ring-white/20">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl xl:text-2xl bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Get Started Today
                </CardTitle>
                <CardDescription className="text-sm">
                  Complete the form below and we'll reach out within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm">Full Name *</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="John Smith" 
                                data-testid="input-lead-full-name"
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
                            <FormLabel className="text-sm">Email Address *</FormLabel>
                            <FormControl>
                              <Input 
                                type="email" 
                                placeholder="john@company.com" 
                                data-testid="input-lead-email"
                                className="h-11 focus-visible:ring-purple-600 focus-visible:ring-offset-0 transition-all duration-200"
                                disabled={isSubmitting}
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm">Phone Number *</FormLabel>
                            <FormControl>
                              <Input 
                                type="tel" 
                                placeholder="(480) 000-0000" 
                                data-testid="input-lead-phone"
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
                            <FormLabel className="text-sm">Company Name *</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Your Company Inc." 
                                data-testid="input-lead-company"
                                className="h-11 focus-visible:ring-purple-600 focus-visible:ring-offset-0 transition-all duration-200"
                                disabled={isSubmitting}
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <p className="text-xs text-gray-500 pt-1">
                      Protected in compliance with our Privacy Policy.
                    </p>
                    
                    <Button 
                      className="w-full h-12 text-base bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:from-violet-700 hover:to-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 focus-visible:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-violet-500/25" 
                      data-testid="button-lead-submit"
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};
