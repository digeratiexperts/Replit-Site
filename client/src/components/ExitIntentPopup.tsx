import { useState, useEffect, useCallback } from "react";
import { analytics } from "@/lib/analytics";
import { motion, AnimatePresence } from "framer-motion";
import { X, Shield, Download, ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import shieldImage from "@assets/lucid-origin_Cybersecurity_ebook_cover_art_dark_navy_blue_to_b_1775876025204.jpg";

interface ExitIntentPopupProps {
  delay?: number;
}

export function ExitIntentPopup({ delay = 30000 }: ExitIntentPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const showPopup = useCallback(() => {
    if (hasShown) return;
    
    const dismissed = sessionStorage.getItem("exitPopupDismissed");
    if (dismissed) return;

    const isPortalPage = window.location.pathname.startsWith("/portal");
    if (isPortalPage) return;

    analytics.exitIntentShown();
    setIsVisible(true);
    setHasShown(true);
  }, [hasShown]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let isReady = false;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && isReady) {
        showPopup();
      }
    };

    timeoutId = setTimeout(() => {
      isReady = true;
    }, delay);

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [delay, showPopup]);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem("exitPopupDismissed", "true");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    const publicDomains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "aol.com", "icloud.com"];
    const emailDomain = email.split("@")[1]?.toLowerCase();
    
    if (publicDomains.includes(emailDomain)) {
      toast({
        title: "Business Email Required",
        description: "Please use your company email address.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      await apiRequest("POST", "/api/newsletter", {
        email,
        source: "exit_intent_popup",
        website_url: ""
      });
      
      analytics.exitIntentConverted();
      setIsSuccess(true);
      toast({
        title: "Success!",
        description: "Check your email for the security checklist."
      });
      
      setTimeout(() => {
        handleClose();
      }, 3000);
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            onClick={handleClose}
            data-testid="overlay-exit-intent"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-0 flex items-center justify-center p-4 z-[101] pointer-events-none"
            data-testid="popup-exit-intent"
          >
            <div className="max-w-lg w-full pointer-events-auto">
            <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-violet-500/30 shadow-2xl shadow-violet-500/20">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors z-10"
                aria-label="Close popup"
                data-testid="button-close-exit-popup"
              >
                <X className="w-5 h-5 text-white/60" />
              </button>

              <div className="h-2 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500" />

              <div className="p-6 md:p-8">
                {!isSuccess ? (
                  <>
                    <div className="flex items-center justify-center mb-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-violet-500/20 rounded-2xl blur-2xl scale-150" />
                        <div className="relative w-28 h-36 rounded-xl overflow-hidden ring-2 ring-violet-500/30 shadow-lg shadow-violet-500/20">
                          <img src={shieldImage} alt="Cybersecurity Checklist" loading="lazy" decoding="async" width={112} height={144} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                          <div className="absolute bottom-2 left-0 right-0 flex justify-center">
                            <Shield className="w-6 h-6 text-violet-300 drop-shadow-lg" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        Wait! Don't Leave Unprotected
                      </h3>
                      <p className="text-white/70">
                        Get our free <span className="text-violet-300 font-semibold">2026 Cybersecurity Checklist</span> - 
                        the same checklist we use with our enterprise clients.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {[
                        "25-point security audit",
                        "Compliance quick-checks",
                        "Risk assessment guide",
                        "Action priority matrix"
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-white/60">
                          <Download className="w-4 h-4 text-violet-400" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                        <Input
                          type="email"
                          placeholder="Enter your business email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-violet-500"
                          data-testid="input-exit-popup-email"
                        />
                      </div>
                      
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white font-semibold"
                        data-testid="button-get-checklist"
                      >
                        {isSubmitting ? (
                          "Sending..."
                        ) : (
                          <>
                            Get Free Checklist
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </form>

                    <p className="text-center text-white/40 text-xs mt-4">
                      No spam. Unsubscribe anytime. We respect your privacy.
                    </p>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                      <Download className="w-8 h-8 text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Check Your Inbox!</h3>
                    <p className="text-white/70">
                      Your security checklist is on its way.
                    </p>
                  </div>
                )}
              </div>
            </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
