import { PageTemplate } from "@/components/PageTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, FileCheck, CheckCircle, Phone, Heart, Activity, Stethoscope, AlertTriangle } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export default function Healthcare() {
  const prefersReducedMotion = useReducedMotion() ?? false;
  
  const metrics = [
    { label: "Focus", value: "HIPAA", icon: Shield, color: "from-[#D3126A] to-fuchsia-600" },
    { label: "Encryption", value: "AES-256", icon: Lock, color: "from-fuchsia-600 to-violet-600" },
    { label: "Priority", value: "PHI", icon: Activity, color: "from-violet-600 to-[#D3126A]" },
    { label: "Outcome", value: "Audit-ready", icon: Heart, color: "from-[#D3126A] to-rose-500" }
  ];

  const challenges = [
    { 
      icon: Shield, 
      title: "HIPAA Compliance", 
      description: "Maintain full HIPAA compliance with our comprehensive security solutions and documentation.",
      color: "text-violet-400"
    },
    { 
      icon: Lock, 
      title: "Patient Data Security", 
      description: "Protect sensitive patient data with enterprise-grade encryption and access controls.",
      color: "text-violet-400"
    },
    { 
      icon: FileCheck, 
      title: "Audit-Ready Documentation", 
      description: "Always audit-ready with comprehensive documentation and compliance reporting.",
      color: "text-violet-400"
    }
  ];

  const complianceFeatures = [
    "Business Associate Agreements (BAA)",
    "Encrypted Email Solutions",
    "Secure File Sharing",
    "Access Controls & Audit Logs",
    "Backup & Disaster Recovery",
    "Risk Assessment & Analysis",
    "Security Awareness Training",
    "Incident Response Planning",
    "Regular Security Updates",
    "Compliance Documentation"
  ];

  return (
    <PageTemplate
      title="IT Solutions for Healthcare"
      subtitle="HIPAA-compliant IT solutions designed to protect patient data and ensure regulatory compliance."
      gradientColors="from-violet-600 via-purple-600 to-fuchsia-600"
      icon={<Stethoscope className="w-10 h-10 text-white" />}
      breadcrumbs={[{ label: "Industries", href: "/" }, { label: "Healthcare" }]}
    >
      <div className="space-y-16">
        {/* Metrics Dashboard */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={idx}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="group relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${metric.color} rounded-xl blur opacity-0 group-hover:opacity-30 transition-all duration-300`} />
                <Card className="relative bg-white/5 backdrop-blur-sm border border-white/10 hover:border-violet-500/30 hover:shadow-lg transition-all">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${metric.color} flex items-center justify-center`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <Badge variant="outline" className="text-xs border-white/20 text-gray-300">Key Metric</Badge>
                    </div>
                    <p className="text-3xl font-bold text-white">{metric.value}</p>
                    <p className="text-sm text-gray-400 mt-1">{metric.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Risk Alert */}
        <motion.div 
          className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-8"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex gap-4">
            <AlertTriangle className="h-8 w-8 text-amber-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-2xl font-bold text-amber-300 mb-3">Healthcare Data at Risk</h3>
              <p className="text-amber-200/90 mb-4">
                Healthcare organizations are prime targets for cyberattacks. Patient data is 10x more valuable than credit card data on the dark web.
              </p>
              <div className="grid md:grid-cols-2 gap-2 text-amber-200/80">
                {[
                  "HIPAA violations average $1.5M+ in fines",
                  "Ransomware attacks on healthcare up 94%",
                  "Patient data breaches destroy trust",
                  "Compliance failures risk license suspension"
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-2">
                    <span className="text-amber-400 font-bold">●</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Key Challenges */}
        <div>
          <motion.h2 
            className="text-3xl font-bold mb-8 flex items-center gap-3 text-white"
            initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            Healthcare IT Challenges We Solve
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6">
            {challenges.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                >
                  <Card className="group h-full bg-white/5 backdrop-blur-sm border border-white/10 hover:border-violet-500/30 hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Icon className={`h-7 w-7 ${item.color}`} />
                      </div>
                      <CardTitle className="text-xl text-white">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-400 leading-relaxed">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* HIPAA Compliance Features */}
        <motion.div 
          className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12 overflow-hidden"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-violet-500/20 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-purple-500/20 to-transparent rounded-full blur-3xl" />
          
          <div className="relative">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 flex items-center justify-center">
                <FileCheck className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">HIPAA Compliance Features</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {complianceFeatures.map((item, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-violet-500/30 hover:shadow-md transition-all duration-300"
                  initial={prefersReducedMotion ? {} : { opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-gray-300 font-medium">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Arizona + process */}
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            className="p-6 rounded-2xl bg-white/[0.04] border border-white/10"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xs font-semibold tracking-wide uppercase text-[#FF477F] mb-3">Arizona practices</p>
            <p className="text-white/85 leading-relaxed">
              East Valley clinics, dental offices, and specialty practices need HIPAA-aware IT without a hospital-sized IT department.
              We operate from Chandler and design controls around how Arizona practices actually staff front desk, providers, and billing.
            </p>
          </motion.div>
          <motion.div
            className="p-6 rounded-2xl bg-[#D3126A]/10 border border-[#D3126A]/25"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xs font-semibold tracking-wide uppercase text-[#FF477F] mb-3">How we engage</p>
            <ol className="space-y-2 text-white/85 list-decimal list-inside">
              <li>Risk &amp; HIPAA technical gap review (access, email, endpoints, backup)</li>
              <li>BAA-ready controls and evidence collection paths</li>
              <li>Ongoing monitoring, training, and incident documentation</li>
              <li>Audit/insurance packet support when questionnaires arrive</li>
            </ol>
          </motion.div>
        </div>

        <div className="space-y-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-white">Questions practice owners ask</h2>
          {[
            {
              q: "Do you make us ‘HIPAA certified’?",
              a: "No vendor certifies you HIPAA. We implement technical and administrative safeguards, support BAAs where appropriate, and keep evidence so you can demonstrate compliance.",
            },
            {
              q: "We already have an EHR vendor — do we still need this?",
              a: "EHR security is one slice. Email, endpoints, identity, backups, and staff behavior are usually where practices get exposed.",
            },
            {
              q: "What does the free assessment cover?",
              a: "Current access controls, MFA posture, email risk, backup restore readiness, and the documentation gaps insurers and auditors typically ask about.",
            },
          ].map((faq) => (
            <div key={faq.q} className="p-5 rounded-xl bg-white/[0.04] border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-2">{faq.q}</h3>
              <p className="text-white/70 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <motion.div 
          className="relative rounded-2xl overflow-hidden"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#D3126A] via-fuchsia-600 to-rose-500" />
          <div className="relative p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Protect patient data with a clear plan</h2>
            <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Schedule a free HIPAA-focused cyber risk assessment for your Arizona practice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/book"
                className="group inline-flex items-center justify-center bg-white text-[#D3126A] hover:bg-pink-50 px-8 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl hover:scale-105"
                data-testid="button-get-assessment"
              >
                Schedule Assessment
              </a>
              <a 
                href="tel:325-480-9870"
                className="inline-flex items-center justify-center border-2 border-white bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-[#D3126A] px-8 py-4 rounded-xl font-semibold transition-all"
                data-testid="button-call-now"
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
