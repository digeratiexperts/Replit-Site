import { ArrowRight, CheckCircle, Shield, Radio, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useReducedMotion } from "framer-motion";
import { useBooking } from "@/contexts/BookingContext";
import { CTA } from "@/lib/ctaCopy";
import officeEveningImg from "@assets/de-arizona-office-evening.png";

const capabilities = [
  "Partner-backed detection and alerting across endpoints and identity",
  "Human triage — analysts decide what matters before you get a false alarm",
  "Prioritized remediation guidance tied to your environment",
  "Documented response paths when something needs escalation",
];

export const DigeratiAIAssistanceSection = (): JSX.Element => {
  const prefersReducedMotion = useReducedMotion();
  const { openBooking } = useBooking();

  return (
    <section className="de-dark-chapter de-chapter-hairline relative overflow-hidden py-20">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="flex justify-center lg:justify-start order-2 lg:order-1"
            initial={prefersReducedMotion ? {} : { opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative max-w-md w-full">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src={officeEveningImg}
                  alt="Arizona professional office where Digerati Experts supports local businesses"
                  loading="lazy"
                  decoding="async"
                  width={448}
                  height={300}
                  className="w-full object-cover aspect-[4/3]"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                  <p className="text-base font-medium text-white">Local operations. Human judgment.</p>
                  <p className="text-base text-white/75 mt-1">
                    Arizona-based · Principal-led · Always-on monitoring
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="order-1 lg:order-2"
            initial={prefersReducedMotion ? {} : { opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="inline-flex items-center gap-2 text-base font-medium text-de-magenta-ink mb-4">
              <Radio className="h-4 w-4" aria-hidden />
              Detection & response
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white leading-tight">
              Monitoring that ends with a person who owns the outcome
            </h2>
            <p className="text-lg text-white/70 mb-8 leading-relaxed max-w-xl">
              We use modern detection tooling so signals surface quickly — then our team investigates,
              prioritizes, and acts. Automation helps coverage; accountability stays human.
            </p>

            <ul className="space-y-3 mb-8">
              {capabilities.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-white/85">
                  <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" aria-hidden />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="rounded-xl border border-de-hairline bg-de-raised p-5">
                <Shield className="h-5 w-5 text-pink-400 mb-2" aria-hidden />
                <p className="text-white font-semibold text-base mb-1">Coverage with context</p>
                <p className="text-white/55 text-base leading-relaxed">
                  Alerts are interpreted against your environment — not dumped into a generic queue.
                </p>
              </div>
              <div className="rounded-xl border border-de-hairline bg-de-raised p-5">
                <Layers className="h-5 w-5 text-[#D3126A] mb-2" aria-hidden />
                <p className="text-white font-semibold text-base mb-1">Documented next steps</p>
                <p className="text-white/55 text-base leading-relaxed">
                  Findings become clear actions your team can follow without decoding jargon.
                </p>
              </div>
            </div>

            <Button
              type="button"
              onClick={() => openBooking("ai_assistance_section")}
              className="min-h-11 bg-[#D3126A] text-base font-semibold text-white hover:bg-[#e01874]"
              data-testid="button-ai-section-assessment"
            >
              {CTA.primary}
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
