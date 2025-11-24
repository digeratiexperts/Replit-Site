import { MegaMenu } from "@/components/MegaMenu";
import { DigeratiEnhancedFooterSection } from "@/pages/sections/DigeratiEnhancedFooterSection";
import { Shield, Lock, FileCheck, Award, Eye, Server } from "lucide-react";

export default function TrustCenter() {
  return (
    <div className="min-h-screen bg-white">
      <MegaMenu />
      
      <section className="bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="h-12 w-12 text-purple-400" />
              <h1 className="text-4xl md:text-5xl font-bold">Trust Center</h1>
            </div>
            <p className="text-xl text-gray-300">
              Security, Compliance, and Privacy Information
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 mb-12 text-center max-w-3xl mx-auto">
              Digerati Experts is committed to maintaining the highest standards of security, compliance, 
              and privacy. Our Trust Center provides transparency into our security practices and certifications.
            </p>

            {/* Security Certifications */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all">
                <Award className="h-12 w-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">SOC 2 Type II</h3>
                <p className="text-gray-700 mb-3">
                  Independently audited security controls for Service Organization Control
                </p>
                <span className="text-sm text-green-600 font-semibold">✓ Certified</span>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all">
                <FileCheck className="h-12 w-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">HIPAA Compliant</h3>
                <p className="text-gray-700 mb-3">
                  Business Associate Agreements available for healthcare clients
                </p>
                <span className="text-sm text-green-600 font-semibold">✓ Compliant</span>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all">
                <Lock className="h-12 w-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">PCI DSS</h3>
                <p className="text-gray-700 mb-3">
                  Payment Card Industry Data Security Standard compliance
                </p>
                <span className="text-sm text-green-600 font-semibold">✓ Compliant</span>
              </div>
            </div>

            {/* Security Practices */}
            <div className="bg-gray-50 rounded-xl p-8 mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Lock className="h-8 w-8 text-purple-600" />
                Our Security Practices
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Technical Controls</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1 text-sm">
                    <li>AES-256 encryption at rest</li>
                    <li>TLS 1.3 encryption in transit</li>
                    <li>Multi-factor authentication (MFA)</li>
                    <li>24/7 Security Operations Center</li>
                    <li>Intrusion detection/prevention</li>
                    <li>Regular vulnerability scanning</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Administrative Controls</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1 text-sm">
                    <li>Background checks for all staff</li>
                    <li>Security awareness training</li>
                    <li>Incident response procedures</li>
                    <li>Annual penetration testing</li>
                    <li>Third-party security audits</li>
                    <li>NIST Cybersecurity Framework alignment</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Infrastructure Security */}
            <div className="bg-blue-50 border-l-4 border-blue-500 rounded p-8 mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Server className="h-7 w-7 text-blue-600" />
                Infrastructure Security
              </h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Data Centers:</strong> Tier III/IV facilities with physical security, redundant power, climate control</li>
                <li><strong>Network Security:</strong> Next-generation firewalls, DDoS protection, network segmentation</li>
                <li><strong>Access Controls:</strong> Role-based access control (RBAC), principle of least privilege</li>
                <li><strong>Monitoring:</strong> Real-time security information and event management (SIEM)</li>
                <li><strong>Backups:</strong> Encrypted, geographically distributed, tested regularly</li>
              </ul>
            </div>

            {/* Privacy & Compliance */}
            <div className="bg-purple-50 border-l-4 border-purple-500 rounded p-8 mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Eye className="h-7 w-7 text-purple-600" />
                Privacy & Data Protection
              </h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Privacy Policy:</strong> Comprehensive privacy practices aligned with Arizona data breach laws</li>
                <li><strong>Data Minimization:</strong> We collect only data necessary for service delivery</li>
                <li><strong>Data Retention:</strong> Clear retention schedules and secure deletion procedures</li>
                <li><strong>Client Rights:</strong> Access, correction, deletion, and portability rights</li>
                <li><strong>No Data Selling:</strong> We never sell client data to third parties</li>
              </ul>
            </div>

            {/* Request Information */}
            <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Security Documentation?</h2>
              <p className="text-gray-700 mb-6">
                Request our SOC 2 report, security questionnaires, or compliance documentation for vendor onboarding.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => window.location.href = 'mailto:security@digeratiexperts.com?subject=Security Documentation Request'}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all shadow-md"
                  data-testid="button-request-docs"
                >
                  Request Documentation
                </button>
                <button
                  onClick={() => window.location.href = 'tel:325-480-9870'}
                  className="border-2 border-purple-600 text-purple-600 px-6 py-3 rounded-lg hover:bg-purple-50 transition-all"
                >
                  Call 325-480-9870
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DigeratiEnhancedFooterSection />
    </div>
  );
}
