import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Linkedin, Facebook, Twitter, Loader2, Clock, Shield } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { analytics } from "@/lib/analytics";
import contactBgImage from "@assets/de-section-atmosphere.png";

const contactFormSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z.string()
    .email("Please enter a valid email address"),
  phone: z.string()
    .regex(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, "Please enter a valid phone number"),
  company: z.string().optional(),
  service: z.string().optional(),
  message: z.string()
    .min(10, "Message must be at least 10 characters")
    .max(500, "Message must be less than 500 characters")
    .optional(),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export const DigeratiContactSection = (): JSX.Element => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const prefersReducedMotion = useReducedMotion();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      service: "",
      message: "",
    },
  });

  const handleSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message');
      }
      
      analytics.contactFormSubmitted(data.service || "general");
      toast({
        title: "Message Sent Successfully!",
        description: "We'll get back to you within 24 hours.",
        variant: "default",
      });
      
      form.reset();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: Mail, label: "info@digeratiexperts.com", href: "mailto:info@digeratiexperts.com" },
    { icon: Phone, label: "325-480-9870", href: "tel:325-480-9870" },
    { icon: MapPin, label: "3165 S Alma School Rd Suite 29, Chandler, AZ 85248", href: "#" },
  ];

  return (
    <section 
      id="contact" 
      className="py-8 lg:py-10 relative overflow-hidden bg-[#0a0a0a]"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img src={contactBgImage} alt="" loading="lazy" className="absolute top-0 left-0 w-full h-auto opacity-[0.15]" />
      </div>
      {/* Subtle accent */}
      <div 
        className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(circle at 100% 0%, rgba(139, 92, 246, 0.08) 0%, transparent 50%)" }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left column - Info */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold leading-tight mb-3 text-white">
              Ready to Secure Your Business?
            </h2>
            <p className="text-sm text-gray-300 mb-4 leading-relaxed">
              Located in the heart of Chandler, we're your local cybersecurity experts. 
              Whether you need immediate help or want to explore our services, we're here for you.
            </p>

            {/* Contact info */}
            <div className="space-y-2 mb-4">
              {contactInfo.map((item) => (
                <a 
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-violet-500/30 hover:bg-white/[0.05] transition-all duration-300 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                    <item.icon className="h-4 w-4 text-violet-400" />
                  </div>
                  <span className="text-sm text-white/70 group-hover:text-white transition-colors">{item.label}</span>
                </a>
              ))}
            </div>

            {/* Office Hours */}
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-violet-400" />
                <h3 className="text-base font-semibold text-white">Office Hours</h3>
              </div>
              <div className="space-y-1 text-sm text-white/50">
                <p>Monday - Friday: 7:00 AM - 6:00 PM MST</p>
                <p>Saturday & Sunday: Emergency Support Only</p>
                <p className="flex items-center gap-2 text-emerald-500 font-semibold mt-2">
                  <Shield className="h-3 w-3" />
                  24/7 Security Operations Center Always Active
                </p>
              </div>
            </div>

            {/* Social links - inline */}
            <div className="flex items-center gap-3 mt-4">
              <span className="text-xs text-gray-500">Follow us:</span>
              {[
                { icon: Linkedin, testId: "social-linkedin", href: "https://www.linkedin.com/company/digerati-experts" },
                { icon: Facebook, testId: "social-facebook", href: "https://www.facebook.com/digeratiexperts" },
                { icon: Twitter, testId: "social-twitter", href: "https://twitter.com/digeratiexperts" },
              ].map((social) => (
                <a 
                  key={social.testId}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={social.testId}
                  className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-violet-500/30 transition-all duration-300"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right column - Form */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-violet-500/5 blur-xl rounded-2xl" />
              <div className="relative backdrop-blur-xl bg-white border border-gray-200 rounded-2xl p-4 md:p-5 shadow-xl">
                <h3 className="text-lg font-bold text-gray-900 mb-0.5">Get in Touch</h3>
                <p className="text-xs text-gray-500 mb-3">Fill out the form for a free consultation</p>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm text-gray-700 font-medium">Your Name *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="John Smith" 
                              data-testid="input-contact-name"
                              className="h-10 bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus-visible:ring-violet-500 focus-visible:border-violet-400"
                              disabled={isSubmitting}
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid sm:grid-cols-2 gap-3">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm text-gray-700 font-medium">Business Email *</FormLabel>
                            <FormControl>
                              <Input 
                                type="email" 
                                placeholder="john@company.com" 
                                data-testid="input-contact-email"
                                className="h-10 bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus-visible:ring-violet-500 focus-visible:border-violet-400"
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
                            <FormLabel className="text-sm text-gray-700 font-medium">Phone Number *</FormLabel>
                            <FormControl>
                              <Input 
                                type="tel" 
                                placeholder="(480) 000-0000" 
                                data-testid="input-contact-phone"
                                className="h-10 bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus-visible:ring-violet-500 focus-visible:border-violet-400"
                                disabled={isSubmitting}
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm text-gray-700 font-medium">Company Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your Company Inc." 
                              data-testid="input-contact-company"
                              className="h-10 bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus-visible:ring-violet-500 focus-visible:border-violet-400"
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
                      name="service"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm text-gray-700 font-medium">Service Interested In</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                            disabled={isSubmitting}
                          >
                            <FormControl>
                              <SelectTrigger 
                                className="h-10 bg-gray-50 border-gray-200 text-gray-900 [&>span]:text-gray-400 focus:ring-violet-500"
                                data-testid="select-contact-service"
                              >
                                <SelectValue placeholder="Select a service" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-white border-gray-200">
                              <SelectItem value="managed-security" className="text-gray-900 hover:bg-gray-100 focus:bg-gray-100 focus:text-gray-900">Managed Security Services</SelectItem>
                              <SelectItem value="managed-it" className="text-gray-900 hover:bg-gray-100 focus:bg-gray-100 focus:text-gray-900">Managed IT Services</SelectItem>
                              <SelectItem value="compliance" className="text-gray-900 hover:bg-gray-100 focus:bg-gray-100 focus:text-gray-900">Compliance & Governance</SelectItem>
                              <SelectItem value="incident-response" className="text-gray-900 hover:bg-gray-100 focus:bg-gray-100 focus:text-gray-900">Incident Response</SelectItem>
                              <SelectItem value="assessment" className="text-gray-900 hover:bg-gray-100 focus:bg-gray-100 focus:text-gray-900">Security Assessment</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm text-gray-700 font-medium">Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us about your security needs..." 
                              rows={3} 
                              data-testid="textarea-contact-message"
                              className="bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus-visible:ring-violet-500 focus-visible:border-violet-400 resize-none"
                              disabled={isSubmitting}
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      className="w-full h-10 text-sm font-bold bg-violet-600 hover:bg-violet-700 border-0 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-300" 
                      data-testid="button-send-message"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
