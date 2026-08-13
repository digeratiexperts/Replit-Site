import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { pricingTiers, formatUserPrice } from "@/data/pricing";

const fit: Record<string, string> = {
  it: "Smaller, less complex environments that need essential protection and a documented baseline.",
  office: "Broader managed workplace — more users, devices, and a professionally operated network.",
  business: "Deeper infrastructure, cyber operations, recovery, governance, and strategy.",
  enterprise: "Multi-site, regulated, or security-sensitive environments that need the greatest operating depth.",
};

type EcosystemProgressionProps = {
  compact?: boolean;
};

/** Fit-based IT → Office → Business → Enterprise rail. Not a ranking ladder. */
export function EcosystemProgression({ compact = false }: EcosystemProgressionProps) {
  return (
    <div className={compact ? "" : "rounded-2xl border border-white/10 bg-[#151217] p-6 md:p-8"}>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF477F]">
        ProActive Ecosystem
      </p>
      <h3 className="mt-2 font-heading text-xl font-semibold tracking-[-0.02em] text-white md:text-2xl">
        Four operating models. One matched to your environment.
      </h3>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/60 md:text-base">
        We do not start with a package and pile on add-ons. If Office would need heavy modification,
        Business is the correct fit for that environment — not universally “better.” User count is a
        signal, never the sole criterion.
      </p>

      <ol className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {pricingTiers.map((tier, index) => (
          <li key={tier.id} className="relative flex flex-col rounded-xl border border-white/10 bg-[#0a0a0a] p-4">
            <p className="font-mono text-[11px] font-semibold tracking-[0.16em] text-white/35">
              {String(index + 1).padStart(2, "0")}
            </p>
            <p className="mt-2 text-lg font-semibold text-white">{tier.name}</p>
            <p className="mt-1 text-sm text-white/45">{formatUserPrice(tier.id)}</p>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-white/65">{fit[tier.id]}</p>
            <Link href={tier.learnMoreUrl}>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#FF477F] hover:text-pink-300">
                {tier.label}
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </li>
        ))}
      </ol>

      <p className="mt-6 text-sm text-white/50">
        Not sure which package fits? We assess your environment — users, devices, locations,
        infrastructure, security, compliance, recovery, and whether you need fully managed or
        co-managed operations — then match the model.
      </p>
    </div>
  );
}

export { fit as ecosystemFitCopy };
