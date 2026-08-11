import { Link } from "wouter";
import { ArrowRight, ShieldCheck, FileText, Scale, Star } from "lucide-react";

/**
 * Honest proof section — operating principles and verifiable pages.
 * Do not invent customer counts, logos, savings metrics, or hard SOC2 claims here.
 */
export function HomepageProofSection() {
  return (
    <section id="proof" className="py-14 lg:py-20 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pink-300/90 mb-3">
          How we earn trust
        </p>
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 max-w-3xl">
          Proof should be about Digerati — not recycled cybercrime headlines
        </h2>
        <p className="text-white/65 max-w-2xl mb-10">
          We publish how we operate and link to verifiable surfaces. We do not invent client logos,
          savings percentages, or “100+ businesses” claims to look larger than the evidence supports.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <Star className="h-6 w-6 text-violet-300 mb-3" aria-hidden />
            <h3 className="text-lg font-semibold text-white mb-2">Google reviews</h3>
            <p className="text-sm text-white/65 mb-4">
              Live Business Profile reviews on the homepage Client Proof section — verbatim, never
              fabricated quotes.
            </p>
            <a
              href="/#google-reviews"
              className="inline-flex items-center gap-2 text-sm text-pink-300 hover:text-pink-200"
              data-testid="link-proof-google-reviews"
            >
              See Google reviews
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <Scale className="h-6 w-6 text-violet-300 mb-3" aria-hidden />
            <h3 className="text-lg font-semibold text-white mb-2">Client Bill of Rights</h3>
            <p className="text-sm text-white/65 mb-4">
              Client-owned credentials, tenants, and licenses — with access transparency and no
              artificial lock-in.
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
              Security documentation and expectations in one place for diligence and cyber-insurance
              conversations.
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
              Challenge / approach / outcome / stack templates — published stories only with client
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
