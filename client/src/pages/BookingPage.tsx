import { PageTemplate } from "@/components/PageTemplate";
import { Calendar, Phone, Shield, Clock, CheckCircle } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { ZohoBookingWidget } from "@/components/ZohoBookingWidget";

export default function BookingPage() {
  useSEO({
    title: "Schedule a Free Consultation - Book Your IT Assessment",
    description:
      "Book a free IT consultation with Digerati Experts. Get a personalized cybersecurity assessment and IT roadmap for your Arizona business.",
    canonical: "/book",
  });

  return (
    <PageTemplate
      title="Schedule Your Free Consultation"
      subtitle="Choose a time that works for you and let's discuss how we can protect and enable your business"
    >
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ZohoBookingWidget instanceId="page" className="overflow-hidden rounded-2xl border border-de-hairline" />
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-de-hairline bg-de-raised p-6">
              <h3 className="mb-4 font-heading text-lg font-semibold text-white">
                What to Expect
              </h3>
              <ul className="space-y-4">
                {[
                  {
                    icon: Clock,
                    title: "30-Minute Call",
                    desc: "Quick, focused discussion about your IT needs",
                  },
                  {
                    icon: Shield,
                    title: "Security Assessment",
                    desc: "Free evaluation of your current cybersecurity posture",
                  },
                  {
                    icon: CheckCircle,
                    title: "Custom Roadmap",
                    desc: "Personalized recommendations for your business",
                  },
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-de-hairline bg-[#0a0a0a]">
                      <item.icon className="h-4 w-4 text-[#D3126A]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{item.title}</p>
                      <p className="text-sm font-medium text-white/70">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-de-hairline bg-de-raised p-6">
              <h3 className="mb-3 font-heading text-lg font-semibold text-white">
                Prefer to Call?
              </h3>
              <a
                href="tel:+13254809870"
                className="flex items-center gap-3 font-semibold text-white transition-colors hover:text-[#D3126A]"
                data-testid="link-phone-booking"
              >
                <Phone className="h-5 w-5 text-[#D3126A]" />
                <span className="text-lg">325-480-9870</span>
              </a>
            </div>

            <div className="rounded-2xl border border-de-hairline bg-de-raised p-6">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-5 h-5 text-emerald-400" />
                <h3 className="text-lg font-semibold text-white font-['Space_Grotesk']">
                  No Obligation
                </h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                This consultation is completely free with no strings attached.
                We'll assess your current IT setup and provide honest
                recommendations — even if that means you don't need us.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
}
