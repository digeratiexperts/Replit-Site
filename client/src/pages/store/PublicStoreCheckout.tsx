import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, CheckCircle2, ClipboardCheck, ShieldCheck, Trash2 } from "lucide-react";
import { MegaMenu } from "@/components/MegaMenu";
import { DigeratiEnhancedFooterSection } from "@/pages/sections/DigeratiEnhancedFooterSection";
import { StorePageAtmosphere } from "@/components/store/StorePageAtmosphere";
import { Button } from "@/components/ui/button";
import { getFamilyById, offerForDelivery, requestPath } from "@/lib/businessNeeds";
import { readSolutionCart, removeSolutionCartItem, SOLUTION_CART_EVENT, type PublicSolutionCartItem } from "@/lib/publicSolutionCart";
import { useSEO } from "@/hooks/useSEO";

export default function PublicStoreCheckout() {
  const [items, setItems] = useState<PublicSolutionCartItem[]>([]);
  useSEO({ title: "Review Your Solution | Digerati Experts", description: "Review curated Digerati Experts solutions and continue to the correct quote, assessment, or checkout path.", canonical: "/store/checkout", noIndex: true });

  useEffect(() => {
    const refresh = () => setItems(readSolutionCart());
    refresh();
    window.addEventListener(SOLUTION_CART_EVENT, refresh);
    return () => window.removeEventListener(SOLUTION_CART_EVENT, refresh);
  }, []);

  const rows = useMemo(() => items.flatMap((item) => {
    const family = getFamilyById(item.familyId);
    return family ? [{ item, family, offer: offerForDelivery(family, item.delivery) }] : [];
  }), [items]);

  return <div className="relative min-h-screen overflow-hidden bg-[#0a0a0a]">
    <StorePageAtmosphere />
    <div className="relative z-10"><MegaMenu />
      <main className="de-nav-clear mx-auto max-w-6xl px-4 pb-28 sm:px-6 lg:px-8">
        <Link href="/store" className="mb-7 inline-flex min-h-11 items-center text-sm text-white/65 hover:text-white"><ArrowLeft className="mr-2 h-4 w-4" />Continue browsing</Link>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <section>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-de-accent-ink">Your Solution</p>
            <h1 className="mt-2 text-4xl font-bold text-white md:text-5xl">Review and continue</h1>
            <p className="mt-3 max-w-2xl text-lg text-white/65">This checkout keeps the useful cart and review flow without exposing DE’s private vendor catalog.</p>
            <div className="mt-8 space-y-4">
              {rows.length ? rows.map(({ item, family, offer }) => <article key={item.familyId} className="rounded-2xl border border-white/10 bg-[#121212] p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4"><div><p className="text-xs uppercase tracking-wide text-de-accent-ink">{item.delivery === "co_managed" ? "Works with internal IT" : "Managed by DE"}</p><h2 className="mt-2 text-xl font-semibold text-white">{family.label}</h2><p className="mt-2 text-sm leading-relaxed text-white/60">{offer.summary}</p></div><button type="button" onClick={() => removeSolutionCartItem(item.familyId)} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-white/45 hover:bg-white/5 hover:text-white" aria-label={`Remove ${family.label}`}><Trash2 className="h-4 w-4" /></button></div>
                <Button asChild variant="outline" className="mt-5 h-11 border-de-accent/35 text-de-accent-ink hover:bg-de-accent/10"><Link href={requestPath({ family: family.id, delivery: item.delivery, intent: "request" })}>Continue this solution<ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
              </article>) : <div className="rounded-2xl border border-dashed border-white/15 bg-[#121212] px-6 py-14 text-center"><ClipboardCheck className="mx-auto h-8 w-8 text-white/30" /><h2 className="mt-4 text-xl font-semibold text-white">Your Solution is empty</h2><Button asChild className="mt-5 bg-de-accent text-white"><Link href="/store">Browse solutions</Link></Button></div>}
            </div>
          </section>
          <aside className="h-fit rounded-2xl border border-white/10 bg-[#121212] p-6 lg:sticky lg:top-28">
            <ShieldCheck className="h-8 w-8 text-de-accent-ink" /><h2 className="mt-4 text-xl font-semibold text-white">The correct checkout path</h2><p className="mt-2 text-sm leading-relaxed text-white/55">Managed, security, and compliance work stays quote or assessment-first. Approved fixed-price products can use payment checkout when DE publishes them.</p>
            <ul className="mt-5 space-y-3 text-sm text-white/65">{["No public vendor or SKU exposure", "No misleading $0 pricing", "No Pay Now before eligibility is confirmed"].map((text) => <li key={text} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-de-accent-ink" />{text}</li>)}</ul>
          </aside>
        </div>
      </main><DigeratiEnhancedFooterSection /></div>
  </div>;
}
