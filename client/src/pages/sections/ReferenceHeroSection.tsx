import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, ClipboardCheck, MapPin, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useBooking } from "@/contexts/BookingContext";
import { analytics } from "@/lib/analytics";
import { CTA } from "@/lib/ctaCopy";

const trustItems = [
  {
    icon: ShieldCheck,
    title: "Cybersecurity First",
    body: "Security and IT operate as one system.",
  },
  {
    icon: CheckCircle2,
    title: "Proactive IT",
    body: "Reduce issues before they interrupt work.",
  },
  {
    icon: ClipboardCheck,
    title: "Compliance Ready",
    body: "Controls and evidence aligned to your needs.",
  },
  {
    icon: MapPin,
    title: "Arizona Accountable",
    body: "Local, principal-led guidance and support.",
  },
];

function ShieldIllustration() {
  return (
    <div className="relative mx-auto w-full" style={{ aspectRatio: "1 / 1.05", maxWidth: 500 }} aria-hidden="true">
      <div className="absolute rounded-full border" style={{ inset: "7%", borderColor: "rgba(114,92,255,0.2)" }} />
      <div className="absolute rounded-full border" style={{ inset: "15%", borderColor: "rgba(211,18,106,0.15)" }} />
      <div
        className="absolute h-px bg-gradient-to-r from-transparent via-[#7b6cff]/50 to-transparent"
        style={{ left: "9%", top: "46%", width: "82%" }}
      />
      <div
        className="absolute w-px bg-gradient-to-b from-transparent via-[#7b6cff]/45 to-transparent"
        style={{ left: "49.8%", top: "10%", height: "78%" }}
      />
      <svg viewBox="0 0 420 460" className="relative h-full w-full overflow-visible">
        <defs>
          <linearGradient id="de-ref-shield" x1="70" y1="40" x2="350" y2="390" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fbfaf8" />
            <stop offset="0.38" stopColor="#9d90ff" />
            <stop offset="0.72" stopColor="#6f5cff" />
            <stop offset="1" stopColor="#d3126a" />
          </linearGradient>
          <radialGradient id="de-ref-glow" cx="0" cy="0" r="1" gradientTransform="translate(220 220) rotate(90) scale(185)">
            <stop stopColor="#6757ff" stopOpacity="0.22" />
            <stop offset="1" stopColor="#6757ff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="210" cy="220" r="185" fill="url(#de-ref-glow)" />
        <g fill="none" stroke="url(#de-ref-shield)" strokeLinecap="round" strokeLinejoin="round">
          <path d="M210 62 332 112v100c0 92-47 157-122 194C135 369 88 304 88 212V112L210 62Z" strokeWidth="2.4" />
          <path d="M210 86 309 127v85c0 75-37 129-99 162-62-33-99-87-99-162v-85l99-41Z" strokeWidth="1.1" opacity="0.55" />
          <path d="m152 223 38 39 79-88" strokeWidth="3" />
          <path d="M117 137 210 86l99 41M107 182l103-51 108 55M105 235l105-49 108 49M126 299l84-58 82 58M169 355l41-67 42 67" strokeWidth="0.65" opacity="0.3" />
        </g>
        {[107, 152, 210, 269, 309].map((cx, index) => (
          <circle key={cx} cx={cx} cy={[182, 223, 131, 174, 235][index]} r="3.2" fill={index === 4 ? "#d3126a" : "#8c7cff"} />
        ))}
      </svg>
    </div>
  );
}

export function ReferenceHeroSection(): JSX.Element {
  const { openBooking } = useBooking();
  const prefersReducedMotion = useReducedMotion();

  const openAssessment = () => {
    analytics.bookingOpened("hero-reference");
    openBooking("hero-reference");
  };

  return (
    <section id="home" className="relative overflow-hidden bg-[#050312] text-white scroll-mt-[var(--de-nav-offset)]">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(circle at 78% 36%, rgba(87,68,255,0.22), transparent 30%), radial-gradient(circle at 92% 68%, rgba(211,18,106,0.10), transparent 25%), linear-gradient(110deg, #050312 0%, #060617 52%, #090924 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 opacity-30"
        aria-hidden="true"
        style={{
          width: "58%",
          backgroundImage:
            "linear-gradient(rgba(123,108,255,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(123,108,255,0.14) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
          maskImage: "linear-gradient(to left, black, transparent)",
        }}
      />

      <div className="relative mx-auto grid min-h-[680px] max-w-[var(--de-canvas)] items-center gap-10 px-5 pb-14 pt-[calc(var(--de-nav-offset)+3rem)] sm:px-8 lg:grid-cols-[minmax(0,1.02fr)_minmax(420px,0.98fr)] lg:px-10 lg:pb-20 lg:pt-[calc(var(--de-nav-offset)+3.5rem)] xl:px-12">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.42, ease: "easeOut" }}
          className="relative z-10"
          style={{ maxWidth: 760 }}
        >
          <p className="mb-5 text-xs font-semibold uppercase text-[#a99cff] sm:text-sm" style={{ letterSpacing: "0.2em" }}>
            Arizona MSP · Cybersecurity &amp; Managed IT
          </p>
          <h1
            className="font-semibold text-[#fbfaf8]"
            style={{ maxWidth: 730, fontSize: "clamp(2.7rem,5.3vw,5.55rem)", lineHeight: 0.98, letterSpacing: "-0.055em" }}
          >
            Cybersecurity-First IT That Powers{" "}
            <span className="bg-gradient-to-r from-[#9a8bff] via-[#7b6cff] to-[#d3126a] bg-clip-text text-transparent">
              Your Business
            </span>
          </h1>
          <p className="mt-7 leading-7 text-white/72 sm:leading-8" style={{ maxWidth: 650, fontSize: 17 }}>
            Managed IT, cybersecurity, and compliance for Arizona businesses that cannot afford downtime, uncertainty, or fragmented technology ownership.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              type="button"
              onClick={openAssessment}
              size="lg"
              className="h-12 rounded-lg border-0 bg-gradient-to-r from-[#5f4ae8] to-[#7d5cf4] px-7 text-base font-semibold text-white hover:brightness-110"
              style={{ boxShadow: "0 14px 36px -18px rgba(111,92,255,0.9)" }}
              data-testid="button-hero-schedule"
            >
              {CTA.primary}
              <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-lg border border-white/20 bg-transparent px-7 text-base font-semibold text-white hover:border-white/40 hover:bg-white/5 hover:text-white"
              data-testid="button-hero-solutions"
            >
              <Link href="/solutions">View Our Solutions</Link>
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/58">
            <span>Assessment-led</span>
            <span aria-hidden="true">·</span>
            <span>Client-owned access</span>
            <span aria-hidden="true">·</span>
            <span>Fully managed or co-managed</span>
          </div>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.52, delay: prefersReducedMotion ? 0 : 0.08, ease: "easeOut" }}
          className="relative z-10 hidden lg:block"
        >
          <ShieldIllustration />
        </motion.div>
      </div>

      <div className="relative border-t border-black/10 bg-[#f7f5f2] text-[#17141f]">
        <div className="mx-auto max-w-[var(--de-canvas)] px-5 py-8 sm:px-8 lg:px-10 xl:px-12">
          <p className="mb-5 text-xl font-semibold sm:text-2xl" style={{ letterSpacing: "-0.02em" }}>
            Trusted technology partner for Arizona businesses
          </p>
          <div className="grid overflow-hidden rounded-xl border border-black/10 bg-white sm:grid-cols-2 lg:grid-cols-4">
            {trustItems.map(({ icon: Icon, title, body }, index) => (
              <div
                key={title}
                className={`flex gap-3 px-5 py-5 ${index > 0 ? "border-t border-black/10 sm:border-t-0 sm:border-l" : ""} ${index === 2 ? "sm:border-l-0 lg:border-l" : ""}`}
                style={{ minHeight: 128 }}
              >
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[#17141f]" strokeWidth={1.8} aria-hidden="true" />
                <div>
                  <h2 className="font-semibold" style={{ fontSize: 15 }}>{title}</h2>
                  <p className="mt-2 text-sm leading-6 text-[#5e5868]">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
