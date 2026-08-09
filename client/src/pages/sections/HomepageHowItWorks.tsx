import { Button } from "@/components/ui/button";
import { MeshyStillAccent } from "@/components/visual/MeshyStillAccent";
import { homepageSectionAccents } from "@/lib/visualAssets";
import { useBooking } from "@/contexts/BookingContext";
import { analytics } from "@/lib/analytics";

const steps = [
  {
    n: "1",
    title: "Assess",
    body: "Review identity, endpoints, email, backups, privileges, and documentation gaps.",
  },
  {
    n: "2",
    title: "Prioritize",
    body: "Get a clear risk-ordered plan — what matters now vs. what can wait.",
  },
  {
    n: "3",
    title: "Implement",
    body: "Deploy the operating model (managed, co-managed, or scoped) with client-owned access.",
  },
  {
    n: "4",
    title: "Operate & improve",
    body: "Ongoing support, monitoring, recovery readiness, and business reviews.",
  },
];

export function HomepageHowItWorks() {
  const { openBooking } = useBooking();

  return (
    <section id="how-it-works" className="py-14 lg:py-20 bg-[#050312]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
          <MeshyStillAccent still={homepageSectionAccents.howItWorks} size="lg" />
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pink-300/90 mb-3">
              How engagement works
            </p>
            <h2 className="text-2xl md:text-4xl font-bold text-white max-w-2xl">
              A clear path from uncertainty to an accountable operating model
            </h2>
          </div>
        </div>
        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {steps.map((s) => (
            <li key={s.n} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <span className="text-pink-300 font-bold text-sm tracking-widest">STEP {s.n}</span>
              <h3 className="text-xl font-semibold text-white mt-2 mb-2">{s.title}</h3>
              <p className="text-sm text-white/65 leading-relaxed">{s.body}</p>
            </li>
          ))}
        </ol>
        <Button
          type="button"
          size="lg"
          onClick={() => {
            analytics.bookingOpened("homepage-how-it-works");
            openBooking("homepage-how-it-works");
          }}
          className="bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white"
        >
          Schedule a Cyber Risk Assessment
        </Button>
      </div>
    </section>
  );
}
