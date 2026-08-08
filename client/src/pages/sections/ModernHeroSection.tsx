import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { analytics } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Building, FileCheck, Shield, Check } from "lucide-react";
import { DashboardMockup } from "@/components/graphics";
import heroBgImage from "@assets/lucid-origin_a_cinematic_photo_of_designed_as_a_background_lay_1775876876671.jpg";
import { useBooking } from "@/contexts/BookingContext";

export const ModernHeroSection = (): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { openBooking } = useBooking();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 40]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? ["0%", "0%"] : ["0%", "12%"]);
  const floatingY1 = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : -50]);
  const floatingY2 = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : -35]);
  const floatingY3 = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : -20]);

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
      className="relative min-h-[100svh] lg:min-h-screen overflow-hidden"
      style={{ position: "relative" }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          src={heroBgImage}
          alt=""
          loading="eager"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover opacity-[0.22]"
          style={{ transform: "rotate(-5deg) scale(1.3)", transformOrigin: "center center" }}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/70 to-[#050312]/95">
        <motion.div
          className="absolute top-0 right-0 w-[720px] h-[720px] pointer-events-none"
          data-testid="hero-parallax-orb-1"
          style={{
            y: backgroundY,
            background:
              "radial-gradient(circle at 100% 0%, rgba(236, 72, 153, 0.22) 0%, rgba(139, 92, 246, 0.16) 42%, transparent 58%)",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[560px] h-[560px] pointer-events-none"
          data-testid="hero-parallax-orb-2"
          style={{
            y: floatingY3,
            background:
              "radial-gradient(circle at 0% 100%, rgba(217, 70, 239, 0.14) 0%, rgba(244, 63, 94, 0.08) 45%, transparent 60%)",
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
        className="absolute top-32 right-20 w-4 h-4 rounded-full bg-violet-500/25 pointer-events-none hidden lg:block"
        style={{ y: floatingY1 }}
        data-testid="hero-floating-element-1"
      />
      <motion.div
        className="absolute top-48 right-40 w-2 h-2 rounded-full bg-purple-400/35 pointer-events-none hidden lg:block"
        style={{ y: floatingY2 }}
        data-testid="hero-floating-element-2"
      />
      <motion.div
        className="absolute bottom-32 left-20 w-3 h-3 rounded-full bg-fuchsia-500/25 pointer-events-none hidden lg:block"
        style={{ y: floatingY3 }}
        data-testid="hero-floating-element-3"
      />

      <motion.div
        className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-16 pt-32 pb-16 sm:pt-36 sm:pb-16 lg:pt-40 lg:pb-20 xl:pt-44"
        style={{ y }}
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">
            <motion.div
              className="flex flex-col gap-5 sm:gap-6 w-full"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.45, ease: "easeOut" }}
            >
              <motion.p
                className="text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-pink-300/95"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.35, delay: prefersReducedMotion ? 0 : 0.05 }}
              >
                Arizona MSP · Cybersecurity &amp; Managed IT
              </motion.p>

              <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold leading-[1.08] tracking-[-0.02em] text-white">
                Your Arizona business,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-300 via-pink-400 to-violet-300">
                  protected 24/7.
                </span>
              </h1>

              <p className="text-base md:text-lg text-white/85 leading-relaxed max-w-xl">
                Cybersecurity and managed IT for growing businesses—reducing risk, supporting
                compliance, and keeping your team productive without building an internal IT
                department.
              </p>

              <div className="grid grid-cols-1 xs:grid-cols-2 gap-x-4 gap-y-2.5 sm:flex sm:flex-wrap sm:gap-x-6 sm:gap-y-2.5">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.text}
                    className="flex items-center gap-1.5 sm:gap-2"
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: prefersReducedMotion ? 0 : 0.3,
                      delay: prefersReducedMotion ? 0 : 0.12 + index * 0.04,
                    }}
                  >
                    <feature.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-pink-400 flex-shrink-0" aria-hidden="true" />
                    <span className="text-sm sm:text-base text-white/80">{feature.text}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-1 sm:mt-2 flex flex-col items-start gap-4" id="assessment-cta">
                <Button
                  type="button"
                  size="lg"
                  data-testid="button-hero-schedule"
                  onClick={handleSchedule}
                  className="h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg font-semibold bg-gradient-to-r from-fuchsia-600 via-pink-600 to-rose-500 hover:from-fuchsia-500 hover:via-pink-500 hover:to-rose-400 text-white border border-pink-300/35 shadow-lg shadow-pink-500/40 hover:shadow-xl hover:shadow-pink-500/50 transition-all duration-300"
                >
                  Schedule Your Cyber Risk Assessment
                  <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
                </Button>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/70">
                  <span className="inline-flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                    No obligation
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                    Response within one business day
                  </span>
                </div>

                <p className="text-sm text-white/70 max-w-lg leading-relaxed">
                  Start with a practical review of your identity, endpoints, email, backups, and
                  security posture.
                </p>

                <p className="text-sm sm:text-base text-white/70">
                  Arizona-based · Principal-led · Recommendations sized to your business
                  <span className="mx-2 text-white/35" aria-hidden="true">
                    ·
                  </span>
                  Or call{" "}
                  <a
                    href="tel:325-480-9870"
                    className="text-pink-300 hover:text-pink-200 font-medium underline underline-offset-4 decoration-pink-400/40 hover:decoration-pink-300/70 transition-colors"
                    data-testid="link-hero-phone"
                  >
                    325-480-9870
                  </a>
                </p>
              </div>
            </motion.div>

            <div className="hidden lg:flex relative justify-end w-full">
              <motion.div
                className="relative w-full max-w-[520px] xl:max-w-[560px]"
                initial={prefersReducedMotion ? false : { opacity: 0, x: 28, rotateY: -6 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.55,
                  delay: prefersReducedMotion ? 0 : 0.15,
                  ease: "easeOut",
                }}
                style={{ perspective: 1200 }}
              >
                <motion.div
                  className="absolute -inset-6 -z-10 rounded-[2rem] pointer-events-none"
                  aria-hidden="true"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(236, 72, 153, 0.28) 0%, rgba(139, 92, 246, 0.18) 45%, transparent 70%)",
                  }}
                  animate={
                    prefersReducedMotion
                      ? undefined
                      : { opacity: [0.35, 0.55, 0.35], scale: [1, 1.04, 1] }
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
                      : "perspective(1200px) rotateX(2deg) rotateY(-2deg)",
                  }}
                >
                  <DashboardMockup className="w-full" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050312] via-[#050312]/80 to-transparent z-10 pointer-events-none" />
    </section>
  );
};
