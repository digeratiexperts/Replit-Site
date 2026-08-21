import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, ArrowRight, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBooking } from "@/contexts/BookingContext";
import { CTA } from "@/lib/ctaCopy";
import { PRIMARY_PHONE } from "@/data/companyContact";

export function StickyCTABar() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const { openBooking } = useBooking();
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("stickyCtaDismissed");
    if (dismissed) {
      setIsDismissed(true);
      return;
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = window.innerHeight * 0.5;
      const path = window.location.pathname;
      const isPortalPage = path.startsWith("/portal");
      const isHomePage = path === "/";

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

  useEffect(() => {
    const root = document.documentElement;
    const el = barRef.current;
    if (!isVisible || isDismissed || !el) {
      root.style.setProperty("--de-sticky-cta-h", "0px");
      return;
    }

    const publish = () => {
      root.style.setProperty("--de-sticky-cta-h", `${Math.round(el.offsetHeight)}px`);
    };
    publish();
    const ro = new ResizeObserver(publish);
    ro.observe(el);
    return () => {
      ro.disconnect();
      root.style.setProperty("--de-sticky-cta-h", "0px");
    };
  }, [isVisible, isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    sessionStorage.setItem("stickyCtaDismissed", "true");
    document.documentElement.style.setProperty("--de-sticky-cta-h", "0px");
  };

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={barRef}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="de-bottom-bar"
          data-testid="sticky-cta-bar"
        >
          <div className="relative overflow-hidden rounded-2xl border border-pink-400/35 bg-de-raised backdrop-blur-lg shadow-lg shadow-pink-500/20">
            <button
              onClick={handleDismiss}
              className="absolute top-2 right-2 z-10 p-1.5 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close banner"
              data-testid="button-dismiss-sticky-cta"
            >
              <X className="w-4 h-4 text-white/70" />
            </button>

            <div className="px-4 py-3 pr-11">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-3 lg:gap-5">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="hidden sm:flex w-10 h-10 rounded-full bg-white/10 items-center justify-center shrink-0">
                    <Shield className="w-5 h-5 text-de-accent-ink" />
                  </div>
                  <div className="text-center lg:text-left min-w-0">
                    <p className="text-white font-semibold text-base md:text-lg">
                      Independent Risk Assessment
                    </p>
                    <p className="text-white/70 text-sm md:text-base leading-snug max-w-xl">
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
                    href={PRIMARY_PHONE.telHref}
                    className="hidden md:flex items-center gap-2 text-white/75 hover:text-white transition-colors text-base"
                    data-testid="link-phone-sticky"
                  >
                    <Phone className="w-4 h-4" />
                    <span>{PRIMARY_PHONE.display}</span>
                  </a>

                  <Button
                    size="sm"
                    className="h-11 px-5 text-base font-semibold"
                    variant="brand"
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
