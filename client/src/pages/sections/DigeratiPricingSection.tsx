import { Link } from "wouter";
import { CheckCircle } from "lucide-react";
import { pricingTiers, formatPrice, getPricingFooterText } from "@/data/pricing";
import { analytics } from "@/lib/analytics";

export const DigeratiPricingSection = (): JSX.Element => {
  return (
    <section id="pricing" className="relative py-14 lg:py-20 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pink-300/90 mb-3">
          ProActive package preview
        </p>
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 max-w-3xl">
          Four tiers. One commercial model. Clear monthly minimums.
        </h2>
        <p className="text-white/65 max-w-2xl mb-8">
          Per-user rates start as published below. Your monthly total is the greater of seats × rate
          or the tier minimum. Final scope is confirmed after a Cyber Risk Assessment.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {pricingTiers.map((tier) => (
            <article
              key={tier.id}
              className={`rounded-2xl border p-6 flex flex-col ${
                tier.recommended
                  ? "border-pink-400/40 bg-gradient-to-b from-pink-500/10 to-white/[0.03]"
                  : "border-white/10 bg-white/[0.03]"
              }`}
              data-testid={`pricing-card-${tier.id}`}
            >
              {tier.recommended && (
                <span className="self-start text-[11px] font-semibold uppercase tracking-wide px-2 py-1 rounded-full bg-pink-500/20 text-pink-200 border border-pink-400/30 mb-3">
                  Recommended for most SMBs
                </span>
              )}
              <h3 className="text-xl font-bold text-white">{tier.name}</h3>
              <p className="text-sm text-white/55 mt-1 mb-4">{tier.idealBuyer}</p>
              <p className="text-3xl font-bold text-white">
                {formatPrice(tier.user)}
                <span className="text-base font-normal text-white/50">/user/mo</span>
              </p>
              <p className="text-sm text-pink-200/90 mt-1 mb-5 font-medium">
                {formatPrice(tier.monthlyMinimum)}/mo minimum
              </p>
              <ul className="space-y-2 mb-6 flex-1">
                {tier.inclusions.map((line) => (
                  <li key={line} className="flex gap-2 text-sm text-white/70">
                    <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" aria-hidden />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={tier.learnMoreUrl}
                onClick={() => analytics.pricingCTAClicked(tier.name, "schedule")}
                className={`inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 transition-colors ${
                  tier.recommended
                    ? "bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white"
                    : "border border-white/20 text-white hover:bg-white/10"
                }`}
              >
                See {tier.name} details
              </Link>
            </article>
          ))}
        </div>

        <p className="text-sm text-white/50 mt-8 max-w-3xl">{getPricingFooterText()}</p>
        <div className="mt-6">
          <Link
            href="/proactive-ecosystem-pricing"
            className="text-pink-300 hover:text-pink-200 text-sm font-medium underline underline-offset-4"
            onClick={() => analytics.pricingViewed("matrix")}
          >
            Open full ProActive pricing matrix
          </Link>
        </div>
      </div>
    </section>
  );
};
