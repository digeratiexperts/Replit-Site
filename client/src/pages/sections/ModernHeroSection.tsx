import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { analytics } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Building, FileCheck, Shield } from "lucide-react";
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
          className="absolute inset-0 w-full h-full object-cover opacity-[0.15]"
          style={{ transform: "rotate(-5deg) scale(1.3)", transformOrigin: "center center" }}
        />
      </div>

      <div className="absolute inset-0 bg-black/70">
        <motion.div
          className="absolute top-0 right-0 w-[700px] h-[700px] pointer-events-none"
          data-testid="hero-parallax-orb-1"
          style={{
            y: backgroundY,
            background: "radial-gradient(circle at 100% 0%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] pointer-events-none"
          data-testid="hero-parallax-orb-2"
          style={{
            y: floatingY3,
            background: "radial-gradient(circle at 0% 100%, rgba(168, 85, 247, 0.08) 0%, transparent 50%)",
          }}
        />
      </div>

      <motion.div
        className="absolute top-32 right-20 w-4 h-4 rounded-full bg-violet-500/20 pointer-events-none hidden lg:block"
        style={{ y: floatingY1 }}
        data-testid="hero-floating-element-1"
      />
      <motion.div
        className="absolute top-48 right-40 w-2 h-2 rounded-full bg-purple-400/30 pointer-events-none hidden lg:block"
        style={{ y: floatingY2 }}
        data-testid="hero-floating-element-2"
      />
      <motion.div
        className="absolute bottom-32 left-20 w-3 h-3 rounded-full bg-fuchsia-500/20 pointer-events-none hidden lg:block"
        style={{ y: floatingY3 }}
        data-testid="hero-floating-element-3"
      />

      <motion.div
        className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-16 pt-28 pb-12 sm:pt-32 sm:pb-14 lg:pt-36 lg:pb-16 xl:pt-40"
        style={{ y }}
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 xl:gap-16 items-center">
            <motion.div
              className="flex flex-col gap-4 sm:gap-5 w-full"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.4 }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-[3.25rem] font-bold leading-[1.12] tracking-[-0.02em] text-white">
                Your Arizona business, protected 24/7.
              </h1>

              <p className="text-base md:text-lg text-white/65 leading-relaxed max-w-xl">
                Cybersecurity and managed IT for growing businesses—reducing risk, supporting
                compliance, and keeping your team productive without building an internal IT
                department.
              </p>

              <div className="grid grid-cols-1 xs:grid-cols-2 gap-x-4 gap-y-2 sm:flex sm:flex-wrap sm:gap-x-6 sm:gap-y-2">
                {features.map((feature) => (
                  <div key={feature.text} className="flex items-center gap-1.5 sm:gap-2">
                    <feature.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-violet-400 flex-shrink-0" aria-hidden="true" />
                    <span className="text-sm sm:text-base text-white/70">{feature.text}</span>
                  </div>
                ))}
              </div>

              <div className="mt-1 sm:mt-2 flex flex-col items-start gap-3" id="assessment-cta">
                <Button
                  type="button"
                  size="lg"
                  data-testid="button-hero-schedule"
                  onClick={handleSchedule}
                  className="h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg font-semibold bg-violet-600 hover:bg-violet-500 text-white border border-violet-400/20 shadow-lg shadow-violet-900/40 transition-colors duration-200"
                >
                  Schedule Your Cyber Risk Assessment
                  <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
                </Button>

                <p className="text-sm text-white/50 max-w-lg leading-relaxed">
                  Start with a practical review of your identity, endpoints, email, backups, and
                  security posture. No obligation. Response within one business day.
                </p>

                <p className="text-sm text-white/45">
                  Arizona-based · Principal-led · Recommendations sized to your business
                </p>

                <p className="text-sm text-white/45">
                  Or call{" "}
                  <a
                    href="tel:325-480-9870"
                    className="text-white/70 underline underline-offset-4 decoration-white/25 hover:text-white hover:decoration-white/50 transition-colors"
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
                initial={prefersReducedMotion ? false : { opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.45, delay: prefersReducedMotion ? 0 : 0.15, ease: "easeOut" }}
              >
                <div className="absolute inset-0 bg-violet-500/8 blur-3xl scale-110 -z-10 rounded-3xl" aria-hidden="true" />
                <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40">
                  <DashboardMockup className="w-full" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#050312] to-transparent z-10 pointer-events-none" />
    </section>
  );
};
