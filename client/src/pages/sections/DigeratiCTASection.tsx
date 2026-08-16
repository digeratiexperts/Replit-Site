import { Shield, Award, CheckCircle } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
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
    <section className="de-dark-well de-chapter-hairline relative overflow-hidden py-12 lg:py-16">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img src={ctaBgImage} alt="" loading="lazy" className="absolute top-0 left-0 w-full h-auto opacity-[0.15]" />
      </div>

      <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-6 text-center relative z-10">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-6">
            Start with a{" "}
            <span className="text-[#D3126A]">Cyber Risk Assessment</span>
          </h2>
        </motion.div>

        <motion.p
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg md:text-xl text-gray-300 leading-relaxed mb-2"
        >
          Discover identity, endpoint, email, backup, and operating gaps before you buy a package.
        </motion.p>
        <motion.p
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="text-base text-gray-300 mb-6"
        >
          Assessment-led recommendations. Final scope confirmed after we see the environment.
        </motion.p>

        <motion.p
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-gray-300 mb-10 font-semibold"
        >
          Serving Arizona professional services, healthcare, and growing SMBs.
        </motion.p>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
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
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
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
                  className="flex items-center gap-2 rounded-xl border border-de-hairline bg-de-raised px-5 py-3"
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
