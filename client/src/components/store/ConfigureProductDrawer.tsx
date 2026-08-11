import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Minus, Phone, Plus, Settings2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatPrice, type StoreProduct } from "@/data/storeProducts";
import {
  configUnitLabel,
  getIncludedInHint,
  getOutcomeLead,
  getProductBySku,
  getProductRelationships,
} from "@/data/storeMerchandising";
import { ProductMedia } from "@/components/store/ProductMedia";

interface ConfigureProductDrawerProps {
  product: StoreProduct | null;
  unitPrice: number;
  open: boolean;
  onClose: () => void;
  onConfirm: (product: StoreProduct, quantity: number, unitPrice: number) => void;
}

export function ConfigureProductDrawer({
  product,
  unitPrice,
  open,
  onClose,
  onConfirm,
}: ConfigureProductDrawerProps) {
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (product) {
      setQty(Math.max(product.minimumQuantity || 1, 1));
    }
  }, [product]);

  if (!product) return null;

  const unit = configUnitLabel(product);
  const lineTotal = unitPrice * qty;
  const isRecurring = !["one_time", "per_hour"].includes(product.pricingType);
  const includedHint = getIncludedInHint(product.sku);
  const relationships = getProductRelationships(product.sku);
  const upgradeName = relationships?.upgradeTo?.[0]
    ? getProductBySku(relationships.upgradeTo[0])?.name
    : undefined;
  const worksWithNames = (relationships?.worksWith || [])
    .map((sku) => getProductBySku(sku)?.name)
    .filter(Boolean)
    .slice(0, 3) as string[];

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            data-testid="configure-drawer-overlay"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="fixed right-0 top-0 z-[61] flex h-full w-full max-w-md flex-col border-l border-white/10 bg-[#0a0a0a]"
            data-testid="configure-product-drawer"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#5034ff]/30 bg-[#5034ff]/15">
                  <Settings2 className="h-5 w-5 text-[#a78bfa]" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">Configure</h2>
                  <p className="text-sm text-white/50">
                    Set {unit}, review fit, then add to your solution
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-white/60 hover:bg-white/5 hover:text-white"
                data-testid="button-close-configure"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto p-6">
              <div className="flex gap-4">
                <ProductMedia
                  product={product}
                  variant="thumb"
                  className="h-20 w-20 flex-shrink-0"
                />
                <div className="min-w-0">
                  <h3 className="text-xl font-semibold text-white">{product.name}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/65">
                    {getOutcomeLead(product)}
                  </p>
                  <p className="mt-2 text-sm text-white/45">{formatPrice(product)}</p>
                </div>
              </div>

              {product.features.length > 0 && (
                <div className="rounded-xl border border-white/10 bg-[#141414] p-4">
                  <p className="mb-3 text-sm font-medium text-white/70">What you get</p>
                  <ul className="space-y-2">
                    {product.features.slice(0, 4).map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-white/60">
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#a78bfa]" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {(includedHint || worksWithNames.length > 0 || upgradeName) && (
                <div className="space-y-1.5 text-sm text-white/50">
                  {includedHint && (
                    <p className="text-[#a78bfa]/90" data-testid="configure-included-hint">
                      {includedHint}
                    </p>
                  )}
                  {worksWithNames.length > 0 && (
                    <p>Works with: {worksWithNames.join(", ")}</p>
                  )}
                  {upgradeName && <p>Upgrade path: {upgradeName}</p>}
                </div>
              )}

              <div className="rounded-xl border border-white/10 bg-[#141414] p-5">
                <label className="mb-3 block text-sm font-medium text-white/70">
                  Number of {unit}
                </label>
                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-11 w-11 border-white/15 bg-transparent text-white"
                    onClick={() => setQty((q) => Math.max(product.minimumQuantity || 1, q - 1))}
                    disabled={qty <= (product.minimumQuantity || 1)}
                    data-testid="button-configure-decrease"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    min={product.minimumQuantity || 1}
                    value={qty}
                    onChange={(e) => {
                      const n = parseInt(e.target.value, 10);
                      if (!Number.isFinite(n)) return;
                      setQty(Math.max(product.minimumQuantity || 1, n));
                    }}
                    className="h-11 border-white/15 bg-[#0a0a0a] text-center text-lg text-white"
                    data-testid="input-configure-qty"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-11 w-11 border-white/15 bg-transparent text-white"
                    onClick={() => setQty((q) => q + 1)}
                    data-testid="button-configure-increase"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <p className="mt-3 text-sm text-white/45">
                  Minimum {product.minimumQuantity || 1} {unit}
                </p>
              </div>

              <div className="rounded-xl border border-[#5034ff]/25 bg-[#5034ff]/10 p-5">
                <p className="text-sm text-white/60">
                  {qty} × ${unitPrice.toFixed(2)}
                  {isRecurring ? " / mo" : ""}
                </p>
                <p className="mt-1 text-3xl font-bold text-white" data-testid="text-configure-total">
                  ${lineTotal.toFixed(2)}
                  {isRecurring ? (
                    <span className="text-lg font-medium text-white/50">/mo</span>
                  ) : null}
                </p>
              </div>
            </div>

            <div className="space-y-3 border-t border-white/10 p-6">
              <Button
                className="h-12 w-full bg-[#5034ff] text-base text-white hover:bg-[#6548ff]"
                onClick={() => onConfirm(product, qty, unitPrice)}
                data-testid="button-add-configured"
              >
                Add configured service
              </Button>
              <a
                href="tel:325-480-9870"
                className="flex h-11 w-full items-center justify-center gap-2 rounded-md border border-white/15 text-sm text-white/75 transition-colors hover:bg-white/5 hover:text-white"
                data-testid="link-configure-call"
              >
                <Phone className="h-4 w-4" />
                Need help sizing? 325-480-9870
              </a>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
