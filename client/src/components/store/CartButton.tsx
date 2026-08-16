import { Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";

export function CartButton() {
  const { getItemCount, toggleCart } = useCart();
  const itemCount = getItemCount();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative text-white/70 hover:bg-white/10 hover:text-white"
      onClick={toggleCart}
      data-testid="button-cart"
      aria-label={`Your solution with ${itemCount} services`}
      title="Your Solution"
    >
      <Layers className="h-5 w-5" />
      {itemCount > 0 && (
        <span
          className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-de-accent text-xs font-medium text-white"
          data-testid="cart-item-count"
        >
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      )}
    </Button>
  );
}

export default CartButton;
