import { Helmet } from "react-helmet-async";
import { Phone, FileText, MessageSquare, Users, HelpCircle } from "lucide-react";

interface ActionItemProps {
  number: number;
  title: string;
  description: string;
}

function ActionItem({ number, title, description }: ActionItemProps) {
  return (
    <div
      className="bg-white/[0.03] border-l-4 border-violet-400 rounded-r-lg p-6 flex gap-5"
      data-testid={`action-item-${number}`}
    >
      <div className="flex-shrink-0 w-10 h-10 bg-violet-400 text-[#030228] rounded-full flex items-center justify-center font-bold text-lg">
        {number}
      </div>
      <div>
        <strong className="block text-violet-300 mb-2">{title}</strong>
        <p className="text-white/70 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

export default function CoverLetter() {
  const actionItems: ActionItemProps[] = [
    {
      number: 1,
      title: 'Review "6 Reasons Why You\'ll Want To Work With Digerati Experts"',
      description: "This will give you insight into what makes us different from the majority of \"IT guys\" you may have encountered in the past - specifically our cybersecurity-first approach, our ProActive Ecosystem model, and our 100% satisfaction guarantee."
    },
    {
      number: 2,
      title: '"Read What Our Clients Say About Working With Digerati Experts"',
      description: "This will give you a feel for the types of businesses we protect and the results we deliver. Our clients range from professional services firms to healthcare organizations, from legal practices to manufacturing companies. If you would like to speak directly to any of our clients for a reference, please let me know so I can arrange this for you."
    },
    {
      number: 3,
      title: 'Review "The 4 Biggest IT Problems Arizona Businesses Face"',
      description: "This will help you understand the common challenges we solve for our clients and how our cybersecurity-first approach prevents the costly disasters (ransomware, data breaches, compliance violations) that many businesses experience when working with traditional IT providers."
    },
    {
      number: 4,
      title: "Prepare Your Questions & Concerns",
      description: "Please come prepared with any specific security concerns, IT challenges, or compliance requirements you're facing. The more we know about your situation, the more valuable our meeting will be. We'll discuss your current IT environment, your security posture, and how we can help you reduce risk while improving operations."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Pre-Meeting Cover Letter | Internal Reference</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-[#030228]">
        <div className="max-w-3xl mx-auto px-6 py-16">
          {/* Header */}
          <div className="border-b-2 border-violet-400/50 pb-6 mb-12">
            <div className="font-mono text-2xl font-bold text-violet-400 mb-2">
              DIGERATI EXPERTS
            </div>
            <div className="text-sm text-white/50 uppercase tracking-widest">
              Internal Sales Reference - Pre-Meeting Letter
            </div>
          </div>

          {/* Title Box */}
          <div className="relative bg-gradient-to-br from-violet-900/30 to-purple-900/20 border border-violet-400/50 rounded-lg p-8 mb-10 text-center">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-400/10 to-purple-400/10 blur-xl -z-10 rounded-lg" />
            <h1 className="text-2xl md:text-3xl font-bold text-violet-300 leading-tight mb-4">
              Important Information For You To Review<br />
              Prior To Our Meeting
            </h1>
            <p className="text-lg text-violet-400 font-semibold">
              On <span className="bg-violet-400/20 border border-dashed border-violet-400 px-2 py-0.5 rounded text-violet-300">[DAY], [DATE]</span> at <span className="bg-violet-400/20 border border-dashed border-violet-400 px-2 py-0.5 rounded text-violet-300">[TIME]</span>
            </p>
          </div>

          {/* Letter Header */}
          <div className="bg-white/[0.03] border-l-4 border-violet-400 rounded-r-lg p-5 mb-10">
            <p className="text-sm text-white/60 mb-1">
              <strong className="text-white/80">From the Desk of:</strong> Joseph R. Petro
            </p>
            <p className="text-sm text-white/60 mb-1">
              <strong className="text-white/80">Title:</strong> Founder & Security Strategy Lead, Digerati Experts
            </p>
            <p className="text-sm text-white/60">
              <strong className="text-white/80">Date:</strong> <span className="bg-violet-400/20 border border-dashed border-violet-400 px-2 py-0.5 rounded text-violet-300">[Current Date]</span>
            </p>
          </div>

          {/* Letter Body */}
          <p className="text-lg text-white/80 mb-8">
            Dear <span className="bg-violet-400/20 border border-dashed border-violet-400 px-2 py-0.5 rounded text-violet-300">[First Name]</span>,
          </p>

          <div className="space-y-6 text-white/70 leading-relaxed mb-12">
            <p>
              Enclosed is important information regarding Digerati Experts and how our team excels at providing <strong className="text-violet-300">cybersecurity-first IT support</strong> for businesses throughout the Phoenix metro area.
            </p>
            <p>
              Since 2019, Digerati Experts has been a trusted cybersecurity and managed IT partner for businesses like yours. Today, our deep expertise in <strong className="text-violet-300">protecting businesses from cyber threats</strong> while supporting their day-to-day operations allows us to give you real solutions to big security challenges and compliance concerns that many other generic IT firms don't know how to properly address.
            </p>
            <p>
              Unlike traditional IT companies that treat security as an afterthought, we build <strong className="text-violet-300">security into the foundation</strong> of everything we do. Whether you're concerned about ransomware, need to meet compliance requirements (SOC 2, FTC Safeguards, PCI-DSS, HIPAA), or simply want to know your business is protected 24/7 - we have the expertise and the proven track record to help.
            </p>
          </div>

          {/* Action Section */}
          <div className="mb-12">
            <h2 className="text-lg font-semibold text-violet-400 mb-6">
              To prepare for our meeting and make it as productive as possible, please do the following:
            </h2>
            <div className="space-y-4">
              {actionItems.map((item) => (
                <ActionItem key={item.number} {...item} />
              ))}
            </div>
          </div>

          {/* Contact Box */}
          <div className="bg-white/[0.03] border border-white/10 rounded-lg p-8 text-center mb-12">
            <p className="text-white/70 mb-4">If you have any questions prior to our meeting, please call me directly:</p>
            <a
              href="tel:325-480-9870"
              className="inline-flex items-center gap-3 text-2xl font-bold text-violet-400 hover:text-violet-300 transition-colors"
              data-testid="link-phone"
            >
              <Phone className="w-6 h-6" />
              325-480-9870
            </a>
            <p className="text-white/60 mt-4">
              I truly appreciate the opportunity to meet with you and discuss how we can protect and support your business.
            </p>
          </div>

          {/* Signature */}
          <div className="mb-16">
            <p className="text-white/70 mb-6">Dedicated to serving you,</p>
            <p className="text-xl font-bold text-violet-400 mb-1">Joseph R. Petro</p>
            <p className="text-white/50 text-sm">Founder & Security Strategy Lead</p>
            <p className="text-white/50 text-sm">Digerati Experts</p>
          </div>

          {/* Footer */}
          <div className="text-center pt-10 border-t border-white/10">
            <div className="font-mono text-xl font-bold text-violet-400 mb-2">
              DIGERATI EXPERTS
            </div>
            <div className="text-xs text-white/40 mb-3">
              Chandler, Arizona | Serving the Phoenix Metro Area
            </div>
            <div className="text-sm text-white/40">
              325-480-9870 | admin@digerati-experts.com | digeratiexperts.com
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
