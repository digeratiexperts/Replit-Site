import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ChevronRight, Calculator, DollarSign } from "lucide-react";

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
      <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(to bottom, #0f0720, #0a0118)' }}>
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <Calculator className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-gray-300">Cost Calculator</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What's Downtime Really <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Costing You?</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Quick estimate now. Open advanced to factor RTO/RPO and annual impact.
            </p>
          </div>

          <Card className="max-w-3xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(139,92,246,0.15)]">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="industry" className="text-gray-300">Industry</Label>
                  <Select value={industry} onValueChange={setIndustry}>
                    <SelectTrigger id="industry" className="mt-2 bg-white/10 border-white/20 text-white [&>span]:text-white" data-testid="select-industry">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a0a2e] border-white/20">
                      <SelectItem value="law-firm" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white" data-testid="option-law-firm">Law Firm (2.0×)</SelectItem>
                      <SelectItem value="cpa-firm" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white" data-testid="option-cpa-firm">CPA Firm (1.8×)</SelectItem>
                      <SelectItem value="medical" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white" data-testid="option-medical">Medical Practice (2.5×)</SelectItem>
                      <SelectItem value="general-office" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white" data-testid="option-general-office">General Office (1.6×)</SelectItem>
                      <SelectItem value="real-estate" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white" data-testid="option-real-estate">Real Estate (1.6×)</SelectItem>
                      <SelectItem value="animal-hospital" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white" data-testid="option-animal-hospital">Animal Hospital (2.2×)</SelectItem>
                      <SelectItem value="retail" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white" data-testid="option-retail">Retail/Sales (1.7×)</SelectItem>
                      <SelectItem value="manufacturing" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white" data-testid="option-manufacturing">Manufacturing (2.0×)</SelectItem>
                      <SelectItem value="nonprofit" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white" data-testid="option-nonprofit">Nonprofit (1.5×)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="employees-affected" className="text-gray-300">Employees Affected: <span className="text-cyan-400 font-semibold">{employees}</span></Label>
                  <Slider 
                    id="employees-affected"
                    value={[employees]} 
                    onValueChange={(value) => setEmployees(value[0])}
                    max={100} 
                    min={1} 
                    step={1}
                    className="mt-4 [&_[role=slider]]:bg-gradient-to-r [&_[role=slider]]:from-purple-500 [&_[role=slider]]:to-cyan-500 [&_[role=slider]]:border-0 [&_.range]:bg-gradient-to-r [&_.range]:from-purple-500 [&_.range]:to-cyan-500"
                    data-testid="slider-employees-affected"
                  />
                </div>

                <div>
                  <Label htmlFor="hourly-wage" className="text-gray-300">Avg Hourly Wage ($): <span className="text-cyan-400 font-semibold">{hourlyWage}</span></Label>
                  <Slider 
                    id="hourly-wage"
                    value={[hourlyWage]} 
                    onValueChange={(value) => setHourlyWage(value[0])}
                    max={200} 
                    min={15} 
                    step={5}
                    className="mt-4 [&_[role=slider]]:bg-gradient-to-r [&_[role=slider]]:from-purple-500 [&_[role=slider]]:to-cyan-500 [&_[role=slider]]:border-0 [&_.range]:bg-gradient-to-r [&_.range]:from-purple-500 [&_.range]:to-cyan-500"
                    data-testid="slider-hourly-wage"
                  />
                </div>

                <div>
                  <Label htmlFor="downtime-hours" className="text-gray-300">Expected Downtime (hours): <span className="text-cyan-400 font-semibold">{downtime}</span></Label>
                  <Slider 
                    id="downtime-hours"
                    value={[downtime]} 
                    onValueChange={(value) => setDowntime(value[0])}
                    max={24} 
                    min={1} 
                    step={1}
                    className="mt-4 [&_[role=slider]]:bg-gradient-to-r [&_[role=slider]]:from-purple-500 [&_[role=slider]]:to-cyan-500 [&_[role=slider]]:border-0 [&_.range]:bg-gradient-to-r [&_.range]:from-purple-500 [&_.range]:to-cyan-500"
                    data-testid="slider-downtime-hours"
                  />
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-purple-500/10 via-transparent to-cyan-500/10 rounded-xl border border-white/10">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Per-Incident Cost</p>
                    <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                      ${downtimeCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Annual Downtime Cost (4 incidents)</p>
                    <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                      ${(downtimeCost * 4).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300" data-testid="button-open-detailed-calculator">
                  Open Detailed Calculator <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Service Cost Estimator Section */}
      <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(to bottom, #0a0118, #0d0720)' }}>
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[150px] -translate-y-1/2" />
          <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px] -translate-y-1/2" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <DollarSign className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-gray-300">Pricing Estimator</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Estimate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Service Cost</span> Now
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Get an instant quote based on your needs and team size.
            </p>
          </div>

          <Card className="max-w-3xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(34,211,238,0.15)]">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="service-employees" className="text-gray-300">Number of Employees: <span className="text-cyan-400 font-semibold">{serviceEmployees}</span></Label>
                  <Slider 
                    id="service-employees"
                    value={[serviceEmployees]} 
                    onValueChange={(value) => setServiceEmployees(value[0])}
                    max={100} 
                    min={1} 
                    step={1}
                    className="mt-4 [&_[role=slider]]:bg-gradient-to-r [&_[role=slider]]:from-cyan-500 [&_[role=slider]]:to-purple-500 [&_[role=slider]]:border-0 [&_.range]:bg-gradient-to-r [&_.range]:from-cyan-500 [&_.range]:to-purple-500"
                    data-testid="slider-service-employees"
                  />
                </div>

                <div>
                  <Label htmlFor="service-package" className="text-gray-300">Service Package</Label>
                  <Select value={servicePackage} onValueChange={setServicePackage}>
                    <SelectTrigger id="service-package" className="mt-2 bg-white/10 border-white/20 text-white [&>span]:text-white" data-testid="select-service-package">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a0a2e] border-white/20">
                      <SelectItem value="165" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white" data-testid="option-basic-it">Basic IT ($165/user)</SelectItem>
                      <SelectItem value="265" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white" data-testid="option-managed-it">Managed IT ($265/user)</SelectItem>
                      <SelectItem value="365" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white" data-testid="option-managed-security">Managed IT + Security ($365/user)</SelectItem>
                      <SelectItem value="465" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white" data-testid="option-enterprise">Enterprise ($465/user)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-cyan-500/10 via-transparent to-purple-500/10 rounded-xl border border-white/10">
                <div className="text-center">
                  <p className="text-sm text-gray-400 mb-2">Estimated Monthly Cost</p>
                  <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                    ${serviceCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Monthly Rate • Per Employee: ${servicePackage}
                  </p>
                  <p className="text-sm text-green-400 mt-1">
                    Quarterly: ${(serviceCost * 3 * 0.9).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (10% discount)
                  </p>
                </div>
              </div>

              <div className="mt-6 text-center">
                <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:from-cyan-400 hover:to-purple-500 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300" data-testid="button-open-detailed-estimator">
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
