import { PageTemplate } from "@/components/PageTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Shield, Lock, FileText, AlertCircle, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

export default function Accounting() {
  return (
    <PageTemplate
      title="IT Solutions for Accounting & Finance"
      subtitle="PCI DSS compliant, secure financial data protection for Arizona CPAs and accounting firms"
      gradientColors="from-green-700 via-emerald-700 to-teal-700"
    >
      <div className="space-y-12">
        {/* Problem Statement */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-8">
          <div className="flex gap-4">
            <AlertCircle className="h-8 w-8 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-2xl font-bold text-red-900 mb-2">Unique Challenges for Accounting Firms</h3>
              <ul className="space-y-2 text-red-800">
                <li>• PCI DSS compliance required for credit card processing</li>
                <li>• IRS data security requirements (NIST compliance)</li>
                <li>• Client confidentiality and privilege concerns</li>
                <li>• Tax deadline pressure with zero tolerance for downtime</li>
                <li>• Wire fraud and business email compromise targeting financial transfers</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Why Digerati */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Why Accounting Firms Choose Digerati</h2>
          <p className="text-xl text-gray-700 leading-relaxed">
            Accounting firms need IT partners who understand compliance, deadline pressure, and the reality of financial data handling. We specialize in PCICDSS, wire fraud prevention, and audit-grade documentation that passes CPA firm assessments.
          </p>
        </div>

        {/* Core Services */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-8">Compliance & Security Services</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <Lock className="h-8 w-8 text-green-600 mb-2" />
                <CardTitle className="text-xl">PCI DSS Compliance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-600">Full PCI DSS compliance framework for payment processing:</p>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Secure payment gateways and terminals</li>
                  <li>✓ Tokenization and encryption for card data</li>
                  <li>✓ Quarterly security assessments and penetration testing</li>
                  <li>✓ Audit-grade compliance documentation</li>
                  <li>✓ Annual compliance certification support</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <FileText className="h-8 w-8 text-green-600 mb-2" />
                <CardTitle className="text-xl">Tax Data Protection</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-600">IRS and NIST compliance for tax and client data:</p>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ NIST cybersecurity framework alignment</li>
                  <li>✓ Encryption for sensitive client tax returns</li>
                  <li>✓ Secure document retention and destruction</li>
                  <li>✓ Access controls and audit logging</li>
                  <li>✓ Annual security posture assessments</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <DollarSign className="h-8 w-8 text-green-600 mb-2" />
                <CardTitle className="text-xl">Wire Fraud Prevention</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-600">Protect client funds from fraudulent transfer schemes:</p>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Email authentication (DMARC, SPF, DKIM)</li>
                  <li>✓ Business email compromise detection</li>
                  <li>✓ MFA enforcement for sensitive systems</li>
                  <li>✓ Wire instruction verification workflows</li>
                  <li>✓ Staff training on wire fraud tactics</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-8 w-8 text-green-600 mb-2" />
                <CardTitle className="text-xl">Backup & Disaster Recovery</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-600">Tax deadline? We ensure zero downtime:</p>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Real-time cloud backup of all client data</li>
                  <li>✓ Monthly restore testing and verification</li>
                  <li>✓ DR runbooks for tax season emergencies</li>
                  <li>✓ Ransomware recovery procedures</li>
                  <li>✓ Guaranteed RTO/RPO targets</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Specific Benefits */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-8">Why Accounting Firms Need Digerati</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Pass CPA Audits", desc: "Audit-ready documentation and compliance evidence" },
              { title: "Protect Client Data", desc: "Tax returns and financials encrypted, monitored, backed up" },
              { title: "Prevent Wire Fraud", desc: "Multi-layer email and transfer verification" },
              { title: "Tax Season Ready", desc: "Zero downtime during critical deadline periods" },
              { title: "Insurance Support", desc: "Compliance evidence that lowers cyber insurance premiums" },
              { title: "NIST/IRS Alignment", desc: "Framework-based compliance roadmap" }
            ].map((item, idx) => (
              <div key={idx} className="flex gap-3">
                <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Success Story */}
        <div className="border-l-4 border-green-600 bg-green-50 rounded-lg p-8">
          <Badge className="mb-3">Success Story</Badge>
          <h3 className="text-2xl font-bold mb-3">Phoenix CPA Firm: From Audit Findings to Zero Findings</h3>
          <p className="text-gray-700 mb-4">
            A 15-person CPA firm had significant findings in their annual security audit. They lacked PCI DSS certification, had weak access controls, and no documented compliance procedures. Digerati implemented our compliance framework, PCI DSS certification, and audit-ready documentation. Result: Zero findings in the next audit.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded p-3">
              <p className="text-sm text-gray-600">Audit Findings:</p>
              <p className="text-2xl font-bold text-red-600">7 → 0</p>
            </div>
            <div className="bg-white rounded p-3">
              <p className="text-sm text-gray-600">Insurance Premium:</p>
              <p className="text-2xl font-bold text-green-600">↓ 25%</p>
            </div>
            <div className="bg-white rounded p-3">
              <p className="text-sm text-gray-600">Compliance Time:</p>
              <p className="text-2xl font-bold text-blue-600">Automated</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Protect Your Firm?</h2>
          <p className="text-lg mb-6">Let's schedule a compliance assessment for your accounting practice.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://meet.digerati-experts.com/" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-white text-green-700 hover:bg-gray-100 px-8 py-3 rounded-md font-semibold transition-all"
              data-testid="button-schedule-accounting"
            >
              Get Free Compliance Assessment
            </a>
            <a 
              href="tel:325-480-9870"
              className="inline-flex items-center justify-center border-2 border-white bg-transparent text-white hover:bg-white hover:text-green-700 px-8 py-3 rounded-md font-semibold transition-all"
              data-testid="button-call-accounting"
            >
              <Phone className="mr-2 h-4 w-4" />
              Call 325-480-9870
            </a>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
}
