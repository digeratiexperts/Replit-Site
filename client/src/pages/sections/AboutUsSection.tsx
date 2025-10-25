import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const checklistItems = [
  "Cyber Risk Scan",
  "Full Report",
  "Executive Consultation",
];

export const AboutUsSection = (): JSX.Element => {
  return (
    <section className="w-full flex items-center justify-center py-20">
      <div className="flex items-center gap-[266px] max-w-[1468px] w-full px-4">
        <div className="flex flex-col w-[409.29px] items-start gap-[60px]">
          <div className="flex flex-col items-start gap-4 w-full">
            <h2 className="[font-family:'Poppins',Helvetica] font-normal text-[#020029] text-[52px] tracking-[0] leading-[73px]">
              Get a $20,000 Pen Test – Free
            </h2>

            <p className="[font-family:'Poppins',Helvetica] font-normal text-[#020029bf] text-base tracking-[0] leading-[26.4px]">
              Discover vulnerabilities before attackers do
              <br />– without paying a cent.
            </p>
          </div>

          <div className="flex flex-col w-[306.8px] items-start gap-2.5">
            <img
              className="w-full"
              alt="Frame"
              src="/figmaAssets/frame-2131330691.svg"
            />

            <p className="[font-family:'Poppins',Helvetica] font-normal text-[#020029bf] text-base tracking-[0] leading-[26.4px]">
              Trusted by 100+ Arizona
              <br />
              Businesses.
            </p>
          </div>
        </div>

        <Card className="bg-[#f0f3ff] rounded-[30px] shadow-[-11px_16px_32px_-9px_#0000001a] backdrop-blur-[23px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(23px)_brightness(100%)] border-0">
          <CardContent className="p-8">
            <div className="flex flex-col w-[463.29px] items-end gap-2">
              <div className="flex flex-col items-start gap-[25px] w-full">
                <div className="flex flex-col items-start gap-[26px] w-full">
                  <div className="flex flex-col items-start gap-[30px] w-full">
                    <Input
                      placeholder="Full Name"
                      className="h-[50px] border-[#0000001f] rounded-[25px] border border-solid shadow-[inset_0px_1px_1px_#00000013] backdrop-blur-[15px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(15px)_brightness(100%)] bg-transparent [font-family:'Inter',Helvetica] font-normal text-[#c5c5c5] text-[13px] tracking-[0] leading-[normal] placeholder:text-[#c5c5c5]"
                    />

                    <Input
                      placeholder="Company"
                      className="h-[50px] border-[#0000001f] rounded-[25px] border border-solid shadow-[inset_0px_1px_1px_#00000013] backdrop-blur-[15px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(15px)_brightness(100%)] bg-transparent [font-family:'Inter',Helvetica] font-normal text-[#c5c5c5] text-[13px] tracking-[0] leading-[normal] placeholder:text-[#c5c5c5]"
                    />

                    <Input
                      placeholder="Email"
                      type="email"
                      className="h-[50px] border-[#0000001f] rounded-[25px] border border-solid shadow-[inset_0px_1px_1px_#00000013] backdrop-blur-[15px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(15px)_brightness(100%)] bg-transparent [font-family:'Inter',Helvetica] font-normal text-[#c5c5c5] text-[13px] tracking-[0] leading-[normal] placeholder:text-[#c5c5c5]"
                    />

                    <Input
                      placeholder="Phone (optional)"
                      type="tel"
                      className="h-[50px] border-[#0000001f] rounded-[25px] border border-solid shadow-[inset_0px_1px_1px_#00000013] backdrop-blur-[15px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(15px)_brightness(100%)] bg-transparent [font-family:'Inter',Helvetica] font-normal text-[#c5c5c5] text-[13px] tracking-[0] leading-[normal] placeholder:text-[#c5c5c5]"
                    />
                  </div>

                  <Button className="h-12 w-full bg-[#5034ff] rounded-[100px] border border-solid hover:bg-[#5034ff]/90 px-4 py-2 gap-2">
                    <span className="[font-family:'Poppins',Helvetica] font-normal text-white text-base tracking-[-0.32px] leading-6 whitespace-nowrap">
                      Schedule My 26-minute Meeting
                    </span>

                    <img
                      className="w-[75.61px] h-8"
                      alt="Frame"
                      src="/figmaAssets/frame-2131330617.svg"
                    />
                  </Button>
                </div>

                <div className="flex flex-col w-[200px] items-start justify-center gap-2 px-2.5 py-0">
                  {checklistItems.map((item, index) => (
                    <div
                      key={index}
                      className="relative w-[149px] h-[19px] [background:url(../figmaAssets/item-2.png)_50%_50%_/_cover]"
                    >
                      <div className="absolute top-[-3px] left-[31px] h-6 flex items-center justify-center [font-family:'Poppins',Helvetica] font-normal text-[#020029bf] text-sm tracking-[0] leading-[23.8px] whitespace-nowrap">
                        {item}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <p className="w-[455px] [font-family:'Poppins',Helvetica] font-normal text-[#020029bf] text-sm tracking-[0] leading-[23.8px]">
                All information submitted is protected and handled in compliance
                with our Privacy Policy.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
