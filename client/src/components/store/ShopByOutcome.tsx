import {
  Shield,
  Sparkles,
  FileCheck,
  RotateCcw,
  Headphones,
  Building2,
  Laptop,
  type LucideIcon,
} from "lucide-react";
import {
  storeOutcomes,
  type StoreOutcomeId,
} from "@/data/storeMerchandising";

const outcomeIcons: Record<StoreOutcomeId, LucideIcon> = {
  protect: Shield,
  modernize: Sparkles,
  compliance: FileCheck,
  recover: RotateCcw,
  support_it: Headphones,
  outsource: Building2,
  secure_remote: Laptop,
};

interface ShopByOutcomeProps {
  selected?: StoreOutcomeId | null;
  onSelect: (id: StoreOutcomeId | null) => void;
}

export function ShopByOutcome({ selected, onSelect }: ShopByOutcomeProps) {
  return (
    <section className="mb-14" data-testid="shop-by-outcome">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-white md:text-4xl">Shop by Outcome</h2>
        <p className="mt-2 text-base text-white/60 md:text-lg">
          Start with the result you need — we map it to real catalog categories.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-7">
        {storeOutcomes.map((outcome) => {
          const Icon = outcomeIcons[outcome.id];
          const isActive = selected === outcome.id;
          return (
            <button
              key={outcome.id}
              type="button"
              onClick={() => onSelect(isActive ? null : outcome.id)}
              className={`group rounded-xl border p-5 text-left transition-all duration-200 ${
                isActive
                  ? "border-[#5034ff]/60 bg-[#5034ff]/15 shadow-[0_0_24px_rgba(80,52,255,0.18)]"
                  : "border-white/10 bg-[#121212] hover:border-white/20 hover:bg-[#161616]"
              }`}
              data-testid={`outcome-${outcome.id}`}
              aria-pressed={isActive}
            >
              <div
                className={`mb-3.5 flex h-11 w-11 items-center justify-center rounded-lg border ${
                  isActive
                    ? "border-[#5034ff]/40 bg-[#5034ff]/20"
                    : "border-white/10 bg-white/[0.04]"
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? "text-[#c4b5fd]" : outcome.accent}`} />
              </div>
              <p className="text-base font-semibold text-white">{outcome.label}</p>
              <p className="mt-1.5 line-clamp-2 text-sm text-white/50">{outcome.blurb}</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
