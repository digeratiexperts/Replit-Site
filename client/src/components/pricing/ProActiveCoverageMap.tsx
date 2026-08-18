import { TIER_ORDER, isTierLit, type CoverageTier } from "@/lib/proactiveCoverage";

const LAYERS: { id: CoverageTier; label: string; inset: number }[] = [
  { id: "enterprise", label: "Enterprise", inset: 8 },
  { id: "business", label: "Business", inset: 36 },
  { id: "office", label: "Office", inset: 64 },
  { id: "it", label: "IT", inset: 92 },
];

type ProActiveCoverageMapProps = {
  selected: CoverageTier;
  onSelect: (tier: CoverageTier) => void;
};

/**
 * Graphite coverage rings. Magenta marks the selected depth and every
 * layer it includes. Teal is reserved for the next unlit ring only.
 */
export function ProActiveCoverageMap({ selected, onSelect }: ProActiveCoverageMapProps) {
  return (
    <div className="de-style-box p-6 md:p-8" data-testid="proactive-coverage-map">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F04C97]">
            ProActive Coverage
          </p>
          <h2 className="mt-2 text-2xl font-bold text-white md:text-3xl">
            Select a package depth<span className="text-[#D3126A]">:</span>
          </h2>
          <p className="mt-2 max-w-xl text-sm text-white/55">
            Rings light from the core outward. IT is the operating baseline; Enterprise adds governance on top of
            Business.
          </p>
        </div>
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="ProActive package depth">
          {TIER_ORDER.map((tier) => {
            const active = selected === tier;
            return (
              <button
                key={tier}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => onSelect(tier)}
                className={`h-11 rounded-full border px-4 text-sm font-medium capitalize ${
                  active
                    ? "border-[#D3126A] bg-[#D3126A] text-white"
                    : "border-de-hairline bg-de-raised text-white/75 hover:border-white/25 hover:text-white"
                }`}
                data-testid={`coverage-select-${tier}`}
              >
                {tier}
              </button>
            );
          })}
        </div>
      </div>

      <svg
        viewBox="0 0 640 280"
        className="mx-auto h-auto w-full max-w-3xl"
        role="img"
        aria-label={`Coverage depth selected: ${selected}`}
      >
        {LAYERS.map((layer) => {
          const lit = isTierLit(selected, layer.id);
          const active = selected === layer.id;
          const nextUnlit = !lit && tierIndexSafe(layer.id) === tierIndexSafe(selected) + 1;
          const stroke = active ? "#D3126A" : lit ? "#8A8A8A" : nextUnlit ? "#2DD4BF" : "#2A2A2A";
          const fill = active ? "rgba(211,18,106,0.08)" : lit ? "#151217" : "#050312";
          return (
            <g key={layer.id}>
              <rect
                x={layer.inset}
                y={layer.inset * 0.55}
                width={640 - layer.inset * 2}
                height={280 - layer.inset * 1.1}
                rx={18}
                fill={fill}
                stroke={stroke}
                strokeWidth={active ? 2.5 : 1.25}
                className="cursor-pointer"
                onClick={() => onSelect(layer.id)}
              />
              <text
                x={640 - layer.inset - 12}
                y={layer.inset * 0.55 + 22}
                textAnchor="end"
                fill={active ? "#F7A8C8" : lit ? "#EDEDED" : "#6B6B6B"}
                fontSize="13"
                fontFamily="Space Grotesk, Inter, sans-serif"
                className="pointer-events-none"
              >
                {layer.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function tierIndexSafe(tier: CoverageTier): number {
  return TIER_ORDER.indexOf(tier);
}
