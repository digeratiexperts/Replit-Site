import { Link } from "wouter";
import { ArrowRight, ShieldCheck, FileText, Scale } from "lucide-react";

/**
 * Honest proof section — operating principles and verifiable pages.
 * Do not invent customer counts, logos, or savings metrics here.
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
          We publish how we operate. We do not invent client logos, savings percentages, or
          “100+ businesses” claims to look larger than the evidence supports.
        </p>

        <div className="grid md:grid-cols-3 gap-5">
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
            <h3 className="text-lg font-semibold text-white mb-2">Case studies & resources</h3>
            <p className="text-sm text-white/65 mb-4">
              Qualitative outcome stories and practical guidance for Arizona organizations evaluating
              managed security.
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
