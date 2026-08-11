import { motion, useReducedMotion } from "framer-motion";
import { Shield, ArrowRight, MapPin, UserCheck, Scale } from "lucide-react";
import trustDeskImg from "@assets/de-trust-assessment-desk.png";

const pillars = [
  {
    icon: MapPin,
    title: "Arizona-based",
    detail: "Local principal support for businesses that need a real person, not a ticket queue.",
  },
  {
    icon: UserCheck,
    title: "Principal-led",
    detail: "Recommendations come from the people who will stand behind the work.",
  },
  {
    icon: Scale,
    title: "Sized to your business",
    detail: "Controls and tooling matched to your risk—not an enterprise stack you will not use.",
  },
];

export const DigeratiTrustPhotoSection = (): JSX.Element => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-white py-14 md:py-20 lg:py-24 overflow-hidden" data-testid="section-trust-photo">
      <div className="max-w-[100rem] mx-auto px-3 sm:px-4 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-5">
              <Shield className="w-4 h-4 text-pink-600" aria-hidden="true" />
              <span className="text-sm font-semibold text-pink-600 uppercase tracking-wider">
                Why Arizona businesses work with us
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight mb-6 tracking-tight">
              Protection that fits{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 via-pink-600 to-violet-600">
                how you actually operate.
              </span>
            </h2>

            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8 max-w-xl">
              From medical practices to law firms to family-owned offices, we protect the businesses
              Arizona runs on—the ones that cannot afford downtime, a breach, or lost client data.
            </p>

            <div className="space-y-5 mb-10">
              {pillars.map((pillar) => (
                <div key={pillar.title} className="flex gap-3">
                  <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-pink-50 border border-pink-100">
                    <pillar.icon className="h-4 w-4 text-pink-600" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{pillar.title}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{pillar.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="/book"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-fuchsia-600 via-pink-600 to-rose-500 hover:from-fuchsia-500 hover:via-pink-500 hover:to-rose-400 text-white font-semibold px-7 py-3.5 text-base rounded-lg shadow-md shadow-pink-500/25 transition-all duration-200"
              data-testid="link-trust-cta"
            >
              Schedule Your Cyber Risk Assessment
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </motion.div>

          <motion.div
            className="relative"
            initial={prefersReducedMotion ? {} : { opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-lg shadow-gray-200/60">
              <img
                src={trustDeskImg}
                alt="Principal-led cyber risk assessment work for an Arizona business"
                loading="lazy"
                decoding="async"
                width={960}
                height={720}
                className="w-full h-full object-cover aspect-[4/3]"
                data-testid="img-trust-assessment-desk"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent p-5">
                <p className="text-white text-sm font-medium">
                  Principal-led assessments — sized to how your business actually runs
                </p>
                <p className="text-white/75 text-xs mt-1">
                  Illustrative scene · not a specific client engagement
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
