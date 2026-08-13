import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GitCompare, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice, type StoreProduct } from "@/data/storeProducts";
import { getOutcomeLead, getProductTags } from "@/data/storeMerchandising";

interface ProductCompareProps {
  selected: StoreProduct[];
  onToggle: (product: StoreProduct) => void;
  onClear: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const MAX_COMPARE = 4;

export function canAddToCompare(selected: StoreProduct[], product: StoreProduct): boolean {
  if (selected.some((p) => p.id === product.id)) return true;
  return selected.length < MAX_COMPARE;
}

export function ProductCompareBar({
  selected,
  onClear,
  onOpen,
}: {
  selected: StoreProduct[];
  onClear: () => void;
  onOpen: () => void;
}) {
  if (selected.length < 2) return null;
  return (
    <div
      className="de-bottom-bar z-40 flex items-center justify-center pointer-events-none"
      style={{
        bottom:
          "calc(var(--de-chrome-inset) + var(--de-cookie-h) + var(--de-unified-bar-h) + var(--de-sticky-cta-h) + 0.5rem)",
      }}
      data-testid="compare-bar"
    >
      <div className="pointer-events-auto flex items-center gap-3 rounded-full border border-white/15 bg-[#121212]/95 px-5 py-3 shadow-xl backdrop-blur">
      <GitCompare className="h-5 w-5 text-[#a78bfa]" />
      <span className="text-sm font-medium text-white">
        {selected.length} selected for compare
      </span>
      <Button
        size="sm"
        className="h-9 bg-[#5034ff] text-white hover:bg-[#6548ff]"
        onClick={onOpen}
        data-testid="button-open-compare"
      >
        Compare {selected.length}
      </Button>
      <Button
        size="sm"
        variant="ghost"
        className="h-9 text-white/60 hover:text-white"
        onClick={onClear}
        data-testid="button-clear-compare"
      >
        Clear
      </Button>
      </div>
    </div>
  );
}

export function ProductCompareDrawer({
  selected,
  open,
  onOpenChange,
}: Pick<ProductCompareProps, "selected" | "open" | "onOpenChange">) {
  const rows = useMemo(() => {
    if (selected.length === 0) return [];
    return Array.from(new Set(selected.flatMap((p) => p.features.slice(0, 8)))).slice(0, 10);
  }, [selected]);

  return (
    <AnimatePresence>
      {open && selected.length >= 2 && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
            onClick={() => onOpenChange(false)}
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed inset-x-0 bottom-0 z-[61] max-h-[88vh] overflow-hidden rounded-t-2xl border border-white/10 bg-[#0a0a0a]"
            data-testid="compare-drawer"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div>
                <h2 className="text-xl font-semibold text-white">Compare products</h2>
                <p className="text-sm text-white/50">
                  Capabilities, best-for, and pricing from the live catalog
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onOpenChange(false)}
                className="text-white/60"
                data-testid="button-close-compare"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="overflow-auto p-4 md:p-6">
              <table className="w-full min-w-[720px] border-collapse text-left">
                <thead>
                  <tr>
                    <th className="sticky left-0 bg-[#0a0a0a] p-3 text-sm font-medium text-white/50">
                      Attribute
                    </th>
                    {selected.map((p) => (
                      <th key={p.id} className="p-3 align-top">
                        <p className="text-base font-semibold text-white">{p.name}</p>
                        <p className="mt-1 text-sm text-[#a78bfa]">{formatPrice(p)}</p>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {getProductTags(p).map((t) => (
                            <span
                              key={t}
                              className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[11px] text-white/60"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-white/10">
                    <td className="sticky left-0 bg-[#0a0a0a] p-3 text-sm text-white/50">
                      Best for
                    </td>
                    {selected.map((p) => (
                      <td key={p.id} className="p-3 text-sm leading-relaxed text-white/75">
                        {getOutcomeLead(p)}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t border-white/10">
                    <td className="sticky left-0 bg-[#0a0a0a] p-3 text-sm text-white/50">
                      Billing
                    </td>
                    {selected.map((p) => (
                      <td key={p.id} className="p-3 text-sm text-white/75">
                        {formatPrice(p)}
                      </td>
                    ))}
                  </tr>
                  {rows.map((feature) => (
                    <tr key={feature} className="border-t border-white/10">
                      <td className="sticky left-0 bg-[#0a0a0a] p-3 text-sm text-white/50">
                        {feature}
                      </td>
                      {selected.map((p) => (
                        <td key={p.id} className="p-3 text-sm text-white/80">
                          {p.features.some((f) => f.toLowerCase() === feature.toLowerCase())
                            ? "✓"
                            : "—"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
