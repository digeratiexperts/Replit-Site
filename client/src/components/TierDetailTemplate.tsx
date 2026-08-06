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
  <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-900 mb-5">
    <span className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center">
      <Icon className="w-5 h-5 text-violet-600" />
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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">
        <section>
          <span className="inline-block px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-sm font-semibold mb-4">
            {config.heroBadge}
          </span>
          <p className="text-lg text-gray-700 leading-relaxed">{config.positioning}</p>
        </section>

        <section>
          <SectionHeading icon={Users}>Who It's For</SectionHeading>
          <ul className="space-y-3">
            {config.whoFor.map((item) => (
              <li key={item} className="flex items-start gap-3 text-gray-700">
                <CheckCircle className="w-5 h-5 text-violet-500 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <SectionHeading icon={Target}>What You Get</SectionHeading>
          <ul className="space-y-3">
            {config.outcomes.map((item) => (
              <li key={item} className="flex items-start gap-3 text-gray-700">
                <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <SectionHeading icon={Layers}>What's Included</SectionHeading>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
            {config.included.map((item) => (
              <div key={item} className="flex items-start gap-3 text-gray-700">
                <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
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
                <li key={item} className="flex items-start gap-3 text-gray-600">
                  <XCircle className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
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
                className="rounded-xl border border-violet-200 bg-violet-50/50 p-5"
              >
                <h3 className="font-semibold text-gray-900 mb-2">{addOn.label}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{addOn.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-gray-200 bg-gray-50 p-6">
          <SectionHeading icon={CalendarClock}>Reporting & Review Cadence</SectionHeading>
          <p className="text-gray-700 leading-relaxed">{config.reviewCadence}</p>
        </section>

        <section className="rounded-xl border border-violet-200 bg-gradient-to-br from-violet-50 to-purple-50 p-6">
          <SectionHeading icon={BadgeDollarSign}>Pricing</SectionHeading>
          <p className="text-gray-700 leading-relaxed mb-6">{config.pricingNote}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            {isExternalCta ? (
              <a href={config.ctaPrimary.href} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="w-full sm:w-auto bg-violet-600 hover:bg-violet-700">
                  {config.ctaPrimary.label}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
            ) : (
              <Link href={config.ctaPrimary.href}>
                <Button size="lg" className="w-full sm:w-auto bg-violet-600 hover:bg-violet-700">
                  {config.ctaPrimary.label}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            )}
            <Link href="/proactive-ecosystem-pricing">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
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
