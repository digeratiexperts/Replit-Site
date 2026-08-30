import { useMemo, useState } from "react";
import { Link } from "wouter";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Briefcase, CheckCircle2, Eye, FileText, GraduationCap, HardDrive, Headphones, KeyRound, LockKeyhole, Mail, Network, Phone, RefreshCw, Search, Server, Shield, ShieldAlert, ShoppingCart } from "lucide-react";
import { MegaMenu } from "@/components/MegaMenu";
import { DigeratiEnhancedFooterSection } from "@/pages/sections/DigeratiEnhancedFooterSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StorePageAtmosphere } from "@/components/store/StorePageAtmosphere";
import { PublicSolutionCart } from "@/components/store/PublicSolutionCart";
import { useSEO } from "@/hooks/useSEO";
import { curatedSolutionFamilies, type CuratedSolutionFamily } from "@/data/curatedSolutions";
import { familyPath } from "@/lib/businessNeeds";
import { PORTAL_LOGIN } from "@/lib/portalUrls";
import { addSolutionCartItem } from "@/lib/publicSolutionCart";
import { useToast } from "@/hooks/use-toast";

const FAMILY_ICONS: Record<CuratedSolutionFamily["id"], typeof Shield> = {
  it_operations: Headphones,
  endpoint_devices: Server,
  identity_access: KeyRound,
  email_collaboration: Mail,
  cybersecurity_operations: Shield,
  network_connectivity: Network,
  backup_continuity: RefreshCw,
  compliance_risk: FileText,
  security_awareness: GraduationCap,
  business_communications: Phone,
  hardware_lifecycle: HardDrive,
  documentation_standards: Briefcase,
  technology_strategy: ShieldAlert,
};

const FAMILY_ACCENTS: Record<CuratedSolutionFamily["id"], string> = {
  it_operations: "text-amber-300",
  endpoint_devices: "text-violet-300",
  identity_access: "text-purple-300",
  email_collaboration: "text-cyan-300",
  cybersecurity_operations: "text-sky-300",
  network_connectivity: "text-green-300",
  backup_continuity: "text-emerald-300",
  compliance_risk: "text-orange-300",
  security_awareness: "text-rose-300",
  business_communications: "text-red-300",
  hardware_lifecycle: "text-blue-300",
  documentation_standards: "text-indigo-300",
  technology_strategy: "text-pink-300",
};

export default function BusinessNeedsIndex() {
  const prefersReducedMotion = useReducedMotion();
  const [query, setQuery] = useState("");
  const { toast } = useToast();

  useSEO({
    title: "IT Solutions Store | Digerati Experts",
    description: "Browse curated Digerati Experts technology and cybersecurity solutions by business need.",
    canonical: "/store",
  });

  const families = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return curatedSolutionFamilies;
    return curatedSolutionFamilies.filter((family) =>
      [family.label, family.description, ...family.offers.flatMap((offer) => [offer.name, offer.summary, ...offer.outcomes, ...offer.includes])]
        .join(" ")
        .toLowerCase()
        .includes(needle),
    );
  }, [query]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0a0a]">
      <StorePageAtmosphere />
      <div className="relative z-10">
        <MegaMenu />
        <main className="de-nav-clear pb-24">
          <div className="mx-auto max-w-[var(--de-canvas)] px-4 sm:px-6 lg:px-8">
            <header className="grid gap-8 pb-10 pt-2 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
              <motion.div initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-de-accent/30 bg-de-accent/10 px-4 py-2">
                  <Shield className="h-4 w-4 text-de-accent-ink" aria-hidden="true" />
                  <span className="text-sm font-medium text-de-accent-ink">Digerati Experts Store</span>
                </div>
                <h1 className="max-w-4xl text-[clamp(2.5rem,6vw,4.75rem)] font-bold leading-[1.02] tracking-[-0.04em] text-white" data-testid="heading-business-needs">
                  Start with what your business needs to <span className="text-de-accent-ink">solve.</span>
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/70 md:text-xl">
                  Browse complete DE solutions by outcome without an email address. We choose and manage the technology behind each solution, so you never have to compare a public wall of manufacturers and product codes.
                </p>
              </motion.div>
              <aside className="rounded-2xl border border-white/10 bg-[#121212]/95 p-5">
                <div className="flex gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-de-accent/25 bg-de-accent/10">
                    <LockKeyhole className="h-5 w-5 text-de-accent-ink" aria-hidden="true" />
                  </span>
                  <div>
                    <h2 className="font-semibold text-white">Client or DE staff?</h2>
                    <p className="mt-1 text-sm text-white/55">Sign in for approved purchasing, client pricing, and the private catalog.</p>
                  </div>
                </div>
                <Button asChild variant="outline" className="mt-5 h-11 w-full border-de-accent/40 bg-transparent text-de-accent-ink hover:bg-de-accent/10">
                  <a href={PORTAL_LOGIN}>Open Client Marketplace</a>
                </Button>
              </aside>
            </header>

            <section className="mb-12 grid gap-4 rounded-2xl border border-white/10 bg-[#121212]/90 p-5 sm:grid-cols-3 sm:p-6" aria-label="How the Store works">
              {[
                ["1", "Choose a business need", "Start with the outcome, not a manufacturer."],
                ["2", "Build Your Solution", "Choose the delivery approach and approved options."],
                ["3", "Review and continue", "Use the cart to request a quote, assessment, or eligible checkout."],
              ].map(([number, title, body]) => (
                <div key={number} className="flex gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-de-accent/30 bg-de-accent/10 font-mono text-sm text-de-accent-ink">{number}</span>
                  <div><h2 className="font-semibold text-white">{title}</h2><p className="mt-1 text-sm leading-relaxed text-white/50">{body}</p></div>
                </div>
              ))}
            </section>

            <section aria-labelledby="curated-solutions-heading">
              <div className="mb-7 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-de-accent-ink">Curated solution lanes</p>
                  <h2 id="curated-solutions-heading" className="mt-2 text-3xl font-bold text-white md:text-4xl">Everything DE offers, organized by use case</h2>
                </div>
                <label className="relative block w-full md:w-80">
                  <span className="sr-only">Search solutions</span>
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" aria-hidden="true" />
                  <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search business needs" className="h-12 border-white/15 bg-[#121212] pl-12 text-white placeholder:text-white/35" />
                </label>
              </div>

              {families.length ? (
                <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3" data-testid="business-needs-families">
                  {families.map((family) => {
                    const Icon = FAMILY_ICONS[family.id];
                    return (
                      <li key={family.id}>
                        <article className="group flex h-full min-h-[22rem] flex-col overflow-hidden rounded-2xl border border-black/10 bg-[#FAF9F6] text-[#1A1228] transition-all duration-300 hover:-translate-y-1.5 hover:border-de-accent/50 hover:bg-white hover:shadow-[0_20px_50px_rgba(0,0,0,0.25)]" data-testid={`family-card-${family.id}`}>
                          <Link href={familyPath(family.id)} className="relative flex h-32 items-end overflow-hidden border-b border-black/10 bg-[#181520] p-5">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(29,111,242,0.28),transparent_52%)]" aria-hidden="true" />
                            <span className={`absolute left-3 top-3 rounded-full bg-[#181520]/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm ${FAMILY_ACCENTS[family.id]}`}>Curated DE solution</span>
                            <span className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-de-accent/30 bg-de-accent/10"><Icon className="h-6 w-6 text-de-accent-ink" aria-hidden="true" /></span>
                          </Link>
                          <div className="flex flex-1 flex-col p-5">
                            <Link href={familyPath(family.id)}><h3 className="text-lg font-bold leading-snug text-[#1A1228] transition-colors group-hover:text-de-accent">{family.label}</h3></Link>
                            <p className="mt-2 text-sm font-medium leading-relaxed text-[#4A4556]">{family.description}</p>
                            <ul className="mt-4 space-y-2">
                              {(family.offers[0]?.outcomes ?? []).slice(0, 2).map((outcome) => <li key={outcome} className="flex gap-2 text-xs text-[#4A4556]"><CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-de-accent" aria-hidden="true" />{outcome}</li>)}
                            </ul>
                            <div className="mt-auto flex gap-2 border-t border-black/10 pt-4">
                              <Button asChild variant="outline" size="sm" className="h-10 flex-1 border-black/15 bg-white text-xs font-semibold text-[#1A1228] hover:bg-black/5"><Link href={familyPath(family.id)}><Eye className="mr-1 h-3.5 w-3.5" />Details</Link></Button>
                              <Button size="sm" className="h-10 flex-1 bg-de-accent text-xs font-bold text-white hover:bg-[#6548ff]" onClick={() => { addSolutionCartItem({ familyId: family.id, delivery: "standalone" }); toast({ title: "Added to Your Solution", description: `${family.label} is ready to configure.` }); }}><ShoppingCart className="mr-1 h-3.5 w-3.5" />Add</Button>
                            </div>
                          </div>
                        </article>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className="rounded-2xl border border-white/10 bg-[#121212] px-6 py-14 text-center" role="status">
                  <Search className="mx-auto h-8 w-8 text-white/30" aria-hidden="true" /><h3 className="mt-4 text-xl font-semibold text-white">No matching solution</h3><Button variant="outline" className="mt-5 border-white/20 text-white" onClick={() => setQuery("")}>Clear search</Button>
                </div>
              )}
            </section>
          </div>
        </main>
        <PublicSolutionCart />
        <DigeratiEnhancedFooterSection />
      </div>
    </div>
  );
}
