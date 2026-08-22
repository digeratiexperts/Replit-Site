import { LegalDocumentLayout } from "@/components/LegalDocumentLayout";
import { FileText, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PRIMARY_PHONE } from "@/data/companyContact";

export default function SampleSOW() {
  return (
    <LegalDocumentLayout
      title="Sample Statement of Work"
      subtitle="Example SOW Template for Managed Services Engagement"
      description="Typical Digerati Experts Statement of Work (SOW) components for managed services engagements. Request a customized SOW for your project."
      canonical="/legal/sample-sow"
      icon={<FileText className="h-8 w-8" />}
    >
      <p className="mb-6 text-lg text-white/80">
        Our Statement of Work (SOW) defines the specific services, deliverables, timelines, and
        pricing for each client engagement. Each SOW is customized to your unique requirements.
      </p>

      <div className="mb-8 rounded border border-de-hairline border-l-4 border-l-de-accent bg-de-raised p-6">
        <h3 className="mb-3 text-xl font-semibold text-white">Typical SOW Components:</h3>
        <ul className="list-disc space-y-2 pl-6 text-white/75">
          <li>
            <strong className="text-white">Project Overview:</strong> Description of services and objectives
          </li>
          <li>
            <strong className="text-white">Scope of Services:</strong> Detailed list of deliverables and tasks
          </li>
          <li>
            <strong className="text-white">Service Levels:</strong> Response times and availability commitments
          </li>
          <li>
            <strong className="text-white">Timeline:</strong> Project phases and milestone dates
          </li>
          <li>
            <strong className="text-white">Pricing:</strong> Fees, payment schedule, and terms
          </li>
          <li>
            <strong className="text-white">Client Responsibilities:</strong> Required resources and access
          </li>
          <li>
            <strong className="text-white">Assumptions:</strong> Dependencies and constraints
          </li>
          <li>
            <strong className="text-white">Acceptance Criteria:</strong> Conditions for project completion
          </li>
        </ul>
      </div>

      <div className="mb-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-de-hairline bg-de-raised p-6">
          <h3 className="mb-3 text-lg font-semibold text-white">Common SOW Types:</h3>
          <ul className="list-disc space-y-1 pl-6 text-sm text-white/75">
            <li>Managed IT Services - Ongoing</li>
            <li>Security Assessment Project</li>
            <li>HIPAA Compliance Audit</li>
            <li>Cloud Migration Project</li>
            <li>Disaster Recovery Implementation</li>
            <li>Network Infrastructure Upgrade</li>
          </ul>
        </div>

        <div className="rounded-lg border border-de-hairline bg-de-raised p-6">
          <h3 className="mb-3 text-lg font-semibold text-white">SOW Benefits:</h3>
          <ul className="list-disc space-y-1 pl-6 text-sm text-white/75">
            <li>Clear scope and expectations</li>
            <li>Fixed pricing and timelines</li>
            <li>Defined deliverables</li>
            <li>Measurable success criteria</li>
            <li>Risk mitigation</li>
            <li>Legal protection for both parties</li>
          </ul>
        </div>
      </div>

      <h2 className="mb-4 mt-8 text-2xl font-bold text-white">Request a Custom SOW</h2>
      <p className="mb-6 text-white/75">
        Ready to start a project? Contact us to schedule a discovery call and receive a customized
        Statement of Work tailored to your specific needs and objectives.
      </p>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Button
          variant="brand"
          onClick={() => {
            window.location.href = "mailto:legal@digeratiexperts.com?subject=SOW Request";
          }}
          data-testid="button-request-sow"
        >
          <Mail className="mr-2 h-5 w-5" />
          Request Custom SOW
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
