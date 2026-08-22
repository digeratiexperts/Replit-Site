import { LegalDocumentLayout } from "@/components/LegalDocumentLayout";
import { ShieldAlert, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PRIMARY_PHONE } from "@/data/companyContact";

export default function AUP() {
  return (
    <LegalDocumentLayout
      title="Acceptable Use Policy"
      subtitle="Version 2025.1 | Effective January 1, 2025"
      description="Digerati Experts Acceptable Use Policy (AUP): permitted and prohibited uses of managed services, systems, and networks."
      canonical="/legal/aup"
      icon={<ShieldAlert className="h-8 w-8" />}
    >
      <p className="mb-6 text-lg text-white/80">
        Our Acceptable Use Policy (AUP) defines the permitted and prohibited uses of Digerati Experts'
        services, systems, and networks.
      </p>

      <div className="mb-8 rounded border border-de-hairline border-l-4 border-l-de-accent bg-de-raised p-6">
        <h3 className="mb-3 text-xl font-semibold text-white">Prohibited Activities:</h3>
        <ul className="list-disc space-y-2 pl-6 text-white/75">
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

      <div className="mb-8 rounded border border-de-hairline bg-de-raised p-6">
        <h3 className="mb-3 text-xl font-semibold text-white">Permitted Uses:</h3>
        <ul className="list-disc space-y-2 pl-6 text-white/75">
          <li>Legitimate business operations and communications</li>
          <li>Authorized access to managed systems and services</li>
          <li>Reasonable resource utilization for business needs</li>
          <li>Security testing with prior written authorization</li>
          <li>Compliance with all applicable security policies</li>
        </ul>
      </div>

      <h2 className="mb-4 mt-8 text-2xl font-bold text-white">Enforcement</h2>
      <p className="mb-6 text-white/75">
        Violation of this AUP may result in immediate suspension of services, termination of your
        account, and/or legal action. We reserve the right to monitor use of our services to ensure
        compliance with this policy and applicable laws.
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-bold text-white">Request Full AUP</h2>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Button
          variant="brand"
          onClick={() => {
            window.location.href = "mailto:legal@digeratiexperts.com?subject=AUP Request";
          }}
          data-testid="button-request-aup"
        >
          <Mail className="mr-2 h-5 w-5" />
          Request AUP via Email
        </Button>
        <Button
          variant="outline"
          className="border-white/20 text-white hover:bg-white/10"
          onClick={() => {
            window.location.href = PRIMARY_PHONE.telHref;
          }}
        >
          Call {PRIMARY_PHONE.display}
        </Button>
      </div>
    </LegalDocumentLayout>
  );
}
