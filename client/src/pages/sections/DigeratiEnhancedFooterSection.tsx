import { Linkedin, Twitter, Facebook, Instagram, ArrowRight, CheckCircle, Send, Loader2, Shield } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { IconWell } from "@/components/visual/IconWell";
import { COMPANY_SOCIAL } from "@/data/companyContact";
import logoImage from "@assets/DE-Logo-new_1762461524794.webp";

const FooterLink = ({ href, children, testId }: { href: string; children: React.ReactNode; testId: string }) => {
  const isExternal = /^https?:\/\//i.test(href);
  return (
    <a
      href={href}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="text-base text-white/55 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--de-bg)]"
      data-testid={testId}
    >
      {children}
    </a>
  );
};

export const DigeratiEnhancedFooterSection = (): JSX.Element => {
  const currentYear = new Date().getFullYear();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Failed to subscribe");
      }
      toast({
        title: "Successfully Subscribed!",
        description: "You'll receive our security updates and expert insights.",
        variant: "default",
      });
      setEmail("");
      setIsSubscribed(true);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const quickAccess = [
    { name: "Client Portal", href: "https://portal.digeratiexperts.com/portal/login" },
    { name: "Digerati Journal", href: "/resources/blog" },
    { name: "Cyber Facts", href: "/resources/cyber-facts" },
    { name: "Submit Ticket", href: "/support/submit-ticket" },
    { name: "Zoho Assist", href: "https://assist.zoho.com/" },
    { name: "Remote Support", href: "/support/remote-support" },
    { name: "Pay Invoice", href: "/support/pay-invoice" },
    { name: "Knowledge Base", href: "/support/knowledge-base" },
    { name: "System Status", href: "/portal/status" },
  ];

  const services = [
    { name: "Managed IT", href: "/solutions/managed-it-support" },
    { name: "Cybersecurity", href: "/solutions/security-operations" },
    { name: "Compliance & Risk", href: "/solutions/compliance-reports" },
    { name: "Backup & DR", href: "/solutions/backup-disaster-recovery" },
    { name: "Threat Detection", href: "/solutions/threat-detection" },
    { name: "Security Training", href: "/solutions/security-awareness" },
  ];

  const legal = [
    { name: "MSA", badge: "v2025.1", href: "/legal/msa" },
    { name: "SLA", badge: "v2025.1", href: "/legal/sla" },
    { name: "AUP", badge: "v2025.1", href: "/legal/aup" },
    { name: "DPA", badge: "v2025.1", href: "/legal/dpa" },
    { name: "Privacy Policy", href: "/legal/privacy-policy" },
    { name: "Terms of Use", href: "/legal/terms-of-use" },
    { name: "Sample SOW", href: "/legal/sample-sow" },
  ];

  const trust = [
    { name: "Trust Center", href: "/trust/trust-center" },
    { name: "Status Page", href: "/portal/status" },
    { name: "Vulnerability Disclosure", href: "/trust/vulnerability-disclosure" },
    { name: "security.txt", href: "/.well-known/security.txt" },
    { name: "Accessibility", href: "/trust/accessibility" },
  ];

  const locations = [
    { name: "Chandler", href: "/locations/chandler-az", primary: true },
    { name: "Phoenix", href: "/locations/phoenix-az", primary: false },
    { name: "Gilbert", href: "/locations/gilbert-az", primary: false },
    { name: "Tempe", href: "/locations/tempe-az", primary: false },
    { name: "Mesa", href: "/locations/mesa-az", primary: false },
    { name: "Scottsdale", href: "/locations/scottsdale-az", primary: false },
  ];

  const complianceSupport = [
    "HIPAA-aligned security and compliance support",
    "SOC 2 readiness and control alignment",
    "Cyber insurance readiness",
    "Security and compliance reporting",
  ];

  const partnerMarks = ["Microsoft Partner", "Apple Consultants"];

  const socialLinks = [
    { ...COMPANY_SOCIAL.linkedin, icon: Linkedin, testId: "footer-linkedin" },
    { ...COMPANY_SOCIAL.twitter, icon: Twitter, testId: "footer-twitter" },
    { ...COMPANY_SOCIAL.facebook, icon: Facebook, testId: "footer-facebook" },
    { ...COMPANY_SOCIAL.instagram, icon: Instagram, testId: "footer-instagram" },
  ];

  return (
    <footer className="de-dark-well de-chapter-hairline relative">
      <div className="container relative z-10 mx-auto max-w-[1440px] px-3 pt-16 sm:px-4 lg:px-6">
        <div className="mb-10">
          <img
            src={logoImage}
            alt="Digerati Experts Logo"
            className="h-12 w-auto"
            data-testid="logo-footer"
          />
        </div>

        <div className="mb-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div>
            <h4 className="mb-4 text-base font-semibold uppercase tracking-[0.16em] text-white">
              Quick Access
            </h4>
            <ul className="space-y-2.5">
              {quickAccess.map((item) => (
                <li key={item.name}>
                  <FooterLink href={item.href} testId={`footer-${item.name.toLowerCase().replace(/\s+/g, "-")}`}>
                    {item.name}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-base font-semibold uppercase tracking-[0.16em] text-white">
              Services
            </h4>
            <ul className="space-y-2.5">
              {services.map((item, index) => (
                <li key={item.name}>
                  <FooterLink href={item.href} testId={`footer-service-${index}`}>
                    {item.name}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-base font-semibold uppercase tracking-[0.16em] text-white">
              Legal
            </h4>
            <ul className="space-y-2.5">
              {legal.map((item, index) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="inline-flex items-center gap-2 text-base text-white/55 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--de-bg)]"
                    data-testid={`footer-legal-${index}`}
                  >
                    {item.name}
                    {item.badge && (
                      <span className="rounded border border-de-hairline px-1.5 py-0.5 text-base text-white/55">
                        {item.badge}
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-base font-semibold uppercase tracking-[0.16em] text-white">
              Trust
            </h4>
            <ul className="space-y-2.5">
              {trust.map((item, index) => (
                <li key={item.name}>
                  <FooterLink href={item.href} testId={`footer-trust-${index}`}>
                    {item.name}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-de-hairline py-8">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="flex items-start gap-4">
              <IconWell icon={Shield} size="sm" surface="dark" />
              <div>
                <h3 className="font-semibold text-white">Security &amp; Compliance Support</h3>
                <p className="mt-1 text-base text-white/55">
                  Need security questionnaires or compliance documentation?
                </p>
                <p className="mt-1 text-base text-white/50">
                  Request security questionnaires and framework-alignment materials for vendor onboarding
                </p>
              </div>
            </div>
            <a
              href="/book"
              className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-lg border border-pink-300/30 bg-gradient-to-r from-fuchsia-600 via-pink-600 to-rose-500 px-6 py-2.5 text-base font-semibold text-white transition-all duration-200 hover:from-fuchsia-500 hover:via-pink-500 hover:to-rose-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D3126A] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--de-bg)]"
              data-testid="footer-request-docs"
            >
              Request Docs
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="border-t border-de-hairline py-8">
          <h4 className="mb-2 text-base font-semibold uppercase tracking-[0.16em] text-white">
            Security &amp; Compliance Support
          </h4>
          <p className="mb-5 max-w-3xl text-base text-white/55">
            Framework names describe customer requirements Digerati helps organizations address — not certifications Digerati holds.
          </p>
          <ul className="mb-6 grid gap-2 sm:grid-cols-2">
            {complianceSupport.map((item, index) => (
              <li
                key={item}
                className="flex items-start gap-3 text-base text-white/60"
                data-testid={`footer-compliance-support-${index}`}
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2">
            {partnerMarks.map((name) => (
              <span
                key={name}
                className="rounded-md border border-de-hairline px-3 py-1.5 text-base text-white/55"
              >
                {name}
              </span>
            ))}
          </div>
        </div>

        <div className="border-t border-de-hairline py-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h4 className="mb-2 text-base font-semibold uppercase tracking-[0.16em] text-white">
                Stay Updated
              </h4>
              <p className="mb-5 text-base text-white/55">
                Get the latest cybersecurity insights and IT tips delivered to your inbox.
              </p>
              {isSubscribed ? (
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle className="h-5 w-5" aria-hidden="true" />
                  <span className="text-base">Thank you for subscribing!</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-3 sm:flex-row">
                  <label htmlFor="footer-newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="footer-newsletter-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    disabled={isSubmitting}
                    className="h-11 min-w-0 flex-1 rounded-lg border border-de-hairline bg-de-raised px-4 text-base text-white placeholder:text-white/35 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/60"
                    data-testid="footer-newsletter-input"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-white px-5 text-base font-semibold text-[#1A1228] transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--de-bg)] disabled:opacity-60"
                    data-testid="footer-newsletter-submit"
                  >
                    {isSubmitting ? (
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    ) : (
                      <Send className="h-4 w-4" aria-hidden="true" />
                    )}
                    <span>Subscribe</span>
                  </button>
                </form>
              )}
            </div>

            <div>
              <h4 className="mb-4 text-base font-semibold uppercase tracking-[0.16em] text-white">
                Serving Greater Phoenix
              </h4>
              <div className="flex flex-wrap gap-2">
                {locations.map((location) => (
                  <a
                    key={location.name}
                    href={location.href}
                    className={`inline-flex min-h-11 items-center rounded-lg border px-4 text-base transition-colors hover:border-white/25 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--de-bg)] ${
                      location.primary
                        ? "border-white/20 text-white"
                        : "border-de-hairline text-white/70"
                    }`}
                    data-city={location.name.toLowerCase()}
                    data-testid={`footer-location-${location.name.toLowerCase()}`}
                  >
                    {location.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-de-hairline py-8">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-de-hairline text-white/55 transition-colors hover:border-white/25 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--de-bg)]"
                  aria-label={social.name}
                  data-testid={social.testId}
                >
                  <social.icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>

            <div className="text-base text-white/50">
              © {currentYear} Digerati Experts, LLC. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
