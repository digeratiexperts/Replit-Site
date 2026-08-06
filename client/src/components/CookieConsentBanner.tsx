import { useState, useEffect } from "react";
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

  useEffect(() => {
    if (!hasStoredConsent()) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    saveConsent({ analytics: true, marketing: true });
    setVisible(false);
    setShowPreferences(false);
  };

  const reject = () => {
    saveConsent({ analytics: false, marketing: false });
    setVisible(false);
    setShowPreferences(false);
  };

  const savePreferences = () => {
    saveConsent({ analytics: analyticsEnabled, marketing: marketingEnabled });
    setVisible(false);
    setShowPreferences(false);
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
              className="fixed bottom-[88px] left-4 right-4 md:left-auto md:right-6 md:w-[420px] z-[9995] rounded-2xl border border-violet-500/30 bg-[#0d0d1a] shadow-2xl shadow-black/50 p-6"
              data-testid="cookie-preferences-panel"
            >
              <h3 className="text-white font-semibold text-lg mb-1 font-['Space_Grotesk']">Cookie Preferences</h3>
              <p className="text-gray-400 text-sm mb-5 leading-relaxed">
                Choose which cookies you allow. Strictly necessary cookies are always enabled.
              </p>

              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4 p-3 rounded-xl bg-white/5 border border-white/10">
                  <div>
                    <p className="text-white text-sm font-medium">Strictly Necessary</p>
                    <p className="text-gray-500 text-xs mt-0.5">Required for the site to function.</p>
                  </div>
                  <span className="text-emerald-400 text-xs font-semibold mt-1 whitespace-nowrap">Always On</span>
                </div>

                <label className="flex items-start justify-between gap-4 p-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer">
                  <div>
                    <p className="text-white text-sm font-medium">Analytics Cookies</p>
                    <p className="text-gray-500 text-xs mt-0.5">Help us understand how visitors interact with the site.</p>
                  </div>
                  <div
                    role="switch"
                    aria-checked={analyticsEnabled}
                    onClick={() => setAnalyticsEnabled(v => !v)}
                    className={`relative mt-1 w-10 h-5 rounded-full flex-shrink-0 cursor-pointer transition-colors ${analyticsEnabled ? "bg-violet-500" : "bg-white/20"}`}
                    data-testid="toggle-analytics"
                  >
                    <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${analyticsEnabled ? "translate-x-5" : "translate-x-0"}`} />
                  </div>
                </label>

                <label className="flex items-start justify-between gap-4 p-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer">
                  <div>
                    <p className="text-white text-sm font-medium">Marketing Cookies</p>
                    <p className="text-gray-500 text-xs mt-0.5">Used to deliver relevant ads and track campaign effectiveness.</p>
                  </div>
                  <div
                    role="switch"
                    aria-checked={marketingEnabled}
                    onClick={() => setMarketingEnabled(v => !v)}
                    className={`relative mt-1 w-10 h-5 rounded-full flex-shrink-0 cursor-pointer transition-colors ${marketingEnabled ? "bg-violet-500" : "bg-white/20"}`}
                    data-testid="toggle-marketing"
                  >
                    <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${marketingEnabled ? "translate-x-5" : "translate-x-0"}`} />
                  </div>
                </label>
              </div>

              <div className="flex gap-3 mt-5">
                <button
                  onClick={savePreferences}
                  className="flex-1 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
                  data-testid="button-save-preferences"
                >
                  Save Preferences
                </button>
                <button
                  onClick={() => setShowPreferences(false)}
                  className="px-4 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
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
            className="fixed bottom-0 left-0 right-0 z-[9991]"
            data-testid="cookie-consent-banner"
          >
            <div
              className="relative overflow-hidden"
              style={{
                background: "linear-gradient(90deg, #1e0a4a 0%, #2d1060 30%, #3b1578 60%, #2a0d6b 100%)",
                borderTop: "1px solid rgba(139,92,246,0.3)",
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.04]"
                style={{
                  backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
                  backgroundSize: "32px 32px",
                }}
              />

              <div className="relative z-10 max-w-screen-2xl mx-auto px-4 md:px-8 py-4 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
                <p className="text-gray-200 text-xs leading-relaxed flex-1 min-w-0">
                  Digerati Experts uses cookies and similar tracking technologies to collect information you provide and to capture your interaction with our site. We use this information to enhance site navigation, personalize content, analyze your use of our website, and assist in our marketing efforts and customer service. To deliver the best experience, analytics and hosting service providers may have access to this information. By clicking "Accept All," you consent to our collection, use, and disclosure of such information. For more information about our data processing practices, please see our{" "}
                  <Link
                    href="/legal/privacy-policy"
                    className="underline underline-offset-2 text-violet-300 hover:text-white transition-colors font-medium"
                    data-testid="link-privacy-policy-cookie"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>

                <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
                  <button
                    onClick={() => setShowPreferences(v => !v)}
                    className="text-violet-300 hover:text-white text-sm font-semibold underline underline-offset-2 transition-colors whitespace-nowrap px-1"
                    data-testid="button-manage-cookie-preferences"
                  >
                    Manage Cookie Preferences
                  </button>

                  <button
                    onClick={reject}
                    className="px-5 py-2 rounded text-sm font-semibold bg-[#0a0a1a] border border-white/20 text-white hover:bg-white/10 transition-colors whitespace-nowrap"
                    data-testid="button-reject-all-cookies"
                  >
                    Reject All
                  </button>

                  <button
                    onClick={accept}
                    className="px-5 py-2 rounded text-sm font-semibold bg-[#0a0a1a] border border-white/20 text-white hover:bg-white/10 transition-colors whitespace-nowrap"
                    data-testid="button-accept-all-cookies"
                  >
                    Accept All
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
