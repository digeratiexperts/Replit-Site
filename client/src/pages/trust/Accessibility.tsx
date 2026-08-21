import { PageTemplate } from "@/components/PageTemplate";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, Mail, Phone, MapPin, CheckCircle, Monitor, Ear, Hand, Brain } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { PRIMARY_PHONE } from "@/data/companyContact";

export default function Accessibility() {
  const prefersReducedMotion = useReducedMotion() ?? false;

  const accessibilityFeatures = [
    "Keyboard navigation support",
    "Alternative text for images",
    "Semantic HTML structure",
    "Clear heading hierarchy",
    "Sufficient color contrast ratios",
    "Readable fonts and text sizes",
    "Skip navigation links",
    "ARIA labels and landmarks"
  ];

  const assistiveTech = [
    { icon: Monitor, name: "Screen readers (JAWS, NVDA, VoiceOver)" },
    { icon: Eye, name: "Screen magnification software" },
    { icon: Ear, name: "Speech recognition software" },
    { icon: Hand, name: "Keyboard-only navigation" }
  ];

  const supportedUsers = [
    { icon: Eye, text: "Blind or have low vision", color: " " },
    { icon: Ear, text: "Deaf or have hearing loss", color: " to-fuchsia-600" },
    { icon: Hand, text: "Living with mobility impairments", color: "from-fuchsia-500 to-pink-600" },
    { icon: Brain, text: "Living with cognitive disabilities", color: " " }
  ];

  return (
    <PageTemplate
      title="Accessibility Statement"
      subtitle="Our Commitment to Digital Accessibility"
      icon={<Eye className="w-10 h-10 text-white" />}
      gradientColors="from-slate-700 via-slate-800 to-slate-900"
      breadcrumbs={[{ label: "Trust", href: "/" }, { label: "Accessibility" }]}
    >
      <div className="space-y-16">
        {/* Our Commitment */}
        <motion.div 
          className="text-center max-w-3xl mx-auto"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-white">Our Commitment</h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            Digerati Experts is committed to ensuring digital accessibility for people with disabilities. 
            We are continually improving the user experience for everyone and applying the relevant 
            accessibility standards.
          </p>
        </motion.div>

        {/* Conformance Status */}
        <motion.div 
          className="bg-white/5 backdrop-blur-sm border-l-4 border-de-hairline border border-white/10 rounded-xl p-8"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-de-raised border border-de-hairline flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Conformance Status</h2>
          </div>
          <p className="text-gray-300 mb-4">
            We are working toward conformance with the <strong className="text-white">Web Content Accessibility Guidelines (WCAG) 2.1 
            Level AA</strong>. These guidelines explain how to make web content more accessible to people with disabilities.
          </p>
          <p className="text-gray-300 mb-4">
            Conformance with these guidelines helps us ensure our website is accessible to people who are:
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {supportedUsers.map((user, idx) => {
              const Icon = user.icon;
              return (
                <motion.div 
                  key={idx}
                  className="flex flex-col items-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 text-center"
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.3 }}
                >
                  <div className={`w-10 h-10 rounded-lg border border-de-hairline bg-de-bg flex items-center justify-center mb-2`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm text-gray-300">{user.text}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Accessibility Features */}
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
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">Accessibility Features</h2>
            </div>
            
            <p className="text-gray-300 mb-6">Our website includes the following accessibility features:</p>
            <div className="grid md:grid-cols-2 gap-4">
              {accessibilityFeatures.map((feature, idx) => (
                <motion.div 
                  key={idx}
                  className="flex items-center gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
                  initial={prefersReducedMotion ? {} : { opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05, duration: 0.3 }}
                >
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-300">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Assistive Technologies */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-white">Compatible Assistive Technologies</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {assistiveTech.map((tech, idx) => {
              const Icon = tech.icon;
              return (
                <Card key={idx} className="group bg-white/5 backdrop-blur-sm border border-white/10 hover:border-de-hairline hover:shadow-xl transition-all duration-300 text-center">
                  <CardContent className="pt-6">
                    <div className="w-14 h-14 rounded-xl bg-de-raised border border-de-hairline flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <p className="text-gray-300 text-sm">{tech.name}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </motion.div>

        {/* Known Limitations */}
        <motion.div 
          className="bg-white/5 backdrop-blur-sm border-l-4 border-amber-500 border border-white/10 rounded-xl p-8"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-white mb-4">Known Limitations</h2>
          <p className="text-gray-300 mb-4">
            Despite our best efforts, some content may not yet be fully accessible. We are actively 
            working to address these limitations:
          </p>
          <ul className="space-y-2">
            {[
              "Some third-party embedded content may not meet accessibility standards",
              "Older PDF documents may not be fully accessible (we're working to remediate these)",
              "Some complex interactive elements are being enhanced for better screen reader support"
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-gray-300">
                <span className="text-amber-500 mt-1">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Contact Info */}
        <motion.div 
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6">Feedback and Support</h2>
          <p className="text-gray-300 mb-6">
            We welcome your feedback on the accessibility of our website. If you encounter accessibility 
            barriers or have suggestions for improvement, please let us know:
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <Mail className="w-5 h-5 text-de-magenta-ink" />
              <span className="text-gray-300">accessibility@digeratiexperts.com</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <Phone className="w-5 h-5 text-de-magenta-ink" />
              <span className="text-gray-300">{PRIMARY_PHONE.display}</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <MapPin className="w-5 h-5 text-de-magenta-ink" />
              <span className="text-gray-300 text-sm">3165 S Alma School Rd Suite 29, Chandler, AZ 85248</span>
            </div>
          </div>
          <p className="text-gray-400 mt-6 text-sm">
            We aim to respond to accessibility feedback within 2 business days.
          </p>
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
                <pattern id="access-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#access-grid)" />
            </svg>
          </div>
          
          <div className="relative p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Report an Accessibility Issue</h2>
            <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Your feedback helps us improve. Please report any accessibility concerns.
            </p>
            <a 
              href="mailto:accessibility@digeratiexperts.com?subject=Accessibility Feedback"
              className="group inline-flex items-center justify-center bg-white text-de-magenta hover:bg-de-paper-raised px-8 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl hover:scale-105"
              data-testid="button-report-accessibility"
            >
              <Mail className="mr-2 h-5 w-5" />
              Report Accessibility Issue
            </a>
          </div>
        </motion.div>

        {/* Last Updated */}
        <div className="text-center pt-8 border-t border-white/10">
          <p className="text-gray-400 text-sm">
            This accessibility statement was last updated on November 6, 2025.
          </p>
        </div>
      </div>
    </PageTemplate>
  );
}
