import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Link } from "wouter";
import { analytics } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Building, FileCheck, Shield, Check } from "lucide-react";
import { DashboardMockup } from "@/components/graphics";
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
  const backgroundY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? ["0%", "0%"] : ["0%", "10%"]);
  const floatingY1 = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : -36]);
  const floatingY2 = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : -24]);
  const floatingY3 = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : -14]);

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
      className="relative flex min-h-[100svh] lg:min-h-screen flex-col overflow-hidden"
      style={{ position: "relative" }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          src={heroBgImage}
          alt=""
          loading="eager"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover opacity-[0.38]"
          style={{ transform: "scale(1.05)", transformOrigin: "center center" }}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/70 to-[#050312]/95">
        <motion.div
          className="absolute top-0 right-0 w-[560px] h-[560px] pointer-events-none"
          data-testid="hero-parallax-orb-1"
          style={{
            y: backgroundY,
            background:
              "radial-gradient(circle at 100% 0%, rgba(236, 72, 153, 0.12) 0%, rgba(139, 92, 246, 0.08) 42%, transparent 58%)",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[420px] h-[420px] pointer-events-none"
          data-testid="hero-parallax-orb-2"
          style={{
            y: floatingY3,
            background:
              "radial-gradient(circle at 0% 100%, rgba(217, 70, 239, 0.08) 0%, rgba(244, 63, 94, 0.05) 45%, transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{
            backgroundImage: "radial-gradient(circle at center, rgba(255,255,255,0.9) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
          aria-hidden="true"
        />
      </div>

      <motion.div
        className="absolute top-28 right-16 w-3 h-3 rounded-full bg-violet-500/25 pointer-events-none hidden xl:block"
        style={{ y: floatingY1 }}
        data-testid="hero-floating-element-1"
      />
      <motion.div
        className="absolute top-40 right-36 w-2 h-2 rounded-full bg-purple-400/35 pointer-events-none hidden xl:block"
        style={{ y: floatingY2 }}
        data-testid="hero-floating-element-2"
      />
      <motion.div
        className="absolute bottom-36 left-16 w-2.5 h-2.5 rounded-full bg-fuchsia-500/25 pointer-events-none hidden xl:block"
        style={{ y: floatingY3 }}
        data-testid="hero-floating-element-3"
      />

      {/* pb clears sticky section dock so hero features aren't clipped */}
      <motion.div
        className="relative z-10 flex flex-1 w-full items-center px-3 sm:px-4 lg:px-6 xl:px-8 pt-[calc(var(--de-nav-offset)+0.35rem)] pb-28 sm:pt-[calc(var(--de-nav-offset)+0.75rem)] sm:pb-28 lg:pt-[calc(var(--de-nav-offset)+1rem)] lg:pb-32 xl:pt-[calc(var(--de-nav-offset)+1.25rem)]"
        style={{ y }}
      >
        <div className="mx-auto w-full max-w-[100rem]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 xl:gap-12 items-center">
            <motion.div
              className="flex flex-col gap-3.5 sm:gap-4 w-full"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.4, ease: "easeOut" }}
            >
              <motion.p
                className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-pink-300/95"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.3, delay: prefersReducedMotion ? 0 : 0.05 }}
              >
                Arizona MSP · Cybersecurity &amp; Managed IT
              </motion.p>

              <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-[3.25rem] font-bold leading-[1.08] tracking-[-0.02em] text-white">
                Your Arizona business,{" "}
                <span className="text-[#FF6B9D]">protected 24/7.</span>
              </h1>

              <p className="text-base md:text-lg text-white/85 leading-relaxed max-w-xl">
                Cybersecurity and managed IT for growing businesses—reducing risk, supporting
                compliance, and keeping your team productive without building an internal IT
                department.
              </p>

              <div className="grid grid-cols-1 xs:grid-cols-2 gap-x-4 gap-y-1.5 sm:flex sm:flex-wrap sm:gap-x-5 sm:gap-y-2">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.text}
                    className="flex items-center gap-1.5 sm:gap-2"
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: prefersReducedMotion ? 0 : 0.28,
                      delay: prefersReducedMotion ? 0 : 0.1 + index * 0.03,
                    }}
                  >
                    <feature.icon className="h-4 w-4 text-pink-400 flex-shrink-0" aria-hidden="true" />
                    <span className="text-sm sm:text-base text-white/85">{feature.text}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-0.5 flex flex-col items-start gap-2.5 sm:gap-3" id="assessment-cta">
                <div className="flex w-full flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center">
                  <Button
                    type="button"
                    size="lg"
                    data-testid="button-hero-schedule"
                    onClick={handleSchedule}
                    className="h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg font-semibold bg-gradient-to-r from-fuchsia-600 via-pink-600 to-rose-500 hover:from-fuchsia-500 hover:via-pink-500 hover:to-rose-400 text-white border border-pink-300/30 shadow-lg shadow-pink-500/25 hover:shadow-xl hover:shadow-pink-500/35 transition-all duration-300"
                  >
                    {CTA.primary}
                    <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
                  </Button>
                  <Button
                    asChild
                    type="button"
                    size="lg"
                    variant="outline"
                    data-testid="button-hero-pricing"
                    className="h-12 sm:h-14 px-6 sm:px-7 text-base font-semibold border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                  >
                    <Link href={CTA.secondaryHref}>{CTA.secondary}</Link>
                  </Button>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-white/75">
                  <span className="inline-flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                    No obligation
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                    Response within one business day
                  </span>
                </div>

                <p className="text-sm text-white/75 max-w-xl leading-relaxed">
                  Start with a practical review of your identity, endpoints, email, backups, and
                  security posture.
                </p>

                <p className="text-sm sm:text-base text-white/75">
                  Arizona-based · Principal-led · Recommendations sized to your business
                  <span className="mx-2 text-white/35" aria-hidden="true">
                    ·
                  </span>
                  Or call{" "}
                  <a
                    href="tel:480-519-5892"
                    className="text-pink-300 hover:text-pink-200 font-medium underline underline-offset-4 decoration-pink-400/40 hover:decoration-pink-300/70 transition-colors"
                    data-testid="link-hero-phone"
                  >
                    480-519-5892
                  </a>
                </p>
              </div>
            </motion.div>

            <div className="hidden lg:flex relative justify-end w-full">
              <motion.div
                className="relative w-full max-w-[440px] xl:max-w-[480px]"
                initial={prefersReducedMotion ? false : { opacity: 0, x: 22, rotateY: -4 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.5,
                  delay: prefersReducedMotion ? 0 : 0.12,
                  ease: "easeOut",
                }}
                style={{ perspective: 1200 }}
              >
                <motion.div
                  className="absolute -inset-4 -z-10 rounded-[2rem] pointer-events-none"
                  aria-hidden="true"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(236, 72, 153, 0.12) 0%, rgba(139, 92, 246, 0.08) 45%, transparent 70%)",
                  }}
                  animate={
                    prefersReducedMotion
                      ? undefined
                      : { opacity: [0.22, 0.34, 0.22], scale: [1, 1.015, 1] }
                  }
                  transition={
                    prefersReducedMotion
                      ? undefined
                      : { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
                  }
                />
                <div
                  className="relative rounded-2xl overflow-hidden border border-white/12 shadow-2xl shadow-violet-950/50"
                  style={{
                    transform: prefersReducedMotion
                      ? undefined
                      : "perspective(1200px) rotateX(1.5deg) rotateY(-1.5deg)",
                  }}
                >
                  <DashboardMockup className="w-full" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#050312] via-[#050312]/75 to-transparent z-10 pointer-events-none" />
    </section>
  );
};
