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
    <section className="relative w-full py-16 sm:py-20 lg:py-28 bg-[url(/figmaAssets/wave-svg-1.svg)] bg-cover bg-center overflow-hidden">
      <div className="hidden lg:block absolute top-[-495px] left-1/2 -translate-x-1/2 w-[1440px] h-[1167px] bg-[url(/figmaAssets/frame-2131330643-2.svg)] bg-cover bg-[50%_50%]" />

      <div className="relative w-full max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="relative w-full">
          <div className="hidden lg:block absolute top-[34px] left-1/2 -translate-x-1/2 w-full h-[496px] rounded-[80px] border-[none] before:content-[''] before:absolute before:inset-0 before:p-1 before:rounded-[80px] before:[background:linear-gradient(119deg,rgba(7,98,255,1)_0%,rgba(160,38,192,1)_100%)] before:[-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[-webkit-mask-composite:xor] before:[mask-composite:exclude] before:z-[1] before:pointer-events-none" />

          <div className="flex flex-col items-center space-y-8 lg:space-y-12">
            <div className="flex items-center justify-center">
              {profileImages.map((profile, index) => (
                <div
                  key={index}
                  className="w-12 h-12 sm:w-14 sm:h-14 lg:w-[66px] lg:h-[66px] rounded-full bg-cover bg-center bg-no-repeat -ml-3 first:ml-0 border-2 border-white/20"
                  style={{ backgroundImage: `url(${profile.src})` }}
                  aria-label={profile.alt}
                  data-testid={`profile-${index}`}
                />
              ))}
            </div>

            <div className="flex flex-col items-center gap-4 w-full max-w-[705px] px-4">
              <h2 className="font-normal text-white text-3xl sm:text-4xl lg:text-[52px] text-center tracking-[0] leading-tight lg:leading-[73px]">
                Subscribe to Our Newsletter &amp; Stay Secure
              </h2>

              <p className="font-normal text-[#ffffffbf] text-sm sm:text-base text-center tracking-[0] leading-[26.4px] w-full max-w-[374px]">
                Enter your email to receive expert updates and personalized
                security advice.
              </p>
            </div>

            <div className="w-full max-w-[598px] px-4">
              <div className="relative w-full">
                <div className="absolute inset-0 bg-[#ffffff4c] rounded-full sm:rounded-[32px] backdrop-blur-[3.5px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(3.5px)_brightness(100%)] bg-blend-screen" />

                <div className="relative flex flex-col sm:flex-row items-center gap-2 sm:gap-0 p-2">
                  <Input
                    type="email"
                    placeholder="Enter Email Address"
                    className="w-full bg-transparent border-none font-paragraph-2 text-white text-center sm:text-left tracking-[var(--paragraph-2-letter-spacing)] leading-[var(--paragraph-2-line-height)] placeholder:text-white/70 h-12 sm:h-14 rounded-full sm:rounded-[32px] focus-visible:ring-0 focus-visible:ring-offset-0"
                    data-testid="newsletter-email"
                  />

                  <Button 
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:pl-4 sm:pr-2 py-2 bg-[#5034ff] rounded-full sm:rounded-[100px] border border-solid h-10 sm:h-12 hover:bg-[#5034ff]/90"
                    data-testid="newsletter-submit"
                  >
                    <span className="font-normal text-white text-sm sm:text-base tracking-[-0.32px] leading-6 whitespace-nowrap">
                      Sign-up
                    </span>
                    <img
                      className="w-6 h-6 sm:w-8 sm:h-8 hidden sm:block"
                      alt="Arrow"
                      src="/figmaAssets/frame-2131330617-1.svg"
                    />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
