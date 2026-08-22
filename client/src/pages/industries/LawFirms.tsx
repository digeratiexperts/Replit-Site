import { PageTemplate } from "@/components/PageTemplate";
import { IconWell } from "@/components/visual/IconWell";
import { Button } from "@/components/ui/button";
import { CheckCircle, Lock, Eye, Briefcase, AlertCircle, Scale, Shield, Phone, ArrowRight } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { CTA } from "@/lib/ctaCopy";
import { PRIMARY_PHONE } from "@/data/companyContact";

const cardClass = "rounded-2xl border border-de-hairline bg-de-raised";
const insetClass = "rounded-xl border border-de-hairline bg-de-bg";

export default function LawFirms() {
  useSEO({
    title: "IT & Cybersecurity for Law Firms",
    description:
      "Secure IT for Arizona law firms — protect client privilege, stop ransomware and wire fraud, and stay aligned with ABA cybersecurity expectations.",
    canonical: "/industries/law-firms",
  });

  const riskFactors = [
    { factor: "Privilege Breach", severity: "Critical", icon: Eye },
    { factor: "Ransomware", severity: "High", icon: Shield },
    { factor: "Wire Fraud", severity: "High", icon: AlertCircle },
    { factor: "ABA Non-Compliance", severity: "Critical", icon: Scale },
  ];

  return (
    <PageTemplate
      title="IT Solutions for Law Firms"
      subtitle="Protect client privilege, prevent data breaches, stay compliant—secure IT for Arizona attorneys"
      icon={<Scale className="h-10 w-10 text-de-accent-ink" />}
      breadcrumbs={[{ label: "Industries", href: "/industries" }, { label: "Law Firms" }]}
      actions={
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="brand" size="lg" className="h-12 px-6 font-semibold" data-testid="button-hero-law">
            <a href="/book">
              {CTA.primary}
              <ArrowRight className="ml-1 h-4 w-4" />
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-12 border-white/20 px-6 font-semibold text-white hover:bg-white/10"
          >
            <a href={PRIMARY_PHONE.telHref}>Call {PRIMARY_PHONE.display}</a>
          </Button>
        </div>
      }
    >
      <div className="space-y-16">
        <div>
          <h2 className="mb-6 text-2xl font-bold text-white">Security Risk Assessment</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {riskFactors.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.factor} className={`de-interactive-card p-6 ${cardClass}`}>
                  <Icon className="mb-3 h-8 w-8 text-de-accent-ink" aria-hidden="true" />
                  <h3 className="mb-2 font-semibold text-white">{item.factor}</h3>
                  <span className="inline-flex rounded-md border border-de-hairline bg-de-bg px-2 py-0.5 text-xs font-medium text-white/70">
                    {item.severity}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className={`p-8 ${cardClass}`}>
          <div className="flex gap-4">
            <IconWell icon={AlertCircle} size="md" surface="dark" />
            <div>
              <h3 className="mb-3 text-2xl font-bold text-white">Critical Compliance Risks</h3>
              <div className="space-y-2 text-white/75">
                {[
                  "Attorney-client privilege breach = malpractice liability + regulatory action",
                  "Ransomware targeting law firms for case files and settlement amounts",
                  "Wire transfer fraud targeting client trust accounts",
                  "ABA Cybersecurity Requirements (2024) for data security and incident response",
                ].map((item) => (
                  <div key={item} className="flex gap-2">
                    <span className="text-de-accent-ink" aria-hidden="true">
                      ▪
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-white">Legal-Focused Security Services</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                icon: Lock,
                title: "Privilege & Encryption",
                desc: "Attorney-client protection",
                features: ["End-to-end encrypted email", "Secure file sharing", "Case file encryption", "Access audit trails"],
              },
              {
                icon: Eye,
                title: "Trust Account Security",
                desc: "Wire fraud prevention",
                features: ["Multi-factor authentication", "Email authentication (DMARC)", "Dual approval workflows", "Out-of-band verification"],
              },
              {
                icon: Briefcase,
                title: "ABA Compliance Framework",
                desc: "2024 ABA Requirements",
                features: ["Incident response plan", "Client data documentation", "Security training", "Annual assessments"],
              },
              {
                icon: Scale,
                title: "Backup & Recovery",
                desc: "Case continuity",
                features: ["Real-time backup", "Ransomware recovery", "Restore testing", "Contract-defined RTO/RPO"],
              },
            ].map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.title} className={`de-interactive-card p-6 ${cardClass}`}>
                  <Icon className="mb-2 h-10 w-10 text-de-accent-ink" aria-hidden="true" />
                  <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                  <p className="mt-1 text-sm text-white/55">{service.desc}</p>
                  <ul className="mt-4 space-y-2">
                    {service.features.map((f) => (
                      <li key={f} className="flex gap-2 text-sm text-white/80">
                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-de-accent-ink" aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        <div className={`p-8 ${cardClass}`}>
          <h3 className="mb-8 text-center text-2xl font-bold text-white">ABA Compliance Checklist</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              "Cybersecurity incident response plan",
              "Client data protection documentation",
              "Regular security training for staff",
              "Annual cybersecurity assessments",
              "Vendor risk management",
              "Encryption for sensitive documents",
            ].map((item) => (
              <div key={item} className={`flex gap-3 p-3 ${insetClass}`}>
                <CheckCircle className="h-6 w-6 shrink-0 text-de-accent-ink" aria-hidden="true" />
                <span className="text-white/80">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className={`p-6 ${cardClass}`}>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#F04C97]">Arizona law firms</p>
            <p className="leading-relaxed text-white/85">
              Privilege, client files, and wire instructions are the attack surface. We work with East Valley and Greater Phoenix firms that need security
              without slowing partners who live in email and document review.
            </p>
          </div>
          <div className="rounded-2xl border border-[#D3126A]/35 bg-de-raised p-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#F04C97]">How engagement works</p>
            <ol className="list-inside list-decimal space-y-2 text-white/85">
              <li>Map identity, email, DMS/cloud file exposure, and remote access</li>
              <li>Harden MFA, phishing controls, and privilege-aware access</li>
              <li>Put monitoring and backup restore testing under one operator</li>
              <li>Support ABA-oriented checklists and insurer questionnaires with evidence</li>
            </ol>
          </div>
        </div>

        <div className="max-w-4xl space-y-4">
          <h2 className="text-2xl font-bold text-white">Questions managing partners ask</h2>
          {[
            {
              q: "Will this disrupt billable work?",
              a: "We design around partner workflows — remote-first support, change windows that respect court calendars, and onboarding that doesn’t strand new associates.",
            },
            {
              q: "Do you understand client confidentiality?",
              a: "Yes. Access design, encryption, and incident handling assume privilege and ethical walls — not a generic SMB template pasted onto a firm.",
            },
          ].map((faq) => (
            <div key={faq.q} className={`p-5 ${cardClass}`}>
              <h3 className="mb-2 text-lg font-semibold text-white">{faq.q}</h3>
              <p className="leading-relaxed text-white/70">{faq.a}</p>
            </div>
          ))}
        </div>

        <div className={`p-8 text-center ${cardClass}`}>
          <h2 className="mb-4 text-3xl font-bold text-white">Protect privilege with a clear security plan</h2>
          <p className="mb-6 text-lg text-white/70">Schedule a cyber risk assessment focused on law-firm email, access, and client data.</p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button asChild variant="brand" size="lg" className="h-12 px-8 font-semibold" data-testid="button-schedule-law">
              <a href="/book">{CTA.primary}</a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 border-white/20 px-8 font-semibold text-white hover:bg-white/10"
              data-testid="button-call-law"
            >
              <a href={PRIMARY_PHONE.telHref}>
                <Phone className="mr-1 h-5 w-5" />
                Call {PRIMARY_PHONE.display}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
}
