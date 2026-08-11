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
} from "lucide-react";

/**
 * Homepage engagement paths — three primary choices.
 * Capability cards also previewed here (same stack as Protect) so nothing feels deleted.
 */
const paths = [
  {
    icon: Shield,
    title: "Fully Managed IT & Cybersecurity",
    description:
      "One accountable team for support, identity, endpoints, email, backup, and security operations — delivered through our ProActive Ecosystem.",
    link: "/solutions/managed-it-support",
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
    cta: "Schedule assessment",
    testId: "engage-assessment",
  },
];

const capabilityPreview = [
  { icon: Eye, title: "SOC / MDR Monitoring", link: "/solutions/security-operations", desc: "24/7 detection and response." },
  { icon: ShieldCheck, title: "Endpoint Security (EDR)", link: "/solutions/threat-detection", desc: "Protect devices across the environment." },
  { icon: UserCheck, title: "SMART Identity (MFA + SSO)", link: "/solutions/unified-security", desc: "Stronger access without user chaos." },
  { icon: KeyRound, title: "Privileged Access Controls", link: "/solutions/unified-security", desc: "Admin controls and audit visibility." },
  { icon: Cloud, title: "Backup & Disaster Recovery", link: "/solutions/backup-disaster-recovery", desc: "Recovery planning and restore discipline." },
  { icon: AlertCircle, title: "Email Protection", link: "/solutions/security-operations", desc: "Anti-phishing and mailbox defenses." },
];

export const DigeratiServicesSection = (): JSX.Element => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[#0a0a0a] py-14 md:py-18 lg:py-22"
    >
      <div className="container relative z-10 mx-auto px-3 sm:px-4 lg:px-6">
        <motion.div
          className="mb-10 text-center md:mb-14"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
        >
          <p className="mb-3 text-base font-medium uppercase tracking-wide text-[#FF477F] md:text-lg">
            How to work with us
          </p>
          <h2 className="mb-4 text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            Cybersecurity-First Managed IT
          </h2>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-white/65 md:text-2xl">
            Three clear paths. Capability depth stays available here and under Protect — nothing
            removed.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
          {paths.map((path, index) => {
            const Icon = path.icon;
            return (
              <motion.div
                key={path.title}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-8 lg:p-10"
                data-testid={path.testId}
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-violet-500/20">
                  <Icon className="h-8 w-8 text-violet-300" aria-hidden="true" />
                </div>
                <h3 className="mb-3 text-2xl font-semibold text-white lg:text-3xl">{path.title}</h3>
                <p className="mb-7 flex-1 text-lg leading-relaxed text-white/65 lg:text-xl">
                  {path.description}
                </p>
                <Link href={path.link} data-testid={`link-${path.testId}`}>
                  <span className="inline-flex items-center gap-2 text-lg font-medium text-violet-300 hover:text-violet-200">
                    {path.cta}
                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Secondary capability stack — same six as Protect, so Engage never feels emptied */}
        <div className="mt-12 md:mt-16" data-testid="engage-capability-preview">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h3 className="text-2xl font-bold text-white md:text-3xl">Security capabilities</h3>
              <p className="mt-2 text-base text-white/55 md:text-lg">
                Preview of the stack we manage — also detailed under Protect.
              </p>
            </div>
            <Link href="/#protection" data-testid="link-see-security-stack">
              <span className="inline-flex items-center gap-2 text-base text-white/75 hover:text-white">
                <Layers className="h-5 w-5 text-pink-400" aria-hidden="true" />
                See full Protect process
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {capabilityPreview.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.title} href={item.link}>
                  <div className="h-full cursor-pointer rounded-xl border border-white/10 bg-white/[0.04] p-5 transition-all hover:border-violet-400/40 hover:bg-white/[0.06]">
                    <div className="mb-2 flex items-center gap-2.5">
                      <Icon className="h-5 w-5 text-violet-300" aria-hidden="true" />
                      <p className="text-base font-semibold text-white md:text-lg">{item.title}</p>
                    </div>
                    <p className="text-sm leading-relaxed text-white/55 md:text-base">{item.desc}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-base md:mt-12 md:text-lg">
          <Link href="/solutions/proactive-office-ecosystem" data-testid="link-proactive-ecosystem">
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
