import { MegaMenu } from "@/components/MegaMenu";
import { DigeratiEnhancedFooterSection } from "@/pages/sections/DigeratiEnhancedFooterSection";
import { useSEO } from "@/hooks/useSEO";
import { JsonLd } from "@/components/JsonLd";
import { Link } from "wouter";
import { PRIMARY_PHONE } from "@/data/companyContact";

const NAP = {
  name: "Digerati Experts",
  street: "3165 S Alma School Rd Suite 29",
  city: "Chandler",
  region: "AZ",
  postal: "85248",
  phone: PRIMARY_PHONE.display,
  email: "info@digeratiexperts.com",
};

export default function Press() {
  useSEO({
    title: "Press & Media",
    description:
      "Official media kit and boilerplate for Digerati Experts — Arizona MSP/MSSP for managed IT, cybersecurity, and compliance. Accurate NAP and brand facts for journalists and partners.",
    canonical: "/about/press",
  });

  return (
    <div className="min-h-screen bg-[#0b0b12] text-white">
      <MegaMenu />
      <JsonLd
        id="press-org"
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "Press & Media — Digerati Experts",
          url: "https://digeratiexperts.com/about/press",
          mainEntity: {
            "@type": "Organization",
            name: NAP.name,
            url: "https://digeratiexperts.com",
            email: NAP.email,
            telephone: PRIMARY_PHONE.schemaTelephone,
            address: {
              "@type": "PostalAddress",
              streetAddress: NAP.street,
              addressLocality: NAP.city,
              addressRegion: NAP.region,
              postalCode: NAP.postal,
              addressCountry: "US",
            },
          },
        }}
      />
      <main className="mx-auto max-w-3xl px-6 py-20">
        <p className="text-sm uppercase tracking-[0.2em] text-de-magenta-ink/80">Media</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">Press & media</h1>
        <p className="mt-4 text-lg text-white/70">
          Use this page for accurate company facts, citations, and interview requests. Please do not
          invent metrics, client names, or certifications not listed here.
        </p>

        <section className="mt-12 space-y-4">
          <h2 className="text-2xl font-semibold">Boilerplate</h2>
          <p className="rounded-lg border border-white/10 bg-white/5 p-5 text-white/80 leading-relaxed">
            Digerati Experts is an Arizona-based managed IT and managed security provider helping
            small and mid-size organizations protect operations, patient and client data, and
            compliance readiness. The firm combines managed IT, cybersecurity, and documentation into
            one accountable program for businesses that need enterprise-grade controls without a large
            internal IT department. Headquarters: Chandler, Arizona.
          </p>
        </section>

        <section className="mt-12 space-y-3">
          <h2 className="text-2xl font-semibold">Official NAP (use exactly)</h2>
          <address className="not-italic rounded-lg border border-white/10 bg-white/5 p-5 text-white/85 leading-relaxed">
            {NAP.name}
            <br />
            {NAP.street}
            <br />
            {NAP.city}, {NAP.region} {NAP.postal}
            <br />
            Phone:{" "}
            <a className="text-de-magenta-ink underline-offset-2 hover:underline" href={PRIMARY_PHONE.telHref}>
              {NAP.phone}
            </a>
            <br />
            Email:{" "}
            <a className="text-de-magenta-ink underline-offset-2 hover:underline" href={`mailto:${NAP.email}`}>
              {NAP.email}
            </a>
            <br />
            Web:{" "}
            <a className="text-de-magenta-ink underline-offset-2 hover:underline" href="https://digeratiexperts.com">
              https://digeratiexperts.com
            </a>
          </address>
        </section>

        <section className="mt-12 space-y-3">
          <h2 className="text-2xl font-semibold">Linkable resources</h2>
          <ul className="list-disc space-y-2 pl-5 text-white/80">
            <li>
              <Link href="/resources/case-studies" className="text-de-magenta-ink hover:underline">
                Case studies
              </Link>
            </li>
            <li>
              <Link href="/resources/blog" className="text-de-magenta-ink hover:underline">
                Security & IT blog
              </Link>
            </li>
            <li>
              <Link href="/trust/trust-center" className="text-de-magenta-ink hover:underline">
                Trust center
              </Link>
            </li>
            <li>
              <Link href="/book" className="text-de-magenta-ink hover:underline">
                Free risk assessment
              </Link>
            </li>
          </ul>
        </section>

        <section className="mt-12 space-y-3">
          <h2 className="text-2xl font-semibold">Media contact</h2>
          <p className="text-white/75">
            Interview and citation requests:{" "}
            <a className="text-de-magenta-ink hover:underline" href={`mailto:${NAP.email}?subject=Media%20inquiry`}>
              {NAP.email}
            </a>{" "}
            · {NAP.phone}
          </p>
        </section>
      </main>
      <DigeratiEnhancedFooterSection />
    </div>
  );
}
