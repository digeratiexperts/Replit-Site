import { PageTemplate } from "@/components/PageTemplate";
import { IconWell } from "@/components/visual/IconWell";
import { Button } from "@/components/ui/button";
import { Shield, Lock, CheckCircle, Phone, Activity, PawPrint, AlertTriangle, Database, Users, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useSEO } from "@/hooks/useSEO";
import { CTA } from "@/lib/ctaCopy";
import { PRIMARY_PHONE } from "@/data/companyContact";

const cardClass = "rounded-2xl border border-de-hairline bg-de-raised";
const insetClass = "rounded-xl border border-de-hairline bg-de-bg";

export default function AnimalHospitals() {
  useSEO({
    title: "IT & Cybersecurity for Veterinary Practices",
    description:
      "Managed IT and cybersecurity for Arizona animal hospitals — protect PIMS, imaging, and client records without building an internal IT team.",
    canonical: "/industries/animal-hospitals",
  });
  const prefersReducedMotion = useReducedMotion() ?? false;

  const focusAreas = [
    { label: "Practice systems", value: "PIMS, imaging, and billing", icon: Activity },
    { label: "Client records", value: "Access control and backup", icon: Shield },
    { label: "Payments", value: "PCI-aware processing", icon: Lock },
    { label: "Continuity", value: "Restore-tested recovery paths", icon: Database },
  ];

  const challenges = [
    {
      icon: Database,
      title: "Patient Records Security",
      description: "Protect sensitive pet medical records and client payment information with enterprise-grade encryption.",
    },
    {
      icon: Lock,
      title: "Payment Card Compliance",
      description: "Maintain PCI DSS compliance for credit card transactions and client billing systems.",
    },
    {
      icon: Users,
      title: "Multi-Location Management",
      description: "Seamlessly manage IT across multiple clinic locations with centralized security and monitoring.",
    },
  ];

  const securityFeatures = [
    "Practice Management System Security",
    "Encrypted Client Communications",
    "Secure Payment Processing",
    "24/7 Network Monitoring",
    "Backup & Disaster Recovery",
    "Email Protection & Anti-Phishing",
    "Endpoint Security (EDR)",
    "Security Awareness Training",
    "Remote Access Security",
    "Compliance Documentation",
  ];

  return (
    <PageTemplate
      title="IT Solutions for Veterinary Practices"
      subtitle="Secure, reliable IT solutions designed specifically for animal hospitals and veterinary clinics across Arizona."
      icon={<PawPrint className="h-10 w-10 text-de-accent-ink" />}
      breadcrumbs={[{ label: "Industries", href: "/industries" }, { label: "Animal Hospitals" }]}
      actions={
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="brand" size="lg" className="h-12 px-6 font-semibold" data-testid="button-hero-vet">
            <a href="/book">
              {CTA.primary}
              <ArrowRight className="ml-1 h-4 w-4" />
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-12 border-white/20 px-6 font-semibold text-white hover:bg-white/10"
          >
            <a href={PRIMARY_PHONE.telHref}>Call {PRIMARY_PHONE.display}</a>
          </Button>
        </div>
      }
    >
      <div className="space-y-16">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {focusAreas.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className={`de-interactive-card p-6 ${cardClass}`}
              >
                <Icon className="mb-3 h-5 w-5 text-de-accent-ink" aria-hidden="true" />
                <p className="text-lg font-semibold text-white">{item.value}</p>
                <p className="mt-1 text-sm text-white/55">{item.label}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className={`p-8 ${cardClass}`}
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex gap-4">
            <IconWell icon={AlertTriangle} size="md" surface="dark" />
            <div>
              <h3 className="mb-2 text-xl font-bold text-white">Veterinary Practices Are Prime Targets</h3>
              <p className="leading-relaxed text-white/75">
                Animal hospitals store valuable client payment data, pet insurance information, and personal contact details.
                Cybercriminals increasingly target veterinary practices knowing they often lack enterprise-grade security.
                A single ransomware attack can halt operations, disrupt patient care, and damage your reputation.
              </p>
            </div>
          </div>
        </motion.div>

        <div>
          <motion.h2
            className="mb-8 text-center text-2xl font-bold text-white md:text-3xl"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Challenges We Solve for Veterinary Practices
          </motion.h2>
          <div className="grid gap-6 md:grid-cols-3">
            {challenges.map((challenge, idx) => {
              const Icon = challenge.icon;
              return (
                <motion.div
                  key={challenge.title}
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className={`de-interactive-card h-full p-6 ${cardClass}`}
                >
                  <Icon className="mb-4 h-6 w-6 text-de-accent-ink" aria-hidden="true" />
                  <h3 className="text-xl font-semibold text-white">{challenge.title}</h3>
                  <p className="mt-3 text-white/65">{challenge.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          className={`p-8 ${cardClass}`}
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-white">
            <IconWell icon={Shield} size="sm" surface="dark" />
            Complete Security for Your Practice
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {securityFeatures.map((feature) => (
              <div key={feature} className={`flex items-center gap-3 p-3 ${insetClass}`}>
                <CheckCircle className="h-5 w-5 shrink-0 text-de-accent-ink" aria-hidden="true" />
                <span className="text-white/80">{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`p-8 text-center md:p-12 ${cardClass}`}
        >
          <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
            Built for Arizona animal hospitals
          </h2>
          <p className="mx-auto mb-8 max-w-3xl text-lg text-white/70">
            From small clinics to multi-location animal hospitals, we understand the unique IT needs of veterinary practices.
            Our team provides responsive support so you can focus on what matters most – caring for your patients.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button asChild variant="brand" size="lg" className="h-12 px-8 font-semibold" data-testid="button-schedule-call">
              <a href="/book">{CTA.primary}</a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 border-white/20 px-8 font-semibold text-white hover:bg-white/10"
              data-testid="button-call-now"
            >
              <a href={PRIMARY_PHONE.telHref}>
                <Phone className="mr-1 h-5 w-5" />
                Call {PRIMARY_PHONE.display}
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </PageTemplate>
  );
}
