import { Link } from "wouter";
import { ArrowRight, Building2, Calculator, Heart, Home, PawPrint, Scale, Stethoscope, Users } from "lucide-react";
import { PageTemplate } from "@/components/PageTemplate";
import { useSEO } from "@/hooks/useSEO";
import { CTA } from "@/lib/ctaCopy";
import { Button } from "@/components/ui/button";

const industries = [
  {
    name: "Healthcare",
    href: "/industries/healthcare",
    description: "HIPAA-aligned operations, patient data protection, and insurance-ready controls.",
    icon: Stethoscope,
  },
  {
    name: "Law Firms",
    href: "/industries/law-firms",
    description: "Client privilege, ABA expectations, and secure collaboration for matters.",
    icon: Scale,
  },
  {
    name: "Accounting & Finance",
    href: "/industries/accounting-finance",
    description: "Tax-season resilience, IRS/FTC readiness, and locked-down financial data.",
    icon: Calculator,
  },
  {
    name: "Real Estate",
    href: "/industries/real-estate",
    description: "Wire-fraud defenses and transaction security for brokerages and teams.",
    icon: Home,
  },
  {
    name: "Nonprofits",
    href: "/industries/nonprofits",
    description: "Right-sized IT and security for mission-driven organizations.",
    icon: Heart,
  },
  {
    name: "Professional Services",
    href: "/industries/professional-services",
    description: "Client data protection and reliable operations for service firms.",
    icon: Building2,
  },
  {
    name: "Animal Hospitals",
    href: "/industries/animal-hospitals",
    description: "Practice systems, client records, and veterinary workflow continuity.",
    icon: PawPrint,
  },
];

export default function IndustriesIndex() {
  useSEO({
    title: "Industries We Serve",
    description:
      "Industry-specific managed IT and cybersecurity for Arizona healthcare, law, accounting, real estate, nonprofits, and professional services.",
    canonical: "/industries",
  });

  return (
    <PageTemplate
      title="Industries We Serve"
      subtitle="Security-first IT shaped around how your practice, firm, or organization actually works."
      breadcrumbs={[{ label: "Industries" }]}
      actions={
        <Button asChild variant="brand" size="lg">
          <Link href="/book">{CTA.primary}</Link>
        </Button>
      }
    >
      <div className="mx-auto max-w-[var(--de-canvas)] px-4 pb-20 sm:px-6 lg:px-8">
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {industries.map((industry) => {
            const Icon = industry.icon;
            return (
              <li key={industry.href}>
                <Link
                  href={industry.href}
                  className="group flex h-full flex-col rounded-2xl border border-de-hairline bg-de-raised p-6 transition-colors hover:border-de-magenta/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-de-magenta"
                >
                  <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-de-hairline bg-de-bg text-de-magenta-ink">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h2 className="font-heading text-xl font-semibold text-white group-hover:text-white">
                    {industry.name}
                  </h2>
                  <p className="mt-2 flex-1 text-base leading-relaxed text-de-muted-soft">
                    {industry.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-de-magenta-ink">
                    View industry
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-12 rounded-2xl border border-de-hairline bg-de-bg p-8 text-center">
          <Users className="mx-auto mb-3 h-6 w-6 text-de-magenta-ink" aria-hidden="true" />
          <p className="font-heading text-2xl font-semibold text-white">Not sure where you fit?</p>
          <p className="mx-auto mt-2 max-w-xl text-de-muted-soft">
            Start with a cyber risk assessment. We match the operating model to your environment before you buy.
          </p>
          <Button asChild variant="brand" className="mt-6">
            <Link href="/book">{CTA.primary}</Link>
          </Button>
        </div>
      </div>
    </PageTemplate>
  );
}
