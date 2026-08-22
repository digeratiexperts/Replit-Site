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
import { IconWell } from "@/components/visual/IconWell";
import { StatementHeading } from "@/components/visual/StatementHeading";
import { CTA } from "@/lib/ctaCopy";

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
  children: string;
}) => (
  <div className="mb-5 flex items-center gap-3">
    <IconWell icon={Icon} size="sm" surface="dark" />
    <StatementHeading as="h2" className="text-2xl">
      {children}
    </StatementHeading>
  </div>
);

export function TierDetailTemplate({ config }: { config: TierPageConfig }) {
  useSEO({
    title: config.seoTitle,
    description: config.seoDescription,
    canonical: config.canonicalPath,
  });

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
          <span className="mb-4 inline-block rounded-full border border-de-hairline bg-de-bg px-3 py-1 text-sm font-semibold text-de-accent-ink">
            {config.heroBadge}
          </span>
          <p className="text-lg text-white/85 leading-relaxed">{config.positioning}</p>
        </section>

        <section>
          <SectionHeading icon={Users}>Who It's For</SectionHeading>
          <ul className="space-y-3">
            {config.whoFor.map((item) => (
              <li key={item} className="flex items-start gap-3 text-white/85 leading-relaxed">
                <CheckCircle className="w-5 h-5 text-de-magenta-ink mt-0.5 flex-shrink-0" />
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
                className="de-interactive-card rounded-xl border border-de-hairline bg-de-raised p-5"
              >
                <h3 className="font-semibold text-white mb-2">{addOn.label}</h3>
                <p className="text-sm text-white/75 leading-relaxed">{addOn.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-de-hairline bg-de-raised p-6">
          <SectionHeading icon={CalendarClock}>Reporting & Review Cadence</SectionHeading>
          <p className="text-white/85 leading-relaxed">{config.reviewCadence}</p>
        </section>

        <section className="rounded-xl border border-de-hairline bg-de-raised p-6">
          <SectionHeading icon={BadgeDollarSign}>Pricing</SectionHeading>
          <p className="text-white/85 leading-relaxed mb-6">{config.pricingNote}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" variant="brand" className="w-full sm:w-auto">
              <Link href="/book">
                {CTA.primary}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full border-de-hairline bg-de-bg text-white hover:text-white sm:w-auto">
              <Link href="/proactive-ecosystem-pricing">{CTA.secondary}</Link>
            </Button>
          </div>
        </section>
      </div>
    </PageTemplate>
  );
}

export default TierDetailTemplate;
