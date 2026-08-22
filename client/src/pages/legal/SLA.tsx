import { MegaMenu } from "@/components/MegaMenu";
import { DigeratiEnhancedFooterSection } from "@/pages/sections/DigeratiEnhancedFooterSection";
import { Clock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PRIMARY_PHONE } from "@/data/companyContact";

export default function SLA() {
  return (
    <div className="min-h-screen bg-de-bg">
      <MegaMenu />
      
      <section className="de-dark-well de-field-grain de-field-lit text-white de-nav-clear pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="h-12 w-12 text-de-accent-ink" />
              <h1 className="text-4xl md:text-5xl font-bold">Service Level Agreement</h1>
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
              Our Service Level Agreement (SLA) defines the specific performance standards and response 
              times you can expect from Digerati Experts' managed services.
            </p>

            <div className="border border-de-hairline border-l-4 border-l-de-accent bg-de-raised p-6 rounded mb-8">
              <h3 className="text-xl font-semibold text-white mb-3">Standard Response Times:</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                  <span className="font-semibold text-white">Critical (Active Breach/System Down)</span>
                  <span className="text-de-accent-ink font-bold">15 minutes</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                  <span className="font-semibold text-white">High (Major Functionality Impaired)</span>
                  <span className="text-de-accent-ink font-bold">1 hour</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                  <span className="font-semibold text-white">Medium (Partial Loss)</span>
                  <span className="text-de-accent-ink font-bold">4 hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-white">Low (Questions/Minor Issues)</span>
                  <span className="text-de-accent-ink font-bold">Next business day</span>
                </div>
              </div>
            </div>

            <div className="border border-de-hairline bg-de-raised border-l-4 border-l-de-accent p-6 rounded mb-8">
              <h3 className="text-xl font-semibold text-white mb-3">SLA Commitments Include:</h3>
              <ul className="list-disc pl-6 text-gray-300 space-y-2">
                <li>99.9% uptime for SOC monitoring and security services</li>
                <li>24/7/365 emergency incident response availability</li>
                <li>Monthly SLA performance reports</li>
                <li>Service credits for SLA violations</li>
                <li>Escalation procedures for unresolved issues</li>
                <li>Scheduled maintenance windows with advance notice</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-white mb-4 mt-8">Request Full SLA Document</h2>
            <p className="text-gray-300 mb-6">
              For the complete SLA including service credits, maintenance windows, and detailed 
              performance metrics, please contact our team.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button 
                className="bg-[#D3126A] text-white hover:bg-[#B80E5C]"
                onClick={() => window.location.href = 'mailto:legal@digeratiexperts.com?subject=SLA Request'}
                data-testid="button-request-sla"
              >
                <Mail className="h-5 w-5 mr-2" />
                Request SLA via Email
              </Button>
              <Button 
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
                onClick={() => window.location.href = PRIMARY_PHONE.telHref}
              >
                Call {PRIMARY_PHONE.display}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <DigeratiEnhancedFooterSection />
    </div>
  );
}
