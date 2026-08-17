import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const cities = [
  { name: "Chandler", icon: "/figmaAssets/svg-2.svg" },
  { name: "Phoenix", icon: "/figmaAssets/svg-2.svg" },
  { name: "Gilbert", icon: "/figmaAssets/svg-2.svg" },
  { name: "Tempe", icon: "/figmaAssets/svg-2.svg" },
  { name: "Mesa", icon: "/figmaAssets/svg-2.svg" },
  { name: "Scottsdale", icon: "/figmaAssets/svg-2.svg" },
];

const partnerMarks = [
  { icon: "/figmaAssets/svg-3.svg", text: "Microsoft Partner" },
  { icon: "/figmaAssets/svg-3.svg", text: "Apple Consultants" },
];

const socialLinks = [
  { text: "in", bgClass: "bg-[#2c3045]" },
  { text: "yt", bgClass: "bg-[#2c3045]" },
  { text: "𝕏", bgClass: "bg-[#2c3045]" },
  { image: "/figmaAssets/link---map.svg" },
];

const quickAccessLinks = [
  { name: "Client Portal", url: "/portal" },
  { name: "Submit Ticket", url: "/support/submit-ticket" },
  { name: "Remote Support", url: "/support/remote-support" },
  { name: "Pay Invoice", url: "/support/pay-invoice" },
  { name: "Knowledge Base", url: "/support/knowledge-base" },
  { name: "System Status", url: "/portal/status" },
];

const servicesLinks = [
  { name: "ProActive Ecosystem", url: "/proactive-ecosystem-pricing" },
  { name: "Managed IT", url: "/solutions/managed-it-support" },
  { name: "Cybersecurity", url: "/solutions/security-operations" },
  { name: "Compliance & Risk", url: "/solutions/compliance-reports" },
  { name: "Backup & DR", url: "/solutions/backup-disaster-recovery" },
  { name: "Co-Managed IT", url: "/solutions/co-managed-it" },
  { name: "UCaaS & VoIP", url: "/services/ucaas" },
];

const legalLinks = [
  { name: "MSA", version: "v2025.1", url: "/legal/msa" },
  { name: "SLA", version: "v2025.1", url: "/legal/sla" },
  { name: "AUP", version: "v2025.1", url: "/legal/aup" },
  { name: "DPA", version: "v2025.1", url: "/legal/dpa" },
  { name: "Privacy Policy", version: null, url: "/legal/privacy-policy" },
  { name: "Terms of Use", version: null, url: "/legal/terms-of-use" },
  { name: "Sample SOW", version: null, url: "/legal/sample-sow" },
];

const trustLinks = [
  { name: "Trust Center", url: "/trust/trust-center" },
  { name: "Status Page", url: "/portal/status" },
  { name: "Vulnerability Disclosure", url: "/trust/vulnerability-disclosure" },
  { name: "security.txt", url: "/.well-known/security.txt" },
  { name: "Accessibility", url: "/trust/accessibility" },
];

export const BlogSection = (): JSX.Element => {
  return (
    <footer className="relative w-full bg-[url(/figmaAssets/wave-svg.svg)] bg-cover bg-center overflow-hidden">
      <div className="absolute inset-0 bg-[url(/figmaAssets/frame-2131330643.svg)] bg-cover bg-[50%_50%]" />

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20 py-8 lg:py-[46px]">
        <div className="text-center text-slate-400 text-xs sm:text-sm font-normal tracking-[0] leading-[23.8px] mb-10 lg:mb-20">
          © {new Date().getFullYear()} Digerati Experts, LLC. All rights reserved.
        </div>

        <img
          className="w-32 sm:w-[179px] h-auto mb-8 lg:mb-[54px] mx-auto lg:mx-0"
          alt="Group"
          src="/figmaAssets/group-97-1.png"
          data-testid="footer-logo"
        />

        <div className="flex flex-col gap-8 lg:gap-14 mb-10 lg:mb-[72px]">
          <section className="flex flex-col gap-4 lg:gap-[23px]">
            <h2 className="font-bold text-de-accent-ink text-xs sm:text-[15px] tracking-[1.50px] leading-[25.5px] text-center lg:text-left">
              SERVING GREATER PHOENIX
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-[15px]">
              {cities.map((city, index) => (
                <Card
                  key={index}
                  className="bg-[#2c3045] border-0 backdrop-blur-[2px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(2px)_brightness(100%)]"
                >
                  <CardContent className="flex items-center gap-3 lg:gap-5 p-4 lg:p-6">
                    <img
                      className="w-4 h-4"
                      alt="Location"
                      src={city.icon}
                    />
                    <div className="font-normal text-[#e5e9f0] text-sm lg:text-[19.1px] leading-normal lg:leading-[32.5px] tracking-[0] whitespace-nowrap">
                      {city.name}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <div className="flex flex-col gap-4 lg:gap-[25px]">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 lg:gap-6">
              {partnerMarks.map((mark, index) => (
                <Card
                  key={index}
                  className="bg-[#2c3045] border-0 backdrop-blur-[2px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(2px)_brightness(100%)]"
                >
                  <CardContent className="inline-flex items-center gap-3 lg:gap-5 p-4 lg:p-6">
                    <img
                      className="w-4 h-4 lg:w-[18px] lg:h-[18px]"
                      alt=""
                      src={mark.icon}
                    />
                    <div className="font-bold text-[#e5e9f0] text-xs lg:text-sm tracking-[0] leading-[23.8px] whitespace-nowrap">
                      {mark.text}
                    </div>
                  </CardContent>
                </Card>
              ))}
              <p className="w-full text-center lg:text-left text-slate-400 text-xs lg:text-sm leading-relaxed">
                Built for regulated environments — HIPAA · SOC 2 · Cyber Insurance · Security Framework Alignment
              </p>
            </div>

            <div className="inline-flex items-center justify-center lg:justify-start gap-2.5 flex-wrap">
              {socialLinks.map((link, index) =>
                link.image ? (
                  <img
                    key={index}
                    className="w-10 h-10 lg:w-[50px] lg:h-[50px]"
                    alt="Link map"
                    src={link.image}
                    data-testid={`social-link-${index}`}
                  />
                ) : (
                  <Card
                    key={index}
                    className={`${link.bgClass} border-0 backdrop-blur-[2px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(2px)_brightness(100%)]`}
                  >
                    <CardContent className="flex w-10 h-10 lg:w-[50px] lg:h-[50px] items-center justify-center p-4 lg:p-6">
                      <div className="font-bold text-[#e5e9f0] text-sm lg:text-base text-center tracking-[0] leading-[27.2px] whitespace-nowrap">
                        {link.text}
                      </div>
                    </CardContent>
                  </Card>
                ),
              )}
            </div>
          </div>
        </div>

        <Card className="relative mb-10 lg:mb-[72px] rounded-[20px] overflow-hidden border-2 border-solid border-[#5034ff40] bg-[linear-gradient(90deg,rgba(250,28,255,0.16)_0%,rgba(28,91,255,0.16)_100%)]">
          <div className="absolute w-[calc(100%_-_4px)] top-0 left-0.5 h-0.5 bg-[linear-gradient(90deg,rgba(167,139,250,0)_0%,rgba(167,139,250,1)_33%,rgba(236,72,153,1)_67%,rgba(236,72,153,0)_100%)]" />

          <CardContent className="p-4 sm:p-6 lg:p-9">
            <div className="flex flex-col lg:flex-row items-center lg:items-center justify-between gap-4 lg:gap-6">
              <div className="flex flex-col gap-2 text-center lg:text-left">
                <Badge className="w-fit mx-auto lg:mx-0 h-auto flex items-center gap-2 bg-[#8b5cf633] rounded-[100px] border border-solid border-[#8b5cf666] px-3 lg:px-[17px] py-1.5">
                  <img
                    className="h-4 w-4"
                    alt="Svg"
                    src="/figmaAssets/svg-7.svg"
                  />
                  <span className="font-bold text-white text-xs tracking-[1.00px] leading-[20.4px]">
                    SECURITY & COMPLIANCE SUPPORT
                  </span>
                </Badge>

                <h3 className="font-bold text-white text-lg lg:text-xl tracking-[-0.70px] leading-[26px]">
                  Need security questionnaires or compliance documentation?
                </h3>

                <p className="font-normal text-slate-300 text-sm lg:text-[15px] tracking-[0] leading-[25.5px]">
                  Request compliance documents for vendor onboarding and
                  security reviews
                </p>
              </div>

              <Button 
                className="h-auto inline-flex items-center justify-center gap-2 px-4 pr-2 py-2 bg-white rounded-[100px] border border-solid border-[#5034ff] hover:bg-white/90"
                data-testid="btn-request-docs"
              >
                <span className="font-normal text-[#5034ff] text-sm lg:text-base tracking-[-0.32px] leading-6 whitespace-nowrap">
                  Request Docs
                </span>
                <img
                  className="w-5 h-5 lg:w-[22.63px] lg:h-[22.63px]"
                  alt="Vuesax outline arrow"
                  src="/figmaAssets/vuesax-outline-arrow-right.svg"
                />
              </Button>
            </div>
          </CardContent>
        </Card>

        <nav className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <div className="flex flex-col gap-4 lg:gap-[22px]">
            <h3 className="font-medium text-[#ffffffbf] text-lg lg:text-xl tracking-[0] leading-[26px]">
              Quick Access
            </h3>
            <ul className="flex flex-col gap-2 lg:gap-[13px]">
              {quickAccessLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    className="font-normal text-[#ffffffbf] text-sm lg:text-base tracking-[0] leading-[26.4px] hover:text-white transition-colors"
                    data-testid={`link-quick-${index}`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4 lg:gap-[22px]">
            <h3 className="font-medium text-[#ffffffbf] text-lg lg:text-xl tracking-[0] leading-[26px]">
              Services
            </h3>
            <ul className="flex flex-col gap-2 lg:gap-[13px]">
              {servicesLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    className="font-normal text-[#ffffffbf] text-sm lg:text-base tracking-[0] leading-[26.4px] hover:text-white transition-colors"
                    data-testid={`link-service-${index}`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4 lg:gap-[22px]">
            <h3 className="font-medium text-[#ffffffbf] text-lg lg:text-xl tracking-[0] leading-[26px]">
              Legal
            </h3>
            <ul className="flex flex-col gap-2 lg:gap-[13px]">
              {legalLinks.map((link, index) => (
                <li key={index} className="flex items-center gap-2 lg:gap-4 flex-wrap">
                  <a
                    href={link.url}
                    className="font-normal text-[#ffffffbf] text-sm lg:text-base tracking-[0] leading-[26.4px] hover:text-white transition-colors"
                    data-testid={`link-legal-${index}`}
                  >
                    {link.name}
                  </a>
                  {link.version && (
                    <Badge className="h-auto bg-[#5034ff26] rounded-lg border border-solid border-[#5034ff4c] px-2 lg:px-[11px] py-1 lg:py-1.5 hover:bg-[#5034ff26]">
                      <span className="font-bold text-[#5034ff] text-xs lg:text-sm tracking-[0] leading-[18.7px]">
                        {link.version}
                      </span>
                    </Badge>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4 lg:gap-[22px]">
            <h3 className="font-medium text-[#ffffffbf] text-lg lg:text-xl tracking-[0] leading-[26px]">
              Trust
            </h3>
            <ul className="flex flex-col gap-2 lg:gap-[13px]">
              {trustLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    className="font-normal text-[#ffffffbf] text-sm lg:text-base tracking-[0] leading-[26.4px] hover:text-white transition-colors"
                    data-testid={`link-trust-${index}`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </footer>
  );
};
