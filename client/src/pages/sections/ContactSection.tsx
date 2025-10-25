import { ArrowRightIcon, CalendarIcon } from "lucide-react";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const threatInsights = [
  {
    id: 1,
    image: "/figmaAssets/feature-image.png",
    title: "New CISA Alert: Patch These 5 Vulnerabilities Now",
    description: "New security flaws are actively being exploited.",
    date: "August 5, 2025",
  },
  {
    id: 2,
    image: "/figmaAssets/feature-image-1.png",
    title: "New CISA Alert: Patch These 5 Vulnerabilities Now",
    description: "New security flaws are actively being exploited.",
    date: "August 5, 2025",
  },
  {
    id: 3,
    image: "/figmaAssets/feature-image-2.png",
    title: "New CISA Alert: Patch These 5 Vulnerabilities Now",
    description: "New security flaws are actively being exploited.",
    date: "August 5, 2025",
  },
];

export const ContactSection = (): JSX.Element => {
  return (
    <section className="flex flex-col w-full items-center gap-[66px] py-12">
      <header className="flex flex-col max-w-[655px] items-center gap-4">
        <h2 className="text-center [font-family:'Poppins',Helvetica] font-normal text-[#020029] text-[52px] tracking-[0] leading-[73px]">
          Recent Threats &amp; Insights
        </h2>

        <p className="text-center [font-family:'Poppins',Helvetica] font-normal text-[#020029bf] text-base tracking-[0] leading-[26.4px]">
          Real-time updates, expert analysis, and actionable security news.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[23px] w-full max-w-[1201px] px-4">
        {threatInsights.map((insight) => (
          <Card
            key={insight.id}
            className="bg-[#f0f3ff] rounded-[15.39px] border-[0.96px] border-solid border-[#0000001a] overflow-hidden h-[474px] flex flex-col"
          >
            <CardContent className="p-0 flex flex-col h-full">
              <div className="relative h-[268px] overflow-hidden">
                <div
                  className="w-full h-full rounded-[15.39px_15.39px_0px_0px] bg-cover bg-center"
                  style={{ backgroundImage: `url(${insight.image})` }}
                />
                <Badge className="absolute bottom-[42px] right-[11px] bg-[#020029] rounded-[12.5px] h-[31px] px-[9.6px] flex items-center gap-[6.4px] hover:bg-[#020029]">
                  <CalendarIcon className="w-[11.86px] h-[12.5px] text-[#6a1b9a]" />
                  <span className="[font-family:'Inter',Helvetica] font-normal text-[#6a1b9a] text-[11.5px] tracking-[0] leading-[19.6px]">
                    {insight.date}
                  </span>
                </Badge>
              </div>

              <div className="flex flex-col flex-1 px-5 pt-[21px] pb-5 justify-between">
                <div className="flex flex-col gap-1">
                  <h3 className="[font-family:'Poppins',Helvetica] font-medium text-[#020029] text-2xl tracking-[0] leading-[26px]">
                    {insight.title}
                  </h3>

                  <p className="[font-family:'Poppins',Helvetica] font-normal text-[#020029bf] text-base tracking-[0] leading-[26.4px]">
                    {insight.description}
                  </p>
                </div>

                <button className="inline-flex items-center gap-2 mt-4 group cursor-pointer">
                  <span className="[font-family:'Poppins',Helvetica] font-normal text-[#5034ff] text-base tracking-[-0.32px] leading-6 whitespace-nowrap">
                    Know More
                  </span>
                  <ArrowRightIcon className="w-[22.63px] h-[22.63px] text-[#5034ff] group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
