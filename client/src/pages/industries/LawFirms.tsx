import { PageTemplate } from "@/components/PageTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Lock, Eye, Briefcase, AlertCircle, Scale, Shield, Clock } from "lucide-react";

export default function LawFirms() {
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
      gradientColors="from-indigo-700 via-blue-700 to-cyan-700"
    >
      <div className="space-y-16">
        {/* Risk Assessment Cards */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Security Risk Assessment</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {riskFactors.map((item, idx) => {
              const Icon = item.icon;
              const severity = item.severity === "Critical" ? "bg-red-100 text-red-700 border-red-200" : "bg-amber-100 text-amber-700 border-amber-200";
              return (
                <Card key={idx} className="border-2 hover:shadow-lg transition-all">
                  <CardContent className="pt-6">
                    <Icon className="h-8 w-8 text-indigo-600 mb-3" />
                    <h3 className="font-semibold text-gray-900 mb-2">{item.factor}</h3>
                    <Badge className={`${severity} border`}>{item.severity}</Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Critical Risks */}
        <div className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-xl p-8">
          <div className="flex gap-4">
            <AlertCircle className="h-8 w-8 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-2xl font-bold text-red-900 mb-3">Critical Compliance Risks</h3>
              <div className="space-y-2 text-red-800">
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
          <h2 className="text-3xl font-bold">Legal-Focused Security Services</h2>
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

        {/* Compliance Dashboard */}
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-8 border border-indigo-100/50">
          <h3 className="text-2xl font-bold mb-8 text-center">ABA Compliance Checklist</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Cybersecurity incident response plan",
              "Client data protection documentation",
              "Regular security training for staff",
              "Annual cybersecurity assessments",
              "Vendor risk management",
              "Encryption for sensitive documents"
            ].map((item, idx) => (
              <div key={idx} className="flex gap-3 p-3 bg-white/70 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Success Metrics */}
        <div className="grid md:grid-cols-3 gap-6 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl p-8 text-white">
          <div className="text-center">
            <p className="text-4xl font-bold mb-2">20+</p>
            <p className="text-indigo-100">Law Firms Protected</p>
          </div>
          <div className="text-center border-l border-r border-indigo-400">
            <p className="text-4xl font-bold mb-2">0</p>
            <p className="text-indigo-100">Privilege Breaches</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold mb-2">100%</p>
            <p className="text-indigo-100">ABA Ready Firms</p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Protect Your Practice?</h2>
          <p className="text-lg mb-6 text-indigo-100">ABA compliance + security consultation from MSP experts.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://meet.digerati-experts.com/" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-white text-indigo-700 hover:bg-indigo-50 px-8 py-3 rounded-lg font-semibold transition-all hover:shadow-lg"
              data-testid="button-schedule-law"
            >
              Get Security Consultation
            </a>
            <a 
              href="tel:325-480-9870"
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
