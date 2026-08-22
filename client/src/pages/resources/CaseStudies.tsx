import { PageTemplate } from "@/components/PageTemplate";
import { ConversionPathBar } from "@/components/ConversionPathBar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Target, Zap, Layers, Route } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { Link } from "wouter";
import { allCaseStudiesForListing, type CaseStudy } from "@/data/caseStudies";
import { CTA } from "@/lib/ctaCopy";

const cardClass = "rounded-2xl border border-de-hairline bg-de-raised";
const insetClass = "rounded-xl border border-de-hairline bg-de-bg";

const focusAreas = [
  { value: "Healthcare", label: "HIPAA & patient data" },
  { value: "Legal", label: "Ransomware recovery" },
  { value: "Accounting", label: "Insurance controls" },
  { value: "Industry", label: "OT & wire fraud" },
];

function StatusBadge({ study }: { study: CaseStudy }) {
  if (study.status === "published") {
    return (
      <Badge className="mb-2 border border-de-hairline bg-de-bg text-de-accent-ink">Approved client story</Badge>
    );
  }
  return (
    <Badge className="mb-2 border border-de-hairline bg-transparent text-white/70">Industry framework</Badge>
  );
}

export default function CaseStudies() {
  useSEO({
    title: "Client Case Studies",
    description:
      "Arizona client case studies from Digerati Experts — challenge, approach, and outcome by industry.",
    canonical: "/resources/case-studies",
  });
  const caseStudies = allCaseStudiesForListing();
  const hasPublished = caseStudies.some((c) => c.status === "published");

  return (
    <PageTemplate
      title="Case Studies"
      subtitle="Real Arizona engagements — challenge, approach, and outcome."
      icon={<Target className="h-10 w-10 text-de-accent-ink" />}
      breadcrumbs={[{ label: "Resources", href: "/resources" }, { label: "Case Studies" }]}
      actions={
        <Button asChild variant="brand" size="lg" className="h-12 px-6 font-semibold">
          <a href="/book">
            {CTA.primary}
            <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
          </a>
        </Button>
      }
    >
      <div className="space-y-16">
        {!hasPublished && (
          <div className={`p-5 md:p-6 ${cardClass}`}>
            <p className="mb-1 font-semibold text-white">Client stories in progress</p>
            <p className="text-sm leading-relaxed text-white/65">
              We publish case studies with client permission. Browse the frameworks below, or talk with us about an
              engagement that matches your industry.
            </p>
          </div>
        )}

        <div className={`grid gap-6 p-8 text-white md:grid-cols-4 ${cardClass}`}>
          {focusAreas.map((item) => (
            <div key={item.value} className={`p-4 text-center ${insetClass}`}>
              <p className="mb-1 text-xl font-bold">{item.value}</p>
              <p className="text-sm text-white/70">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="space-y-8">
          {caseStudies.map((study) => (
            <article key={study.slug} className={`overflow-hidden ${cardClass}`} data-testid={`case-study-card-${study.slug}`}>
              <div className="border-b border-de-hairline p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <StatusBadge study={study} />
                    <Badge className="mb-2 ml-2 border-0 bg-de-bg text-white/80">{study.industry}</Badge>
                    <h2 className="text-2xl font-semibold text-white">{study.title}</h2>
                    <p className="mt-2 max-w-3xl text-white/65">{study.summary}</p>
                  </div>
                  <Link
                    href={`/resources/case-studies/${study.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-de-accent-ink hover:underline"
                    data-testid={`link-case-study-${study.slug}`}
                  >
                    View structure
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
              <div className="grid gap-6 p-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-de-hairline bg-de-bg">
                      <Zap className="h-4 w-4 text-de-accent-ink" aria-hidden="true" />
                    </div>
                    <h3 className="font-semibold text-white">Challenge</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-white/65">{study.challenge}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-de-hairline bg-de-bg">
                      <Route className="h-4 w-4 text-de-accent-ink" aria-hidden="true" />
                    </div>
                    <h3 className="font-semibold text-white">Approach</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-white/65">{study.approach}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-de-hairline bg-de-bg">
                      <CheckCircle className="h-4 w-4 text-de-accent-ink" aria-hidden="true" />
                    </div>
                    <h3 className="font-semibold text-white">Outcome</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-white/65">{study.outcome}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-de-hairline bg-de-bg">
                      <Layers className="h-4 w-4 text-de-accent-ink" aria-hidden="true" />
                    </div>
                    <h3 className="font-semibold text-white">Stack</h3>
                  </div>
                  <ul className="space-y-1.5">
                    {study.stack.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-white/75">
                        <span className="mt-1 text-de-accent-ink" aria-hidden="true">
                          •
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>

        <ConversionPathBar
          headline="Ready to discuss your environment?"
          body="Book an assessment — we’ll map challenges to a practical approach before asking you to buy a stack."
        />
      </div>
    </PageTemplate>
  );
}
