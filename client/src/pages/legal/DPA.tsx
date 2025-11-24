import { MegaMenu } from "@/components/MegaMenu";
import { DigeratiEnhancedFooterSection } from "@/pages/sections/DigeratiEnhancedFooterSection";
import { Database, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DPA() {
  return (
    <div className="min-h-screen bg-white">
      <MegaMenu />
      
      <section className="bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <Database className="h-12 w-12 text-purple-400" />
              <h1 className="text-4xl md:text-5xl font-bold">Data Processing Agreement</h1>
            </div>
            <p className="text-xl text-gray-300">
              Version 2025.1 | Effective January 1, 2025
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              Our Data Processing Agreement (DPA) governs how Digerati Experts processes and protects 
              client data, including provisions for GDPR compliance, HIPAA Business Associate requirements, 
              and other data protection regulations.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">DPA Covers:</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Scope and duration of data processing activities</li>
                <li>Types of personal data processed</li>
                <li>Security measures and technical safeguards</li>
                <li>Data subject rights and procedures</li>
                <li>Data breach notification requirements</li>
                <li>Subprocessor agreements and approvals</li>
                <li>Data transfer mechanisms and safeguards</li>
                <li>Audit rights and compliance verification</li>
                <li>Data retention and deletion procedures</li>
              </ul>
            </div>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Compliance Frameworks:</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>HIPAA:</strong> Business Associate Agreement provisions for Protected Health Information</li>
                <li><strong>GDPR:</strong> Standard Contractual Clauses for EU data transfers</li>
                <li><strong>CCPA:</strong> Service provider obligations for California residents</li>
                <li><strong>PCI DSS:</strong> Cardholder data processing requirements</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Request Our DPA</h2>
            <p className="text-gray-700 mb-6">
              To receive our Data Processing Agreement or discuss specific data protection requirements 
              for your organization, please contact our legal team.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button 
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
                onClick={() => window.location.href = 'mailto:legal@digeratiexperts.com?subject=DPA Request'}
                data-testid="button-request-dpa"
              >
                <Mail className="h-5 w-5 mr-2" />
                Request DPA via Email
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.location.href = 'tel:325-480-9870'}
              >
                Call 325-480-9870
              </Button>
            </div>
          </div>
        </div>
      </section>

      <DigeratiEnhancedFooterSection />
    </div>
  );
}
