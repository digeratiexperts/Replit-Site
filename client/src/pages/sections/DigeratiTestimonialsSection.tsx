import { motion, useReducedMotion } from "framer-motion";
import { Star, Quote, Building2, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useBooking } from "@/contexts/BookingContext";

/**
 * Client Proof Center — honest shells only.
 * Do not invent named testimonials. Wire Google Business reviews and approved
 * case stories here when DE supplies verbatim content.
 */
const outcomes = [
  {
    title: "Fewer vendors to manage",
    detail: "One accountable team for IT support and security operations.",
  },
  {
    title: "Clearer security visibility",
    detail: "Identity, endpoint, email, and backup posture you can actually explain.",
  },
  {
    title: "Faster triage when something breaks",
    detail: "Named ownership and documented standards — not ticket roulette.",
  },
];

export const DigeratiTestimonialsSection = (): JSX.Element => {
  const prefersReducedMotion = useReducedMotion();
  const { openBooking } = useBooking();

  return (
    <section
      id="testimonials"
      className="relative py-10 md:py-14 lg:py-16 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0a0a0a 0%, #0f0f1a 50%, #0a0a0a 100%)",
      }}
      data-testid="section-client-proof"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-xs md:text-sm font-medium text-[#FF477F] tracking-wide uppercase mb-3">
            Client proof
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Trust built on outcomes — not invented quotes
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            We are assembling verified Google reviews and approved Arizona client stories here.
            Until those are published, here is what clients consistently hire us to improve.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 lg:col-span-1"
            data-testid="proof-google-slot"
          >
            <div className="flex items-center gap-1 text-amber-300 mb-3" aria-hidden="true">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-white font-semibold mb-1">Google Business reviews</p>
            <p className="text-sm text-white/55 leading-relaxed mb-4">
              Live rating and verbatim reviews will render here once connected to the Digerati Experts
              Google Business Profile — no placeholder star scores.
            </p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Digerati+Experts+Chandler+AZ"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-violet-300 hover:text-violet-200 inline-flex items-center gap-1"
            >
              Find us on Google
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 lg:col-span-2"
            data-testid="proof-outcomes"
          >
            <div className="flex items-start gap-3 mb-4">
              <Quote className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-white font-semibold">What clients hire us to improve</p>
            </div>
            <ul className="space-y-4">
              {outcomes.map((o) => (
                <li key={o.title} className="border-t border-white/8 pt-4 first:border-0 first:pt-0">
                  <p className="text-white text-sm font-medium">{o.title}</p>
                  <p className="text-white/55 text-sm leading-relaxed">{o.detail}</p>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-6 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
          <div className="flex items-start gap-3">
            <Building2 className="w-5 h-5 text-pink-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="text-white font-medium text-sm">Case stories (coming)</p>
              <p className="text-white/50 text-sm leading-relaxed">
                Approved, anonymized Arizona client stories — industry, services deployed, and business
                result — will appear here. We do not publish fabricated testimonials.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => openBooking("proof_section")}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold px-4 py-2.5 flex-shrink-0"
            data-testid="button-proof-assessment"
          >
            Schedule Your Assessment
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-white/45">
          Serving professional services, healthcare, construction, nonprofit, and regulated organizations
          across Greater Phoenix.{" "}
          <Link href="/industries/healthcare">
            <span className="text-violet-300 hover:text-violet-200">Browse industries</span>
          </Link>
        </p>
      </div>
    </section>
  );
};
