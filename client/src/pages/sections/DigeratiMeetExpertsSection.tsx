import { motion, useReducedMotion } from "framer-motion";
import { revealInitial, revealInView, revealTransition, revealViewport } from "@/lib/animations";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useBooking } from "@/contexts/BookingContext";

const roles = [
  {
    title: "Security Operations",
    detail: "Monitoring, detection, and response ownership when threats appear.",
  },
  {
    title: "Technical Operations",
    detail: "Day-to-day support, identity, endpoints, and environment stability.",
  },
  {
    title: "Client Success",
    detail: "QBRs, roadmaps, and a named relationship — not a rotating ticket queue.",
  },
];

export const DigeratiMeetExpertsSection = (): JSX.Element => {
  const prefersReducedMotion = useReducedMotion();
  const { openBooking } = useBooking();

  return (
    <section
      className="de-dark-well de-chapter-hairline de-field-grain relative overflow-hidden py-10 md:py-14 lg:py-16"
      data-testid="section-meet-experts"
    >
      <div
        className="de-founder-seam pointer-events-none absolute inset-x-0 top-0"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-[var(--de-canvas)] px-3 sm:px-4 lg:px-6">
        <motion.div
          className="mb-8 md:mb-10"
          initial={prefersReducedMotion ? false : revealInitial}
          whileInView={revealInView}
          viewport={revealViewport}
          transition={revealTransition}
        >
          <p className="mb-3 text-base font-semibold uppercase tracking-[0.2em] text-de-magenta-ink">
            Human trust
          </p>
          <h2 className="mb-3 font-heading text-3xl font-semibold tracking-[-0.02em] text-white sm:text-4xl md:text-5xl">
            The people behind your technology
          </h2>
          <p className="max-w-3xl text-base leading-relaxed text-white/80 md:text-lg">
            When something happens, you should know who owns it — not wonder which anonymous
            queue picked up your ticket.{" "}
            <Link href="/about/team">
              <span className="font-semibold text-white underline decoration-[#D3126A]/70 underline-offset-4 hover:decoration-[#D3126A]">
                Meet the team
              </span>
            </Link>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12 lg:gap-10">
          <motion.div
            initial={prefersReducedMotion ? false : revealInitial}
            whileInView={revealInView}
            viewport={revealViewport}
            transition={revealTransition}
            className="overflow-hidden rounded-2xl border border-de-hairline bg-de-raised lg:col-span-5 lg:self-start"
          >
            <img
              src="/images/founder/joe-petro-studio-blazer-white.jpg"
              alt="Joseph Petro, Founder of Digerati Experts"
              className="block aspect-[3/4] w-full object-cover object-[center_20%]"
              loading="lazy"
              decoding="async"
              width={768}
              height={1024}
              data-testid="img-founder-joe"
            />
          </motion.div>

          <motion.div
            className="flex w-full min-w-0 flex-col justify-between gap-8 lg:col-span-7 lg:py-2"
          >
            <div className="w-full">
              <h3 className="font-heading text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl lg:text-[3.5rem]">
                Joseph Petro
              </h3>
              <p className="mt-3 text-xl font-medium text-white md:text-2xl">
                Founder · Technology &amp; Security Strategy
              </p>
              <p className="mt-5 w-full text-lg leading-relaxed text-white md:text-xl">
                Principal-led MSP/MSSP based in Chandler, Arizona. Joe stays close to assessments,
                architecture decisions, and client relationships — so growing businesses get
                cybersecurity-first managed IT without becoming account number four thousand.
              </p>
            </div>

            <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
              {roles.map((r, index) => (
                <div
                  key={r.title}
                  className="w-full border-t-2 border-[#D3126A] pt-5 transition-colors hover:border-[#f0187a]"
                >
                  <p className="font-mono text-base font-semibold tracking-[0.18em] text-white/65">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white md:text-xl">{r.title}</p>
                  <p className="mt-2 text-base leading-relaxed text-white/90">{r.detail}</p>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => openBooking("meet_experts")}
              className="inline-flex h-12 min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#D3126A] px-8 text-base font-semibold text-white transition-colors hover:bg-[#e01874] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D3126A]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] sm:w-auto sm:min-w-[16rem]"
              data-testid="button-talk-to-expert"
            >
              Talk to an expert
              <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
