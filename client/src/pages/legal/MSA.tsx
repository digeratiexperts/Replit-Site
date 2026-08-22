import { LegalDocumentLayout } from "@/components/LegalDocumentLayout";
import { FileText, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PRIMARY_PHONE } from "@/data/companyContact";

export default function MSA() {
  return (
    <LegalDocumentLayout
      title="Master Service Agreement"
      subtitle="Version 2025.1 | Effective January 1, 2025"
      description="Digerati Experts Master Service Agreement (MSA) covers managed IT and security services, responsibilities, billing, and termination. Request a copy from legal."
      canonical="/legal/msa"
      icon={<FileText className="h-8 w-8" />}
    >
      <p className="mb-6 text-lg text-white/80">
        Our Master Service Agreement (MSA) establishes the comprehensive terms and conditions governing
        the provision of managed IT and security services by Digerati Experts to our clients.
      </p>

      <div className="mb-8 rounded border border-de-hairline border-l-4 border-l-de-accent bg-de-raised p-6">
        <h3 className="mb-3 text-xl font-semibold text-white">What's Included in Our MSA:</h3>
        <ul className="list-disc space-y-2 pl-6 text-white/75">
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

      <h2 className="mb-4 mt-8 text-2xl font-bold text-white">Request Our MSA</h2>
      <p className="mb-6 text-white/75">
        To review our Master Service Agreement or discuss custom terms for your organization,
        please contact our team. We'll provide a copy and schedule a consultation to address
        your specific requirements.
      </p>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Button
          variant="brand"
          onClick={() => {
            window.location.href = "mailto:legal@digeratiexperts.com?subject=MSA Request";
          }}
          data-testid="button-request-msa"
        >
          <Mail className="mr-2 h-5 w-5" />
          Request MSA via Email
        </Button>
        <Button
          variant="outline"
          className="border-white/20 text-white hover:bg-white/10"
          onClick={() => {
            window.location.href = PRIMARY_PHONE.telHref;
          }}
          data-testid="button-call-legal"
        >
          Call {PRIMARY_PHONE.display}
        </Button>
      </div>

      <div className="mt-12 rounded-lg border border-de-hairline bg-de-raised p-6">
        <h3 className="mb-3 text-xl font-semibold text-white">Contact Legal Department</h3>
        <p className="mb-2 text-white/75">
          <strong className="text-white">Email:</strong> legal@digeratiexperts.com
        </p>
        <p className="mb-2 text-white/75">
          <strong className="text-white">Phone:</strong> {PRIMARY_PHONE.display}
        </p>
        <p className="text-white/75">
          <strong className="text-white">Address:</strong> 3165 S Alma School Rd Suite 29, Chandler, AZ 85248
        </p>
      </div>
    </LegalDocumentLayout>
  );
}
