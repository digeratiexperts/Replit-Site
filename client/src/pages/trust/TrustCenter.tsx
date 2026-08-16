import { PageTemplate } from "@/components/PageTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, FileCheck, Award, Eye, Server, CheckCircle, Mail, Phone } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export default function TrustCenter() {
  const prefersReducedMotion = useReducedMotion() ?? false;
  
  const complianceSupport = [
    { icon: FileCheck, title: "HIPAA-aligned security and compliance support", desc: "Business Associate Agreements available for healthcare clients. Framework alignment — not a HIPAA certification.", gradient: " to-fuchsia-600" },
    { icon: Award, title: "SOC 2 readiness and control alignment", desc: "Control mapping, evidence support, and readiness work for customer SOC 2 programs. Digerati is not SOC 2 Type II certified.", gradient: " " },
    { icon: Lock, title: "Cyber insurance readiness", desc: "Controls and documentation insurers commonly request during underwriting and renewals.", gradient: "from-fuchsia-500 to-pink-600" },
    { icon: Shield, title: "Security and compliance reporting", desc: "Questionnaires, control evidence, and reporting support for vendor reviews and audits.", gradient: " " },
  ];

  const technicalControls = [
    "AES-256 encryption at rest",
    "TLS 1.3 encryption in transit",
    "Multi-factor authentication (MFA)",
    "24/7 Security Operations Center",
    "Intrusion detection/prevention",
    "Regular vulnerability scanning"
  ];

  const adminControls = [
    "Background checks for all staff",
    "Security awareness training",
    "Incident response procedures",
    "Annual penetration testing",
    "Third-party security audits",
    "NIST Cybersecurity Framework alignment"
  ];

  return (
    <PageTemplate
      title="Trust Center"
      subtitle="Security, Compliance, and Privacy Information"
      icon={<Shield className="w-10 h-10 text-white" />}
      gradientColors="from-slate-700 via-slate-800 to-slate-900"
      breadcrumbs={[{ label: "Trust", href: "/" }, { label: "Trust Center" }]}
    >
      <div className="space-y-16">
        {/* Intro */}
        <motion.p 
          className="text-xl text-gray-300 text-center max-w-3xl mx-auto leading-relaxed"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Digerati Experts is committed to maintaining high standards of security, compliance, 
          and privacy. Our Trust Center provides transparency into our security practices and the frameworks we help customers address.
        </motion.p>

        {/* Security & Compliance Support — capability language, not company certifications */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-2 text-center">Security & Compliance Support</h2>
          <p className="text-gray-400 text-center max-w-2xl mx-auto mb-8">
            These names describe frameworks and customer requirements Digerati helps organizations address. They are not certifications Digerati holds.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {complianceSupport.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                >
                  <Card className="group h-full bg-white/5 backdrop-blur-sm border border-white/10 hover:border-de-hairline hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <div className={`absolute top-0 right-0 w-24 h-24 bg-de-magenta opacity-[0.06] rounded-bl-full`} />
                    <CardHeader>
                      <div className={`w-14 h-14 rounded-xl border border-de-hairline bg-de-bg flex items-center justify-center mb-4`}>
                        <Icon className="h-7 w-7 text-de-magenta" />
                      </div>
                      <CardTitle className="text-xl text-white">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Honest empty hook — only populate when a current report/attestation exists */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 md:p-10">
          <h2 className="text-2xl font-bold text-white mb-3">Verified Certifications & Attestations</h2>
          <p className="text-gray-400 leading-relaxed max-w-3xl">
            No independent SOC 2 Type II report or HIPAA certification is published here. When a current, documented attestation is available, it will be listed in this section.
          </p>
        </div>

        {/* Security Practices */}
        <motion.div 
          className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12 overflow-hidden"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-de-raised to-transparent rounded-full blur-3xl" />
          
          <div className="relative">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-lg bg-de-raised border border-de-hairline flex items-center justify-center">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">Our Security Practices</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-de-magenta-ink" />
                  Technical Controls
                </h3>
                <div className="space-y-3">
                  {technicalControls.map((control, idx) => (
                    <motion.div 
                      key={idx}
                      className="flex items-center gap-3 p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10"
                      initial={prefersReducedMotion ? {} : { opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05, duration: 0.3 }}
                    >
                      <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      <span className="text-gray-300">{control}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-de-magenta-ink" />
                  Administrative Controls
                </h3>
                <div className="space-y-3">
                  {adminControls.map((control, idx) => (
                    <motion.div 
                      key={idx}
                      className="flex items-center gap-3 p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10"
                      initial={prefersReducedMotion ? {} : { opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05, duration: 0.3 }}
                    >
                      <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      <span className="text-gray-300">{control}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Infrastructure Security */}
        <motion.div 
          className="bg-white/5 backdrop-blur-sm border-l-4 border-de-hairline border border-white/10 rounded-xl p-8"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-de-raised border border-de-hairline flex items-center justify-center">
              <Server className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Infrastructure Security</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { label: "Data Centers", value: "Tier III/IV facilities with physical security, redundant power, climate control" },
              { label: "Network Security", value: "Next-generation firewalls, DDoS protection, network segmentation" },
              { label: "Access Controls", value: "Role-based access control (RBAC), principle of least privilege" },
              { label: "Monitoring", value: "Real-time security information and event management (SIEM)" },
              { label: "Backups", value: "Encrypted, geographically distributed, tested regularly" }
            ].map((item, idx) => (
              <div key={idx} className="p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                <span className="font-semibold text-white">{item.label}:</span>{" "}
                <span className="text-gray-300">{item.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Privacy & Data Protection */}
        <motion.div 
          className="bg-white/5 backdrop-blur-sm border-l-4 border-de-hairline border border-white/10 rounded-xl p-8"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-de-raised border border-de-hairline flex items-center justify-center">
              <Eye className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Privacy & Data Protection</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { label: "Privacy Policy", value: "Comprehensive privacy practices aligned with Arizona data breach laws" },
              { label: "Data Minimization", value: "We collect only data necessary for service delivery" },
              { label: "Data Retention", value: "Clear retention schedules and secure deletion procedures" },
              { label: "Client Rights", value: "Access, correction, deletion, and portability rights" },
              { label: "No Data Selling", value: "We never sell client data to third parties" }
            ].map((item, idx) => (
              <div key={idx} className="p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                <span className="font-semibold text-white">{item.label}:</span>{" "}
                <span className="text-gray-300">{item.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div 
          className="relative rounded-2xl overflow-hidden"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-de-surface" />
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="trust-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#trust-grid)" />
            </svg>
          </div>
          
          <div className="relative p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Need Security Documentation?</h2>
            <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Request security questionnaires or framework-alignment documentation for vendor onboarding.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:security@digeratiexperts.com?subject=Security Documentation Request"
                className="group inline-flex items-center justify-center bg-white text-de-magenta hover:bg-de-paper-raised px-8 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl hover:scale-105"
                data-testid="button-request-docs"
              >
                <Mail className="mr-2 h-5 w-5" />
                Request Documentation
              </a>
              <a 
                href="tel:+13254809870"
                className="inline-flex items-center justify-center border-2 border-white bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-de-magenta px-8 py-4 rounded-xl font-semibold transition-all"
                data-testid="button-call-trust"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call 325-480-9870
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </PageTemplate>
  );
}
