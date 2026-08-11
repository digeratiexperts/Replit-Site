import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Minus,
  Plus,
  Trash2,
  Layers,
  ArrowRight,
  ChevronDown,
  Loader2,
  CreditCard,
  Calendar,
  FileText,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart, isRecurringPricing } from "@/contexts/CartContext";
import { formatPrice } from "@/data/storeProducts";
import { solutionGroupFor, getCartComplements } from "@/data/storeMerchandising";
import { Link, useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { CoverageScorePanel } from "@/components/store/CoverageScorePanel";

export function ShoppingCart() {
  const {
    items,
    isOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    getSavings,
    clearCart,
    addToCart,
  } = useCart();
  const [isMinimized, setIsMinimized] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const total = getCartTotal();
  const hasRecurring = items.some((item) => isRecurringPricing(item.product.pricingType));
  const hasOneTime = items.some((item) => !isRecurringPricing(item.product.pricingType));

  const recurringTotal = items
    .filter((item) => isRecurringPricing(item.product.pricingType))
    .reduce(
      (sum, item) => sum + (item.clientPrice ?? item.product.basePrice) * item.quantity,
      0
    );

  const oneTimeTotal = items
    .filter((item) => !isRecurringPricing(item.product.pricingType))
    .reduce(
      (sum, item) => sum + (item.clientPrice ?? item.product.basePrice) * item.quantity,
      0
    );

  const savings = getSavings();

  const cartProducts = useMemo(() => items.map((i) => i.product), [items]);
  const complements = useMemo(() => getCartComplements(cartProducts, { limit: 3 }), [cartProducts]);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof items>();
    for (const item of items) {
      const group = solutionGroupFor(item.product);
      const list = map.get(group) || [];
      list.push(item);
      map.set(group, list);
    }
    return Array.from(map.entries());
  }, [items]);

  const handleCheckout = async () => {
    if (items.length === 0) return;

    setIsCheckingOut(true);
    try {
      const lineItems = items.map((item) => ({
        productId: item.product.id,
        sku: item.product.sku,
        name: item.product.name,
        quantity: item.quantity,
        unitPrice: item.clientPrice ?? item.product.basePrice,
        pricingType: item.product.pricingType,
      }));

      const response = await apiRequest("POST", "/api/store/checkout/zoho", { lineItems });
      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else if (data.error) {
        toast({
          title: "Checkout Error",
          description: data.error,
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("Checkout error:", error);
      toast({
        title: "Checkout Failed",
        description: error.message || "Unable to initiate checkout. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCheckingOut(false);
    }
  };

  const goQuote = () => {
    closeCart();
    setLocation("/store/checkout");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={closeCart}
            data-testid="cart-overlay"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0, height: isMinimized ? "auto" : "100%" }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`fixed right-0 z-50 flex w-full max-w-md flex-col border-l border-white/10 bg-[#0a0a0a] ${
              isMinimized ? "bottom-0 top-auto rounded-tl-2xl" : "top-0"
            }`}
            data-testid="shopping-cart-panel"
          >
            <div className="flex items-center justify-between border-b border-white/10 p-6">
              <div className="flex items-center gap-3">
                <Layers className="h-5 w-5 text-[#a78bfa]" />
                <div>
                  <h2 className="text-xl font-semibold text-white">Your Solution</h2>
                  <span className="text-sm text-white/50">
                    {items.length} service{items.length === 1 ? "" : "s"}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-white/60 hover:bg-[#5034ff]/10 hover:text-white"
                  data-testid="button-minimize-cart"
                  title={isMinimized ? "Expand solution" : "Minimize"}
                >
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${isMinimized ? "rotate-180" : ""}`}
                  />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={closeCart}
                  className="text-white/60 hover:bg-[#5034ff]/10 hover:text-white"
                  data-testid="button-close-cart"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {!isMinimized && (
              <div className="flex-1 space-y-5 overflow-y-auto p-6">
                {items.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/5">
                      <Layers className="h-10 w-10 text-white/30" />
                    </div>
                    <h3 className="mb-2 text-lg font-medium text-white">No services yet</h3>
                    <p className="mb-6 text-white/50">
                      Build a solution from outcomes, rails, or the catalog.
                    </p>
                    <Link href="/store/co-managed">
                      <Button
                        className="bg-[#5034ff] text-white hover:bg-[#6548ff]"
                        onClick={closeCart}
                        data-testid="button-browse-products"
                      >
                        Browse Products
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <>
                    <CoverageScorePanel
                      products={cartProducts}
                      onAddSuggestion={(product) => {
                        addToCart(product, Math.max(1, product.minimumQuantity), product.basePrice);
                        toast({
                          title: "Added to solution",
                          description: product.name,
                        });
                      }}
                    />

                    {grouped.map(([group, groupItems]) => (
                      <div key={group}>
                        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/45">
                          {group}
                        </h3>
                        <div className="space-y-3">
                          {groupItems.map((item) => (
                            <div
                              key={item.product.id}
                              className="rounded-lg border border-white/10 bg-white/[0.03] p-4"
                              data-testid={`cart-item-${item.product.id}`}
                            >
                              <div className="mb-3 flex items-start justify-between gap-3">
                                <div className="min-w-0 flex-1">
                                  <h4 className="line-clamp-1 font-medium text-white">
                                    {item.product.name}
                                  </h4>
                                  <p className="truncate text-[11px] text-white/35">
                                    {item.product.sku}
                                  </p>
                                  <p className="text-sm text-white/50">
                                    {formatPrice(item.product)}
                                  </p>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => removeFromCart(item.product.id)}
                                  className="flex-shrink-0 text-red-400 hover:bg-red-500/10 hover:text-red-300"
                                  data-testid={`button-remove-${item.product.id}`}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() =>
                                      updateQuantity(item.product.id, item.quantity - 1)
                                    }
                                    disabled={item.quantity <= item.product.minimumQuantity}
                                    className="h-8 w-8 border-[#5034ff]/30 bg-[#5034ff]/10 text-white hover:bg-[#5034ff]/20"
                                    data-testid={`button-decrease-${item.product.id}`}
                                  >
                                    <Minus className="h-3 w-3" />
                                  </Button>
                                  <span
                                    className="w-10 text-center font-medium text-white"
                                    data-testid={`quantity-${item.product.id}`}
                                  >
                                    {item.quantity}
                                  </span>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() =>
                                      updateQuantity(item.product.id, item.quantity + 1)
                                    }
                                    className="h-8 w-8 border-[#5034ff]/30 bg-[#5034ff]/10 text-white hover:bg-[#5034ff]/20"
                                    data-testid={`button-increase-${item.product.id}`}
                                  >
                                    <Plus className="h-3 w-3" />
                                  </Button>
                                </div>
                                <span className="font-semibold text-[#a78bfa]">
                                  $
                                  {(
                                    (item.clientPrice ?? item.product.basePrice) * item.quantity
                                  ).toFixed(2)}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}

                    {complements.length > 0 && (
                      <div
                        className="rounded-xl border border-white/10 bg-white/[0.02] p-4"
                        data-testid="cart-complements"
                      >
                        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-white/45">
                          Works with your stack
                        </p>
                        <div className="space-y-2">
                          {complements.map((product) => (
                            <div
                              key={product.sku}
                              className="flex items-center justify-between gap-2"
                            >
                              <div className="min-w-0">
                                <p className="truncate text-sm text-white">{product.name}</p>
                                <p className="text-xs text-white/40">{formatPrice(product)}</p>
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 shrink-0 border-white/15 bg-transparent text-xs text-white hover:bg-white/5"
                                onClick={() => {
                                  addToCart(
                                    product,
                                    Math.max(1, product.minimumQuantity),
                                    product.basePrice
                                  );
                                  toast({
                                    title: "Added to solution",
                                    description: product.name,
                                  });
                                }}
                                data-testid={`button-complement-${product.id}`}
                              >
                                Add
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <p className="text-xs text-white/40">
                      Estimated onboarding: typically 7–10 business days after kickoff (varies by
                      stack). Questions?{" "}
                      <a
                        href="tel:3254809870"
                        className="inline-flex items-center gap-1 text-[#a78bfa] hover:text-[#c4b5fd]"
                      >
                        <Phone className="h-3 w-3" />
                        325-480-9870
                      </a>
                    </p>
                  </>
                )}
              </div>
            )}

            {items.length > 0 && (
              <div className="border-t border-white/10 bg-white/[0.02] p-6">
                <div className="mb-4 space-y-2">
                  {hasRecurring && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/60">Recurring</span>
                      <span className="text-white">${recurringTotal.toFixed(2)}/mo</span>
                    </div>
                  )}
                  {hasOneTime && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/60">One-time</span>
                      <span className="text-white">${oneTimeTotal.toFixed(2)}</span>
                    </div>
                  )}
                  {savings > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-emerald-400">You save</span>
                      <span className="font-medium text-emerald-400">-${savings.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between border-t border-white/10 pt-2">
                    <span className="font-medium text-white">Solution total</span>
                    <span className="text-lg font-bold text-[#a78bfa]">${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <Button
                    className="w-full bg-[#5034ff] text-white hover:bg-[#6548ff] disabled:opacity-50"
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    data-testid="button-checkout"
                  >
                    {isCheckingOut ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="mr-2 h-4 w-4" />
                        Checkout
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-white/15 bg-transparent text-white hover:bg-white/5"
                    onClick={goQuote}
                    data-testid="button-save-quote"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Save / email quote
                  </Button>
                  <a href="/book" className="block" onClick={closeCart}>
                    <Button
                      variant="ghost"
                      className="w-full text-white/70 hover:bg-[#5034ff]/10 hover:text-white"
                      data-testid="button-schedule-from-cart"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule consultation
                    </Button>
                  </a>
                  <Button
                    variant="ghost"
                    onClick={clearCart}
                    className="w-full text-white/50 hover:bg-white/5 hover:text-white"
                    data-testid="button-clear-cart"
                  >
                    Clear solution
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default ShoppingCart;
