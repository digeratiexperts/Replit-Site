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
    <section id="pricing" className="relative overflow-hidden bg-[#0a0a0a] py-12 md:py-16 lg:py-20">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(211,18,106,0.12) 0%, transparent 55%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[100rem] px-3 sm:px-4 lg:px-6">
        <motion.div
          className="mx-auto mb-8 max-w-3xl text-center md:mb-12"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#FF477F] md:text-sm">
            No Black-Box IT
          </p>
          <h2 className="mb-3 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Transparent pricing.{" "}
            <span className="bg-gradient-to-r from-[#FF477F] to-fuchsia-400 bg-clip-text text-transparent">
              No mystery quote.
            </span>
          </h2>
          <p className="text-base text-white/60 md:text-lg">{NO_BLACK_BOX_TAGLINE}</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
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
                className={`group relative flex flex-col rounded-2xl border p-6 lg:p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 ${
                  featured
                    ? "border-pink-500/60 bg-gradient-to-b from-pink-950/40 via-slate-900/80 to-slate-900/90 shadow-2xl shadow-pink-950/30 hover:border-pink-400/80 hover:shadow-pink-950/50"
                    : "border-white/10 bg-slate-900/60 hover:border-violet-400/40 hover:shadow-2xl hover:shadow-violet-950/40"
                }`}
                data-testid={`pricing-summary-${key}`}
              >
                {/* Top accent glow */}
                <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${featured ? 'from-transparent via-pink-400/80 to-transparent' : 'from-transparent via-violet-500/30 to-transparent group-hover:via-pink-500/70'} transition-all duration-500`} />

                {featured && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-fuchsia-600 via-pink-600 to-rose-500 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-lg shadow-pink-500/40 border border-pink-300/30">
                    Most chosen
                  </span>
                )}
                <p className={`text-sm font-semibold tracking-wide ${featured ? 'text-pink-300' : 'text-white/60'}`}>{tier.fullName}</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-white/40">Starting at</p>
                <p className="mt-1 text-4xl font-bold tracking-tight text-white">
                  ${tier.user}
                  <span className="text-base font-medium text-white/50">/user/mo</span>
                </p>
                <p className="mt-2 text-sm text-white/55 font-light">
                  {formatPrice(tier.monthlyMin)} monthly minimum
                </p>
                <ul className="mt-5 flex-1 space-y-2.5">
                  {highlights[key].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-white/80">
                      <CheckCircle2 className={`mt-0.5 h-4 w-4 flex-shrink-0 ${featured ? 'text-pink-400' : 'text-emerald-400'}`} />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href={tier.learnMoreUrl}>
                  <span className={`mt-6 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors ${featured ? 'text-pink-300 hover:text-pink-200' : 'text-violet-300 hover:text-pink-300'}`}>
                    Package details
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-xl p-6 md:mt-10 md:p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-pink-500/30 to-transparent" />
          <div className="grid gap-6 lg:grid-cols-12 lg:items-center relative z-10">
            <div className="lg:col-span-7">
              <h3 className="text-xl font-semibold text-white md:text-2xl tracking-tight">
                Not just IT support — one operating model
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70 md:text-base">
                ProActive Business consolidates capabilities organizations often buy separately: managed IT,
                workplace, identity, endpoint security, email security, network security, backup & recovery,
                security operations, and technology + cyber strategy — one accountable partner.
              </p>
              <p className="mt-3 text-xs leading-relaxed text-white/45 md:text-sm">{PRICING_SCOPE_NOTE}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
              <Link href="/proactive-ecosystem-pricing">
                <span
                  className="group relative overflow-hidden inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-600 via-pink-600 to-rose-500 px-6 text-base font-semibold text-white hover:from-fuchsia-500 hover:via-pink-500 hover:to-rose-400 transition-all duration-300 shadow-lg shadow-pink-500/30 hover:shadow-xl hover:shadow-pink-500/40 border border-pink-300/30"
                  data-testid="button-compare-everything"
                >
                  <span>Compare Everything</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
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
