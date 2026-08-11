import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
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
      id="team"
      className="relative py-10 md:py-14 lg:py-16 bg-[#0a0a0a] overflow-hidden"
      data-testid="section-meet-experts"
    >
      <div className="max-w-[100rem] mx-auto px-3 sm:px-4 lg:px-6">
        <motion.div
          className="text-center mb-8 md:mb-10"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xs md:text-sm font-medium text-[#FF477F] tracking-wide uppercase mb-3">
            Human trust
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            The people behind your technology
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            When something happens, you should know who owns it — not wonder which anonymous
            queue picked up your ticket.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 rounded-2xl overflow-hidden border border-white/10 bg-[#111]"
          >
            <img
              src="/images/founder/joe-petro-studio-blazer-white.jpg"
              alt="Joseph Petro, Founder of Digerati Experts"
              className="w-full h-64 sm:h-80 lg:h-full object-cover object-top"
              loading="lazy"
              decoding="async"
              data-testid="img-founder-joe"
            />
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.06 }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <p className="text-white text-xl md:text-2xl font-semibold">Joseph Petro</p>
            <p className="text-violet-300 text-sm md:text-base mb-4">
              Founder · Technology &amp; Security Strategy
            </p>
            <p className="text-white/65 text-sm md:text-base leading-relaxed mb-6 max-w-xl">
              Principal-led MSP/MSSP based in Chandler, Arizona. Joe stays close to assessments,
              architecture decisions, and client relationships — so growing businesses get
              cybersecurity-first managed IT without becoming account number four thousand.
            </p>

            <div className="grid sm:grid-cols-3 gap-3 mb-6">
              {roles.map((r) => (
                <div
                  key={r.title}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <p className="text-white text-sm font-medium mb-1">{r.title}</p>
                  <p className="text-white/50 text-xs leading-relaxed">{r.detail}</p>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => openBooking("meet_experts")}
              className="inline-flex items-center gap-2 self-start rounded-lg bg-gradient-to-r from-fuchsia-600 to-violet-600 hover:from-fuchsia-500 hover:to-violet-500 text-white text-sm font-semibold px-5 py-2.5"
              data-testid="button-talk-to-expert"
            >
              Talk to an expert
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
