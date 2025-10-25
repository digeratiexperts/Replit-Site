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

const certifications = [
  { icon: "/figmaAssets/svg-3.svg", text: "Microsoft Partner" },
  { icon: "/figmaAssets/svg-3.svg", text: "Apple Consultants" },
  { icon: "/figmaAssets/svg-13.svg", text: "SOC 2 Type II" },
];

const socialLinks = [
  { text: "in", bgClass: "bg-[#2c3045]" },
  { text: "yt", bgClass: "bg-[#2c3045]" },
  { text: "𝕏", bgClass: "bg-[#2c3045]" },
  { image: "/figmaAssets/link---map.svg" },
];

const quickAccessLinks = [
  "Client Portal",
  "Submit Ticket",
  "Remote Support",
  "Pay Invoice",
  "Knowledge Base",
  "System Status",
];

const servicesLinks = [
  "Managed IT",
  "Cybersecurity",
  "Compliance & Risk",
  "Backup & DR",
  "Networking",
  "UCaaS & VoIP",
];

const legalLinks = [
  { name: "MSA", version: "v2025.1" },
  { name: "SLA", version: "v2025.1" },
  { name: "AUP", version: "v2025.1" },
  { name: "DPA", version: "v2025.1" },
  { name: "Privacy Policy", version: null },
  { name: "Terms of Use", version: null },
  { name: "Sample SOW", version: null },
];

const trustLinks = [
  "Trust Center",
  "Status Page",
  "Vulnerability Disclosure",
  "security.txt",
  "Accessibility",
];

export const BlogSection = (): JSX.Element => {
  return (
    <footer className="relative w-full bg-[url(/figmaAssets/wave-svg.svg)] bg-[100%_100%]">
      <div className="absolute inset-0 bg-[url(/figmaAssets/frame-2131330643.svg)] bg-cover bg-[50%_50%]" />

      <div className="relative max-w-[1440px] mx-auto px-[120px] py-[46px]">
        <div className="text-center text-slate-400 text-sm [font-family:'Inter',Helvetica] font-normal tracking-[0] leading-[23.8px] mb-20">
          © 2025 Digerati Experts, LLC. All rights reserved.
        </div>

        <img
          className="w-[179px] h-12 mb-[54px]"
          alt="Group"
          src="/figmaAssets/group-97-1.png"
        />

        <div className="flex flex-col gap-14 mb-[72px]">
          <section className="flex flex-col gap-[23px]">
            <h2 className="[font-family:'Inter',Helvetica] font-bold text-violet-400 text-[15px] tracking-[1.50px] leading-[25.5px]">
              SERVING GREATER PHOENIX
            </h2>

            <div className="grid grid-cols-6 gap-[15px]">
              {cities.map((city, index) => (
                <Card
                  key={index}
                  className="bg-[#2c3045] border-0 backdrop-blur-[2px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(2px)_brightness(100%)]"
                >
                  <CardContent className="flex items-start gap-5 p-6">
                    <img
                      className="w-[15.29px] h-[15.42px]"
                      alt="Location"
                      src={city.icon}
                    />
                    <div className="[font-family:'Inter',Helvetica] font-normal text-[#e5e9f0] text-[19.1px] leading-[32.5px] tracking-[0] whitespace-nowrap">
                      {city.name}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <div className="flex flex-col gap-[25px]">
            <div className="flex items-center gap-6">
              {certifications.map((cert, index) => (
                <Card
                  key={index}
                  className="bg-[#2c3045] border-0 backdrop-blur-[2px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(2px)_brightness(100%)]"
                >
                  <CardContent className="inline-flex items-start gap-5 p-6">
                    <img
                      className="w-[18px] h-[18px]"
                      alt="Certification"
                      src={cert.icon}
                    />
                    <div className="[font-family:'Inter',Helvetica] font-bold text-[#e5e9f0] text-sm tracking-[0] leading-[23.8px] whitespace-nowrap">
                      {cert.text}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="inline-flex items-center gap-2.5">
              {socialLinks.map((link, index) =>
                link.image ? (
                  <img
                    key={index}
                    className="w-[50px] h-[50px]"
                    alt="Link map"
                    src={link.image}
                  />
                ) : (
                  <Card
                    key={index}
                    className={`${link.bgClass} border-0 backdrop-blur-[2px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(2px)_brightness(100%)]`}
                  >
                    <CardContent className="flex w-[50px] h-[50px] items-center justify-center p-6">
                      <div className="[font-family:'Inter',Helvetica] font-bold text-[#e5e9f0] text-base text-center tracking-[0] leading-[27.2px] whitespace-nowrap">
                        {link.text}
                      </div>
                    </CardContent>
                  </Card>
                ),
              )}
            </div>
          </div>
        </div>

        <Card className="relative mb-[72px] rounded-[20px] overflow-hidden border-2 border-solid border-[#5034ff40] bg-[linear-gradient(90deg,rgba(250,28,255,0.16)_0%,rgba(28,91,255,0.16)_100%)]">
          <div className="absolute w-[calc(100%_-_4px)] top-0 left-0.5 h-0.5 bg-[linear-gradient(90deg,rgba(167,139,250,0)_0%,rgba(167,139,250,1)_33%,rgba(236,72,153,1)_67%,rgba(236,72,153,0)_100%)]" />

          <CardContent className="p-9">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-[7px]">
                <Badge className="w-fit h-auto flex items-center gap-2 bg-[#8b5cf633] rounded-[100px] border border-solid border-[#8b5cf666] px-[17px] py-1.5">
                  <img
                    className="h-4 w-4"
                    alt="Svg"
                    src="/figmaAssets/svg-7.svg"
                  />
                  <span className="[font-family:'Poppins',Helvetica] font-bold text-white text-xs tracking-[1.00px] leading-[20.4px]">
                    COMPLIANCE READY
                  </span>
                </Badge>

                <h3 className="[font-family:'Poppins',Helvetica] font-bold text-white text-xl tracking-[-0.70px] leading-[26px] whitespace-nowrap">
                  Need SOC 2 or Security Documentation?
                </h3>

                <p className="[font-family:'Poppins',Helvetica] font-normal text-slate-300 text-[15px] tracking-[0] leading-[25.5px] whitespace-nowrap">
                  Request compliance documents for vendor onboarding and
                  security reviews
                </p>
              </div>

              <Button className="h-auto inline-flex items-center justify-center gap-2 pl-4 pr-2 py-2 bg-white rounded-[100px] border border-solid border-[#5034ff] hover:bg-white/90">
                <span className="[font-family:'Poppins',Helvetica] font-normal text-[#5034ff] text-base tracking-[-0.32px] leading-6 whitespace-nowrap">
                  Request Docs
                </span>
                <img
                  className="w-[22.63px] h-[22.63px]"
                  alt="Vuesax outline arrow"
                  src="/figmaAssets/vuesax-outline-arrow-right.svg"
                />
              </Button>
            </div>
          </CardContent>
        </Card>

        <nav className="grid grid-cols-4 gap-[331px]">
          <div className="flex flex-col gap-[22px]">
            <h3 className="[font-family:'Poppins',Helvetica] font-medium text-[#ffffffbf] text-xl tracking-[0] leading-[26px]">
              Quick Access
            </h3>
            <ul className="flex flex-col gap-[13px]">
              {quickAccessLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="[font-family:'Poppins',Helvetica] font-normal text-[#ffffffbf] text-base tracking-[0] leading-[26.4px] hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-[22px]">
            <h3 className="[font-family:'Poppins',Helvetica] font-medium text-[#ffffffbf] text-xl tracking-[0] leading-[26px]">
              Services
            </h3>
            <ul className="flex flex-col gap-[13px]">
              {servicesLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="[font-family:'Poppins',Helvetica] font-normal text-[#ffffffbf] text-base tracking-[0] leading-[26.4px] hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-[22px]">
            <h3 className="[font-family:'Poppins',Helvetica] font-medium text-[#ffffffbf] text-xl tracking-[0] leading-[26px]">
              Legal
            </h3>
            <ul className="flex flex-col gap-[13px]">
              {legalLinks.map((link, index) => (
                <li key={index} className="flex items-center gap-4">
                  <a
                    href="#"
                    className="[font-family:'Poppins',Helvetica] font-normal text-[#ffffffbf] text-base tracking-[0] leading-[26.4px] hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                  {link.version && (
                    <Badge className="h-auto bg-[#5034ff26] rounded-lg border border-solid border-[#5034ff4c] px-[11px] py-1.5 hover:bg-[#5034ff26]">
                      <span className="[font-family:'Inter',Helvetica] font-bold text-[#5034ff] text-[11px] tracking-[0] leading-[18.7px]">
                        {link.version}
                      </span>
                    </Badge>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-[22px]">
            <h3 className="[font-family:'Poppins',Helvetica] font-medium text-[#ffffffbf] text-xl tracking-[0] leading-[26px]">
              Trust
            </h3>
            <ul className="flex flex-col gap-[13px]">
              {trustLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="[font-family:'Poppins',Helvetica] font-normal text-[#ffffffbf] text-base tracking-[0] leading-[26.4px] hover:text-white transition-colors"
                  >
                    {link}
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
