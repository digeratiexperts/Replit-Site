import { ArrowRightIcon } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const featureCards = [
  {
    title: "24/7 Threat monitoring and Response",
    description:
      "We detect & stop threats before they esclatate. Real- time MDR for continuous protection.",
    image: "/figmaAssets/rectangle-152056.png",
    imagePosition: "bottom",
  },
  {
    title: "Endpoint Protection ( EDR/XDR)",
    description:
      "We detect and stop threats before they esclatate. Real- time MDR for continuous protection",
    image: "/figmaAssets/rectangle-152056-1.png",
    imagePosition: "top",
  },
  {
    title: "User Access & MFA Enforcement",
    description:
      "We detect and stop threats before they esclatate. Real- time MDR for continuous protection",
    image: "/figmaAssets/rectangle-152056-2.png",
    imagePosition: "bottom",
  },
  {
    title: "Identity & Access Management",
    description:
      "We detect and stop threats before they esclatate. Real- time MDR for continuous protection",
    image: "/figmaAssets/rectangle-152056-3.png",
    imagePosition: "top",
  },
  {
    title: "Cloud Security hardening",
    description:
      "We detect and stop threats before they esclatate. Real- time MDR for continuous protection",
    image: "/figmaAssets/rectangle-152056-4.png",
    imagePosition: "bottom",
  },
  {
    title: "Phishing and Email Security",
    description:
      "We detect and stop threats before they esclatate. Real- time MDR for continuous protection",
    image: "/figmaAssets/rectangle-152056-5.png",
    imagePosition: "top",
  },
];

export const FeaturesSection = (): JSX.Element => {
  return (
    <section className="flex flex-col w-full max-w-[1200px] mx-auto items-start gap-[66px] px-4">
      <header className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 w-full">
        <h2 className="flex items-center justify-center flex-1 [font-family:'Poppins',Helvetica] font-normal text-[#020029] text-[52px] tracking-[0] leading-[73px]">
          What We Provide
        </h2>

        <p className="flex items-center justify-center lg:w-[448px] [font-family:'Poppins',Helvetica] font-normal text-[#020029bf] text-base tracking-[0] leading-[26.4px]">
          Our comprehensive suite of security services is designed to protect
          your business at every level, from endpoints to cloud infrastructure.
        </p>
      </header>

      <div className="flex flex-col items-center gap-8 w-full">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex gap-8 pb-4">
            {featureCards.map((card, index) => (
              <Card
                key={index}
                className="flex-shrink-0 w-96 h-[375px] rounded-2xl overflow-hidden border-[0.78px] border-[#0000001f]"
              >
                <CardContent
                  className={`p-0 h-full flex ${card.imagePosition === "bottom" ? "flex-col justify-between" : "flex-col"}`}
                >
                  {card.imagePosition === "top" && (
                    <img
                      className="w-full h-[187px] object-cover rounded-[4px_4px_0px_0px]"
                      alt={card.title}
                      src={card.image}
                    />
                  )}

                  <div
                    className={`flex flex-col items-start justify-center gap-4 px-5 ${card.imagePosition === "top" ? "py-5 h-[188px]" : "py-5 h-[188px]"}`}
                  >
                    <h3 className="[font-family:'Poppins',Helvetica] font-medium text-[#020029] text-2xl tracking-[0] leading-[26px]">
                      {card.title}
                    </h3>

                    <p className="[font-family:'Poppins',Helvetica] font-normal text-[#020029bf] text-base tracking-[0] leading-[26.4px]">
                      {card.description}
                    </p>
                  </div>

                  {card.imagePosition === "bottom" && (
                    <img
                      className="w-full h-[187px] object-cover rounded-[0px_0px_4.68px_4.68px]"
                      alt={card.title}
                      src={card.image}
                    />
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <Button
          variant="outline"
          className="h-auto inline-flex items-center justify-center gap-2 pl-4 pr-2 py-2 bg-white rounded-[100px] border border-solid border-[#5034ff] hover:bg-[#5034ff]/5"
        >
          <span className="[font-family:'Poppins',Helvetica] font-normal text-[#5034ff] text-base tracking-[-0.32px] leading-6 whitespace-nowrap">
            Explore More
          </span>
          <ArrowRightIcon className="w-[22.63px] h-[22.63px] text-[#5034ff]" />
        </Button>
      </div>
    </section>
  );
};
