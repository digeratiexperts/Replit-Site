import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, Settings2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatPrice, type StoreProduct } from "@/data/storeProducts";
import { configUnitLabel, getOutcomeLead } from "@/data/storeMerchandising";

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
                  <p className="text-sm text-white/50">Set quantity, then add to your solution</p>
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
              <div>
                <h3 className="text-xl font-semibold text-white">{product.name}</h3>
                <p className="mt-2 text-base leading-relaxed text-white/65">
                  {getOutcomeLead(product)}
                </p>
                <p className="mt-3 text-sm text-white/45">{formatPrice(product)}</p>
              </div>

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

            <div className="border-t border-white/10 p-6">
              <Button
                className="h-12 w-full bg-[#5034ff] text-base text-white hover:bg-[#6548ff]"
                onClick={() => onConfirm(product, qty, unitPrice)}
                data-testid="button-add-configured"
              >
                Add configured service
              </Button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
