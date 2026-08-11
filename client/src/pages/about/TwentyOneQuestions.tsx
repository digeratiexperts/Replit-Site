import { Phone, Mail, MapPin, Check } from "lucide-react";
import { MegaMenu } from "@/components/MegaMenu";
import { DigeratiEnhancedFooterSection } from "../sections/DigeratiEnhancedFooterSection";

const questions = [
  "Do they answer calls live and provide multiple ways to reach support with clear escalation?",
  "Do they publish written response targets and resolution priorities for critical vs routine issues?",
  "Do they communicate in plain English and tie tech to business outcomes?",
  "Do they run regular Cyber Risk Assessments with a prioritized roadmap?",
  "Do they provide vCIO-style reviews with recurring reports and Technology Business Reviews?",
  "Do they deliver transparent invoices and clearly define what is included vs out-of-scope?",
  "Do they carry insurance that protects YOU (E&O, liability, workers comp) with proof?",
  "Do they guarantee projects with clear scope, timeline, exclusions, and risks in a formal SOW?",
  "Do they provide true 24/7 monitoring of endpoints, servers, and network?",
  "Do they offer a modern managed security stack (EDR + SOC + email security + user training)?",
  "Do they deliver complete, updated IT documentation (assets, network, IAM, vendor records)?",
  "Do they have depth across disciplines so you're not dependent on one person?",
  "Do they manage Identity & Access (MFA, SSO, provisioning) as a core service?",
  "Do they enforce Zero Trust basics (device health, least privilege, conditional access)?",
  "Do they protect users where work happens: browser security, phishing resistance, data-loss controls?",
  "Do they monitor BOTH local and cloud backups and perform scheduled test restores?",
  "Do they maintain an incident response and disaster recovery playbook tailored to you?",
  "Is their help desk local/US-based — and will you know who's working your tickets?",
  "Do they manage your modern workplace (MDM, SaaS, Microsoft/Google, Teams) cohesively?",
  "Do they understand SMB compliance and offer defined modules (HIPAA, FTC, GDPR, cyber insurance)?",
  "Are they experienced with your line-of-business apps and own vendor coordination end-to-end?"
];

export default function TwentyOneQuestions() {
  return (
    <div className="min-h-screen bg-[#050312]">
      <MegaMenu />

      <section className="de-nav-clear pb-16 px-6 de-prose-dark">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 pb-8 border-b-4 border-pink-400">
            <p className="text-pink-300 font-semibold text-sm uppercase tracking-wider mb-4">
              Elite IT & Cybersecurity for Phoenix Businesses
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight" data-testid="heading-21-questions">
              21 Questions You MUST Ask Before<br className="hidden md:block" />
              Hiring An IT Support Company
            </h1>
            <p className="text-white/85 text-lg max-w-3xl mx-auto leading-relaxed">
              A modern MSP is identity-first, security-led, and business-aligned. 
              Use this chart to compare the real difference.
            </p>
          </div>

          <div className="overflow-x-auto -mx-6 px-6 mb-12">
            <table className="w-full min-w-[800px] border-collapse" data-testid="comparison-table">
              <thead>
                <tr>
                  <th className="bg-[#1a1a2e] text-white text-left p-4 font-bold text-sm border border-white/10 w-[45%]">
                    Critical Question
                  </th>
                  <th className="bg-[#1a1a2e] text-white text-center p-4 font-bold text-sm border border-white/10 w-[13.75%]">
                    Company A<br /><span className="text-white/40">_______</span>
                  </th>
                  <th className="bg-[#1a1a2e] text-white text-center p-4 font-bold text-sm border border-white/10 w-[13.75%]">
                    Company B<br /><span className="text-white/40">_______</span>
                  </th>
                  <th className="bg-[#1a1a2e] text-white text-center p-4 font-bold text-sm border border-white/10 w-[13.75%]">
                    Company C<br /><span className="text-white/40">_______</span>
                  </th>
                  <th className="bg-gradient-to-br from-violet-500/30 to-violet-600/20 text-white text-center p-4 font-bold text-sm border border-violet-400/30 w-[13.75%]">
                    DIGERATI<br />EXPERTS
                  </th>
                </tr>
              </thead>
              <tbody>
                {questions.map((question, index) => (
                  <tr key={index} className={index % 2 === 0 ? "" : "bg-white/[0.02]"}>
                    <td className="bg-[#1e1e2e] text-white font-medium p-4 text-sm border border-white/10 leading-relaxed" data-testid={`question-${index}`}>
                      {question}
                    </td>
                    <td className="bg-[#2a2a3e] text-center p-4 border border-white/10"></td>
                    <td className="bg-[#2a2a3e] text-center p-4 border border-white/10"></td>
                    <td className="bg-[#2a2a3e] text-center p-4 border border-white/10"></td>
                    <td className="bg-gradient-to-br from-violet-500/25 to-violet-600/15 text-center p-4 border border-violet-400/20">
                      {index === 17 ? (
                        <span className="text-violet-300 font-bold text-xs leading-tight block" data-testid="special-note">
                          Phoenix-based<br />& US Only!
                        </span>
                      ) : (
                        <Check className="w-7 h-7 text-violet-400 mx-auto" strokeWidth={3} data-testid={`check-${index}`} />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-gradient-to-br from-[#1a1a2e] to-[#2a2a3e] border-4 border-violet-400 rounded-xl p-8 md:p-12 text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6" data-testid="heading-cta">
              Ready to experience the Digerati Experts difference?
            </h2>
            <a 
              href="tel:+14805195892" 
              className="text-3xl md:text-4xl font-bold text-violet-400 hover:text-violet-300 transition-colors block mb-6"
              data-testid="link-phone"
            >
              <Phone className="w-8 h-8 inline-block mr-3 -mt-1" />
              480-519-5892
            </a>
            <p className="text-white/80 text-lg font-medium leading-relaxed">
              Call now for your FREE 30-Day Risk-Free Pilot<br />
              <span className="text-white/60">Serving Phoenix, Scottsdale, Tempe, Chandler, Mesa & Surrounding Areas</span>
            </p>
            <div className="mt-8">
              <a
                href="/book"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-violet-500 hover:bg-violet-400 text-white font-semibold px-8 py-4 rounded-lg transition-colors"
                data-testid="button-schedule"
              >
                Schedule Cyber Risk Assessment
              </a>
            </div>
          </div>

          <div className="text-center py-8 border-t border-white/10">
            <p className="text-white font-semibold mb-2">
              DIGERATI EXPERTS | 480-519-5892 | info@digeratiexperts.com
            </p>
            <p className="text-white/50 text-sm flex items-center justify-center gap-2">
              <MapPin className="w-4 h-4" />
              Serving Phoenix Metro Area | Chandler, Arizona | www.digeratiexperts.com
            </p>
          </div>
        </div>
      </section>

      <DigeratiEnhancedFooterSection />
    </div>
  );
}
