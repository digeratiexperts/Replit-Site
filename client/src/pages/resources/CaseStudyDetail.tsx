import { PageTemplate } from "@/components/PageTemplate";
import { ConversionPathBar } from "@/components/ConversionPathBar";
import { Badge } from "@/components/ui/badge";
import { useSEO } from "@/hooks/useSEO";
import { Link, useParams } from "wouter";
import { ArrowLeft, CheckCircle, Layers, Route, Zap, Info } from "lucide-react";
import { caseStudyBySlug } from "@/data/caseStudies";

const cardClass = "rounded-2xl border border-de-hairline bg-de-raised";
const insetClass = "rounded-lg border border-de-hairline bg-de-bg";

export default function CaseStudyDetail() {
  const params = useParams<{ slug: string }>();
  const study = caseStudyBySlug(params.slug || "");

  useSEO({
    title: study ? study.title : "Case Study",
    description: study?.summary || "Digerati Experts case study structure.",
    canonical: study ? `/resources/case-studies/${study.slug}` : "/resources/case-studies",
  });

  if (!study) {
    return (
      <PageTemplate
        title="Case study not found"
        subtitle="That story isn’t published yet."
        breadcrumbs={[
          { label: "Resources", href: "/resources" },
          { label: "Case Studies", href: "/resources/case-studies" },
          { label: "Not found" },
        ]}
      >
        <Link
          href="/resources/case-studies"
          className="inline-flex items-center gap-2 text-de-accent-ink hover:underline"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to case studies
        </Link>
      </PageTemplate>
    );
  }

  const sections = [
    { title: "Challenge", body: study.challenge, icon: Zap },
    { title: "Approach", body: study.approach, icon: Route },
    { title: "Outcome", body: study.outcome, icon: CheckCircle },
  ];

  return (
    <PageTemplate
      title={study.title}
      subtitle={study.summary}
      breadcrumbs={[
        { label: "Resources", href: "/resources" },
        { label: "Case Studies", href: "/resources/case-studies" },
        { label: study.industry },
      ]}
    >
      <div className="max-w-4xl space-y-10">
        <div className="flex flex-wrap gap-2">
          <Badge className="border-0 bg-de-raised text-white/80">{study.industry}</Badge>
          {study.status === "sample" ? (
            <Badge className="border border-de-hairline bg-transparent text-white/70">
              Coming soon / Sample structure
            </Badge>
          ) : (
            <Badge className="border border-de-hairline bg-de-bg text-de-accent-ink">Approved client story</Badge>
          )}
          {study.clientLabel && (
            <Badge className="border border-de-hairline bg-de-raised text-de-accent-ink">{study.clientLabel}</Badge>
          )}
        </div>

        {study.status === "sample" && (
          <div className={`flex gap-3 p-5 ${cardClass}`}>
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-de-accent-ink" aria-hidden="true" />
            <p className="text-sm leading-relaxed text-white/80">
              This page is a labeled structure shell. Placeholders are waiting for DE-approved copy — no fabricated
              customer names or ROI metrics.
            </p>
          </div>
        )}

        <div className="space-y-8">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <section key={section.title} className={`p-6 ${cardClass}`}>
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-de-hairline bg-de-bg">
                    <Icon className="h-4 w-4 text-de-accent-ink" aria-hidden="true" />
                  </div>
                  <h2 className="text-xl font-semibold text-white">{section.title}</h2>
                </div>
                <p className="leading-relaxed text-white/75">{section.body}</p>
              </section>
            );
          })}

          <section className={`p-6 ${cardClass}`}>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-de-hairline bg-de-bg">
                <Layers className="h-4 w-4 text-de-accent-ink" aria-hidden="true" />
              </div>
              <h2 className="text-xl font-semibold text-white">Stack</h2>
            </div>
            <ul className="grid gap-2 sm:grid-cols-2">
              {study.stack.map((item) => (
                <li key={item} className={`px-4 py-3 text-sm text-white/80 ${insetClass}`}>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <Link
          href="/resources/case-studies"
          className="inline-flex items-center gap-2 text-de-accent-ink hover:underline"
          data-testid="link-back-case-studies"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          All case studies
        </Link>

        <ConversionPathBar
          headline="Discuss an engagement like this"
          body="We publish client stories with permission. Start with an assessment to see whether this structure fits your environment."
        />
      </div>
    </PageTemplate>
  );
}
