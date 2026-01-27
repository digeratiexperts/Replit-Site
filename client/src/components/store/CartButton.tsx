import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";

export function CartButton() {
  const { getItemCount, toggleCart } = useCart();
  const itemCount = getItemCount();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative text-white/70 hover:text-white hover:bg-white/10"
      onClick={toggleCart}
      data-testid="button-cart"
      aria-label={`Shopping cart with ${itemCount} items`}
    >
      <ShoppingCart className="w-5 h-5" />
      {itemCount > 0 && (
        <span
          className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-violet-500 text-white text-xs font-medium flex items-center justify-center"
          data-testid="cart-item-count"
        >
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      )}
    </Button>
  );
}

export default CartButton;
