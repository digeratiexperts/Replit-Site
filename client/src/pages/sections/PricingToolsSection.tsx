import { useEffect, useState } from "react";
import { DigeratiCalculatorsSection } from "./DigeratiCalculatorsSection";
import { pricing } from "@/data/pricing";

const industryMultipliers: Record<string, number> = {
  "law-firm": 2.0,
  "cpa-firm": 1.8,
  medical: 2.5,
  "general-office": 1.6,
  "real-estate": 1.6,
  "animal-hospital": 2.2,
  retail: 1.7,
  manufacturing: 2.0,
  nonprofit: 1.5,
};

/**
 * Full pricing / downtime calculators — lives on the pricing page
 * (relocated from homepage so Level 1 stays executive-summary clean).
 */
export const PricingToolsSection = (): JSX.Element => {
  const [employees, setEmployees] = useState(10);
  const [hourlyWage, setHourlyWage] = useState(50);
  const [downtime, setDowntime] = useState(4);
  const [industry, setIndustry] = useState("general-office");
  const [downtimeCost, setDowntimeCost] = useState(0);
  const [serviceEmployees, setServiceEmployees] = useState(10);
  const [servicePackage, setServicePackage] = useState(String(pricing.office.user));
  const [serviceCost, setServiceCost] = useState(0);

  useEffect(() => {
    const multiplier = industryMultipliers[industry] || 1.6;
    setDowntimeCost(employees * hourlyWage * downtime * multiplier);
  }, [employees, hourlyWage, downtime, industry]);

  useEffect(() => {
    const costPerUser = parseFloat(servicePackage);
    const totalCost = serviceEmployees * costPerUser;
    const floor =
      costPerUser === pricing.it.user
        ? pricing.it.monthlyMin
        : costPerUser === pricing.office.user
          ? pricing.office.monthlyMin
          : costPerUser === pricing.business.user
            ? pricing.business.monthlyMin
            : costPerUser === pricing.enterprise.user
              ? pricing.enterprise.monthlyMin
              : 0;
    setServiceCost(Math.max(totalCost, floor));
  }, [serviceEmployees, servicePackage]);

  return (
    <div id="pricing-tools" className="scroll-mt-28">
      <DigeratiCalculatorsSection
        employees={employees}
        setEmployees={setEmployees}
        hourlyWage={hourlyWage}
        setHourlyWage={setHourlyWage}
        downtime={downtime}
        setDowntime={setDowntime}
        industry={industry}
        setIndustry={setIndustry}
        downtimeCost={downtimeCost}
        serviceEmployees={serviceEmployees}
        setServiceEmployees={setServiceEmployees}
        servicePackage={servicePackage}
        setServicePackage={setServicePackage}
        serviceCost={serviceCost}
      />
    </div>
  );
};
