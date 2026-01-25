import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, ArrowRight, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export function StickyCTABar() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("stickyCtaDismissed");
    if (dismissed) {
      setIsDismissed(true);
      return;
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = window.innerHeight * 0.5;
      
      const isPortalPage = window.location.pathname.startsWith("/portal");
      const isHomePage = window.location.pathname === "/";
      
      if (isPortalPage || isHomePage) {
        setIsVisible(false);
        return;
      }

      setIsVisible(scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    sessionStorage.setItem("stickyCtaDismissed", "true");
  };

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-3 md:p-0"
          data-testid="sticky-cta-bar"
        >
          <div className="relative bg-gradient-to-r from-violet-900/95 via-purple-900/95 to-violet-900/95 backdrop-blur-lg border-t border-violet-500/30 shadow-lg shadow-violet-500/10">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
            
            <button
              onClick={handleDismiss}
              className="absolute top-1/2 -translate-y-1/2 right-2 md:right-4 p-1.5 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close banner"
              data-testid="button-dismiss-sticky-cta"
            >
              <X className="w-4 h-4 text-white/60" />
            </button>

            <div className="container mx-auto px-4 py-3">
              <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6 pr-8">
                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex w-10 h-10 rounded-full bg-white/10 items-center justify-center">
                    <Shield className="w-5 h-5 text-violet-300" />
                  </div>
                  <div className="text-center md:text-left">
                    <p className="text-white font-semibold text-sm md:text-base">
                      Is Your Business Protected?
                    </p>
                    <p className="text-white/60 text-xs md:text-sm hidden sm:block">
                      Get a free security assessment from our Arizona-based experts
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
                  <a
                    href="tel:325-480-9870"
                    className="hidden md:flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm"
                    data-testid="link-phone-sticky"
                  >
                    <Phone className="w-4 h-4" />
                    <span>325-480-9870</span>
                  </a>
                  
                  <Button
                    asChild
                    size="sm"
                    className="bg-white text-violet-700 hover:bg-violet-50 font-semibold shadow-lg"
                    data-testid="button-sticky-cta-assessment"
                  >
                    <a href="https://meet.digerati-experts.com/" target="_blank" rel="noopener noreferrer">
                      Free Assessment
                      <ArrowRight className="ml-1.5 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
