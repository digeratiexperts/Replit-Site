import { Link } from "wouter";
import { 
  Star, 
  Shield, 
  MessageCircle, 
  Award, 
  Zap, 
  DollarSign, 
  Mail, 
  Target,
  ArrowLeft
} from "lucide-react";
import { DigeratiEnhancedFooterSection } from "../sections/DigeratiEnhancedFooterSection";

interface RightCard {
  icon: JSX.Element;
  title: string;
  rightText: string;
  pledgeText: string;
}

const rights: RightCard[] = [
  {
    icon: <Star className="w-6 h-6" />,
    title: "Complete Satisfaction",
    rightText: "You have a right to expect complete satisfaction from all services you receive from Digerati Experts. If you are ever unhappy with a service provided, we will correct and redeliver that service until you are completely satisfied with the result.",
    pledgeText: "We Pledge to make it right—at no additional cost to you—until we've exceeded your expectations."
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Compliance-First Solutions",
    rightText: "You have the right to trust that we are recommending and delivering solutions that meet all relevant compliance requirements for your industry—including HIPAA, PCI-DSS, FTC Safeguards, and SOC 2 standards.",
    pledgeText: "We Pledge to never recommend or deliver a service that would put you at risk for non-compliance."
  },
  {
    icon: <MessageCircle className="w-6 h-6" />,
    title: "Plain English Communication",
    rightText: "You have the right to get answers to your questions in plain English, not techno-babble. We believe technology should empower you, not confuse you.",
    pledgeText: "We Pledge to explain recommendations clearly and answer your questions without talking down to you or making you feel foolish for asking."
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "Professionalism & Respect",
    rightText: "You have a right to expect the highest levels of personal accountability, professionalism, and empowerment in every interaction with our organization.",
    pledgeText: "We Pledge to treat you with courtesy, responsiveness, integrity, and respect—ensuring every interaction is a positive, cooperative experience."
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Proactive Innovation",
    rightText: "You have a right to expect us to lead the way in finding, vetting, and recommending new technologies that can protect your business from cyber threats, increase efficiency, lower costs, and improve operations.",
    pledgeText: "We Pledge to constantly seek better solutions to help your business thrive—not just to pad our pockets."
  },
  {
    icon: <DollarSign className="w-6 h-6" />,
    title: "Transparent Pricing",
    rightText: "You have a right to know exactly what a project, solution, or service will cost before we begin. No surprises, no confusion, no hidden fees.",
    pledgeText: "We Pledge to deliver solutions on budget with straightforward, clear billing—without mistakes, hidden fees, or unexpected expenses."
  },
  {
    icon: <Mail className="w-6 h-6" />,
    title: "Your Preferred Communication",
    rightText: "You have a right to communicate with us in your preferred method—whether that's through our website, ticketing system, email, phone, or in person.",
    pledgeText: "We Pledge to make it easy for you to reach us your way—never forcing you to use a portal or communication method you're uncomfortable with."
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "Single Point of Contact",
    rightText: "You have the right to a single, trusted account representative who understands your business and can help with any IT-related issue—from vendor coordination to security concerns.",
    pledgeText: "We Pledge to provide you with a known contact who can address all your technology needs, including computers, networks, phones, security systems, and vendor relationships."
  }
];

export default function ClientBillOfRights() {
  return (
    <div className="min-h-screen bg-[#030228]">
      <header className="border-b border-white/10 bg-[#030228]/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Link href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm" data-testid="link-back-home">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </header>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6" data-testid="heading-bill-of-rights">
            Client Bill of Rights
          </h1>
          <p className="text-lg text-white/70 leading-relaxed mb-8 max-w-2xl mx-auto">
            We greatly appreciate the trust and confidence our clients have placed in Digerati Experts. 
            Your security is our mission, and exceptional service is our standard.
          </p>
          <div className="inline-block px-6 py-4 rounded-xl border border-violet-500/40 bg-violet-500/10">
            <p className="text-white/90">
              We pledge to uphold the <span className="text-violet-400 font-semibold">highest standards</span> of 
              technical support, cybersecurity excellence, and customer satisfaction
            </p>
          </div>
        </div>
      </section>

      <section className="pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid gap-6">
            {rights.map((right, index) => (
              <article 
                key={index}
                className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-6 md:p-8 hover:border-violet-500/30 hover:bg-white/[0.04] transition-all"
                data-testid={`card-right-${index}`}
              >
                <div className="flex items-start gap-5 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-violet-400 flex-shrink-0">
                    {right.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">{right.title}</h3>
                    <p className="text-white/60 leading-relaxed">
                      <span className="text-violet-400 font-medium">You have a right</span> {right.rightText.replace(/^You have (a |the )?right ?(to)?/i, '')}
                    </p>
                  </div>
                </div>
                <div className="ml-0 md:ml-17 pl-0 md:pl-[68px]">
                  <div className="pl-4 border-l-2 border-violet-500/50 bg-violet-500/5 py-3 pr-4 rounded-r-lg">
                    <p className="text-white/80 text-sm leading-relaxed">
                      <span className="text-violet-400 font-semibold">We Pledge</span> {right.pledgeText.replace(/^We Pledge /i, '')}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6" data-testid="heading-commitment">
            Our Commitment to Excellence
          </h2>
          <p className="text-white/60 leading-relaxed text-lg">
            Most of our clients come from referrals from satisfied customers. We <span className="text-violet-400 font-medium">want</span> you to recommend us, 
            but we understand that you will only do this if you are extremely pleased with our services. 
            That's why we work so hard to go above and beyond. The establishment of our Client Bill of Rights, 
            along with our continual investment in people, processes, and technology, clearly demonstrates 
            our unwavering commitment to your success and security.
          </p>
        </div>
      </section>

      <section className="py-12 px-6 border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-white/50 mb-4">See also our money-back guarantee</p>
          <Link 
            href="/about/guarantee"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-medium transition-colors"
            data-testid="link-guarantee"
          >
            100% Money-Back Guarantee
          </Link>
        </div>
      </section>

      <DigeratiEnhancedFooterSection />
    </div>
  );
}
