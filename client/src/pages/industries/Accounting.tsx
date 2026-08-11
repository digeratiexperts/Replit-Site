import { PageTemplate } from "@/components/PageTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Shield, Lock, FileText, AlertCircle, DollarSign, TrendingUp, Activity } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

export default function Accounting() {
  useSEO({
    title: "IT & Cybersecurity for Accounting Firms",
    description:
      "Managed IT and security for Arizona accounting and finance firms — stop BEC, protect tax season systems, and meet cyber-insurance expectations.",
    canonical: "/industries/accounting-finance",
  });
  const metrics = [
    { label: "Compliance Pass Rate", value: "99.8%", icon: CheckCircle, color: "text-emerald-500" },
    { label: "Avg. Audit Findings", value: "0.2", icon: TrendingUp, color: "text-violet-400" },
    { label: "Data Protection", value: "256-bit", icon: Lock, color: "text-violet-400" },
    { label: "Uptime Guarantee", value: "99.95%", icon: Activity, color: "text-violet-400" }
  ];

  return (
    <PageTemplate
      title="IT Solutions for Accounting & Finance"
      subtitle="PCI DSS compliant, secure financial data protection for Arizona CPAs and accounting firms"
      gradientColors="from-violet-600 via-purple-600 to-fuchsia-600"
    >
      <div className="space-y-16">
        {/* Key Metrics - Modern Dashboard Style */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <div key={idx} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl blur opacity-0 group-hover:opacity-20 transition-all duration-300" />
                <Card className="relative bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 hover:shadow-lg transition-all">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-3">
                      <Icon className={`h-6 w-6 ${metric.color}`} />
                      <Badge variant="outline" className="text-xs border-white/20 text-gray-300">Key Metric</Badge>
                    </div>
                    <p className="text-gray-400 text-sm">{metric.label}</p>
                    <p className="text-3xl font-bold mt-2 text-white">{metric.value}</p>
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
                <div className="absolute inset-0 bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 rounded-xl blur opacity-0 group-hover:opacity-10 transition-all duration-300" />
                <Card className="relative h-full bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <Icon className="h-10 w-10 text-violet-400 mb-2 group-hover:scale-110 transition-transform" />
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

        {/* Certifications & Trust Badges */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-12 border border-white/10">
          <h3 className="text-2xl font-bold text-center text-white mb-8">Enterprise-Grade Certifications</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { badge: "SOC 2", label: "Type II Certified", color: "from-violet-500 to-purple-500" },
              { badge: "ISO 27001", label: "Information Security", color: "from-violet-500 to-purple-500" },
              { badge: "PCI DSS", label: "Level 1 Compliant", color: "from-purple-500 to-fuchsia-500" },
              { badge: "NIST", label: "Framework Aligned", color: "from-violet-500 to-purple-500" }
            ].map((cert, idx) => (
              <div key={idx} className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:border-white/20 transition-all">
                <div className={`inline-block bg-gradient-to-r ${cert.color} text-white px-4 py-2 rounded-lg font-bold mb-2`}>
                  {cert.badge}
                </div>
                <p className="text-sm text-gray-300">{cert.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ROI Visualization */}
        <div className="grid md:grid-cols-3 gap-6 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl p-8 text-white">
          <div className="text-center">
            <p className="text-4xl font-bold mb-2">7 → 0</p>
            <p className="text-white/70">Audit Findings Eliminated</p>
          </div>
          <div className="text-center border-l border-r border-violet-400">
            <p className="text-4xl font-bold mb-2">25%</p>
            <p className="text-white/70">Insurance Premium Reduction</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold mb-2">100%</p>
            <p className="text-white/70">Compliance Automation</p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Protect Your Firm?</h2>
          <p className="text-lg mb-6 text-white/70">Get a compliance assessment from MSP experts.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/book" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-white text-violet-700 hover:bg-violet-50 px-8 py-3 rounded-lg font-semibold transition-all hover:shadow-lg"
              data-testid="button-schedule-accounting"
            >
              Schedule Cyber Risk Assessment
            </a>
            <a 
              href="tel:325-480-9870"
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
