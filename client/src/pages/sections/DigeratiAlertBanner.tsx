import { Shield, Users, Activity, ArrowRight, Phone } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PRIMARY_PHONE } from "@/data/companyContact";
import { revealInitial, revealInView, revealTransition, revealViewport } from "@/lib/animations";
import { Link } from "wouter";

export const DigeratiAlertBanner = (): JSX.Element => {
  const prefersReducedMotion = useReducedMotion();

  const features = [
    {
      icon: Shield,
      title: "Security-First Operations",
      description: "Every system, endpoint, and user is protected - by design, not by reaction.",
      testId: "card-security-first",
      href: "/solutions/proactive-ecosystem",
    },
    {
      icon: Users,
      title: "Co-Managed or Fully Managed",
      description: "We support your internal IT or serve as your outsourced technology team.",
      testId: "card-co-managed",
      href: "/solutions/co-managed-it",
    },
    {
      icon: Activity,
      title: "Executive-Level Transparency",
      description: "Reports, KPIs, and compliance insights that make sense - and drive decisions.",
      testId: "card-transparency",
      href: "/trust",
    }
  ];

  const containerVariants = prefersReducedMotion ? undefined : {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.045,
        delayChildren: 0,
      }
    }
  };

  const cardVariants = prefersReducedMotion ? undefined : {
    hidden: { opacity: 0.55, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: revealTransition,
    },
  };

  return (
    <section className="de-dark-well de-chapter-hairline de-field-grain relative overflow-hidden py-8 lg:py-16">
      <div className="container relative z-10 mx-auto px-3 sm:px-4 lg:px-6">
        <motion.div
          className="mb-8 text-center md:mb-16"
          initial={prefersReducedMotion ? false : revealInitial}
          whileInView={revealInView}
          viewport={revealViewport}
          transition={revealTransition}
        >
          <h2 className="mb-3 text-2xl font-bold leading-tight text-white md:mb-4 md:text-4xl lg:text-5xl">
            We Exist to Protect and Enable Your Business
          </h2>
          <p className="mx-auto max-w-3xl text-base font-medium leading-relaxed text-white/80 md:text-xl md:font-normal md:text-white/65">
            If you're like most business leaders, you don't want another vendor — you want a security-first partner who proactively reduces risk, improves uptime, and keeps your team moving.
          </p>
        </motion.div>

        <motion.div
          className="mb-8 grid grid-cols-1 items-stretch gap-4 md:mb-12 md:grid-cols-3 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              className="h-full"
            >
              <Link
                href={feature.href}
                data-testid={feature.testId}
                className="de-interactive-tile group relative flex h-full flex-col rounded-2xl border border-de-hairline bg-de-raised p-6 hover:border-[#D3126A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D3126A]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--de-bg)]"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-colors group-hover:border-[#D3126A]">
                  <feature.icon className="h-7 w-7 text-[#D3126A]" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-white">{feature.title}</h3>
                <p className="leading-relaxed text-white/60 group-hover:text-white/75">{feature.description}</p>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? false : revealInitial}
          whileInView={revealInView}
          viewport={revealViewport}
          transition={revealTransition}
        >
          <div className="relative overflow-hidden rounded-2xl border border-de-hairline bg-de-raised px-5 py-7 md:px-12 md:py-12">
            <div className="relative z-10 text-center">
              <h3 className="mb-4 text-2xl font-bold text-white md:text-3xl">
                Ready to Secure Your Business?
              </h3>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-white/65">
                Get enterprise-grade protection tailored for Arizona businesses. Let's discuss your security needs.
              </p>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button asChild
                    size="lg"
                    className="h-14 rounded-xl bg-[#D3126A] px-8 text-base font-semibold text-white shadow-none transition-colors hover:bg-[#e01874]"
                    data-testid="button-schedule-consultation-banner"
                  >
                  <a href="/book">
                    <ArrowRight className="mr-2 h-5 w-5" />
                    Schedule Consultation
                  </a>
                </Button>
                <Button asChild
                    variant="outline"
                    size="lg"
                    className="h-14 rounded-xl border-2 border-white/25 bg-transparent px-8 text-base font-semibold text-white hover:bg-white/10"
                    data-testid="button-call-banner"
                  >
                  <a href={PRIMARY_PHONE.telHref}>
                    <Phone className="mr-2 h-5 w-5" />
                    Call {PRIMARY_PHONE.display}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
