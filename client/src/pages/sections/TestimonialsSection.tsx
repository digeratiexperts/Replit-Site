import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const industries = [
  {
    title: "Law Firms",
    description:
      "Protecting client confidentiality with secure document management and compliance-ready infrastructure.",
    image: "/figmaAssets/rectangle-152058-2.svg",
  },
  {
    title: "CPA Firms",
    description:
      "Secure financial data handling with SOC compliance support and encrypted communications.",
    image: "/figmaAssets/rectangle-152058-4.svg",
  },
  {
    title: "Medical Practices",
    description:
      "HIPAA-compliant IT solutions with 24/7 monitoring to protect patient data and ensure uptime.",
    image: "/figmaAssets/rectangle-152058-1.svg",
  },
  {
    title: "Real Estate Firms",
    description:
      "Protecting transactions with wire fraud prevention and secure mobile access for agents.",
    image: "/figmaAssets/rectangle-152058-3.svg",
  },
  {
    title: "Animal Hospitals",
    description:
      "Reliable systems for veterinary practices with secure patient records and scheduling uptime.",
    image: "/figmaAssets/rectangle-152058.svg",
  },
];

export const TestimonialsSection = (): JSX.Element => {
  return (
    <section className="flex flex-col w-full max-w-[1200px] mx-auto items-start gap-[66px] px-4">
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 w-full">
        <h2 className="flex items-center justify-center w-full md:w-[417px] font-normal text-[#020029] text-[52px] tracking-[0] leading-[73px]">
          Industries We Serve
        </h2>

        <p className="flex items-center justify-center w-full md:w-[448px] font-normal text-[#020029bf] text-base tracking-[0] leading-[26.4px]">
          Digerati Experts provides tailored IT and cybersecurity solutions for
          Arizona businesses across diverse industries, each with unique
          compliance and security needs.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {industries.map((industry, index) => (
          <Card
            key={index}
            className="rounded-2xl overflow-hidden border-[0.63px] border-solid border-[#0000001f] h-[377px] transition-all duration-300 cursor-pointer hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1 hover:border-purple-300/30"
          >
            <CardContent className="p-0 h-full flex flex-col">
              <img
                className="w-full h-[236px] object-cover"
                alt={industry.title}
                src={industry.image}
              />
              <div className="flex flex-col gap-[12.86px] px-[25px] py-[25px] flex-1">
                <h3 className="font-medium text-[#020029] text-2xl tracking-[0] leading-[26px]">
                  {industry.title}
                </h3>
                <p className="font-normal text-[#020029bf] text-base tracking-[0] leading-[26.4px]">
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
