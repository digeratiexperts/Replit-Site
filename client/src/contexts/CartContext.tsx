import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import type { StoreProduct, PricingType } from "@/data/storeProducts";

export interface CartItem {
  product: StoreProduct;
  quantity: number;
  clientPrice?: number;
  originalPrice: number;
  hasClientDiscount: boolean;
}

interface ClientPricing {
  productId: string;
  customPrice: number;
  discountPercent: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: StoreProduct, quantity?: number, clientPrice?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getOriginalTotal: () => number;
  getSavings: () => number;
  getItemCount: () => number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  setClientPricing: (pricing: ClientPricing[]) => void;
  getItemPrice: (productId: string) => { price: number; hasDiscount: boolean };
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "digerati-store-cart";

const isRecurringPricing = (pricingType: PricingType): boolean => {
  return ["monthly", "yearly", "per_user", "per_endpoint", "per_device", "per_location", "per_seat"].includes(pricingType);
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [clientPricingMap, setClientPricingMap] = useState<Map<string, ClientPricing>>(new Map());

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          const migratedItems = parsed.map((item: any) => ({
            ...item,
            originalPrice: item.originalPrice ?? item.product.basePrice,
            hasClientDiscount: item.hasClientDiscount ?? false,
          }));
          setItems(migratedItems);
        }
      }
    } catch (e) {
      console.error("Failed to load cart from localStorage:", e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error("Failed to save cart to localStorage:", e);
    }
  }, [items]);

  const setClientPricing = useCallback((pricing: ClientPricing[]) => {
    const map = new Map<string, ClientPricing>();
    pricing.forEach((p) => map.set(p.productId, p));
    setClientPricingMap(map);
  }, []);

  const getItemPrice = useCallback(
    (productId: string): { price: number; hasDiscount: boolean } => {
      const pricing = clientPricingMap.get(productId);
      if (pricing) {
        return { price: pricing.customPrice, hasDiscount: true };
      }
      const item = items.find((i) => i.product.id === productId);
      return { price: item?.product.basePrice || 0, hasDiscount: false };
    },
    [clientPricingMap, items]
  );

  const addToCart = useCallback((product: StoreProduct, quantity: number = 1, clientPrice?: number) => {
    if (product.isContractOnly || !product.isCheckoutEnabled) {
      return;
    }

    const pricing = clientPricingMap.get(product.id);
    const effectiveClientPrice = clientPrice ?? pricing?.customPrice;
    const hasDiscount = !!effectiveClientPrice && effectiveClientPrice < product.basePrice;

    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { 
                ...item, 
                quantity: item.quantity + quantity,
                clientPrice: effectiveClientPrice,
                hasClientDiscount: hasDiscount,
              }
            : item
        );
      }
      return [...prev, { 
        product, 
        quantity: Math.max(quantity, product.minimumQuantity),
        clientPrice: effectiveClientPrice,
        originalPrice: product.basePrice,
        hasClientDiscount: hasDiscount,
      }];
    });
  }, [clientPricingMap]);

  const removeFromCart = useCallback((productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.product.id === productId) {
          const newQty = Math.max(quantity, item.product.minimumQuantity);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const getCartTotal = useCallback(() => {
    return items.reduce((total, item) => {
      const price = item.clientPrice ?? item.product.basePrice;
      return total + price * item.quantity;
    }, 0);
  }, [items]);

  const getOriginalTotal = useCallback(() => {
    return items.reduce((total, item) => {
      return total + item.originalPrice * item.quantity;
    }, 0);
  }, [items]);

  const getSavings = useCallback(() => {
    return getOriginalTotal() - getCartTotal();
  }, [getOriginalTotal, getCartTotal]);

  const getItemCount = useCallback(() => {
    return items.reduce((count, item) => count + item.quantity, 0);
  }, [items]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getOriginalTotal,
        getSavings,
        getItemCount,
        isOpen,
        openCart,
        closeCart,
        toggleCart,
        setClientPricing,
        getItemPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

export { isRecurringPricing };
