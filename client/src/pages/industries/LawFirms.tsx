import { PageTemplate } from "@/components/PageTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Lock, Eye, Briefcase, AlertCircle, Scale, Shield, Clock } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { CTA } from "@/lib/ctaCopy";

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
    { factor: "ABA Non-Compliance", severity: "Critical", icon: Scale }
  ];

  return (
    <PageTemplate
      title="IT Solutions for Law Firms"
      subtitle="Protect client privilege, prevent data breaches, stay compliant—secure IT for Arizona attorneys"
      gradientColors="from-violet-600 via-purple-600 to-fuchsia-600"
    >
      <div className="space-y-16">
        {/* Risk Assessment Cards */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-white">Security Risk Assessment</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {riskFactors.map((item, idx) => {
              const Icon = item.icon;
              const severity = item.severity === "Critical" ? "bg-red-500/20 text-red-400 border-red-500/30" : "bg-amber-500/20 text-amber-400 border-amber-500/30";
              return (
                <Card key={idx} className="bg-white/5 backdrop-blur-sm border-white/10 hover:shadow-lg transition-all">
                  <CardContent className="pt-6">
                    <Icon className="h-8 w-8 text-violet-400 mb-3" />
                    <h3 className="font-semibold text-white mb-2">{item.factor}</h3>
                    <Badge className={`${severity} border`}>{item.severity}</Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Critical Risks */}
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-8">
          <div className="flex gap-4">
            <AlertCircle className="h-8 w-8 text-red-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-2xl font-bold text-white mb-3">Critical Compliance Risks</h3>
              <div className="space-y-2 text-red-300">
                {[
                  "Attorney-client privilege breach = malpractice liability + regulatory action",
                  "Ransomware targeting law firms for case files and settlement amounts",
                  "Wire transfer fraud targeting client trust accounts",
                  "ABA Cybersecurity Requirements (2024) for data security and incident response"
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-2">
                    <span className="font-bold">▪</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Legal-Specific Services */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-white">Legal-Focused Security Services</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { 
                icon: Lock, 
                title: "Privilege & Encryption", 
                desc: "Attorney-client protection",
                features: ["End-to-end encrypted email", "Secure file sharing", "Case file encryption", "Access audit trails"]
              },
              { 
                icon: Eye, 
                title: "Trust Account Security", 
                desc: "Wire fraud prevention",
                features: ["Multi-factor authentication", "Email authentication (DMARC)", "Dual approval workflows", "Out-of-band verification"]
              },
              { 
                icon: Briefcase, 
                title: "ABA Compliance Framework", 
                desc: "2024 ABA Requirements",
                features: ["Incident response plan", "Client data documentation", "Security training", "Annual assessments"]
              },
              { 
                icon: Scale, 
                title: "Backup & Recovery", 
                desc: "Case continuity guaranteed",
                features: ["Real-time backup", "Ransomware recovery", "Restore testing", "Guaranteed RTO/RPO"]
              }
            ].map((service, idx) => {
              const Icon = service.icon;
              return (
                <div key={idx} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl blur opacity-0 group-hover:opacity-15 transition-all" />
                  <Card className="relative bg-white/5 backdrop-blur-sm hover:shadow-lg transition-all border border-white/10 group-hover:border-violet-500/30">
                    <CardHeader>
                      <Icon className="h-10 w-10 text-violet-400 mb-2 group-hover:scale-110 transition-transform" />
                      <CardTitle className="text-white">{service.title}</CardTitle>
                      <p className="text-sm text-gray-400 mt-1">{service.desc}</p>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {service.features.map((f, i) => (
                          <li key={i} className="flex gap-2 text-sm text-gray-300">
                            <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>

        {/* Compliance Dashboard */}
        <div className="bg-violet-500/10 border border-violet-500/30 rounded-xl p-8">
          <h3 className="text-2xl font-bold mb-8 text-center text-white">ABA Compliance Checklist</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Cybersecurity incident response plan",
              "Client data protection documentation",
              "Regular security training for staff",
              "Annual cybersecurity assessments",
              "Vendor risk management",
              "Encryption for sensitive documents"
            ].map((item, idx) => (
              <div key={idx} className="flex gap-3 p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                <CheckCircle className="h-6 w-6 text-emerald-500 flex-shrink-0" />
                <span className="text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10">
            <p className="text-xs font-semibold tracking-wide uppercase text-[#FF477F] mb-3">Arizona law firms</p>
            <p className="text-white/85 leading-relaxed">
              Privilege, client files, and wire instructions are the attack surface. We work with East Valley and Greater Phoenix firms that need security
              without slowing partners who live in email and document review.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-[#D3126A]/10 border border-[#D3126A]/25">
            <p className="text-xs font-semibold tracking-wide uppercase text-[#FF477F] mb-3">How engagement works</p>
            <ol className="space-y-2 text-white/85 list-decimal list-inside">
              <li>Map identity, email, DMS/cloud file exposure, and remote access</li>
              <li>Harden MFA, phishing controls, and privilege-aware access</li>
              <li>Put monitoring and backup restore testing under one operator</li>
              <li>Support ABA-oriented checklists and insurer questionnaires with evidence</li>
            </ol>
          </div>
        </div>

        <div className="space-y-4 max-w-4xl">
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
            <div key={faq.q} className="p-5 rounded-xl bg-white/[0.04] border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-2">{faq.q}</h3>
              <p className="text-white/70 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-[#D3126A] via-fuchsia-600 to-rose-500 rounded-xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Protect privilege with a clear security plan</h2>
          <p className="text-lg mb-6 text-white/90">Schedule a cyber risk assessment focused on law-firm email, access, and client data.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/book" 
              className="inline-flex items-center justify-center bg-white text-[#D3126A] hover:bg-pink-50 px-8 py-3 rounded-lg font-semibold transition-all hover:shadow-lg"
              data-testid="button-schedule-law"
            >
              {CTA.primary}
            </a>
            <a 
              href="tel:+13254809870"
              className="inline-flex items-center justify-center border-2 border-white bg-transparent text-white hover:bg-white/10 px-8 py-3 rounded-lg font-semibold transition-all"
              data-testid="button-call-law"
            >
              Call 325-480-9870
            </a>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
}
