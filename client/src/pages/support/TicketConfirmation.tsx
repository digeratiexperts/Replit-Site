import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { CheckCircle, Phone, ArrowRight } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { PageTemplate } from "@/components/PageTemplate";
import { PRIMARY_PHONE } from "@/data/companyContact";

export default function TicketConfirmation() {
  useSEO({
    title: "Ticket Submitted",
    description: "Your support ticket was submitted successfully.",
    noIndex: true,
  });

  const [, setLocation] = useLocation();

  return (
    <PageTemplate
      title="Ticket Submitted"
      subtitle="Thanks — our support team has received your request."
      breadcrumbs={[{ label: "Support", href: "/about/support" }, { label: "Ticket Submitted" }]}
    >
      <div className="mx-auto max-w-xl space-y-8 text-center">
        <div className="flex justify-center">
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-de-hairline bg-de-raised text-de-accent-ink">
            <CheckCircle className="h-8 w-8" aria-hidden="true" />
          </span>
        </div>
        <p className="text-lg text-white/70">
          We’ll follow up at the email you provided. For urgent production issues, call us now.
        </p>
        <a
          href={PRIMARY_PHONE.telHref}
          className="inline-flex items-center gap-2 text-2xl font-bold text-de-accent-ink hover:text-white"
        >
          <Phone className="h-6 w-6" />
          {PRIMARY_PHONE.display}
        </a>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Button
            onClick={() => setLocation("/support/knowledge-base")}
            variant="outline"
            className="h-12 border-white/20 font-semibold text-white hover:bg-white/10"
          >
            Browse Knowledge Base
          </Button>
          <Button onClick={() => setLocation("/")} variant="brand" className="h-12 font-semibold">
            Back to Home
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </PageTemplate>
  );
}
