import { useState, useEffect, useCallback, useId, useRef } from "react";
import { analytics } from "@/lib/analytics";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, ArrowRight, Mail, CheckCircle2, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { apiRequest } from "@/lib/queryClient";
import { CTA } from "@/lib/ctaCopy";
import logoImage from "@assets/DE-Logo-new_1762461524794.webp";

const PUBLIC_EMAIL_DOMAINS = [
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "aol.com",
  "icloud.com",
];

const BENEFITS = [
  "Independent findings",
  "No switch required",
  "Arizona-based experts",
  "Practical next steps",
] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_DISPLAY = "325-480-9870";
const PHONE_HREF = "tel:+13254809870";

interface ExitIntentPopupProps {
  delay?: number;
}

function validateBusinessEmail(value: string): string | null {
  const email = value.trim();
  if (!email) return "Enter your business email.";
  if (!EMAIL_RE.test(email)) return "Enter a valid email address.";
  const domain = email.split("@")[1]?.toLowerCase();
  if (domain && PUBLIC_EMAIL_DOMAINS.includes(domain)) {
    return "Use your company email — personal inboxes aren’t accepted.";
  }
  return null;
}

export function ExitIntentPopup({ delay = 30000 }: ExitIntentPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [email, setEmail] = useState("");
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const titleId = useId();
  const descId = useId();
  const errorId = useId();
  const emailRef = useRef<HTMLInputElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

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
    try {
      if (new URLSearchParams(window.location.search).get("exit_intent") === "1") {
        analytics.exitIntentShown();
        setIsVisible(true);
        setHasShown(true);
      }
    } catch {
      /* ignore malformed URLs */
    }
  }, []);

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

  useEffect(() => {
    if (!isVisible) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => emailRef.current?.focus(), 50);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(t);
    };
  }, [isVisible]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    sessionStorage.setItem("exitPopupDismissed", "true");
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        "button:not([disabled]), input:not([disabled]), a[href]",
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isVisible, handleClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const nextError = validateBusinessEmail(email);
    if (nextError) {
      setFieldError(nextError);
      emailRef.current?.focus();
      return;
    }

    setFieldError(null);
    setIsSubmitting(true);

    try {
      await apiRequest("POST", "/api/newsletter", {
        email: email.trim(),
        source: "exit_intent_popup",
        website_url: "",
      });

      analytics.exitIntentConverted();
      setIsSuccess(true);

      window.setTimeout(() => {
        handleClose();
      }, 4000);
    } catch {
      setSubmitError("We couldn’t send that. Try again, or call us at 325-480-9870.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const motionProps = prefersReducedMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, scale: 0.98, y: 10 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.98, y: 10 },
        transition: { duration: 0.2, ease: "easeOut" as const },
      };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80"
            onClick={handleClose}
            data-testid="overlay-exit-intent"
          />

          <div className="pointer-events-none fixed inset-0 z-[101] flex items-center justify-center p-4">
            <motion.div
              {...motionProps}
              className="pointer-events-auto w-full max-w-[28rem]"
              data-testid="popup-exit-intent"
            >
              <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                aria-describedby={descId}
                className="relative overflow-hidden rounded-2xl border border-[var(--de-paper-hairline)] bg-[var(--de-paper-raised)] shadow-[0_28px_80px_rgba(0,0,0,0.55)]"
              >
                <div className="h-1 bg-[#D3126A]" aria-hidden="true" />

                <div className="flex items-center justify-between gap-3 bg-[#0a0a0a] px-4 py-3 md:px-5">
                  <img
                    src={logoImage}
                    alt="Digerati Experts"
                    className="h-8 w-auto md:h-9"
                    width={160}
                    height={36}
                  />
                  <button
                    ref={closeRef}
                    type="button"
                    onClick={handleClose}
                    className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-white/55 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D3126A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
                    aria-label="Close"
                    data-testid="button-close-exit-popup"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="px-5 pb-6 pt-5 md:px-7 md:pb-7 md:pt-6">
                  {!isSuccess ? (
                    <>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#D3126A]">
                        Cyber Risk Assessment
                      </p>
                      <h2
                        id={titleId}
                        className="mt-2 font-heading text-[1.5rem] font-semibold leading-[1.2] tracking-[-0.02em] text-[#1A1228] md:text-[1.65rem]"
                      >
                        Leave with a clear picture of your cyber risk.
                      </h2>
                      <p id={descId} className="mt-3 text-sm leading-relaxed text-black/60">
                        Drop your work email. We’ll send a short intro — independent findings you can
                        use with your current IT or with us.
                      </p>

                      <ul className="mt-5 grid grid-cols-1 gap-y-2 sm:grid-cols-2 sm:gap-x-6 text-[13px] leading-snug text-black/70">
                        {BENEFITS.map((item) => (
                          <li key={item} className="flex items-baseline gap-2.5">
                            <span className="mt-[0.55em] h-px w-2.5 shrink-0 bg-[#D3126A]" aria-hidden="true" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      <form onSubmit={handleSubmit} className="mt-5 space-y-3" noValidate>
                        <div>
                          <label htmlFor="exit-intent-email" className="sr-only">
                            Business email
                          </label>
                          <div className="relative">
                            <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-black/40" />
                            <Input
                              ref={emailRef}
                              id="exit-intent-email"
                              type="email"
                              autoComplete="email"
                              inputMode="email"
                              placeholder="Work email"
                              value={email}
                              aria-invalid={fieldError ? true : undefined}
                              aria-describedby={fieldError ? errorId : undefined}
                              onChange={(e) => {
                                setEmail(e.target.value);
                                if (fieldError) setFieldError(null);
                                if (submitError) setSubmitError(null);
                              }}
                              className="h-12 border-[var(--de-paper-hairline)] bg-[var(--de-paper)] pl-11 text-[15px] text-[#1A1228] placeholder:text-black/40 hover:border-black/25 focus-visible:border-[#D3126A] focus-visible:ring-[#D3126A]/40"
                              data-testid="input-exit-popup-email"
                            />
                          </div>
                          {fieldError ? (
                            <p id={errorId} role="alert" className="mt-2 text-sm text-rose-700">
                              {fieldError}
                            </p>
                          ) : null}
                          {submitError ? (
                            <p role="alert" className="mt-2 text-sm text-rose-700">
                              {submitError}
                            </p>
                          ) : null}
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#D3126A] text-[15px] font-semibold text-white transition-colors hover:bg-[#f0187a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D3126A] focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:opacity-60"
                          data-testid="button-get-checklist"
                        >
                          {isSubmitting ? (
                            "Sending…"
                          ) : (
                            <>
                              {CTA.primary}
                              <ArrowRight className="h-4 w-4" />
                            </>
                          )}
                        </button>
                      </form>

                      <p className="mt-4 text-sm text-black/50">
                        Prefer to call?{" "}
                        <a
                          href={PHONE_HREF}
                          className="font-medium text-[#1A1228] underline-offset-2 hover:text-[#D3126A] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D3126A]"
                        >
                          <Phone className="mr-1 inline h-3.5 w-3.5 align-[-2px]" aria-hidden="true" />
                          {PHONE_DISPLAY}
                        </a>
                      </p>

                      <p className="mt-2 text-xs leading-relaxed text-black/40">
                        No spam. We only use this to follow up on the assessment.
                      </p>
                    </>
                  ) : (
                    <div className="py-2">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
                        <div>
                          <h2 className="font-heading text-xl font-semibold tracking-[-0.02em] text-[#1A1228]">
                            You’re on the list
                          </h2>
                          <p className="mt-2 text-sm leading-relaxed text-black/60">
                            We’ll follow up with assessment next steps — no spam.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
