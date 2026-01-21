import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PremiumSlider } from "@/components/ui/premium-slider";
import { Button } from "@/components/ui/button";
import { ChevronRight, DollarSign, TrendingDown, Building2 } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

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
  const prefersReducedMotion = useReducedMotion();
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
      <section id="calculators" className="py-24 relative overflow-visible bg-[#0a0a0a]">
        {/* Gradient accent orbs */}
        <div className="absolute top-20 right-0 w-[600px] h-[600px] pointer-events-none opacity-40"
             style={{ background: "radial-gradient(circle at 100% 20%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)" }} />
        <div className="absolute bottom-20 left-0 w-[400px] h-[400px] pointer-events-none opacity-30"
             style={{ background: "radial-gradient(circle at 0% 80%, rgba(168, 85, 247, 0.12) 0%, transparent 50%)" }} />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center mb-14"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-6">
              <TrendingDown className="w-4 h-4 text-violet-400" />
              <span className="text-sm font-medium text-violet-300">Risk Assessment Tool</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              What's Downtime Really <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">Costing You?</span>
            </h2>
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
              Calculate your potential losses and see why proactive protection pays for itself.
            </p>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="w-full bg-[#111111] border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden">
              <CardContent className="p-0">
                {/* Calculator inputs area */}
                <div className="p-8 md:p-10 lg:p-12">
                  <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    {/* Industry Select */}
                    <div className="space-y-3">
                      <Label htmlFor="industry" className="text-sm font-semibold text-white/70 uppercase tracking-wider flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-violet-400" />
                        Industry
                      </Label>
                      <Select value={industry} onValueChange={setIndustry}>
                        <SelectTrigger 
                          id="industry" 
                          className="h-14 bg-white/[0.05] border-white/10 text-white text-base rounded-xl hover:bg-white/[0.08] hover:border-white/20 transition-all [&>span]:text-white" 
                          data-testid="select-industry"
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1a1a1a] border-white/10 rounded-xl">
                          <SelectItem value="law-firm" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white rounded-lg" data-testid="option-law-firm">Law Firm (2.0×)</SelectItem>
                          <SelectItem value="cpa-firm" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white rounded-lg" data-testid="option-cpa-firm">CPA Firm (1.8×)</SelectItem>
                          <SelectItem value="medical" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white rounded-lg" data-testid="option-medical">Medical Practice (2.5×)</SelectItem>
                          <SelectItem value="general-office" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white rounded-lg" data-testid="option-general-office">General Office (1.6×)</SelectItem>
                          <SelectItem value="real-estate" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white rounded-lg" data-testid="option-real-estate">Real Estate (1.6×)</SelectItem>
                          <SelectItem value="animal-hospital" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white rounded-lg" data-testid="option-animal-hospital">Animal Hospital (2.2×)</SelectItem>
                          <SelectItem value="retail" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white rounded-lg" data-testid="option-retail">Retail/Sales (1.7×)</SelectItem>
                          <SelectItem value="manufacturing" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white rounded-lg" data-testid="option-manufacturing">Manufacturing (2.0×)</SelectItem>
                          <SelectItem value="nonprofit" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white rounded-lg" data-testid="option-nonprofit">Nonprofit (1.5×)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Employees Slider */}
                    <div className="space-y-3">
                      <Label htmlFor="employees-affected" className="text-sm font-semibold text-white/70 uppercase tracking-wider flex items-center justify-between">
                        <span>Employees Affected</span>
                        <span className="text-lg font-bold text-violet-400">{employees}</span>
                      </Label>
                      <div className="pt-2">
                        <PremiumSlider 
                          id="employees-affected"
                          value={[employees]} 
                          onValueChange={(value) => setEmployees(value[0])}
                          max={100} 
                          min={1} 
                          step={1}
                          data-testid="slider-employees-affected"
                        />
                      </div>
                    </div>

                    {/* Hourly Wage Slider */}
                    <div className="space-y-3">
                      <Label htmlFor="hourly-wage" className="text-sm font-semibold text-white/70 uppercase tracking-wider flex items-center justify-between">
                        <span>Avg Hourly Wage</span>
                        <span className="text-lg font-bold text-violet-400">${hourlyWage}</span>
                      </Label>
                      <div className="pt-2">
                        <PremiumSlider 
                          id="hourly-wage"
                          value={[hourlyWage]} 
                          onValueChange={(value) => setHourlyWage(value[0])}
                          max={200} 
                          min={15} 
                          step={5}
                          data-testid="slider-hourly-wage"
                        />
                      </div>
                    </div>

                    {/* Downtime Hours Slider */}
                    <div className="space-y-3">
                      <Label htmlFor="downtime-hours" className="text-sm font-semibold text-white/70 uppercase tracking-wider flex items-center justify-between">
                        <span>Expected Downtime</span>
                        <span className="text-lg font-bold text-violet-400">{downtime}h</span>
                      </Label>
                      <div className="pt-2">
                        <PremiumSlider 
                          id="downtime-hours"
                          value={[downtime]} 
                          onValueChange={(value) => setDowntime(value[0])}
                          max={24} 
                          min={1} 
                          step={1}
                          data-testid="slider-downtime-hours"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Results area with gradient background */}
                <div 
                  className="p-8 md:p-10 lg:p-12 border-t border-white/[0.06]"
                  style={{
                    background: "linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(168, 85, 247, 0.05) 50%, rgba(192, 38, 211, 0.03) 100%)",
                  }}
                >
                  <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                    <div className="text-center md:text-left">
                      <p className="text-xs font-bold text-white/50 uppercase tracking-widest mb-3">Per-Incident Cost</p>
                      <p className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                        ${downtimeCost.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                      </p>
                    </div>
                    <div className="text-center md:text-left">
                      <p className="text-xs font-bold text-white/50 uppercase tracking-widest mb-3">Annual Cost (4 incidents)</p>
                      <p className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                        ${(downtimeCost * 4).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                      </p>
                    </div>
                  </div>

                  <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button 
                      size="lg"
                      className="h-14 px-8 bg-white text-black hover:bg-white/90 font-semibold rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.02]" 
                      data-testid="button-get-protected"
                    >
                      Get Protected Now
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </Button>
                    <Button 
                      variant="outline"
                      size="lg"
                      className="h-14 px-8 bg-transparent border-white/20 text-white hover:bg-white/10 font-semibold rounded-xl transition-all duration-300" 
                      data-testid="button-open-detailed-calculator"
                    >
                      Open Advanced Calculator
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Service Cost Estimator Section */}
      <section className="py-24 relative overflow-visible bg-[#0a0a0a]">
        {/* Accent */}
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] pointer-events-none opacity-30"
             style={{ background: "radial-gradient(circle at 0% 100%, rgba(139, 92, 246, 0.12) 0%, transparent 50%)" }} />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center mb-14"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-6">
              <DollarSign className="w-4 h-4 text-violet-400" />
              <span className="text-sm font-medium text-violet-300">Pricing Estimator</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Estimate Your <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">Monthly Investment</span>
            </h2>
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
              Transparent pricing based on your team size and protection level.
            </p>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="w-full bg-[#111111] border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden">
              <CardContent className="p-0">
                <div className="p-8 md:p-10 lg:p-12">
                  <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    {/* Service Employees Slider */}
                    <div className="space-y-3">
                      <Label htmlFor="service-employees" className="text-sm font-semibold text-white/70 uppercase tracking-wider flex items-center justify-between">
                        <span>Number of Employees</span>
                        <span className="text-lg font-bold text-violet-400">{serviceEmployees}</span>
                      </Label>
                      <div className="pt-2">
                        <PremiumSlider 
                          id="service-employees"
                          value={[serviceEmployees]} 
                          onValueChange={(value) => setServiceEmployees(value[0])}
                          max={100} 
                          min={1} 
                          step={1}
                          data-testid="slider-service-employees"
                        />
                      </div>
                    </div>

                    {/* Service Package Select */}
                    <div className="space-y-3">
                      <Label htmlFor="service-package" className="text-sm font-semibold text-white/70 uppercase tracking-wider">
                        Service Package
                      </Label>
                      <Select value={servicePackage} onValueChange={setServicePackage}>
                        <SelectTrigger 
                          id="service-package" 
                          className="h-14 bg-white/[0.05] border-white/10 text-white text-base rounded-xl hover:bg-white/[0.08] hover:border-white/20 transition-all [&>span]:text-white" 
                          data-testid="select-service-package"
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1a1a1a] border-white/10 rounded-xl">
                          <SelectItem value="165" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white rounded-lg" data-testid="option-office">Office - $165/user/mo</SelectItem>
                          <SelectItem value="245" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white rounded-lg" data-testid="option-business">Business - $245/user/mo</SelectItem>
                          <SelectItem value="345" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white rounded-lg" data-testid="option-enterprise">Enterprise - $345/user/mo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Results area */}
                <div 
                  className="p-8 md:p-10 lg:p-12 border-t border-white/[0.06]"
                  style={{
                    background: "linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(168, 85, 247, 0.05) 50%, rgba(192, 38, 211, 0.03) 100%)",
                  }}
                >
                  <div className="text-center">
                    <p className="text-xs font-bold text-white/50 uppercase tracking-widest mb-3">Estimated Monthly Cost</p>
                    <p className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                      ${serviceCost.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </p>
                    <p className="text-base text-white/50 mt-4">
                      ${servicePackage}/user/month
                    </p>
                    <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                      <span className="text-sm font-semibold text-emerald-400">
                        Quarterly: ${(serviceCost * 3 * 0.9).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} (save 10%)
                      </span>
                    </div>
                  </div>

                  <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a href="https://meet.digerati-experts.com/" target="_blank" rel="noopener noreferrer">
                      <Button 
                        size="lg"
                        className="h-14 px-8 bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:from-violet-500 hover:to-purple-500 font-semibold rounded-xl shadow-lg shadow-violet-500/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-violet-500/40" 
                        data-testid="button-schedule-consultation"
                      >
                        Schedule Consultation
                        <ChevronRight className="ml-2 h-5 w-5" />
                      </Button>
                    </a>
                    <Button 
                      variant="outline"
                      size="lg"
                      className="h-14 px-8 bg-transparent border-white/20 text-white hover:bg-white/10 font-semibold rounded-xl transition-all duration-300" 
                      data-testid="button-open-detailed-estimator"
                    >
                      Open Detailed Estimator
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </>
  );
};
