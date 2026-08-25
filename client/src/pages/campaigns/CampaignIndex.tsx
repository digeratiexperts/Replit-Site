import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { PageTemplate } from "@/components/PageTemplate";
import { ConversionPathBar } from "@/components/ConversionPathBar";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";
import { CTA } from "@/lib/ctaCopy";
import { CAMPAIGNS } from "@/data/campaigns";

export default function CampaignIndex() {
  useSEO({
    title: "Offers for Arizona businesses",
    description:
      "Campaign pages for Digerati Experts services — Cyber Risk Assessment, ProActive managed IT, ransomware readiness, co-managed IT, and industry paths.",
    canonical: "/go",
  });

  return (
    <PageTemplate
      title="Offers built to advertise"
      subtitle="Each page is one offer, one primary action, and copy taken from the real ProActive, assessment, standalone, and co-managed architecture — not a second website."
      breadcrumbs={[{ label: "Offers" }]}
      actions={
        <Button asChild variant="brand" size="lg" className="h-12 px-6 font-semibold">
          <a href="/book">{CTA.primary}</a>
        </Button>
      }
    >
      <div className="space-y-16">
        <ol className="divide-y divide-de-hairline border-y border-de-hairline">
          {CAMPAIGNS.map((campaign, index) => (
            <li key={campaign.slug}>
              <Link
                href={`/go/${campaign.slug}`}
                className="group grid gap-4 py-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-de-accent md:grid-cols-[4rem_1fr_auto] md:items-start"
                data-testid={`campaign-index-${campaign.slug}`}
              >
                <span className="font-mono text-sm text-de-accent-ink">0{index + 1}</span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
                    {campaign.eyebrow}
                  </p>
                  <h2 className="mt-2 font-heading text-2xl font-semibold text-white group-hover:text-de-accent-ink">
                    {campaign.offerName}
                  </h2>
                  <p className="mt-2 max-w-2xl text-base leading-relaxed text-white/60">{campaign.lede}</p>
                </div>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-de-accent-ink">
                  Open page
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </li>
          ))}
        </ol>
        <ConversionPathBar
          headline="Not sure which offer is honest?"
          body="Start with the Cyber Risk Assessment conversation. The page you advertise should match the path we would actually recommend."
        />
      </div>
    </PageTemplate>
  );
}
