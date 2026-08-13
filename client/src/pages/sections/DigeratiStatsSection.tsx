import { Link } from "wouter";
import { ArrowRight, AlertTriangle, DollarSign, MapPin, Shield } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { VisualStage } from "@/components/visual/VisualStage";
import { IconWell } from "@/components/visual/IconWell";
import { Section, Container } from "@/components/layout";
import { homepageSectionAccents } from "@/lib/visualAssets";
import {
  getHomepageCyberFacts,
  type CyberAwarenessFact,
} from "@/data/cyberAwarenessFacts";

const factIcons: Record<string, LucideIcon> = {
  "dbir-ransomware-2026": AlertTriangle,
  "ibm-us-breach-cost-2026": DollarSign,
  "microsoft-mfa-blocks-2025": Shield,
  "az-ic3-losses-2024": MapPin,
};

function StatCell({ fact, index }: { fact: CyberAwarenessFact; index: number }) {
  const Icon = factIcons[fact.id] ?? AlertTriangle;
  const sourceLine = `— ${fact.source} ${fact.year}`;

  return (
    <div
      className="flex h-full flex-col gap-3 px-0 py-4 sm:px-5 sm:py-5 lg:px-6"
      data-testid={`homepage-stat-${index}`}
    >
      <IconWell icon={Icon} size="sm" surface="dark" />
      <p className="font-mono text-3xl font-semibold tracking-tight text-violet-300 md:text-4xl">
        {fact.metric}
      </p>
      <p className="text-sm leading-relaxed text-white/75 md:text-[0.95rem]">{fact.statement}</p>
      {fact.sourceUrl ? (
        <a
          href={fact.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto text-sm text-white/45 hover:text-white/70"
        >
          {sourceLine}
        </a>
      ) : (
        <p className="mt-auto text-sm text-white/45">{sourceLine}</p>
      )}
    </div>
  );
}

export const DigeratiStatsSection = (): JSX.Element => {
  const facts = getHomepageCyberFacts();

  return (
    <Section chapter="field" seam="hairline" rhythm="md" className="overflow-hidden">
      <Container width="content">
        <div className="grid items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col justify-center lg:col-span-5">
            <p className="de-eyebrow mb-3">Threat landscape</p>
            <h2 className="de-h2 mb-4 text-white">The threats are real</h2>
            <p className="de-lead max-w-xl text-white/65">
              Don&apos;t become a statistic. These sourced numbers show why proactive security
              matters — and why endpoint, identity, and recovery discipline have to be owned, not
              assumed.
            </p>
            <p className="mt-6">
              <Link href="/resources/cyber-facts">
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#D3126A] hover:text-pink-300">
                  Full sourced facts
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </p>
          </div>

          <div className="relative flex items-center justify-center lg:col-span-7">
            <div
              className="pointer-events-none absolute inset-0 -z-0 rounded-3xl"
              aria-hidden="true"
              style={{
                background:
                  "radial-gradient(ellipse at 60% 40%, rgba(91,69,224,0.14) 0%, transparent 65%)",
              }}
            />
            <VisualStage
              still={homepageSectionAccents.statsThreats}
              layout="editorial"
              alt="Graphite telemetry sculpture with smoked-glass plates and violet-lit nodes"
              className="relative z-10 w-full max-w-lg lg:max-w-xl"
            />
          </div>
        </div>

        <div className="de-raised-panel mt-10 md:mt-12">
          <div className="grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            {facts.map((fact, index) => (
              <div
                key={fact.id}
                className={
                  index > 0
                    ? "sm:border-l sm:border-white/10 sm:pl-0 lg:border-l"
                    : ""
                }
              >
                <StatCell fact={fact} index={index} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};
