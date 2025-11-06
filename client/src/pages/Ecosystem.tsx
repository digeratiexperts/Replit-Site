export default function Ecosystem() {
  const tiers = [
    { name: "ProActive IT", color: "from-deblue to-delightblue", desc: "Documentation · Vendor Support · Incident Assistance" },
    { name: "ProActive Office", color: "from-depurple to-demagenta", desc: "Collaboration · Cloud · Email · Support" },
    { name: "ProActive Business", color: "from-demagenta to-delightblue", desc: "Security · Compliance · Network · Automation" },
  ];

  return (
    <section className="min-h-screen pt-28 pb-16 px-6 bg-deblack text-dewhite">
      <h2 className="text-4xl font-bold mb-12 text-center">ProActive Ecosystem</h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`rounded-2xl p-6 bg-gradient-to-br ${tier.color} text-dewhite shadow-neon`}
          >
            <h3 className="text-2xl font-semibold mb-3">{tier.name}</h3>
            <p className="text-sm opacity-90">{tier.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
