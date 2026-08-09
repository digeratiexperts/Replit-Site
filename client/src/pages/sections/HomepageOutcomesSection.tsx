import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { isApprovedStill, outcomeVisualByTitle } from "@/lib/visualAssets";

const groups = [
  {
    title: "Keep people productive",
    items: ["Support & issue ownership", "Onboarding / offboarding", "Workspace management"],
    href: "/solutions/managed-it-support",
    cta: "Explore managed IT",
  },
  {
    title: "Protect identities and devices",
    items: ["Identity & MFA", "Endpoint protection", "Email security"],
    href: "/solutions/security-operations",
    cta: "Explore managed security",
  },
  {
    title: "Keep the business recoverable",
    items: ["Backup readiness", "BCDR planning", "Cloud data protection"],
    href: "/solutions/backup-disaster-recovery",
    cta: "See backup & recovery",
  },
  {
    title: "Protect and monitor the environment",
    items: ["Network operations", "Security operations", "Vulnerability / risk visibility"],
    href: "/solutions/threat-detection",
    cta: "See threat detection",
  },
  {
    title: "Stay prepared",
    items: ["Compliance readiness", "Reporting", "vCIO / business reviews"],
    href: "/solutions/vcio-strategy",
    cta: "Explore strategic guidance",
  },
];

export function HomepageOutcomesSection() {
  return (
    <section id="outcomes" className="py-14 lg:py-20 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pink-300/90 mb-3">
          What the ProActive Ecosystem solves
        </p>
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 max-w-3xl">
          Business outcomes first. Technical controls underneath.
        </h2>
        <p className="text-white/65 max-w-2xl mb-10">
          MDR, EDR, MFA, backup platforms, and network tools support these outcomes — they are not
          the sales story by themselves.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {groups.map((g) => {
            const visual = outcomeVisualByTitle[g.title];
            const showVisual = isApprovedStill(visual);

            return (
              <div key={g.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                {showVisual && (
                  <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/15 via-fuchsia-500/10 to-transparent border border-white/10">
                    <picture>
                      <source srcSet={visual.srcThumb} type="image/webp" />
                      <img
                        src={visual.srcPng}
                        alt=""
                        width={72}
                        height={72}
                        loading="lazy"
                        decoding="async"
                        className="h-[72px] w-[72px] object-contain drop-shadow-[0_8px_20px_rgba(139,92,246,0.25)]"
                        aria-hidden
                      />
                    </picture>
                  </div>
                )}
                <h3 className="text-lg font-semibold text-white mb-3">{g.title}</h3>
                <ul className="space-y-2 mb-5">
                  {g.items.map((item) => (
                    <li key={item} className="text-sm text-white/65 flex gap-2">
                      <span className="text-pink-400" aria-hidden>
                        ·
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href={g.href}
                  className="inline-flex items-center gap-2 text-sm font-medium text-pink-300 hover:text-pink-200"
                >
                  {g.cta}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
