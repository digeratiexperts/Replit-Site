import { Link } from "wouter";
import { Phone, CheckCircle2 } from "lucide-react";
import { MegaMenu } from "@/components/MegaMenu";
import { DigeratiEnhancedFooterSection } from "../sections/DigeratiEnhancedFooterSection";
import { PRIMARY_PHONE } from "@/data/companyContact";

export default function Guarantee() {
  return (
    <div className="min-h-screen bg-[#050312]">
      <MegaMenu />

      <section className="de-nav-clear pb-20 px-6 de-prose-dark">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight" data-testid="heading-guarantee">
              100% Money-Back Guarantee
            </h1>
            <p className="text-lg text-white/85 leading-relaxed">
              No-Risk. No-Small-Print. No Questions Asked.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-10 items-center lg:items-start">
            <div className="flex-1 order-2 lg:order-1">
              <div className="mb-8">
                <p className="text-white/85 text-lg leading-relaxed mb-6">
                  Because we are ardently committed to deliver <span className="text-de-magenta-ink font-semibold">excellence</span> in 
                  IT services and cybersecurity, keeping our commitments and <span className="text-de-magenta-ink font-semibold">exceeding</span> our 
                  clients' expectations, we stand behind our work with a 100%, no-small-print, no weasel clause guarantee:
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 mb-8">
                <p className="text-white/85 leading-relaxed mb-6">
                  Partner with Digerati Experts as your IT and cybersecurity provider. If you are not 
                  over-the-top thrilled with our support, customer service, or problem-resolution by the 
                  end of the first 30 days, you can cancel your agreement and we'll refund 100% of your 
                  services fees, no questions asked. We'll also release you from any contract or project 
                  you hired us to deliver without penalties.
                </p>

                <p className="text-white/85 leading-relaxed">
                  We're the <span className="text-white font-semibold">only</span> IT firm in the Phoenix area that offers this bold guarantee 
                  because we're confident you'll be <span className="text-white font-semibold">thrilled</span> with the level of support and 
                  service you receive. We also believe this guarantee keeps us <span className="text-white font-semibold">sharp</span> and 
                  focused on ensuring everything is done right, on time and to your complete satisfaction. 
                  Why risk hiring anyone else?
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-de-magenta-ink mt-0.5 flex-shrink-0" />
                  <span className="text-white/85">30-day risk-free trial period</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-de-magenta-ink mt-0.5 flex-shrink-0" />
                  <span className="text-white/85">100% refund of service fees if not satisfied</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-de-magenta-ink mt-0.5 flex-shrink-0" />
                  <span className="text-white/85">Release from contracts without penalties</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-de-magenta-ink mt-0.5 flex-shrink-0" />
                  <span className="text-white/85">No questions asked, no fine print</span>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 flex-shrink-0">
              <div className="w-56 h-56 md:w-64 md:h-64 relative" data-testid="guarantee-badge">
                <div className="absolute inset-0 rounded-full bg-de-raised animate-pulse opacity-30" />
                <div className="absolute inset-2 rounded-full bg-de-raised border border-de-hairline flex items-center justify-center">
                  <div className="w-[85%] h-[85%] rounded-full bg-white flex flex-col items-center justify-center text-center p-4">
                    <div className="text-5xl md:text-6xl font-bold text-[#030228] leading-none">100%</div>
                    <div className="mt-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm md:text-base font-bold uppercase tracking-wide shadow-lg">
                      Money Back
                    </div>
                    <div className="mt-2 text-sm md:text-base font-bold text-[#030228] uppercase tracking-wide">
                      Guarantee
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-6 border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xl text-white/80 mb-4">
            Call us today to see what Elite IT & Cybersecurity is all about
          </p>
          <a 
            href={PRIMARY_PHONE.telHref} 
            className="inline-flex items-center gap-3 text-2xl md:text-3xl font-bold text-de-magenta-ink hover:text-de-magenta-ink transition-colors"
            data-testid="link-phone"
          >
            <Phone className="w-6 h-6" />
            {PRIMARY_PHONE.display}
          </a>
        </div>
      </section>

      <section className="py-12 px-6 border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-white/50 mb-4">See also our commitments to you</p>
          <Link 
            href="/about/client-bill-of-rights"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-de-magenta hover:bg-de-magenta text-white font-medium transition-colors"
            data-testid="link-bill-of-rights"
          >
            Client Bill of Rights
          </Link>
        </div>
      </section>

      <DigeratiEnhancedFooterSection />
    </div>
  );
}
