import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const leftCardInputs = [
  {
    id: "industry",
    label: "Industry",
    value: "General Office (1.6×)",
    fullWidth: true,
  },
  {
    id: "employees",
    label: "Employees Affected",
    value: "25",
    fullWidth: false,
  },
  {
    id: "wage",
    label: "Avg Hourly Wage ($)",
    value: "35",
    fullWidth: false,
  },
  {
    id: "downtime",
    label: "Expected Downtime (hours)",
    value: "4",
    fullWidth: true,
  },
];

const costEstimates = [
  { label: "Per-Incident Cost", value: "$0.00" },
  { label: "Annual Downtime Cost", value: "$0.00" },
  { label: "Data-at-Risk per Incident (RPO)", value: "$0.00" },
];

const rightCardInputs = [
  {
    id: "numEmployees",
    label: "Number of Employees",
    value: "10",
  },
  {
    id: "servicePackage",
    label: "Service Package",
    value: "Basic IT (ladder pricing)",
  },
  {
    id: "devices",
    label: "Devices to manage (mobile)",
    value: "0",
  },
  {
    id: "sites",
    label: "Sites to Support",
    value: "1",
  },
];

export const HeroSection = (): JSX.Element => {
  return (
    <section className="flex flex-col w-full items-start justify-around gap-[252px] px-[120px] py-[100px] relative [background:url(../figmaAssets/background-1.png)_50%_50%_/_cover,linear-gradient(0deg,rgba(3,2,40,1)_0%,rgba(3,2,40,1)_100%)]">
      <div className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto]">
        <Card className="inline-flex items-center gap-2.5 px-0 py-14 relative flex-[0_0_auto] bg-[#f0f3ff] rounded-[30px] overflow-hidden border border-solid border-[#333333] shadow-[-11px_16px_32px_-9px_#0000001a] backdrop-blur-[23px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(23px)_brightness(100%)]">
          <CardContent className="relative w-[554px] h-[993px] p-0">
            <div className="inline-flex flex-col items-center gap-4 absolute top-0 left-[calc(50.00%_-_224px)]">
              <h2 className="relative flex items-center justify-center w-[442px] mt-[-1.00px] [font-family:'Poppins',Helvetica] font-normal text-[#020029] text-[32px] text-center tracking-[0] leading-[normal]">
                What&apos;s Downtime Really Costing You?
              </h2>

              <p className="relative flex items-center justify-center self-stretch h-12 [font-family:'Poppins',Helvetica] font-normal text-[#020029bf] text-base text-center tracking-[0] leading-[26.4px]">
                Quick estimate now. Open advanced to factor
                <br />
                RTO/RPO and annual impact.
              </p>
            </div>

            <div className="flex flex-col w-[452px] items-start gap-4 absolute top-[187px] left-[calc(50.00%_-_228px)]">
              <div className="relative self-stretch w-full h-[77px]">
                <Label className="absolute top-[3px] left-0 w-[62px] h-5 text-[#020029] text-base leading-[27.2px] flex items-center justify-center [font-family:'Inter',Helvetica] font-normal tracking-[0] whitespace-nowrap">
                  {leftCardInputs[0].label}
                </Label>

                <div className="absolute w-full top-[27px] left-0 h-[50px] border-[#0000001f] flex rounded-[25px] border border-solid shadow-[inset_0px_1px_1px_#00000013] backdrop-blur-[15px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(15px)_brightness(100%)]">
                  <Input
                    defaultValue={leftCardInputs[0].value}
                    className="flex items-center justify-center mt-[17px] w-full h-4 ml-3.5 [font-family:'Inter',Helvetica] font-normal text-[#020029] text-[13px] tracking-[0] leading-4 border-0 bg-transparent shadow-none focus-visible:ring-0"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 relative self-stretch w-full flex-[0_0_auto]">
                <div className="relative w-[220px] h-[77px]">
                  <Label className="absolute top-[3px] left-0 w-[152px] h-5 flex items-center justify-center [font-family:'Inter',Helvetica] font-normal text-[#020029] text-base tracking-[0] leading-[27.2px] whitespace-nowrap">
                    {leftCardInputs[1].label}
                  </Label>

                  <div className="absolute w-full top-[27px] left-0 h-[50px] flex overflow-hidden border-[#0000001f] rounded-[25px] border border-solid shadow-[inset_0px_1px_1px_#00000013] backdrop-blur-[15px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(15px)_brightness(100%)]">
                    <Input
                      defaultValue={leftCardInputs[1].value}
                      className="mt-[17.0px] w-[16.02px] ml-2.5 text-[#020029] flex items-center justify-center h-4 [font-family:'Inter',Helvetica] font-normal text-[13px] tracking-[0] leading-[normal] border-0 bg-transparent shadow-none focus-visible:ring-0"
                    />
                  </div>
                </div>

                <div className="relative w-[220px] h-[77px]">
                  <Label className="absolute top-[3px] left-0 w-[157px] h-5 flex items-center justify-center [font-family:'Inter',Helvetica] font-normal text-[#020029] text-base tracking-[0] leading-[27.2px] whitespace-nowrap">
                    {leftCardInputs[2].label}
                  </Label>

                  <div className="absolute w-full top-[27px] left-0 h-[50px] flex overflow-hidden border-[#0000001f] rounded-[25px] border border-solid shadow-[inset_0px_1px_1px_#00000013] backdrop-blur-[15px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(15px)_brightness(100%)]">
                    <Input
                      defaultValue={leftCardInputs[2].value}
                      className="mt-[17.0px] w-[16.32px] ml-2.5 text-[#020029] flex items-center justify-center h-4 [font-family:'Inter',Helvetica] font-normal text-[13px] tracking-[0] leading-[normal] border-0 bg-transparent shadow-none focus-visible:ring-0"
                    />
                  </div>
                </div>
              </div>

              <div className="relative self-stretch w-full h-[77px]">
                <Label className="absolute top-[3px] left-0 w-[211px] h-5 flex items-center justify-center [font-family:'Inter',Helvetica] font-normal text-[#020029] text-base tracking-[0] leading-[27.2px] whitespace-nowrap">
                  {leftCardInputs[3].label}
                </Label>

                <div className="absolute w-full top-[27px] left-0 h-[50px] flex overflow-hidden border-[#0000001f] rounded-[25px] border border-solid shadow-[inset_0px_1px_1px_#00000013] backdrop-blur-[15px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(15px)_brightness(100%)]">
                  <Input
                    defaultValue={leftCardInputs[3].value}
                    className="mt-[17px] w-[8.8px] ml-2.5 text-[#020029] flex items-center justify-center h-4 [font-family:'Inter',Helvetica] font-normal text-[13px] tracking-[0] leading-[normal] border-0 bg-transparent shadow-none focus-visible:ring-0"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col w-[452px] items-start gap-4 absolute top-[482px] left-[49px]">
              <Button className="flex relative self-stretch w-full flex-[0_0_auto] items-center justify-center gap-2 pl-4 pr-2 py-2 bg-[#5034ff] rounded-[100px] border border-solid h-auto hover:bg-[#5034ff]/90">
                <span className="relative w-fit [font-family:'Poppins',Helvetica] font-normal text-white text-base tracking-[-0.32px] leading-6 whitespace-nowrap">
                  Advanced (rto/rpo &amp; Annual)
                </span>

                <img
                  className="relative w-8 h-8"
                  alt="Frame"
                  src="/figmaAssets/frame-2131330617-1.svg"
                />
              </Button>

              <Button
                variant="outline"
                className="flex relative self-stretch w-full h-12 items-center justify-center gap-2 pl-4 pr-2 py-2 bg-white rounded-[100px] border border-solid border-[#5034ff] hover:bg-[#5034ff]/10"
              >
                <span className="relative w-fit [font-family:'Poppins',Helvetica] font-normal text-[#5034ff] text-base tracking-[-0.32px] leading-6 whitespace-nowrap">
                  Calculate
                </span>

                <img
                  className="relative w-[22.63px] h-[22.63px]"
                  alt="Vuesax outline arrow"
                  src="/figmaAssets/vuesax-outline-arrow-right.svg"
                />
              </Button>
            </div>

            <div className="flex flex-col w-[420px] items-start justify-center gap-2 absolute top-[686px] left-[calc(50.00%_-_212px)]">
              {costEstimates.map((estimate, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto]"
                >
                  <div className="relative flex items-center justify-center w-fit mt-[-1.00px] [font-family:'Poppins',Helvetica] font-normal text-[#02002980] text-base tracking-[0] leading-[27.2px] whitespace-nowrap">
                    {estimate.label}
                  </div>

                  <div className="relative w-fit mt-[-1.00px] [font-family:'Poppins',Helvetica] font-normal text-[#020029] text-base leading-[27.2px] flex items-center justify-center tracking-[0] whitespace-nowrap">
                    {estimate.value}
                  </div>
                </div>
              ))}
            </div>

            <Button className="flex w-[calc(100%_-_134px)] h-12 items-center justify-center gap-2 pl-4 pr-2 py-2 absolute top-[822px] left-[65px] bg-[#5034ff] rounded-[100px] border border-solid hover:bg-[#5034ff]/90">
              <span className="relative w-[187.19px] h-[22px] [font-family:'Poppins',Helvetica] font-normal text-white text-base tracking-[-0.32px] leading-6 whitespace-nowrap">
                Rto Status: Enter Values
              </span>
            </Button>

            <p className="absolute top-[889px] left-[65px] w-[406px] h-11 flex items-center justify-center [font-family:'Poppins',Helvetica] font-normal text-[#02002980] text-base tracking-[0] leading-[27.2px]">
              Estimates only. Advanced fields reflect RTO/RPO best practices and
              incident frequency.
            </p>

            <button className="absolute top-[969px] left-[65px] text-[#5034ff] [font-family:'Poppins',Helvetica] font-normal text-base tracking-[-0.32px] leading-6 whitespace-nowrap bg-transparent border-0 cursor-pointer">
              Open Detailed Calculator →
            </button>

            <img
              className="absolute top-[639px] left-0 w-[550px] h-px object-cover"
              alt="Line"
              src="/figmaAssets/line-4.svg"
            />
          </CardContent>
        </Card>

        <Card className="relative self-stretch w-[531px] mt-[-1.00px] mb-[-1.00px] mr-[-1.00px] bg-[#100a25] rounded-[30px] overflow-hidden border border-solid border-[#f0f3ff] shadow-[-11px_16px_32px_-9px_#0000001a] backdrop-blur-[23px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(23px)_brightness(100%)]">
          <CardContent className="relative top-[47px] left-[39px] w-[454px] h-[935px] flex flex-col p-0">
            <div className="flex -ml-0.5 h-[155px] w-[382px] self-center relative flex-col items-center gap-1.5">
              <h2 className="relative flex items-center justify-center self-stretch mt-[-1.00px] [font-family:'Poppins',Helvetica] font-normal text-white text-[32px] text-center tracking-[0] leading-[normal]">
                Estimate Your Service Cost Now
              </h2>

              <p className="relative flex items-center justify-center self-stretch [font-family:'Poppins',Helvetica] font-normal text-[#ffffffbf] text-base text-center tracking-[0] leading-[26.4px]">
                Get an instant quote based on your needs and team size.
              </p>
            </div>

            <div className="ml-[10.5px] mr-[12.5px] flex-1 max-h-[86.19px] mt-[17.8px] flex flex-col gap-[4.2px]">
              <Label className="flex items-center justify-center w-[167.89px] h-5 mt-[3px] [font-family:'Inter',Helvetica] font-normal text-white text-base tracking-[0] leading-[27.2px] whitespace-nowrap">
                {rightCardInputs[0].label}
              </Label>

              <div className="flex-1 max-h-[50px] flex overflow-hidden border-[#f0f3ff80] rounded-[25px] border border-solid shadow-[inset_0px_1px_1px_#00000013] backdrop-blur-[15px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(15px)_brightness(100%)]">
                <Input
                  defaultValue={rightCardInputs[0].value}
                  className="mt-[17px] ml-2.5 mr-[25px] flex-1 flex overflow-scroll w-[14.17px] text-white items-center justify-center h-4 [font-family:'Inter',Helvetica] font-normal text-[13px] tracking-[0] leading-[normal] border-0 bg-transparent shadow-none focus-visible:ring-0"
                />
              </div>
            </div>

            <div className="ml-[10.5px] mr-[12.5px] flex-1 max-h-[86.19px] mt-[2.0px] flex flex-col gap-[4.2px]">
              <Label className="flex items-center justify-center w-[127.35px] h-5 mt-[3px] [font-family:'Inter',Helvetica] font-normal text-white text-base tracking-[0] leading-[27.2px] whitespace-nowrap">
                {rightCardInputs[1].label}
              </Label>

              <div className="flex-1 max-h-[50px] items-center border-[#f0f3ff80] flex rounded-[25px] border border-solid shadow-[inset_0px_1px_1px_#00000013] backdrop-blur-[15px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(15px)_brightness(100%)]">
                <Input
                  defaultValue={rightCardInputs[1].value}
                  className="h-[18px] ml-3.5 mr-[26px] flex-1 flex items-center justify-center mt-px w-[147.09px] [font-family:'Inter',Helvetica] font-normal text-white text-[13px] tracking-[0] leading-4 whitespace-nowrap border-0 bg-transparent shadow-none focus-visible:ring-0"
                />
              </div>
            </div>

            <div className="ml-[10.5px] mr-[12.5px] flex-1 max-h-[86.19px] mt-[2.0px] flex flex-col gap-[4.2px]">
              <Label className="flex items-center justify-center w-[211.44px] h-5 mt-[3px] [font-family:'Inter',Helvetica] font-normal text-white text-base tracking-[0] leading-[27.2px] whitespace-nowrap">
                {rightCardInputs[2].label}
              </Label>

              <div className="flex-1 max-h-[50px] flex overflow-hidden border-[#f0f3ff80] rounded-[25px] border border-solid shadow-[inset_0px_1px_1px_#00000013] backdrop-blur-[15px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(15px)_brightness(100%)]">
                <Input
                  defaultValue={rightCardInputs[2].value}
                  className="mt-[17px] ml-2.5 mr-[25px] flex-1 flex overflow-scroll w-[8.58px] text-white items-center justify-center h-4 [font-family:'Inter',Helvetica] font-normal text-[13px] tracking-[0] leading-[normal] border-0 bg-transparent shadow-none focus-visible:ring-0"
                />
              </div>
            </div>

            <Button className="flex ml-[10.5px] mr-[12.5px] flex-1 max-h-12 relative mt-[28.0px] w-[431px] items-center justify-center gap-2 pl-4 pr-2 py-2 bg-[#5034ff] rounded-[100px] border border-solid h-auto hover:bg-[#5034ff]/90">
              <span className="relative w-[170.88px] h-[27px] [font-family:'Poppins',Helvetica] font-normal text-white text-base tracking-[-0.32px] leading-6 whitespace-nowrap">
                Advanced Options
              </span>

              <img
                className="relative w-8 h-8"
                alt="Frame"
                src="/figmaAssets/frame-2131330617-1.svg"
              />
            </Button>

            <div className="ml-[10.5px] mr-[12.5px] flex-1 max-h-[86.19px] mt-[23.4px] flex flex-col gap-[4.2px]">
              <Label className="flex items-center justify-center w-[122.6px] h-5 mt-[3px] [font-family:'Inter',Helvetica] font-normal text-white text-base tracking-[0] leading-[27.2px] whitespace-nowrap">
                {rightCardInputs[3].label}
              </Label>

              <div className="flex-1 max-h-[50px] flex overflow-hidden border-[#f0f3ff80] rounded-[25px] border border-solid shadow-[inset_0px_1px_1px_#00000013] backdrop-blur-[15px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(15px)_brightness(100%)]">
                <Input
                  defaultValue={rightCardInputs[3].value}
                  className="mt-[17px] ml-2.5 mr-[25px] flex-1 flex overflow-scroll w-[5.61px] text-white items-center justify-center h-4 [font-family:'Inter',Helvetica] font-normal text-[13px] tracking-[0] leading-[normal] border-0 bg-transparent shadow-none focus-visible:ring-0"
                />
              </div>
            </div>

            <Button
              variant="outline"
              className="flex mr-0.5 flex-1 max-h-12 relative mt-[22.0px] w-[452px] h-12 items-center justify-center gap-2 pl-4 pr-2 py-2 bg-white rounded-[100px] border border-solid border-[#5034ff] hover:bg-[#5034ff]/10"
            >
              <span className="relative w-fit [font-family:'Poppins',Helvetica] font-normal text-[#5034ff] text-base tracking-[-0.32px] leading-6 whitespace-nowrap">
                Calculate
              </span>

              <img
                className="relative w-[22.63px] h-[22.63px]"
                alt="Vuesax outline arrow"
                src="/figmaAssets/vuesax-outline-arrow-right.svg"
              />
            </Button>

            <div className="ml-[10.5px] mr-[12.5px] flex-1 max-h-[148px] mt-[31.4px] flex flex-col bg-[#00000040] rounded-2xl">
              <div className="ml-4 w-[124.69px] h-[68px] mt-4 [font-family:'Inter',Helvetica] font-black text-white text-[40px] leading-[68px] flex items-center justify-center tracking-[0] whitespace-nowrap">
                $0.00
              </div>

              <div className="flex items-center justify-center ml-4 w-[280.39px] h-5 mt-0.5 [font-family:'Inter',Helvetica] font-normal text-white text-base tracking-[0] leading-6 whitespace-nowrap">
                Monthly Total • Per-Employee: $0.00
              </div>

              <div className="flex items-center justify-center ml-4 w-[103.7px] h-4 mt-[7px] [font-family:'Inter',Helvetica] font-normal text-white text-[13.3px] tracking-[0] leading-5 whitespace-nowrap">
                Quarterly: $0.00
              </div>
            </div>

            <button className="ml-[19px] w-[254.45px] h-6 mt-[40.7px] text-white [font-family:'Poppins',Helvetica] font-normal text-base tracking-[-0.32px] leading-6 whitespace-nowrap bg-transparent border-0 cursor-pointer">
              Open Detailed Estimator →
            </button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
