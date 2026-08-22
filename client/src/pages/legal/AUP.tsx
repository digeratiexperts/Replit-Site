import { MegaMenu } from "@/components/MegaMenu";
import { DigeratiEnhancedFooterSection } from "@/pages/sections/DigeratiEnhancedFooterSection";
import { ShieldAlert, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PRIMARY_PHONE } from "@/data/companyContact";

export default function AUP() {
  return (
    <div className="min-h-screen bg-de-bg">
      <MegaMenu />
      
      <section className="de-dark-well de-field-grain de-field-lit text-white de-nav-clear pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <ShieldAlert className="h-12 w-12 text-de-accent-ink" />
              <h1 className="text-4xl md:text-5xl font-bold">Acceptable Use Policy</h1>
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
              Our Acceptable Use Policy (AUP) defines the permitted and prohibited uses of Digerati Experts' 
              services, systems, and networks.
            </p>

            <div className="border border-de-hairline border-l-4 border-l-de-accent bg-de-raised p-6 rounded mb-8">
              <h3 className="text-xl font-semibold text-white mb-3">Prohibited Activities:</h3>
              <ul className="list-disc pl-6 text-gray-300 space-y-2">
                <li>Illegal activities or violation of any laws</li>
                <li>Distribution of malware, viruses, or malicious code</li>
                <li>Unauthorized access to systems or data</li>
                <li>Network scanning or vulnerability exploitation</li>
                <li>Spamming or unsolicited bulk email</li>
                <li>Interference with service to other users</li>
                <li>Circumvention of security controls</li>
                <li>Excessive resource consumption</li>
              </ul>
            </div>

            <div className="border border-de-hairline bg-de-raised p-6 rounded mb-8">
              <h3 className="text-xl font-semibold text-white mb-3">Permitted Uses:</h3>
              <ul className="list-disc pl-6 text-gray-300 space-y-2">
                <li>Legitimate business operations and communications</li>
                <li>Authorized access to managed systems and services</li>
                <li>Reasonable resource utilization for business needs</li>
                <li>Security testing with prior written authorization</li>
                <li>Compliance with all applicable security policies</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-white mb-4 mt-8">Enforcement</h2>
            <p className="text-gray-300 mb-6">
              Violation of this AUP may result in immediate suspension of services, termination of your 
              account, and/or legal action. We reserve the right to monitor use of our services to ensure 
              compliance with this policy and applicable laws.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4 mt-8">Request Full AUP</h2>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button 
                className="bg-[#D3126A] text-white hover:bg-[#B80E5C]"
                onClick={() => window.location.href = 'mailto:legal@digeratiexperts.com?subject=AUP Request'}
                data-testid="button-request-aup"
              >
                <Mail className="h-5 w-5 mr-2" />
                Request AUP via Email
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
