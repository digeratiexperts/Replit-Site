import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { ChevronDown, ChevronUp, Mic, User, MessageCircle, Phone, Mail, Globe } from "lucide-react";

interface DialogueBlock {
  speaker: "host" | "guest";
  name: string;
  content: string[];
  talkingPoints?: { title: string; items: string[] };
}

interface DialogueSectionProps {
  blocks: DialogueBlock[];
  sectionIndex: number;
}

function DialogueSection({ blocks, sectionIndex }: DialogueSectionProps) {
  return (
    <div className="space-y-4 mb-10" data-testid={`dialogue-section-${sectionIndex}`}>
      {blocks.map((block, i) => (
        <div
          key={i}
          className={`rounded-lg p-6 ${
            block.speaker === "host"
              ? "bg-white/[0.03] border-l-4 border-violet-400"
              : "bg-white/[0.02] border-l-4 border-purple-400"
          }`}
        >
          <div
            className={`font-bold text-sm uppercase tracking-wider mb-3 ${
              block.speaker === "host" ? "text-violet-400" : "text-purple-400"
            }`}
          >
            {block.name}
          </div>
          <div className="space-y-4 text-white/80 leading-relaxed">
            {block.content.map((para, j) => (
              <p key={j} dangerouslySetInnerHTML={{ __html: para }} />
            ))}
          </div>
          {block.talkingPoints && (
            <div className="mt-4 bg-violet-400/10 border-l-4 border-violet-400 rounded-r-lg p-5">
              <h4 className="text-violet-400 font-semibold mb-3">{block.talkingPoints.title}</h4>
              <ul className="space-y-2">
                {block.talkingPoints.items.map((item, k) => (
                  <li key={k} className="text-white/70 text-sm" dangerouslySetInnerHTML={{ __html: item }} />
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function AudioBusinessCard() {
  const [expandedSections, setExpandedSections] = useState<Record<number, boolean>>({});

  const toggleSection = (index: number) => {
    setExpandedSections((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const sections = [
    {
      title: "Opening & Introduction",
      blocks: [
        {
          speaker: "host" as const,
          name: "Host (Opening)",
          content: [
            "Hello and welcome to our Business Builder Interview series. My name is [Host Name], and I'll be your host for today's conversation.",
            "Our guest today is Joseph Petro, a well-known and respected expert in <strong class=\"text-violet-300\">cybersecurity and IT services for Arizona businesses</strong>. He is the Founder and Security Strategy Lead of <strong class=\"text-violet-300\">Digerati Experts</strong>, based in Chandler, Arizona, and has been protecting businesses throughout the Phoenix metro area since 2019.",
            "Joseph and his team specialize in putting <strong class=\"text-violet-300\">cybersecurity FIRST</strong> - not as an afterthought, but as the foundation of everything they do. They work with businesses ranging from professional services firms to healthcare organizations, legal practices to manufacturing companies.",
            "The reason I wanted to interview Joseph for all of you is that he is an absolute expert at protecting businesses from the cybersecurity threats that are plaguing companies today. With ransomware attacks increasing, compliance requirements tightening, and cyber insurance getting harder to obtain, EVERY business owner needs to find a COMPETENT IT partner who can not only protect their business from devastating cyber-attacks, but also help them be far more strategic about technology to increase productivity, improve efficiency, lower costs, and - of course - achieve greater peace of mind.",
            "Joseph, welcome to the program!"
          ]
        },
        {
          speaker: "guest" as const,
          name: "Joseph",
          content: ["Thank you, [Host Name], it's a pleasure to be here."]
        }
      ]
    },
    {
      title: "Question 1: Company Overview",
      blocks: [
        {
          speaker: "host" as const,
          name: "Host",
          content: ["Joseph, can you give us a quick overview of who you are and what Digerati Experts does?"]
        },
        {
          speaker: "guest" as const,
          name: "Joseph",
          content: [
            "Absolutely. Digerati Experts is the outsourced IT and cybersecurity partner for businesses throughout the Phoenix metro area. We've been in business since 2019, and we work primarily with companies that have between 10 and 100 employees - businesses that have reached a maturity level where professional IT and cybersecurity services are absolutely critical, but they're not large enough to justify hiring a full-time internal IT staff.",
            "What makes us different from traditional IT companies is that we put <strong class=\"text-violet-300\">cybersecurity FIRST</strong>. That's not just a tagline for us - it's how we approach every single thing we do. While other IT companies bolt security on as an afterthought or charge extra for it, we build security into the foundation from day one.",
            "Our clients include accounting firms, law practices, healthcare providers, real estate companies, manufacturing businesses - really any organization that handles sensitive data, needs to meet compliance requirements, or simply cannot afford the devastating impact of a ransomware attack or data breach."
          ]
        }
      ]
    },
    {
      title: "Question 2: Your Story",
      blocks: [
        {
          speaker: "host" as const,
          name: "Host",
          content: ["So tell me, how did you get into this business? What's your story?"]
        },
        {
          speaker: "guest" as const,
          name: "Joseph",
          content: [
            "That's a great question. I got into this industry because I saw firsthand how devastating cyber-attacks can be to small and medium-sized businesses. I watched companies - good companies with great products and loyal customers - get absolutely devastated by ransomware attacks that could have been prevented with proper cybersecurity measures.",
            "The frustrating part was that many of these businesses THOUGHT they were protected. They had an IT company. They had antivirus software. They thought they were covered. But when a sophisticated attack came, their defenses crumbled because they were relying on outdated, reactive approaches to IT instead of proactive, security-first strategies.",
            "I founded Digerati Experts because I believed there had to be a better way. Businesses deserve an IT partner who prioritizes their SECURITY and PROTECTION first, not just keeping the lights on and fixing problems after they occur. Our mission is to protect Arizona businesses from the cyber threats that could put them out of business, while making their technology work seamlessly to support their growth and success.",
            "It's about more than just technology for us. It's about protecting people's livelihoods, their employees' jobs, their clients' trust. When we protect a business from a ransomware attack, we're protecting every person who depends on that business - from the owner to the employees to the customers they serve. That's what drives us every single day."
          ]
        }
      ]
    },
    {
      title: "Question 3: Ideal Client",
      blocks: [
        {
          speaker: "host" as const,
          name: "Host",
          content: ["That's powerful. So what type of clients do you work best with? Who's the ideal fit for Digerati Experts?"]
        },
        {
          speaker: "guest" as const,
          name: "Joseph",
          content: [
            "That's an important question because we're not a right fit for everyone, and I want to be upfront about that.",
            "Our <strong class=\"text-violet-300\">BEST clients</strong> are successful, established businesses that have been around for several years, typically with 10 to 100 employees, and they're continuing to grow. Technology is essential to their business operations and client service, so they cannot tolerate email outages, system downtime, or security breaches. They need their systems working like clockwork so they can focus on running their business without constant IT interruptions.",
            "These clients understand that <strong class=\"text-violet-300\">data protection and cybersecurity are CRITICAL</strong>. They don't want the embarrassment, the liability, or the devastating costs that come with a ransomware attack or data breach. They've read the headlines about businesses that got hit and either paid huge ransoms or went out of business entirely, and they're smart enough to invest in prevention rather than gambling with their company's future.",
            "Our clients have also reached a <strong class=\"text-violet-300\">MATURITY in their business</strong> where they recognize that technology isn't just an expense - it's a productivity tool and a competitive advantage. They're not the businesses clinging to outdated systems because they're pinching every penny. They're growth-oriented companies that see the value in proper cybersecurity and professional IT management.",
            "These clients aren't looking for the \"cheapest\" IT service - they're looking for the most <strong class=\"text-violet-300\">COMPETENT</strong> provider, someone they can <strong class=\"text-violet-300\">TRUST</strong> with their business-critical systems and sensitive data. And that's where we shine and deliver our best work.",
            "Now, we also work with some businesses in <strong class=\"text-violet-300\">regulated industries</strong> - healthcare, financial services, legal - who have specific compliance requirements like HIPAA, FTC Safeguards Rule, SOC 2, or PCI-DSS. These organizations need more than just basic IT support; they need a partner who understands the compliance landscape and can keep them audit-ready while maintaining strong security postures."
          ]
        }
      ]
    },
    {
      title: "Question 4: What Makes You Special",
      blocks: [
        {
          speaker: "host" as const,
          name: "Host",
          content: ["I just have to know: what makes Digerati Experts so special? What keeps clients working with you year after year, referring their colleagues, and staying loyal to your services?"]
        },
        {
          speaker: "guest" as const,
          name: "Joseph",
          content: [
            "I guess it's because of what our customers tell us. And the number one reason clients like doing business with us is something I believe shouldn't be unique or rare, but unfortunately it is...and that is we actually <strong class=\"text-violet-300\">DELIVER on our promises</strong>!",
            "In my opinion, every company should do that. However, there are a LOT of IT companies out there who SAY they're proactive, who SAY they're monitoring your systems 24/7, who SAY they're backing everything up properly - but just try to validate that they're actually DOING what they claim! In many cases, you never see them until something breaks.",
            "That's because many IT companies are small operations that are outsourcing support to third-party help desks, often overseas. Or they're so short-staffed that they aren't truly conducting all the security checks they should, or doing all the maintenance work that you're paying for. And they can get away with this poor service because most clients aren't technical and have no way of knowing for sure what's actually being done UNTIL something terrible happens - like a ransomware attack, a compliance audit failure, or extended downtime.",
            "Since we serve successful, growth-oriented businesses, we know they <strong class=\"text-violet-300\">CANNOT be down</strong> without email, internet, or critical systems for any period of time. Even an HOUR of downtime can be highly disruptive - it's frustrating to the owner, the employees, and their clients because a down IT system prevents the business from serving customers, processing orders, fulfilling services.",
            "Here's a specific example: We had a client come to us after their previous IT provider failed to detect early warning signs of a ransomware infection. By the time they realized what was happening, the ransomware had encrypted critical business data. The previous provider's \"backups\" turned out to be corrupted and couldn't be restored. That company lost three weeks of data and had to pay $75,000 in recovery costs and lost productivity.",
            "With our <strong class=\"text-violet-300\">ProActive Ecosystem</strong>, we monitor for threats 24/7 using SIEM technology - Security Information and Event Management - which means we're watching for suspicious activity, attempted intrusions, and ransomware indicators in real-time. We've stopped attacks before clients even knew they were being targeted."
          ]
        }
      ]
    },
    {
      title: "Question 5: What You Do Differently",
      blocks: [
        {
          speaker: "host" as const,
          name: "Host",
          content: ["That's impressive. So what do you do differently to ensure that quality of service is delivered on a consistent basis and that clients actually get what they need and what they're paying for?"]
        },
        {
          speaker: "guest" as const,
          name: "Joseph",
          content: [
            "Sure. I think the best place to start is describing where we typically find businesses when they first come to us.",
            "Usually they're experiencing one of two situations:"
          ],
          talkingPoints: {
            title: "Common Problems We See:",
            items: [
              "<strong class=\"text-violet-300\">Cobbled-together security:</strong> They have computer networks that have been randomly thrown together over the years - systems that are largely insecure and vulnerable. And it's not their fault! Most business owners aren't cybersecurity experts, so they've relied on well-meaning employees, friends, or low-cost providers who didn't implement proper security controls. They end up with massive vulnerabilities - no multi-factor authentication, outdated firewalls, weak passwords, no employee security training - and they're one phishing email away from disaster.",
              "<strong class=\"text-violet-300\">Failed IT providers:</strong> They HAVE outsourced their IT to another company, trusting they knew what they were doing. But when we audit their environment, we discover their backups aren't working properly, their antivirus is outdated or misconfigured, they have no monitoring for security threats, and they aren't compliant with industry regulations. The reason they called us is because the previous company was impossible to reach when problems occurred, response times were terrible, and they simply weren't getting the protection they were paying for."
            ]
          }
        },
        {
          speaker: "guest" as const,
          name: "Joseph (continued)",
          content: [
            "So what makes our process and approach <strong class=\"text-violet-300\">UNIQUE</strong> and allows us to really deliver for our clients comes down to several key things:"
          ],
          talkingPoints: {
            title: "Our Cybersecurity-First Approach:",
            items: [
              "<strong class=\"text-violet-300\">24/7 Security Monitoring:</strong> We implement SIEM technology that watches for threats around the clock. Ransomware doesn't attack during business hours - it strikes when you're most vulnerable, often late at night or on weekends. Our Security Operations Center is always watching.",
              "<strong class=\"text-violet-300\">Multi-Layered Defense:</strong> We don't rely on just one security tool. We implement endpoint protection, next-generation firewalls, email security, multi-factor authentication, dark web monitoring, and regular vulnerability assessments. If one layer fails, others protect you.",
              "<strong class=\"text-violet-300\">Proactive Threat Hunting:</strong> We don't wait for alerts. Our team actively searches for indicators of compromise, suspicious activity, and potential vulnerabilities before they're exploited.",
              "<strong class=\"text-violet-300\">Employee Security Training:</strong> Your employees are your first line of defense. We provide regular security awareness training and simulated phishing campaigns to keep your team vigilant against social engineering attacks.",
              "<strong class=\"text-violet-300\">Compliance Management:</strong> If you're in a regulated industry, we ensure you meet requirements for SOC 2, FTC Safeguards, PCI-DSS, HIPAA, or whatever applies to your business. We maintain documentation, conduct regular assessments, and keep you audit-ready.",
              "<strong class=\"text-violet-300\">Immutable Backups:</strong> We implement backup solutions that ransomware CANNOT encrypt. Even if attackers get into your network, they cannot destroy your backups. And we test restorations regularly to ensure they actually work.",
              "<strong class=\"text-violet-300\">Transparent Reporting:</strong> Every month, clients receive detailed reports showing their security posture, threats blocked, vulnerabilities addressed, and system health. You always know what's being done to protect you.",
              "<strong class=\"text-violet-300\">Local, Responsive Support:</strong> We're based in Chandler, serving the Phoenix metro area. You're working with LOCAL professionals you can meet face-to-face, not an outsourced help desk halfway around the world."
            ]
          }
        },
        {
          speaker: "guest" as const,
          name: "Joseph (continued)",
          content: [
            "And again, this is not \"revolutionary\" stuff. These are <strong class=\"text-violet-300\">best practices</strong> that SHOULD be standard in our industry. But MOST other IT firms simply don't do these things for their clients, even though they claim they do!",
            "The reason clients stay with us for years and refer others is that we make all the pain, aggravation, and risk of inadequate cybersecurity go away. We actually deliver what we say we're going to deliver.",
            "While that SOUNDS like a simple concept, the reality is that there are dozens of so-called \"IT pros\" who will sell you a managed services agreement and SAY they're protecting you, backing you up, monitoring your systems - but they really aren't. Some are even outsourcing all support to third-party companies, which to my mind is a <strong class=\"text-violet-300\">HUGE security risk</strong>! Do you really want your passwords, your financial data, your client information accessible to strangers you've never met?"
          ]
        }
      ]
    },
    {
      title: "Question 6: Pricing",
      blocks: [
        {
          speaker: "host" as const,
          name: "Host",
          content: ["That makes a lot of sense. What about pricing? How does your pricing model work, and how do you ensure clients get value for their investment?"]
        },
        {
          speaker: "guest" as const,
          name: "Joseph",
          content: [
            "Great question. We offer what we call our <strong class=\"text-violet-300\">ProActive Ecosystem</strong> - tiered service packages that provide transparent, flat-rate pricing. Clients know exactly what they're paying each month, with no surprise bills, no hidden fees, no \"time and materials\" guessing games.",
            "We have four tiers - IT Essentials, Office, Business, and Enterprise - ranging from $180 to $360 per user per month. Each tier includes progressively more comprehensive security services, monitoring, support, and compliance capabilities.",
            "What's included depends on the tier, but even our entry-level tier includes 24/7 security monitoring, unlimited support, cloud-based backups, endpoint protection, and employee security training. As you move up to higher tiers, you get advanced threat detection, compliance management, more comprehensive security controls, and additional services.",
            "We also offer flexible engagement options. We have <strong class=\"text-violet-300\">30-Day Pilots</strong> where prospects can try our services without long-term commitment, and <strong class=\"text-violet-300\">90-Day Momentum Terms</strong> for businesses that want to get started but aren't ready for annual contracts. We're so confident in our ability to deliver value that we back everything with a <strong class=\"text-violet-300\">100% satisfaction guarantee</strong>.",
            "Look, we're not the cheapest option out there, and we don't pretend to be. But as the saying goes, you get what you pay for. Cheap IT support usually means inexperienced technicians, poor security practices, and corner-cutting that puts your business at risk. When you're talking about protecting your business from ransomware attacks that could cost you hundreds of thousands of dollars - or worse, put you out of business entirely - price shopping for the cheapest provider is a dangerous game."
          ]
        }
      ]
    },
    {
      title: "Question 7: Advice for Business Owners",
      blocks: [
        {
          speaker: "host" as const,
          name: "Host",
          content: ["What advice would you give to business owners who are evaluating IT services companies right now? What should they look for?"]
        },
        {
          speaker: "guest" as const,
          name: "Joseph",
          content: [
            "Excellent question. Here are the key things every business owner should demand from any IT provider they're considering:"
          ],
          talkingPoints: {
            title: "Critical Questions to Ask:",
            items: [
              "<strong class=\"text-violet-300\">Do they put cybersecurity FIRST?</strong> Don't accept security as an add-on or afterthought. It should be built into everything they do from day one.",
              "<strong class=\"text-violet-300\">Do they provide 24/7 security monitoring?</strong> Basic antivirus isn't enough anymore. You need real-time threat detection and response.",
              "<strong class=\"text-violet-300\">Are they LOCAL?</strong> Can you meet them face-to-face? Or are you working with an outsourced help desk overseas? This matters for both service quality and data security.",
              "<strong class=\"text-violet-300\">Do they have compliance expertise?</strong> If you're in a regulated industry, they need to understand your specific requirements - not just generic IT support.",
              "<strong class=\"text-violet-300\">Can they provide references?</strong> Talk to their current clients. Ask about response times, problem resolution, and whether they actually deliver what they promise.",
              "<strong class=\"text-violet-300\">Do they offer transparent pricing?</strong> Beware of \"time and materials\" billing that can spiral out of control. Get fixed-fee quotes.",
              "<strong class=\"text-violet-300\">Do they test your backups?</strong> The worst time to discover your backups don't work is when you need them after a ransomware attack.",
              "<strong class=\"text-violet-300\">Do they provide employee security training?</strong> Your people are your first line of defense. They need ongoing training, not just a one-time presentation."
            ]
          }
        },
        {
          speaker: "guest" as const,
          name: "Joseph (continued)",
          content: [
            "And here's maybe the most important piece of advice: <strong class=\"text-violet-300\">Don't choose based on price alone.</strong> The cheapest IT provider is rarely the best value. When you're talking about protecting your business, your data, your reputation, and your clients' trust, quality matters far more than saving a few dollars per month.",
            "Think about it this way: Would you rather invest $300 per employee per month in proper cybersecurity, or risk a $250,000 ransomware attack plus weeks of downtime? The math is pretty simple when you look at it that way."
          ]
        }
      ]
    },
    {
      title: "Closing",
      blocks: [
        {
          speaker: "host" as const,
          name: "Host (Closing)",
          content: ["Joseph, this has been incredibly valuable. How can business owners get in touch with you if they want to learn more or schedule a consultation?"]
        },
        {
          speaker: "guest" as const,
          name: "Joseph",
          content: [
            "The best way is to contact us directly. You can call us at <strong class=\"text-violet-300\">325-480-9870</strong>, email us at <strong class=\"text-violet-300\">admin@digerati-experts.com</strong>, or visit our website at <strong class=\"text-violet-300\">digeratiexperts.com</strong>.",
            "We offer complimentary <strong class=\"text-violet-300\">Cybersecurity Risk Assessments</strong> for businesses throughout the Phoenix metro area. During this assessment, we'll evaluate your current security posture, identify vulnerabilities, and provide a detailed report with prioritized recommendations - all at no cost and with no obligation.",
            "This gives you a chance to see how we work, experience our expertise firsthand, and determine if we're the right fit for your business. Even if you don't become a client right away, you'll walk away with valuable insights about your cybersecurity risks and what you should be doing to protect your business.",
            "I'd encourage anyone listening who's concerned about ransomware, compliance, or just wants to know if their current IT provider is actually doing what they claim - reach out. We're here to help protect Arizona businesses, and we'd be honored to talk with you about your specific situation."
          ]
        },
        {
          speaker: "host" as const,
          name: "Host",
          content: ["Joseph Petro, Founder and Security Strategy Lead of Digerati Experts. Thank you so much for sharing your expertise with us today."]
        },
        {
          speaker: "guest" as const,
          name: "Joseph",
          content: ["Thank you for having me. It's been a pleasure."]
        }
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Audio Business Card Interview Script | Internal Reference</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-[#030228]">
        <div className="max-w-4xl mx-auto px-6 py-16">
          {/* Header */}
          <div className="border-b-2 border-violet-400/50 pb-6 mb-12">
            <div className="font-mono text-2xl font-bold text-violet-400 mb-2">
              DIGERATI EXPERTS
            </div>
            <div className="text-sm text-white/50 uppercase tracking-widest">
              Internal Sales Reference - Audio Business Card Script
            </div>
          </div>

          {/* Title Section */}
          <div className="relative bg-gradient-to-br from-violet-900/30 to-purple-900/20 border border-violet-400/50 rounded-lg p-8 mb-10 text-center">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-400/10 to-purple-400/10 blur-xl -z-10 rounded-lg" />
            <h1 className="text-2xl md:text-3xl font-bold text-violet-300 leading-tight mb-4">
              "What Every Arizona Business Owner Must Know About Finding A Cybersecurity-First, Trustworthy And COMPETENT IT Services Firm"
            </h1>
            <p className="text-white/60">Duration: 20-30 Minutes | Format: Q&A Interview</p>
          </div>

          {/* Production Notes */}
          <div className="bg-violet-400/10 border border-violet-400/30 rounded-lg p-6 mb-12">
            <h3 className="text-violet-400 font-semibold mb-4 flex items-center gap-2">
              <Mic className="w-5 h-5" />
              Production Notes
            </h3>
            <ul className="space-y-2 text-white/70 text-sm">
              <li>• Record in a quiet environment with good audio quality</li>
              <li>• Keep tone conversational and authentic</li>
              <li>• Pause naturally between questions for editing flexibility</li>
              <li>• Emphasize words in <strong className="text-violet-300">bold</strong> for impact</li>
              <li>• Feel free to ad-lib while staying on message</li>
              <li>• Total runtime should be 20-30 minutes</li>
            </ul>
          </div>

          {/* Collapsible Sections */}
          <div className="space-y-4 mb-16">
            {sections.map((section, index) => (
              <div
                key={index}
                className="border border-white/10 rounded-lg overflow-hidden"
                data-testid={`section-${index}`}
              >
                <button
                  onClick={() => toggleSection(index)}
                  className="w-full flex items-center justify-between p-5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                  data-testid={`button-toggle-section-${index}`}
                >
                  <span className="text-violet-300 font-semibold">{section.title}</span>
                  {expandedSections[index] ? (
                    <ChevronUp className="w-5 h-5 text-violet-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-violet-400" />
                  )}
                </button>
                {expandedSections[index] && (
                  <div className="p-6 border-t border-white/10">
                    <DialogueSection blocks={section.blocks} sectionIndex={index} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="bg-white/[0.03] border border-violet-400/30 rounded-lg p-10 text-center mb-16">
            <div className="font-mono text-xl font-bold text-violet-400 mb-4">
              DIGERATI EXPERTS
            </div>
            <div className="text-xs text-white/40 uppercase tracking-widest mb-6">
              Managed IT • Cybersecurity • Compliance
            </div>
            <div className="text-white/60 mb-6">
              Chandler, Arizona | Serving the Phoenix Metro Area
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:325-480-9870"
                className="text-violet-400 hover:text-violet-300 transition-colors"
                data-testid="link-phone"
              >
                325-480-9870
              </a>
              <span className="text-white/20">|</span>
              <a
                href="mailto:admin@digerati-experts.com"
                className="text-violet-400 hover:text-violet-300 transition-colors"
                data-testid="link-email"
              >
                admin@digerati-experts.com
              </a>
              <span className="text-white/20">|</span>
              <a
                href="https://digeratiexperts.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet-400 hover:text-violet-300 transition-colors"
                data-testid="link-website"
              >
                digeratiexperts.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
