import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Shield, Target, BarChart3, Scale, Layers, Award, Phone, Mail, Globe, ArrowLeft } from "lucide-react";

interface ReasonCardProps {
  number: number;
  title: string;
  content: string;
}

function ReasonCard({ number, title, content }: ReasonCardProps) {
  return (
    <div
      className="relative bg-white/[0.03] border border-white/10 rounded-lg p-8 transition-all duration-300 hover:bg-white/[0.05] hover:border-violet-400/30"
      data-testid={`reason-card-${number}`}
    >
      <div className="absolute top-4 right-6 text-7xl font-bold text-violet-400/10 font-mono">
        {number}
      </div>
      <h2 className="text-xl font-semibold text-violet-300 mb-4 pr-16 leading-tight">
        {title}
      </h2>
      <p className="text-white/70 leading-relaxed" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}

export default function SixReasons() {
  const reasons = [
    {
      number: 1,
      title: "We Put CYBERSECURITY FIRST In Everything We Do - Not As An Afterthought",
      content: `Unlike traditional IT companies that bolt security on after the fact, we build <strong class="text-violet-300">security into the foundation</strong> of every solution from day one. That means we're not learning on your dime with basic "break-fix" approaches that leave you vulnerable. We know what works because security isn't just a service we offer - it's our core expertise and the lens through which we view every business challenge. When ransomware attacks are increasing, compliance requirements are tightening, and cyber insurance is getting harder to obtain, you need a partner who lives and breathes cybersecurity. That's us.`
    },
    {
      number: 2,
      title: "Since 2019, We've Protected Dozens Of Arizona Businesses With Our ProActive Ecosystem",
      content: `Our strategies and security frameworks are founded in <strong class="text-violet-300">real-world experience</strong> protecting businesses just like yours. We've worked with companies ranging from 10-person professional services firms to 100+ employee healthcare and financial organizations across the Phoenix metro area. Every security incident we've prevented, every compliance audit we've passed, every disaster we've helped clients avoid has strengthened our methodologies. Our clients span from Chandler to Scottsdale, from Mesa to Tempe - local businesses in accounting, legal, healthcare, manufacturing, real estate, and more. We understand Arizona business challenges because we're here, we're local, and we're invested in this community.`
    },
    {
      number: 3,
      title: "We Have Documented Client Success Stories And Tangible, Measurable Results",
      content: `If you care about <strong class="text-violet-300">tangible, measurable RESULTS</strong>, you'll want to work with a firm that can prove their value. We have clients who've avoided ransomware attacks because of our monitoring, businesses that passed SOC 2 audits on the first try, companies that cut their IT costs while improving security, and organizations that sleep better knowing their data is protected 24/7. We track metrics that matter: response times, threat detection rates, compliance status, downtime prevention, and security incident resolution. Remember, the most expensive advice in the world is WRONG advice - especially when it comes to cybersecurity. One breach can cost you hundreds of thousands of dollars, not to mention reputation damage and lost clients.`
    },
    {
      number: 4,
      title: "We're Vendor And Solution AGNOSTIC - We Recommend What's Best For YOU",
      content: `Unlike IT firms that are tied to specific vendors or push expensive solutions because they get better margins, our recommendations are <strong class="text-violet-300">100% focused on your needs</strong>. That means we're not biased to recommend Microsoft over Google, cloud over on-premise, or any particular security vendor. We evaluate what's truly best for your business, your budget, your compliance requirements, and your risk tolerance. We act as fiduciaries for your IT security strategy, not salespeople for vendors. If an open-source solution works better than an expensive enterprise tool, we'll tell you. If you don't need the latest and greatest technology, we won't sell it to you. Our loyalty is to YOU, not to vendor kickbacks or commission structures.`
    },
    {
      number: 5,
      title: "Our ProActive Ecosystem Model Delivers More Value At A Fraction Of Traditional MSP Costs",
      content: `Our business model is <strong class="text-violet-300">radically different</strong> from traditional MSPs and IT firms. While other companies charge premium prices for basic services and nickel-and-dime you with "time and materials" billing, we offer transparent flat-rate pricing with everything included. Our ProActive Ecosystem tiers ($180-$360 per user per month) include 24/7 security monitoring, unlimited support, compliance management, employee training, vulnerability assessments, and more - services that other firms charge separately for. We also offer flexible engagement options like 30-Day Pilots and 90-Day Momentum Terms, so you're not trapped in multi-year contracts. We're not a glorified, overpriced break-fix shop - we're strategic partners focused on preventing problems, not just reacting to them. That's why we actually DO the marketing, education, and outreach to help you understand cybersecurity. When was the last time your IT company proactively educated you about emerging threats?`
    },
    {
      number: 6,
      title: "We Stand Behind Our Services With A 100% Satisfaction Guarantee",
      content: `We back our ProActive Ecosystem with a <strong class="text-violet-300">no-quibble, 100% satisfaction guarantee</strong>. We're that confident in our ability to protect your business and deliver measurable value. But if you're unsure, put us to the test. Try our 30-Day Pilot program. Experience our response times, our expertise, our proactive approach, and our transparent communication. If you don't see the value for ANY reason - if our service doesn't exceed your expectations - we'll make it right or refund your investment. That's how confident we are that once you experience the Digerati Experts difference, you'll never want to work with anyone else. Most IT companies won't make this promise because they can't deliver. We can, and we do.`
    }
  ];

  return (
    <>
      <Helmet>
        <title>6 Reasons to Choose Digerati Experts | Internal Reference</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-[#030228]">
        <div className="max-w-5xl mx-auto px-6 py-16">
          {/* Back Link */}
          <Link href="/internal" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm mb-8" data-testid="link-back">
            <ArrowLeft className="w-4 h-4" />
            Back to Sales Tools
          </Link>

          {/* Header */}
          <div className="border-b-2 border-violet-400/50 pb-6 mb-12">
            <div className="font-mono text-2xl font-bold text-violet-400 mb-2">
              DIGERATI EXPERTS
            </div>
            <div className="text-sm text-white/50 uppercase tracking-widest">
              Internal Sales Reference - 6 Reasons
            </div>
          </div>

          {/* Hero */}
          <div className="text-center mb-16">
            <div className="text-sm text-violet-400 uppercase tracking-widest mb-4 font-semibold">
              The Digerati Experts Advantage
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-purple-300 to-fuchsia-300 mb-6">
              6 Reasons Why You'll Want To Work With Digerati Experts
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Over any and every other IT services firm in the Phoenix metro area
            </p>
          </div>

          {/* Reasons Grid */}
          <div className="space-y-6 mb-16">
            {reasons.map((reason) => (
              <ReasonCard
                key={reason.number}
                number={reason.number}
                title={reason.title}
                content={reason.content}
              />
            ))}
          </div>

          {/* Guarantee Section */}
          <div className="relative bg-gradient-to-br from-violet-900/30 to-purple-900/20 border-2 border-violet-400/50 rounded-lg p-10 text-center mb-16">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-400/10 to-purple-400/10 blur-xl -z-10" />
            <Shield className="w-16 h-16 text-violet-400 mx-auto mb-6" />
            <h2 className="text-2xl md:text-3xl font-bold text-violet-300 mb-4">
              Our Commitment To Your Success
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto leading-relaxed">
              Every business deserves a cybersecurity partner they can trust - one that delivers on promises, responds quickly, communicates clearly, and genuinely cares about protecting their clients. That's the Digerati Experts standard, and we stand behind it with our 100% satisfaction guarantee.
            </p>
          </div>

          {/* CTA Section */}
          <div className="bg-white/[0.03] border border-violet-400/30 rounded-lg p-10 text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-violet-300 mb-4">
              Ready To Experience The Difference?
            </h2>
            <p className="text-white/70 mb-8 max-w-2xl mx-auto">
              Schedule your free Cybersecurity Risk Assessment today and discover how our cybersecurity-first approach can protect your business while lowering your IT costs.
            </p>

            <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <a
                href="tel:325-480-9870"
                className="bg-violet-400/10 border border-white/10 rounded-lg p-5 hover:bg-violet-400/20 transition-colors"
                data-testid="link-call"
              >
                <Phone className="w-7 h-7 text-violet-400 mx-auto mb-3" />
                <div className="text-xs text-white/50 uppercase tracking-wider mb-1">Call Us</div>
                <div className="text-violet-300 font-semibold">325-480-9870</div>
              </a>
              <a
                href="mailto:admin@digerati-experts.com"
                className="bg-violet-400/10 border border-white/10 rounded-lg p-5 hover:bg-violet-400/20 transition-colors"
                data-testid="link-email"
              >
                <Mail className="w-7 h-7 text-violet-400 mx-auto mb-3" />
                <div className="text-xs text-white/50 uppercase tracking-wider mb-1">Email Us</div>
                <div className="text-violet-300 font-semibold">Email</div>
              </a>
              <a
                href="https://digeratiexperts.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-violet-400/10 border border-white/10 rounded-lg p-5 hover:bg-violet-400/20 transition-colors"
                data-testid="link-website"
              >
                <Globe className="w-7 h-7 text-violet-400 mx-auto mb-3" />
                <div className="text-xs text-white/50 uppercase tracking-wider mb-1">Visit Us</div>
                <div className="text-violet-300 font-semibold">Website</div>
              </a>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center pt-10 border-t border-white/10">
            <div className="font-mono text-xl font-bold text-violet-400 mb-2">
              DIGERATI EXPERTS
            </div>
            <div className="text-xs text-white/40 uppercase tracking-widest mb-3">
              Managed IT • Cybersecurity • Compliance
            </div>
            <div className="text-sm text-white/40">
              Serving the Phoenix Metro Area from Chandler, Arizona
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
