import { PageTemplate } from "@/components/PageTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Lock, Eye, Briefcase, AlertCircle, Scale } from "lucide-react";
import { Phone } from "lucide-react";

export default function LawFirms() {
  return (
    <PageTemplate
      title="IT Solutions for Law Firms"
      subtitle="Protect client privilege, prevent data breaches, stay compliant—secure IT for Arizona attorneys"
      gradientColors="from-indigo-700 via-blue-700 to-cyan-700"
    >
      <div className="space-y-12">
        {/* Problem Statement */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-8">
          <div className="flex gap-4">
            <AlertCircle className="h-8 w-8 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-2xl font-bold text-red-900 mb-2">Critical Risks for Law Firms</h3>
              <ul className="space-y-2 text-red-800">
                <li>• Attorney-client privilege breach = malpractice liability + regulatory action</li>
                <li>• Ransomware targeting law firms for case files and settlement amounts</li>
                <li>• Wire transfer fraud targeting client trust accounts</li>
                <li>• ABA Cybersecurity Requirements (2024) for data security and incident response</li>
                <li>• Opposing counsel phishing and social engineering attacks</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Why Digerati */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Why Law Firms Choose Digerati</h2>
          <p className="text-xl text-gray-700 leading-relaxed">
            Law firms require IT partners who understand privilege, confidentiality, and ABA compliance. We specialize in encryption, secure document handling, incident response, and documented security procedures that protect your reputation and your clients.
          </p>
        </div>

        {/* Core Services */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-8">Legal-Focused Security Services</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <Lock className="h-8 w-8 text-indigo-600 mb-2" />
                <CardTitle className="text-xl">Privilege & Encryption</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-600">Protect attorney-client communications:</p>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ End-to-end encrypted email for client communications</li>
                  <li>✓ Secure file sharing for confidential documents</li>
                  <li>✓ Case file encryption at rest and in transit</li>
                  <li>✓ Access controls limiting document viewing to authorized attorneys</li>
                  <li>✓ Audit trails for every document access</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Eye className="h-8 w-8 text-indigo-600 mb-2" />
                <CardTitle className="text-xl">Trust Account Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-600">Prevent wire fraud and unauthorized transfers:</p>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Multi-factor authentication for trust account access</li>
                  <li>✓ Email authentication (DMARC, SPF, DKIM) for wire instructions</li>
                  <li>✓ Dual approval workflows for large transfers</li>
                  <li>✓ Secure out-of-band verification of wire instructions</li>
                  <li>✓ Staff training on wire fraud and attorney scams</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Briefcase className="h-8 w-8 text-indigo-600 mb-2" />
                <CardTitle className="text-xl">ABA Compliance Framework</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-600">Meet 2024 ABA Cybersecurity Requirements:</p>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Cybersecurity incident response plan</li>
                  <li>✓ Client data protection documentation</li>
                  <li>✓ Regular security training for attorneys and staff</li>
                  <li>✓ Annual cybersecurity assessments</li>
                  <li>✓ Vendor risk management for practice management systems</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Scale className="h-8 w-8 text-indigo-600 mb-2" />
                <CardTitle className="text-xl">Backup & Recovery</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-600">Ensure case continuity no matter what:</p>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Real-time backup of all case files and documents</li>
                  <li>✓ Ransomware recovery procedures (immutable backups)</li>
                  <li>✓ Monthly restore testing and verification</li>
                  <li>✓ Guaranteed restore times (RTO/RPO)</li>
                  <li>✓ Incident response coordination for breach situations</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Why Law Firms Need Digerati */}
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-8">Why Protect Your Firm Now?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Meet ABA Requirements", desc: "2024 cybersecurity compliance for Arizona attorneys" },
              { title: "Protect Privilege", desc: "Attorney-client communications encrypted and confidential" },
              { title: "Trust Account Safety", desc: "Multi-layer protection against wire fraud and theft" },
              { title: "Avoid Malpractice", desc: "Documented security posture defends against claims" },
              { title: "Client Confidence", desc: "Demonstrate commitment to data protection" },
              { title: "Incident Ready", desc: "Documented response plan + forensic capabilities" }
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

        {/* Success Story */}
        <div className="border-l-4 border-indigo-600 bg-indigo-50 rounded-lg p-8">
          <Badge className="mb-3">Success Story</Badge>
          <h3 className="text-2xl font-bold mb-3">Phoenix Law Firm: From 0 Security to ABA-Ready</h3>
          <p className="text-gray-700 mb-4">
            A 20-attorney Phoenix firm had no formal cybersecurity program, no encryption, and no documented incident response plan. They were exposed to ABA compliance violations, malpractice liability, and client data breaches. Digerati implemented end-to-end encryption, trust account security, incident response procedures, and staff training. Result: Full ABA compliance + zero security incidents.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded p-3">
              <p className="text-sm text-gray-600">Compliance Rating:</p>
              <p className="text-2xl font-bold text-red-600">0 → ABA Ready</p>
            </div>
            <div className="bg-white rounded p-3">
              <p className="text-sm text-gray-600">Data Protection:</p>
              <p className="text-2xl font-bold text-green-600">100% Encrypted</p>
            </div>
            <div className="bg-white rounded p-3">
              <p className="text-sm text-gray-600">Incident Response:</p>
              <p className="text-2xl font-bold text-blue-600">Documented</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Protect Your Practice?</h2>
          <p className="text-lg mb-6">Let's schedule a compliance review and security assessment for your firm.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://meet.digerati-experts.com/" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-white text-indigo-700 hover:bg-gray-100 px-8 py-3 rounded-md font-semibold transition-all"
              data-testid="button-schedule-law"
            >
              Get Security Consultation
            </a>
            <a 
              href="tel:325-480-9870"
              className="inline-flex items-center justify-center border-2 border-white bg-transparent text-white hover:bg-white hover:text-indigo-700 px-8 py-3 rounded-md font-semibold transition-all"
              data-testid="button-call-law"
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
