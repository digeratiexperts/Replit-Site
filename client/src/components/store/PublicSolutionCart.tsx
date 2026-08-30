import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { getFamilyById, offerForDelivery } from "@/lib/businessNeeds";
import { readSolutionCart, removeSolutionCartItem, SOLUTION_CART_EVENT, type PublicSolutionCartItem } from "@/lib/publicSolutionCart";

export function PublicSolutionCart() {
  const [items, setItems] = useState<PublicSolutionCartItem[]>([]);

  useEffect(() => {
    const refresh = () => setItems(readSolutionCart());
    refresh();
    window.addEventListener(SOLUTION_CART_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(SOLUTION_CART_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="fixed bottom-5 right-5 z-40 h-12 border-de-accent/45 bg-[#121212] px-4 text-white shadow-2xl hover:bg-[#181818]" data-testid="public-solution-cart">
          <ShoppingCart className="mr-2 h-5 w-5 text-de-accent-ink" />Your Solution
          {items.length > 0 && <span className="ml-2 rounded-full bg-de-accent px-2 py-0.5 text-xs font-bold text-white">{items.length}</span>}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[min(92vw,28rem)] border-white/10 bg-[#0d0d0d] text-white sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="text-2xl text-white">Your Solution</SheetTitle>
          <SheetDescription className="text-white/55">Review the curated lanes you want Digerati Experts to scope.</SheetDescription>
        </SheetHeader>
        <div className="mt-7 space-y-3">
          {items.length ? items.map((item) => {
            const family = getFamilyById(item.familyId);
            if (!family) return null;
            const offer = offerForDelivery(family, item.delivery);
            return <div key={item.familyId} className="rounded-xl border border-white/10 bg-[#151515] p-4">
              <div className="flex items-start justify-between gap-3"><div><h3 className="font-semibold text-white">{family.label}</h3><p className="mt-1 text-sm text-white/55">{offer.name}</p></div><button type="button" onClick={() => removeSolutionCartItem(item.familyId)} className="flex h-11 w-11 items-center justify-center rounded-lg text-white/50 hover:bg-white/5 hover:text-white" aria-label={`Remove ${family.label}`}><Trash2 className="h-4 w-4" /></button></div>
            </div>;
          }) : <div className="rounded-xl border border-dashed border-white/15 p-8 text-center"><ShoppingCart className="mx-auto h-7 w-7 text-white/30" /><p className="mt-3 text-white/60">Your Solution is empty.</p></div>}
        </div>
        {items.length ? (
          <Button asChild className="mt-6 h-12 w-full bg-[#D3126A] text-white hover:bg-[#b90f5d]">
            <Link href="/store/checkout">Review and continue</Link>
          </Button>
        ) : (
          <Button className="mt-6 h-12 w-full" disabled>Review and continue</Button>
        )}
        <p className="mt-3 text-xs leading-relaxed text-white/40">Checkout shows the correct next step for each solution. Complex managed services remain assessment or quote-first.</p>
      </SheetContent>
    </Sheet>
  );
}
