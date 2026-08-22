import { AlertCircle, ArrowRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageTemplate } from "@/components/PageTemplate";
import { ConversionPathBar } from "@/components/ConversionPathBar";
import { useSEO } from "@/hooks/useSEO";
import { CTA } from "@/lib/ctaCopy";

export default function NotFound() {
  useSEO({
    title: "404 - Page Not Found",
    description:
      "The page you are looking for could not be found. Return to the Digerati Experts homepage for managed IT and cybersecurity services.",
    noIndex: true,
  });

  return (
    <PageTemplate
      title="Page not found"
      subtitle="That URL isn’t on digeratiexperts.com. Head home, or book a Cyber Risk Assessment if you were looking for help."
      icon={<AlertCircle className="h-8 w-8" />}
      showBackButton={false}
    >
      <div className="mx-auto max-w-2xl space-y-10">
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" variant="brand" className="h-12">
            <a href="/">
              <Home className="mr-2 h-5 w-5" aria-hidden="true" />
              Back to Home
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-12 border-white/20 text-white hover:bg-white/10"
          >
            <a href="/contact">
              Contact us
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </a>
          </Button>
        </div>

        <ConversionPathBar
          headline="Need a Cyber Risk Assessment instead?"
          body="If you landed here looking for help, book a time. We’ll review the environment and recommend a fit."
          primaryHref="/book"
          primaryLabel={CTA.primary}
        />
      </div>
    </PageTemplate>
  );
}
