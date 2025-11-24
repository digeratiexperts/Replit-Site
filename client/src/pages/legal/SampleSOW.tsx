import { MegaMenu } from "@/components/MegaMenu";
import { DigeratiEnhancedFooterSection } from "@/pages/sections/DigeratiEnhancedFooterSection";
import { FileText, Mail, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SampleSOW() {
  return (
    <div className="min-h-screen bg-white">
      <MegaMenu />
      
      <section className="bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="h-12 w-12 text-purple-400" />
              <h1 className="text-4xl md:text-5xl font-bold">Sample Statement of Work</h1>
            </div>
            <p className="text-xl text-gray-300">
              Example SOW Template for Managed Services Engagement
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              Our Statement of Work (SOW) defines the specific services, deliverables, timelines, and 
              pricing for each client engagement. Each SOW is customized to your unique requirements.
            </p>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Typical SOW Components:</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Project Overview:</strong> Description of services and objectives</li>
                <li><strong>Scope of Services:</strong> Detailed list of deliverables and tasks</li>
                <li><strong>Service Levels:</strong> Response times and availability commitments</li>
                <li><strong>Timeline:</strong> Project phases and milestone dates</li>
                <li><strong>Pricing:</strong> Fees, payment schedule, and terms</li>
                <li><strong>Client Responsibilities:</strong> Required resources and access</li>
                <li><strong>Assumptions:</strong> Dependencies and constraints</li>
                <li><strong>Acceptance Criteria:</strong> Conditions for project completion</li>
              </ul>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Common SOW Types:</h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-1 text-sm">
                  <li>Managed IT Services - Ongoing</li>
                  <li>Security Assessment Project</li>
                  <li>HIPAA Compliance Audit</li>
                  <li>Cloud Migration Project</li>
                  <li>Disaster Recovery Implementation</li>
                  <li>Network Infrastructure Upgrade</li>
                </ul>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">SOW Benefits:</h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-1 text-sm">
                  <li>Clear scope and expectations</li>
                  <li>Fixed pricing and timelines</li>
                  <li>Defined deliverables</li>
                  <li>Measurable success criteria</li>
                  <li>Risk mitigation</li>
                  <li>Legal protection for both parties</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Request a Custom SOW</h2>
            <p className="text-gray-700 mb-6">
              Ready to start a project? Contact us to schedule a discovery call and receive a customized 
              Statement of Work tailored to your specific needs and objectives.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button 
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
                onClick={() => window.location.href = 'mailto:legal@digeratiexperts.com?subject=SOW Request'}
                data-testid="button-request-sow"
              >
                <Mail className="h-5 w-5 mr-2" />
                Request Custom SOW
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
