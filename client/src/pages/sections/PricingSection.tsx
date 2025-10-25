import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const PricingSection = (): JSX.Element => {
  return (
    <section className="flex items-center justify-between gap-16 w-full">
      <div className="flex flex-col items-start gap-[18px] flex-1">
        <Badge
          variant="outline"
          className="h-[41.8px] px-[21px] bg-[#5034ff1f] border-[#5034ff4c] rounded-[100px] backdrop-blur-[6px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(6px)_brightness(100%)]"
        >
          <div className="w-2 h-2 bg-[#020029] rounded mr-[18px]" />
          <span className="[font-family:'Inter',Helvetica] font-bold text-[#020029] text-sm tracking-[0] leading-[23.8px] whitespace-nowrap">
            24/7 Security Response Team
          </span>
        </Badge>

        <div className="flex flex-col items-start gap-4 w-full">
          <h2 className="[font-family:'Poppins',Helvetica] font-normal text-[#020029] text-[52px] tracking-[0] leading-[73px]">
            Need immediate assistance?
          </h2>

          <p className="[font-family:'Poppins',Helvetica] font-normal text-[#020029bf] text-base tracking-[0] leading-[26.4px]">
            Expert cybersecurity support when you need it most
          </p>
        </div>
      </div>

      <Button className="h-12 px-4 py-2 bg-[#5034ff] hover:bg-[#5034ff]/90 rounded-[100px] border border-solid gap-2">
        <span className="[font-family:'Poppins',Helvetica] font-normal text-white text-base tracking-[-0.32px] leading-6 whitespace-nowrap">
          Report Incident
        </span>
        <img
          className="w-8 h-8"
          alt="Frame"
          src="/figmaAssets/frame-2131330617-1.svg"
        />
      </Button>
    </section>
  );
};
