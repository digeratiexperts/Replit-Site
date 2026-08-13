import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Link } from "wouter";
import { analytics } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Building, FileCheck, Shield, Check } from "lucide-react";
import { DashboardMockup } from "@/components/graphics";
import { Container } from "@/components/layout";
import heroBgImage from "@assets/de-hero-arizona-dusk.png";
import { useBooking } from "@/contexts/BookingContext";
import { CTA } from "@/lib/ctaCopy";

export const ModernHeroSection = (): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { openBooking } = useBooking();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 28]);

  const features = [
    { icon: FileCheck, text: "Insurance & Compliance-Ready" },
    { icon: Shield, text: "24/7 Human-Led Monitoring" },
    { icon: Building, text: "Built for Small Businesses" },
    { icon: CheckCircle, text: "Easy-to-Read Risk Reports" },
  ];

  const handleSchedule = () => {
    analytics.bookingOpened("hero");
    openBooking("hero");
  };

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative flex min-h-[100svh] flex-col overflow-hidden lg:min-h-screen"
      style={{ position: "relative" }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <img
          src={heroBgImage}
          alt=""
          loading="eager"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-[center_35%] opacity-[0.52]"
          style={{ transform: "scale(1.04)", transformOrigin: "center center" }}
        />
      </div>

      {/* Directional scrim — keeps Arizona dusk readable as depth, not mud */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(105deg, rgba(5,3,18,0.92) 0%, rgba(5,3,18,0.78) 42%, rgba(5,3,18,0.55) 68%, rgba(5,3,18,0.72) 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 65% 50% at 18% 45%, rgba(91, 69, 224, 0.14) 0%, transparent 60%), radial-gradient(ellipse 45% 40% at 85% 30%, rgba(211, 18, 106, 0.10) 0%, transparent 55%)",
        }}
      />

      <motion.div
        className="relative z-10 flex w-full flex-1 items-center pb-14 pt-[calc(var(--de-nav-offset)+0.5rem)] sm:pb-16 sm:pt-[calc(var(--de-nav-offset)+0.85rem)] lg:pb-20 lg:pt-[calc(var(--de-nav-offset)+1.1rem)]"
        style={{ y }}
      >
        <Container width="content" className="w-full">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-12">
            <motion.div
              className="flex w-full flex-col gap-4 lg:col-span-6 xl:col-span-6"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.4, ease: "easeOut" }}
            >
              <p className="de-eyebrow">Arizona MSP · Cybersecurity &amp; Managed IT</p>

              <h1 className="de-display text-white">
                Your Arizona business,{" "}
                <span className="relative inline-block text-white">
                  protected 24/7
                  <span
                    className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-[#D3126A]/85"
                    aria-hidden="true"
                  />
                </span>
                .
              </h1>

              <p className="de-lead max-w-[var(--de-w-prose)] text-white/85">
                Cybersecurity and managed IT for growing businesses—reducing risk, supporting
                compliance, and keeping your team productive without building an internal IT
                department.
              </p>

              <ul className="flex flex-wrap gap-x-5 gap-y-2 border-y border-white/10 py-3">
                {features.map((feature) => (
                  <li key={feature.text} className="flex items-center gap-1.5">
                    <feature.icon className="h-4 w-4 flex-shrink-0 text-pink-400" aria-hidden="true" />
                    <span className="text-sm text-white/85 sm:text-[0.95rem]">{feature.text}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col items-start gap-3" id="assessment-cta">
                <div className="flex w-full flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center">
                  <Button
                    type="button"
                    size="xl"
                    variant="cta"
                    data-testid="button-hero-schedule"
                    onClick={handleSchedule}
                    className="rounded-xl font-semibold"
                  >
                    {CTA.primary}
                    <ArrowRight className="ml-1 h-5 w-5" aria-hidden="true" />
                  </Button>
                  <Button
                    asChild
                    type="button"
                    size="xl"
                    variant="outline"
                    data-testid="button-hero-pricing"
                    className="rounded-xl border-white/25 bg-white/5 font-semibold text-white hover:bg-white/10 hover:text-white"
                  >
                    <Link href={CTA.secondaryHref}>{CTA.secondary}</Link>
                  </Button>
                </div>

                <p className="max-w-xl text-sm leading-relaxed text-white/70">
                  <span className="inline-flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
                    No obligation
                  </span>
                  <span className="mx-2 text-white/30" aria-hidden="true">
                    ·
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
                    Response within one business day
                  </span>
                  <span className="mx-2 text-white/30" aria-hidden="true">
                    ·
                  </span>
                  Arizona-based · Principal-led ·{" "}
                  <a
                    href="tel:480-519-5892"
                    className="font-medium text-pink-300 underline decoration-pink-400/40 underline-offset-4 transition-colors hover:text-pink-200 hover:decoration-pink-300/70"
                    data-testid="link-hero-phone"
                  >
                    480-519-5892
                  </a>
                </p>

                <p className="max-w-xl text-sm leading-relaxed text-white/60">
                  Start with a practical review of your identity, endpoints, email, backups, and
                  security posture.
                </p>
              </div>
            </motion.div>

            <div className="relative flex w-full justify-center md:justify-end lg:col-span-6">
              <motion.div
                className="relative w-full max-w-[420px] md:max-w-[460px] xl:max-w-[520px]"
                initial={prefersReducedMotion ? false : { opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.5,
                  delay: prefersReducedMotion ? 0 : 0.1,
                  ease: "easeOut",
                }}
              >
                <div
                  className="relative"
                  style={{
                    transform: prefersReducedMotion
                      ? undefined
                      : "perspective(1200px) rotateX(1.25deg) rotateY(-1.25deg)",
                  }}
                >
                  <DashboardMockup className="w-full" />
                </div>
              </motion.div>
            </div>
          </div>
        </Container>
      </motion.div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-24 bg-gradient-to-t from-[#050312] via-[#050312]/75 to-transparent" />
    </section>
  );
};
