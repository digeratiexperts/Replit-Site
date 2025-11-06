import { MegaMenu } from "@/components/MegaMenu";
import { DigeratiEnhancedFooterSection } from "@/pages/sections/DigeratiEnhancedFooterSection";
import { FileText, Shield, AlertTriangle, Scale, Clock, DollarSign } from "lucide-react";

export default function TermsOfUse() {
  const lastUpdated = "November 6, 2025";

  return (
    <div className="min-h-screen bg-white">
      <MegaMenu />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="h-12 w-12 text-purple-400" />
              <h1 className="text-4xl md:text-5xl font-bold">Terms of Service</h1>
            </div>
            <p className="text-xl text-gray-300">
              Last Updated: {lastUpdated}
            </p>
            <p className="mt-4 text-lg text-gray-300">
              Please read these Terms of Service carefully before using Digerati Experts' managed security 
              and IT services. These terms govern your use of our services and establish the framework for 
              our partnership in protecting your business.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            
            {/* Acceptance */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing or using Digerati Experts' services, you ("Client," "you," or "your") accept and 
                agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, 
                please do not use our services.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                These Terms apply to all users of our services, including visitors to our website, prospective 
                clients, and clients who have executed a Master Service Agreement (MSA) with Digerati Experts.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                <strong>Important:</strong> For clients who have signed an MSA or Statement of Work (SOW), 
                those specific agreements take precedence over these general Terms of Service in case of conflict.
              </p>
            </div>

            {/* Definitions */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">2. Definitions</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <ul className="space-y-3 text-gray-700">
                  <li><strong>"Services"</strong> means all managed IT services, managed security services, cybersecurity solutions, compliance support, and related services provided by Digerati Experts.</li>
                  <li><strong>"MSP"</strong> means Managed Service Provider.</li>
                  <li><strong>"MSSP"</strong> means Managed Security Service Provider.</li>
                  <li><strong>"SOC"</strong> means Security Operations Center.</li>
                  <li><strong>"PHI"</strong> means Protected Health Information as defined by HIPAA.</li>
                  <li><strong>"PCI DSS"</strong> means Payment Card Industry Data Security Standard.</li>
                  <li><strong>"SLA"</strong> means Service Level Agreement.</li>
                  <li><strong>"Client Environment"</strong> means your IT infrastructure, systems, networks, and devices managed under our Services.</li>
                </ul>
              </div>
            </div>

            {/* Services Description */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Shield className="h-8 w-8 text-purple-600" />
                3. Service Description
              </h2>
              
              <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">3.1 Managed Security Services</h3>
              <p className="text-gray-700 mb-4">Our managed security services include:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>24/7 Security Operations Center (SOC) monitoring</li>
                <li>Endpoint Detection and Response (EDR)</li>
                <li>Security Information and Event Management (SIEM)</li>
                <li>Vulnerability scanning and management</li>
                <li>Incident response and forensics</li>
                <li>Threat intelligence and analysis</li>
                <li>Security awareness training</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">3.2 Managed IT Services</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Help desk support and user assistance</li>
                <li>Network monitoring and management</li>
                <li>Server and workstation management</li>
                <li>Patch management and updates</li>
                <li>Cloud infrastructure management</li>
                <li>Backup and disaster recovery</li>
                <li>Microsoft 365 and Google Workspace administration</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">3.3 Compliance Services</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>HIPAA compliance support and Business Associate Agreements</li>
                <li>PCI DSS compliance assistance and quarterly scans</li>
                <li>NIST Cybersecurity Framework alignment</li>
                <li>Compliance evidence collection and reporting</li>
                <li>Security audits and risk assessments</li>
              </ul>
            </div>

            {/* Service Levels */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Clock className="h-8 w-8 text-purple-600" />
                4. Service Level Commitments
              </h2>
              
              <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">4.1 Response Times</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-3 px-4 text-left text-gray-900 font-semibold border-b">Priority Level</th>
                      <th className="py-3 px-4 text-left text-gray-900 font-semibold border-b">Description</th>
                      <th className="py-3 px-4 text-left text-gray-900 font-semibold border-b">Response Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-4 text-gray-700"><strong>Critical</strong></td>
                      <td className="py-3 px-4 text-gray-700">Active security breach, complete system outage</td>
                      <td className="py-3 px-4 text-gray-700">15 minutes</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 text-gray-700"><strong>High</strong></td>
                      <td className="py-3 px-4 text-gray-700">Major functionality impaired, security alert</td>
                      <td className="py-3 px-4 text-gray-700">1 hour</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 text-gray-700"><strong>Medium</strong></td>
                      <td className="py-3 px-4 text-gray-700">Partial functionality loss, non-critical issues</td>
                      <td className="py-3 px-4 text-gray-700">4 hours</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-gray-700"><strong>Low</strong></td>
                      <td className="py-3 px-4 text-gray-700">Questions, requests, minor issues</td>
                      <td className="py-3 px-4 text-gray-700">Next business day</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">4.2 Service Availability</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li><strong>SOC Monitoring:</strong> 99.9% uptime (excluding scheduled maintenance)</li>
                <li><strong>Help Desk:</strong> Available Monday-Friday 7:00 AM - 6:00 PM MST</li>
                <li><strong>Emergency Support:</strong> 24/7/365 for critical incidents</li>
                <li><strong>Scheduled Maintenance:</strong> Announced 5 business days in advance when possible</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">4.3 Service Credits</h3>
              <p className="text-gray-700">
                If we fail to meet our committed response times or service availability, you may be eligible 
                for service credits as specified in your Master Service Agreement.
              </p>
            </div>

            {/* Client Responsibilities */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">5. Client Responsibilities</h2>
              <p className="text-gray-700 mb-4">To ensure effective service delivery, you agree to:</p>
              
              <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">5.1 Access and Cooperation</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Provide remote and on-site access to your IT environment as needed</li>
                <li>Designate a primary contact person for escalations and approvals</li>
                <li>Respond promptly to requests for information or approvals</li>
                <li>Provide accurate asset inventory and network documentation</li>
                <li>Grant administrative credentials necessary for service delivery</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">5.2 Security Best Practices</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Implement our recommended security policies and procedures</li>
                <li>Ensure employees complete required security awareness training</li>
                <li>Notify us immediately of any suspected security incidents</li>
                <li>Not disable or bypass security controls without authorization</li>
                <li>Maintain current and valid software licenses</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">5.3 Compliance Obligations</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Inform us of any applicable compliance requirements (HIPAA, PCI DSS, etc.)</li>
                <li>Execute Business Associate Agreements for HIPAA-covered entities</li>
                <li>Maintain cyber insurance as recommended</li>
                <li>Comply with applicable laws and regulations</li>
              </ul>
            </div>

            {/* Compliance & Regulations */}
            <div className="mb-12 bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">6. Compliance and Regulatory Support</h2>
              
              <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">6.1 HIPAA Compliance</h3>
              <p className="text-gray-700 mb-4">
                For healthcare clients handling Protected Health Information (PHI):
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>We act as a Business Associate under HIPAA regulations</li>
                <li>A Business Associate Agreement (BAA) must be executed before handling PHI</li>
                <li>We implement HIPAA-required administrative, physical, and technical safeguards</li>
                <li>Breach notification follows HIPAA Breach Notification Rule requirements</li>
                <li>We maintain documentation required for compliance audits</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">6.2 PCI DSS Compliance</h3>
              <p className="text-gray-700 mb-4">
                For clients who process, store, or transmit payment card data:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>We assist with PCI DSS compliance requirements</li>
                <li>Quarterly vulnerability scans by approved scanning vendor (ASV)</li>
                <li>Network segmentation and cardholder data environment (CDE) protection</li>
                <li>Support for annual Self-Assessment Questionnaire (SAQ) completion</li>
                <li>We maintain our own PCI DSS compliance as a service provider</li>
              </ul>
            </div>

            {/* Payment Terms */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <DollarSign className="h-8 w-8 text-purple-600" />
                7. Payment Terms
              </h2>
              
              <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">7.1 Fees and Billing</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Services are billed monthly in advance</li>
                <li>Pricing based on per-user, per-site, or project-based fees as specified in your agreement</li>
                <li>Invoices are due within 30 days of invoice date</li>
                <li>Accepted payment methods: ACH, wire transfer, check, credit card (processing fee may apply)</li>
                <li>Late payments subject to 1% monthly interest (or maximum allowed by Arizona law)</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">7.2 Price Changes</h3>
              <p className="text-gray-700 mb-4">
                We may increase prices with 60 days' written notice. Annual price increases typically 
                do not exceed 3-5% per year.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">7.3 Non-Payment</h3>
              <p className="text-gray-700">
                If payment is not received within 45 days of the due date, we reserve the right to 
                suspend services with 5 business days' written notice. Client remains liable for all 
                fees incurred through the end of the contract term.
              </p>
            </div>

            {/* Term and Termination */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">8. Term and Termination</h2>
              
              <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">8.1 Contract Term</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Initial term: Typically 1-3 years from effective date</li>
                <li>Automatic renewal: Month-to-month or annual unless 90 days' written notice provided</li>
                <li>Early termination fee may apply if terminated before initial term ends</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">8.2 Termination for Cause</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Either party may terminate for material breach with 30 days to cure</li>
                <li>Immediate termination permitted for: bankruptcy, illegal activities, non-payment (after notice)</li>
                <li>We may terminate immediately if Client's actions compromise security of other clients</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">8.3 Effect of Termination</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>All outstanding fees become immediately due</li>
                <li>We will provide data export and transition assistance (fees may apply)</li>
                <li>Client data returned or securely destroyed within 30 days per your instruction</li>
                <li>Security monitoring and incident response services cease</li>
                <li>Access to client portal and support systems removed</li>
              </ul>
            </div>

            {/* Warranties and Disclaimers */}
            <div className="mb-12 bg-amber-50 border-l-4 border-amber-500 p-6 rounded">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <AlertTriangle className="h-8 w-8 text-amber-600" />
                9. Warranties and Disclaimers
              </h2>
              
              <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">9.1 Our Warranties</h3>
              <p className="text-gray-700 mb-4">We warrant that:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Services will be performed in a professional and workmanlike manner</li>
                <li>We will use commercially reasonable efforts to provide services as described</li>
                <li>We maintain appropriate certifications and insurance</li>
                <li>Our team members are qualified and trained</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">9.2 Disclaimer</h3>
              <p className="text-gray-700 mb-4">
                <strong>EXCEPT AS EXPRESSLY STATED, SERVICES ARE PROVIDED "AS IS" WITHOUT WARRANTIES 
                OF ANY KIND, EXPRESS OR IMPLIED.</strong> We do not warrant that:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Services will be uninterrupted or error-free</li>
                <li>All security threats will be detected or prevented</li>
                <li>All vulnerabilities will be identified</li>
                <li>Your systems will be 100% secure</li>
                <li>Data loss will never occur</li>
              </ul>
              <p className="text-gray-700 mt-4">
                <strong>No security solution can guarantee complete protection.</strong> Cybersecurity 
                requires ongoing vigilance, and new threats emerge constantly. Our services significantly 
                reduce risk but cannot eliminate it entirely.
              </p>
            </div>

            {/* Limitation of Liability */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Scale className="h-8 w-8 text-purple-600" />
                10. Limitation of Liability
              </h2>
              
              <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">10.1 Liability Cap</h3>
              <p className="text-gray-700 mb-4">
                <strong>IN NO EVENT SHALL DIGERATI EXPERTS' TOTAL LIABILITY EXCEED THE FEES PAID BY CLIENT 
                IN THE 12 MONTHS PRECEDING THE CLAIM, OR $100,000, WHICHEVER IS GREATER.</strong>
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">10.2 Excluded Damages</h3>
              <p className="text-gray-700 mb-4">
                <strong>WE SHALL NOT BE LIABLE FOR:</strong>
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Indirect, incidental, special, consequential, or punitive damages</li>
                <li>Loss of profits, revenue, data, or business opportunities</li>
                <li>Cost of substitute services or equipment</li>
                <li>Damage caused by Client's failure to follow our recommendations</li>
                <li>Breaches resulting from Client's employees, contractors, or third parties</li>
                <li>Force majeure events beyond our reasonable control</li>
                <li>Damages exceeding the liability cap stated above</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">10.3 Exceptions to Limitations</h3>
              <p className="text-gray-700">
                Limitations do not apply to: (a) our gross negligence or willful misconduct, 
                (b) violation of intellectual property rights, (c) breach of confidentiality, 
                (d) indemnification obligations, or (e) amounts not covered by insurance.
              </p>
            </div>

            {/* Indemnification */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">11. Indemnification</h2>
              
              <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">11.1 Client Indemnification</h3>
              <p className="text-gray-700 mb-4">
                Client agrees to indemnify and hold Digerati Experts harmless from claims arising from:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Your violation of these Terms or applicable laws</li>
                <li>Your misuse of our services</li>
                <li>Unauthorized access to your systems by your employees or contractors</li>
                <li>Your failure to implement recommended security controls</li>
                <li>Content or data you provide or store</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">11.2 Our Indemnification</h3>
              <p className="text-gray-700">
                We will indemnify you against third-party claims alleging that our services infringe 
                intellectual property rights, subject to notification and cooperation requirements.
              </p>
            </div>

            {/* Insurance */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">12. Insurance Requirements</h2>
              <p className="text-gray-700 mb-4">Digerati Experts maintains the following insurance coverage:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li><strong>Cyber Liability Insurance:</strong> $2,000,000 per occurrence</li>
                <li><strong>Professional Liability (E&O):</strong> $2,000,000 per occurrence</li>
                <li><strong>General Liability:</strong> $1,000,000 per occurrence</li>
                <li><strong>Workers' Compensation:</strong> As required by Arizona law</li>
              </ul>
              <p className="text-gray-700">
                Certificates of insurance available upon request. We recommend clients maintain their 
                own cyber liability insurance.
              </p>
            </div>

            {/* Confidentiality */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">13. Confidentiality</h2>
              <p className="text-gray-700 mb-4">
                Both parties agree to protect each other's confidential information, including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Trade secrets and proprietary information</li>
                <li>Business operations and strategies</li>
                <li>Financial information</li>
                <li>Customer data and system configurations</li>
                <li>Security vulnerabilities and incident details</li>
              </ul>
              <p className="text-gray-700">
                Confidential information may be disclosed only to employees and contractors with a need 
                to know, and must be returned or destroyed upon termination.
              </p>
            </div>

            {/* Force Majeure */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">14. Force Majeure</h2>
              <p className="text-gray-700">
                Neither party shall be liable for failure to perform due to causes beyond reasonable control, 
                including: natural disasters, war, terrorism, labor disputes, government actions, pandemics, 
                or internet/telecommunications failures. Performance obligations are suspended during force 
                majeure events but resume when the event ends.
              </p>
            </div>

            {/* Dispute Resolution */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">15. Dispute Resolution</h2>
              
              <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">15.1 Governing Law</h3>
              <p className="text-gray-700 mb-4">
                These Terms are governed by the laws of the State of Arizona, without regard to conflict 
                of law principles.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">15.2 Arbitration</h3>
              <p className="text-gray-700 mb-4">
                Disputes shall be resolved through binding arbitration in Maricopa County, Arizona, 
                under the rules of the American Arbitration Association (AAA). Each party bears its 
                own costs; arbitrator fees split equally.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">15.3 Exceptions</h3>
              <p className="text-gray-700">
                Either party may seek injunctive relief in court for: intellectual property disputes, 
                confidentiality breaches, or unauthorized access to systems.
              </p>
            </div>

            {/* General Provisions */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">16. General Provisions</h2>
              
              <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">16.1 Entire Agreement</h3>
              <p className="text-gray-700 mb-4">
                These Terms, together with your Master Service Agreement and any Statements of Work, 
                constitute the entire agreement between the parties.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">16.2 Amendments</h3>
              <p className="text-gray-700 mb-4">
                We may update these Terms with 30 days' notice. Material changes require written notice. 
                Continued use of services constitutes acceptance of updated Terms.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">16.3 Assignment</h3>
              <p className="text-gray-700 mb-4">
                Client may not assign this agreement without our written consent. We may assign to 
                affiliates or in connection with merger, acquisition, or sale of assets.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">16.4 Severability</h3>
              <p className="text-gray-700 mb-4">
                If any provision is found invalid or unenforceable, remaining provisions remain in full effect.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">16.5 Waiver</h3>
              <p className="text-gray-700 mb-4">
                Failure to enforce any provision does not constitute a waiver of future enforcement.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">16.6 Survival</h3>
              <p className="text-gray-700">
                Provisions regarding payment, confidentiality, intellectual property, liability limitations, 
                and indemnification survive termination of the agreement.
              </p>
            </div>

            {/* Contact Information */}
            <div className="mb-12 bg-purple-50 border-l-4 border-purple-500 p-6 rounded">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">17. Contact Us</h2>
              <p className="text-gray-700 mb-4">
                For questions about these Terms of Service or to request service agreements, contact:
              </p>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-gray-900 font-semibold mb-2">Digerati Experts - Legal Department</p>
                <p className="text-gray-700"><strong>Email:</strong> legal@digerati-experts.com</p>
                <p className="text-gray-700"><strong>Phone:</strong> 325-480-9870</p>
                <p className="text-gray-700"><strong>Address:</strong> 3165 S Alma School Rd Suite 29, Chandler, AZ 85248</p>
                <p className="text-gray-700 mt-3"><strong>Office Hours:</strong> Monday-Friday 7:00 AM - 6:00 PM MST</p>
              </div>
            </div>

            {/* Effective Date */}
            <div className="mt-12 pt-8 border-t border-gray-300">
              <p className="text-gray-600 text-sm">
                These Terms of Service are effective as of {lastUpdated} and apply to all services provided by Digerati Experts.
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
