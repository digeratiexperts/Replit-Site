import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, ArrowRight, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBooking } from "@/contexts/BookingContext";
import { CTA } from "@/lib/ctaCopy";

export function StickyCTABar() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const { openBooking } = useBooking();

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
          className="fixed bottom-0 left-0 right-0 md:right-[70px] z-50 p-3 md:p-0"
          data-testid="sticky-cta-bar"
        >
          <div className="relative bg-gradient-to-r from-fuchsia-900/95 via-pink-900/95 to-violet-900/95 backdrop-blur-lg border-t border-pink-500/35 shadow-lg shadow-pink-500/15">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50 pointer-events-none" />
            
            <button
              onClick={handleDismiss}
              className="absolute top-1/2 -translate-y-1/2 right-2 md:right-4 p-1.5 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close banner"
              data-testid="button-dismiss-sticky-cta"
            >
              <X className="w-4 h-4 text-white/60" />
            </button>

            <div className="container mx-auto px-4 py-3">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-3 lg:gap-5 pr-8">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="hidden sm:flex w-10 h-10 rounded-full bg-white/10 items-center justify-center shrink-0">
                    <Shield className="w-5 h-5 text-violet-300" />
                  </div>
                  <div className="text-center lg:text-left min-w-0">
                    <p className="text-white font-semibold text-base md:text-lg">
                      Independent Risk Assessment
                    </p>
                    <p className="text-white/70 text-base md:text-base leading-snug max-w-xl">
                      Your current provider has a conflict grading their own work.
                      {" "}
                      <span className="text-white/90">
                        We map the gaps, build a plan, and can collaborate with them — switching is optional.
                      </span>
                    </p>
                  </div>
                </div>

                <div className="hidden xl:flex items-center">
                  <span
                    className="rounded-full border border-white/20 bg-white/5 px-3.5 py-1.5 text-xs font-medium tracking-wide text-white/80 whitespace-nowrap"
                    data-testid="sticky-cta-reassurance"
                  >
                    No switch required
                  </span>
                </div>

                <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
                  <a
                    href="tel:480-519-5892"
                    className="hidden md:flex items-center gap-2 text-white/75 hover:text-white transition-colors text-base"
                    data-testid="link-phone-sticky"
                  >
                    <Phone className="w-4 h-4" />
                    <span>480-519-5892</span>
                  </a>
                  
                  <Button
                    size="sm"
                    className="h-11 bg-white px-5 text-base text-pink-700 hover:bg-pink-50 font-semibold shadow-lg"
                    data-testid="button-sticky-cta-assessment"
                    onClick={() => openBooking("sticky_cta")}
                    aria-label={CTA.primary}
                  >
                    {CTA.primaryNavCompact}
                    <ArrowRight className="ml-1.5 h-4 w-4" />
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
