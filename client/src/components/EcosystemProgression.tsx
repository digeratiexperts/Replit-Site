import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { pricingTiers, formatUserPrice, formatPrice, type PricingTierKey } from "@/data/pricing";

const fit: Record<string, string> = {
  it: "Smaller, less complex environments that need essential protection and a documented baseline.",
  office: "Broader managed workplace — more users, devices, and a professionally operated network.",
  business: "Deeper infrastructure, cyber operations, recovery, governance, and strategy.",
  enterprise: "Multi-site, regulated, or security-sensitive environments that need the greatest operating depth.",
};

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

type EcosystemProgressionProps = {
  compact?: boolean;
  /** Homepage: include monthly floors and capability highlights without a second card grid. */
  detailed?: boolean;
};

/** Fit-based IT → Office → Business → Enterprise rail. Not a ranking ladder. */
export function EcosystemProgression({ compact = false, detailed = false }: EcosystemProgressionProps) {
  return (
    <div
      className={
        compact
          ? ""
          : "rounded-2xl border border-[var(--de-hairline)] bg-[var(--de-surface)] p-6 md:p-8 lg:p-10"
      }
    >
      <p className="text-base font-semibold uppercase tracking-[0.2em] text-[#D3126A]">
        ProActive Ecosystem
      </p>
      <h2 className="mt-2 font-heading text-2xl font-semibold tracking-[-0.03em] text-white md:text-3xl lg:text-4xl">
        Four operating models. One matched to your environment.
      </h2>
      <p className="mt-3 max-w-3xl text-base leading-relaxed text-white/55 md:text-lg">
        We do not start with a package and pile on add-ons. If Office would need heavy modification,
        Business is the correct fit for that environment — not universally “better.” User count is a
        signal, never the sole criterion.
      </p>

      <ol className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {pricingTiers.map((tier, index) => (
          <li
            key={tier.id}
            className="relative flex flex-col rounded-xl border border-[var(--de-hairline)] bg-[var(--de-bg)] p-5 md:p-6"
            data-testid={detailed ? `pricing-summary-${tier.id}` : `ecosystem-model-${tier.id}`}
          >
            <p className="font-mono text-base font-semibold tracking-[0.16em] text-white/50">
              {String(index + 1).padStart(2, "0")}
            </p>
            <p className="mt-2 font-heading text-xl font-semibold text-white">{tier.name}</p>
            <p className="mt-1 text-base text-white/55">{formatUserPrice(tier.id)}</p>
            {detailed && (
              <p className="mt-1 text-base text-white/50">
                {formatPrice(tier.monthlyMin)} monthly minimum
              </p>
            )}
            <p className="mt-3 flex-1 text-base leading-relaxed text-white/60">{fit[tier.id]}</p>
            {detailed && (
              <ul className="mt-4 space-y-1.5">
                {highlights[tier.id].map((item) => (
                  <li key={item} className="text-base text-white/70">
                    <span className="mr-2 text-[#D3126A]" aria-hidden="true">
                      ·
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            )}
            <Link href={tier.learnMoreUrl}>
              <span className="mt-5 inline-flex min-h-11 items-center gap-1 text-base font-semibold text-[#D3126A] transition-colors hover:text-[#f0187a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D3126A]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--de-bg)]">
                {tier.label}
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
            </Link>
          </li>
        ))}
      </ol>

      <p className="mt-6 text-base leading-relaxed text-white/55">
        Not sure which package fits? We assess your environment — users, devices, locations,
        infrastructure, security, compliance, recovery, and whether you need fully managed or
        co-managed operations — then match the model.
      </p>
    </div>
  );
}

export { fit as ecosystemFitCopy };
