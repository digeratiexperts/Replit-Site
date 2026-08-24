import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "wouter";
import { revealInitial, revealInView, revealTransition, revealViewport } from "@/lib/animations";

const challenges = [
  {
    title: "Ransomware & Malware",
    description:
      "Advanced threat detection and rapid response to eliminate malicious attacks before damage occurs",
    href: "/solutions/threat-detection",
  },
  {
    title: "Data Loss Prevention",
    description:
      "Comprehensive backup strategies with tested disaster recovery ensuring business continuity",
    href: "/solutions/backup-disaster-recovery",
  },
  {
    title: "Compliance Gaps",
    description:
      "Navigate HIPAA, PCI DSS, and SOC 2 requirements with continuous monitoring and reporting",
    href: "/resources/cyber-facts",
  },
  {
    title: "Phishing & Social Engineering",
    description:
      "Multi-layered email security combined with ongoing employee security awareness training",
    href: "/solutions/security-operations",
  },
  {
    title: "Zero-Day Vulnerabilities",
    description:
      "Proactive patch management and security assessments to close gaps before exploitation",
    href: "/solutions/threat-detection",
  },
  {
    title: "Insider Threats",
    description:
      "User behavior analytics and access controls to prevent internal security breaches",
    href: "/solutions/unified-security",
  },
];

export const DigeratiWhatWeTackleSection = (): JSX.Element => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="de-paper-chapter de-chapter-fade-from-dark de-chapter-fade-to-dark de-field-grain-paper relative py-16 md:py-20 lg:py-24">
      <div className="container relative z-10 mx-auto px-3 sm:px-4 lg:px-6">
        <div className="mx-auto max-w-3xl">
          <motion.div
            className="mb-8 md:mb-10"
            initial={prefersReducedMotion ? false : revealInitial}
            whileInView={revealInView}
            viewport={revealViewport}
            transition={revealTransition}
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#D3126A] md:text-base">
              Problems we solve
            </p>
            <h2 className="mb-4 font-heading text-3xl font-semibold tracking-[-0.02em] text-[#1A1228] md:text-4xl lg:text-5xl">
              What We Tackle
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-[#2A2438] md:text-lg">
              Compact view of the problems we own with you. Sourced industry statistics live on
              Cyber Facts; capability detail lives on Solutions.
            </p>
            <Link href="/resources/cyber-facts">
              <span className="mt-4 inline-flex min-h-11 items-center gap-1 text-base font-semibold text-[#A30E52] hover:text-[#D3126A]">
                Full threat context
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </motion.div>

          <motion.ul
            className="grid grid-cols-1 gap-x-8 gap-y-4 rounded-2xl border border-[var(--de-paper-hairline)] bg-white px-5 py-5 sm:grid-cols-2 md:px-7 md:py-6"
            initial={prefersReducedMotion ? false : revealInitial}
            whileInView={revealInView}
            viewport={revealViewport}
            transition={revealTransition}
          >
            {challenges.map((challenge, index) => (
              <li key={challenge.title}>
                <Link
                  href={challenge.href}
                  data-testid={`tackle-card-${index}`}
                  className="group flex items-start gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D3126A]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--de-paper)]"
                >
                  <span className="mt-[0.7em] h-px w-2.5 shrink-0 bg-[#D3126A]" aria-hidden="true" />
                  <span>
                    <span className="block text-[15px] font-semibold leading-snug text-[#1A1228] group-hover:text-[#A30E52] md:text-base">
                      {challenge.title}
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-[#5A5368]">
                      {challenge.description}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </motion.ul>

          <div className="mt-10 flex flex-col items-start gap-3">
            <p className="text-base text-[#5A5368]">
              Don&apos;t see your specific challenge? We handle it all.
            </p>
            <a
              href="/book"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center rounded-lg bg-[#D3126A] px-6 py-2.5 text-base font-semibold text-white transition-colors duration-200 hover:bg-[#e01874] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D3126A] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--de-paper)]"
              data-testid="tackle-cta"
            >
              Discuss Your Security Needs
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
