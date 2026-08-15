import { Link } from "wouter";
import { ArrowRight, Layers, Shield, Users, ClipboardCheck, GitBranch } from "lucide-react";
import { MegaMenu } from "@/components/MegaMenu";
import { DigeratiEnhancedFooterSection } from "@/pages/sections/DigeratiEnhancedFooterSection";
import { EcosystemProgression } from "@/components/EcosystemProgression";
import { IconWell } from "@/components/visual/IconWell";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/JsonLd";
import { CTA } from "@/lib/ctaCopy";
import { pricing, formatUserPrice, formatPrice, PRICING_SCOPE_NOTE } from "@/data/pricing";

const lifecycle = [
  { title: "Assessment", body: "Review identity, endpoints, email, backups, network, and operating reality — not a sales script." },
  { title: "Roadmap", body: "Match the operating model to the environment. If Office would need heavy modification, Business is the fit." },
  { title: "Implementation", body: "Documented credentials, owned by you. Controls, backup, and monitoring sized to the model." },
  { title: "Operations", body: "Day-to-day support, security operations where included, and reviews at the cadence of that tier." },
];

export default function ProActiveEcosystemPage() {
  useSEO({
    title: "ProActive Ecosystem",
    description:
      "Digerati Experts ProActive Ecosystem is the umbrella operating model: IT, Office, Business, and Enterprise. Cybersecurity-first managed IT matched to how your environment actually runs.",
    canonical: "/solutions/proactive-ecosystem",
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <MegaMenu />
      <ServiceJsonLd
        name="ProActive Ecosystem"
        description="Cybersecurity-first managed IT operating model with four fit-based tiers: IT, Office, Business, and Enterprise."
        url="/solutions/proactive-ecosystem"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Solutions", url: "/solutions" },
          { name: "ProActive Ecosystem", url: "/solutions/proactive-ecosystem" },
        ]}
      />

      <main className="de-nav-clear pb-20">
        <div className="mx-auto max-w-[var(--de-canvas)] px-4 sm:px-6 lg:px-8">
          <header className="mb-14 max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#FF477F]">
              Operating model
            </p>
            <h1 className="font-heading text-4xl font-semibold tracking-[-0.02em] text-white md:text-5xl">
              The ProActive Ecosystem
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-white/70">
              ProActive is the umbrella — not a single “Office package.” It is a cybersecurity-first
              managed IT operating model that progresses IT → Office → Business → Enterprise. Each
              tier is a fit for a different environment, not a merchandising rank.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/book">
                <Button className="h-12 bg-gradient-to-r from-fuchsia-600 via-pink-600 to-rose-500 px-6 font-semibold text-white">
                  {CTA.primary}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/proactive-ecosystem-pricing">
                <Button variant="outline" className="h-12 border-white/20 bg-white/5 px-6 font-semibold text-white hover:bg-white/10">
                  {CTA.secondary}
                </Button>
              </Link>
            </div>
          </header>

          <section className="mb-16 grid gap-6 md:grid-cols-3">
            {[
              { icon: Shield, title: "Cybersecurity-first IT", body: "Identity, endpoints, email, and recovery are designed in — not bolted on after a help-desk contract." },
              { icon: Layers, title: "One accountable model", body: "Support, workplace, security operations, and strategy sit in one operating relationship instead of a pile of vendors." },
              { icon: GitBranch, title: "Fit, not upsell theater", body: "We match users, devices, locations, infrastructure, compliance, and whether you need fully managed or co-managed coverage." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-[#151217] p-6">
                <IconWell icon={item.icon} size="sm" surface="dark" />
                <h2 className="mt-4 text-lg font-semibold text-white">{item.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{item.body}</p>
              </div>
            ))}
          </section>

          <section className="mb-16">
            <EcosystemProgression />
          </section>

          <section className="mb-16 grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="font-heading text-2xl font-semibold text-white">Capabilities added per tier</h2>
              <ul className="mt-6 space-y-4">
                <li className="text-sm leading-relaxed text-white/70">
                  <span className="font-semibold text-white">IT</span> — service desk, endpoint foundation, identity guidance, documented environment. Starts at {formatUserPrice("it")} ({formatPrice(pricing.it.monthlyMin)}/mo minimum).
                </li>
                <li className="text-sm leading-relaxed text-white/70">
                  <span className="font-semibold text-white">Office</span> — adds managed network, stronger identity/email hygiene, endpoint backup, annual technology + cyber review. Starts at {formatUserPrice("office")} ({formatPrice(pricing.office.monthlyMin)}/mo minimum).
                </li>
                <li className="text-sm leading-relaxed text-white/70">
                  <span className="font-semibold text-white">Business</span> — adds security operations / threat detection, awareness training, BCDR posture, compliance/risk reporting support, semi-annual reviews. Starts at {formatUserPrice("business")} ({formatPrice(pricing.business.monthlyMin)}/mo minimum).
                </li>
                <li className="text-sm leading-relaxed text-white/70">
                  <span className="font-semibold text-white">Enterprise</span> — adds unified posture reporting, deeper compliance reporting, custom BCDR architecture support, privileged access program elements, quarterly executive reviews. Starts at {formatUserPrice("enterprise")} ({formatPrice(pricing.enterprise.monthlyMin)}/mo minimum).
                </li>
              </ul>
              <p className="mt-4 text-xs text-white/40">{PRICING_SCOPE_NOTE}</p>
            </div>
            <div>
              <h2 className="font-heading text-2xl font-semibold text-white">How engagement works</h2>
              <ol className="mt-6 space-y-5">
                {lifecycle.map((step, i) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="font-mono text-xs font-semibold tracking-[0.16em] text-[#FF477F]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="font-semibold text-white">{step.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-white/60">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section className="mb-16 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-[#151217] p-6">
              <div className="flex items-center gap-3">
                <IconWell icon={ClipboardCheck} size="sm" surface="dark" />
                <h2 className="text-lg font-semibold text-white">Standalone vs ProActive</h2>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-white/65">
                Standalone services solve a specific gap — backup, UCaaS, awareness, a project —
                when a full operating relationship is not the right fit yet. ProActive is the
                ongoing model: one accountable partner for day-to-day IT and cybersecurity.
              </p>
              <Link href="/solutions/standalone-services">
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#FF477F]">
                  View standalone services
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#151217] p-6">
              <div className="flex items-center gap-3">
                <IconWell icon={Users} size="sm" surface="dark" />
                <h2 className="text-lg font-semibold text-white">Co-managed vs ProActive</h2>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-white/65">
                Co-managed extends an internal IT team with DE operations, security coverage, and
                escalation — you keep the team. Fully managed ProActive is for organizations that
                want Digerati to own the operating model end to end.
              </p>
              <Link href="/solutions/co-managed-it">
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#FF477F]">
                  See co-managed IT
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-[#151217] p-6 md:flex md:items-center md:justify-between md:gap-8 md:p-8">
            <div className="max-w-xl">
              <h2 className="text-xl font-semibold text-white">Compare capabilities and operating depth</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                The comparison matrix shows what is included at each tier — not which package is
                “highest” or “best.” Final scope is confirmed after a Cyber Risk Assessment.
              </p>
            </div>
            <Link href="/proactive-ecosystem-pricing">
              <span className="mt-4 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#D3126A] px-6 text-base font-semibold text-white hover:bg-[#e01874] md:mt-0">
                Compare all packages
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </section>
        </div>
      </main>
      <DigeratiEnhancedFooterSection />
    </div>
  );
}
