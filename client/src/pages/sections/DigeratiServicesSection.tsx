import { Link } from "wouter";
import {
  Shield,
  Users,
  ClipboardCheck,
  ArrowRight,
  Layers,
  Eye,
  ShieldCheck,
  UserCheck,
  KeyRound,
  Cloud,
  AlertCircle,
  type LucideIcon,
} from "lucide-react";
import { CTA } from "@/lib/ctaCopy";
import { EngagePathVisual } from "@/components/visual/EngagePathVisual";
import { IconWell } from "@/components/visual/IconWell";
import { Section, Container } from "@/components/layout";
import { engagePathVisualByTitle } from "@/lib/visualAssets";

/**
 * Homepage engagement paths — three primary choices.
 * Capability cards also previewed here (same stack as Protect) so nothing feels deleted.
 */
const paths: {
  icon: LucideIcon;
  title: string;
  description: string;
  link: string;
  cta: string;
  testId: string;
}[] = [
  {
    icon: Shield,
    title: "Fully Managed IT & Cybersecurity",
    description:
      "One accountable team for support, identity, endpoints, email, backup, and security operations — delivered through our ProActive Ecosystem.",
    link: "/solutions/proactive-ecosystem",
    cta: "Explore managed services",
    testId: "engage-fully-managed",
  },
  {
    icon: Users,
    title: "Co-Managed IT",
    description:
      "Augment your internal IT with DE security operations, monitoring, and specialized coverage without replacing your team.",
    link: "/solutions/co-managed-it",
    cta: "See co-managed",
    testId: "engage-co-managed",
  },
  {
    icon: ClipboardCheck,
    title: "Cyber Risk Assessment",
    description:
      "Start with a practical review of identity, endpoints, email, backups, and security posture — then choose what to own together.",
    link: "/#assessment-cta",
    cta: CTA.primary,
    testId: "engage-assessment",
  },
];

const capabilityPreview: {
  icon: LucideIcon;
  title: string;
  link: string;
  desc: string;
}[] = [
  {
    icon: Eye,
    title: "SOC / MDR Monitoring",
    link: "/solutions/security-operations",
    desc: "24/7 detection and response.",
  },
  {
    icon: ShieldCheck,
    title: "Endpoint Security (EDR)",
    link: "/solutions/threat-detection",
    desc: "Protect devices across the environment.",
  },
  {
    icon: UserCheck,
    title: "SMART Identity (MFA + SSO)",
    link: "/solutions/unified-security",
    desc: "Stronger access without user chaos.",
  },
  {
    icon: KeyRound,
    title: "Privileged Access Controls",
    link: "/solutions/unified-security",
    desc: "Admin controls and audit visibility.",
  },
  {
    icon: Cloud,
    title: "Backup & Disaster Recovery",
    link: "/solutions/backup-disaster-recovery",
    desc: "Recovery planning and restore discipline.",
  },
  {
    icon: AlertCircle,
    title: "Email Protection",
    link: "/solutions/security-operations",
    desc: "Anti-phishing and mailbox defenses.",
  },
];

export const DigeratiServicesSection = (): JSX.Element => {
  return (
    <Section
      id="services"
      chapter="field"
      seam="hairline"
      rhythm="md"
      className="overflow-hidden"
    >
      <Container width="content">
        <div className="mb-10 max-w-2xl md:mb-12">
          <p className="de-eyebrow mb-3">How to work with us</p>
          <h2 className="de-h2 mb-4 text-white">Cybersecurity-First Managed IT</h2>
          <p className="de-lead text-white/65">
            Three clear paths. Capability depth stays available here and under Protect — nothing
            removed.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-7">
          {paths.map((path) => {
            const Icon = path.icon;
            const visual = engagePathVisualByTitle[path.title];
            return (
              <article
                key={path.title}
                className="de-raised-panel flex h-full flex-col overflow-hidden"
                data-testid={path.testId}
              >
                {visual ? (
                  <EngagePathVisual still={visual} alt={visual.alt} />
                ) : (
                  <div className="flex aspect-[5/3] items-center justify-center bg-de-raised">
                    <IconWell icon={Icon} size="md" surface="dark" />
                  </div>
                )}
                <div className="flex flex-1 flex-col px-6 pb-7 pt-2 lg:px-7 lg:pb-8">
                  <h3 className="de-h3 mb-2 text-white">{path.title}</h3>
                  <p className="mb-5 flex-1 text-base leading-relaxed text-white/65">
                    {path.description}
                  </p>
                  <Link href={path.link} data-testid={`link-${path.testId}`}>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#D3126A] hover:text-pink-300">
                      {path.cta}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        <p className="mt-6 text-sm text-white/50 md:text-base">
          Need one specific service?{" "}
          <Link href="/solutions/standalone-services">
            <span className="font-semibold text-white/80 underline decoration-white/20 underline-offset-4 hover:text-white hover:decoration-white/50">
              View Standalone Services
            </span>
          </Link>
        </p>

        <div
          className="mt-12 border-t border-white/10 pt-10 md:mt-14 md:pt-12"
          data-testid="engage-capability-preview"
        >
          <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold text-white md:text-xl">Security capabilities</h3>
              <p className="mt-1 text-sm text-white/50 md:text-base">
                Preview of the stack we manage — also detailed under Protect.
              </p>
            </div>
            <Link href="/#protection" data-testid="link-see-security-stack">
              <span className="inline-flex items-center gap-2 text-sm text-white/65 hover:text-white">
                <Layers className="h-4 w-4 text-pink-400" aria-hidden="true" />
                See full Protect process
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {capabilityPreview.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.title} href={item.link}>
                  <div className="flex cursor-pointer items-start gap-3">
                    <IconWell icon={Icon} size="sm" surface="dark" />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white md:text-base">{item.title}</p>
                      <p className="mt-0.5 text-sm leading-relaxed text-white/50">{item.desc}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4 text-sm md:mt-12 md:text-base">
          <Link href="/solutions/proactive-ecosystem" data-testid="link-proactive-ecosystem">
            <span className="inline-flex items-center gap-2 text-white/75 transition-colors hover:text-white">
              How the ProActive Ecosystem works
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </span>
          </Link>
        </div>
      </Container>
    </Section>
  );
};
