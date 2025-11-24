import { MegaMenu } from "@/components/MegaMenu";
import { DigeratiEnhancedFooterSection } from "@/pages/sections/DigeratiEnhancedFooterSection";
import { Shield, Lock, Database, FileText, AlertTriangle } from "lucide-react";

export default function PrivacyPolicy() {
  const lastUpdated = "November 6, 2025";

  return (
    <div className="min-h-screen bg-white">
      <MegaMenu />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="h-12 w-12 text-purple-400" />
              <h1 className="text-4xl md:text-5xl font-bold">Privacy Policy</h1>
            </div>
            <p className="text-xl text-gray-300">
              Last Updated: {lastUpdated}
            </p>
            <p className="mt-4 text-lg text-gray-300">
              Digerati Experts is committed to protecting your privacy and the security of your data. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
              in accordance with Arizona and federal laws.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            
            {/* Introduction */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-700 leading-relaxed">
                Digerati Experts ("we," "our," or "us") is a Managed Security Service Provider (MSP/MSSP) 
                based in Chandler, Arizona. We provide managed IT services, cybersecurity solutions, 
                compliance support, and related technology services to businesses throughout Arizona and beyond.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                This Privacy Policy applies to information collected through our website at digeratiexperts.com, 
                our client portal, and in the course of providing our managed services to clients.
              </p>
            </div>

            {/* Information We Collect */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Database className="h-8 w-8 text-purple-600" />
                2. Information We Collect
              </h2>
              
              <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">2.1 Personal Information</h3>
              <p className="text-gray-700 mb-4">We collect personal information that you voluntarily provide when you:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Request a free security assessment or consultation</li>
                <li>Subscribe to our newsletter or security alerts</li>
                <li>Contact us for support or inquiries</li>
                <li>Engage our services as a client</li>
                <li>Access our client portal</li>
                <li>Submit a support ticket</li>
              </ul>

              <p className="text-gray-700 mb-4">This may include:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Name, email address, phone number</li>
                <li>Company name, job title, business address</li>
                <li>Payment and billing information</li>
                <li>Technical information about your IT environment (for service delivery)</li>
                <li>Communications with our support team</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">2.2 Client Data</h3>
              <p className="text-gray-700 mb-4">
                When providing managed services, we may have access to and process certain data on behalf of our clients, including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li><strong>Protected Health Information (PHI)</strong>: For healthcare clients, governed by HIPAA Business Associate Agreements</li>
                <li><strong>Cardholder Data</strong>: For clients subject to PCI DSS requirements</li>
                <li><strong>System logs and security event data</strong>: Collected through monitoring and security tools</li>
                <li><strong>Network traffic metadata</strong>: For security monitoring purposes</li>
                <li><strong>Employee account information</strong>: For user management and access control</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">2.3 Automatically Collected Information</h3>
              <p className="text-gray-700 mb-4">When you visit our website, we automatically collect:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>IP address and browser type</li>
                <li>Pages viewed and time spent on pages</li>
                <li>Referring website addresses</li>
                <li>Operating system and device information</li>
                <li>Cookies and similar tracking technologies (see Section 8)</li>
              </ul>
            </div>

            {/* How We Use Information */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
              
              <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">3.1 Service Delivery</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Provide 24/7 security monitoring and incident response</li>
                <li>Manage and maintain IT infrastructure and systems</li>
                <li>Detect, prevent, and respond to security threats</li>
                <li>Perform vulnerability assessments and penetration testing</li>
                <li>Backup and disaster recovery services</li>
                <li>Compliance monitoring and reporting (HIPAA, PCI DSS, etc.)</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">3.2 Business Operations</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Respond to inquiries and provide customer support</li>
                <li>Process payments and manage billing</li>
                <li>Send service notifications and security alerts</li>
                <li>Improve our services and develop new offerings</li>
                <li>Conduct internal analytics and research</li>
                <li>Comply with legal and regulatory obligations</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">3.3 Marketing Communications</h3>
              <p className="text-gray-700">
                With your consent, we may send marketing emails about our services, security advisories, 
                webinars, and industry insights. You may opt out at any time using the unsubscribe link in our emails.
              </p>
            </div>

            {/* Data Security */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Lock className="h-8 w-8 text-purple-600" />
                4. Data Security Measures
              </h2>
              <p className="text-gray-700 mb-4">
                As a cybersecurity provider, we implement industry-leading security measures to protect your information:
              </p>
              
              <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">4.1 Technical Safeguards</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li><strong>Encryption</strong>: AES-256 encryption for data at rest; TLS 1.3 for data in transit</li>
                <li><strong>Access Controls</strong>: Role-based access control (RBAC) and multi-factor authentication (MFA)</li>
                <li><strong>Network Security</strong>: Next-generation firewalls, intrusion detection/prevention systems</li>
                <li><strong>Endpoint Protection</strong>: Advanced endpoint detection and response (EDR) on all systems</li>
                <li><strong>Security Monitoring</strong>: 24/7 Security Operations Center (SOC) monitoring</li>
                <li><strong>Vulnerability Management</strong>: Regular security scans and patch management</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">4.2 Administrative Safeguards</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Security policies and procedures aligned with NIST Cybersecurity Framework</li>
                <li>Regular security awareness training for all employees</li>
                <li>Background checks for employees with access to sensitive data</li>
                <li>Incident response and business continuity plans</li>
                <li>Annual security audits and penetration testing</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">4.3 Certifications & Compliance</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>SOC 2 Type II certified</li>
                <li>HIPAA compliant (Business Associate Agreements available)</li>
                <li>PCI DSS compliant service provider</li>
                <li>Team members hold CISSP, CCSP, CEH, and Security+ certifications</li>
              </ul>
            </div>

            {/* Arizona Data Breach Notification */}
            <div className="mb-12 bg-amber-50 border-l-4 border-amber-500 p-6 rounded">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <AlertTriangle className="h-8 w-8 text-amber-600" />
                5. Arizona Data Breach Notification
              </h2>
              <p className="text-gray-700 mb-4">
                In compliance with Arizona Revised Statutes § 18-545, we will notify affected individuals 
                and the Arizona Attorney General in the event of a data breach involving unencrypted personal information.
              </p>
              
              <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">5.1 Personal Information Covered</h3>
              <p className="text-gray-700 mb-4">
                Arizona law defines personal information as your first name or initial and last name combined with:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Social Security number</li>
                <li>Driver's license or Arizona identification card number</li>
                <li>Financial account numbers, credit/debit card numbers with security codes</li>
                <li>Medical or health insurance information</li>
                <li>Biometric data (fingerprints, voiceprints, retina scans)</li>
                <li>Username/email with password or security question answers</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">5.2 Notification Timeline</h3>
              <p className="text-gray-700 mb-4">
                We will provide notice of any breach affecting personal information <strong>within 45 days</strong> of discovery, 
                unless a law enforcement agency determines that notification would impede a criminal investigation.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">5.3 Notification Method</h3>
              <p className="text-gray-700">
                Notification will be provided by email, written notice, or telephone. If 1,000 or more Arizona 
                residents are affected, we will also notify the three major credit bureaus (TransUnion, Equifax, Experian).
              </p>
            </div>

            {/* Information Sharing */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">6. Information Sharing and Disclosure</h2>
              
              <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">6.1 We Do NOT Sell Your Data</h3>
              <p className="text-gray-700 mb-4">
                <strong>We do not sell, rent, or trade your personal information to third parties.</strong> Your data 
                is used solely for providing our services and protecting your security.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">6.2 Service Providers</h3>
              <p className="text-gray-700 mb-4">We may share information with trusted service providers who assist us:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Cloud infrastructure providers (with Business Associate Agreements for HIPAA compliance)</li>
                <li>Security tool vendors (SIEM, EDR, vulnerability scanning platforms)</li>
                <li>Payment processors for billing services</li>
                <li>Professional service providers (legal, accounting, insurance)</li>
              </ul>
              <p className="text-gray-700 mb-4">
                All service providers are contractually required to maintain the confidentiality and security of your information.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">6.3 Legal Obligations</h3>
              <p className="text-gray-700 mb-4">We may disclose information when required by law:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>In response to valid legal process (subpoenas, court orders)</li>
                <li>To comply with data breach notification laws</li>
                <li>To protect our rights, property, or safety</li>
                <li>To prevent fraud or criminal activity</li>
                <li>With your explicit consent</li>
              </ul>
            </div>

            {/* Data Retention */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">7. Data Retention and Deletion</h2>
              <p className="text-gray-700 mb-4">
                We retain your information only as long as necessary to provide services and comply with legal obligations:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li><strong>Client Data</strong>: Retained per your Master Service Agreement, typically through contract term + 7 years</li>
                <li><strong>Security Logs</strong>: Retained for 1 year minimum (compliance requirements may extend this)</li>
                <li><strong>Backups</strong>: Retained per backup retention policy (typically 30-90 days)</li>
                <li><strong>Marketing Data</strong>: Until you opt out or request deletion</li>
                <li><strong>Billing Records</strong>: 7 years per tax and accounting requirements</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">7.1 Secure Deletion</h3>
              <p className="text-gray-700">
                When data is deleted, we use secure deletion methods including cryptographic erasure, overwriting, 
                and physical destruction of storage media per NIST SP 800-88 guidelines.
              </p>
            </div>

            {/* Cookies */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">8. Cookies and Tracking Technologies</h2>
              <p className="text-gray-700 mb-4">
                Our website uses cookies and similar technologies to improve your experience:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li><strong>Essential Cookies</strong>: Required for website functionality and security</li>
                <li><strong>Analytics Cookies</strong>: Help us understand how visitors use our site</li>
                <li><strong>Preference Cookies</strong>: Remember your settings and preferences</li>
              </ul>
              <p className="text-gray-700">
                You can control cookies through your browser settings. Note that disabling cookies may affect 
                website functionality.
              </p>
            </div>

            {/* Your Rights */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">9. Your Privacy Rights</h2>
              <p className="text-gray-700 mb-4">You have the following rights regarding your personal information:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li><strong>Access</strong>: Request a copy of the personal information we hold about you</li>
                <li><strong>Correction</strong>: Request correction of inaccurate or incomplete information</li>
                <li><strong>Deletion</strong>: Request deletion of your personal information (subject to legal retention requirements)</li>
                <li><strong>Opt-Out</strong>: Unsubscribe from marketing communications at any time</li>
                <li><strong>Data Portability</strong>: Request your data in a portable format</li>
                <li><strong>Restriction</strong>: Request restriction of processing in certain circumstances</li>
              </ul>

              <p className="text-gray-700 mb-4">
                To exercise these rights, contact us at <strong>privacy@digeratiexperts.com</strong> or call <strong>325-480-9870</strong>.
              </p>

              <p className="text-gray-700">
                We will respond to your request within 30 days. Please note that some requests may require identity verification.
              </p>
            </div>

            {/* HIPAA Clients */}
            <div className="mb-12 bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">10. HIPAA-Covered Clients</h2>
              <p className="text-gray-700 mb-4">
                For healthcare clients handling Protected Health Information (PHI), we act as a Business Associate 
                under HIPAA regulations:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>All PHI access is governed by executed Business Associate Agreements (BAAs)</li>
                <li>We implement HIPAA-compliant security controls per 45 CFR § 164.308-164.316</li>
                <li>Breach notification follows HIPAA Breach Notification Rule timelines</li>
                <li>PHI is never used for marketing without authorization</li>
                <li>Subcontractors handling PHI also sign BAAs</li>
              </ul>
              <p className="text-gray-700">
                For HIPAA-specific privacy practices, please refer to your Business Associate Agreement.
              </p>
            </div>

            {/* Third-Party Links */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">11. Third-Party Links</h2>
              <p className="text-gray-700">
                Our website may contain links to third-party websites. We are not responsible for the privacy 
                practices of these external sites. We encourage you to review their privacy policies before 
                providing any personal information.
              </p>
            </div>

            {/* Children's Privacy */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">12. Children's Privacy</h2>
              <p className="text-gray-700">
                Our services are not directed to individuals under 18 years of age. We do not knowingly collect 
                personal information from children. If you believe we have collected information from a child, 
                please contact us immediately.
              </p>
            </div>

            {/* International Data Transfers */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">13. International Data Transfers</h2>
              <p className="text-gray-700">
                Our services are primarily provided within the United States. We do not routinely transfer data 
                internationally. If international transfers are necessary, we implement appropriate safeguards 
                such as Standard Contractual Clauses.
              </p>
            </div>

            {/* Changes to Privacy Policy */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">14. Changes to This Privacy Policy</h2>
              <p className="text-gray-700">
                We may update this Privacy Policy periodically to reflect changes in our practices or applicable laws. 
                We will notify clients of material changes via email or prominent website notice. The "Last Updated" 
                date at the top of this policy indicates when it was last revised.
              </p>
            </div>

            {/* Contact Information */}
            <div className="mb-12 bg-purple-50 border-l-4 border-purple-500 p-6 rounded">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <FileText className="h-8 w-8 text-purple-600" />
                15. Contact Us
              </h2>
              <p className="text-gray-700 mb-4">
                If you have questions about this Privacy Policy or wish to exercise your privacy rights, please contact:
              </p>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-gray-900 font-semibold mb-2">Digerati Experts - Privacy Team</p>
                <p className="text-gray-700"><strong>Email:</strong> privacy@digeratiexperts.com</p>
                <p className="text-gray-700"><strong>Phone:</strong> 325-480-9870</p>
                <p className="text-gray-700"><strong>Address:</strong> 3165 S Alma School Rd Suite 29, Chandler, AZ 85248</p>
                <p className="text-gray-700 mt-3"><strong>Office Hours:</strong> Monday-Friday 7:00 AM - 6:00 PM MST</p>
                <p className="text-gray-700"><strong>Emergency Contact:</strong> Available 24/7 for active clients</p>
              </div>
            </div>

            {/* Effective Date */}
            <div className="mt-12 pt-8 border-t border-gray-300">
              <p className="text-gray-600 text-sm">
                This Privacy Policy is effective as of {lastUpdated} and governs our privacy practices.
              </p>
              <p className="text-gray-600 text-sm mt-2">
                © {new Date().getFullYear()} Digerati Experts. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </section>

      <DigeratiEnhancedFooterSection />
    </div>
  );
}
