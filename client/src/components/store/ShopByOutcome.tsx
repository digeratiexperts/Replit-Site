import {
  storeOutcomes,
  type StoreOutcomeId,
} from "@/data/storeMerchandising";
import { outcomeCardUrl } from "@/data/productImages";

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
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {storeOutcomes.map((outcome) => {
          const isActive = selected === outcome.id;
          return (
            <button
              key={outcome.id}
              type="button"
              onClick={() => onSelect(isActive ? null : outcome.id)}
              className={`group rounded-xl border p-5 md:p-6 text-left transition-all duration-200 ${
                isActive
                  ? "border-[#D3126A]/55 bg-[#D3126A]/10 shadow-[0_0_24px_rgba(211,18,106,0.12)]"
                  : "border-white/10 bg-[#121212] hover:border-white/20 hover:bg-[#161616]"
              }`}
              data-testid={`outcome-${outcome.id}`}
              aria-pressed={isActive}
            >
              <div
                className={`mb-3.5 overflow-hidden rounded-lg border ${
                  isActive ? "border-[#D3126A]/40" : "border-white/10"
                }`}
              >
                <img
                  src={outcomeCardUrl(outcome.id)}
                  alt=""
                  className="h-14 w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <p className="text-base font-semibold text-white">{outcome.label}</p>
              <p className="mt-1.5 text-sm leading-snug text-white/50">{outcome.blurb}</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
