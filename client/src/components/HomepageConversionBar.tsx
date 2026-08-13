import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { useBooking } from "@/contexts/BookingContext";

/**
 * Slim after-scroll conversion strip for the homepage only.
 * Not a second navigation system — assessment, pricing, phone, schedule.
 */
export function HomepageConversionBar() {
  const [visible, setVisible] = useState(false);
  const [cookieClear, setCookieClear] = useState(() => {
    try {
      return !!localStorage.getItem("de_cookie_consent_v2") || !!localStorage.getItem("de_cookie_consent");
    } catch {
      return true;
    }
  });
  const prefersReducedMotion = useReducedMotion();
  const { openBooking } = useBooking();

  useEffect(() => {
    const onConsent = () => setCookieClear(true);
    window.addEventListener("de-cookie-consent", onConsent);
    return () => window.removeEventListener("de-cookie-consent", onConsent);
  }, []);

  useEffect(() => {
    const hero = document.getElementById("home");
    if (!hero || typeof IntersectionObserver === "undefined") {
      const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.12 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const show = visible && cookieClear;

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--de-conversion-bar-h",
      show ? "3.25rem" : "0px"
    );
    return () => {
      document.documentElement.style.setProperty("--de-conversion-bar-h", "0px");
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { y: 24, opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.22, ease: "easeOut" }}
          className="fixed bottom-0 de-fixed-in-canvas z-40"
          data-testid="homepage-conversion-bar"
        >
          <div className="border-t border-white/10 bg-[#050312]/95 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-3 px-4 py-2 sm:px-6 lg:px-8 pr-36 sm:pr-44">
              <div className="flex min-w-0 items-center gap-x-4 gap-y-1 text-sm text-white/75">
                <button
                  type="button"
                  className="hidden sm:inline hover:text-white transition-colors whitespace-nowrap"
                  onClick={() => openBooking("homepage_conversion_bar")}
                >
                  Cyber Risk Assessment
                </button>
                <a
                  href="#pricing"
                  className="hidden md:inline hover:text-white transition-colors whitespace-nowrap"
                >
                  Pricing
                </a>
                <a
                  href="tel:480-519-5892"
                  className="inline-flex items-center gap-1.5 hover:text-white transition-colors whitespace-nowrap"
                  data-testid="link-conversion-phone"
                >
                  <Phone className="h-3.5 w-3.5 text-pink-400" aria-hidden="true" />
                  480-519-5892
                </a>
              </div>
              <button
                type="button"
                onClick={() => openBooking("homepage_conversion_bar")}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-gradient-to-r from-fuchsia-600 via-pink-600 to-rose-500 px-3.5 py-2 text-sm font-semibold text-white border border-pink-300/25 hover:from-fuchsia-500 hover:via-pink-500 hover:to-rose-400 transition-all"
                data-testid="button-conversion-schedule"
              >
                Schedule Assessment
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
