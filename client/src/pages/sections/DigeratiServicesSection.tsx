import { motion, useReducedMotion } from "framer-motion";
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
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="services"
      className="de-dark-chapter de-chapter-hairline relative overflow-hidden py-14 md:py-18 lg:py-22"
    >
      <div className="container relative z-10 mx-auto px-3 sm:px-4 lg:px-6">
        <motion.div
          className="mb-10 max-w-2xl md:mb-14"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#FF477F]">
            How to work with us
          </p>
          <h2 className="mb-4 font-heading text-3xl font-semibold tracking-[-0.02em] text-white md:text-4xl">
            Cybersecurity-First Managed IT
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-white/65 md:text-lg">
            Three clear paths. Capability depth stays available here and under Protect — nothing
            removed.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
          {paths.map((path, index) => {
            const Icon = path.icon;
            const visual = engagePathVisualByTitle[path.title];
            return (
              <motion.div
                key={path.title}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="flex h-full flex-col overflow-hidden rounded-2xl border border-de-hairline bg-de-raised"
                data-testid={path.testId}
              >
                {visual ? (
                  <EngagePathVisual still={visual} alt={visual.alt} />
                ) : (
                  <div className="flex aspect-[5/3] items-center justify-center bg-de-raised">
                    <IconWell icon={Icon} size="md" surface="dark" />
                  </div>
                )}
                <div className="flex flex-1 flex-col px-6 pb-7 pt-1 lg:px-8 lg:pb-8">
                  <h3 className="mb-2 text-xl font-semibold text-white lg:text-2xl">{path.title}</h3>
                  <p className="mb-5 flex-1 text-base leading-relaxed text-white/65">
                    {path.description}
                  </p>
                  <Link href={path.link} data-testid={`link-${path.testId}`}>
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-violet-300 hover:text-violet-200">
                      {path.cta}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </Link>
                </div>
              </motion.div>
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

        <div className="mt-14 md:mt-16" data-testid="engage-capability-preview">
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
      </div>
    </section>
  );
};
