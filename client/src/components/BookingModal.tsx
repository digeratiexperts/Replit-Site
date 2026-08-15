import { useEffect, useId, useRef } from "react";
import { X, ExternalLink, Clock, Shield, CheckCircle } from "lucide-react";
import { useBooking } from "@/contexts/BookingContext";
import { ZohoBookingWidget } from "@/components/ZohoBookingWidget";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import logoImage from "@assets/DE-Logo-new_1762461524794.webp";

const STEPS = [
  {
    icon: Clock,
    title: "30-minute call",
    body: "A focused look at what you run today — not a product pitch.",
  },
  {
    icon: Shield,
    title: "Environment first",
    body: "Identity, email, endpoints, and backups before any package talk.",
  },
  {
    icon: CheckCircle,
    title: "Clear next step",
    body: "What to fix first — with your current IT or with us.",
  },
] as const;

export function BookingModal() {
  const { isOpen, closeBooking } = useBooking();
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descId = useId();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => closeRef.current?.focus(), 50);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(t);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeBooking();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        "button:not([disabled]), a[href], iframe",
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
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, closeBooking]);

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
      {isOpen && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6"
          onClick={(e) => {
            if (e.target === overlayRef.current) closeBooking();
          }}
          data-testid="booking-modal-overlay"
        >
          <div className="absolute inset-0 bg-black/80" />

          <motion.div
            {...motionProps}
            className="relative flex max-h-[min(92vh,52rem)] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-de-hairline bg-[#050312] shadow-[0_28px_80px_rgba(0,0,0,0.55)]"
            data-testid="booking-modal"
          >
            <div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              aria-describedby={descId}
              className="flex min-h-0 flex-1 flex-col overflow-hidden"
            >
              <div className="h-1 shrink-0 bg-[#D3126A]" aria-hidden="true" />

              <div className="flex shrink-0 items-center justify-between gap-3 bg-[#0a0a0a] px-4 py-3 md:px-5">
                <img
                  src={logoImage}
                  alt="Digerati Experts"
                  className="h-8 w-auto md:h-9"
                  width={160}
                  height={36}
                />
                <div className="flex items-center gap-1">
                  <a
                    href="/book"
                    onClick={closeBooking}
                    className="inline-flex min-h-11 items-center gap-1.5 px-2 text-sm font-semibold text-white/70 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D3126A]"
                    data-testid="link-open-booking-page"
                  >
                    Full page
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                  <button
                    ref={closeRef}
                    type="button"
                    onClick={closeBooking}
                    className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-white/55 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D3126A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
                    aria-label="Close"
                    data-testid="button-close-booking"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="grid min-h-0 flex-1 overflow-y-auto lg:grid-cols-[minmax(17rem,0.9fr)_minmax(0,1.15fr)]">
                <aside className="border-b border-de-hairline bg-de-raised px-5 py-6 md:px-7 md:py-8 lg:border-b-0 lg:border-r">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#D3126A]">
                    Cyber Risk Assessment
                  </p>
                  <h2
                    id={titleId}
                    className="mt-2 font-heading text-[1.45rem] font-semibold leading-[1.2] tracking-[-0.02em] text-white md:text-[1.7rem]"
                  >
                    Pick a time. We look at the environment first.
                  </h2>
                  <p id={descId} className="mt-3 text-base font-medium leading-relaxed text-white/80">
                    No package until we see how you actually operate. Arizona-based, principal-led.
                  </p>

                  <ul className="mt-6 space-y-4">
                    {STEPS.map((step) => (
                      <li key={step.title} className="flex gap-3">
                        <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-de-hairline bg-[#0a0a0a]">
                          <step.icon className="h-4 w-4 text-[#D3126A]" aria-hidden="true" />
                        </span>
                        <span>
                          <span className="block text-[15px] font-semibold text-white">{step.title}</span>
                          <span className="mt-0.5 block text-sm font-medium leading-relaxed text-white/70">
                            {step.body}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </aside>

                <div className="min-h-[22rem] bg-[#050312] p-4 md:p-6">
                  <ZohoBookingWidget instanceId="modal" className="h-full min-h-[22rem]" height="520px" />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
