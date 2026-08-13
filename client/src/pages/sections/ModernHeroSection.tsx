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

  const y = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 20]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? ["0%", "0%"] : ["0%", "8%"]);

  const features = [
    { icon: FileCheck, text: "Insurance & Compliance Ready" },
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
        <motion.img
          src={heroBgImage}
          alt=""
          loading="eager"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-[center_78%] opacity-[0.34]"
          style={{
            y: backgroundY,
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, transparent 32%, rgba(0,0,0,0.45) 58%, black 82%)",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, transparent 32%, rgba(0,0,0,0.45) 58%, black 82%)",
          }}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-[#050312] via-[#050312]/82 to-[#050312]/92">
        <div
          className="absolute top-[18%] left-0 w-[420px] h-[420px] pointer-events-none opacity-60"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(circle at 0% 40%, rgba(236, 72, 153, 0.08) 0%, transparent 62%)",
          }}
        />
        <div
          className="absolute top-[8%] right-[-4%] w-[640px] h-[640px] pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(circle at 70% 35%, rgba(236, 72, 153, 0.20) 0%, rgba(139, 92, 246, 0.14) 38%, transparent 64%)",
          }}
        />
      </div>

      <motion.div
        className="relative z-10 flex flex-1 w-full items-center px-5 sm:px-8 lg:px-12 xl:px-16 pt-[calc(var(--de-nav-offset)+1.25rem)] pb-16 sm:pt-[calc(var(--de-nav-offset)+1.75rem)] sm:pb-20 lg:pt-[calc(var(--de-nav-offset)+2.25rem)] lg:pb-24"
        style={{ y }}
      >
        <div className="mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">
            <motion.div
              className="flex flex-col gap-6 sm:gap-7 w-full"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.4, ease: "easeOut" }}
            >
              <motion.p
                className="text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-pink-300/95"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.3, delay: prefersReducedMotion ? 0 : 0.05 }}
              >
                Arizona MSP · Cybersecurity &amp; Managed IT
              </motion.p>

              <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-[4.35rem] font-bold leading-[1.05] tracking-[-0.03em] text-white">
                Your Arizona business,
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-300 via-pink-400 to-violet-300">
                  protected 24/7.
                </span>
              </h1>

              <p className="text-base md:text-lg text-white/85 leading-relaxed max-w-xl">
                Cybersecurity and managed IT for growing businesses—reducing risk, supporting
                compliance, and keeping your team productive without building an internal IT
                department.
              </p>

              <div className="grid grid-cols-1 xs:grid-cols-2 gap-x-5 gap-y-2 sm:flex sm:flex-wrap sm:gap-x-6 sm:gap-y-2.5">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.text}
                    className="flex items-center gap-2"
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: prefersReducedMotion ? 0 : 0.28,
                      delay: prefersReducedMotion ? 0 : 0.1 + index * 0.03,
                    }}
                  >
                    <feature.icon className="h-3.5 w-3.5 text-pink-400/90 flex-shrink-0" aria-hidden="true" />
                    <span className="text-xs sm:text-sm text-white/70">{feature.text}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-1 flex flex-col items-start gap-4" id="assessment-cta">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <Button
                    type="button"
                    size="lg"
                    data-testid="button-hero-schedule"
                    onClick={handleSchedule}
                    className="h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg font-semibold bg-gradient-to-r from-fuchsia-600 via-pink-600 to-rose-500 hover:from-fuchsia-500 hover:via-pink-500 hover:to-rose-400 text-white border border-pink-300/35 shadow-lg shadow-pink-500/40 hover:shadow-xl hover:shadow-pink-500/50 transition-all duration-300"
                  >
                    {CTA.primary}
                    <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
                  </Button>
                  <Button
                    type="button"
                    size="lg"
                    asChild
                    data-testid="button-hero-pricing"
                    className="h-12 sm:h-14 px-6 sm:px-7 text-base sm:text-lg font-semibold bg-transparent text-white border border-white/35 hover:bg-white/5 hover:border-white/55 shadow-none"
                  >
                    <Link href={CTA.secondaryHref}>{CTA.secondary}</Link>
                  </Button>
                </div>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-white/75">
                  <span className="inline-flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                    No obligation
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                    Response within one business day
                  </span>
                </div>

                <p className="text-sm text-white/55 max-w-xl leading-relaxed">
                  Arizona-based · Principal-led · Recommendations sized to your business
                  <span className="mx-2 text-white/25" aria-hidden="true">
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
                className="relative w-full max-w-[520px] xl:max-w-[560px]"
                initial={prefersReducedMotion ? false : { opacity: 0, x: 22 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.5,
                  delay: prefersReducedMotion ? 0 : 0.12,
                  ease: "easeOut",
                }}
              >
                <motion.div
                  className="absolute -inset-8 -z-10 rounded-[2.5rem] pointer-events-none"
                  aria-hidden="true"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(236, 72, 153, 0.32) 0%, rgba(139, 92, 246, 0.18) 42%, transparent 72%)",
                  }}
                  animate={
                    prefersReducedMotion
                      ? undefined
                      : { opacity: [0.55, 0.85, 0.55], scale: [1, 1.03, 1] }
                  }
                  transition={
                    prefersReducedMotion
                      ? undefined
                      : { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
                  }
                />
                <div className="relative rounded-2xl overflow-hidden border border-white/12 shadow-2xl shadow-violet-950/50">
                  <DashboardMockup className="w-full" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#050312] via-[#050312]/80 to-transparent z-10 pointer-events-none" />
    </section>
  );
};
