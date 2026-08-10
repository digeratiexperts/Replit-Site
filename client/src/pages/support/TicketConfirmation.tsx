import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { CheckCircle, Phone, ArrowRight } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { PageTemplate } from "@/components/PageTemplate";

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
      gradientColors="from-slate-600 via-slate-700 to-gray-800"
    >
      <div className="max-w-xl mx-auto text-center space-y-8">
        <div className="flex justify-center">
          <CheckCircle className="h-16 w-16 text-green-400" />
        </div>
        <p className="text-gray-300 text-lg">
          We’ll follow up at the email you provided. For urgent production issues, call us now.
        </p>
        <a
          href="tel:480-519-5892"
          className="inline-flex items-center gap-2 text-2xl font-bold text-purple-300 hover:text-purple-200"
        >
          <Phone className="h-6 w-6" />
          480-519-5892
        </a>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={() => setLocation("/support/knowledge-base")} variant="outline">
            Browse Knowledge Base
          </Button>
          <Button onClick={() => setLocation("/")} className="bg-violet-600 hover:bg-violet-500">
            Back to Home
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </PageTemplate>
  );
}
