import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const profileImages = [
  { src: "/figmaAssets/image-24-png.png", alt: "Profile 1" },
  { src: "/figmaAssets/image-24-png-1.png", alt: "Profile 2" },
  { src: "/figmaAssets/image-24-png-2.png", alt: "Profile 3" },
  { src: "/figmaAssets/image-24-png-3.png", alt: "Profile 4" },
  { src: "/figmaAssets/image-24-png-4.png", alt: "Profile 5" },
  { src: "/figmaAssets/image-24-png-5.png", alt: "Profile 6" },
  { src: "/figmaAssets/image-24-png-6.png", alt: "Profile 7" },
];

export const CallToActionSection = (): JSX.Element => {
  return (
    <section className="relative w-full h-[765px] bg-[url(/figmaAssets/wave-svg-1.svg)] bg-[100%_100%]">
      <div className="absolute top-[-495px] left-1/2 -translate-x-1/2 w-[1440px] h-[1167px] bg-[url(/figmaAssets/frame-2131330643-2.svg)] bg-cover bg-[50%_50%]" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1200px] h-[530px] px-4">
        <div className="relative w-full h-full">
          <div className="absolute top-[34px] left-1/2 -translate-x-1/2 w-full h-[496px] rounded-[80px] border-[none] before:content-[''] before:absolute before:inset-0 before:p-1 before:rounded-[80px] before:[background:linear-gradient(119deg,rgba(7,98,255,1)_0%,rgba(160,38,192,1)_100%)] before:[-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[-webkit-mask-composite:xor] before:[mask-composite:exclude] before:z-[1] before:pointer-events-none" />

          <div className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center justify-center gap-0 w-[360px] h-[66px]">
            {profileImages.map((profile, index) => (
              <div
                key={index}
                className="w-[66px] h-[66px] rounded-full bg-cover bg-center bg-no-repeat -ml-[17px] first:ml-0"
                style={{ backgroundImage: `url(${profile.src})` }}
                aria-label={profile.alt}
              />
            ))}
          </div>

          <div className="absolute top-[143px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 w-full max-w-[705px]">
            <h2 className="[font-family:'Poppins',Helvetica] font-normal text-white text-[52px] text-center tracking-[0] leading-[73px]">
              Subscribe to Our Newsletter &amp; Stay Secure
            </h2>

            <p className="[font-family:'Poppins',Helvetica] font-normal text-[#ffffffbf] text-base text-center tracking-[0] leading-[26.4px] w-full max-w-[374px]">
              Enter your email to receive expert updates and personalized
              security advice.
            </p>
          </div>

          <div className="absolute top-[394px] left-1/2 -translate-x-1/2 w-full max-w-[598px] h-16">
            <div className="relative w-full h-16">
              <div className="absolute inset-0 bg-[#ffffff4c] rounded-[32px] backdrop-blur-[3.5px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(3.5px)_brightness(100%)] bg-blend-screen" />

              <Input
                type="email"
                placeholder="Enter Email Adress"
                className="absolute inset-0 bg-transparent border-none font-paragraph-2 font-[number:var(--paragraph-2-font-weight)] text-white text-[length:var(--paragraph-2-font-size)] text-center tracking-[var(--paragraph-2-letter-spacing)] leading-[var(--paragraph-2-line-height)] placeholder:text-white h-16 rounded-[32px]"
              />

              <Button className="absolute top-[7px] right-[7px] flex items-center justify-center gap-2 pl-4 pr-2 py-2 bg-[#5034ff] rounded-[100px] border border-solid h-12 hover:bg-[#5034ff]/90">
                <span className="[font-family:'Poppins',Helvetica] font-normal text-white text-base tracking-[-0.32px] leading-6 whitespace-nowrap">
                  Sign-up
                </span>
                <img
                  className="w-8 h-8"
                  alt="Arrow"
                  src="/figmaAssets/frame-2131330617-1.svg"
                />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
