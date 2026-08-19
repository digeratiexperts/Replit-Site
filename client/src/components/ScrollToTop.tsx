import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";

function hasCookieConsent(): boolean {
  try {
    return !!(
      localStorage.getItem("de_cookie_consent_v2") ||
      localStorage.getItem("de_cookie_consent")
    );
  } catch {
    return false;
  }
}

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [cookieBannerClear, setCookieBannerClear] = useState(hasCookieConsent);
  const prefersReducedMotion = useReducedMotion();

  const toggleVisibility = useCallback(() => {
    setIsVisible(window.scrollY > 500);
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          toggleVisibility();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [toggleVisibility]);

  useEffect(() => {
    if (cookieBannerClear) return;
    const check = () => {
      if (hasCookieConsent()) setCookieBannerClear(true);
    };
    window.addEventListener("de-cookie-consent", check);
    window.addEventListener("storage", check);
    const id = window.setInterval(check, 800);
    return () => {
      window.clearInterval(id);
      window.removeEventListener("de-cookie-consent", check);
      window.removeEventListener("storage", check);
    };
  }, [cookieBannerClear]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
          onClick={scrollToTop}
          className="de-scroll-top p-3 bg-de-raised hover:bg-de-accent text-white rounded-full shadow-lg shadow-none backdrop-blur-sm border border-de-hairline transition-colors duration-200 group"
          aria-label="Scroll to top"
          data-testid="button-scroll-to-top"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
