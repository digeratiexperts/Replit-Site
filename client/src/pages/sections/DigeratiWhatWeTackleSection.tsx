import { Shield, Bug, Lock, Database, AlertTriangle, Users, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { IconWell } from "@/components/visual/IconWell";
import { Section, Container } from "@/components/layout";
import { CTA } from "@/lib/ctaCopy";
import type { LucideIcon } from "lucide-react";

type Challenge = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const challenges: Challenge[] = [
  {
    icon: Bug,
    title: "Ransomware & Malware",
    description:
      "Advanced threat detection and rapid response to eliminate malicious attacks before damage occurs",
  },
  {
    icon: Database,
    title: "Data Loss Prevention",
    description:
      "Comprehensive backup strategies with tested disaster recovery ensuring business continuity",
  },
  {
    icon: AlertTriangle,
    title: "Compliance Gaps",
    description:
      "Navigate HIPAA, PCI DSS, and SOC 2 requirements with continuous monitoring and reporting",
  },
  {
    icon: Lock,
    title: "Phishing & Social Engineering",
    description:
      "Multi-layered email security combined with ongoing employee security awareness training",
  },
  {
    icon: Shield,
    title: "Zero-Day Vulnerabilities",
    description:
      "Proactive patch management and security assessments to close gaps before exploitation",
  },
  {
    icon: Users,
    title: "Insider Threats",
    description:
      "User behavior analytics and access controls to prevent internal security breaches",
  },
];

export const DigeratiWhatWeTackleSection = (): JSX.Element => {
  return (
    <Section chapter="field" seam="hairline" rhythm="md">
      <Container width="content">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="flex h-full flex-col lg:col-span-5">
            <p className="de-eyebrow mb-3">Problems we solve</p>
            <h2 className="de-h2 mb-4 text-white">What We Tackle</h2>
            <p className="max-w-md text-base leading-relaxed text-white/65 md:text-lg">
              Compact view of the problems we own with you. Sourced industry statistics live on
              Cyber Facts; capability detail lives on Solutions.
            </p>
            <Link href="/resources/cyber-facts">
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#D3126A] hover:text-pink-300">
                Full threat context
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>

            <div className="mt-auto pt-10 lg:pt-14">
              <p className="mb-3 text-sm text-white/45">
                Don&apos;t see your specific challenge? We handle it all.
              </p>
              <Button
                asChild
                variant="cta"
                size="lg"
                className="rounded-xl font-semibold"
                data-testid="tackle-cta"
              >
                <a href="/book" target="_blank" rel="noopener noreferrer">
                  {CTA.primary}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </div>

          <div className="de-raised-panel grid grid-cols-1 gap-x-8 gap-y-8 p-6 sm:grid-cols-2 sm:p-8 lg:col-span-7">
            {challenges.map((challenge, index) => {
              const Icon = challenge.icon;
              return (
                <div key={challenge.title} data-testid={`tackle-card-${index}`} className="flex gap-4">
                  <IconWell icon={Icon} size="sm" surface="dark" />
                  <div className="min-w-0">
                    <h3 className="mb-1 text-base font-semibold text-white md:text-lg">
                      {challenge.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-white/55 md:text-base">
                      {challenge.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
};
