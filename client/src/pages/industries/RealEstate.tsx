import { PageTemplate } from "@/components/PageTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, DollarSign, Shield, Lock, TrendingDown } from "lucide-react";
import { Phone } from "lucide-react";

export default function RealEstate() {
  return (
    <PageTemplate
      title="IT Solutions for Real Estate Professionals"
      subtitle="Prevent wire fraud, protect transaction data, stay compliant—secure IT for Arizona real estate"
      gradientColors="from-indigo-700 via-blue-700 to-cyan-700"
    >
      <div className="space-y-12">
        {/* Wire Fraud Warning */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-8">
          <div className="flex gap-4">
            <AlertCircle className="h-8 w-8 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-2xl font-bold text-red-900 mb-2">Real Estate Wire Fraud: A Growing Threat</h3>
              <ul className="space-y-2 text-red-800">
                <li>• $1.9 BILLION in real estate wire fraud losses in 2023</li>
                <li>• Criminals impersonate title companies, attorneys, and lenders</li>
                <li>• Fake wire instructions sent to real estate agents and buyers</li>
                <li>• TRID/RESPA violations from inadequate data security</li>
                <li>• Lost commissions and catastrophic client losses</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Why Digerati */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Why Real Estate Professionals Need Digerati</h2>
          <p className="text-xl text-gray-700 leading-relaxed">
            Real estate professionals handle high-value transactions and sensitive client data. We specialize in wire fraud prevention, secure closing coordination, TRID compliance, and documented transaction security that protects your clients, your reputation, and your bottom line.
          </p>
        </div>

        {/* Core Services */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-8">Transaction Security Services</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <DollarSign className="h-8 w-8 text-indigo-600 mb-2" />
                <CardTitle className="text-xl">Wire Fraud Prevention</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-600">Multi-layer protection against wire fraud:</p>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Email authentication (DMARC, SPF, DKIM) to prevent spoofing</li>
                  <li>✓ Business email compromise detection and alerts</li>
                  <li>✓ MFA for all systems accessing wire instructions</li>
                  <li>✓ Secure out-of-band verification (phone call confirmation)</li>
                  <li>✓ Staff training on wire fraud tactics and red flags</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Lock className="h-8 w-8 text-indigo-600 mb-2" />
                <CardTitle className="text-xl">Document Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-600">Protect sensitive transaction documents:</p>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ End-to-end encrypted file sharing for contracts</li>
                  <li>✓ Closing document protection and access controls</li>
                  <li>✓ Secure portal for client document uploads/downloads</li>
                  <li>✓ Audit trails for who accessed what when</li>
                  <li>✓ Compliance with TRID document retention</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-8 w-8 text-indigo-600 mb-2" />
                <CardTitle className="text-xl">TRID & RESPA Compliance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-600">Meet federal transaction requirements:</p>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Document retention and compliance tracking</li>
                  <li>✓ Secure eSignature with audit trail</li>
                  <li>✓ APR calculation documentation</li>
                  <li>✓ Closing disclosure and transaction logging</li>
                  <li>✓ Annual compliance certifications</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <TrendingDown className="h-8 w-8 text-indigo-600 mb-2" />
                <CardTitle className="text-xl">Ransomware Protection</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-600">Backup and recovery for closing emergencies:</p>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Real-time backup of MLS, contracts, and closing documents</li>
                  <li>✓ Immutable backups prevent ransomware encryption</li>
                  <li>✓ Fast recovery to keep closings on schedule</li>
                  <li>✓ Guaranteed RTO/RPO targets</li>
                  <li>✓ Incident response coordination</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Why Real Estate Professionals Need Digerati */}
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-8">Protect Your Transactions & Reputation</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Prevent Wire Fraud", desc: "Stop criminals before they steal client funds" },
              { title: "Protect Commissions", desc: "Secure document handling keeps deals alive" },
              { title: "TRID Compliant", desc: "Documented processes meet federal requirements" },
              { title: "Client Confidence", desc: "Demonstrate professional-grade security" },
              { title: "Zero Downtime", desc: "Backups keep you operational during closings" },
              { title: "Insurance Support", desc: "Compliance evidence lowers coverage costs" }
            ].map((item, idx) => (
              <div key={idx} className="flex gap-3">
                <CheckCircle className="h-6 w-6 text-indigo-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Wire Fraud Prevention Checklist */}
        <div className="border-l-4 border-red-600 bg-red-50 rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-4">Wire Fraud Prevention Checklist</h3>
          <p className="text-gray-700 mb-4">Is your team protected?</p>
          <div className="space-y-3">
            {[
              "Do you verify wire instructions via phone call (not email)?",
              "Are your email systems protected against spoofing attacks?",
              "Is MFA enabled on all banking/payment systems?",
              "Do your agents know the warning signs of wire fraud?",
              "Can you quickly recover from a ransomware attack?",
              "Do you have documented transaction security procedures?"
            ].map((q, idx) => (
              <div key={idx} className="flex gap-3">
                <div className="w-6 h-6 rounded border-2 border-red-600 flex-shrink-0 flex items-center justify-center">
                  <span className="text-xs text-red-600">?</span>
                </div>
                <p className="text-gray-700">{q}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Protect Your Transactions?</h2>
          <p className="text-lg mb-6">Let's schedule a free security assessment for your real estate business.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://meet.digerati-experts.com/" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-white text-indigo-700 hover:bg-gray-100 px-8 py-3 rounded-md font-semibold transition-all"
              data-testid="button-schedule-real-estate"
            >
              Get Security Assessment
            </a>
            <a 
              href="tel:325-480-9870"
              className="inline-flex items-center justify-center border-2 border-white bg-transparent text-white hover:bg-white hover:text-indigo-700 px-8 py-3 rounded-md font-semibold transition-all"
              data-testid="button-call-real-estate"
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
