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
      <section id="calculators" className="py-20 relative overflow-visible bg-[#0a0a0a]">
        {/* Subtle accent */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
             style={{ background: "radial-gradient(circle at 100% 0%, rgba(139, 92, 246, 0.06) 0%, transparent 50%)" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <Calculator className="w-4 h-4 text-violet-400" />
              <span className="text-sm text-white/60">Cost Calculator</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              What's Downtime Really <span className="text-violet-400">Costing You?</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Quick estimate now. Open advanced to factor RTO/RPO and annual impact.
            </p>
          </div>

          <Card className="w-full max-w-5xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(139,92,246,0.15)]">
            <CardContent className="p-6 sm:p-8 md:p-10 lg:p-12">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="industry" className="text-sm font-semibold text-gray-200 uppercase tracking-wide">Industry</Label>
                  <Select value={industry} onValueChange={setIndustry}>
                    <SelectTrigger id="industry" className="mt-2 bg-white/10 border-white/20 text-white [&>span]:text-white" data-testid="select-industry">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0a0a0a] border-white/20">
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
                  <Label htmlFor="employees-affected" className="text-sm font-semibold text-white/80 uppercase tracking-wide">Employees Affected: <span className="text-violet-400">{employees}</span></Label>
                  <Slider 
                    id="employees-affected"
                    value={[employees]} 
                    onValueChange={(value) => setEmployees(value[0])}
                    max={100} 
                    min={1} 
                    step={1}
                    className="mt-4 [&_[role=slider]]:bg-violet-500 [&_[role=slider]]:border-0 [&_.range]:bg-violet-500"
                    data-testid="slider-employees-affected"
                  />
                </div>

                <div>
                  <Label htmlFor="hourly-wage" className="text-sm font-semibold text-white/80 uppercase tracking-wide">Avg Hourly Wage ($): <span className="text-violet-400">{hourlyWage}</span></Label>
                  <Slider 
                    id="hourly-wage"
                    value={[hourlyWage]} 
                    onValueChange={(value) => setHourlyWage(value[0])}
                    max={200} 
                    min={15} 
                    step={5}
                    className="mt-4 [&_[role=slider]]:bg-violet-500 [&_[role=slider]]:border-0 [&_.range]:bg-violet-500"
                    data-testid="slider-hourly-wage"
                  />
                </div>

                <div>
                  <Label htmlFor="downtime-hours" className="text-sm font-semibold text-white/80 uppercase tracking-wide">Expected Downtime (hours): <span className="text-violet-400">{downtime}</span></Label>
                  <Slider 
                    id="downtime-hours"
                    value={[downtime]} 
                    onValueChange={(value) => setDowntime(value[0])}
                    max={24} 
                    min={1} 
                    step={1}
                    className="mt-4 [&_[role=slider]]:bg-violet-500 [&_[role=slider]]:border-0 [&_.range]:bg-violet-500"
                    data-testid="slider-downtime-hours"
                  />
                </div>
              </div>

              <div className="mt-10 p-8 bg-violet-500/5 rounded-xl border border-white/10">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs font-bold text-white/60 uppercase tracking-wider mb-2">Per-Incident Cost</p>
                    <p className="text-4xl lg:text-5xl font-bold text-violet-400">
                      ${downtimeCost.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white/60 uppercase tracking-wider mb-2">Annual Cost (4 incidents)</p>
                    <p className="text-4xl lg:text-5xl font-bold text-white">
                      ${(downtimeCost * 4).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <Button className="bg-white text-black hover:bg-white/90 transition-all duration-300" data-testid="button-open-detailed-calculator">
                  Open Detailed Calculator <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Service Cost Estimator Section */}
      <section className="py-20 relative overflow-visible bg-[#0a0a0a]">
        {/* Subtle accent */}
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] pointer-events-none"
             style={{ background: "radial-gradient(circle at 0% 100%, rgba(139, 92, 246, 0.06) 0%, transparent 50%)" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <DollarSign className="w-4 h-4 text-violet-400" />
              <span className="text-sm text-white/60">Pricing Estimator</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Estimate Your <span className="text-violet-400">Service Cost</span> Now
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Get an instant quote based on your needs and team size.
            </p>
          </div>

          <Card className="w-full max-w-5xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(139,92,246,0.15)]">
            <CardContent className="p-6 sm:p-8 md:p-10 lg:p-12">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="service-employees" className="text-sm font-semibold text-gray-200 uppercase tracking-wide">Number of Employees: <span className="text-violet-400">{serviceEmployees}</span></Label>
                  <Slider 
                    id="service-employees"
                    value={[serviceEmployees]} 
                    onValueChange={(value) => setServiceEmployees(value[0])}
                    max={100} 
                    min={1} 
                    step={1}
                    className="mt-4 [&_[role=slider]]:bg-violet-500 [&_[role=slider]]:border-0 [&_.range]:bg-violet-500"
                    data-testid="slider-service-employees"
                  />
                </div>

                <div>
                  <Label htmlFor="service-package" className="text-sm font-semibold text-gray-200 uppercase tracking-wide">Service Package</Label>
                  <Select value={servicePackage} onValueChange={setServicePackage}>
                    <SelectTrigger id="service-package" className="mt-2 bg-white/10 border-white/20 text-white [&>span]:text-white" data-testid="select-service-package">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0a0a0a] border-white/20">
                      <SelectItem value="165" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white" data-testid="option-office">Office ($165/user)</SelectItem>
                      <SelectItem value="245" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white" data-testid="option-business">Business ($245/user)</SelectItem>
                      <SelectItem value="345" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white" data-testid="option-enterprise">Enterprise ($345/user)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mt-10 p-8 bg-violet-500/5 rounded-xl border border-violet-500/20">
                <div className="text-center">
                  <p className="text-xs font-bold text-white/50 uppercase tracking-wider mb-2">Estimated Monthly Cost</p>
                  <p className="text-5xl lg:text-6xl font-bold text-violet-400">
                    ${serviceCost.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </p>
                  <p className="text-sm text-white/60 mt-3">
                    ${servicePackage}/user/month
                  </p>
                  <p className="text-base text-emerald-500 font-semibold mt-2">
                    Quarterly: ${(serviceCost * 3 * 0.9).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} (10% off)
                  </p>
                </div>
              </div>

              <div className="mt-6 text-center">
                <Button className="bg-violet-600 text-white hover:bg-violet-500 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-300" data-testid="button-open-detailed-estimator">
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
