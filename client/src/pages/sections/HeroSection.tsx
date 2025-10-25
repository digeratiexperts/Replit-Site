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
    <section className="flex flex-col w-full items-start justify-center gap-8 lg:gap-16 px-4 md:px-8 lg:px-[120px] py-8 md:py-12 lg:py-16 relative [background:url(../figmaAssets/background-1.png)_50%_50%_/_cover,linear-gradient(0deg,rgba(3,2,40,1)_0%,rgba(3,2,40,1)_100%)] min-h-screen">
      <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8 justify-between relative self-stretch w-full flex-[0_0_auto]">
        <Card className="inline-flex items-center gap-2.5 px-0 py-8 relative flex-1 bg-[#f0f3ff] rounded-[30px] overflow-hidden border border-solid border-[#333333] shadow-[-11px_16px_32px_-9px_#0000001a] backdrop-blur-[23px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(23px)_brightness(100%)]">
          <CardContent className="relative w-full max-w-[554px] mx-auto p-6 flex flex-col gap-6">
            <div className="flex flex-col items-center gap-4 w-full">
              <h2 className="[font-family:'Poppins',Helvetica] font-normal text-[#020029] text-3xl text-center tracking-[0] leading-normal">
                What&apos;s Downtime Really Costing You?
              </h2>

              <p className="[font-family:'Poppins',Helvetica] font-normal text-[#020029bf] text-base text-center tracking-[0] leading-[26.4px]">
                Quick estimate now. Open advanced to factor RTO/RPO and annual impact.
              </p>
            </div>

            <div className="flex flex-col w-full items-start gap-4">
              <div className="flex flex-col gap-2 w-full">
                <Label className="[font-family:'Inter',Helvetica] font-normal text-[#020029] text-base tracking-[0] leading-[27.2px]">
                  {leftCardInputs[0].label}
                </Label>
                <Input
                  defaultValue={leftCardInputs[0].value}
                  data-testid="input-industry"
                  className="h-[50px] px-4 [font-family:'Inter',Helvetica] font-normal text-[#020029] text-[13px] tracking-[0] border-[#0000001f] rounded-[25px] border border-solid shadow-[inset_0px_1px_1px_#00000013] bg-transparent"
                />
              </div>

              <div className="flex items-start gap-3 w-full">
                <div className="flex flex-col gap-2 flex-1">
                  <Label className="[font-family:'Inter',Helvetica] font-normal text-[#020029] text-base tracking-[0] leading-[27.2px]">
                    {leftCardInputs[1].label}
                  </Label>
                  <Input
                    defaultValue={leftCardInputs[1].value}
                    data-testid="input-employees"
                    className="h-[50px] px-4 [font-family:'Inter',Helvetica] font-normal text-[#020029] text-[13px] tracking-[0] border-[#0000001f] rounded-[25px] border border-solid shadow-[inset_0px_1px_1px_#00000013] bg-transparent"
                  />
                </div>

                <div className="flex flex-col gap-2 flex-1">
                  <Label className="[font-family:'Inter',Helvetica] font-normal text-[#020029] text-base tracking-[0] leading-[27.2px]">
                    {leftCardInputs[2].label}
                  </Label>
                  <Input
                    defaultValue={leftCardInputs[2].value}
                    data-testid="input-wage"
                    className="h-[50px] px-4 [font-family:'Inter',Helvetica] font-normal text-[#020029] text-[13px] tracking-[0] border-[#0000001f] rounded-[25px] border border-solid shadow-[inset_0px_1px_1px_#00000013] bg-transparent"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2 w-full">
                <Label className="[font-family:'Inter',Helvetica] font-normal text-[#020029] text-base tracking-[0] leading-[27.2px]">
                  {leftCardInputs[3].label}
                </Label>
                <Input
                  defaultValue={leftCardInputs[3].value}
                  data-testid="input-downtime"
                  className="h-[50px] px-4 [font-family:'Inter',Helvetica] font-normal text-[#020029] text-[13px] tracking-[0] border-[#0000001f] rounded-[25px] border border-solid shadow-[inset_0px_1px_1px_#00000013] bg-transparent"
                />
              </div>
            </div>

            <div className="flex flex-col w-full items-start gap-4">
              <Button 
                data-testid="button-advanced-rto"
                className="flex w-full items-center justify-center gap-2 pl-4 pr-2 py-2 bg-[#5034ff] rounded-[100px] border border-solid h-12 hover:bg-[#5034ff]/90">
                <span className="[font-family:'Poppins',Helvetica] font-normal text-white text-base tracking-[-0.32px] leading-6">
                  Advanced (rto/rpo &amp; Annual)
                </span>
                <img
                  className="w-8 h-8"
                  alt="Frame"
                  src="/figmaAssets/frame-2131330617-1.svg"
                />
              </Button>

              <Button
                variant="outline"
                data-testid="button-calculate"
                className="flex w-full h-12 items-center justify-center gap-2 pl-4 pr-2 py-2 bg-white rounded-[100px] border border-solid border-[#5034ff] hover:bg-[#5034ff]/10"
              >
                <span className="[font-family:'Poppins',Helvetica] font-normal text-[#5034ff] text-base tracking-[-0.32px] leading-6">
                  Calculate
                </span>
                <img
                  className="w-[22.63px] h-[22.63px]"
                  alt="Vuesax outline arrow"
                  src="/figmaAssets/vuesax-outline-arrow-right.svg"
                />
              </Button>
            </div>

            <div className="w-full border-t border-[#0000001f] my-2"></div>

            <div className="flex flex-col w-full items-start gap-2">
              {costEstimates.map((estimate, index) => (
                <div
                  key={index}
                  data-testid={`cost-${index}`}
                  className="flex items-center justify-between w-full"
                >
                  <div className="[font-family:'Poppins',Helvetica] font-normal text-[#02002980] text-base tracking-[0] leading-[27.2px]">
                    {estimate.label}
                  </div>
                  <div className="[font-family:'Poppins',Helvetica] font-normal text-[#020029] text-base leading-[27.2px] tracking-[0]">
                    {estimate.value}
                  </div>
                </div>
              ))}
            </div>

            <Button 
              data-testid="button-rto-status"
              className="flex w-full h-12 items-center justify-center gap-2 px-4 py-2 bg-[#5034ff] rounded-[100px] border border-solid hover:bg-[#5034ff]/90">
              <span className="[font-family:'Poppins',Helvetica] font-normal text-white text-base tracking-[-0.32px] leading-6">
                Rto Status: Enter Values
              </span>
            </Button>

            <p className="w-full [font-family:'Poppins',Helvetica] font-normal text-[#02002980] text-base tracking-[0] leading-[27.2px] text-center">
              Estimates only. Advanced fields reflect RTO/RPO best practices and
              incident frequency.
            </p>

            <button 
              data-testid="link-detailed-calculator"
              className="text-[#5034ff] [font-family:'Poppins',Helvetica] font-normal text-base tracking-[-0.32px] leading-6 bg-transparent border-0 cursor-pointer hover:underline">
              Open Detailed Calculator →
            </button>
          </CardContent>
        </Card>

        <Card className="relative flex-1 bg-[#100a25] rounded-[30px] overflow-hidden border border-solid border-[#f0f3ff] shadow-[-11px_16px_32px_-9px_#0000001a] backdrop-blur-[23px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(23px)_brightness(100%)]">
          <CardContent className="relative w-full max-w-[531px] mx-auto p-6 flex flex-col gap-6">
            <div className="flex flex-col items-center gap-4 w-full">
              <h2 className="[font-family:'Poppins',Helvetica] font-normal text-white text-3xl text-center tracking-[0] leading-normal">
                Estimate Your Service Cost Now
              </h2>

              <p className="[font-family:'Poppins',Helvetica] font-normal text-[#ffffffbf] text-base text-center tracking-[0] leading-[26.4px]">
                Get an instant quote based on your needs and team size.
              </p>
            </div>

            <div className="flex flex-col w-full items-start gap-4">
              <div className="flex flex-col gap-2 w-full">
                <Label className="[font-family:'Inter',Helvetica] font-normal text-white text-base tracking-[0] leading-[27.2px]">
                  {rightCardInputs[0].label}
                </Label>
                <Input
                  defaultValue={rightCardInputs[0].value}
                  data-testid="input-num-employees"
                  className="h-[50px] px-4 [font-family:'Inter',Helvetica] font-normal text-white text-[13px] tracking-[0] border-[#f0f3ff80] rounded-[25px] border border-solid shadow-[inset_0px_1px_1px_#00000013] bg-transparent"
                />
              </div>

              <div className="flex flex-col gap-2 w-full">
                <Label className="[font-family:'Inter',Helvetica] font-normal text-white text-base tracking-[0] leading-[27.2px]">
                  {rightCardInputs[1].label}
                </Label>
                <Input
                  defaultValue={rightCardInputs[1].value}
                  data-testid="input-service-package"
                  className="h-[50px] px-4 [font-family:'Inter',Helvetica] font-normal text-white text-[13px] tracking-[0] border-[#f0f3ff80] rounded-[25px] border border-solid shadow-[inset_0px_1px_1px_#00000013] bg-transparent"
                />
              </div>

              <div className="flex flex-col gap-2 w-full">
                <Label className="[font-family:'Inter',Helvetica] font-normal text-white text-base tracking-[0] leading-[27.2px]">
                  {rightCardInputs[2].label}
                </Label>
                <Input
                  defaultValue={rightCardInputs[2].value}
                  data-testid="input-devices"
                  className="h-[50px] px-4 [font-family:'Inter',Helvetica] font-normal text-white text-[13px] tracking-[0] border-[#f0f3ff80] rounded-[25px] border border-solid shadow-[inset_0px_1px_1px_#00000013] bg-transparent"
                />
              </div>
            </div>

            <Button 
              data-testid="button-advanced-options"
              className="flex w-full h-12 items-center justify-center gap-2 px-4 py-2 bg-[#5034ff] rounded-[100px] border border-solid hover:bg-[#5034ff]/90">
              <span className="[font-family:'Poppins',Helvetica] font-normal text-white text-base tracking-[-0.32px] leading-6">
                Advanced Options
              </span>
              <img
                className="w-8 h-8"
                alt="Frame"
                src="/figmaAssets/frame-2131330617-1.svg"
              />
            </Button>

            <div className="flex flex-col gap-2 w-full">
              <Label className="[font-family:'Inter',Helvetica] font-normal text-white text-base tracking-[0] leading-[27.2px]">
                {rightCardInputs[3].label}
              </Label>
              <Input
                defaultValue={rightCardInputs[3].value}
                data-testid="input-sites"
                className="h-[50px] px-4 [font-family:'Inter',Helvetica] font-normal text-white text-[13px] tracking-[0] border-[#f0f3ff80] rounded-[25px] border border-solid shadow-[inset_0px_1px_1px_#00000013] bg-transparent"
              />
            </div>

            <Button
              variant="outline"
              data-testid="button-calculate-service"
              className="flex w-full h-12 items-center justify-center gap-2 px-4 py-2 bg-white rounded-[100px] border border-solid border-[#5034ff] hover:bg-[#5034ff]/10"
            >
              <span className="[font-family:'Poppins',Helvetica] font-normal text-[#5034ff] text-base tracking-[-0.32px] leading-6">
                Calculate
              </span>
              <img
                className="w-[22.63px] h-[22.63px]"
                alt="Vuesax outline arrow"
                src="/figmaAssets/vuesax-outline-arrow-right.svg"
              />
            </Button>

            <div className="w-full flex flex-col bg-[#00000040] rounded-2xl p-6 gap-2">
              <div className="[font-family:'Inter',Helvetica] font-black text-white text-4xl tracking-[0]">
                $0.00
              </div>
              <div className="[font-family:'Inter',Helvetica] font-normal text-white text-base tracking-[0]">
                Monthly Total • Per-Employee: $0.00
              </div>
              <div className="[font-family:'Inter',Helvetica] font-normal text-white text-sm tracking-[0]">
                Quarterly: $0.00
              </div>
            </div>

            <button 
              data-testid="link-detailed-estimator"
              className="text-white [font-family:'Poppins',Helvetica] font-normal text-base tracking-[-0.32px] leading-6 bg-transparent border-0 cursor-pointer hover:underline">
              Open Detailed Estimator →
            </button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
