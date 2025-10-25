import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const features = [
  {
    icon: "/figmaAssets/svg-18.svg",
    title: "Insurance & Compliance-Ready",
    description: "Be prepared for HIPAA, SOC 2, and cyber insurance audits.",
  },
  {
    icon: "/figmaAssets/svg-17.svg",
    title: "24/7 Human-Led Monitoring",
    description: "Real cybersecurity experts watching for threats in real time",
  },
  {
    icon: "/figmaAssets/svg.svg",
    title: "Built for Small Businesses",
    description: "No bloated tools or big-enterprise pricing",
  },
  {
    icon: "/figmaAssets/svg-1.svg",
    title: "Easy-to-Read Risk Reports",
    description: "Understand your exposure fast and show regulators",
  },
];

const formFields = [
  { label: "Full Name *", name: "fullName" },
  { label: "Email Address*", name: "email" },
  { label: "Phone Number *", name: "phone" },
  { label: "Company Name *", name: "company" },
];

export const ServicesSection = (): JSX.Element => {
  return (
    <section className="flex items-center justify-center gap-[104px] px-4 py-8">
      <div className="flex flex-col w-full max-w-[610px] items-start gap-8">
        <h2 className="[font-family:'Poppins',Helvetica] font-normal text-6xl tracking-[0] leading-[72px]">
          <span className="font-bold text-[#ffc107]">
            Hackers Don&apos;t Wait.
          </span>
          <span className="font-medium text-[#ffc107]">&nbsp;</span>
          <span className="font-medium text-white">
            Protect Your Business Now.
          </span>
        </h2>

        <div className="flex flex-col items-start gap-5 w-full">
          <p className="[font-family:'Poppins',Helvetica] font-normal text-[#ffffffbf] text-base tracking-[0] leading-[26.4px]">
            Get 24/7 protection, cut cyber liability, and pass compliance checks
            — all without hiring in-house IT
          </p>

          <div className="flex flex-col gap-[7px] w-full">
            {features.map((feature, index) => (
              <div key={index} className="flex gap-[18px] items-start">
                <img
                  className="w-[21px] h-[21px] mt-[5px] flex-shrink-0"
                  alt={feature.title}
                  src={feature.icon}
                />
                <div className="flex flex-col gap-0">
                  <h3 className="[font-family:'Poppins',Helvetica] font-medium text-white text-xl tracking-[0] leading-[26px]">
                    {feature.title}
                  </h3>
                  <p className="[font-family:'Poppins',Helvetica] font-normal text-[#ffffffbf] text-base tracking-[0] leading-[26.4px]">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Card className="w-full max-w-[486px] rounded-[30px] overflow-hidden shadow-[8px_16px_40px_#0000001a] backdrop-blur-[23px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(23px)_brightness(100%)] bg-[linear-gradient(0deg,rgba(240,243,255,1)_0%,rgba(240,243,255,1)_100%)] border-0">
        <CardContent className="p-[30px]">
          <div className="flex flex-col items-start gap-6">
            <div className="flex flex-col items-center gap-2 w-full">
              <h3 className="[font-family:'Poppins',Helvetica] font-medium text-[#020029] text-[28px] text-center tracking-[1.00px] leading-[33.6px]">
                Get Started Today
              </h3>
              <p className="[font-family:'Poppins',Helvetica] font-normal text-[#020029] text-base text-center tracking-[0] leading-[normal]">
                Lock In 80% Off Your Cyber Risk Assessment — Act Now to Identify
                Vulnerabilities Before Hackers Do.
              </p>
            </div>

            <div className="flex flex-col items-start gap-8 w-full">
              <div className="flex flex-col items-start gap-3.5 w-full">
                {formFields.map((field, index) => (
                  <div key={index} className="flex flex-col gap-[3px] w-full">
                    <Label
                      htmlFor={field.name}
                      className="[font-family:'Poppins',Helvetica] font-normal text-[#020029] text-base tracking-[0] leading-[27.2px]"
                    >
                      {field.label}
                    </Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      className="h-[50px] border-[#0000001f] rounded-[25px] border border-solid shadow-[inset_0px_1px_1px_#00000013] backdrop-blur-[15px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(15px)_brightness(100%)] bg-transparent"
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-col items-center gap-4 w-full">
                <Button className="w-full h-auto bg-[#5034ff] rounded-[100px] border border-solid px-4 py-2 hover:bg-[#5034ff]/90">
                  <span className="[font-family:'Poppins',Helvetica] font-normal text-white text-base tracking-[-0.05px] leading-6">
                    Get My Risk Assessment
                  </span>
                  <img
                    className="w-8 h-8 ml-2"
                    alt="Arrow"
                    src="/figmaAssets/frame-2131330617-1.svg"
                  />
                </Button>

                <p className="[font-family:'Poppins',Helvetica] font-normal text-[#020029bf] text-xs text-center tracking-[0] leading-[normal] max-w-[352px]">
                  All information submitted is protected and handled in
                  compliance with our Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
