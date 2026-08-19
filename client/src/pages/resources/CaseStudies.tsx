import { PageTemplate } from "@/components/PageTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  CheckCircle,
  Target,
  Zap,
  Layers,
  Route,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useSEO } from "@/hooks/useSEO";
import { Link } from "wouter";
import { allCaseStudiesForListing, type CaseStudy } from "@/data/caseStudies";
import { CTA } from "@/lib/ctaCopy";

const focusAreas = [
  { value: "Healthcare", label: "HIPAA & patient data" },
  { value: "Legal", label: "Ransomware recovery" },
  { value: "Accounting", label: "Insurance controls" },
  { value: "Industry", label: "OT & wire fraud" },
];

function StatusBadge({ study }: { study: CaseStudy }) {
  if (study.status === "published") {
    return (
      <Badge className="mb-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
        Approved client story
      </Badge>
    );
  }
  return (
    <Badge className="mb-2 bg-white/10 text-white/70 border border-white/15">
      Industry framework
    </Badge>
  );
}

export default function CaseStudies() {
  useSEO({
    title: "Client Case Studies",
    description:
      "Arizona client case studies from Digerati Experts — challenge, approach, and outcome by industry.",
    canonical: "/resources/case-studies",
  });
  const prefersReducedMotion = useReducedMotion() ?? false;
  const caseStudies = allCaseStudiesForListing();
  const hasPublished = caseStudies.some((c) => c.status === "published");

  return (
    <PageTemplate
      title="Case Studies"
      subtitle="Real Arizona engagements — challenge, approach, and outcome."
      icon={<Target className="w-10 h-10 text-white" />}
      breadcrumbs={[{ label: "Resources", href: "/" }, { label: "Case Studies" }]}
    >
      <div className="space-y-16">
        {!hasPublished && (
          <div className="rounded-xl border border-white/15 bg-white/[0.04] p-5 md:p-6">
            <p className="font-semibold text-white mb-1">Client stories in progress</p>
            <p className="text-sm text-white/65 leading-relaxed">
              We publish case studies with client permission. Browse the frameworks below, or talk
              with us about an engagement that matches your industry.
            </p>
          </div>
        )}

        <motion.div
          className="grid md:grid-cols-4 gap-6 bg-gradient-to-r from-[#050312] via-[#0a0a0a] to-[#050312] rounded-2xl p-8 text-white border border-white/10"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {focusAreas.map((item) => (
            <div key={item.value} className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
              <p className="text-xl font-bold mb-1">{item.value}</p>
              <p className="text-white/80 text-sm">{item.label}</p>
            </div>
          ))}
        </motion.div>

        <div className="space-y-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.slug}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.45 }}
            >
              <Card
                className="overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 hover:border-de-accent/50 hover:shadow-xl transition-all duration-300"
                data-testid={`case-study-card-${study.slug}`}
              >
                <CardHeader className="border-b border-white/10 bg-white/[0.03]">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <StatusBadge study={study} />
                      <Badge className="mb-2 ml-2 bg-white/10 text-white/80 border-0">
                        {study.industry}
                      </Badge>
                      <CardTitle className="text-2xl text-white">{study.title}</CardTitle>
                      <p className="text-gray-400 mt-2 max-w-3xl">{study.summary}</p>
                    </div>
                    <Link
                      href={`/resources/case-studies/${study.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-medium text-de-accent-ink hover:text-de-accent-ink"
                      data-testid={`link-case-study-${study.slug}`}
                    >
                      View structure
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center">
                          <Zap className="w-4 h-4 text-red-400" />
                        </div>
                        <h4 className="font-semibold text-white">Challenge</h4>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed">{study.challenge}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                          <Route className="w-4 h-4 text-blue-400" />
                        </div>
                        <h4 className="font-semibold text-white">Approach</h4>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed">{study.approach}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        </div>
                        <h4 className="font-semibold text-white">Outcome</h4>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed">{study.outcome}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-de-raised flex items-center justify-center">
                          <Layers className="w-4 h-4 text-de-accent-ink" />
                        </div>
                        <h4 className="font-semibold text-white">Stack</h4>
                      </div>
                      <ul className="space-y-1.5">
                        {study.stack.map((item) => (
                          <li key={item} className="text-gray-300 text-sm flex items-start gap-2">
                            <span className="text-de-accent-ink mt-1">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="relative rounded-2xl overflow-hidden"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-de-raised" />
          <div className="relative p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Ready to discuss your environment?
            </h2>
            <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Book an assessment — we’ll map challenges to a practical approach before asking you to
              buy a stack.
            </p>
            <a
              href="/book"
              className="inline-flex items-center justify-center bg-white text-de-accent hover:bg-de-paper-raised px-8 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl hover:scale-105"
              data-testid="button-contact-us"
            >
              {CTA.primary}
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </motion.div>
      </div>
    </PageTemplate>
  );
}
