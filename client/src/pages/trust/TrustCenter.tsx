import { PageTemplate } from "@/components/PageTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, FileCheck, Award, Eye, Server, CheckCircle, Mail, Phone } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export default function TrustCenter() {
  const prefersReducedMotion = useReducedMotion() ?? false;
  
  const certifications = [
    { icon: Award, title: "SOC 2 Type II", desc: "Independently audited security controls for Service Organization Control", status: "Certified", gradient: "from-violet-500 to-purple-600" },
    { icon: FileCheck, title: "HIPAA Compliant", desc: "Business Associate Agreements available for healthcare clients", status: "Compliant", gradient: "from-purple-500 to-fuchsia-600" },
    { icon: Lock, title: "PCI DSS", desc: "Payment Card Industry Data Security Standard compliance", status: "Compliant", gradient: "from-fuchsia-500 to-pink-600" }
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
          Digerati Experts is committed to maintaining the highest standards of security, compliance, 
          and privacy. Our Trust Center provides transparency into our security practices and certifications.
        </motion.p>

        {/* Security Certifications */}
        <div className="grid md:grid-cols-3 gap-6">
          {certifications.map((cert, idx) => {
            const Icon = cert.icon;
            return (
              <motion.div
                key={idx}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
              >
                <Card className="group h-full bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${cert.gradient} opacity-10 rounded-bl-full`} />
                  <CardHeader>
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${cert.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <CardTitle className="text-xl text-white">{cert.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 mb-4 leading-relaxed">{cert.desc}</p>
                    <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {cert.status}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Security Practices */}
        <motion.div 
          className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12 overflow-hidden"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-purple-500/20 to-transparent rounded-full blur-3xl" />
          
          <div className="relative">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">Our Security Practices</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-violet-400" />
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
                  <FileCheck className="w-5 h-5 text-violet-400" />
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
          className="bg-white/5 backdrop-blur-sm border-l-4 border-violet-500 border border-white/10 rounded-xl p-8"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center">
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
          className="bg-white/5 backdrop-blur-sm border-l-4 border-purple-500 border border-white/10 rounded-xl p-8"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center">
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
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600" />
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
              Request our SOC 2 report, security questionnaires, or compliance documentation for vendor onboarding.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:security@digeratiexperts.com?subject=Security Documentation Request"
                className="group inline-flex items-center justify-center bg-white text-purple-700 hover:bg-purple-50 px-8 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl hover:scale-105"
                data-testid="button-request-docs"
              >
                <Mail className="mr-2 h-5 w-5" />
                Request Documentation
              </a>
              <a 
                href="tel:325-480-9870"
                className="inline-flex items-center justify-center border-2 border-white bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-purple-700 px-8 py-4 rounded-xl font-semibold transition-all"
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
