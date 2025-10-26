import { Mail, Shield, Lock, TrendingUp, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const DigeratiNewsletterSection = (): JSX.Element => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    // Simulate API call
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

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 via-purple-950 to-slate-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        {/* Gradient orbs */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-purple-600 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-600 rounded-full opacity-10 blur-3xl"></div>
        
        {/* Animated border */}
        <div className="absolute inset-0">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            {/* Avatars */}
            <div className="flex justify-center -space-x-4 mb-8">
              {avatars.map((avatar, index) => (
                <div
                  key={index}
                  className="w-12 h-12 rounded-full border-2 border-slate-900 overflow-hidden bg-gray-200"
                  style={{ zIndex: avatars.length - index }}
                >
                  <img src={avatar} alt={`Subscriber ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            <h2 className="text-4xl font-bold text-white mb-4">
              Subscribe to Our Newsletter & Stay Secure
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Enter your email to receive expert updates and personalized security advice.
            </p>

            {/* Email form */}
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto mb-8">
              <Input
                type="email"
                placeholder="Enter Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400"
                disabled={isSubmitting}
                required
              />
              <Button
                type="submit"
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 whitespace-nowrap"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Mail className="mr-2 h-5 w-5 animate-pulse" />
                    Subscribing...
                  </>
                ) : (
                  <>
                    Sign-Up
                    <Mail className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </form>

            {/* Benefits */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <div className="flex items-center justify-center gap-2 text-gray-300">
                <Shield className="h-5 w-5 text-purple-400" />
                <span className="text-sm">Security Alerts</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-gray-300">
                <Lock className="h-5 w-5 text-blue-400" />
                <span className="text-sm">Best Practices</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-gray-300">
                <TrendingUp className="h-5 w-5 text-green-400" />
                <span className="text-sm">Industry Trends</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-gray-300">
                <Users className="h-5 w-5 text-yellow-400" />
                <span className="text-sm">Expert Insights</span>
              </div>
            </div>

            {/* Trust indicator */}
            <p className="text-sm text-gray-400 mt-8">
              Join 5,000+ business leaders getting monthly security insights. 
              <br />
              <span className="text-xs">Unsubscribe anytime. We respect your privacy.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};