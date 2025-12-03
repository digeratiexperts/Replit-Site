import React from "react";

const vendorLogos = [
  { src: "/figmaAssets/frame-2131330669.svg", alt: "Vendor logo 1" },
  { src: "/figmaAssets/frame-2131330669.svg", alt: "Vendor logo 2" },
  { src: "/figmaAssets/frame-2131330669.svg", alt: "Vendor logo 3" },
  { src: "/figmaAssets/frame-2131330669.svg", alt: "Vendor logo 4" },
  { src: "/figmaAssets/frame-2131330669.svg", alt: "Vendor logo 5" },
  { src: "/figmaAssets/frame-2131330669.svg", alt: "Vendor logo 6" },
];

export const NavigationSection = (): JSX.Element => {
  return (
    <section className="w-full flex justify-center py-8 md:py-12">
      <div className="flex flex-col lg:flex-row w-full max-w-[1200px] items-center lg:items-start gap-8 lg:gap-12 px-4">
        <div 
          className="relative w-full max-w-[214px] aspect-[214/296] flex-shrink-0 bg-[url(/figmaAssets/img.png)] bg-cover bg-center rounded-lg" 
          data-testid="vendor-image"
        />

        <div className="flex flex-col flex-1 items-center lg:items-start gap-8">
          <div className="inline-flex flex-col items-center lg:items-start gap-8 lg:gap-[45px] w-full">
            <div className="flex flex-col items-center lg:items-start gap-3 w-full">
              <h2 className="[font-family:'Poppins',Helvetica] font-normal text-[#020029] text-2xl md:text-[32px] tracking-[0] leading-normal text-center lg:text-left">
                Elite Cyber Partnerships, Backed by Experience
              </h2>

              <p className="[font-family:'Inter',Helvetica] font-normal text-[#020029] text-sm md:text-base tracking-[0] leading-6 text-center lg:text-left">
                At Digerati Experts, we don&apos;t just connect you with
                technology — we bring you the strategic advantage of working
                with the industry&#39;s most trusted cybersecurity vendors.
                Every tool we deploy is selected with purpose, tested in the
                field, &amp; supported by decades of real-world insight.
              </p>
            </div>

            <div className="flex flex-col items-center lg:items-start gap-4 w-full">
              <h3 className="[font-family:'Poppins',Helvetica] font-normal text-[#020029] text-2xl md:text-[32px] tracking-[0] leading-normal text-center lg:text-left">
                Strategic Vendors. Proven Results.
              </h3>

              <p className="[font-family:'Inter',Helvetica] font-normal text-[#020029] text-sm md:text-base tracking-[0] leading-6 text-center lg:text-left">
                Backed by 20+ years of expertise, Digerati Experts partners with
                top-tier vendors across every area of cybersecurity. More than
                just a distributor, we empower our clients and partners through
                training, expert guidance, and real-world strategies that build
                lasting cyber resilience.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center lg:justify-start gap-4 flex-wrap">
            {vendorLogos.map((logo, index) => (
              <img 
                key={index} 
                className="h-10 md:h-12" 
                alt={logo.alt} 
                src={logo.src} 
                data-testid={`vendor-logo-${index}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
