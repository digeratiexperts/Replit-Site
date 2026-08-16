import { PageTemplate } from "@/components/PageTemplate";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";
import { Link } from "wouter";
import {
  CheckCircle,
  XCircle,
  Users,
  Target,
  Layers,
  PlusCircle,
  CalendarClock,
  BadgeDollarSign,
  ArrowRight,
} from "lucide-react";

export interface TierPageConfig {
  id: string;
  shortName: string;
  fullName: string;
  canonicalPath: string;
  seoTitle: string;
  seoDescription: string;
  heroBadge: string;
  tagline: string;
  positioning: string;
  whoFor: string[];
  outcomes: string[];
  included: string[];
  notIncluded?: string[];
  addOnsOrUpgrades: { label: string; desc: string }[];
  reviewCadence: string;
  pricingNote: string;
  ctaPrimary: { label: string; href: string };
}

const SectionHeading = ({
  icon: Icon,
  children,
}: {
  icon: typeof CheckCircle;
  children: React.ReactNode;
}) => (
  <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-5 tracking-tight">
    <span className="w-10 h-10 rounded-lg bg-pink-500/15 border border-pink-400/25 flex items-center justify-center">
      <Icon className="w-5 h-5 text-pink-300" />
    </span>
    {children}
  </h2>
);

export function TierDetailTemplate({ config }: { config: TierPageConfig }) {
  useSEO({
    title: config.seoTitle,
    description: config.seoDescription,
    canonical: config.canonicalPath,
  });

  const isExternalCta = config.ctaPrimary.href.startsWith("http");

  return (
    <PageTemplate
      title={config.fullName}
      subtitle={config.tagline}
      breadcrumbs={[
        { label: "Solutions", href: "/solutions" },
        { label: config.fullName },
      ]}
    >
      <div className="max-w-5xl mx-auto space-y-14">
        <section>
          <span className="inline-block px-3 py-1 rounded-full bg-pink-500/15 border border-pink-400/30 text-pink-200 text-sm font-semibold mb-4">
            {config.heroBadge}
          </span>
          <p className="text-lg text-white/85 leading-relaxed">{config.positioning}</p>
        </section>

        <section>
          <SectionHeading icon={Users}>Who It's For</SectionHeading>
          <ul className="space-y-3">
            {config.whoFor.map((item) => (
              <li key={item} className="flex items-start gap-3 text-white/85 leading-relaxed">
                <CheckCircle className="w-5 h-5 text-pink-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <SectionHeading icon={Target}>What You Get</SectionHeading>
          <ul className="space-y-3">
            {config.outcomes.map((item) => (
              <li key={item} className="flex items-start gap-3 text-white/85 leading-relaxed">
                <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <SectionHeading icon={Layers}>What's Included</SectionHeading>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
            {config.included.map((item) => (
              <div key={item} className="flex items-start gap-3 text-white/85 leading-relaxed">
                <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {config.notIncluded && config.notIncluded.length > 0 && (
          <section>
            <SectionHeading icon={XCircle}>Not Included at This Level</SectionHeading>
            <ul className="space-y-3">
              {config.notIncluded.map((item) => (
                <li key={item} className="flex items-start gap-3 text-white/70 leading-relaxed">
                  <XCircle className="w-5 h-5 text-white/55 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section>
          <SectionHeading icon={PlusCircle}>Add-Ons & Upgrades</SectionHeading>
          <div className="grid md:grid-cols-3 gap-5">
            {config.addOnsOrUpgrades.map((addOn) => (
              <div
                key={addOn.label}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-5 hover:border-pink-400/30 transition-colors"
              >
                <h3 className="font-semibold text-white mb-2">{addOn.label}</h3>
                <p className="text-sm text-white/75 leading-relaxed">{addOn.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
          <SectionHeading icon={CalendarClock}>Reporting & Review Cadence</SectionHeading>
          <p className="text-white/85 leading-relaxed">{config.reviewCadence}</p>
        </section>

        <section className="rounded-xl border border-pink-400/25 bg-de-raised p-6">
          <SectionHeading icon={BadgeDollarSign}>Pricing</SectionHeading>
          <p className="text-white/85 leading-relaxed mb-6">{config.pricingNote}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            {isExternalCta ? (
              <a href={config.ctaPrimary.href} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="brand" className="w-full sm:w-auto">
                  {config.ctaPrimary.label}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
            ) : (
              <Link href={config.ctaPrimary.href}>
                <Button size="lg" variant="brand" className="w-full sm:w-auto">
                  {config.ctaPrimary.label}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            )}
            <Link href="/proactive-ecosystem-pricing">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
              >
                Compare All Packages
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </PageTemplate>
  );
}

export default TierDetailTemplate;
