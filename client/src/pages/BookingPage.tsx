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
            <ZohoBookingWidget instanceId="page" className="rounded-2xl overflow-hidden border border-violet-500/20 shadow-xl shadow-violet-500/5" />
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-violet-500/20 bg-[#0d0d1a] p-6">
              <h3 className="text-lg font-semibold text-white mb-4 font-['Space_Grotesk']">
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
                    <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <item.icon className="w-4 h-4 text-violet-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">{item.title}</p>
                      <p className="text-gray-400 text-sm">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-violet-500/20 bg-[#0d0d1a] p-6">
              <h3 className="text-lg font-semibold text-white mb-3 font-['Space_Grotesk']">
                Prefer to Call?
              </h3>
              <a
                href="tel:+13254809870"
                className="flex items-center gap-3 text-violet-400 hover:text-violet-300 transition-colors"
                data-testid="link-phone-booking"
              >
                <Phone className="w-5 h-5" />
                <span className="text-lg font-medium">(325) 480-9870</span>
              </a>
            </div>

            <div className="rounded-2xl border border-emerald-500/20 bg-[#0d0d1a] p-6">
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
