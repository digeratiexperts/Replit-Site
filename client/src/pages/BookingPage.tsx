import { PageTemplate } from "@/components/PageTemplate";
import { Calendar, Phone, Shield, Clock, CheckCircle } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { ZohoBookingWidget } from "@/components/ZohoBookingWidget";
import { PRIMARY_PHONE } from "@/data/companyContact";
import { IconWell } from "@/components/visual/IconWell";
import { StatementHeading } from "@/components/visual/StatementHeading";
import { CTA } from "@/lib/ctaCopy";

export default function BookingPage() {
  useSEO({
    title: "Get My Cyber Risk Assessment",
    description:
      "Book a Cyber Risk Assessment with Digerati Experts. We review your Arizona environment and recommend a fit — no obligation.",
    canonical: "/book",
  });

  return (
    <PageTemplate
      title="Get Your Cyber Risk Assessment"
      subtitle="Pick a time. We look at identity, endpoints, email, backups, and operating reality before recommending a package."
    >
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ZohoBookingWidget instanceId="page" className="overflow-hidden rounded-2xl border border-de-hairline" />
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-de-hairline bg-de-raised p-6">
            <StatementHeading as="h2" className="mb-4 text-lg">
              What to Expect
            </StatementHeading>
            <ul className="space-y-4">
              {[
                {
                  icon: Clock,
                  title: "30-Minute Call",
                  desc: "Quick, focused discussion about your IT needs",
                },
                {
                  icon: Shield,
                  title: "Security Assessment",
                  desc: "Free evaluation of your current cybersecurity posture",
                },
                {
                  icon: CheckCircle,
                  title: "Custom Roadmap",
                  desc: "Personalized recommendations for your business",
                },
              ].map((item) => (
                <li key={item.title} className="flex gap-3">
                  <IconWell icon={item.icon} size="sm" surface="dark" />
                  <div>
                    <p className="text-sm font-semibold text-white">{item.title}</p>
                    <p className="text-sm font-medium text-white/70">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="de-interactive-card rounded-2xl border border-de-hairline bg-de-raised p-6">
            <StatementHeading as="h2" className="mb-3 text-lg">
              Prefer to Call
            </StatementHeading>
            <a
              href={PRIMARY_PHONE.telHref}
              className="flex min-h-11 items-center gap-3 font-semibold text-white transition-colors hover:text-de-accent-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-de-accent"
              data-testid="link-phone-booking"
            >
              <Phone className="h-5 w-5 text-de-accent-ink" />
              <span className="text-lg">{PRIMARY_PHONE.display}</span>
            </a>
          </div>

          <div className="rounded-2xl border border-de-hairline bg-de-raised p-6">
            <div className="mb-3 flex items-center gap-3">
              <IconWell icon={Calendar} size="sm" surface="dark" />
              <StatementHeading as="h2" className="text-lg">
                No Obligation
              </StatementHeading>
            </div>
            <p className="text-sm leading-relaxed text-white/70">
              This {CTA.primaryShort.toLowerCase()} is completely free with no strings attached.
              We&apos;ll assess your current IT setup and provide honest
              recommendations — even if that means you don&apos;t need us.
            </p>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
}
