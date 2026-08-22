import { PageTemplate } from "@/components/PageTemplate";
import { IconWell } from "@/components/visual/IconWell";
import { Button } from "@/components/ui/button";
import { CheckCircle, Shield, Clock, RefreshCw, Zap, Phone } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { PRIMARY_PHONE } from "@/data/companyContact";

const cardClass = "rounded-2xl border border-de-hairline bg-de-raised";

export default function RemoteSupport() {
  useSEO({
    title: "Remote Support | Digerati Experts",
    description:
      "Secure remote assistance from Digerati Experts technicians. Join a Zoho Assist session, open a ticket, or call support.",
    canonical: "/support/remote-support",
  });

  const features = [
    { icon: Clock, title: "Instant Connection", points: ["Connect in under 2 minutes", "No software required", "Windows, Mac, Linux"] },
    { icon: Shield, title: "Secure & Encrypted", points: ["End-to-end encryption", "Session recording", "HIPAA-aligned session controls"] },
    { icon: RefreshCw, title: "Screen Sharing", points: ["Full control capability", "Multi-monitor support", "File transfer included"] },
    { icon: Zap, title: "24/7 Availability", points: ["Round-the-clock support", "15-min response time for critical issues", "Senior engineer escalation"] },
  ];

  return (
    <PageTemplate
      title="Remote Support"
      subtitle="Instant, secure remote assistance from our expert MSP technicians"
      breadcrumbs={[{ label: "Support", href: "/about/support" }, { label: "Remote Support" }]}
      actions={
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="brand" size="lg" className="h-12 px-6 font-semibold" data-testid="button-zoho-assist-hero">
            <a href="https://assist.zoho.com/" target="_blank" rel="noopener noreferrer">
              Open Zoho Assist
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-12 border-white/20 px-6 font-semibold text-white hover:bg-white/10">
            <a href="/support/submit-ticket">Submit Support Request</a>
          </Button>
        </div>
      }
    >
      <div className="space-y-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-3xl font-bold text-white">How Remote Support Works</h2>
          <p className="text-xl leading-relaxed text-white/70">
            When issues arise, our MSP technicians can securely access your systems to diagnose and resolve problems in minutes. No downtime, no delays.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className={`de-interactive-card h-full p-6 ${cardClass}`}>
                <IconWell icon={Icon} size="md" surface="dark" className="mb-3" />
                <h3 className="mb-4 text-xl font-semibold text-white">{feature.title}</h3>
                <ul className="space-y-3">
                  {feature.points.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-de-accent-ink" aria-hidden="true" />
                      <span className="text-white/80">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className={`p-8 ${cardClass}`}>
          <h3 className="mb-8 text-center text-2xl font-bold text-white">Simple 3-Step Process</h3>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { step: 1, title: "Request Support", desc: "Submit ticket or call our MSP team", time: "< 1 min" },
              { step: 2, title: "Share Access", desc: "Secure connection established instantly", time: "< 2 mins" },
              { step: 3, title: "We Fix It", desc: "Expert technicians resolve your issue", time: "Fast" },
            ].map((process) => (
              <div key={process.step} className="rounded-xl border border-de-hairline bg-de-bg p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-de-hairline bg-de-raised font-bold text-white">
                  {process.step}
                </div>
                <h4 className="mb-2 text-lg font-semibold text-white">{process.title}</h4>
                <p className="mb-2 text-sm text-white/60">{process.desc}</p>
                <p className="text-sm font-medium text-de-accent-ink">{process.time}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={`grid gap-6 p-8 md:grid-cols-4 ${cardClass}`}>
          <div className="text-center">
            <p className="mb-2 text-3xl font-bold text-white">2 mins</p>
            <p className="text-sm text-white/60">Typical connection time</p>
          </div>
          <div className="text-center md:border-l md:border-de-hairline">
            <p className="mb-2 text-3xl font-bold text-white">15 min</p>
            <p className="text-sm text-white/60">Critical response (SLA)</p>
          </div>
          <div className="text-center md:border-l md:border-de-hairline">
            <p className="mb-2 text-3xl font-bold text-white">24/7</p>
            <p className="text-sm text-white/60">Availability</p>
          </div>
          <div className="text-center md:border-l md:border-de-hairline">
            <p className="mb-2 text-3xl font-bold text-white">Encrypted</p>
            <p className="text-sm text-white/60">Zoho Assist sessions</p>
          </div>
        </div>

        <div className={`p-8 text-center ${cardClass}`}>
          <h2 className="mb-4 text-3xl font-bold text-white">Need Immediate Help?</h2>
          <p className="mb-6 text-lg text-white/70">
            Join a secure Zoho Assist session with our MSP technicians, or open a ticket if you need us to reach out.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button asChild variant="brand" size="lg" className="h-12 px-8 font-semibold" data-testid="button-zoho-assist-remote">
              <a href="https://assist.zoho.com/" target="_blank" rel="noopener noreferrer">
                Open Zoho Assist
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 border-white/20 px-8 font-semibold text-white hover:bg-white/10" data-testid="button-submit-ticket-remote">
              <a href="/support/submit-ticket">Submit Support Request</a>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 border-white/20 px-8 font-semibold text-white hover:bg-white/10" data-testid="button-call-remote">
              <a href={PRIMARY_PHONE.telHref}>
                <Phone className="mr-1 h-5 w-5" />
                Call Support
              </a>
            </Button>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
}
