import { PageTemplate } from "@/components/PageTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, AlertCircle, Shield, Lock, DollarSign, TrendingDown } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { CTA } from "@/lib/ctaCopy";

export default function RealEstate() {
  useSEO({
    title: "IT & Cybersecurity for Real Estate",
    description:
      "Protect Arizona brokerages from wire fraud and BEC with managed email security, MFA, and accountable IT support.",
    canonical: "/industries/real-estate",
  });
  const focusAreas = [
    { title: "Wire instruction fraud", body: "Verify-before-send workflows and mailbox protection for closings.", icon: Shield },
    { title: "Business email compromise", body: "MFA, email filtering, and staff awareness for brokerages.", icon: AlertCircle },
    { title: "Transaction data", body: "Access control for contracts, IDs, and shared deal rooms.", icon: Lock },
    { title: "Local accountability", body: "Arizona team you can call when a wire looks wrong.", icon: CheckCircle },
  ];

  return (
    <PageTemplate
      title="IT Solutions for Real Estate Professionals"
      subtitle="Prevent wire fraud, protect transaction data, stay compliant—secure IT for Arizona real estate"
      gradientColors="from-violet-600 via-purple-600 to-fuchsia-600"
    >
      <div className="space-y-16">
        {/* Wire Fraud Statistics - Modern Dashboard */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {focusAreas.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} className="relative bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:shadow-lg transition-all">
                <CardContent className="pt-6">
                  <Icon className="h-6 w-6 text-[#A78BFA] mb-3" />
                  <p className="font-semibold text-white">{item.title}</p>
                  <p className="text-sm text-gray-400 mt-2 leading-relaxed">{item.body}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Wire Fraud Warning */}
        <div className="bg-red-500/10 backdrop-blur-sm border border-red-500/30 rounded-xl p-8">
          <div className="flex gap-4">
            <AlertCircle className="h-8 w-8 text-red-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-2xl font-bold text-white mb-3">Real Estate Wire Fraud: Active Threat</h3>
              <p className="text-red-200 mb-4">Criminals impersonate title companies, attorneys, and lenders with sophisticated phishing attacks targeting high-value transactions.</p>
              <div className="space-y-2 text-red-200">
                {[
                  "Fake wire instructions sent via email spoofing",
                  "Lost client funds (often non-recoverable)",
                  "TRID/RESPA violations from inadequate data security",
                  "Reputation damage and regulatory action"
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-2">
                    <span className="font-bold">●</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Security Services */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-white">Transaction Security Services</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { 
                icon: DollarSign, 
                title: "Wire Fraud Prevention", 
                desc: "Multi-layer protection",
                features: ["Email authentication (DMARC/SPF)", "Business email compromise detection", "MFA for all systems", "Out-of-band verification", "Staff training on tactics"]
              },
              { 
                icon: Lock, 
                title: "Document Security", 
                desc: "Transaction protection",
                features: ["End-to-end encrypted sharing", "Closing document protection", "Access controls", "Audit trails for access", "TRID compliance tracking"]
              },
              { 
                icon: Shield, 
                title: "TRID & RESPA Compliance", 
                desc: "Federal requirements",
                features: ["Document retention tracking", "Secure eSignature with audit", "APR calculation docs", "Compliance certifications", "Closing disclosure logging"]
              },
              { 
                icon: TrendingDown, 
                title: "Ransomware Protection", 
                desc: "Closing continuity",
                features: ["Real-time backup", "Immutable backups", "Fast recovery", "Guaranteed RTO/RPO", "Incident response"]
              }
            ].map((service, idx) => {
              const Icon = service.icon;
              return (
                <div key={idx} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl blur opacity-0 group-hover:opacity-15 transition-all" />
                  <Card className="relative bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:shadow-lg transition-all group-hover:border-violet-500/30">
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

        {/* Protection Checklist */}
        <div className="bg-violet-500/10 backdrop-blur-sm rounded-xl p-8 border border-violet-500/20">
          <h3 className="text-2xl font-bold mb-6 text-white">Wire Fraud Prevention Checklist</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { q: "Do you verify wire instructions via phone?", status: "essential" },
              { q: "Are your email systems protected against spoofing?", status: "critical" },
              { q: "Is MFA enabled on all systems?", status: "critical" },
              { q: "Do agents know fraud warning signs?", status: "essential" },
              { q: "Can you recover from ransomware?", status: "critical" },
              { q: "Do you have documented security procedures?", status: "required" }
            ].map((item, idx) => (
              <div key={idx} className="flex gap-3 p-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 transition-all">
                <CheckCircle className="h-6 w-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm">{item.q}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Protection ROI */}
        <div className="grid md:grid-cols-3 gap-6 rounded-xl border border-white/10 bg-[#151217] p-8 text-white">
          <div className="text-center">
            <p className="text-lg font-semibold mb-2">Verify before you wire</p>
            <p className="text-white/70 text-sm">Out-of-band confirmation for instruction changes — not a claimed $0-loss guarantee.</p>
          </div>
          <div className="text-center md:border-l md:border-r border-white/10 md:px-6">
            <p className="text-lg font-semibold mb-2">Mailbox defenses</p>
            <p className="text-white/70 text-sm">MFA and email protection sized to how brokerages actually work.</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold mb-2">Someone to call</p>
            <p className="text-white/70 text-sm">Arizona team when a closing looks off — 325-480-9870.</p>
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-xl border border-white/10 bg-[#151217] p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Protect Your Transactions Today</h2>
          <p className="text-lg mb-6 text-white/70">Start with a Cyber Risk Assessment for your brokerage.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/book" 
              className="inline-flex items-center justify-center bg-gradient-to-r from-fuchsia-600 via-pink-600 to-rose-500 hover:from-fuchsia-500 hover:via-pink-500 hover:to-rose-400 text-white px-8 py-3 rounded-lg font-semibold transition-all border border-pink-300/25"
              data-testid="button-schedule-real-estate"
            >
              {CTA.primary}
            </a>
            <a 
              href="tel:+13254809870"
              className="inline-flex items-center justify-center border-2 border-white bg-transparent text-white hover:bg-white/10 px-8 py-3 rounded-lg font-semibold transition-all"
              data-testid="button-call-real-estate"
            >
              Call 325-480-9870
            </a>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
}
