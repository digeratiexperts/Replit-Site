import { PageTemplate } from "@/components/PageTemplate";
import { Badge } from "@/components/ui/badge";
import { useSEO } from "@/hooks/useSEO";
import { Link, useParams } from "wouter";
import { ArrowLeft, CheckCircle, Layers, Route, Zap, Info } from "lucide-react";
import { caseStudyBySlug } from "@/data/caseStudies";

export default function CaseStudyDetail() {
  const params = useParams<{ slug: string }>();
  const study = caseStudyBySlug(params.slug || "");

  useSEO({
    title: study ? study.title : "Case Study",
    description: study?.summary || "Digerati Experts case study structure.",
    canonical: study
      ? `/resources/case-studies/${study.slug}`
      : "/resources/case-studies",
  });

  if (!study) {
    return (
      <PageTemplate
        title="Case study not found"
        subtitle="That story isn’t published yet."
        breadcrumbs={[
          { label: "Resources", href: "/" },
          { label: "Case Studies", href: "/resources/case-studies" },
          { label: "Not found" },
        ]}
      >
        <Link
          href="/resources/case-studies"
          className="inline-flex items-center gap-2 text-de-accent-ink hover:text-de-accent-ink"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to case studies
        </Link>
      </PageTemplate>
    );
  }

  const sections = [
    { title: "Challenge", body: study.challenge, icon: Zap, tone: "text-red-400 bg-red-500/20" },
    {
      title: "Approach",
      body: study.approach,
      icon: Route,
      tone: "text-blue-400 bg-blue-500/20",
    },
    {
      title: "Outcome",
      body: study.outcome,
      icon: CheckCircle,
      tone: "text-green-400 bg-green-500/20",
    },
  ];

  return (
    <PageTemplate
      title={study.title}
      subtitle={study.summary}
      breadcrumbs={[
        { label: "Resources", href: "/" },
        { label: "Case Studies", href: "/resources/case-studies" },
        { label: study.industry },
      ]}
    >
      <div className="space-y-10 max-w-4xl">
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-white/10 text-white/80 border-0">{study.industry}</Badge>
          {study.status === "sample" ? (
            <Badge className="bg-amber-500/20 text-amber-200 border border-amber-500/30">
              Coming soon / Sample structure
            </Badge>
          ) : (
            <Badge className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Approved client story
            </Badge>
          )}
          {study.clientLabel && (
            <Badge className="bg-de-raised text-de-accent-ink border border-de-hairline">
              {study.clientLabel}
            </Badge>
          )}
        </div>

        {study.status === "sample" && (
          <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-5 flex gap-3">
            <Info className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-100/90 leading-relaxed">
              This page is a labeled structure shell. Placeholders are waiting for DE-approved
              copy — no fabricated customer names or ROI metrics.
            </p>
          </div>
        )}

        <div className="space-y-8">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <section key={section.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${section.tone}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <h2 className="text-xl font-semibold text-white">{section.title}</h2>
                </div>
                <p className="text-gray-300 leading-relaxed">{section.body}</p>
              </section>
            );
          })}

          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-de-raised flex items-center justify-center">
                <Layers className="w-4 h-4 text-de-accent-ink" />
              </div>
              <h2 className="text-xl font-semibold text-white">Stack</h2>
            </div>
            <ul className="grid sm:grid-cols-2 gap-2">
              {study.stack.map((item) => (
                <li
                  key={item}
                  className="rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-gray-200 text-sm"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <Link
          href="/resources/case-studies"
          className="inline-flex items-center gap-2 text-de-accent-ink hover:text-de-accent-ink"
          data-testid="link-back-case-studies"
        >
          <ArrowLeft className="h-4 w-4" />
          All case studies
        </Link>
      </div>
    </PageTemplate>
  );
}
