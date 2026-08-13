import { Link } from "wouter";
import { ArrowRight, ShieldCheck, FileText, Scale, Star } from "lucide-react";

/**
 * Trust surfaces — Bill of Rights, reviews, Trust Center, case studies.
 * Keep copy client-facing; never invent logos, ratings, or case-study results.
 */
export function HomepageProofSection() {
  return (
    <section id="proof" className="de-dark-chapter py-14 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pink-300/90 mb-3">
          Trust & transparency
        </p>
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 max-w-3xl">
          Built for accountability you can verify
        </h2>
        <p className="text-white/65 max-w-2xl mb-10">
          Ownership clarity, documented operations, and public surfaces you can open before you
          engage — not marketing claims you have to take on faith.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <Star className="mb-3 h-6 w-6 text-violet-300" aria-hidden />
            <h3 className="mb-2 text-lg font-semibold text-white">Client reviews</h3>
            <p className="mb-4 text-sm text-white/65">
              Real client feedback from Google and other approved sources — shown only when we have
              live API data or verbatim published reviews.
            </p>
            <a
              href="/#google-reviews"
              className="inline-flex items-center gap-2 text-sm text-pink-300 hover:text-pink-200"
              data-testid="link-proof-google-reviews"
            >
              See reviews
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <Scale className="h-6 w-6 text-violet-300 mb-3" aria-hidden />
            <h3 className="text-lg font-semibold text-white mb-2">Client Bill of Rights</h3>
            <p className="text-sm text-white/65 mb-4">
              Your credentials, tenants, and licenses stay yours — with access transparency and a
              clear path if you ever need to transition.
            </p>
            <Link
              href="/about/client-bill-of-rights"
              className="inline-flex items-center gap-2 text-sm text-pink-300 hover:text-pink-200"
            >
              Read the Bill of Rights
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <ShieldCheck className="h-6 w-6 text-violet-300 mb-3" aria-hidden />
            <h3 className="text-lg font-semibold text-white mb-2">Trust Center</h3>
            <p className="text-sm text-white/65 mb-4">
              Security documentation and operating expectations in one place for diligence and
              cyber-insurance conversations.
            </p>
            <Link
              href="/trust/trust-center"
              className="inline-flex items-center gap-2 text-sm text-pink-300 hover:text-pink-200"
            >
              Open Trust Center
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <FileText className="h-6 w-6 text-violet-300 mb-3" aria-hidden />
            <h3 className="text-lg font-semibold text-white mb-2">Case studies</h3>
            <p className="text-sm text-white/65 mb-4">
              Real engagements with challenge, approach, and outcome — published with client
              permission.
            </p>
            <Link
              href="/resources/case-studies"
              className="inline-flex items-center gap-2 text-sm text-pink-300 hover:text-pink-200"
            >
              View case studies
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
