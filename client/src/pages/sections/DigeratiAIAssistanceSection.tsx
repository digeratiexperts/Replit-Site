import { ArrowRight, CheckCircle, Shield, Radio, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useReducedMotion } from "framer-motion";
import { revealTransition, revealViewport } from "@/lib/animations";
import { useBooking } from "@/contexts/BookingContext";
import { CTA } from "@/lib/ctaCopy";
import { ParallaxStill } from "@/components/visual/ParallaxStill";
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
    <section className="de-dark-chapter de-chapter-hairline de-field-grain de-field-lit relative overflow-hidden py-20">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 relative z-10">
        <div className="grid items-stretch gap-12 lg:grid-cols-2">
          <motion.div
            className="order-2 flex justify-center lg:order-1 lg:justify-start"
            initial={prefersReducedMotion ? false : { opacity: 0.55, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={revealViewport}
            transition={revealTransition}
          >
            <div className="relative w-full max-w-md lg:max-w-none lg:h-full">
              <div className="relative flex aspect-[4/3] min-h-[16rem] overflow-hidden rounded-2xl border border-white/10 shadow-2xl lg:aspect-auto lg:h-full lg:min-h-[22rem]">
                <ParallaxStill
                  src={officeEveningImg}
                  alt="Arizona professional office where Digerati Experts supports local businesses"
                  travel={6}
                  width={448}
                  height={300}
                  className="absolute inset-0"
                />
                <div className="relative mt-auto w-full bg-gradient-to-t from-black/90 to-transparent p-6 pt-16">
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
            initial={prefersReducedMotion ? false : { opacity: 0.55, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={revealViewport}
            transition={revealTransition}
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
