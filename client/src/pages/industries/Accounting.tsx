import { PageTemplate } from "@/components/PageTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Shield, Lock, FileText, AlertCircle, DollarSign, Activity } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { CTA } from "@/lib/ctaCopy";

export default function Accounting() {
  useSEO({
    title: "IT & Cybersecurity for Accounting Firms",
    description:
      "Managed IT and security for Arizona accounting and finance firms — stop BEC, protect tax season systems, and meet cyber-insurance expectations.",
    canonical: "/industries/accounting-finance",
  });
  const capabilities = [
    { label: "Tax-season systems", value: "Identity, email, and backup owned through busy season", icon: Activity },
    { label: "Client data", value: "Access control and encryption for workpapers and portals", icon: Lock },
    { label: "Insurance reviews", value: "Evidence and control mapping carriers typically ask for", icon: FileText },
    { label: "BEC / wire fraud", value: "MFA, email protection, and verification workflows", icon: Shield }
  ];

  return (
    <PageTemplate
      title="IT Solutions for Accounting & Finance"
      subtitle="PCI DSS-aligned security and financial data protection for Arizona CPAs and accounting firms"
      gradientColors="from-[#050312] via-[#0a0a0a] to-[#050312]"
    >
      <div className="space-y-16">
        {/* Key Metrics - Modern Dashboard Style */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {capabilities.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="relative group">
                <Card className="relative bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 hover:shadow-lg transition-all">
                  <CardContent className="pt-6">
                    <Icon className="h-6 w-6 text-de-accent-ink mb-3" />
                    <p className="text-white font-semibold">{item.label}</p>
                    <p className="text-sm text-gray-400 mt-2 leading-relaxed">{item.value}</p>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Problem Statement */}
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-8 backdrop-blur-sm">
          <div className="flex gap-4">
            <AlertCircle className="h-8 w-8 text-red-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-2xl font-bold text-red-300 mb-3">Financial Services Risk Profile</h3>
              <div className="space-y-2 text-red-200">
                {[
                  "PCI DSS compliance required for credit card processing",
                  "IRS data security requirements (NIST compliance)",
                  "Client confidentiality and privilege concerns",
                  "Wire fraud and business email compromise targeting financial transfers"
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-2">
                    <span className="text-red-400 font-bold">●</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Section */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center text-white">Why Accounting Firms Choose Digerati Experts</h2>
          <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto">
            Accounting firms need IT partners who understand compliance, deadline pressure, and the reality of financial data handling.
          </p>
        </div>

        {/* Service Cards with Modern Design */}
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { 
              icon: Lock, 
              title: "PCI DSS Compliance", 
              desc: "Full PCI DSS compliance framework",
              features: ["Secure payment gateways", "Tokenization & encryption", "Quarterly security assessments", "Audit-grade documentation"]
            },
            { 
              icon: FileText, 
              title: "Tax Data Protection", 
              desc: "IRS and NIST compliance",
              features: ["NIST framework alignment", "Encryption for tax returns", "Secure document retention", "Access controls & audit logging"]
            },
            { 
              icon: DollarSign, 
              title: "Wire Fraud Prevention", 
              desc: "Multi-layer transfer security",
              features: ["Email authentication (DMARC)", "Business email compromise detection", "MFA enforcement", "Wire instruction verification"]
            },
            { 
              icon: Shield, 
              title: "Backup & Disaster Recovery", 
              desc: "Zero downtime during tax season",
              features: ["Real-time cloud backup", "Monthly restore testing", "DR runbooks", "Ransomware recovery"]
            }
          ].map((service, idx) => {
            const Icon = service.icon;
            return (
              <div key={idx} className="group relative">
                <div className="absolute inset-0 bg-de-raised rounded-xl blur opacity-0 group-hover:opacity-10 transition-all duration-300" />
                <Card className="relative h-full bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <Icon className="h-10 w-10 text-de-accent-ink mb-2 group-hover:scale-110 transition-transform" />
                    <CardTitle className="text-xl text-white">{service.title}</CardTitle>
                    <p className="text-sm text-gray-400 mt-2">{service.desc}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                          <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
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

        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-12 border border-white/10">
          <h3 className="text-2xl font-bold text-center text-white mb-3">Security & Compliance Support</h3>
          <p className="text-center text-gray-400 text-sm mb-8 max-w-2xl mx-auto">
            Framework names describe customer requirements we help organizations address — not certifications Digerati holds.
          </p>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { title: "HIPAA-aligned support", label: "Security and compliance support for practices handling PHI" },
              { title: "SOC 2 readiness", label: "Control mapping and evidence — not a Digerati certification" },
              { title: "Cyber insurance readiness", label: "Documentation carriers typically request in underwriting" },
              { title: "Security reporting", label: "Repeatable evidence for audits and client questionnaires" },
            ].map((item) => (
              <div key={item.title} className="text-left p-4 bg-white/5 rounded-lg border border-white/10">
                <p className="text-sm font-semibold text-white mb-1">{item.title}</p>
                <p className="text-sm text-white/60">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ROI Visualization */}
        <div className="grid md:grid-cols-3 gap-6 rounded-xl border border-white/10 bg-[#151217] p-8 text-white">
          <div className="text-center">
            <p className="text-lg font-semibold mb-2">Audit readiness</p>
            <p className="text-white/70 text-sm">Control mapping and evidence for reviews — not a claim that findings disappear.</p>
          </div>
          <div className="text-center md:border-l md:border-r border-white/10 md:px-6">
            <p className="text-lg font-semibold mb-2">Insurance questions</p>
            <p className="text-white/70 text-sm">Documentation carriers typically request. Premium outcomes vary by underwriter.</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold mb-2">Repeatable reporting</p>
            <p className="text-white/70 text-sm">Security and compliance reporting as an operating practice, not a one-time binder.</p>
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-xl border border-white/10 bg-[#151217] p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Protect Your Firm?</h2>
          <p className="text-lg mb-6 text-white/70">Start with a Cyber Risk Assessment from Arizona MSP experts.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/book" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-gradient-to-r from-fuchsia-600 via-pink-600 to-rose-500 hover:from-fuchsia-500 hover:via-pink-500 hover:to-rose-400 text-white px-8 py-3 rounded-lg font-semibold transition-all border border-pink-300/25"
              data-testid="button-schedule-accounting"
            >
              {CTA.primary}
            </a>
            <a 
              href="tel:+13254809870"
              className="inline-flex items-center justify-center border-2 border-white bg-transparent text-white hover:bg-white/10 px-8 py-3 rounded-lg font-semibold transition-all"
              data-testid="button-call-accounting"
            >
              Call 325-480-9870
            </a>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
}
