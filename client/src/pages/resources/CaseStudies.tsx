import { PageTemplate } from "@/components/PageTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, TrendingUp, Shield, FileText, CheckCircle, Target, Zap, Info } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export default function CaseStudies() {
  const prefersReducedMotion = useReducedMotion() ?? false;
  
  const caseStudies = [
    {
      industry: "Healthcare",
      title: "Arizona Healthcare Practice Achieves HIPAA Compliance",
      challenge: "A mid-size medical practice in Arizona faced a failed annual security audit. Patient records were stored on an aging on-premises server with no encryption, staff used personal email for appointment reminders, and there was no documented incident response plan. They faced potential fines and risked losing their ability to accept insurance.",
      solution: "Deployed our ProActive Business tier with HIPAA-specific controls: encrypted Microsoft 365 email with DLP policies, secure SharePoint document management with role-based access, endpoint detection on all workstations, encrypted backup with 15-minute RPO, and a full HIPAA Security Risk Assessment. We provided staff training and created their required policies and procedures documentation.",
      results: [
        "Passed HIPAA audit with zero findings within 90 days",
        "Material reduction in security incidents in the first year",
        "Avoided potential HIPAA fines and penalties",
        "Decreased IT-related downtime from hours per month to minutes",
        "Staff phishing test failure rate dropped sharply after training"
      ],
      icon: Shield,
      gradient: "from-green-500 to-emerald-600",
      bgGradient: "from-green-500/20 to-emerald-500/20"
    },
    {
      industry: "Law Firm",
      title: "Arizona Law Firm Eliminates Downtime After Ransomware",
      challenge: "A multi-attorney firm in Arizona was hit by ransomware that encrypted their entire file server, including years of case files. Their previous IT provider had no backup verification process, and the last good backup was weeks old. The firm lost billable hours during recovery and faced malpractice exposure from missed court deadlines.",
      solution: "After emergency incident response and data recovery, we implemented our ProActive Enterprise package: 24/7 SOC monitoring, advanced EDR with automated threat containment, immutable cloud backups with 15-minute RPOs, network segmentation isolating their document management system, and privileged access management for all administrative accounts. We also deployed DNS-layer security and a security awareness training program.",
      results: [
        "Sustained unplanned-downtime reduction post-deployment",
        "Built-in ransomware recovery capability: full restore in hours",
        "Increased firm productivity through proactive IT management",
        "Reduced lost billable hours from IT disruptions",
        "Aligned with ABA cybersecurity ethics opinions"
      ],
      icon: TrendingUp,
      gradient: "from-blue-500 to-indigo-600",
      bgGradient: "from-blue-500/20 to-indigo-500/20"
    },
    {
      industry: "Accounting",
      title: "Arizona CPA Firm Strengthens Cyber Insurance Posture",
      challenge: "A small CPA firm in Arizona received a cyber insurance renewal with a steep premium increase. The insurer required MFA on all accounts, EDR on every endpoint, a documented incident response plan, and proof of employee security training. Their break-fix IT provider could not meet these requirements, and the firm risked losing coverage entirely during tax season.",
      solution: "Deployed our ProActive Office tier with insurance compliance focus: MFA across all Microsoft 365 and accounting applications, managed EDR with 24/7 monitoring, documented incident response and business continuity plans, quarterly security awareness training with phishing simulations, and encrypted backup of their tax preparation environment. We provided the insurer with a detailed controls attestation letter.",
      results: [
        "Renewed cyber insurance after meeting insurer control requirements",
        "Met insurer security requirements within weeks",
        "Clean security posture across consecutive tax seasons",
        "Faster IT support response versus prior break-fix model",
        "Reduced shadow IT risk with managed application control"
      ],
      icon: FileText,
      gradient: "from-purple-500 to-indigo-600",
      bgGradient: "from-purple-500/20 to-indigo-500/20"
    },
    {
      industry: "Manufacturing",
      title: "Arizona Manufacturer Secures OT Network and Production Floor",
      challenge: "A precision machining company in Arizona had their CNC machines, ERP system, and office network all on a single flat network. A malware infection on an office workstation spread to their production floor, shutting down CNC machines and costing significant lost production. Their IT was managed part-time without OT segmentation expertise.",
      solution: "Implemented a co-managed IT approach with proper network architecture: segmented the network into production, office, and guest VLANs with next-gen firewall policies between them. Deployed managed switches, enterprise Wi-Fi, endpoint protection on all office machines, and an industrial-grade backup solution for their ERP database. Set up real-time monitoring with alerts for any cross-segment traffic anomalies.",
      results: [
        "Eliminated production floor exposure to office-originated threats",
        "Reduced network-related production stoppages over the following year",
        "ERP system uptime improved through segmented architecture",
        "IT support costs decreased through proactive management",
        "Better prepared for customer security questionnaires"
      ],
      icon: Zap,
      gradient: "from-orange-500 to-red-600",
      bgGradient: "from-orange-500/20 to-red-500/20"
    },
    {
      industry: "Real Estate",
      title: "Arizona Brokerage Stops Wire Fraud and Secures Transactions",
      challenge: "A multi-agent real estate brokerage in Arizona had clients fall victim to business email compromise (BEC) wire fraud involving earnest money. The firm's email was hosted on an unmanaged server with no MFA, no email authentication (SPF/DKIM/DMARC), and agents were using personal devices without any security controls.",
      solution: "Migrated to Microsoft 365 with advanced threat protection: configured DMARC/DKIM/SPF to prevent email spoofing, deployed conditional access policies, MFA for all users, and managed mobile device enrollment for agents. Implemented a wire fraud prevention protocol with out-of-band verification procedures and trained all agents on BEC recognition.",
      results: [
        "No wire fraud incidents since controls were deployed",
        "Phishing attempts blocked with advanced email filtering",
        "Strong agent adoption of MFA and managed mobile enrollment",
        "E&O insurer recognized documented security controls",
        "Improved client trust around transaction security"
      ],
      icon: Shield,
      gradient: "from-teal-500 to-cyan-600",
      bgGradient: "from-teal-500/20 to-cyan-500/20"
    }
  ];

  const focusAreas = [
    { value: "Healthcare", label: "HIPAA & patient data" },
    { value: "Legal", label: "Ransomware recovery" },
    { value: "Accounting", label: "Insurance controls" },
    { value: "Industry", label: "OT & wire fraud" }
  ];

  return (
    <PageTemplate
      title="Case Studies"
      subtitle="Composite Arizona SMB scenarios that illustrate how Digerati Experts approaches common IT and security challenges."
      icon={<Target className="w-10 h-10 text-white" />}
      breadcrumbs={[{ label: "Resources", href: "/" }, { label: "Case Studies" }]}
    >
      <div className="space-y-16">
        {/* Honesty banner */}
        <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-5 md:p-6 flex gap-4">
          <Info className="h-6 w-6 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-amber-100">Illustrative scenarios — not named client endorsements</p>
            <p className="text-sm text-amber-100/80 leading-relaxed">
              These are composite/illustrative Arizona SMB scenarios based on patterns we see across healthcare, legal, accounting, manufacturing, and real estate. They are pending client permission for published case studies and should not be read as named client endorsements or audited outcome guarantees.
            </p>
          </div>
        </div>

        {/* Focus areas (elevated from prior stats strip — no invented aggregate metrics) */}
        <motion.div 
          className="grid md:grid-cols-4 gap-6 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 rounded-2xl p-8 text-white"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {focusAreas.map((item, idx) => (
            <div key={idx} className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
              <p className="text-xl font-bold mb-1">{item.value}</p>
              <p className="text-purple-100 text-sm">{item.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Case Studies */}
        <div className="space-y-8">
          {caseStudies.map((study, index) => {
            const Icon = study.icon;
            return (
              <motion.div
                key={index}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#5034ff]/50 hover:shadow-xl transition-all duration-300">
                  <CardHeader className={`bg-gradient-to-r ${study.bgGradient} border-b border-white/10`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${study.gradient} flex items-center justify-center flex-shrink-0`}>
                          <Icon className="h-7 w-7 text-white" />
                        </div>
                        <div>
                          <Badge className={`mb-2 bg-gradient-to-r ${study.gradient} text-white border-0`}>
                            {study.industry}
                          </Badge>
                          <CardTitle className="text-2xl text-white">{study.title}</CardTitle>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-3 gap-8">
                      {/* Challenge */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center">
                            <Zap className="w-4 h-4 text-red-400" />
                          </div>
                          <h4 className="font-semibold text-lg text-white">The Challenge</h4>
                        </div>
                        <p className="text-gray-400 leading-relaxed">{study.challenge}</p>
                      </div>
                      
                      {/* Solution */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                            <Target className="w-4 h-4 text-blue-400" />
                          </div>
                          <h4 className="font-semibold text-lg text-white">Our Solution</h4>
                        </div>
                        <p className="text-gray-400 leading-relaxed">{study.solution}</p>
                      </div>
                      
                      {/* Results */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          </div>
                          <h4 className="font-semibold text-lg text-white">Illustrative Outcomes</h4>
                        </div>
                        <ul className="space-y-2">
                          {study.results.map((result, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                              <span className="text-gray-300 text-sm">{result}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div 
          className="relative rounded-2xl overflow-hidden"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600" />
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="case-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#case-grid)" />
            </svg>
          </div>
          
          <div className="relative p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to Write Your Success Story?</h2>
            <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Let's discuss how we can help your business with similar challenges.
            </p>
            <a 
              href="/book" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center justify-center bg-white text-purple-700 hover:bg-purple-50 px-8 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl hover:scale-105" 
              data-testid="button-contact-us"
            >
              Contact Us
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </motion.div>
      </div>
    </PageTemplate>
  );
}
