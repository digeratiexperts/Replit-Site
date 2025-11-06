export default function Hero() {
  return (
    <section className="h-screen flex flex-col justify-center items-center text-center bg-hero-gradient text-dewhite">
      <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">
        Managed IT & Cybersecurity for Modern Business
      </h1>
      <p className="text-lg mb-8 max-w-2xl">
        Build resilience, boost productivity, and protect your organization with
        Digerati Experts’ ProActive Ecosystem.
      </p>
      <a
        href="/ecosystem"
        className="px-6 py-3 bg-dewhite text-deblack rounded-2xl font-semibold hover:bg-delightblue transition"
      >
        Explore Ecosystem Tiers
      </a>
    </section>
  );
}
