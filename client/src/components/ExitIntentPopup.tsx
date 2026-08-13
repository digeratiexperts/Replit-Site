import { useState, useEffect, useCallback, useId, useRef } from "react";
import { analytics } from "@/lib/analytics";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, ArrowRight, Mail, Check, CheckCircle2, Phone, ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiRequest } from "@/lib/queryClient";
import { CTA } from "@/lib/ctaCopy";
import { IconWell } from "@/components/visual/IconWell";

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
const PHONE_DISPLAY = "480-519-5892";
const PHONE_HREF = "tel:480-519-5892";

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
    const t = window.setTimeout(() => emailRef.current?.focus(), 50);
    return () => window.clearTimeout(t);
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
        'button:not([disabled]), input:not([disabled]), a[href]',
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
      setSubmitError("We couldn’t send that. Try again, or call us at 480-519-5892.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const motionProps = prefersReducedMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, scale: 0.96, y: 12 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.96, y: 12 },
        transition: { duration: 0.22, ease: "easeOut" as const },
      };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/70"
            onClick={handleClose}
            data-testid="overlay-exit-intent"
          />

          <div className="pointer-events-none fixed inset-0 z-[101] flex items-center justify-center p-4">
            <motion.div
              {...motionProps}
              className="pointer-events-auto w-full max-w-lg"
              data-testid="popup-exit-intent"
            >
              <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                aria-describedby={descId}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
              >
                <div
                  className="h-px bg-gradient-to-r from-transparent via-[#D3126A]/80 to-transparent"
                  aria-hidden="true"
                />

                <button
                  ref={closeRef}
                  type="button"
                  onClick={handleClose}
                  className="absolute right-2 top-2 z-10 inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-white/55 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
                  aria-label="Close"
                  data-testid="button-close-exit-popup"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="px-5 pb-6 pt-7 md:px-7 md:pb-7 md:pt-8">
                  {!isSuccess ? (
                    <>
                      <div className="mb-5 flex justify-center">
                        <IconWell icon={ClipboardCheck} size="md" surface="dark" />
                      </div>

                      <div className="mb-5 text-center">
                        <h2
                          id={titleId}
                          className="font-heading text-[1.65rem] font-semibold leading-tight tracking-[-0.02em] text-white md:text-[1.75rem]"
                        >
                          Wait! Don&apos;t Leave Unprotected
                        </h2>
                        <p id={descId} className="mt-3 text-sm leading-relaxed text-white/70">
                          Leave your business email for a{" "}
                          <span className="font-semibold text-[#A78BFA]">
                            free cyber risk assessment intro
                          </span>{" "}
                          — an independent look at gaps, with a plan you can run with your current IT
                          or with us.
                        </p>
                      </div>

                      <ul className="mb-5 grid grid-cols-2 gap-x-3 gap-y-2.5">
                        {BENEFITS.map((item) => (
                          <li
                            key={item}
                            className="flex items-center gap-2.5 text-sm text-white/75"
                          >
                            <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-white/10 bg-violet-500/15">
                              <Check className="h-3.5 w-3.5 text-[#A78BFA]" aria-hidden="true" />
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      <form onSubmit={handleSubmit} className="space-y-3" noValidate>
                        <div>
                          <label htmlFor="exit-intent-email" className="sr-only">
                            Business email
                          </label>
                          <div className="relative">
                            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                            <Input
                              ref={emailRef}
                              id="exit-intent-email"
                              type="email"
                              autoComplete="email"
                              inputMode="email"
                              placeholder="Enter your business email"
                              value={email}
                              aria-invalid={fieldError ? true : undefined}
                              aria-describedby={fieldError ? errorId : undefined}
                              onChange={(e) => {
                                setEmail(e.target.value);
                                if (fieldError) setFieldError(null);
                                if (submitError) setSubmitError(null);
                              }}
                              className="h-11 border-white/15 bg-[#151217] pl-10 text-white placeholder:text-white/40 hover:border-white/25 focus-visible:border-pink-400 focus-visible:ring-pink-400/50"
                              data-testid="input-exit-popup-email"
                            />
                          </div>
                          {fieldError ? (
                            <p id={errorId} role="alert" className="mt-2 text-sm text-rose-300">
                              {fieldError}
                            </p>
                          ) : null}
                          {submitError ? (
                            <p role="alert" className="mt-2 text-sm text-rose-300">
                              {submitError}
                            </p>
                          ) : null}
                        </div>

                        <Button
                          type="submit"
                          variant="brand"
                          disabled={isSubmitting}
                          className="h-11 w-full font-semibold"
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
                        </Button>
                      </form>

                      <p className="mt-4 text-center text-sm text-white/50">
                        Prefer to call?{" "}
                        <a
                          href={PHONE_HREF}
                          className="inline-flex items-center gap-1 font-medium text-white/80 underline-offset-2 hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
                        >
                          <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                          {PHONE_DISPLAY}
                        </a>
                      </p>

                      <p className="mt-3 text-center text-xs leading-relaxed text-white/40">
                        No spam. Unsubscribe anytime. We respect your privacy.
                      </p>
                    </>
                  ) : (
                    <div className="py-6 text-center">
                      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-500/10">
                        <CheckCircle2 className="h-6 w-6 text-emerald-400" aria-hidden="true" />
                      </div>
                      <h2 className="font-heading text-xl font-semibold tracking-[-0.02em] text-white">
                        You&apos;re on the list
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed text-white/70">
                        We&apos;ll follow up with assessment next steps — no spam.
                      </p>
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
