import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

interface CalculatorProps {
  employees: number;
  setEmployees: (value: number) => void;
  hourlyWage: number;
  setHourlyWage: (value: number) => void;
  downtime: number;
  setDowntime: (value: number) => void;
  industry: string;
  setIndustry: (value: string) => void;
  downtimeCost: number;
  serviceEmployees: number;
  setServiceEmployees: (value: number) => void;
  servicePackage: string;
  setServicePackage: (value: string) => void;
  serviceCost: number;
}

export const DigeratiCalculatorsSection = (props: CalculatorProps): JSX.Element => {
  const {
    employees, setEmployees,
    hourlyWage, setHourlyWage,
    downtime, setDowntime,
    industry, setIndustry,
    downtimeCost,
    serviceEmployees, setServiceEmployees,
    servicePackage, setServicePackage,
    serviceCost
  } = props;

  return (
    <>
      {/* Downtime Calculator Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What's Downtime Really Costing You?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Quick estimate now. Open advanced to factor RTO/RPO and annual impact.
            </p>
          </div>

          <Card className="max-w-3xl mx-auto">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="industry">Industry</Label>
                  <Select value={industry} onValueChange={setIndustry}>
                    <SelectTrigger id="industry">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2.0">Law Firm (2.0×)</SelectItem>
                      <SelectItem value="1.8">CPA Firm (1.8×)</SelectItem>
                      <SelectItem value="2.5">Medical Practice (2.5×)</SelectItem>
                      <SelectItem value="1.6">General Office (1.6×)</SelectItem>
                      <SelectItem value="1.6">Real Estate (1.6×)</SelectItem>
                      <SelectItem value="2.2">Animal Hospital (2.2×)</SelectItem>
                      <SelectItem value="1.7">Retail/Sales (1.7×)</SelectItem>
                      <SelectItem value="2.0">Manufacturing (2.0×)</SelectItem>
                      <SelectItem value="1.5">Nonprofit (1.5×)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="employees-affected">Employees Affected: {employees}</Label>
                  <Slider 
                    id="employees-affected"
                    value={[employees]} 
                    onValueChange={(value) => setEmployees(value[0])}
                    max={100} 
                    min={1} 
                    step={1}
                    className="mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2"
                  />
                </div>

                <div>
                  <Label htmlFor="hourly-wage">Avg Hourly Wage ($): {hourlyWage}</Label>
                  <Slider 
                    id="hourly-wage"
                    value={[hourlyWage]} 
                    onValueChange={(value) => setHourlyWage(value[0])}
                    max={200} 
                    min={15} 
                    step={5}
                    className="mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2"
                  />
                </div>

                <div>
                  <Label htmlFor="downtime-hours">Expected Downtime (hours): {downtime}</Label>
                  <Slider 
                    id="downtime-hours"
                    value={[downtime]} 
                    onValueChange={(value) => setDowntime(value[0])}
                    max={24} 
                    min={1} 
                    step={1}
                    className="mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2"
                  />
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Per-Incident Cost</p>
                    <p className="text-3xl font-bold text-purple-600">
                      ${downtimeCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Annual Downtime Cost (4 incidents)</p>
                    <p className="text-3xl font-bold text-purple-600">
                      ${(downtimeCost * 4).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg">
                  Open Detailed Calculator <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Service Cost Estimator Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Estimate Your Service Cost Now
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get an instant quote based on your needs and team size.
            </p>
          </div>

          <Card className="max-w-3xl mx-auto">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="service-employees">Number of Employees: {serviceEmployees}</Label>
                  <Slider 
                    id="service-employees"
                    value={[serviceEmployees]} 
                    onValueChange={(value) => setServiceEmployees(value[0])}
                    max={100} 
                    min={1} 
                    step={1}
                    className="mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2"
                  />
                </div>

                <div>
                  <Label htmlFor="service-package">Service Package</Label>
                  <Select value={servicePackage} onValueChange={setServicePackage}>
                    <SelectTrigger id="service-package">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="165">Basic IT ($165/user)</SelectItem>
                      <SelectItem value="245">Advanced Security ($245/user)</SelectItem>
                      <SelectItem value="345">Enterprise ($345/user)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
                <div className="text-center">
                  <p className="text-3xl font-bold text-purple-600 mb-2">
                    ${serviceCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                  <p className="text-sm text-gray-600">
                    Monthly Total • Per-Employee: ${servicePackage}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    Quarterly: ${(serviceCost * 3 * 0.9).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (10% discount)
                  </p>
                  {serviceEmployees >= 5 && serviceCost === 1200 && (
                    <p className="text-xs text-purple-600 mt-2">
                      *$1,200/site minimum applied for 5+ users
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-6 text-center">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg">
                  Open Detailed Estimator <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
};

// Standalone version with internal state
export const DigeratiCalculatorsSectionStandalone = (): JSX.Element => {
  const [employees, setEmployees] = useState(10);
  const [hourlyWage, setHourlyWage] = useState(50);
  const [downtime, setDowntime] = useState(4);
  const [industry, setIndustry] = useState("1.6");
  const [downtimeCost, setDowntimeCost] = useState(0);
  const [serviceEmployees, setServiceEmployees] = useState(10);
  const [servicePackage, setServicePackage] = useState("165");
  const [serviceCost, setServiceCost] = useState(0);

  // Calculate downtime cost
  useEffect(() => {
    const cost = employees * hourlyWage * downtime * parseFloat(industry);
    setDowntimeCost(cost);
  }, [employees, hourlyWage, downtime, industry]);

  // Calculate service cost
  useEffect(() => {
    const costPerUser = parseFloat(servicePackage);
    const totalCost = serviceEmployees * costPerUser;
    // Apply minimum for 5+ users
    const finalCost = serviceEmployees >= 5 ? Math.max(totalCost, 1200) : totalCost;
    setServiceCost(finalCost);
  }, [serviceEmployees, servicePackage]);

  return (
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
  );
};