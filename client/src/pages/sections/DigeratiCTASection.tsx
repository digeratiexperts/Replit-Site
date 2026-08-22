import { Shield, Award, CheckCircle } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { revealInitial, revealInView, revealTransition, revealViewport } from "@/lib/animations";
import { ParallaxStill } from "@/components/visual/ParallaxStill";
import ctaBgImage from "@assets/de-section-atmosphere.png";
import { CTA } from "@/lib/ctaCopy";
import { useBooking } from "@/contexts/BookingContext";

const badges = [
  { name: "Audit readiness support", icon: Shield },
  { name: "Microsoft-aligned stack", icon: Award },
  { name: "HIPAA-minded controls", icon: CheckCircle },
  { name: "Documented standards", icon: Shield },
];

export const DigeratiCTASection = (): JSX.Element => {
  const prefersReducedMotion = useReducedMotion();
  const { openBooking } = useBooking();

  return (
    <section className="de-dark-well de-chapter-hairline de-field-grain-film de-field-lit relative overflow-hidden py-16 lg:py-24">
      <ParallaxStill
        src={ctaBgImage}
        alt=""
        travel={4}
        className="pointer-events-none absolute inset-0 z-0"
        imgClassName="opacity-[0.22]"
      />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-3 text-center sm:px-4 lg:px-6">
        <motion.div
          initial={prefersReducedMotion ? false : revealInitial}
          whileInView={revealInView}
          viewport={revealViewport}
          transition={revealTransition}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-6">
            Start with a{" "}
            <span className="text-[#D3126A]">Cyber Risk Assessment</span>
          </h2>
        </motion.div>

        <motion.p
          initial={prefersReducedMotion ? false : revealInitial}
          whileInView={revealInView}
          viewport={revealViewport}
          transition={{ ...revealTransition, delay: prefersReducedMotion ? 0 : 0.04 }}
          className="text-lg md:text-xl text-gray-300 leading-relaxed mb-2"
        >
          Discover identity, endpoint, email, backup, and operating gaps before you buy a package.
        </motion.p>
        <motion.p
          initial={prefersReducedMotion ? false : { opacity: 0.55 }}
          whileInView={{ opacity: 1 }}
          viewport={revealViewport}
          transition={{ ...revealTransition, delay: prefersReducedMotion ? 0 : 0.05 }}
          className="text-base text-gray-300 mb-6"
        >
          Assessment-led recommendations. Final scope confirmed after we see the environment.
        </motion.p>

        <motion.p
          initial={prefersReducedMotion ? false : { opacity: 0.55 }}
          whileInView={{ opacity: 1 }}
          viewport={revealViewport}
          transition={{ ...revealTransition, delay: prefersReducedMotion ? 0 : 0.06 }}
          className="text-gray-300 mb-10 font-semibold"
        >
          Serving Arizona professional services, healthcare, and growing SMBs.
        </motion.p>

        <motion.div
          initial={prefersReducedMotion ? false : revealInitial}
          whileInView={revealInView}
          viewport={revealViewport}
          transition={{ ...revealTransition, delay: prefersReducedMotion ? 0 : 0.06 }}
          className="flex flex-col items-center gap-4"
        >
          <button
            type="button"
            className="h-14 px-10 rounded-xl bg-[#D3126A] text-white text-lg font-semibold inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors hover:bg-[#e01874]"
            data-testid="button-cta-assessment"
            onClick={() => openBooking("homepage-cta")}
          >
            {CTA.primary}
          </button>
          <a
            href="#contact"
            className="text-sm font-medium text-white/85 underline-offset-4 transition-colors hover:text-white hover:underline"
            data-testid="link-cta-contact"
          >
            Or send a message below
          </a>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? false : revealInitial}
          whileInView={revealInView}
          viewport={revealViewport}
          transition={revealTransition}
          className="mt-16"
        >
          <p className="text-gray-400 text-base uppercase tracking-wider mb-6">
            How we operate
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {badges.map((badge) => {
              const IconComponent = badge.icon;
              return (
                <div
                  key={badge.name}
                  className="flex min-h-11 items-center gap-2 rounded-xl border border-de-hairline bg-de-raised px-5 py-3 transition-colors hover:border-[#D3126A]"
                  data-testid={`badge-${badge.name.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <IconComponent className="h-4 w-4 text-[#D3126A]" />
                  <span className="text-base font-medium text-gray-300">{badge.name}</span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
