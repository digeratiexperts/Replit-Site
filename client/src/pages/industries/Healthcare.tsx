import { PageTemplate } from "@/components/PageTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Shield,
  Lock,
  FileCheck,
  CheckCircle,
  Phone,
  Heart,
  Activity,
  Stethoscope,
  AlertTriangle,
  ArrowRight,
  Users,
  ClipboardList,
  Ban,
  UserX,
  HardDrive,
  HelpCircle,
  Layers,
  MapPin,
  ListChecks,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useSEO } from "@/hooks/useSEO";
import { pageNarratives } from "@/pages/routes/pageNarratives";
import { CTA } from "@/lib/ctaCopy";

const narrative = pageNarratives.healthcare;

export default function Healthcare() {
  const prefersReducedMotion = useReducedMotion() ?? false;

  useSEO({
    title: "Healthcare IT & HIPAA Security | Arizona Practices",
    description:
      "Keep patient data protected without becoming a HIPAA expert. Arizona-based IT, cybersecurity, and compliance support for medical and dental practices — start with a free risk assessment.",
    canonical: "/industries/healthcare",
  });

  const trustStrip = [
    { label: "Arizona-based", icon: MapPin },
    { label: "HIPAA-focused security", icon: Shield },
    { label: "Real human support", icon: Users },
    { label: "Assessment-led recommendations", icon: ClipboardList },
  ];

  const painQuestions = [
    { icon: Ban, text: "Could ransomware lock scheduling, imaging, or billing mid-day?" },
    { icon: Lock, text: "Who can actually reach PHI across EHR, email, and shared drives?" },
    { icon: UserX, text: "Are former employees and vendors fully removed from every system?" },
    { icon: HardDrive, text: "Have backups been restore-tested — or only assumed to work?" },
    { icon: FileCheck, text: "Can you answer cyber-insurance questionnaires with evidence?" },
    { icon: HelpCircle, text: "Is your current IT doing security — or only tickets and resets?" },
  ];

  const commonProblems = [
    {
      icon: Shield,
      title: "HIPAA as a binder, not an operating model",
      description:
        "Policies exist, but access reviews, offboarding, and technical safeguards are inconsistent day to day.",
    },
    {
      icon: Lock,
      title: "Patient data scattered across tools",
      description:
        "PHI and clinical workflows span EHR, email, imaging, billing, and personal devices with uneven controls.",
    },
    {
      icon: FileCheck,
      title: "Audit and insurance evidence gaps",
      description:
        "When questionnaires or auditors ask for proof, the practice scrambles instead of pulling a known packet.",
    },
  ];

  const consequences = [
    "Canceled or delayed appointments when systems are unavailable",
    "Inaccessible charts, imaging, or billing during a ransomware or outage event",
    "Staff operating from personal workarounds that increase exposure",
    "Insurance friction when controls cannot be evidenced",
    "Owner time pulled into IT fire drills instead of patient care",
  ];

  const howWeSolve = [
    {
      title: "Managed IT",
      description: "Identity, endpoints, email, and day-to-day support that keep the practice running.",
    },
    {
      title: "Cybersecurity",
      description: "MFA, monitoring posture, phishing resistance, and incident-ready response paths.",
    },
    {
      title: "Compliance evidence",
      description: "BAAs where appropriate, documentation, and audit/insurance packet support — not theater.",
    },
  ];

  const differentiation = [
    "One program for IT + cybersecurity + compliance — not three vendors pointing at each other",
    "Assessment-led recommendations before tool pushes",
    "Arizona operator (Chandler / East Valley) who understands clinic staffing realities",
    "Independent assessment — collaboration with your current provider is welcome; switching is optional",
    "Evidence and restore readiness treated as first-class outcomes, not afterthoughts",
  ];

  const securityStack = [
    "Business Associate Agreements (BAA)",
    "AES-256 encryption where applicable",
    "PHI access controls & audit logs",
    "Encrypted email solutions",
    "Secure file sharing",
    "MFA and identity hygiene",
    "Backup & disaster recovery with restore verification paths",
    "Risk assessment & analysis",
    "Security awareness training",
    "Incident response planning",
    "Regular security updates",
    "Compliance documentation",
  ];

  const assessmentIncludes = [
    "Access control and account hygiene review (including former-employee risk)",
    "MFA posture across email, remote access, and admin paths",
    "Email and phishing exposure that touches PHI workflows",
    "Endpoint hygiene for clinical and front-desk devices",
    "Backup existence vs restore readiness",
    "Documentation gaps insurers and auditors commonly ask about",
    "A prioritized risk summary — urgent vs later — not a product dump",
  ];

  const engagementSteps = narrative?.process ?? [];

  return (
    <PageTemplate
      title="Keep Patient Data Protected Without Becoming a HIPAA Expert"
      subtitle="Digerati manages security, backups, access controls, documentation, and ongoing IT behind Arizona practices so owners can focus on patients."
      gradientColors="from-[#050312] via-[#0a0a0a] to-[#050312]"
      icon={<Stethoscope className="w-10 h-10 text-white" />}
      breadcrumbs={[{ label: "Industries", href: "/" }, { label: "Healthcare" }]}
      actions={
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <a
            href="/book"
            className="inline-flex items-center justify-center bg-white text-[#D3126A] hover:bg-pink-50 px-7 py-3.5 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
            data-testid="button-hero-assessment"
          >
            {CTA.primary}
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
          <a
            href="#assessment"
            className="inline-flex items-center justify-center border-2 border-white/70 bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-[#D3126A] px-7 py-3.5 rounded-xl font-semibold transition-all"
            data-testid="button-hero-see-checks"
          >
            See What We Check
          </a>
        </div>
      }
    >
      <div className="space-y-16">
        {/* 2. Trust / proof strip — honest positioning only */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3" data-testid="section-trust-strip">
          {trustStrip.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06, duration: 0.4 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10"
              >
                <div className="w-9 h-9 rounded-lg bg-[#D3126A] flex items-center justify-center shrink-0">
                  <Icon className="h-4 w-4 text-white" />
                </div>
                <p className="text-sm font-medium text-white/90 leading-snug">{item.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Supporting focus labels (elevated from prior metrics — not fake KPIs) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Focus", value: "HIPAA", icon: Shield, color: "from-[#D3126A] to-[#D3126A]" },
            { label: "Encryption", value: "AES-256", icon: Lock, color: "from-fuchsia-600 " },
            { label: "Priority", value: "PHI", icon: Activity, color: " to-[#D3126A]" },
            { label: "Outcome", value: "Audit-ready evidence", icon: Heart, color: "from-[#D3126A] to-rose-500" },
          ].map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.45 }}
                className="group relative"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${metric.color} rounded-xl blur opacity-0 group-hover:opacity-30 transition-all duration-300`}
                />
                <Card className="relative bg-white/5 backdrop-blur-sm border border-white/10 hover:border-de-hairline transition-all">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-3">
                      <div
                        className={`w-10 h-10 rounded-lg bg-gradient-to-r ${metric.color} flex items-center justify-center`}
                      >
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-white">{metric.value}</p>
                    <p className="text-sm text-gray-400 mt-1">{metric.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* 3. Pain section */}
        <motion.div
          className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-8"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          data-testid="section-pain"
        >
          <div className="flex gap-4">
            <AlertTriangle className="h-8 w-8 text-amber-400 flex-shrink-0 mt-1" />
            <div className="w-full">
              <h2 className="text-2xl md:text-3xl font-bold text-amber-300 mb-3">
                Is your practice exposed?
              </h2>
              <p className="text-amber-200/90 mb-6 max-w-3xl">
                Healthcare practices are high-value targets because downtime hits patients and PHI
                creates regulatory and trust risk. Ask yourself the questions owners usually postpone
                until after something breaks.
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                {painQuestions.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.text}
                      className="flex items-start gap-3 p-3 rounded-lg bg-amber-500/5 border border-amber-500/20"
                    >
                      <Icon className="h-5 w-5 text-amber-400 mt-0.5 shrink-0" />
                      <span className="text-amber-100/90">{item.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* 4. Common problems */}
        <div data-testid="section-common-problems">
          <motion.h2
            className="text-3xl font-bold mb-8 flex items-center gap-3 text-white"
            initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-10 h-10 rounded-lg bg-de-raised flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            Common healthcare IT &amp; security problems
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6">
            {commonProblems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                >
                  <Card className="group h-full bg-white/5 backdrop-blur-sm border border-white/10 hover:border-de-hairline transition-all duration-300">
                    <CardHeader>
                      <div className="w-14 h-14 rounded-xl bg-de-raised flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Icon className="h-7 w-7 text-de-accent-ink" />
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

        {/* 5. Consequences — operational, no fake stats */}
        <section data-testid="section-consequences">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-rose-600 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">What exposure costs a practice</h2>
              <p className="text-white/60 text-sm">Operational and financial pressure — without invented statistics.</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            {consequences.map((item, idx) => (
              <motion.div
                key={item}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.35 }}
                className="flex items-start gap-3 p-4 rounded-xl bg-rose-500/10 border border-rose-500/25"
              >
                <span className="text-rose-400 font-bold mt-0.5">●</span>
                <p className="text-rose-100/90">{item}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 6. How Digerati solves */}
        <section data-testid="section-how-we-solve">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-[#D3126A] flex items-center justify-center">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white">How Digerati solves them</h2>
          </div>
          <p className="text-white/70 mb-8 max-w-3xl">
            IT, cybersecurity, and compliance as one operating program — so security is not bolted onto
            break/fix support after the fact.
          </p>
          <div className="grid md:grid-cols-3 gap-5">
            {howWeSolve.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.4 }}
                className="p-6 rounded-2xl bg-white/[0.04] border border-white/10"
              >
                <p className="text-xs font-semibold tracking-wide uppercase text-[#FF477F] mb-2">
                  Pillar {idx + 1}
                </p>
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-white/70 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 7. Differentiation */}
        <section data-testid="section-differentiation">
          <h2 className="text-3xl font-bold text-white mb-6">Why Digerati instead of ordinary IT support</h2>
          <div className="space-y-3 max-w-4xl">
            {differentiation.map((item, idx) => (
              <motion.div
                key={item}
                initial={prefersReducedMotion ? {} : { opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.3 }}
                className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10"
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mt-0.5">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
                <span className="text-gray-300 font-medium">{item}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 8. Healthcare security stack — supporting evidence */}
        <motion.div
          className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12 overflow-hidden"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          data-testid="section-security-stack"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-de-raised to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-de-raised to-transparent rounded-full blur-3xl" />

          <div className="relative">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-de-raised flex items-center justify-center">
                <FileCheck className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">Healthcare security stack &amp; outcomes</h2>
            </div>
            <p className="text-white/65 mb-8 max-w-3xl">
              Technical and administrative controls that support HIPAA-aware operations. These are the
              building blocks behind the program — not the headline promise.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {securityStack.map((item, index) => (
                <motion.div
                  key={item}
                  className="flex items-center gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-de-hairline transition-all duration-300"
                  initial={prefersReducedMotion ? {} : { opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.04, duration: 0.3 }}
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

        {/* 9. Honesty-safe proof — assessment deliverable, not fake quotes */}
        <section className="grid md:grid-cols-2 gap-6" data-testid="section-proof">
          <motion.div
            className="p-6 rounded-2xl bg-white/[0.04] border border-white/10"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xs font-semibold tracking-wide uppercase text-[#FF477F] mb-3">
              Arizona practices
            </p>
            <p className="text-white/85 leading-relaxed">
              {narrative?.arizonaNote ??
                "East Valley clinics, dental offices, and specialty practices need HIPAA-aware IT without a hospital-sized IT department."}
            </p>
          </motion.div>
          <motion.div
            className="p-6 rounded-2xl bg-[#D3126A]/10 border border-[#D3126A]/25"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xs font-semibold tracking-wide uppercase text-[#FF477F] mb-3">
              What proof looks like today
            </p>
            <p className="text-white/85 leading-relaxed mb-3">
              We do not publish named healthcare testimonials here yet. Instead of inventing quotes or
              outcome percentages, we show you the assessment deliverable: a clear prioritized risk
              summary, control gaps, and recommended next steps you can act on with us or your current
              provider.
            </p>
            <a
              href="#assessment"
              className="inline-flex items-center text-[#FF477F] hover:text-pink-300 font-medium"
            >
              Jump to what we check
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </a>
          </motion.div>
        </section>

        {/* 10. Free assessment module — major conversion block */}
        <motion.section
          id="assessment"
          className="relative scroll-mt-28 rounded-2xl border border-[#D3126A]/35 bg-gradient-to-br from-[#D3126A]/15 via-white/[0.03] p-8 md:p-12 overflow-hidden"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          data-testid="section-assessment"
        >
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#D3126A]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-[#D3126A] flex items-center justify-center">
                <ListChecks className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">What the Cyber Risk Assessment includes</h2>
            </div>
            <p className="text-white/75 mb-8 max-w-3xl text-lg">
              A prioritized risk summary — not a sales pitch. You leave knowing what is urgent, what can
              wait, and what evidence you are missing.
            </p>
            <div className="grid md:grid-cols-2 gap-3 mb-8">
              {assessmentIncludes.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 p-4 rounded-xl bg-black/20 border border-white/10"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center mt-0.5">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-white/90">{item}</span>
                </div>
              ))}
            </div>
            <a
              href="/book"
              className="inline-flex items-center justify-center bg-white text-[#D3126A] hover:bg-pink-50 px-8 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
              data-testid="button-assessment-module-cta"
            >
              {CTA.primary}
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </motion.section>

        {/* 11. Simple 3-step engagement */}
        <section data-testid="section-process">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-de-accent flex items-center justify-center">
              <ArrowRight className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">How engagement works</h2>
              <p className="text-white/60 text-sm">Three clear steps — not a black box of tickets.</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {engagementSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
                className="relative p-5 rounded-xl bg-white/[0.04] border border-white/10"
              >
                <div className="text-xs font-semibold tracking-wide text-[#FF477F] mb-2">
                  Step {index + 1}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-white/70 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 12. Pricing expectations / engagement fit — no invented prices */}
        <section
          className="p-8 rounded-2xl bg-white/[0.04] border border-white/10"
          data-testid="section-fit"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Engagement fit</h2>
          <p className="text-white/80 leading-relaxed max-w-3xl mb-4">
            Best fit for growing Arizona practices — typically clinics and specialty offices in the
            roughly <span className="text-white font-medium">10–75 employee</span> range — that need
            more than break/fix IT without building hospital-scale infrastructure.
          </p>
          <p className="text-white/65 leading-relaxed max-w-3xl">
            We do not list package prices on this page. Final scope and investment are confirmed after
            the assessment based on users, systems, risk profile, and whether you want us to collaborate
            with an existing provider or take full ownership.
          </p>
        </section>

        {/* 13. FAQ */}
        <section className="space-y-4 max-w-4xl" data-testid="section-faq">
          <h2 className="text-3xl font-bold text-white mb-2">Questions practice owners ask</h2>
          {(narrative?.faqs ?? []).map((faq) => (
            <div key={faq.q} className="p-5 rounded-xl bg-white/[0.04] border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-2">{faq.q}</h3>
              <p className="text-white/70 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </section>

        {/* 14. Strong final CTA */}
        <motion.div
          className="relative rounded-2xl overflow-hidden"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          data-testid="section-final-cta"
        >
          <div className="absolute inset-0 bg-[#D3126A]" />
          <div className="relative p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              {narrative?.ctaHeadline ?? "Protect patient data with a clear plan"}
            </h2>
            <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              {narrative?.ctaBody ??
                "Schedule a free HIPAA-focused cyber risk assessment for your Arizona practice."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/book"
                className="group inline-flex items-center justify-center bg-white text-[#D3126A] hover:bg-pink-50 px-8 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl hover:scale-105"
                data-testid="button-get-assessment"
              >
                {CTA.primary}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="tel:+13254809870"
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
