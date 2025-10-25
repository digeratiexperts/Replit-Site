import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const industries = [
  {
    title: "Law Firms",
    description:
      "Lorem ipsum dolor sit amet consectetur. Eget aliquam tellus tempor nibh.",
    image: "/figmaAssets/rectangle-152058-2.svg",
  },
  {
    title: "CPA Firms",
    description:
      "Lorem ipsum dolor sit amet consectetur. Eget aliquam tellus tempor nibh.",
    image: "/figmaAssets/rectangle-152058-4.svg",
  },
  {
    title: "Medical Practices",
    description:
      "Lorem ipsum dolor sit amet consectetur. Eget aliquam tellus tempor nibh.",
    image: "/figmaAssets/rectangle-152058-1.svg",
  },
  {
    title: "Real Estate Firms",
    description:
      "Lorem ipsum dolor sit amet consectetur. Eget aliquam tellus tempor nibh.",
    image: "/figmaAssets/rectangle-152058-3.svg",
  },
  {
    title: "Animal Hospitals",
    description:
      "Lorem ipsum dolor sit amet consectetur. Eget aliquam tellus tempor nibh.",
    image: "/figmaAssets/rectangle-152058.svg",
  },
];

export const TestimonialsSection = (): JSX.Element => {
  return (
    <section className="flex flex-col w-full max-w-[1200px] mx-auto items-start gap-[66px] px-4">
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 w-full">
        <h2 className="flex items-center justify-center w-full md:w-[417px] [font-family:'Poppins',Helvetica] font-normal text-[#020029] text-[52px] tracking-[0] leading-[73px]">
          Industries We Serve
        </h2>

        <p className="flex items-center justify-center w-full md:w-[448px] [font-family:'Poppins',Helvetica] font-normal text-[#020029bf] text-base tracking-[0] leading-[26.4px]">
          Lorem ipsum dolor sit amet consectetur. Suspendisse ullamcorper
          commodo integer dolor id arcu ac. Aenean amet tellus leo laoreet
          bibendum urna.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {industries.map((industry, index) => (
          <Card
            key={index}
            className="rounded-2xl overflow-hidden border-[0.63px] border-solid border-[#0000001f] h-[377px] hover:shadow-lg transition-shadow cursor-pointer"
          >
            <CardContent className="p-0 h-full flex flex-col">
              <img
                className="w-full h-[236px] object-cover"
                alt={industry.title}
                src={industry.image}
              />
              <div className="flex flex-col gap-[12.86px] px-[25px] py-[25px] flex-1">
                <h3 className="[font-family:'Poppins',Helvetica] font-medium text-[#020029] text-2xl tracking-[0] leading-[26px]">
                  {industry.title}
                </h3>
                <p className="[font-family:'Poppins',Helvetica] font-normal text-[#020029bf] text-base tracking-[0] leading-[26.4px]">
                  {industry.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
