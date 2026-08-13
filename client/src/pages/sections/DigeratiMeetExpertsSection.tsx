import { motion, useReducedMotion } from "framer-motion";
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
      className="de-dark-chapter de-chapter-hairline relative overflow-hidden py-10 md:py-14 lg:py-16"
      data-testid="section-meet-experts"
    >
      <div className="relative z-10 mx-auto max-w-[100rem] px-3 sm:px-4 lg:px-6">
        <motion.div
          className="mb-8 md:mb-10"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#FF477F] md:text-sm">
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
            initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "200px" }}
            className="self-stretch overflow-hidden rounded-2xl border border-de-hairline bg-de-raised lg:col-span-5"
          >
            <img
              src="/images/founder/joe-petro-studio-blazer-white.jpg"
              alt="Joseph Petro, Founder of Digerati Experts"
              className="aspect-[3/4] w-full object-cover object-center lg:aspect-auto lg:h-full lg:min-h-[28rem] lg:object-top"
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
                  className="w-full border-t-2 border-[#D3126A] pt-5"
                >
                  <p className="font-mono text-xs font-semibold tracking-[0.18em] text-white/55">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white md:text-xl">{r.title}</p>
                  <p className="mt-2 text-[15px] leading-relaxed text-white/90 md:text-base">{r.detail}</p>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => openBooking("meet_experts")}
              className="inline-flex h-12 min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-pink-300/25 bg-gradient-to-r from-[#D3126A] via-pink-600 to-[#5B45E0] px-8 text-base font-semibold text-white shadow-[0_0_22px_rgba(211,18,106,0.35)] transition-all hover:from-[#e01874] hover:via-pink-500 hover:to-[#6b56f0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] sm:w-auto sm:min-w-[16rem]"
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
