import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowRight, 
  CheckCircle, 
  Shield, 
  Lock,
  Eye,
  Server,
  Cloud,
  Users, 
  Star,
  ChevronRight,
  ChevronLeft,
  Mail,
  Phone,
  MapPin,
  Twitter,
  Facebook,
  Linkedin,
  Instagram,
  Menu,
  X,
  AlertTriangle,
  FileCheck,
  Cpu,
  Headphones,
  ShieldCheck,
  Clock,
  Building,
  Briefcase,
  Heart,
  Home,
  Stethoscope,
  Calculator,
  DollarSign,
  TrendingDown,
  Activity,
  Zap,
  Globe,
  UserCheck,
  KeyRound,
  CloudLock,
  MailWarning,
  FileWarning,
  ChevronDown
} from "lucide-react";
import { useState, useEffect } from "react";

export const DigeratiHomepage = (): JSX.Element => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  const testimonials = [
    {
      rating: 5,
      text: "Digerati delivered beyond our expectations. Their encryption protocols and risk assessments helped us meet strict compliance standards with ease.",
      author: "James Torres",
      role: "CEO, Phoenix Manufacturing",
      avatar: "/api/placeholder/40/40"
    },
    {
      rating: 5, 
      text: "We passed our HIPAA audit with flying colors thanks to Digerati. They handle our compliance so we can focus on patient care.",
      author: "Dr. Sarah Martinez",
      role: "Chandler Medical Group",
      avatar: "/api/placeholder/40/40"
    },
    {
      rating: 5,
      text: "Switching to Digerati cut our IT costs by 40% while dramatically improving our security posture. Best decision we've made.",
      author: "Michael Chen",
      role: "CFO, Arizona Financial Services",
      avatar: "/api/placeholder/40/40"
    }
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Digerati Experts
                </h1>
              </div>
              <div className="hidden md:block ml-10">
                <div className="flex items-baseline space-x-4">
                  <a href="#home" className="text-gray-900 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    Home
                  </a>
                  <a href="#services" className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    Services
                  </a>
                  <a href="#pricing" className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    Pricing
                  </a>
                  <a href="#about" className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    About
                  </a>
                  <a href="#contact" className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    Contact
                  </a>
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <a href="tel:4805195892" className="text-purple-600 font-semibold hover:text-purple-700">
                (480) 519-5892
              </a>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700" data-testid="button-get-started">
                Get Free Assessment
              </Button>
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 hover:text-purple-600"
                data-testid="button-mobile-menu"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#home" className="text-gray-900 hover:text-purple-600 block px-3 py-2 rounded-md text-base font-medium">
                Home
              </a>
              <a href="#services" className="text-gray-700 hover:text-purple-600 block px-3 py-2 rounded-md text-base font-medium">
                Services
              </a>
              <a href="#pricing" className="text-gray-700 hover:text-purple-600 block px-3 py-2 rounded-md text-base font-medium">
                Pricing
              </a>
              <a href="#about" className="text-gray-700 hover:text-purple-600 block px-3 py-2 rounded-md text-base font-medium">
                About
              </a>
              <a href="#contact" className="text-gray-700 hover:text-purple-600 block px-3 py-2 rounded-md text-base font-medium">
                Contact
              </a>
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex flex-col space-y-2 px-3">
                  <a href="tel:4805195892" className="text-purple-600 font-semibold">
                    Call: (480) 519-5892
                  </a>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700">
                    Get Free Assessment
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-purple-700"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full opacity-20 blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                <span className="text-yellow-300">Hackers Don't Wait.</span>
                <br />
                <span className="text-white">Protect Your Business Now.</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-100 mb-8">
                Get 24/7 protection, cut cyber liability, and pass compliance checks — all without hiring in-house IT.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mb-1" />
                  <p className="text-xs text-gray-100">Insurance &<br/>Compliance-Ready</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <Shield className="h-5 w-5 text-blue-400 mb-1" />
                  <p className="text-xs text-gray-100">24/7 Human-Led<br/>Monitoring</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <Building className="h-5 w-5 text-purple-400 mb-1" />
                  <p className="text-xs text-gray-100">Built for Small<br/>Businesses</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <FileCheck className="h-5 w-5 text-yellow-400 mb-1" />
                  <p className="text-xs text-gray-100">Easy-to-Read<br/>Risk Reports</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-purple-600 hover:bg-gray-100 hover:text-purple-700"
                  data-testid="button-hero-start"
                >
                  Get Free Assessment <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-purple-600"
                  data-testid="button-hero-demo"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  (480) 519-5892
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <Card className="backdrop-blur-md bg-white/95 shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-2xl">Get Started Today</CardTitle>
                    <CardDescription>Lock In 80% Off Your Cyber Risk Assessment — Act Now to Identify Vulnerabilities Before Hackers Do.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div>
                        <Label htmlFor="full-name">Full Name *</Label>
                        <Input id="full-name" placeholder="John Smith" data-testid="input-full-name" />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input id="email" type="email" placeholder="john@company.com" data-testid="input-email" />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input id="phone" type="tel" placeholder="(480) 000-0000" data-testid="input-phone" />
                      </div>
                      <div>
                        <Label htmlFor="company">Company Name *</Label>
                        <Input id="company" placeholder="Your Company Inc." data-testid="input-company" />
                      </div>
                      <p className="text-xs text-gray-500">
                        All information submitted is protected and handled in compliance with our Privacy Policy.
                      </p>
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700" data-testid="button-submit">
                        Get My Free Assessment
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-20 fill-white">
            <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              We Exist to Protect and Enable Your Business
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              If you're like most business leaders, you don't want another vendor — you want a security-first partner who proactively reduces risk, improves uptime, and keeps your team moving.
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4">
              Digerati Experts brings managed IT, cybersecurity, and compliance together in one streamlined operation – built for results, not noise.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-purple-600 transition-colors group">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Security-First Operations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Every system, endpoint, and user is protected - by design, not by reaction.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-purple-600 transition-colors group">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Co-Managed or Fully Managed</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We support your internal IT or serve as your outsourced technology team.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-purple-600 transition-colors group">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Activity className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Executive-Level Transparency</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Reports, KPIs, and compliance insights that make sense - and drive decisions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What We Provide
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our comprehensive suite of security services is designed to protect your business at every level, from endpoints to cloud infrastructure.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border hover:shadow-xl transition-all duration-300 hover:-translate-y-1" data-testid="card-threat-monitoring">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Eye className="h-6 w-6 text-white" />
                </div>
                <CardTitle>24/7 Threat Monitoring & Response</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We detect and stop threats before they escalate. Real-time MDR for continuous protection.
                </p>
              </CardContent>
            </Card>

            <Card className="border hover:shadow-xl transition-all duration-300 hover:-translate-y-1" data-testid="card-endpoint">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <ShieldCheck className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Endpoint Protection (EDR/XDR)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Advanced endpoint detection and response to secure all devices in your network.
                </p>
              </CardContent>
            </Card>

            <Card className="border hover:shadow-xl transition-all duration-300 hover:-translate-y-1" data-testid="card-mfa">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <UserCheck className="h-6 w-6 text-white" />
                </div>
                <CardTitle>User Access & MFA Enforcement</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Multi-factor authentication and access control to prevent unauthorized entry.
                </p>
              </CardContent>
            </Card>

            <Card className="border hover:shadow-xl transition-all duration-300 hover:-translate-y-1" data-testid="card-identity">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <KeyRound className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Identity & Access Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Comprehensive IAM solutions to manage user identities and permissions.
                </p>
              </CardContent>
            </Card>

            <Card className="border hover:shadow-xl transition-all duration-300 hover:-translate-y-1" data-testid="card-cloud">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <CloudLock className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Cloud Security Hardening</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Secure your cloud infrastructure with best-practice configurations and monitoring.
                </p>
              </CardContent>
            </Card>

            <Card className="border hover:shadow-xl transition-all duration-300 hover:-translate-y-1" data-testid="card-phishing">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <MailWarning className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Phishing & Email Security</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Advanced email protection against phishing, spam, and malicious attachments.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700" size="lg">
              Explore More Services <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* How We Protect Your Business Section - New from Figma */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How We Protect Your Business
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our proven 4-step process ensures your business stays secure and compliant
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                1
              </div>
              <h3 className="text-lg font-semibold mb-2">Discovery & Assessment</h3>
              <p className="text-gray-600 text-sm">
                We analyze your current security posture and identify vulnerabilities
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                2
              </div>
              <h3 className="text-lg font-semibold mb-2">Strategic Planning</h3>
              <p className="text-gray-600 text-sm">
                Custom security roadmap aligned with your business goals
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                3
              </div>
              <h3 className="text-lg font-semibold mb-2">Implementation</h3>
              <p className="text-gray-600 text-sm">
                Deploy enterprise-grade security tools and protocols
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                4
              </div>
              <h3 className="text-lg font-semibold mb-2">Continuous Protection</h3>
              <p className="text-gray-600 text-sm">
                24/7 monitoring, updates, and proactive threat hunting
              </p>
            </div>
          </div>
        </div>
      </section>

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
                    className="mt-2"
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
                    className="mt-2"
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
                    className="mt-2"
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
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700">
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
                    className="mt-2"
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
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700">
                  Open Detailed Estimator <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Industries We Serve
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Specialized cybersecurity solutions for Arizona's essential sectors
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
            <div className="text-center group hover:scale-105 transition-transform">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-purple-200 group-hover:to-blue-200">
                <Briefcase className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Law Firms</h3>
            </div>

            <div className="text-center group hover:scale-105 transition-transform">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-purple-200 group-hover:to-blue-200">
                <Calculator className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900">CPA Firms</h3>
            </div>

            <div className="text-center group hover:scale-105 transition-transform">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-purple-200 group-hover:to-blue-200">
                <Stethoscope className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Medical<br/>Practices</h3>
            </div>

            <div className="text-center group hover:scale-105 transition-transform">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-purple-200 group-hover:to-blue-200">
                <Home className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Real Estate<br/>Firms</h3>
            </div>

            <div className="text-center group hover:scale-105 transition-transform">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-purple-200 group-hover:to-blue-200">
                <Heart className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Animal<br/>Hospitals</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ProActive Ecosystem Pricing
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Clear, predictable, and compliance-ready. Packages start at <span className="font-bold text-purple-600">$165 per user/month</span>. 
              A <span className="font-bold text-purple-600">$1,200/site minimum</span> applies for offices with 5+ users.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="relative hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="text-xl">Basic IT</CardTitle>
                <div className="mt-4">
                  <span className="text-5xl font-bold text-purple-600">$165</span>
                  <span className="text-gray-600 block text-sm mt-1">per user avg</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Corporate Antivirus included</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Core Monitoring (health & performance)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Service Desk & OS patching</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Workstation backup</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Microsoft 365 / Google admin</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Asset inventory & reporting</span>
                  </li>
                </ul>
                <div className="mt-6 space-y-2">
                  <Button className="w-full" variant="outline">
                    Learn More
                  </Button>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700">
                    Book a Strategy Call
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="relative hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-purple-600 border-2">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
              <CardHeader>
                <CardTitle className="text-xl">Advanced Security</CardTitle>
                <div className="mt-4">
                  <span className="text-5xl font-bold text-purple-600">$245</span>
                  <span className="text-gray-600 block text-sm mt-1">per user avg</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-semibold">Everything in Basic IT</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Advanced endpoint defense</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Email + SaaS threat protection</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Security awareness training</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Quarterly risk reviews</span>
                  </li>
                </ul>
                <div className="mt-6 space-y-2">
                  <Button className="w-full" variant="outline">
                    Learn More
                  </Button>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700">
                    Book a Strategy Call
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="relative hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="text-xl">Enterprise</CardTitle>
                <div className="mt-4">
                  <span className="text-5xl font-bold text-purple-600">$345</span>
                  <span className="text-gray-600 block text-sm mt-1">per user avg</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-semibold">Everything in Advanced Security</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Zero-trust networking</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Incident response & forensics</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Compliance evidence packs (HIPAA/SOC2)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Priority response SLAs</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Disaster recovery testing</span>
                  </li>
                </ul>
                <div className="mt-6 space-y-2">
                  <Button className="w-full" variant="outline">
                    Learn More
                  </Button>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700">
                    Book a Strategy Call
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 text-center text-sm text-gray-600">
            <p>Small sites under 5 users are billed per-user only — no minimum. Offices with 5+ users include a $1,200/site minimum.</p>
            <p>Final pricing is tailored to your users, sites, and compliance needs.</p>
          </div>

          <div className="mt-12 text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700">
                Book a 15-Minute Intro Call
              </Button>
              <Button size="lg" variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50">
                See Full Pricing & Packages
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Real Stories from Satisfied Customers
            </h2>
            <div className="flex items-center justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-lg text-gray-600">
              Trusted by 100+ Arizona Businesses
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Card className="relative">
              <CardContent className="p-8">
                <div className="flex items-center justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">5-Star Rating</span>
                </div>
                
                <p className="text-lg text-gray-700 italic text-center mb-6">
                  "{testimonials[currentTestimonial].text}"
                </p>
                
                <div className="flex items-center justify-center">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonials[currentTestimonial].author}</div>
                    <div className="text-sm text-gray-600">{testimonials[currentTestimonial].role}</div>
                  </div>
                </div>

                <div className="absolute top-1/2 -translate-y-1/2 left-4">
                  <button
                    onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5 text-gray-700" />
                  </button>
                </div>

                <div className="absolute top-1/2 -translate-y-1/2 right-4">
                  <button
                    onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <ChevronRight className="h-5 w-5 text-gray-700" />
                  </button>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center mt-6 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    currentTestimonial === index ? 'bg-purple-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Get a $20,000 Pen Test – Free
          </h2>
          <p className="text-xl text-gray-100 mb-8">
            Discover vulnerabilities before attackers do – without paying a cent.
          </p>
          
          <div className="flex items-center justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
            ))}
          </div>
          
          <p className="text-white mb-8 font-semibold">Trusted by 100+ Arizona Businesses.</p>
          
          <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8 text-white">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span>Cyber Risk Scan</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span>Full Report</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span>Executive Consultation</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 hover:text-purple-700" data-testid="button-cta-assessment">
              Get Free Security Assessment
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600" data-testid="button-cta-call">
              Call Now: (480) 519-5892
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Find answers to common queries about us.
            </p>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader className="cursor-pointer hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">What is your best service?</CardTitle>
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our most comprehensive service is the Enterprise package, which includes zero-trust networking, incident response, compliance support, and disaster recovery testing. However, most businesses find our Advanced Security package provides the perfect balance of protection and value.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="cursor-pointer hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">How do I choose the right plan for my business?</CardTitle>
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Evaluate your business size, needs, and goals. Our Basic plan is great for small businesses, while Advanced Security and Enterprise are designed for larger teams and advanced requirements. We offer a free consultation to help you choose.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="cursor-pointer hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Can I customize the solutions?</CardTitle>
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Yes! We understand every business is unique. Our packages can be customized with additional services, and we offer both co-managed and fully managed options to fit your existing IT structure.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="cursor-pointer hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Is my data secure?</CardTitle>
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Absolutely. We employ enterprise-grade encryption, 24/7 monitoring, and follow strict security protocols. We're SOC 2 Type II certified and help our clients meet HIPAA, PCI DSS, and other compliance standards.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Ready to Secure Your Business?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Located in the heart of Chandler, we're your local cybersecurity experts. 
                Whether you need immediate help or want to explore our services, we're here for you.
              </p>

              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="h-6 w-6 text-purple-600 mr-3" />
                  <span className="text-gray-700">info@digerati-experts.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-6 w-6 text-purple-600 mr-3" />
                  <span className="text-gray-700">(480) 519-5892</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-6 w-6 text-purple-600 mr-3" />
                  <span className="text-gray-700">3165 S Alma School Rd Suite 29, Chandler, AZ 85248</span>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Office Hours</h3>
                <div className="space-y-2 text-gray-700">
                  <p>Monday - Friday: 7:00 AM - 6:00 PM MST</p>
                  <p>Saturday: Emergency Support Only</p>
                  <p>Sunday: Emergency Support Only</p>
                  <p className="text-purple-600 font-semibold">24/7 Security Operations Center Always Active</p>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Connect With Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors" data-testid="social-linkedin">
                    <Linkedin className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors" data-testid="social-facebook">
                    <Facebook className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors" data-testid="social-twitter">
                    <Twitter className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
                <CardDescription>Fill out the form for a free consultation</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="contact-name">Your Name *</Label>
                    <Input id="contact-name" placeholder="John Smith" data-testid="input-contact-name" />
                  </div>
                  <div>
                    <Label htmlFor="contact-email">Business Email *</Label>
                    <Input id="contact-email" type="email" placeholder="john@company.com" data-testid="input-contact-email" />
                  </div>
                  <div>
                    <Label htmlFor="contact-phone">Phone Number *</Label>
                    <Input id="contact-phone" type="tel" placeholder="(480) 000-0000" data-testid="input-contact-phone" />
                  </div>
                  <div>
                    <Label htmlFor="contact-company">Company Name</Label>
                    <Input id="contact-company" placeholder="Your Company Inc." data-testid="input-contact-company" />
                  </div>
                  <div>
                    <Label htmlFor="contact-service">Service Interested In</Label>
                    <Select>
                      <SelectTrigger id="contact-service">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="managed-security">Managed Security Services</SelectItem>
                        <SelectItem value="managed-it">Managed IT Services</SelectItem>
                        <SelectItem value="compliance">Compliance & Governance</SelectItem>
                        <SelectItem value="incident-response">Incident Response</SelectItem>
                        <SelectItem value="assessment">Security Assessment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="contact-message">Message</Label>
                    <Textarea id="contact-message" placeholder="Tell us about your security needs..." rows={4} data-testid="textarea-contact-message" />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700" data-testid="button-send-message">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
                Digerati Experts
              </h3>
              <p className="text-gray-400 mb-4">
                Elite IT & Cybersecurity Services
              </p>
              <p className="text-gray-400 text-sm">
                Arizona's Trusted Managed Security Service Provider
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Managed Security</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Managed IT</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Compliance Services</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Incident Response</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Security Training</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Industries</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Healthcare</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Financial Services</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Legal</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Manufacturing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Real Estate</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Security Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Threat Intelligence</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Case Studies</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-center md:text-left">
                © 2024 Digerati Experts. All rights reserved. | SOC 2 Type II Certified | CMMC Ready
              </p>
              <div className="mt-4 md:mt-0 flex items-center space-x-4">
                <span className="text-gray-400">24/7 Emergency:</span>
                <a href="tel:4805195892" className="text-purple-400 font-semibold hover:text-purple-300">
                  (480) 519-5892
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};