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
      className="relative flex min-h-0 lg:min-h-screen flex-col overflow-hidden"
      style={{ position: "relative" }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.img
          src={heroBgImage}
          alt=""
          loading="eager"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-[center_82%]"
          style={{
            y: backgroundY,
            opacity: 0.46,
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.38) 16%, rgba(0,0,0,0.88) 46%, black 72%)",
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.38) 16%, rgba(0,0,0,0.88) 46%, black 72%)",
          }}
        />
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(90deg, rgba(5,3,18,0.92) 0%, rgba(5,3,18,0.70) 26%, rgba(5,3,18,0.22) 56%, rgba(5,3,18,0.06) 100%), linear-gradient(180deg, rgba(5,3,18,0.72) 0%, rgba(5,3,18,0.28) 34%, rgba(5,3,18,0.08) 62%, rgba(5,3,18,0.38) 100%)",
        }}
      >
        <div
          className="absolute top-[8%] right-[-4%] w-[640px] h-[640px] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 70% 35%, rgba(236, 72, 153, 0.20) 0%, rgba(139, 92, 246, 0.14) 38%, transparent 64%)",
          }}
        />
      </div>

      <motion.div
        className="relative z-10 flex flex-1 w-full items-center px-5 sm:px-8 lg:px-10 xl:px-12 pt-[calc(var(--de-nav-offset)+0.5rem)] pb-10 sm:pb-14 lg:pt-[calc(var(--de-nav-offset)+0.5rem)] lg:pb-16"
        style={{ y }}
      >
        <div className="mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.18fr)_minmax(0,0.82fr)] gap-8 lg:gap-10 xl:gap-12 items-start lg:items-center">
            <motion.div
              className="flex flex-col gap-3.5 sm:gap-5 w-full min-w-0"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.4, ease: "easeOut" }}
            >
              <motion.p
                className="text-sm font-semibold uppercase tracking-[0.16em] text-pink-300/95 sm:text-base sm:tracking-[0.18em]"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.3, delay: prefersReducedMotion ? 0 : 0.05 }}
              >
                Arizona MSP · Cybersecurity &amp; Managed IT
              </motion.p>

              <h1 className="text-[clamp(1.85rem,7.4vw,3.55rem)] font-bold leading-[1.12] tracking-[-0.03em] text-white">
                <span>Your Arizona business,</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-300 via-pink-400 to-violet-300">
                  protected 24/7.
                </span>
              </h1>

              <p className="text-base text-white/90 leading-relaxed max-w-xl sm:text-lg sm:text-white/85">
                Cybersecurity and managed IT for growing businesses—reducing risk, supporting
                compliance, and keeping your team productive without building an internal IT
                department.
              </p>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-2.5">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.text}
                    className="flex items-start gap-1.5 min-w-0"
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: prefersReducedMotion ? 0 : 0.28,
                      delay: prefersReducedMotion ? 0 : 0.1 + index * 0.03,
                    }}
                  >
                    <feature.icon className="h-4 w-4 text-pink-400/90 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-[15px] font-medium text-white/90 leading-snug sm:text-base sm:font-normal sm:text-white/80">{feature.text}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-0.5 flex flex-col items-start gap-3" id="assessment-cta">
                <div className="flex w-full flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <Button
                    type="button"
                    size="lg"
                    data-testid="button-hero-schedule"
                    onClick={handleSchedule}
                    className="h-12 w-full sm:w-auto px-6 sm:px-7 text-base font-semibold bg-gradient-to-r from-fuchsia-600 via-pink-600 to-rose-500 hover:from-fuchsia-500 hover:via-pink-500 hover:to-rose-400 text-white border border-pink-300/35 shadow-lg shadow-pink-500/40 hover:shadow-xl hover:shadow-pink-500/50 transition-all duration-300"
                  >
                    {CTA.heroPrimary}
                    <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
                  </Button>
                  <Button
                    type="button"
                    size="lg"
                    asChild
                    data-testid="button-hero-pricing"
                    className="h-12 w-full sm:w-auto px-6 sm:px-7 text-base font-semibold bg-transparent text-white border border-white/35 hover:bg-white/5 hover:border-white/55 shadow-none"
                  >
                    <Link href={CTA.secondaryHref}>{CTA.secondary}</Link>
                  </Button>
                </div>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-base text-white/75">
                  <span className="inline-flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                    No obligation
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                    Response within one business day
                  </span>
                </div>

                <p className="text-base text-white/55 max-w-xl leading-relaxed">
                  Arizona-based · Principal-led · Recommendations sized to your business
                  <span className="mx-2 text-white/25" aria-hidden="true">
                    ·
                  </span>
                  Or call{" "}
                  <a
                    href="tel:+13254809870"
                    className="text-pink-300 hover:text-pink-200 font-medium underline underline-offset-4 decoration-pink-400/40 hover:decoration-pink-300/70 transition-colors"
                    data-testid="link-hero-phone"
                  >
                    325-480-9870
                  </a>
                </p>
              </div>
            </motion.div>

            <div className="hidden lg:flex relative justify-end w-full lg:pb-8">
              <motion.div
                className="relative w-full max-w-[500px] xl:max-w-[530px]"
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

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#050312]/80 to-transparent z-10 pointer-events-none" />
    </section>
  );
};
