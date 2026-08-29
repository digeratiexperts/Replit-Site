import { Link } from "wouter";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  FileText,
  GraduationCap,
  HardDrive,
  Headphones,
  KeyRound,
  Mail,
  Network,
  Phone,
  RefreshCw,
  Server,
  Shield,
  ShieldAlert,
} from "lucide-react";
import { MegaMenu } from "@/components/MegaMenu";
import { DigeratiEnhancedFooterSection } from "@/pages/sections/DigeratiEnhancedFooterSection";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";
import { curatedSolutionFamilies, type CuratedSolutionFamily } from "@/data/curatedSolutions";
import { familyPath } from "@/lib/businessNeeds";

const FAMILY_ICONS: Record<CuratedSolutionFamily["id"], typeof Shield> = {
  it_operations: Headphones,
  endpoint_devices: Server,
  identity_access: KeyRound,
  email_collaboration: Mail,
  cybersecurity_operations: Shield,
  network_connectivity: Network,
  backup_continuity: RefreshCw,
  compliance_risk: FileText,
  security_awareness: GraduationCap,
  business_communications: Phone,
  hardware_lifecycle: HardDrive,
  documentation_standards: Briefcase,
  technology_strategy: ShieldAlert,
};

export default function BusinessNeedsIndex() {
  const prefersReducedMotion = useReducedMotion();

  useSEO({
    title: "Solve a Business Need",
    description:
      "Browse Digerati Experts solution families for a clearly bounded standalone or co-managed engagement. Recommendations are visible without an email address.",
    canonical: "/solutions/business-needs",
  });

  const fadeIn = prefersReducedMotion
    ? undefined
    : { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

  return (
    <div className="relative min-h-screen overflow-hidden bg-de-bg">
      <div className="relative z-10">
        <MegaMenu />
        <main className="de-nav-clear mx-auto max-w-7xl px-4 pb-28 sm:px-6 lg:px-8">
          <motion.header
            className="mx-auto mb-14 max-w-3xl text-center"
            initial={prefersReducedMotion ? undefined : "hidden"}
            animate={prefersReducedMotion ? undefined : "visible"}
            variants={fadeIn}
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-de-accent-ink">
              Solve a Business Need
            </p>
            <h1 className="mb-5 text-4xl font-bold leading-tight text-white md:text-5xl" data-testid="heading-business-needs">
              Pick the lane Digerati Experts should own
            </h1>
            <p className="text-lg leading-relaxed text-white/75">
              Thirteen DE solution families. Each one has a standalone offer and a co-managed offer.
              Browse the recommendation first — we only ask for contact details when you save or request
              the solution.
            </p>
          </motion.header>

          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-testid="business-needs-families">
            {curatedSolutionFamilies.map((family) => {
              const Icon = FAMILY_ICONS[family.id];
              return (
                <li key={family.id}>
                  <Link
                    href={familyPath(family.id)}
                    className="flex h-full min-h-[11rem] flex-col rounded-2xl border border-de-hairline bg-de-raised p-6 transition-colors hover:border-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D3126A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050312]"
                    data-testid={`family-card-${family.id}`}
                  >
                    <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-de-hairline bg-de-bg">
                      <Icon className="h-5 w-5 text-de-accent-ink" aria-hidden="true" />
                    </span>
                    <h2 className="mb-2 text-lg font-semibold text-white">{family.label}</h2>
                    <p className="flex-1 text-sm leading-relaxed text-white/60">{family.description}</p>
                    <span className="mt-4 inline-flex items-center text-sm font-medium text-de-accent-ink">
                      View standalone and co-managed
                      <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-white/50">
            This is a request path, not a checkout. Managed, co-managed, cybersecurity, and
            compliance work are scoped after assessment — payment is not available here.
          </p>

          <div className="mt-8 flex justify-center">
            <Button asChild variant="outline" className="h-11 border-white/20 text-white hover:bg-white/10">
              <Link href="/solutions">Back to solutions</Link>
            </Button>
          </div>
        </main>
        <DigeratiEnhancedFooterSection />
      </div>
    </div>
  );
}
