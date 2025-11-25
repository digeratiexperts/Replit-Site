import { PageTemplate } from "@/components/PageTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Shield, Lock, FileText, AlertCircle, DollarSign, TrendingUp, Activity } from "lucide-react";

export default function Accounting() {
  const metrics = [
    { label: "Compliance Pass Rate", value: "99.8%", icon: CheckCircle, color: "text-green-600" },
    { label: "Avg. Audit Findings", value: "0.2", icon: TrendingUp, color: "text-blue-600" },
    { label: "Data Protection", value: "256-bit", icon: Lock, color: "text-purple-600" },
    { label: "Uptime Guarantee", value: "99.95%", icon: Activity, color: "text-amber-600" }
  ];

  return (
    <PageTemplate
      title="IT Solutions for Accounting & Finance"
      subtitle="PCI DSS compliant, secure financial data protection for Arizona CPAs and accounting firms"
      gradientColors="from-green-700 via-emerald-700 to-teal-700"
    >
      <div className="space-y-16">
        {/* Key Metrics - Modern Dashboard Style */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <div key={idx} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl blur opacity-0 group-hover:opacity-20 transition-all duration-300" />
                <Card className="relative bg-white/80 backdrop-blur-sm border border-white/20 hover:shadow-lg transition-all">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-3">
                      <Icon className={`h-6 w-6 ${metric.color}`} />
                      <Badge variant="outline" className="text-xs">Key Metric</Badge>
                    </div>
                    <p className="text-gray-600 text-sm">{metric.label}</p>
                    <p className="text-3xl font-bold mt-2 text-gray-900">{metric.value}</p>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Problem Statement */}
        <div className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-xl p-8 backdrop-blur-sm">
          <div className="flex gap-4">
            <AlertCircle className="h-8 w-8 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-2xl font-bold text-red-900 mb-3">Financial Services Risk Profile</h3>
              <div className="space-y-2 text-red-800">
                {[
                  "PCI DSS compliance required for credit card processing",
                  "IRS data security requirements (NIST compliance)",
                  "Client confidentiality and privilege concerns",
                  "Wire fraud and business email compromise targeting financial transfers"
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-2">
                    <span className="text-red-600 font-bold">●</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Section */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center">Why Accounting Firms Choose Digerati</h2>
          <p className="text-xl text-gray-700 text-center max-w-3xl mx-auto">
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
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 rounded-xl blur opacity-0 group-hover:opacity-10 transition-all duration-300" />
                <Card className="relative h-full bg-white hover:shadow-xl transition-all duration-300 border-2 border-white hover:border-green-100">
                  <CardHeader>
                    <Icon className="h-10 w-10 text-green-600 mb-2 group-hover:scale-110 transition-transform" />
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <p className="text-sm text-gray-600 mt-2">{service.desc}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                          <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
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
        <div className="bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 rounded-xl p-12 border border-green-100/50">
          <h3 className="text-2xl font-bold text-center mb-8">Enterprise-Grade Certifications</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { badge: "SOC 2", label: "Type II Certified", color: "from-green-500 to-emerald-500" },
              { badge: "ISO 27001", label: "Information Security", color: "from-emerald-500 to-teal-500" },
              { badge: "PCI DSS", label: "Level 1 Compliant", color: "from-teal-500 to-cyan-500" },
              { badge: "NIST", label: "Framework Aligned", color: "from-cyan-500 to-blue-500" }
            ].map((cert, idx) => (
              <div key={idx} className="text-center p-4 bg-white/70 backdrop-blur-sm rounded-lg border border-white/50 hover:border-green-200 transition-all">
                <div className={`inline-block bg-gradient-to-r ${cert.color} text-white px-4 py-2 rounded-lg font-bold mb-2`}>
                  {cert.badge}
                </div>
                <p className="text-sm text-gray-700">{cert.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ROI Visualization */}
        <div className="grid md:grid-cols-3 gap-6 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-8 text-white">
          <div className="text-center">
            <p className="text-4xl font-bold mb-2">7 → 0</p>
            <p className="text-green-100">Audit Findings Eliminated</p>
          </div>
          <div className="text-center border-l border-r border-green-400">
            <p className="text-4xl font-bold mb-2">25%</p>
            <p className="text-green-100">Insurance Premium Reduction</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold mb-2">100%</p>
            <p className="text-green-100">Compliance Automation</p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Protect Your Firm?</h2>
          <p className="text-lg mb-6 text-green-100">Get a compliance assessment from MSP experts.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://meet.digerati-experts.com/" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-white text-green-700 hover:bg-green-50 px-8 py-3 rounded-lg font-semibold transition-all hover:shadow-lg"
              data-testid="button-schedule-accounting"
            >
              Schedule Free Assessment
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
