import { useState } from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { MegaMenu } from "@/components/MegaMenu";
import { DigeratiEnhancedFooterSection } from "@/pages/sections/DigeratiEnhancedFooterSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Home, BookOpen, ArrowLeft } from "lucide-react";

import ebookCover from "@/assets/images/ebook-defending-digital-realm-cover.png";

interface Chapter {
  id: number;
  title: string;
  subtitle: string;
  content: React.ReactNode;
}

const chapters: Chapter[] = [
  {
    id: 1,
    title: "Understanding Cybersecurity Risk Assessment",
    subtitle: "The Foundation of Digital Defense",
    content: (
      <>
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 border-l-4 border-orange-500 p-6 rounded-r-lg mb-8">
          <p className="text-slate-200 leading-relaxed">
            In today's interconnected world, cybersecurity risk assessment isn't just a technical exercise—it's a business imperative. As digital threats continue to evolve in sophistication and frequency, organizations of all sizes must understand their vulnerabilities and take proactive steps to protect their assets, data, and reputation.
          </p>
        </div>
        
        <h3 className="text-2xl font-bold text-orange-500 mb-4">What Is Cybersecurity Risk Assessment?</h3>
        <p className="text-slate-300 mb-6 leading-relaxed">
          A cybersecurity risk assessment is a systematic process of identifying, analyzing, and evaluating risks to your organization's information systems and data. It helps you understand what assets you have, what threats they face, what vulnerabilities exist, and what the potential impact of a security incident could be.
        </p>

        <div className="bg-gradient-to-br from-orange-500/10 to-amber-500/5 border-2 border-orange-500 rounded-xl p-6 my-8">
          <h4 className="text-xl font-bold text-orange-400 mb-4">Case Study: The Wake-Up Call</h4>
          <div className="text-slate-300 space-y-4">
            <p>
              A mid-sized manufacturing company in Arizona believed they were "too small to be a target." Their IT infrastructure had grown organically over 15 years, with minimal security oversight. When they finally conducted their first risk assessment, they discovered:
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li><strong className="text-orange-400">147 devices</strong> connected to their network—40 more than they knew existed</li>
              <li><strong className="text-orange-400">23 systems</strong> running outdated, unpatched software</li>
              <li><strong className="text-orange-400">No multi-factor authentication</strong> on their email or financial systems</li>
              <li><strong className="text-orange-400">Backup systems</strong> that hadn't been tested in over two years</li>
            </ul>
            <p>
              Three months after the assessment, they successfully defended against a ransomware attack that had encrypted files at a competitor. The difference? They had addressed their critical vulnerabilities.
            </p>
          </div>
        </div>

        <div className="bg-slate-800/50 border-l-4 border-orange-500 p-5 my-6 rounded-r-lg">
          <p className="text-orange-300 font-semibold">
            Key Lesson: The organizations that survive cyber attacks aren't necessarily the ones with the biggest budgets—they're the ones that understand their risks and address them systematically.
          </p>
        </div>
      </>
    )
  },
  {
    id: 2,
    title: "The Risk Assessment Framework",
    subtitle: "A Structured Approach to Security",
    content: (
      <>
        <p className="text-slate-300 mb-6 leading-relaxed">
          Effective risk assessment follows a structured framework that ensures no critical areas are overlooked. While various frameworks exist (NIST, ISO 27001, FAIR), they all share common elements that form the foundation of a comprehensive assessment.
        </p>

        <div className="space-y-4 my-8">
          {[
            { title: "Asset Identification", text: "Catalog all hardware, software, data, and processes that support your business operations. You can't protect what you don't know exists." },
            { title: "Threat Identification", text: "Identify potential threat actors and scenarios: external hackers, insider threats, natural disasters, system failures, and human error." },
            { title: "Vulnerability Assessment", text: "Evaluate weaknesses in your systems, processes, and human factors that could be exploited by identified threats." },
            { title: "Impact Analysis", text: "Determine the potential business impact of different security incidents, including financial, operational, legal, and reputational consequences." },
            { title: "Risk Prioritization", text: "Rank risks based on their likelihood and potential impact to focus resources on the most critical areas." }
          ].map((item, idx) => (
            <div key={idx} className="bg-gradient-to-r from-slate-800/80 to-slate-900/50 border border-slate-700 p-5 rounded-xl border-l-4 border-l-orange-500 hover:shadow-lg hover:shadow-orange-500/5 transition-all">
              <h4 className="font-bold text-orange-500 mb-2">{item.title}</h4>
              <p className="text-slate-400">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-orange-500 rounded-xl p-6 my-8">
          <h4 className="text-xl font-bold text-orange-400 mb-4">Key Assessment Areas</h4>
          <ul className="space-y-3 text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-orange-500">•</span>
              <span><strong className="text-white">Network Security:</strong> Firewalls, segmentation, intrusion detection, and access controls</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500">•</span>
              <span><strong className="text-white">Endpoint Protection:</strong> Antivirus, EDR, patch management, and device encryption</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500">•</span>
              <span><strong className="text-white">Identity & Access:</strong> Authentication methods, privilege management, and user lifecycle</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500">•</span>
              <span><strong className="text-white">Data Protection:</strong> Encryption, classification, backup, and retention policies</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500">•</span>
              <span><strong className="text-white">Human Factors:</strong> Security awareness, policies, and incident response training</span>
            </li>
          </ul>
        </div>
      </>
    )
  },
  {
    id: 3,
    title: "Common Vulnerabilities",
    subtitle: "What We Find in Most Assessments",
    content: (
      <>
        <p className="text-slate-300 mb-6 leading-relaxed">
          After conducting hundreds of risk assessments for Arizona businesses, certain patterns emerge. Understanding these common vulnerabilities can help you identify areas that likely need attention in your own organization.
        </p>

        <div className="grid md:grid-cols-2 gap-4 my-8">
          {[
            { title: "Weak Authentication", text: "Single-factor authentication remains the norm for many business applications, leaving them vulnerable to credential theft and brute force attacks." },
            { title: "Unpatched Systems", text: "Many organizations struggle to maintain current patches, leaving known vulnerabilities exposed for weeks or months." },
            { title: "Inadequate Backups", text: "Backups exist but are rarely tested. When disaster strikes, organizations discover their backups are incomplete or corrupted." },
            { title: "Poor Network Segmentation", text: "Flat networks allow attackers to move laterally, turning a single compromised device into a complete network breach." },
            { title: "Shadow IT", text: "Employees use unauthorized cloud services and applications, creating data leakage risks and compliance violations." },
            { title: "Insufficient Logging", text: "Many organizations can't answer basic questions about their security events because they lack adequate logging and monitoring." }
          ].map((item, idx) => (
            <div key={idx} className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-5 rounded-xl hover:border-orange-500/50 transition-colors">
              <h4 className="font-bold text-orange-500 mb-2">{item.title}</h4>
              <p className="text-slate-400 text-sm">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-orange-500/10 to-amber-500/5 border-2 border-orange-500 rounded-xl p-6 my-8">
          <h4 className="text-xl font-bold text-orange-400 mb-4">Case Study: The Email Compromise</h4>
          <div className="text-slate-300 space-y-4">
            <p>
              A real estate title company lost $1.2 million when attackers compromised their email system and redirected a closing wire transfer. The post-incident assessment revealed:
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>No multi-factor authentication on email accounts</li>
              <li>No email filtering for suspicious attachments or links</li>
              <li>No procedures for verifying wire transfer instructions</li>
              <li>No employee training on business email compromise tactics</li>
            </ul>
            <p>
              Each of these vulnerabilities could have been identified and addressed through a proper risk assessment—at a fraction of the cost of the eventual loss.
            </p>
          </div>
        </div>
      </>
    )
  },
  {
    id: 4,
    title: "Quantifying Risk",
    subtitle: "From Technical Findings to Business Impact",
    content: (
      <>
        <p className="text-slate-300 mb-6 leading-relaxed">
          Technical vulnerabilities mean little to business leaders until they're translated into business terms. Effective risk assessment quantifies potential impacts in ways that support decision-making and resource allocation.
        </p>

        <h3 className="text-2xl font-bold text-orange-500 mb-4">The Risk Equation</h3>
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 border border-orange-500/30 rounded-xl p-6 my-6 text-center">
          <p className="text-2xl font-mono text-orange-400">
            Risk = Likelihood × Impact
          </p>
          <p className="text-slate-400 mt-2 text-sm">
            This simple formula guides all risk prioritization decisions
          </p>
        </div>

        <h3 className="text-2xl font-bold text-orange-500 mb-4 mt-8">Impact Categories</h3>
        <div className="space-y-4 my-6">
          {[
            { title: "Financial Impact", text: "Direct costs (ransom payments, fraud losses), recovery costs (forensics, remediation), and ongoing costs (increased insurance, compliance penalties)." },
            { title: "Operational Impact", text: "Downtime costs, productivity losses, supply chain disruptions, and the resources required for incident response." },
            { title: "Reputational Impact", text: "Customer trust erosion, brand damage, competitive disadvantage, and potential loss of business relationships." },
            { title: "Legal & Regulatory Impact", text: "Compliance violations, regulatory fines, litigation costs, and contractual penalties." }
          ].map((item, idx) => (
            <div key={idx} className="bg-slate-800/50 border-l-4 border-orange-500 p-5 rounded-r-lg">
              <h4 className="font-bold text-white mb-2">{item.title}</h4>
              <p className="text-slate-400">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="bg-slate-800/50 border-l-4 border-orange-500 p-5 my-6 rounded-r-lg">
          <p className="text-orange-300 font-semibold">
            Pro Tip: When quantifying risk, don't just consider the worst-case scenario. Calculate expected annual loss (EAL) by multiplying the impact by the annual probability of occurrence. This provides a more realistic basis for investment decisions.
          </p>
        </div>
      </>
    )
  },
  {
    id: 5,
    title: "Building Your Security Roadmap",
    subtitle: "From Assessment to Action",
    content: (
      <>
        <p className="text-slate-300 mb-6 leading-relaxed">
          A risk assessment is only valuable if it leads to action. The assessment findings should inform a prioritized security roadmap that addresses the most critical risks while respecting budget and resource constraints.
        </p>

        <h3 className="text-2xl font-bold text-orange-500 mb-4">Prioritization Principles</h3>
        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="bg-gradient-to-br from-red-900/20 to-slate-900 border border-red-500/30 p-5 rounded-xl">
            <h4 className="font-bold text-red-400 mb-2">Critical (Immediate)</h4>
            <p className="text-slate-400 text-sm">High-impact vulnerabilities with known exploits. Address within 24-72 hours.</p>
          </div>
          <div className="bg-gradient-to-br from-orange-900/20 to-slate-900 border border-orange-500/30 p-5 rounded-xl">
            <h4 className="font-bold text-orange-400 mb-2">High (Short-term)</h4>
            <p className="text-slate-400 text-sm">Significant risks requiring remediation within 30 days.</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-900/20 to-slate-900 border border-yellow-500/30 p-5 rounded-xl">
            <h4 className="font-bold text-yellow-400 mb-2">Medium (Near-term)</h4>
            <p className="text-slate-400 text-sm">Moderate risks to address within 90 days.</p>
          </div>
          <div className="bg-gradient-to-br from-blue-900/20 to-slate-900 border border-blue-500/30 p-5 rounded-xl">
            <h4 className="font-bold text-blue-400 mb-2">Low (Planned)</h4>
            <p className="text-slate-400 text-sm">Lower-priority items for inclusion in regular maintenance cycles.</p>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-orange-500 mb-4 mt-8">Quick Wins vs. Strategic Initiatives</h3>
        <p className="text-slate-300 mb-6 leading-relaxed">
          Balance your roadmap between quick wins that demonstrate progress and build momentum, and strategic initiatives that address fundamental security gaps. Quick wins build confidence and organizational support; strategic initiatives create lasting security improvements.
        </p>

        <div className="bg-gradient-to-br from-orange-500/10 to-amber-500/5 border-2 border-orange-500 rounded-xl p-6 my-8">
          <h4 className="text-xl font-bold text-orange-400 mb-4">Sample 90-Day Roadmap</h4>
          <div className="text-slate-300 space-y-3">
            <p><strong className="text-white">Days 1-30:</strong> Enable MFA on all critical systems, update endpoint protection, patch critical vulnerabilities</p>
            <p><strong className="text-white">Days 31-60:</strong> Implement network segmentation, deploy email security, begin security awareness training</p>
            <p><strong className="text-white">Days 61-90:</strong> Establish backup testing procedures, implement logging and monitoring, develop incident response plan</p>
          </div>
        </div>
      </>
    )
  },
  {
    id: 6,
    title: "Conclusion",
    subtitle: "Your Journey to Security Resilience",
    content: (
      <>
        <p className="text-slate-300 mb-6 leading-relaxed text-lg">
          Cybersecurity risk assessment isn't a one-time project—it's an ongoing discipline that should be embedded in your organization's culture and operations. As threats evolve and your business changes, regular reassessment ensures your defenses remain aligned with your actual risks.
        </p>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-orange-500 rounded-xl p-6 my-8">
          <h4 className="text-xl font-bold text-orange-400 mb-4">Key Takeaways</h4>
          <ul className="space-y-3 text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-orange-500 font-bold">1.</span>
              <span>Risk assessment is the foundation of effective cybersecurity—you can't protect what you don't understand.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500 font-bold">2.</span>
              <span>Common vulnerabilities are common for a reason—address the basics before pursuing advanced solutions.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500 font-bold">3.</span>
              <span>Translate technical findings into business impact to gain leadership support and appropriate resources.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500 font-bold">4.</span>
              <span>Prioritize based on risk, not just severity—consider both likelihood and impact.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500 font-bold">5.</span>
              <span>Make assessment an ongoing process, not a one-time event.</span>
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white p-8 rounded-xl my-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-3">Ready to Assess Your Security Posture?</h3>
            <p className="mb-6 opacity-95">
              Digerati Experts offers comprehensive cybersecurity risk assessments designed specifically for Arizona businesses.
            </p>
            <a 
              href="https://meet.digerati-experts.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-orange-600 font-bold px-8 py-3 rounded-lg hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              Schedule Your Free Assessment
            </a>
          </div>
        </div>

        <div className="text-center mt-12 pt-8 border-t border-slate-700">
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} Digerati Experts. All rights reserved.
          </p>
          <p className="text-slate-500 text-sm mt-2">
            By Joseph Petro
          </p>
        </div>
      </>
    )
  }
];

export default function Ebook() {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [showCover, setShowCover] = useState(true);

  const goToChapter = (index: number) => {
    setCurrentChapter(index);
    setShowCover(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextChapter = () => {
    if (currentChapter < chapters.length - 1) {
      goToChapter(currentChapter + 1);
    }
  };

  const prevChapter = () => {
    if (currentChapter > 0) {
      goToChapter(currentChapter - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Helmet>
        <title>Defending the Digital Realm - Free Ebook | Digerati Experts</title>
        <meta name="description" content="A comprehensive guide to cybersecurity risk assessment by Joseph Petro. Learn how to protect your Arizona business from digital threats." />
        <meta property="og:title" content="Defending the Digital Realm - Free Cybersecurity Ebook" />
        <meta property="og:description" content="A comprehensive guide to cybersecurity risk assessment for Arizona businesses." />
        <meta property="og:type" content="book" />
        <meta property="og:image" content={ebookCover} />
      </Helmet>

      <MegaMenu />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <Link href="/resources/blog" className="inline-flex items-center text-violet-400 hover:text-violet-300 mb-6 transition-colors" data-testid="link-back-blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Resources
          </Link>

          {showCover ? (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto mb-8">
                <img 
                  src={ebookCover} 
                  alt="Defending the Digital Realm ebook cover" 
                  className="w-full rounded-xl shadow-2xl shadow-orange-500/20 border border-orange-500/30"
                  data-testid="img-ebook-cover"
                />
              </div>
              <Badge className="mb-4 bg-orange-500/20 text-orange-400 border-orange-500/30">
                Free Ebook
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Defending the Digital Realm
              </h1>
              <p className="text-xl text-white/70 mb-2">
                A Comprehensive Guide to Cybersecurity Risk Assessment
              </p>
              <p className="text-white/50 mb-8">By Joseph Petro</p>
              <Button 
                onClick={() => setShowCover(false)}
                className="bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold px-8 py-6 text-lg hover:shadow-lg hover:shadow-orange-500/25 transition-all"
                data-testid="button-start-reading"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Start Reading
              </Button>

              <div className="mt-12 grid md:grid-cols-3 gap-6 text-left">
                <div className="bg-white/[0.02] border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-orange-400 mb-2">6 Chapters</h3>
                  <p className="text-white/60 text-sm">Comprehensive coverage of risk assessment fundamentals</p>
                </div>
                <div className="bg-white/[0.02] border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-orange-400 mb-2">Real Case Studies</h3>
                  <p className="text-white/60 text-sm">Learn from actual Arizona business experiences</p>
                </div>
                <div className="bg-white/[0.02] border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-orange-400 mb-2">Actionable Roadmap</h3>
                  <p className="text-white/60 text-sm">90-day plan to improve your security posture</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-b from-slate-900 to-slate-950 rounded-2xl shadow-2xl overflow-hidden">
              {/* Chapter Navigation */}
              <div className="bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-700 sticky top-16 z-30">
                <div className="flex overflow-x-auto">
                  <button
                    onClick={() => setShowCover(true)}
                    className="px-4 py-3 text-sm text-white/60 hover:text-orange-400 hover:bg-orange-500/10 transition-colors flex items-center gap-1 whitespace-nowrap border-b-2 border-transparent"
                    data-testid="button-cover"
                  >
                    <Home className="w-4 h-4" />
                  </button>
                  {chapters.map((chapter, idx) => (
                    <button
                      key={chapter.id}
                      onClick={() => goToChapter(idx)}
                      className={`px-4 py-3 text-sm whitespace-nowrap transition-colors border-b-2 ${
                        currentChapter === idx
                          ? 'text-orange-400 border-orange-500 bg-orange-500/10'
                          : 'text-white/60 border-transparent hover:text-white hover:bg-white/5'
                      }`}
                      data-testid={`button-chapter-${chapter.id}`}
                    >
                      Ch. {chapter.id}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chapter Content */}
              <div className="p-8 md:p-12 min-h-[600px]">
                <Badge className="mb-4 bg-gradient-to-r from-orange-500/20 to-amber-500/10 text-orange-400 border-orange-500/30">
                  CHAPTER {chapters[currentChapter].id}
                </Badge>
                <h1 className="text-3xl md:text-4xl font-bold text-orange-500 mb-3 pb-4 border-b-4 border-orange-500">
                  {chapters[currentChapter].title}
                </h1>
                <p className="text-xl text-slate-400 mb-10">{chapters[currentChapter].subtitle}</p>
                
                <div className="prose prose-invert prose-orange max-w-none">
                  {chapters[currentChapter].content}
                </div>

                {/* Chapter Navigation */}
                <div className="flex justify-between items-center mt-12 pt-8 border-t-2 border-slate-700">
                  <Button
                    onClick={prevChapter}
                    disabled={currentChapter === 0}
                    variant="outline"
                    className="border-orange-500/30 text-orange-400 hover:bg-orange-500/10 disabled:opacity-30"
                    data-testid="button-prev-chapter"
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>
                  <span className="text-slate-500 text-sm">
                    {currentChapter + 1} of {chapters.length}
                  </span>
                  <Button
                    onClick={nextChapter}
                    disabled={currentChapter === chapters.length - 1}
                    className="bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:shadow-lg disabled:opacity-30"
                    data-testid="button-next-chapter"
                  >
                    Next
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <DigeratiEnhancedFooterSection />
    </div>
  );
}
