import { MegaMenu } from "@/components/MegaMenu";
import { DigeratiEnhancedFooterSection } from "@/pages/sections/DigeratiEnhancedFooterSection";
import { FileText, Download, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PRIMARY_PHONE } from "@/data/companyContact";

export default function MSA() {
  return (
    <div className="min-h-screen bg-slate-900">
      <MegaMenu />
      
      <section className="bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 text-white de-nav-clear pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="h-12 w-12 text-de-accent-ink" />
              <h1 className="text-4xl md:text-5xl font-bold">Master Service Agreement</h1>
            </div>
            <p className="text-xl text-gray-300">
              Version 2025.1 | Effective January 1, 2025
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-lg text-gray-300 mb-6">
              Our Master Service Agreement (MSA) establishes the comprehensive terms and conditions governing 
              the provision of managed IT and security services by Digerati Experts to our clients.
            </p>

            <div className="bg-de-raised backdrop-blur-sm border border-de-hairline border-l-4 border-l-de-accent p-6 rounded mb-8">
              <h3 className="text-xl font-semibold text-white mb-3">What's Included in Our MSA:</h3>
              <ul className="list-disc pl-6 text-gray-300 space-y-2">
                <li>Scope of managed IT and security services</li>
                <li>Service level agreements (SLAs) and response times</li>
                <li>Client and service provider responsibilities</li>
                <li>Payment terms and billing procedures</li>
                <li>Data protection and security requirements</li>
                <li>HIPAA Business Associate provisions (when applicable)</li>
                <li>PCI DSS compliance obligations</li>
                <li>Liability limitations and indemnification</li>
                <li>Term, renewal, and termination conditions</li>
                <li>Dispute resolution procedures</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-white mb-4 mt-8">Request Our MSA</h2>
            <p className="text-gray-300 mb-6">
              To review our Master Service Agreement or discuss custom terms for your organization, 
              please contact our team. We'll provide a copy and schedule a consultation to address 
              your specific requirements.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button 
                className="bg-de-raised text-white hover: hover:to-blue-700"
                onClick={() => window.location.href = 'mailto:legal@digeratiexperts.com?subject=MSA Request'}
                data-testid="button-request-msa"
              >
                <Mail className="h-5 w-5 mr-2" />
                Request MSA via Email
              </Button>
              <Button 
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
                onClick={() => window.location.href = PRIMARY_PHONE.telHref}
                data-testid="button-call-legal"
              >
                Call {PRIMARY_PHONE.display}
              </Button>
            </div>

            <div className="mt-12 bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-3">Contact Legal Department</h3>
              <p className="text-gray-300 mb-2"><strong className="text-white">Email:</strong> legal@digeratiexperts.com</p>
              <p className="text-gray-300 mb-2"><strong className="text-white">Phone:</strong> {PRIMARY_PHONE.display}</p>
              <p className="text-gray-300"><strong className="text-white">Address:</strong> 3165 S Alma School Rd Suite 29, Chandler, AZ 85248</p>
            </div>
          </div>
        </div>
      </section>

      <DigeratiEnhancedFooterSection />
    </div>
  );
}
