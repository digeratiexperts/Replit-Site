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
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Message Sent Successfully!",
        description: "We'll get back to you within 24 hours.",
        variant: "default",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or call us directly.",
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
      className="py-20 relative overflow-hidden"
      style={{
        background: `linear-gradient(to bottom, #0f0b2c, #0a0118)`
      }}
    >
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-cyan-600/8 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left column - Info */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
              Ready to Secure Your Business?
            </h2>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Located in the heart of Chandler, we're your local cybersecurity experts. 
              Whether you need immediate help or want to explore our services, we're here for you.
            </p>

            {/* Contact info */}
            <div className="space-y-4 mb-8">
              {contactInfo.map((item) => (
                <a 
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/40 hover:bg-white/10 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <item.icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-gray-300 group-hover:text-white transition-colors">{item.label}</span>
                </a>
              ))}
            </div>

            {/* Office Hours */}
            <div className="p-6 rounded-xl bg-white/5 border border-white/10 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="h-5 w-5 text-cyan-400" />
                <h3 className="text-lg font-semibold text-white">Office Hours</h3>
              </div>
              <div className="space-y-2 text-gray-400">
                <p>Monday - Friday: 7:00 AM - 6:00 PM MST</p>
                <p>Saturday & Sunday: Emergency Support Only</p>
                <p className="flex items-center gap-2 text-cyan-400 font-semibold mt-3">
                  <Shield className="h-4 w-4" />
                  24/7 Security Operations Center Always Active
                </p>
              </div>
            </div>

            {/* Social links */}
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Connect With Us</h3>
              <div className="flex gap-3">
                {[
                  { icon: Linkedin, testId: "social-linkedin" },
                  { icon: Facebook, testId: "social-facebook" },
                  { icon: Twitter, testId: "social-twitter" },
                ].map((social) => (
                  <a 
                    key={social.testId}
                    href="#" 
                    data-testid={social.testId}
                    className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
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
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 via-transparent to-cyan-600/20 blur-xl" />
              <div className="relative backdrop-blur-xl bg-[#1a0a2e]/80 border border-purple-500/30 rounded-2xl p-6 md:p-8 shadow-[0_8px_32px_rgba(139,92,246,0.2)]">
                <h3 className="text-2xl font-bold text-white mb-2">Get in Touch</h3>
                <p className="text-gray-400 mb-6">Fill out the form for a free consultation</p>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-300">Your Name *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="John Smith" 
                              data-testid="input-contact-name"
                              className="h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-500 focus-visible:ring-purple-500 focus-visible:border-purple-400"
                              disabled={isSubmitting}
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-300">Business Email *</FormLabel>
                            <FormControl>
                              <Input 
                                type="email" 
                                placeholder="john@company.com" 
                                data-testid="input-contact-email"
                                className="h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-500 focus-visible:ring-purple-500 focus-visible:border-purple-400"
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
                            <FormLabel className="text-gray-300">Phone Number *</FormLabel>
                            <FormControl>
                              <Input 
                                type="tel" 
                                placeholder="(480) 000-0000" 
                                data-testid="input-contact-phone"
                                className="h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-500 focus-visible:ring-purple-500 focus-visible:border-purple-400"
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
                          <FormLabel className="text-gray-300">Company Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your Company Inc." 
                              data-testid="input-contact-company"
                              className="h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-500 focus-visible:ring-purple-500 focus-visible:border-purple-400"
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
                          <FormLabel className="text-gray-300">Service Interested In</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                            disabled={isSubmitting}
                          >
                            <FormControl>
                              <SelectTrigger 
                                className="h-12 bg-white/10 border-white/20 text-white [&>span]:text-gray-400 focus:ring-purple-500"
                                data-testid="select-contact-service"
                              >
                                <SelectValue placeholder="Select a service" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-[#1a0a2e] border-white/20">
                              <SelectItem value="managed-security" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">Managed Security Services</SelectItem>
                              <SelectItem value="managed-it" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">Managed IT Services</SelectItem>
                              <SelectItem value="compliance" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">Compliance & Governance</SelectItem>
                              <SelectItem value="incident-response" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">Incident Response</SelectItem>
                              <SelectItem value="assessment" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">Security Assessment</SelectItem>
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
                          <FormLabel className="text-gray-300">Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us about your security needs..." 
                              rows={4} 
                              data-testid="textarea-contact-message"
                              className="bg-white/10 border-white/20 text-white placeholder:text-gray-500 focus-visible:ring-purple-500 focus-visible:border-purple-400 resize-none"
                              disabled={isSubmitting}
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      className="w-full h-14 text-lg font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 border-0 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300" 
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
