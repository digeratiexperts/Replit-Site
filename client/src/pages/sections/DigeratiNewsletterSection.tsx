import { Mail, Shield, Lock, TrendingUp, Users, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { motion, useReducedMotion } from "framer-motion";

export const DigeratiNewsletterSection = (): JSX.Element => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const prefersReducedMotion = useReducedMotion();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Successfully Subscribed!",
      description: "You'll receive our security updates and expert insights.",
      variant: "default",
    });
    
    setEmail("");
    setIsSubmitting(false);
  };

  const avatars = [
    "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=2",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=3",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=4",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=5",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=6",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=7",
  ];

  const benefits = [
    { icon: Shield, label: "Security Alerts", color: "text-purple-400" },
    { icon: Lock, label: "Best Practices", color: "text-cyan-400" },
    { icon: TrendingUp, label: "Industry Trends", color: "text-green-400" },
    { icon: Users, label: "Expert Insights", color: "text-yellow-400" },
  ];

  return (
    <section 
      className="py-20 relative overflow-hidden"
      style={{
        background: `linear-gradient(to bottom, #0d0720, #0f0b2c)`
      }}
    >
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px]" />
        {/* Gradient lines */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Avatars */}
            <div className="flex justify-center -space-x-3 mb-8">
              {avatars.map((avatar, index) => (
                <div
                  key={index}
                  className="w-12 h-12 rounded-full border-2 border-purple-500/30 overflow-hidden bg-[#1a0a2e] shadow-lg shadow-purple-900/30"
                  style={{ zIndex: avatars.length - index }}
                >
                  <img src={avatar} alt={`Subscriber ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
              Subscribe to Our Newsletter & Stay Secure
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Enter your email to receive expert updates and personalized security advice.
            </p>

            {/* Email form - Glassmorphism card */}
            <div className="relative max-w-xl mx-auto mb-10">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 via-transparent to-cyan-600/20 blur-xl" />
              <form 
                onSubmit={handleSubmit} 
                className="relative flex flex-col sm:flex-row gap-3 p-2 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10"
              >
                <Input
                  type="email"
                  placeholder="Enter your work email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  data-testid="input-newsletter-email"
                  className="flex-1 h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-500 focus-visible:ring-purple-500 focus-visible:border-purple-400"
                  disabled={isSubmitting}
                  required
                />
                <Button
                  type="submit"
                  size="lg"
                  data-testid="button-newsletter-submit"
                  className="h-12 px-8 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold shadow-lg shadow-purple-500/25"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Subscribing...
                    </>
                  ) : (
                    <>
                      Subscribe
                      <Mail className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-8">
              {benefits.map((benefit) => (
                <div key={benefit.label} className="flex items-center justify-center gap-2 text-gray-300">
                  <benefit.icon className={`h-5 w-5 ${benefit.color}`} />
                  <span className="text-sm">{benefit.label}</span>
                </div>
              ))}
            </div>

            {/* Trust indicator */}
            <p className="text-sm text-gray-500">
              Join 5,000+ business leaders getting monthly security insights.
              <br />
              <span className="text-xs text-gray-600">Unsubscribe anytime. We respect your privacy.</span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
