import { Link } from "wouter";
import { ArrowRight, ClipboardCheck, Layers, Users, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IconWell } from "@/components/visual/IconWell";
import { useBooking } from "@/contexts/BookingContext";
import { analytics } from "@/lib/analytics";
import { CTA } from "@/lib/ctaCopy";

const cards = [
  {
    icon: Layers,
    title: "ProActive Ecosystem",
    body: "One accountable managed IT + cybersecurity relationship for day-to-day operations, protection, and recovery.",
    href: "/solutions/proactive-ecosystem",
    cta: "Explore ProActive packages",
  },
  {
    icon: Users,
    title: "Co-Managed IT",
    body: "Extend your internal IT team with support, security operations, projects, and escalation — without replacing them.",
    href: "/solutions/co-managed-it",
    cta: "See co-managed IT",
  },
  {
    icon: Wrench,
    title: "Standalone Services",
    body: "Focused security, backup, UCaaS, compliance, or infrastructure work when a full managed relationship is not the right fit yet.",
    href: "/solutions/standalone-services",
    cta: "Browse standalone services",
  },
];

export function HomepageEngagementSection() {
  const { openBooking } = useBooking();

  return (
    <section id="engage" className="py-14 lg:py-20 bg-[#050312]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pink-300/90 mb-3">
          Choose how we work together
        </p>
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 max-w-3xl">
          Pick a relationship model before the product catalog
        </h2>
        <p className="text-white/65 max-w-2xl mb-10">
          Technical controls matter — after you know whether you need a fully managed partner,
          a co-managed extension, or a scoped engagement.
        </p>

        <div className="grid md:grid-cols-3 gap-5 mb-6">
          {cards.map((card) => (
            <div
              key={card.title}
              className="rounded-2xl border border-white/10 bg-[#151217] p-6 flex flex-col"
            >
              <IconWell icon={card.icon} size="md" surface="dark" className="mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">{card.title}</h3>
              <p className="text-sm text-white/65 leading-relaxed flex-1 mb-5">{card.body}</p>
              <Link
                href={card.href}
                className="inline-flex items-center gap-2 text-sm font-medium text-pink-300 hover:text-pink-200"
              >
                {card.cta}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-de-hairline bg-de-raised p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-5">
          <IconWell icon={ClipboardCheck} size="md" surface="dark" className="shrink-0" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">Not sure? Start with a Cyber Risk Assessment</h3>
            <p className="text-sm text-white/65 mt-1">
              A practical review of identity, endpoints, email, backups, and security posture —
              then clear priorities, not a sales pitch disguised as an audit.
            </p>
          </div>
          <Button
            type="button"
            onClick={() => {
              analytics.bookingOpened("homepage-engagement");
              openBooking("homepage-engagement");
            }}
            variant="brand"
            className="shrink-0"
          >
            {CTA.primary}
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
          </Button>
        </div>
      </div>
    </section>
  );
}
