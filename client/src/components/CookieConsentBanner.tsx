import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import { saveConsent } from "@/lib/analytics";

const LEGACY_KEY = "de_cookie_consent";
const CONSENT_KEY = "de_cookie_consent_v2";

function hasStoredConsent(): boolean {
  try {
    return !!localStorage.getItem(CONSENT_KEY) || !!localStorage.getItem(LEGACY_KEY);
  } catch {
    return false;
  }
}

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [marketingEnabled, setMarketingEnabled] = useState(true);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasStoredConsent()) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const el = bannerRef.current;
    if (!visible || !el) {
      root.style.setProperty("--de-cookie-h", "0px");
      return;
    }
    const publish = () => {
      root.style.setProperty("--de-cookie-h", `${Math.round(el.offsetHeight)}px`);
    };
    publish();
    const ro = new ResizeObserver(publish);
    ro.observe(el);
    return () => {
      ro.disconnect();
      root.style.setProperty("--de-cookie-h", "0px");
    };
  }, [visible]);

  const finishConsent = () => {
    setVisible(false);
    setShowPreferences(false);
    window.dispatchEvent(new Event("de-cookie-consent"));
  };

  const accept = () => {
    saveConsent({ analytics: true, marketing: true });
    finishConsent();
  };

  const reject = () => {
    saveConsent({ analytics: false, marketing: false });
    finishConsent();
  };

  const savePreferences = () => {
    saveConsent({ analytics: analyticsEnabled, marketing: marketingEnabled });
    finishConsent();
  };

  return (
    <AnimatePresence>
      {visible && (
        <>
          {showPreferences && (
            <motion.div
              key="prefs-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9990] bg-black/60 backdrop-blur-sm"
              onClick={() => setShowPreferences(false)}
            />
          )}

          {showPreferences && (
            <motion.div
              key="prefs-panel"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-[88px] left-4 right-4 md:left-auto z-[9995] rounded-2xl border border-de-hairline bg-de-raised shadow-2xl shadow-black/50 p-6 md:w-[420px]"
              style={{ right: "calc(var(--de-canvas-gutter) + 1.5rem)" }}
              data-testid="cookie-preferences-panel"
            >
              <h3 className="text-white font-semibold text-lg mb-1 font-['Space_Grotesk']">Cookie Preferences</h3>
              <p className="text-gray-300 text-base mb-5 leading-relaxed">
                Choose which cookies you allow. Strictly necessary cookies are always enabled.
              </p>

              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4 p-3 rounded-xl bg-white/5 border border-white/10">
                  <div>
                    <p className="text-white text-base font-medium">Strictly Necessary</p>
                    <p className="text-gray-400 text-base mt-0.5">Required for the site to function.</p>
                  </div>
                  <span className="text-emerald-400 text-base font-semibold mt-1 whitespace-nowrap">Always On</span>
                </div>

                <label className="flex items-start justify-between gap-4 p-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer">
                  <div>
                    <p className="text-white text-base font-medium">Analytics Cookies</p>
                    <p className="text-gray-400 text-base mt-0.5">Help us understand how visitors interact with the site.</p>
                  </div>
                  <div
                    role="switch"
                    aria-checked={analyticsEnabled}
                    onClick={() => setAnalyticsEnabled(v => !v)}
                    className={`relative mt-1 w-10 h-5 rounded-full flex-shrink-0 cursor-pointer transition-colors ${analyticsEnabled ? "bg-[#D3126A]" : "bg-white/20"}`}
                    data-testid="toggle-analytics"
                  >
                    <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${analyticsEnabled ? "translate-x-5" : "translate-x-0"}`} />
                  </div>
                </label>

                <label className="flex items-start justify-between gap-4 p-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer">
                  <div>
                    <p className="text-white text-base font-medium">Marketing Cookies</p>
                    <p className="text-gray-400 text-base mt-0.5">Used to deliver relevant ads and track campaign effectiveness.</p>
                  </div>
                  <div
                    role="switch"
                    aria-checked={marketingEnabled}
                    onClick={() => setMarketingEnabled(v => !v)}
                    className={`relative mt-1 w-10 h-5 rounded-full flex-shrink-0 cursor-pointer transition-colors ${marketingEnabled ? "bg-[#D3126A]" : "bg-white/20"}`}
                    data-testid="toggle-marketing"
                  >
                    <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${marketingEnabled ? "translate-x-5" : "translate-x-0"}`} />
                  </div>
                </label>
              </div>

              <div className="flex gap-3 mt-5">
                <button
                  onClick={savePreferences}
                  className="flex-1 min-h-11 bg-[#D3126A] hover:bg-[#e01874] text-white text-base font-semibold py-2.5 rounded-xl transition-colors"
                  data-testid="button-save-preferences"
                >
                  Save Preferences
                </button>
                <button
                  onClick={() => setShowPreferences(false)}
                  className="min-h-11 px-4 bg-white/10 hover:bg-white/20 text-white text-base font-semibold py-2.5 rounded-xl transition-colors"
                  data-testid="button-cancel-preferences"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          )}

          <motion.div
            key="cookie-banner"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed z-[9991] de-fixed-in-canvas bottom-0"
            data-testid="cookie-consent-banner"
          >
            <div
              ref={bannerRef}
              className="relative overflow-hidden"
              style={{
                background: "#0a0a0a",
                borderTop: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.04]"
                style={{
                  backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
                  backgroundSize: "32px 32px",
                }}
              />

              <div className="relative z-10 max-w-screen-2xl mx-auto px-4 md:px-8 py-2.5 md:py-4 flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-8">
                <p className="hidden md:block text-gray-200 text-base leading-relaxed flex-1 min-w-0">
                  Digerati Experts uses cookies and similar tracking technologies to collect information you provide and to capture your interaction with our site. We use this information to enhance site navigation, personalize content, analyze your use of our website, and assist in our marketing efforts and customer service. To deliver the best experience, analytics and hosting service providers may have access to this information. By clicking "Accept All," you consent to our collection, use, and disclosure of such information. For more information about our data processing practices, please see our{" "}
                  <Link
                    href="/legal/privacy-policy"
                    className="underline underline-offset-2 text-[#D3126A] hover:text-white transition-colors font-medium"
                    data-testid="link-privacy-policy-cookie"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
                <p className="md:hidden text-[13px] font-medium leading-snug text-gray-200 flex-1 min-w-0">
                  We use cookies.{" "}
                  <Link
                    href="/legal/privacy-policy"
                    className="underline underline-offset-2 text-[#D3126A] hover:text-white transition-colors font-semibold"
                    data-testid="link-privacy-policy-cookie-mobile"
                  >
                    Privacy
                  </Link>
                  {" · "}
                  <button
                    type="button"
                    onClick={() => setShowPreferences(v => !v)}
                    className="underline underline-offset-2 text-[#D3126A] hover:text-white font-semibold"
                    data-testid="button-manage-cookie-preferences-mobile"
                  >
                    Preferences
                  </button>
                </p>

                <div className="flex items-center gap-2 flex-shrink-0 flex-wrap w-full md:w-auto justify-between md:justify-end">
                  <button
                    onClick={() => setShowPreferences(v => !v)}
                    className="hidden md:inline-flex text-[#D3126A] hover:text-white text-base font-semibold underline underline-offset-2 transition-colors whitespace-nowrap px-1 min-h-11"
                    data-testid="button-manage-cookie-preferences"
                  >
                    Manage Cookie Preferences
                  </button>

                  <div className="flex items-center gap-2 ml-auto md:ml-0">
                    <button
                      onClick={reject}
                      className="min-h-11 px-5 py-2 rounded text-base font-semibold bg-[#0a0a1a] border border-white/20 text-white hover:bg-white/10 transition-colors whitespace-nowrap"
                      data-testid="button-reject-all-cookies"
                    >
                      Reject All
                    </button>

                    <button
                      onClick={accept}
                      className="min-h-11 px-5 py-2 rounded text-base font-semibold bg-[#0a0a1a] border border-white/20 text-white hover:bg-white/10 transition-colors whitespace-nowrap"
                      data-testid="button-accept-all-cookies"
                    >
                      Accept All
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
