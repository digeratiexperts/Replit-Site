import { motion, useReducedMotion } from "framer-motion";
import { Link } from "wouter";
import { Shield, Users, ClipboardCheck, ArrowRight, Layers } from "lucide-react";

/**
 * Homepage engagement paths — three primary choices.
 * Detailed capability cards (SOC, EDR, MFA, etc.) live under How We Protect
 * and individual solution pages. Nothing removed; depth is one click away.
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

export const DigeratiServicesSection = (): JSX.Element => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="services"
      className="relative py-10 md:py-14 lg:py-16 bg-[#0a0a0a] overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
        >
          <p className="text-xs md:text-sm font-medium text-[#FF477F] tracking-wide uppercase mb-3">
            How to work with us
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Cybersecurity-First Managed IT
          </h2>
          <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            Three clear paths. Depth lives on the service pages — including the ProActive
            Ecosystem packages, standalone services, and full security stack.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {paths.map((path, index) => {
            const Icon = path.icon;
            return (
              <motion.div
                key={path.title}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 lg:p-8 flex flex-col h-full"
                data-testid={path.testId}
              >
                <div className="w-11 h-11 rounded-xl bg-violet-500/20 flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5 text-violet-300" aria-hidden="true" />
                </div>
                <h3 className="text-lg lg:text-xl font-semibold text-white mb-2">{path.title}</h3>
                <p className="text-sm lg:text-base text-white/60 leading-relaxed flex-1 mb-6">
                  {path.description}
                </p>
                <Link href={path.link} data-testid={`link-${path.testId}`}>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-violet-300 hover:text-violet-200">
                    {path.cta}
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8 md:mt-10 flex flex-wrap items-center justify-center gap-4 text-sm">
          <Link href="/#protection" data-testid="link-see-security-stack">
            <span className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors">
              <Layers className="w-4 h-4 text-pink-400" aria-hidden="true" />
              See the security stack we manage
            </span>
          </Link>
          <span className="text-white/25" aria-hidden="true">
            ·
          </span>
          <Link href="/solutions/proactive-office-ecosystem" data-testid="link-proactive-ecosystem">
            <span className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors">
              How the ProActive Ecosystem works
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};
