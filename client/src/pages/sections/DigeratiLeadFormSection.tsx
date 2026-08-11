import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Loader2, Check, Shield, Clock, CheckCircle } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PatternOverlay, DiagonalDivider } from "@/components/SectionPatterns";

const formSchema = z.object({
  fullName: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z.string()
    .email("Please enter a valid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export const DigeratiLeadFormSection = (): JSX.Element => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      company: "",
    },
  });

  const handleSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: data.fullName,
          email: data.email,
          phone: data.phone || "",
          company: data.company || "",
          source: "lead_form",
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Submission failed");
      }
      
      toast({
        title: "Assessment Request Submitted!",
        description: "We'll contact you within 24 hours to schedule your Cyber Risk Assessment.",
        variant: "default",
      });
      
      form.reset();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    { icon: Shield, text: "Complimentary security assessment" },
    { icon: Clock, text: "Results in 24-48 hours" },
    { icon: CheckCircle, text: "No obligation, no credit card" },
  ];

  return (
    <section 
      id="assessment-form"
      className="py-[80px] pt-32 pb-32 relative overflow-hidden"
      style={{ 
        background: 'linear-gradient(135deg, #F7FAFC 0%, #EDF2F7 50%, #E2E8F0 100%)'
      }}
    >
      {/* Subtle diagonal transition with violet accent */}
      <DiagonalDivider position="bottom" toColor="#0a0a0a" height={50} angle="right" />
      
      {/* Pattern overlay */}
      <PatternOverlay variant="dots" opacity={0.025} />
      
      {/* Accent glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-purple-300/10 rounded-full blur-[100px] pointer-events-none z-0" />
      
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1A202C] leading-tight mb-4">
              Get Your Free Security Assessment
            </h2>
            <p className="text-lg md:text-xl text-[#4A5568] leading-relaxed max-w-2xl mx-auto">
              Discover vulnerabilities before attackers do. Our experts will analyze your security posture and provide actionable recommendations.
            </p>
          </motion.div>

          <motion.div
            className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 md:p-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-[#1A202C] font-medium">Full Name *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="John Smith" 
                            data-testid="input-lead-full-name"
                            className="h-12 bg-white border-gray-300 text-[#1A202C] placeholder:text-gray-400 focus-visible:ring-purple-500 focus-visible:border-purple-400 text-base"
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
                        <FormLabel className="text-sm text-[#1A202C] font-medium">Work Email *</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="john@company.com" 
                            data-testid="input-lead-email"
                            className="h-12 bg-white border-gray-300 text-[#1A202C] placeholder:text-gray-400 focus-visible:ring-purple-500 focus-visible:border-purple-400 text-base"
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
                        <FormLabel className="text-sm text-[#1A202C] font-medium">Phone (Optional)</FormLabel>
                        <FormControl>
                          <Input 
                            type="tel" 
                            placeholder="(555) 123-4567" 
                            data-testid="input-lead-phone"
                            className="h-12 bg-white border-gray-300 text-[#1A202C] placeholder:text-gray-400 focus-visible:ring-purple-500 focus-visible:border-purple-400 text-base"
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
                        <FormLabel className="text-sm text-[#1A202C] font-medium">Company (Optional)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Acme Corp" 
                            data-testid="input-lead-company"
                            className="h-12 bg-white border-gray-300 text-[#1A202C] placeholder:text-gray-400 focus-visible:ring-purple-500 focus-visible:border-purple-400 text-base"
                            disabled={isSubmitting}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button 
                  type="submit"
                  size="lg"
                  data-testid="button-lead-submit"
                  disabled={isSubmitting}
                  className="w-full h-14 text-lg font-bold bg-gradient-to-r from-fuchsia-600 via-pink-600 to-rose-500 hover:from-fuchsia-500 hover:via-pink-500 hover:to-rose-400 text-white border-0 shadow-lg shadow-pink-500/30 hover:shadow-pink-500/45 transition-all duration-300 justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Schedule Cyber Risk Assessment
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </Button>

                <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
                  {benefits.map((benefit) => (
                    <div key={benefit.text} className="flex items-center gap-2">
                      <benefit.icon className="w-4 h-4 text-purple-600" />
                      <span className="text-base text-[#4A5568]">{benefit.text}</span>
                    </div>
                  ))}
                </div>
              </form>
            </Form>
          </motion.div>

          <motion.p 
            className="text-center text-base text-[#718096] mt-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Prefer to call?{" "}
            <a 
              href="tel:480-519-5892"
              data-testid="link-lead-phone"
              className="text-purple-600 hover:text-purple-700 font-medium transition-colors"
            >
              480-519-5892
            </a>
          </motion.p>
        </div>
      </div>
    </section>
  );
};
