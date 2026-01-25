import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { ChevronDown, ChevronUp, Phone, Mail, Globe, Shield, AlertTriangle, CheckCircle } from "lucide-react";

interface QuestionProps {
  number: number;
  question: string;
  answer: string;
}

function QuestionCard({ number, question, answer }: QuestionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="bg-white/[0.03] border-l-4 border-violet-400 rounded-r-lg overflow-hidden"
      data-testid={`question-${number}`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-5 flex items-start gap-4 hover:bg-white/[0.02] transition-colors"
        data-testid={`button-toggle-question-${number}`}
      >
        <span className="text-xs text-violet-400 font-semibold uppercase tracking-wider whitespace-nowrap pt-0.5">
          Question #{number}
        </span>
        <div className="flex-1">
          <span className="text-violet-300 font-medium">{question}</span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-violet-400 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-violet-400 flex-shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="px-5 pb-5 pt-0">
          <div className="text-xs text-violet-400 font-semibold mb-2">Our Answer:</div>
          <p className="text-white/70 text-sm leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

interface MisconceptionProps {
  number: number;
  title: string;
  content: string;
}

function MisconceptionCard({ number, title, content }: MisconceptionProps) {
  return (
    <div
      className="bg-white/[0.03] border border-white/10 border-t-4 border-t-violet-400 rounded-lg p-6"
      data-testid={`misconception-${number}`}
    >
      <h3 className="text-lg font-semibold text-violet-300 mb-3">{title}</h3>
      <p className="text-white/70 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}

export default function BuyersGuide() {
  const customerServiceQuestions: QuestionProps[] = [
    { number: 1, question: "Do they answer their phones live or do you always have to leave a voicemail and wait for someone to call you back?", answer: "We strive to answer our phones live during business hours and provide all clients with emergency after-hours support. Why? Because when you have a critical security issue or system problem, you need help NOW, not hours later. If they cannot access their systems AND can't get hold of anyone to help them, it's incredibly frustrating and costly." },
    { number: 2, question: "Do they have a written, guaranteed response time to your calls?", answer: "We guarantee rapid response times written into our ProActive Ecosystem service agreements. This is standard procedure for our clients because we understand that IT problems don't wait for convenient times to occur." },
    { number: 3, question: "Do they take the time to explain what they are doing in plain English, or do they use confusing geek-speak and make you feel stupid for asking questions?", answer: "Our team is trained to explain cybersecurity risks and technical issues in terms that make sense for your business. We believe you should understand the \"why\" behind our recommendations, especially when it comes to security investments. No geek-speak, no condescension - just clear, helpful communication." },
    { number: 4, question: "Do they consistently and proactively offer new ways to improve your security and network performance, or do they wait until you have a problem?", answer: "We conduct regular strategic review meetings with our clients to look for new ways to strengthen security, improve operations, lower costs, and ensure compliance. Our goal is to PREVENT problems, not just react to them. That's the \"ProActive\" in our ProActive Ecosystem." },
    { number: 5, question: "Do they provide detailed invoices that clearly explain what you are paying for?", answer: "We provide transparent, flat-rate pricing through our ProActive Ecosystem tiers. You know exactly what you're paying each month, with no surprise bills, hidden fees, or \"time and materials\" guessing games. Everything is included: 24/7 monitoring, unlimited support, security services, and compliance management." },
    { number: 6, question: "Do they have adequate errors and omissions insurance as well as workers' compensation insurance to protect YOU?", answer: "Absolutely. Here's something to consider: if THEY cause a security breach or data loss, who's responsible? If one of their technicians gets hurt at your office, who's paying? In this litigious society we live in, you better make sure whomever you hire is adequately insured. We carry comprehensive E&O and workers' comp insurance, and we're happy to provide proof." },
    { number: 7, question: "Do they guarantee to complete projects on time and on budget?", answer: "All projects are quoted with fixed pricing and guaranteed completion timelines, in writing. This is important because many unethical or incompetent IT companies will only quote \"time and materials,\" which gives them free rein to nickel-and-dime you and take as much time as they want." }
  ];

  const securityQuestions: QuestionProps[] = [
    { number: 8, question: "Do they insist on 24/7/365 security monitoring to detect threats, not just keep systems updated?", answer: "Yes. Our Security Operations Center (SOC) watches over your network constantly using SIEM technology to detect suspicious activity, attempted intrusions, ransomware indicators, and other security threats BEFORE they become disasters. This isn't optional - it's fundamental to keeping your business protected." },
    { number: 9, question: "Do they provide monthly reports showing security status, threat detections, and system health?", answer: "Every month our clients receive detailed reports showing their security posture, threats blocked, vulnerabilities addressed, backup status, and overall network health. Transparency is critical - you should always know the status of your cybersecurity defenses." },
    { number: 10, question: "Is it standard procedure for them to provide complete network documentation, or are they the only ones with the \"keys to the kingdom\"?", answer: "All clients receive complete network documentation including passwords, licenses, configurations, and procedures. We update this regularly and ensure key people in your organization have access. You should NEVER allow an IT company to hold you hostage with undocumented systems. That's unethical and dangerous." },
    { number: 11, question: "Do they have multiple technicians familiar with your network, or are you dependent on one person?", answer: "Yes. We maintain detailed documentation on every client's environment, so any of our certified technicians can help you. You're never dependent on a single person being available." },
    { number: 12, question: "When they offer an \"all-inclusive\" support plan, is it TRULY all-inclusive, or are there hidden exclusions?", answer: "Our ProActive Ecosystem tiers are genuinely all-inclusive for the services specified in each tier. We're transparent about what's included at each level (IT Essentials, Office, Business, Enterprise) from $180-$360 per user per month. No gotchas, no fine print surprises." }
  ];

  const backupQuestions: QuestionProps[] = [
    { number: 13, question: "Do they INSIST on modern cloud-based backups with ransomware protection, or are they letting you rely on outdated methods?", answer: "We do not allow clients to rely on tape backups, USB drives, or other unreliable methods. We implement enterprise-grade cloud backup solutions with immutable copies that ransomware cannot encrypt. Your backups should be your last line of defense, not your weakest link." },
    { number: 14, question: "Do they regularly test your backups to ensure data can actually be restored?", answer: "We perform regular test restores to verify backup integrity. After all, the WORST time to discover your backups don't work is when you desperately need them after a ransomware attack or hardware failure." },
    { number: 15, question: "Do they insist on backing up your systems BEFORE performing upgrades or major changes?", answer: "Absolutely. This is basic best practice as a precaution in case something goes wrong during the update process." },
    { number: 16, question: "Do they have a documented disaster recovery plan for your business?", answer: "All clients receive a disaster recovery plan that outlines exactly how their systems and data would be restored after a major incident. We document recovery time objectives (RTO) and recovery point objectives (RPO) so you know what to expect." }
  ];

  const expertiseQuestions: QuestionProps[] = [
    { number: 17, question: "Is their support team US-based and local, or outsourced overseas?", answer: "We provide our own in-house support team based right here in Chandler, Arizona. We're LOCAL - you can meet us, visit our office, and know exactly who has access to your systems. We believe this is critical for both service quality and data security." },
    { number: 18, question: "Do their technicians maintain current certifications and participate in ongoing cybersecurity training?", answer: "Our team maintains current certifications in security technologies, Microsoft platforms, and compliance frameworks. Cybersecurity threats evolve constantly - our team must evolve with them through continuous training and professional development." },
    { number: 19, question: "Do they specialize in compliance requirements for your industry?", answer: "We have deep expertise in SOC 2, FTC Safeguards Rule (financial services), PCI-DSS (payment processing), HIPAA (healthcare), and other regulatory frameworks. Compliance isn't just checking boxes - it's implementing real controls that actually protect your business and keep you audit-ready." },
    { number: 20, question: "Do they provide security awareness training for your employees?", answer: "Yes. Your employees are your first line of defense against phishing, social engineering, and other attacks. We provide regular security awareness training and simulated phishing campaigns to keep your team vigilant." },
    { number: 21, question: "When something goes wrong with your internet, phones, printers, or other IT services, do they own the problem, or say \"that's not our responsibility\"?", answer: "We own the problem for our clients. You shouldn't have to coordinate between multiple vendors and play tech support yourself. We act as your single point of contact and handle issues with third-party providers on your behalf." }
  ];

  const misconceptions: MisconceptionProps[] = [
    { number: 1, title: "Misconception #1: My network doesn't need 24/7 security monitoring", content: "This is probably one of the biggest and costliest misconceptions that business owners have. Usually this is because they've been fortunate enough to never experience a ransomware attack - but that's similar to thinking you don't need to wear a seat belt because you've never had an accident.<br/><br/><strong class=\"text-violet-300\">Modern cybersecurity threats don't wait for business hours.</strong> Ransomware attacks happen at 2 AM. Hackers probe your defenses 24/7. Data breaches occur on weekends. Without continuous monitoring, you won't know you've been compromised until it's too late.<br/><br/>If your IT company doesn't insist on 24/7 security monitoring with threat detection, DO NOT HIRE THEM. Either they don't understand modern cybersecurity (which is frightening), OR they're profiting from cleaning up disasters instead of preventing them." },
    { number: 2, title: "Misconception #2: My nephew/neighbor/office manager can handle our IT and cybersecurity", content: "Most people look for a part-time \"guru\" for one reason: to save money. But this often comes back to haunt them catastrophically. We frequently get calls from business owners who desperately need our help after an inexperienced friend or relative caused a security breach or couldn't stop a ransomware attack.<br/><br/>Cybersecurity is not a hobby. It requires specialized knowledge, certifications, experience, and constant training to stay ahead of evolving threats. Do you really want a part-time amateur responsible for protecting your customer data, financial records, and business reputation? As with everything in life, you get what you pay for." },
    { number: 3, title: "Misconception #3: All IT companies are created equal - choose the cheapest", content: "A cheap price usually means cheap security. Really good cybersecurity professionals do NOT work cheap because they are in high demand. The only technicians that work cheap are those who are just starting out and are grossly inexperienced.<br/><br/>An inexperienced IT company can cost you far more because:<br/>• They improperly configure security controls, leaving you vulnerable<br/>• They take 3-5 times longer to fix problems an experienced team would solve quickly<br/>• They could cause a data breach or fail to prevent ransomware, costing you hundreds of thousands<br/><br/>With your client data, financial records, and business reputation at stake, do you REALLY want the lowest-priced company protecting you?" },
    { number: 4, title: "Misconception #4: An honest IT company should quote prices over the phone", content: "I wish this were true, but it isn't. Just like a good doctor, an honest IT professional needs to assess your environment before quoting prices. Every network is different, every security posture is unique, and every compliance requirement varies.<br/><br/>Some companies will quote cheap rates over the phone to get in the door, then jack up prices once they start working. Reputable firms like ours provide fixed-fee quotes AFTER properly assessing your needs - ensuring no surprises and fair pricing based on your actual requirements." }
  ];

  const mistakes = [
    { title: "Mistake #1: Choosing based on a single phone call", content: "We recommend inviting them to your office for a proper security assessment. A competent professional should offer to audit your environment before quoting anything. Prescription without diagnosis is malpractice - whether in medicine or IT security." },
    { title: "Mistake #2: Choosing a company without a satisfaction guarantee", content: "A good IT services firm should stand behind their work. If they can't fix a problem to YOUR satisfaction, you shouldn't get stuck with the bill. The fact that they offer a guarantee shows confidence in their ability to deliver results." },
    { title: "Mistake #3: Not checking references thoroughly", content: "Don't just take the sales person's word. Ask to speak to at least 3-4 current clients similar to your business size and industry. If they hesitate or can't provide references, that's a massive red flag. Check online reviews, testimonials, and case studies." },
    { title: "Mistake #4: Choosing a company without cybersecurity expertise", content: "In 2025, you cannot separate IT from cybersecurity. They're one and the same. If an IT company doesn't specialize in security - with certifications, SIEM capabilities, compliance expertise, and documented security processes - they're living in the past and putting your business at risk." },
    { title: "Mistake #5: Choosing a company that doesn't understand your compliance requirements", content: "If you handle sensitive data, accept payments, or work in a regulated industry, compliance isn't optional. SOC 2, FTC Safeguards, PCI-DSS, HIPAA - these aren't just acronyms, they're legal requirements with massive fines for violations. Your IT company must have proven compliance expertise." }
  ];

  return (
    <>
      <Helmet>
        <title>IT Services Buyer's Guide - 21 Questions | Internal Reference</title>
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
              Internal Sales Reference - Buyer's Guide
            </div>
          </div>

          {/* Title Section */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-purple-300 to-fuchsia-300 mb-4 leading-tight">
              "What Every Arizona Business Owner Must Know About Hiring A Cybersecurity-First, Competent, Responsive and Fairly Priced IT Services Company"
            </h1>
            <p className="text-lg text-violet-400 font-semibold">
              Don't Trust Your Company's Critical Data and Operations To Just Anyone!
            </p>
          </div>

          {/* Highlights Box */}
          <div className="bg-gradient-to-br from-violet-900/30 to-purple-900/20 border border-violet-400/50 rounded-lg p-8 mb-12">
            <h3 className="text-center text-violet-300 font-semibold mb-6">
              This Business Advisory Guide Will Arm You with 21 Revealing Questions You Should Ask Any IT Company Before Giving Them Access to Your Network. Read This To Discover:
            </h3>
            <ul className="space-y-3">
              {[
                "The \"dirty little secret\" of the IT industry that most people don't know and will never be told by their IT guy",
                "21 revealing questions that will help you instantly spot an unethical or grossly incompetent IT support company",
                "4 costly misconceptions most business owners have about IT services and cybersecurity",
                "Ransomware, phishing, and compliance violations: what you need to know to protect yourself",
                "5 common mistakes to avoid when choosing an IT services provider",
                "Why \"cheap\" or \"lowest price\" IT companies aren't the bargain they initially appear to be",
                "The one surefire sign that you should run - not walk - away from an IT support firm"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-white/70 text-sm">
                  <span className="text-violet-400 font-bold">▸</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Provider Box */}
          <div className="bg-white/[0.03] border-l-4 border-violet-400 rounded-r-lg p-6 text-center mb-12">
            <p className="text-white/60 mb-2">Provided as an educational service by:</p>
            <p className="text-xl text-violet-400 font-bold">Joseph R. Petro</p>
            <p className="text-white/70">Founder & Security Strategy Lead</p>
            <p className="text-white/70">Digerati Experts</p>
            <p className="text-white/50 mt-3">Chandler, Arizona | 325-480-9870</p>
          </div>

          {/* Letter Section */}
          <div className="mb-16">
            <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5 mb-8">
              <p className="text-sm text-white/60"><strong className="text-white/80">From the Desk of:</strong> Joseph R. Petro</p>
              <p className="text-sm text-white/60"><strong className="text-white/80">Founder & Security Strategy Lead,</strong> Digerati Experts</p>
            </div>

            <p className="text-white/80 mb-6"><strong className="text-violet-300">Dear Colleague,</strong></p>

            <div className="space-y-4 text-white/70 leading-relaxed">
              <p>Choosing an IT services company isn't easy. There is no shortage of horror stories about incompetent "computer guys" bungling jobs and causing MORE problems because of their loose morals or gross incompetence. I'm sure if you talk to your own friends and colleagues you will get an earful of the unfortunate experiences they have encountered in this area.</p>
              <p>Why is this? Because the IT services and consulting industry, along with a lot of other industries, has its own share of incompetent or unethical businesses that will try to take advantage of trusting business owners who simply cannot determine whether the technician knows what they are doing.</p>
            </div>

            <h2 className="text-xl font-semibold text-violet-300 mt-10 mb-4">Buyer Beware: The IT Services Industry Is NOT Regulated</h2>
            <div className="space-y-4 text-white/70 leading-relaxed">
              <p>Here's an embarrassing (and little-known) fact about my industry: <strong className="text-violet-300">it is not regulated</strong> like many other professional service industries, which means ANYONE can claim they are an "IT expert" or "cybersecurity specialist."</p>
              <p>Automotive repair shops, electricians, plumbers, lawyers, realtors, dentists, doctors, accountants, etc., are heavily regulated to protect the consumer from receiving substandard work or getting ripped off. However, the computer industry is still highly unregulated and there aren't any laws in existence to protect the consumer - which is why it's so important for you to arm yourself with the information contained in this report.</p>
            </div>

            <p className="mt-8 text-white/70">Dedicated to serving you,</p>
            <p className="text-lg font-bold text-violet-400 mt-2">Joseph R. Petro</p>
            <p className="text-white/50 text-sm">Founder & Security Strategy Lead, Digerati Experts</p>
          </div>

          {/* 21 Questions Section */}
          <h2 className="text-2xl md:text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-purple-300 to-fuchsia-300 mb-10">
            21 Questions You Should Ask Your IT Company Before Hiring Them
          </h2>

          {/* Customer Service Questions */}
          <h3 className="text-lg font-semibold text-violet-400 mb-6 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Customer Service & Response
          </h3>
          <div className="space-y-3 mb-10">
            {customerServiceQuestions.map((q) => (
              <QuestionCard key={q.number} {...q} />
            ))}
          </div>

          {/* Network Security Questions */}
          <h3 className="text-lg font-semibold text-violet-400 mb-6 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Network Security & Maintenance
          </h3>
          <div className="space-y-3 mb-10">
            {securityQuestions.map((q) => (
              <QuestionCard key={q.number} {...q} />
            ))}
          </div>

          {/* Backup Questions */}
          <h3 className="text-lg font-semibold text-violet-400 mb-6 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Backups & Disaster Recovery
          </h3>
          <div className="space-y-3 mb-10">
            {backupQuestions.map((q) => (
              <QuestionCard key={q.number} {...q} />
            ))}
          </div>

          {/* Expertise Questions */}
          <h3 className="text-lg font-semibold text-violet-400 mb-6 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Technical Expertise & Compliance
          </h3>
          <div className="space-y-3 mb-16">
            {expertiseQuestions.map((q) => (
              <QuestionCard key={q.number} {...q} />
            ))}
          </div>

          {/* 4 Misconceptions */}
          <h2 className="text-2xl md:text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-purple-300 to-fuchsia-300 mb-10">
            The 4 Costliest Misconceptions About IT Services
          </h2>
          <div className="space-y-6 mb-16">
            {misconceptions.map((m) => (
              <MisconceptionCard key={m.number} {...m} />
            ))}
          </div>

          {/* 5 Critical Mistakes */}
          <h2 className="text-2xl md:text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-purple-300 to-fuchsia-300 mb-10">
            5 Critical Mistakes to Avoid When Choosing an IT Company
          </h2>
          <div className="space-y-6 mb-16">
            {mistakes.map((m, i) => (
              <div
                key={i}
                className="bg-white/[0.03] border border-white/10 border-t-4 border-t-violet-400 rounded-lg p-6"
                data-testid={`mistake-${i + 1}`}
              >
                <h3 className="text-lg font-semibold text-violet-300 mb-3">{m.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{m.content}</p>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="relative bg-gradient-to-br from-violet-900/30 to-purple-900/20 border-2 border-violet-400/50 rounded-lg p-10 text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-violet-300 mb-2">
              FREE Cybersecurity Risk Assessment
            </h2>
            <p className="text-violet-400 font-semibold mb-6">($1,997 Value)</p>
            <p className="text-white/70 mb-8 max-w-2xl mx-auto">
              As a prospective client, we'd like to offer you a complimentary Cybersecurity Risk Assessment. During this assessment, we'll perform a comprehensive audit of your IT environment to identify vulnerabilities, compliance gaps, and security risks that could lead to a costly breach.
            </p>

            <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <a
                href="tel:325-480-9870"
                className="bg-violet-400/10 border border-white/10 rounded-lg p-5 hover:bg-violet-400/20 transition-colors"
                data-testid="link-cta-call"
              >
                <Phone className="w-7 h-7 text-violet-400 mx-auto mb-3" />
                <div className="text-violet-300 font-semibold">325-480-9870</div>
              </a>
              <a
                href="mailto:admin@digerati-experts.com"
                className="bg-violet-400/10 border border-white/10 rounded-lg p-5 hover:bg-violet-400/20 transition-colors"
                data-testid="link-cta-email"
              >
                <Mail className="w-7 h-7 text-violet-400 mx-auto mb-3" />
                <div className="text-violet-300 font-semibold">admin@digerati-experts.com</div>
              </a>
              <a
                href="https://digeratiexperts.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-violet-400/10 border border-white/10 rounded-lg p-5 hover:bg-violet-400/20 transition-colors"
                data-testid="link-cta-website"
              >
                <Globe className="w-7 h-7 text-violet-400 mx-auto mb-3" />
                <div className="text-violet-300 font-semibold">digeratiexperts.com</div>
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
              Chandler, Arizona | Serving the Phoenix Metro Area
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
