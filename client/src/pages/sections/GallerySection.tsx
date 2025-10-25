import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const contactCards = [
  {
    icon: "/figmaAssets/background-2.svg",
    label: "CALL US",
    value: "(480) 519-5892",
  },
  {
    icon: "/figmaAssets/background-3.svg",
    label: "EMAIL US",
    value: "admin@digerati-experts.com",
  },
];

export const GallerySection = (): JSX.Element => {
  return (
    <section className="flex flex-col w-full items-start gap-3.5">
      <div className="flex flex-col items-start gap-[21px] w-full">
        <div className="grid grid-cols-2 gap-6 w-full">
          {contactCards.map((card, index) => (
            <Card
              key={index}
              className="bg-[#100a25] rounded-2xl border border-solid border-[#f0f3ff] shadow-[-11px_16px_32px_-9px_#0000001a] backdrop-blur-[23px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(23px)_brightness(100%)]"
            >
              <CardContent className="flex items-center gap-[21px] p-[21px] h-[100px]">
                <img className="w-14 h-14" alt={card.label} src={card.icon} />
                <div className="flex flex-col gap-[11px]">
                  <div className="[font-family:'Inter',Helvetica] font-bold text-slate-400 text-xs tracking-[1.00px] leading-[20.4px] whitespace-nowrap">
                    {card.label}
                  </div>
                  <div className="[font-family:'Inter',Helvetica] font-bold text-[#e5e9f0] text-base tracking-[0] leading-[27.2px] whitespace-nowrap">
                    {card.value}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="w-full bg-[#100a25] rounded-2xl border border-solid border-[#f0f3ff] shadow-[-11px_16px_32px_-9px_#0000001a] backdrop-blur-[23px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(23px)_brightness(100%)]">
          <CardContent className="flex items-center gap-[36px] p-[21px] h-[99px]">
            <img
              className="w-5 h-5"
              alt="Location"
              src="/figmaAssets/svg-14.svg"
            />
            <div className="flex flex-col gap-2">
              <div className="[font-family:'Inter',Helvetica] font-bold text-[#e5e9f0] text-base tracking-[0] leading-[27.2px] whitespace-nowrap">
                Chandler, Arizona
              </div>
              <div className="[font-family:'Inter',Helvetica] font-normal text-slate-300 text-sm tracking-[0] leading-[23.8px] whitespace-nowrap">
                Mon-Fri, 8am-5pm • Emergency 24/7
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
