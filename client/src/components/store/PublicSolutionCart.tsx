import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { Layers, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { getFamilyById, offerForDelivery, SOLUTION_WORKSPACE_PATH } from "@/lib/businessNeeds";
import {
  readSolutionDraft,
  removeDraftNeed,
  SOLUTION_DRAFT_EVENT,
  type SolutionDraftNeed,
} from "@/lib/solutionDraft";
import { useDockHiddenWhileOpen } from "@/hooks/useDockHiddenWhileOpen";

function deliveryCopy(need: SolutionDraftNeed, preference: string): string {
  const delivery = need.delivery || preference;
  if (delivery === "co_managed") return "Work with your IT team";
  if (delivery === "standalone") return "DE manages this";
  if (delivery === "unsure") return "Help me decide";
  return "Delivery not chosen yet";
}

export function PublicSolutionCart() {
  const [needs, setNeeds] = useState<SolutionDraftNeed[]>([]);
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useDockHiddenWhileOpen(open);

  useEffect(() => {
    const refresh = () => setNeeds(readSolutionDraft().needs);
    refresh();
    window.addEventListener(SOLUTION_DRAFT_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(SOLUTION_DRAFT_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  // Publish this button's height so other fixed chrome (e.g. the Ask DE
  // callout) can stack above it instead of guessing an offset and overlapping.
  useEffect(() => {
    const root = document.documentElement;
    const el = triggerRef.current;
    if (!el) {
      root.style.setProperty("--de-store-cart-h", "0px");
      return;
    }
    const publish = () => root.style.setProperty("--de-store-cart-h", `${Math.round(el.offsetHeight)}px`);
    publish();
    const ro = new ResizeObserver(publish);
    ro.observe(el);
    return () => {
      ro.disconnect();
      root.style.setProperty("--de-store-cart-h", "0px");
    };
  }, []);

  const preference = typeof window === "undefined" ? "" : readSolutionDraft().deliveryPreference;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          ref={triggerRef}
          variant="outline"
          className="fixed z-40 h-12 border-de-accent/45 bg-[#121212] px-4 text-white shadow-2xl hover:bg-[#181818]"
          style={{
            right: "calc(var(--de-canvas-gutter) + var(--de-chrome-inset))",
            bottom:
              "calc(var(--de-chrome-inset) + var(--de-cookie-h, 0px) + var(--de-unified-bar-h, 0px) + 0.75rem)",
          }}
          data-testid="public-solution-cart"
        >
          <Layers className="mr-2 h-5 w-5 text-de-accent-ink" />Your Solution
          {needs.length > 0 && <span className="ml-2 rounded-full bg-de-accent px-2 py-0.5 text-xs font-bold text-white">{needs.length}</span>}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[min(92vw,28rem)] border-white/10 bg-[#0d0d0d] text-white sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="text-2xl text-white">Your Solution</SheetTitle>
          <SheetDescription className="text-white/55">Review the business needs you want Digerati Experts to scope together.</SheetDescription>
        </SheetHeader>
        <div className="mt-7 space-y-3">
          {needs.length ? needs.map((item) => {
            const family = getFamilyById(item.familyId);
            if (!family) return null;
            const delivery = item.delivery === "co_managed" || item.delivery === "standalone" ? item.delivery : null;
            const offer = delivery ? offerForDelivery(family, delivery) : null;
            return <div key={item.familyId} className="rounded-xl border border-white/10 bg-[#151515] p-4">
              <div className="flex items-start justify-between gap-3"><div><h3 className="font-semibold text-white">{family.label}</h3><p className="mt-1 text-sm text-white/55">{offer?.name ?? deliveryCopy(item, preference)}</p></div><button type="button" onClick={() => removeDraftNeed(item.familyId)} className="flex h-11 w-11 items-center justify-center rounded-lg text-white/50 hover:bg-white/5 hover:text-white" aria-label={`Remove ${family.label}`}><Trash2 className="h-4 w-4" /></button></div>
            </div>;
          }) : <div className="rounded-xl border border-dashed border-white/15 p-8 text-center"><Layers className="mx-auto h-7 w-7 text-white/30" /><p className="mt-3 text-white/60">Your Solution is empty.</p></div>}
        </div>
        {needs.length ? (
          <Button asChild className="mt-6 h-12 w-full bg-[#D3126A] text-white hover:bg-[#b90f5d]">
            <Link href={SOLUTION_WORKSPACE_PATH} onClick={() => setOpen(false)}>Review Your Solution</Link>
          </Button>
        ) : (
          <Button className="mt-6 h-12 w-full" disabled>Review Your Solution</Button>
        )}
        <p className="mt-3 text-xs leading-relaxed text-white/40">No payment is required. We'll confirm fit, scope, and pricing before you commit.</p>
      </SheetContent>
    </Sheet>
  );
}
