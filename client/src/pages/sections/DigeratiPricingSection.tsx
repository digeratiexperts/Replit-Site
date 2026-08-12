import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "wouter";
import {
  pricing,
  formatPrice,
  PRICING_SCOPE_NOTE,
  NO_BLACK_BOX_TAGLINE,
  type PricingTierKey,
} from "@/data/pricing";

const tierKeys: PricingTierKey[] = ["it", "office", "business", "enterprise"];

const highlights: Record<PricingTierKey, string[]> = {
  it: ["Managed IT & help desk", "Baseline identity & endpoint", "Entry cybersecurity"],
  office: ["Everything in IT", "Managed network", "Endpoint backup"],
  business: [
    "Identity · endpoint · email",
    "SOC / MDR",
    "BCDR · strategy reviews",
  ],
  enterprise: ["Advanced governance", "Audit-ready reporting", "Quarterly strategy"],
};

export const DigeratiPricingSection = (): JSX.Element => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="pricing" className="relative bg-[#0a0a0a] py-16 md:py-20 lg:py-24">
      <div className="relative z-10 mx-auto max-w-[100rem] px-3 sm:px-4 lg:px-6">
        <motion.div
          className="mx-auto mb-12 max-w-5xl md:mb-14 lg:text-left"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#FF477F]">
            No Black-Box IT
          </p>
          <h2 className="mb-3 font-heading text-3xl font-semibold tracking-[-0.02em] text-white md:text-4xl">
            Transparent pricing.{" "}
            <span className="text-[#FF477F]">No mystery quote.</span>
          </h2>
          <p className="text-base text-white/60 md:text-lg">{NO_BLACK_BOX_TAGLINE}</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {tierKeys.map((key, index) => {
            const tier = pricing[key];
            const featured = key === "business";
            return (
              <motion.div
                key={key}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`relative flex flex-col rounded-2xl border p-6 ${
                  featured
                    ? "border-[#D3126A]/50 bg-gradient-to-b from-[#D3126A]/15 to-[#141418]"
                    : "border-white/10 bg-[#141418]"
                }`}
                data-testid={`pricing-summary-${key}`}
              >
                {featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#D3126A] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                    Most chosen
                  </span>
                )}
                <p className="text-sm font-semibold text-white/50">{tier.fullName}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-white/35">Starting at</p>
                <p className="mt-1 text-4xl font-bold tracking-tight text-white">
                  ${tier.user}
                  <span className="text-base font-medium text-white/50">/user/mo</span>
                </p>
                <p className="mt-2 text-sm text-white/55">
                  {formatPrice(tier.monthlyMin)} monthly minimum
                </p>
                <ul className="mt-5 flex-1 space-y-2">
                  {highlights[key].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-white/70">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#FF477F]" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href={tier.learnMoreUrl}>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#FF477F] hover:text-pink-300">
                    Package details
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-[#151217] md:mt-10">
          <div className="flex flex-col justify-center gap-6 p-6 md:p-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
                <h3 className="text-xl font-semibold text-white md:text-2xl">
                  Not just IT support — one operating model
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60 md:text-base">
                  ProActive Business consolidates capabilities organizations often buy separately: managed IT,
                  workplace, identity, endpoint security, email security, network security, backup & recovery,
                  security operations, and technology + cyber strategy — one accountable partner.
                </p>
                <p className="mt-3 text-xs leading-relaxed text-white/45 md:text-sm">{PRICING_SCOPE_NOTE}</p>
              </div>
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                <Link href="/proactive-ecosystem-pricing">
                  <span
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#D3126A] px-6 text-base font-semibold text-white hover:bg-[#e01874]"
                    data-testid="button-compare-everything"
                  >
                    Compare Everything
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
                <Link href="/proactive-ecosystem-pricing#pricing-tools">
                  <span
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/20 px-6 text-base font-semibold text-white hover:bg-white/5"
                    data-testid="button-pricing-tools"
                  >
                    Pricing tools
                  </span>
                </Link>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
};
