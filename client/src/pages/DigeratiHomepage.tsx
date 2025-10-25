import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  Clock
} from "lucide-react";
import { useState } from "react";

export const DigeratiHomepage = (): JSX.Element => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
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
                  <a href="#about" className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    About
                  </a>
                  <a href="#pricing" className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    Pricing
                  </a>
                  <a href="#contact" className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    Contact
                  </a>
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" data-testid="button-signin">Client Portal</Button>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:opacity-90" data-testid="button-get-started">
                Get Protected Now
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
              <a href="#about" className="text-gray-700 hover:text-purple-600 block px-3 py-2 rounded-md text-base font-medium">
                About
              </a>
              <a href="#pricing" className="text-gray-700 hover:text-purple-600 block px-3 py-2 rounded-md text-base font-medium">
                Pricing
              </a>
              <a href="#contact" className="text-gray-700 hover:text-purple-600 block px-3 py-2 rounded-md text-base font-medium">
                Contact
              </a>
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex flex-col space-y-2 px-3">
                  <Button variant="ghost" className="w-full justify-start">Client Portal</Button>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                    Get Protected Now
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
                Get 24/7 protection, cut cyber liability, and pass compliance checks with ease.
                Arizona's trusted Managed Security Service Provider.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-purple-600 hover:bg-gray-100"
                  data-testid="button-hero-start"
                >
                  Get Free Security Assessment <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-purple-600"
                  data-testid="button-hero-demo"
                >
                  Emergency Support: (480) 848-6116
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 mt-12">
                <div>
                  <div className="text-3xl font-bold text-white">99.9%</div>
                  <div className="text-sm text-gray-200">Uptime SLA</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">24/7</div>
                  <div className="text-sm text-gray-200">Security Monitoring</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">15 min</div>
                  <div className="text-sm text-gray-200">Response Time</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <Card className="backdrop-blur-md bg-white/90 shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-2xl">Get Free Security Assessment</CardTitle>
                    <CardDescription>Discover your security vulnerabilities before hackers do</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div>
                        <Label htmlFor="business-name">Business Name *</Label>
                        <Input id="business-name" placeholder="Your Company Name" data-testid="input-business-name" />
                      </div>
                      <div>
                        <Label htmlFor="email">Business Email *</Label>
                        <Input id="email" type="email" placeholder="you@company.com" data-testid="input-email" />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input id="phone" type="tel" placeholder="(480) 000-0000" data-testid="input-phone" />
                      </div>
                      <div>
                        <Label htmlFor="employees">Number of Employees</Label>
                        <Select>
                          <SelectTrigger id="employees">
                            <SelectValue placeholder="Select range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-10">1-10</SelectItem>
                            <SelectItem value="11-50">11-50</SelectItem>
                            <SelectItem value="51-200">51-200</SelectItem>
                            <SelectItem value="201-500">201-500</SelectItem>
                            <SelectItem value="500+">500+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white" data-testid="button-submit">
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

      {/* Alert Banner */}
      <section className="bg-red-50 border-y border-red-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <p className="text-red-800 font-medium">
              Critical Alert: New ransomware variant targeting Arizona businesses detected. Protect your systems now.
            </p>
            <Button size="sm" variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Cybersecurity & IT Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Complete managed security and IT solutions to protect your business from modern threats
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-purple-600 transition-colors group" data-testid="card-managed-security">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Managed Security Services</CardTitle>
                <CardDescription>
                  24/7 threat monitoring and incident response
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">SOC-as-a-Service</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">Endpoint Detection & Response</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">Vulnerability Management</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">Incident Response</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-purple-600 transition-colors group" data-testid="card-managed-it">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Server className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Managed IT Services</CardTitle>
                <CardDescription>
                  Complete IT infrastructure management and support
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">Network Management</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">Help Desk Support</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">Cloud Migration</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">Backup & Disaster Recovery</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-purple-600 transition-colors group" data-testid="card-compliance">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <FileCheck className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Compliance & Governance</CardTitle>
                <CardDescription>
                  Meet regulatory requirements with confidence
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">HIPAA Compliance</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">PCI DSS Compliance</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">NIST Framework</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">Security Audits</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why MSP Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Businesses Choose Managed Security Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The cyber threat landscape is evolving faster than ever. Here's why smart businesses partner with an MSSP.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">60% of Small Businesses</h3>
              <p className="text-gray-600">
                Close within 6 months of a cyber attack. Don't become a statistic.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <ShieldCheck className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">$4.45 Million</h3>
              <p className="text-gray-600">
                Average cost of a data breach in 2023. Prevention costs less than 1% of this.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Every 39 Seconds</h3>
              <p className="text-gray-600">
                A cyber attack occurs. Continuous monitoring is no longer optional.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">95% of Breaches</h3>
              <p className="text-gray-600">
                Are caused by human error. Our training programs protect your weakest link.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <Cpu className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">43% of Attacks</h3>
              <p className="text-gray-600">
                Target small businesses. Size doesn't matter to cybercriminals.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Headphones className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Protection</h3>
              <p className="text-gray-600">
                Threats don't sleep. Neither does our Security Operations Center.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Chandler's Trusted Cybersecurity Partner
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Digerati Experts is Arizona's premier Managed Security Service Provider, protecting 
                businesses across the Phoenix metropolitan area since 2010. We combine enterprise-grade 
                security with personalized service that larger firms can't match.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                      <Shield className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Certified Security Experts</h3>
                    <p className="text-gray-600">
                      Our team holds CISSP, CCSP, CEH, and Security+ certifications. We stay ahead of threats so you don't have to.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                      <MapPin className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Local Presence, Global Protection</h3>
                    <p className="text-gray-600">
                      Based in Chandler, we provide on-site support when needed while leveraging world-class security tools.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                      <Clock className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Rapid Response</h3>
                    <p className="text-gray-600">
                      15-minute response time for critical incidents. Your security is our priority, day or night.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-2xl">
                <div className="bg-gradient-to-br from-purple-600 to-blue-600 w-full h-96 rounded-lg flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-6xl font-bold mb-4">500+</div>
                    <div className="text-xl">Arizona Businesses Protected</div>
                    <div className="mt-8 grid grid-cols-3 gap-8">
                      <div>
                        <div className="text-2xl font-bold">99.9%</div>
                        <div className="text-sm">Uptime</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">24/7</div>
                        <div className="text-sm">Monitoring</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">0</div>
                        <div className="text-sm">Breaches</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              No hidden fees, no surprises. Choose the protection level that fits your business.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="relative hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">Essential</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$299</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <CardDescription className="mt-2">
                  For small businesses up to 10 employees
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">24/7 Security Monitoring</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Endpoint Protection</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Email Security</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Monthly Security Reports</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">8x5 Support</span>
                  </li>
                </ul>
                <Button className="w-full mt-6" variant="outline">
                  Get Started
                </Button>
              </CardContent>
            </Card>

            <Card className="relative hover:shadow-xl transition-shadow border-purple-600 border-2">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm">
                  Most Popular
                </span>
              </div>
              <CardHeader>
                <CardTitle className="text-xl">Professional</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$599</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <CardDescription className="mt-2">
                  For growing businesses up to 50 employees
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-semibold">Everything in Essential, plus:</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Advanced Threat Detection</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Network Security</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Vulnerability Scanning</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">24x7 Support</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Compliance Assistance</span>
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                  Get Started
                </Button>
              </CardContent>
            </Card>

            <Card className="relative hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">Enterprise</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">Custom</span>
                </div>
                <CardDescription className="mt-2">
                  For large organizations with complex needs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-semibold">Everything in Professional, plus:</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Dedicated Security Team</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Custom Security Policies</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Penetration Testing</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Incident Response Team</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">SLA Guarantees</span>
                  </li>
                </ul>
                <Button className="w-full mt-6" variant="outline">
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Arizona Businesses
            </h2>
            <p className="text-lg text-gray-600">
              See why companies across Chandler, Phoenix, and Scottsdale trust us with their security
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card data-testid="testimonial-1">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <CardDescription>
                  "Digerati Experts saved us from a ransomware attack that could have cost us millions. Their rapid response team had us back online in hours, not days."
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                  <div>
                    <div className="font-semibold">Michael Thompson</div>
                    <div className="text-sm text-gray-600">CEO, Arizona Manufacturing Co.</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card data-testid="testimonial-2">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <CardDescription>
                  "We passed our HIPAA audit with flying colors thanks to Digerati. They handle our compliance so we can focus on patient care."
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                  <div>
                    <div className="font-semibold">Dr. Sarah Martinez</div>
                    <div className="text-sm text-gray-600">Chandler Medical Group</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card data-testid="testimonial-3">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <CardDescription>
                  "Switching to Digerati cut our IT costs by 40% while dramatically improving our security posture. Best decision we've made."
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                  <div>
                    <div className="font-semibold">James Wilson</div>
                    <div className="text-sm text-gray-600">CFO, Phoenix Financial Services</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Don't Wait for a Breach to Happen
          </h2>
          <p className="text-xl text-gray-100 mb-8">
            Get your free security assessment and see how vulnerable your business really is.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100" data-testid="button-cta-assessment">
              Get Free Security Assessment
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600" data-testid="button-cta-call">
              Call Now: (480) 848-6116
            </Button>
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
                  <span className="text-gray-700">(480) 848-6116</span>
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
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white" data-testid="button-send-message">
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
                Arizona's Trusted Managed Security Service Provider
              </p>
              <div className="flex space-x-3">
                <Shield className="h-5 w-5 text-gray-400" />
                <Lock className="h-5 w-5 text-gray-400" />
                <Eye className="h-5 w-5 text-gray-400" />
                <Cloud className="h-5 w-5 text-gray-400" />
              </div>
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
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Manufacturing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Legal</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Retail</a></li>
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
                <span className="text-gray-400">Emergency Hotline:</span>
                <a href="tel:4808486116" className="text-purple-400 font-semibold hover:text-purple-300">
                  (480) 848-6116
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};