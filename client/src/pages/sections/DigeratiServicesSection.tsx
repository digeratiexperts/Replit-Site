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
      className="relative py-12 md:py-16 lg:py-20 bg-[#0a0a0a] overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-10 md:mb-14"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
        >
          <p className="text-sm md:text-base font-medium text-[#FF477F] tracking-wide uppercase mb-3">
            How to work with us
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Cybersecurity-First Managed IT
          </h2>
          <p className="text-lg md:text-xl text-white/65 max-w-3xl mx-auto leading-relaxed">
            Three clear paths. Depth lives on the service pages — including the ProActive
            Ecosystem packages, standalone services, and full security stack.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {paths.map((path, index) => {
            const Icon = path.icon;
            return (
              <motion.div
                key={path.title}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 lg:p-9 flex flex-col h-full"
                data-testid={path.testId}
              >
                <div className="w-14 h-14 rounded-xl bg-violet-500/20 flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-violet-300" aria-hidden="true" />
                </div>
                <h3 className="text-xl lg:text-2xl font-semibold text-white mb-3">{path.title}</h3>
                <p className="text-base lg:text-lg text-white/65 leading-relaxed flex-1 mb-7">
                  {path.description}
                </p>
                <Link href={path.link} data-testid={`link-${path.testId}`}>
                  <span className="inline-flex items-center gap-2 text-base font-medium text-violet-300 hover:text-violet-200">
                    {path.cta}
                    <ArrowRight className="w-5 h-5" aria-hidden="true" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 md:mt-12 flex flex-wrap items-center justify-center gap-4 text-base">
          <Link href="/#protection" data-testid="link-see-security-stack">
            <span className="inline-flex items-center gap-2 text-white/75 hover:text-white transition-colors">
              <Layers className="w-5 h-5 text-pink-400" aria-hidden="true" />
              See the security stack we manage
            </span>
          </Link>
          <span className="text-white/25" aria-hidden="true">
            ·
          </span>
          <Link href="/solutions/proactive-office-ecosystem" data-testid="link-proactive-ecosystem">
            <span className="inline-flex items-center gap-2 text-white/75 hover:text-white transition-colors">
              How the ProActive Ecosystem works
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};
