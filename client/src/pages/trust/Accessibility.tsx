import { PageTemplate } from "@/components/PageTemplate";
import { ConversionPathBar } from "@/components/ConversionPathBar";
import { IconWell } from "@/components/visual/IconWell";
import { Eye, Mail, Phone, MapPin, CheckCircle, Monitor, Ear, Hand, Brain } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { PRIMARY_PHONE, formatAddressOneLine } from "@/data/companyContact";

const cardClass = "rounded-2xl border border-de-hairline bg-de-raised";
const insetClass = "rounded-xl border border-de-hairline bg-de-bg";

const accessibilityFeatures = [
  "Keyboard navigation support",
  "Alternative text for images",
  "Semantic HTML structure",
  "Clear heading hierarchy",
  "Sufficient color contrast ratios",
  "Readable fonts and text sizes",
  "Skip navigation links",
  "ARIA labels and landmarks",
];

const assistiveTech = [
  { icon: Monitor, name: "Screen readers (JAWS, NVDA, VoiceOver)" },
  { icon: Eye, name: "Screen magnification software" },
  { icon: Ear, name: "Speech recognition software" },
  { icon: Hand, name: "Keyboard-only navigation" },
];

const supportedUsers = [
  { icon: Eye, text: "Blind or have low vision" },
  { icon: Ear, text: "Deaf or have hearing loss" },
  { icon: Hand, text: "Living with mobility impairments" },
  { icon: Brain, text: "Living with cognitive disabilities" },
];

export default function Accessibility() {
  useSEO({
    title: "Accessibility Statement",
    description:
      "Digerati Experts accessibility statement: WCAG 2.1 Level AA target, known limitations, and how to report barriers.",
    canonical: "/trust/accessibility",
  });

  return (
    <PageTemplate
      title="Accessibility Statement"
      subtitle="Our Commitment to Digital Accessibility"
      icon={<Eye className="h-10 w-10 text-de-accent-ink" />}
      breadcrumbs={[{ label: "Trust", href: "/trust/trust-center" }, { label: "Accessibility" }]}
    >
      <div className="space-y-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-3xl font-bold text-white">Our Commitment</h2>
          <p className="text-xl leading-relaxed text-white/80">
            Digerati Experts is committed to ensuring digital accessibility for people with disabilities. We are
            continually improving the user experience for everyone and applying the relevant accessibility standards.
          </p>
        </div>

        <section className={`border-l-2 border-[#D3126A] p-8 ${cardClass}`}>
          <div className="mb-6 flex items-center gap-3">
            <IconWell icon={CheckCircle} size="sm" surface="dark" />
            <h2 className="text-2xl font-bold text-white">Conformance Status</h2>
          </div>
          <p className="mb-4 text-white/75">
            We are working toward conformance with the{" "}
            <strong className="text-white">Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</strong>. These
            guidelines explain how to make web content more accessible to people with disabilities.
          </p>
          <p className="mb-4 text-white/75">
            Conformance with these guidelines helps us ensure our website is accessible to people who are:
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {supportedUsers.map((user) => {
              const Icon = user.icon;
              return (
                <div key={user.text} className={`flex flex-col items-center p-4 text-center ${insetClass}`}>
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg border border-de-hairline bg-de-raised">
                    <Icon className="h-5 w-5 text-de-accent-ink" aria-hidden="true" />
                  </div>
                  <span className="text-sm text-white/75">{user.text}</span>
                </div>
              );
            })}
          </div>
        </section>

        <section className={`p-8 md:p-12 ${cardClass}`}>
          <div className="mb-8 flex items-center gap-3">
            <IconWell icon={Eye} size="sm" surface="dark" />
            <h2 className="text-3xl font-bold text-white">Accessibility Features</h2>
          </div>
          <p className="mb-6 text-white/75">Our website includes the following accessibility features:</p>
          <div className="grid gap-4 md:grid-cols-2">
            {accessibilityFeatures.map((feature) => (
              <div key={feature} className={`flex items-center gap-3 p-4 ${insetClass}`}>
                <CheckCircle className="h-5 w-5 shrink-0 text-de-accent-ink" aria-hidden="true" />
                <span className="text-white/75">{feature}</span>
              </div>
            ))}
          </div>
        </section>

        <div>
          <h2 className="mb-8 text-center text-3xl font-bold text-white">Compatible Assistive Technologies</h2>
          <div className="grid gap-6 md:grid-cols-4">
            {assistiveTech.map((tech) => {
              const Icon = tech.icon;
              return (
                <article key={tech.name} className={`de-interactive-card p-6 text-center ${cardClass}`}>
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl border border-de-hairline bg-de-bg">
                    <Icon className="h-7 w-7 text-de-accent-ink" aria-hidden="true" />
                  </div>
                  <p className="text-sm text-white/75">{tech.name}</p>
                </article>
              );
            })}
          </div>
        </div>

        <section className={`border-l-2 border-[#D3126A] p-8 ${cardClass}`}>
          <h2 className="mb-4 text-2xl font-bold text-white">Known Limitations</h2>
          <p className="mb-4 text-white/75">
            Despite our best efforts, some content may not yet be fully accessible. We are actively working to address
            these limitations:
          </p>
          <ul className="space-y-2">
            {[
              "Some third-party embedded content may not meet accessibility standards",
              "Older PDF documents may not be fully accessible (we're working to remediate these)",
              "Some complex interactive elements are being enhanced for better screen reader support",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-white/75">
                <span className="mt-1 text-de-accent-ink" aria-hidden="true">
                  •
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className={`p-8 ${cardClass}`}>
          <h2 className="mb-6 text-2xl font-bold text-white">Feedback and Support</h2>
          <p className="mb-6 text-white/75">
            We welcome your feedback on the accessibility of our website. If you encounter accessibility barriers or
            have suggestions for improvement, please let us know:
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <div className={`flex items-center gap-3 p-4 ${insetClass}`}>
              <Mail className="h-5 w-5 shrink-0 text-de-accent-ink" aria-hidden="true" />
              <a
                href="mailto:accessibility@digeratiexperts.com"
                className="text-white/80 underline-offset-4 hover:underline"
              >
                accessibility@digeratiexperts.com
              </a>
            </div>
            <div className={`flex items-center gap-3 p-4 ${insetClass}`}>
              <Phone className="h-5 w-5 shrink-0 text-de-accent-ink" aria-hidden="true" />
              <a href={PRIMARY_PHONE.telHref} className="text-white/80 underline-offset-4 hover:underline">
                {PRIMARY_PHONE.display}
              </a>
            </div>
            <div className={`flex items-start gap-3 p-4 ${insetClass}`}>
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-de-accent-ink" aria-hidden="true" />
              <span className="text-sm text-white/75">{formatAddressOneLine()}</span>
            </div>
          </div>
          <p className="mt-6 text-sm text-white/55">We aim to respond to accessibility feedback within 2 business days.</p>
        </section>

        <ConversionPathBar
          headline="Report an Accessibility Issue"
          body="Your feedback helps us improve. Please report any accessibility concerns."
          primaryHref="mailto:accessibility@digeratiexperts.com?subject=Accessibility Feedback"
          primaryLabel="Report Accessibility Issue"
          primaryTestId="button-report-accessibility"
        />

        <div className="border-t border-de-hairline pt-8 text-center">
          <p className="text-sm text-white/55">This accessibility statement was last updated on November 6, 2025.</p>
        </div>
      </div>
    </PageTemplate>
  );
}
