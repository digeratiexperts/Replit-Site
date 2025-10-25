import { ChevronDownIcon } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { AboutUsSection } from "./sections/AboutUsSection";
import { BlogSection } from "./sections/BlogSection";
import { CallToActionSection } from "./sections/CallToActionSection";
import { ContactSection } from "./sections/ContactSection";
import { FeaturesSection } from "./sections/FeaturesSection";
import { FooterSection } from "./sections/FooterSection";
import { GallerySection } from "./sections/GallerySection";
import { HeroSection } from "./sections/HeroSection";
import { MainContentSection } from "./sections/MainContentSection";
import { NavigationSection } from "./sections/NavigationSection";
import { PricingSection } from "./sections/PricingSection";
import { ServicesSection } from "./sections/ServicesSection";
import { TestimonialsSection } from "./sections/TestimonialsSection";

const contactInfo = [
  {
    icon: "/figmaAssets/mage-email-opened-fill.svg",
    text: "(123) 456‑7890",
  },
  {
    icon: "/figmaAssets/iconoir-phone-income-solid.svg",
    text: "123 Tech Drive, Suite 400, New York, Ny 10001",
  },
];

const navigationItems = [
  { label: "Solutions" },
  { label: "Industries" },
  { label: "Resources" },
  { label: "About" },
];

const vendorLogos = [
  {
    src: "/figmaAssets/frame-2131330629.svg",
    alt: "Vendor logos",
  },
];

const vendorLogosAbout = [
  {
    src: "/figmaAssets/frame-2131330629-1.svg",
    alt: "Vendor logos about",
  },
];

export const Homepage = (): JSX.Element => {
  return (
    <div className="bg-white w-full min-h-screen relative flex flex-col">
      <div className="relative w-full">
        <img
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1440px] h-[998px] pointer-events-none"
          alt="Frame"
          src="/figmaAssets/frame-2131330714.svg"
        />

        <header className="relative w-full max-w-[1440px] mx-auto">
          <div className="flex items-center justify-between px-[120px] py-4 border-b border-[#0000001f]">
            {contactInfo.map((info, index) => (
              <div key={index} className="inline-flex items-center gap-3">
                <img
                  className="w-6 h-6"
                  alt={`Contact icon ${index}`}
                  src={info.icon}
                />
                <div className="[font-family:'Poppins',Helvetica] font-normal text-white text-sm leading-[26px] whitespace-nowrap">
                  {info.text}
                </div>
              </div>
            ))}
          </div>

          <nav className="flex items-center gap-[92px] px-[120px] py-6">
            <div className="flex items-center gap-8">
              <img
                className="w-[178.78px] h-12"
                alt="Logo"
                src="/figmaAssets/group-97.png"
              />

              <div className="flex items-center justify-center gap-8">
                {navigationItems.map((item, index) => (
                  <button
                    key={index}
                    className="inline-flex items-center gap-1 bg-transparent border-none cursor-pointer"
                  >
                    <span className="[font-family:'Poppins',Helvetica] font-normal text-white text-base text-center leading-[24.8px] whitespace-nowrap">
                      {item.label}
                    </span>
                    <ChevronDownIcon className="w-6 h-6 text-white" />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 ml-auto">
              <Button
                variant="secondary"
                className="h-12 px-4 py-2 bg-white rounded-[100px] gap-2 hover:bg-white/90"
              >
                <span className="[font-family:'Poppins',Helvetica] font-normal text-[#5034ff] text-base tracking-[-0.32px] leading-6">
                  Emergency Support
                </span>
                <img
                  className="w-[22.63px] h-[22.63px]"
                  alt="Arrow right"
                  src="/figmaAssets/vuesax-outline-arrow-right.svg"
                />
              </Button>

              <Button className="h-auto px-4 py-2 bg-[#5034ff] rounded-[100px] gap-2 border border-solid hover:bg-[#5034ff]/90">
                <span className="[font-family:'Poppins',Helvetica] font-normal text-white text-base tracking-[-0.32px] leading-6">
                  Book a Meeting
                </span>
                <img
                  className="w-8 h-8"
                  alt="Frame"
                  src="/figmaAssets/frame-2131330617-1.svg"
                />
              </Button>
            </div>
          </nav>
        </header>
      </div>

      <NavigationSection />

      <main className="relative w-full flex flex-col">
        <HeroSection />

        <section className="relative w-full max-w-[1440px] mx-auto">
          <FeaturesSection />
        </section>

        <section className="relative w-full max-w-[1440px] mx-auto">
          <ServicesSection />
        </section>

        <section className="relative w-full max-w-[1440px] mx-auto flex flex-col items-center gap-2 py-8">
          <p className="[font-family:'Poppins',Helvetica] font-normal text-[#020029bf] text-base text-center leading-[26.4px]">
            Strategic Vendors. Proven Results.
          </p>
          {vendorLogos.map((logo, index) => (
            <img
              key={index}
              className="w-full h-[122px]"
              alt={logo.alt}
              src={logo.src}
            />
          ))}
        </section>

        <section className="relative w-full max-w-[1440px] mx-auto">
          <TestimonialsSection />
        </section>

        <section
          className="relative w-full max-w-[1440px] mx-auto flex flex-col items-center gap-[252px] px-[120px] py-[100px]"
          style={{
            background:
              "url(/figmaAssets/background-1.png) 50% 50% / cover, linear-gradient(0deg,rgba(3,2,40,1) 0%,rgba(3,2,40,1) 100%)",
          }}
        >
          <div className="flex flex-col items-start gap-2 w-full">
            <p className="w-full [font-family:'Poppins',Helvetica] font-normal text-[#ffffffbf] text-base text-center leading-[26.4px]">
              Proudly Protecting Businesses Since [Year]
            </p>
            {vendorLogosAbout.map((logo, index) => (
              <img
                key={index}
                className="w-full h-[162px] -ml-[120px] -mr-[120px]"
                alt={logo.alt}
                src={logo.src}
              />
            ))}
          </div>
        </section>

        <section className="relative w-full max-w-[1440px] mx-auto">
          <AboutUsSection />
        </section>

        <section className="relative w-full max-w-[1440px] mx-auto">
          <MainContentSection />
        </section>

        <section className="relative w-full max-w-[1440px] mx-auto">
          <ContactSection />
        </section>

        <section className="relative w-full max-w-[1440px] mx-auto">
          <PricingSection />
        </section>

        <section className="relative w-full max-w-[1440px] mx-auto">
          <BlogSection />
        </section>

        <section className="relative w-full max-w-[1440px] mx-auto">
          <GallerySection />
        </section>

        <section className="relative w-full max-w-[1440px] mx-auto">
          <CallToActionSection />
        </section>
      </main>

      <FooterSection />
    </div>
  );
};
