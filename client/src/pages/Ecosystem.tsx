import { Shield, Users, Server, Building2, HeadphonesIcon, FileCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function Ecosystem() {
  const servicePillars = [
    { 
      name: "DE WORKPLACE", 
      color: "from-purple-600 to-indigo-600", 
      icon: Users,
      desc: "SMART HR · SMART Identity · SMART Communications · Team Collaboration",
      details: ["Email + Calendar + Chat", "MFA + SSO + Password Manager", "UCaaS + Video Conferencing", "File Storage + Wiki + Projects"]
    },
    { 
      name: "DE SECURITY", 
      color: "from-cyan-600 to-blue-600", 
      icon: Shield,
      desc: "Email Protection · EDR · SOC/MDR · Security Awareness · DLP",
      details: ["24/7 Threat Monitoring", "Endpoint Detection & Response", "Phishing Protection", "Security Logging & Reporting"]
    },
    { 
      name: "DE INFRASTRUCTURE", 
      color: "from-emerald-600 to-teal-600", 
      icon: Server,
      desc: "Managed Network · Firewall · Remote Access · Site Connectivity",
      details: ["Firewall + Switching + Wi-Fi", "ISP Coordination + Failover", "SASE / ZTNA Architecture", "Network Segmentation"]
    },
    { 
      name: "DE SUPPORT", 
      color: "from-amber-600 to-orange-600", 
      icon: HeadphonesIcon,
      desc: "Service Desk · Vendor Management · Change Requests · Config Mgmt",
      details: ["User Support for DE Systems", "Vendor Escalations", "Standards-Based Configuration", "Access Changes"]
    },
    { 
      name: "DE BACKUP & RECOVERY", 
      color: "from-rose-600 to-pink-600", 
      icon: Building2,
      desc: "Backup Strategy · Restore Testing · DR Runbooks · Off-site Backup",
      details: ["Endpoints + SaaS Backup", "Verified Restore Testing", "Cold / Warm / Hot Site Planning", "Business Continuity"]
    },
    { 
      name: "DE COMPLIANCE", 
      color: "from-violet-600 to-purple-600", 
      icon: FileCheck,
      desc: "HIPAA · GDPR · FTC Safeguards · Cyber Insurance · Policy Enforcement",
      details: ["Compliance Modules", "Evidence Support", "Audit-Ready Documentation", "Framework Mapping"]
    },
  ];

  const tiers = [
    { 
      name: "Office", 
      color: "from-blue-600 to-cyan-600", 
      price: "$165",
      desc: "Core security-first IT for small teams",
      highlights: ["Email + MFA + SSO", "EDR + Email Protection", "Managed Network", "Service Desk + Backup"]
    },
    { 
      name: "Business", 
      color: "from-purple-600 to-violet-600", 
      price: "$245",
      desc: "SOC/MDR + SMART HR + vCIO advisory",
      highlights: ["Everything in Office", "SOC / MDR Monitoring", "SMART HR Workflows", "Security Awareness + vCIO"]
    },
    { 
      name: "Enterprise", 
      color: "from-cyan-500 to-teal-500", 
      price: "$345",
      desc: "Full compliance + advanced controls",
      highlights: ["Everything in Business", "HIPAA/GDPR Modules", "Pen Testing + DR Runbooks", "AI & Cloud Automation"]
    },
  ];

  return (
    <section className="min-h-screen pt-28 pb-16 px-6 bg-gradient-to-br from-[#07041a] via-[#0f0b2c] to-[#1a1143] text-white">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
            ProActive Ecosystem
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Security-first IT built around how your business actually works. Controls, evidence, and operational ownership—not just break-fix.
          </p>
        </motion.div>

        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-center mb-8 text-white">Service Pillars</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicePillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.name}
                  className="rounded-2xl p-6 bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 hover:bg-white/[0.08] transition-all duration-300"
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${pillar.color} mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{pillar.name}</h3>
                  <p className="text-sm text-gray-400 mb-4">{pillar.desc}</p>
                  <ul className="space-y-1">
                    {pillar.details.map((detail, idx) => (
                      <li key={idx} className="text-xs text-gray-500 flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-cyan-400" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-center mb-8 text-white">Package Tiers</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {tiers.map((tier, index) => (
              <div
                key={tier.name}
                className={`rounded-2xl p-8 bg-white/5 backdrop-blur-xl border transition-all duration-300 flex flex-col ${
                  index === 1 
                    ? 'border-purple-500/50 ring-2 ring-purple-500/30 shadow-[0_30px_70px_-30px_rgba(139,92,246,0.4)]' 
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                {index === 1 && (
                  <div className="text-center mb-4">
                    <span className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className={`inline-block px-4 py-1.5 rounded-lg bg-gradient-to-r ${tier.color} text-white text-sm font-bold mb-4 w-fit`}>
                  {tier.name}
                </div>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">{tier.price}</span>
                  <span className="text-gray-400 text-sm">/user avg</span>
                </div>
                <p className="text-gray-300 text-sm mb-6">{tier.desc}</p>
                <ul className="space-y-2 flex-grow">
                  {tier.highlights.map((highlight, idx) => (
                    <li key={idx} className="text-sm text-gray-400 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                      {highlight}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://meet.digerati-experts.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full mt-6 py-3 rounded-lg text-center font-semibold transition-all ${
                    index === 1
                      ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white hover:from-purple-500 hover:to-cyan-400'
                      : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                  }`}
                >
                  Book a Strategy Call
                </a>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.p 
          className="text-center text-sm text-gray-500 mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Minimums: Office $750/site/mo; Business/Enterprise $1,200/site/mo. Final pricing tailored to your environment.
        </motion.p>
      </div>
    </section>
  );
}
