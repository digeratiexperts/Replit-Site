import { PageTemplate } from "@/components/PageTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, DollarSign, Shield, Lock, TrendingDown, Zap } from "lucide-react";

export default function RealEstate() {
  const wirefraudStats = [
    { stat: "$1.9B", label: "Annual Fraud Losses", icon: DollarSign, color: "text-red-600" },
    { stat: "45%", label: "Year-over-Year Increase", icon: TrendingDown, color: "text-orange-600" },
    { stat: "98%", label: "Reported by Email", icon: AlertCircle, color: "text-amber-600" },
    { stat: "3 mins", label: "Average Compromise Time", icon: Zap, color: "text-purple-600" }
  ];

  return (
    <PageTemplate
      title="IT Solutions for Real Estate Professionals"
      subtitle="Prevent wire fraud, protect transaction data, stay compliant—secure IT for Arizona real estate"
      gradientColors="from-indigo-700 via-blue-700 to-cyan-700"
    >
      <div className="space-y-16">
        {/* Wire Fraud Statistics - Modern Dashboard */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {wirefraudStats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-orange-400 rounded-xl blur opacity-0 group-hover:opacity-20 transition-all" />
                <Card className="relative bg-white/80 backdrop-blur-sm border border-white/20 hover:shadow-lg transition-all">
                  <CardContent className="pt-6">
                    <Icon className={`h-6 w-6 ${item.color} mb-3`} />
                    <p className="text-3xl font-bold text-gray-900">{item.stat}</p>
                    <p className="text-sm text-gray-600 mt-2">{item.label}</p>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Wire Fraud Warning */}
        <div className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-xl p-8">
          <div className="flex gap-4">
            <AlertCircle className="h-8 w-8 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-2xl font-bold text-red-900 mb-3">Real Estate Wire Fraud: Active Threat</h3>
              <p className="text-red-800 mb-4">Criminals impersonate title companies, attorneys, and lenders with sophisticated phishing attacks targeting high-value transactions.</p>
              <div className="space-y-2 text-red-800">
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
          <h2 className="text-3xl font-bold">Transaction Security Services</h2>
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
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-blue-400 rounded-xl blur opacity-0 group-hover:opacity-15 transition-all" />
                  <Card className="relative bg-white hover:shadow-lg transition-all border-2 border-white/50 group-hover:border-indigo-200">
                    <CardHeader>
                      <Icon className="h-10 w-10 text-indigo-600 mb-2 group-hover:scale-110 transition-transform" />
                      <CardTitle>{service.title}</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">{service.desc}</p>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {service.features.map((f, i) => (
                          <li key={i} className="flex gap-2 text-sm text-gray-700">
                            <CheckCircle className="h-4 w-4 text-indigo-600 flex-shrink-0 mt-0.5" />
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
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-8 border border-indigo-100/50">
          <h3 className="text-2xl font-bold mb-6">Wire Fraud Prevention Checklist</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { q: "Do you verify wire instructions via phone?", status: "essential" },
              { q: "Are your email systems protected against spoofing?", status: "critical" },
              { q: "Is MFA enabled on all systems?", status: "critical" },
              { q: "Do agents know fraud warning signs?", status: "essential" },
              { q: "Can you recover from ransomware?", status: "critical" },
              { q: "Do you have documented security procedures?", status: "required" }
            ].map((item, idx) => (
              <div key={idx} className="flex gap-3 p-3 bg-white/70 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 text-sm">{item.q}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Protection ROI */}
        <div className="grid md:grid-cols-3 gap-6 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl p-8 text-white">
          <div className="text-center">
            <p className="text-4xl font-bold mb-2">$0</p>
            <p className="text-indigo-100">Fraud Losses (Protected Agents)</p>
          </div>
          <div className="text-center border-l border-r border-indigo-400">
            <p className="text-4xl font-bold mb-2">100%</p>
            <p className="text-indigo-100">Closings Protected</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold mb-2">1 click</p>
            <p className="text-indigo-100">Verify Wire Instructions</p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Protect Your Transactions Today</h2>
          <p className="text-lg mb-6 text-indigo-100">Free security assessment for real estate professionals.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://meet.digerati-experts.com/" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-white text-indigo-700 hover:bg-indigo-50 px-8 py-3 rounded-lg font-semibold transition-all hover:shadow-lg"
              data-testid="button-schedule-real-estate"
            >
              Get Security Assessment
            </a>
            <a 
              href="tel:325-480-9870"
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
