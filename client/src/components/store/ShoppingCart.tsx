import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight, ChevronDown, Loader2, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart, isRecurringPricing } from "@/contexts/CartContext";
import { formatPrice } from "@/data/storeProducts";
import { Link, useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export function ShoppingCart() {
  const { items, isOpen, closeCart, removeFromCart, updateQuantity, getCartTotal, getSavings, clearCart } = useCart();
  const [isMinimized, setIsMinimized] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const total = getCartTotal();
  const hasRecurring = items.some((item) => isRecurringPricing(item.product.pricingType));
  const hasOneTime = items.some((item) => !isRecurringPricing(item.product.pricingType));

  const recurringTotal = items
    .filter((item) => isRecurringPricing(item.product.pricingType))
    .reduce((sum, item) => sum + item.product.basePrice * item.quantity, 0);

  const oneTimeTotal = items
    .filter((item) => !isRecurringPricing(item.product.pricingType))
    .reduce((sum, item) => sum + item.product.basePrice * item.quantity, 0);

  const savings = getSavings();

  const handleCheckout = async () => {
    if (items.length === 0) return;
    
    setIsCheckingOut(true);
    try {
      const lineItems = items.map(item => ({
        productId: item.product.id,
        sku: item.product.sku,
        name: item.product.name,
        quantity: item.quantity,
        unitPrice: item.clientPrice ?? item.product.basePrice,
        pricingType: item.product.pricingType,
      }));

      const response = await apiRequest("POST", "/api/store/checkout/stripe", { lineItems });
      const data = await response.json();

      if (data.url) {
        // Redirect to Stripe Checkout
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

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={closeCart}
            data-testid="cart-overlay"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0, height: isMinimized ? "auto" : "100%" }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`fixed right-0 ${isMinimized ? "bottom-0 top-auto rounded-tl-2xl" : "top-0"} w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-50 flex flex-col`}
            data-testid="shopping-cart-panel"
          >
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-violet-400" />
                <h2 className="text-xl font-semibold text-white">Your Cart</h2>
                <span className="text-white/50 text-sm">({items.length} items)</span>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleMinimize}
                  className="text-white/60 hover:text-white hover:bg-violet-500/10"
                  data-testid="button-minimize-cart"
                  title={isMinimized ? "Expand cart" : "Minimize cart"}
                >
                  <ChevronDown className={`w-5 h-5 transition-transform ${isMinimized ? "rotate-180" : ""}`} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={closeCart}
                  className="text-white/60 hover:text-white hover:bg-violet-500/10"
                  data-testid="button-close-cart"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {!isMinimized && (
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                    <ShoppingBag className="w-10 h-10 text-white/30" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">Your cart is empty</h3>
                  <p className="text-white/50 mb-6">Browse our products and add items to your cart.</p>
                  <Link href="/store/co-managed">
                    <Button
                      className="bg-violet-600 hover:bg-violet-500 text-white"
                      onClick={closeCart}
                      data-testid="button-browse-products"
                    >
                      Browse Products
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="p-4 rounded-lg bg-white/[0.03] border border-white/10"
                      data-testid={`cart-item-${item.product.id}`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white font-medium line-clamp-1">{item.product.name}</h4>
                          <p className="text-white/50 text-sm">{formatPrice(item.product)}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10 flex-shrink-0"
                          data-testid={`button-remove-${item.product.id}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            disabled={item.quantity <= item.product.minimumQuantity}
                            className="w-8 h-8 bg-violet-500/10 border-violet-500/30 text-white hover:bg-violet-500/20"
                            data-testid={`button-decrease-${item.product.id}`}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-10 text-center text-white font-medium" data-testid={`quantity-${item.product.id}`}>
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-8 h-8 bg-violet-500/10 border-violet-500/30 text-white hover:bg-violet-500/20"
                            data-testid={`button-increase-${item.product.id}`}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        <span className="text-violet-400 font-semibold">
                          ${(item.product.basePrice * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            )}

            {items.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-white/[0.02]">
                <div className="space-y-2 mb-4">
                  {hasRecurring && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/60">Recurring Total</span>
                      <span className="text-white">${recurringTotal.toFixed(2)}/mo</span>
                    </div>
                  )}
                  {hasOneTime && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/60">One-Time Total</span>
                      <span className="text-white">${oneTimeTotal.toFixed(2)}</span>
                    </div>
                  )}
                  {savings > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-emerald-400">You Save</span>
                      <span className="text-emerald-400 font-medium">-${savings.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <span className="text-white font-medium">Total</span>
                    <span className="text-violet-400 font-bold text-lg">${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    className="w-full bg-violet-600 hover:bg-violet-500 text-white disabled:opacity-50"
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    data-testid="button-checkout"
                  >
                    {isCheckingOut ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4 mr-2" />
                        Proceed to Checkout
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={clearCart}
                    className="w-full text-white/60 hover:text-white hover:bg-violet-500/10"
                    data-testid="button-clear-cart"
                  >
                    Clear Cart
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
