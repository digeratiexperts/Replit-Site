import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const contentRows = [
  {
    imageFirst: true,
    imageSrc: "/figmaAssets/rectangle-152059.svg",
    bgColor: "bg-[#5034ff]",
    title: "Security-First Operations",
    description:
      "Every system, endpoint, and user is protected - by design, not by reaction.",
    textColor: "text-white",
    descriptionColor: "text-[#ffffffbf]",
  },
  {
    imageFirst: false,
    imageSrc: "/figmaAssets/rectangle-152059-2.svg",
    bgColor: "bg-[#78a2ff]",
    title: "Co-Managed or Fully Managed",
    description:
      "We support your internal IT or serve as your outsourced technology team.",
    textColor: "text-white",
    descriptionColor: "text-[#ffffffbf]",
  },
  {
    imageFirst: true,
    imageSrc: "/figmaAssets/rectangle-152059-1.svg",
    bgColor: "bg-[#f0f3ff]",
    title: "Executive-Level Transparency",
    description:
      "Reports, KPIs, and compliance insights that make sense - and drive decisions.",
    textColor: "text-[#020029]",
    descriptionColor: "text-[#020029bf]",
  },
];

export const FooterSection = (): JSX.Element => {
  return (
    <section className="relative w-full bg-[url(/figmaAssets/wave-svg-1.svg)] bg-[100%_100%]">
      <img
        className="absolute top-0 left-0 w-full h-full object-cover"
        alt="Wave SVG"
        src="/figmaAssets/wave-svg.svg"
      />

      <div className="absolute top-[99px] left-0 w-full h-[1167px] bg-[url(/figmaAssets/frame-2131330643.svg)] bg-cover bg-[50%_50%]" />

      <div className="relative flex flex-col w-full max-w-[1200px] mx-auto items-start gap-16 pt-[242px] pb-[101px] px-4">
        <div className="flex items-center justify-between w-full gap-8">
          <h2 className="flex-1 max-w-[599px] [font-family:'Poppins',Helvetica] font-normal text-white text-[52px] tracking-[0] leading-[73px]">
            We Exist to Protect and Enable Your Business
          </h2>

          <p className="flex-1 max-w-[516px] [font-family:'Poppins',Helvetica] font-normal text-[#ffffffbf] text-base tracking-[0] leading-[26.4px]">
            If you&apos;re like most business leaders, you don&apos;t want
            another vendor — you want a security-first partner who proactively
            reduces risk, improves uptime, and keeps your team moving.
            <br />
            Digerati Experts brings managed IT, cybersecurity, and compliance
            together in one streamlined operation – built for results, not
            noise.
          </p>
        </div>

        <div className="flex flex-col items-start gap-6 w-full">
          {contentRows.map((row, index) => (
            <div key={index} className="flex items-center gap-6 w-full">
              {row.imageFirst ? (
                <>
                  <img
                    className="w-[438px] h-[237px] object-cover rounded-2xl"
                    alt="Rectangle"
                    src={row.imageSrc}
                  />
                  <Card
                    className={`flex-1 h-[237px] ${row.bgColor} rounded-2xl border-0`}
                  >
                    <CardContent className="flex items-center justify-center h-full p-[27px]">
                      <div className="flex items-center justify-center gap-[35px]">
                        <h3
                          className={`w-[220px] [font-family:'Poppins',Helvetica] font-medium ${row.textColor} text-[32px] tracking-[0] leading-[normal]`}
                        >
                          {row.title}
                        </h3>
                        <p
                          className={`w-[322px] [font-family:'Poppins',Helvetica] font-normal ${row.descriptionColor} text-base tracking-[0] leading-[26.4px]`}
                        >
                          {row.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <>
                  <Card
                    className={`flex-1 h-[237px] ${row.bgColor} rounded-2xl border-0`}
                  >
                    <CardContent className="flex items-center justify-center h-full p-[27px]">
                      <div className="flex items-center justify-center gap-[35px]">
                        <h3
                          className={`w-[272px] [font-family:'Poppins',Helvetica] font-medium ${row.textColor} text-[32px] tracking-[0] leading-[normal]`}
                        >
                          {row.title}
                        </h3>
                        <p
                          className={`w-[322px] [font-family:'Poppins',Helvetica] font-normal ${row.descriptionColor} text-base tracking-[0] leading-[26.4px]`}
                        >
                          {row.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  <img
                    className="w-[438px] h-[237px] object-cover rounded-2xl"
                    alt="Rectangle"
                    src={row.imageSrc}
                  />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
