import { motion, useReducedMotion } from "framer-motion";
import { Shield, ArrowRight, MapPin, UserCheck, Scale } from "lucide-react";
import { DashboardMockup } from "@/components/graphics";

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Protection that fits{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 via-pink-600 to-violet-600">
                how you actually operate.
              </span>
            </h2>

            <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-lg">
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
              className="inline-flex items-center gap-2 bg-gradient-to-r from-fuchsia-600 via-pink-600 to-rose-500 hover:from-fuchsia-500 hover:via-pink-500 hover:to-rose-400 text-white font-semibold px-6 py-3 rounded-lg shadow-md shadow-pink-500/25 transition-all duration-200"
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
            <div className="rounded-2xl border border-gray-200 bg-gradient-to-b from-gray-50 to-white p-4 sm:p-6 shadow-sm">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Sample deliverable preview · not live customer data
              </p>
              <DashboardMockup />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
