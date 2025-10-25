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
      <div className="relative w-full bg-gradient-to-b from-[#030228] to-transparent">
        <img
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1440px] h-[998px] pointer-events-none z-0"
          alt="Frame"
          src="/figmaAssets/frame-2131330714.svg"
        />

        <header className="relative w-full max-w-[1440px] mx-auto z-10">
          <div className="hidden md:flex items-center justify-between px-4 md:px-8 lg:px-[120px] py-4 border-b border-white/10 bg-[#030228]/80 backdrop-blur-sm">
            {contactInfo.map((info, index) => (
              <div key={index} className="inline-flex items-center gap-3" data-testid={`contact-info-${index}`}>
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

          <nav className="flex flex-col items-center gap-4 px-4 md:px-8 lg:px-[120px] py-6 bg-[#030228]/60 backdrop-blur-md">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-8 w-full">
              <img
                className="w-[178.78px] h-12"
                alt="Logo"
                src="/figmaAssets/group-97.png"
                data-testid="logo-header"
              />

              <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-8">
                {navigationItems.map((item, index) => (
                  <button
                    key={index}
                    data-testid={`nav-link-${item.label.toLowerCase()}`}
                    className="inline-flex items-center gap-1 bg-transparent border-none cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    <span className="[font-family:'Poppins',Helvetica] font-normal text-white text-sm lg:text-base text-center leading-[24.8px] whitespace-nowrap">
                      {item.label}
                    </span>
                    <ChevronDownIcon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
              <Button
                variant="secondary"
                data-testid="button-emergency-support"
                className="w-full sm:w-auto h-12 px-4 py-2 bg-white rounded-[100px] gap-2 hover:bg-white/90"
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

              <Button 
                data-testid="button-book-meeting"
                className="w-full sm:w-auto h-auto px-4 py-2 bg-[#5034ff] rounded-[100px] gap-2 border border-solid hover:bg-[#5034ff]/90">
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
          className="relative w-full max-w-[1440px] mx-auto flex flex-col items-center gap-12 md:gap-24 lg:gap-[252px] px-4 md:px-8 lg:px-[120px] py-12 md:py-16 lg:py-[100px]"
          style={{
            background:
              "url(/figmaAssets/background-1.png) 50% 50% / cover, linear-gradient(0deg,rgba(3,2,40,1) 0%,rgba(3,2,40,1) 100%)",
          }}
        >
          <div className="flex flex-col items-center gap-2 w-full">
            <p className="w-full [font-family:'Poppins',Helvetica] font-normal text-[#ffffffbf] text-base text-center leading-[26.4px]">
              Proudly Protecting Businesses Since [Year]
            </p>
            <div className="w-full overflow-hidden">
              {vendorLogosAbout.map((logo, index) => (
                <img
                  key={index}
                  className="w-full h-auto max-h-[162px] object-contain"
                  alt={logo.alt}
                  src={logo.src}
                />
              ))}
            </div>
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
