import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowRight, 
  CheckCircle, 
  Globe, 
  Shield, 
  Zap, 
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
  X
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
                  Digerati
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
                  <a href="#portfolio" className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    Portfolio
                  </a>
                  <a href="#contact" className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    Contact
                  </a>
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" data-testid="button-signin">Sign In</Button>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:opacity-90" data-testid="button-get-started">
                Get Started
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
              <a href="#portfolio" className="text-gray-700 hover:text-purple-600 block px-3 py-2 rounded-md text-base font-medium">
                Portfolio
              </a>
              <a href="#contact" className="text-gray-700 hover:text-purple-600 block px-3 py-2 rounded-md text-base font-medium">
                Contact
              </a>
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex flex-col space-y-2 px-3">
                  <Button variant="ghost" className="w-full justify-start">Sign In</Button>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                    Get Started
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
                Welcome to the Future of
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">
                  Digital Innovation
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-100 mb-8">
                Transform your business with cutting-edge technology solutions. 
                We help companies thrive in the digital age with innovative strategies and expert implementation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-purple-600 hover:bg-gray-100"
                  data-testid="button-hero-start"
                >
                  Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-purple-600"
                  data-testid="button-hero-demo"
                >
                  Watch Demo
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 mt-12">
                <div>
                  <div className="text-3xl font-bold text-white">500+</div>
                  <div className="text-sm text-gray-200">Happy Clients</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">95%</div>
                  <div className="text-sm text-gray-200">Success Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">24/7</div>
                  <div className="text-sm text-gray-200">Support</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <Card className="backdrop-blur-md bg-white/90 shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-2xl">Get Started Today</CardTitle>
                    <CardDescription>Join thousands of satisfied customers</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <Input placeholder="Your Name" data-testid="input-name" />
                      <Input type="email" placeholder="Email Address" data-testid="input-email" />
                      <Input type="tel" placeholder="Phone Number" data-testid="input-phone" />
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white" data-testid="button-submit">
                        Get Free Consultation
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

      {/* Features Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We offer comprehensive digital solutions to help your business succeed in the modern world
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-purple-600 transition-colors group" data-testid="card-web-development">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Web Development</CardTitle>
                <CardDescription>
                  Custom websites and web applications built with the latest technologies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">Responsive Design</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">SEO Optimization</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">Performance Focused</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-purple-600 transition-colors group" data-testid="card-mobile-apps">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Mobile Apps</CardTitle>
                <CardDescription>
                  Native and cross-platform mobile applications for iOS and Android
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">Cross-Platform</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">User-Friendly UI</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">App Store Ready</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-purple-600 transition-colors group" data-testid="card-digital-marketing">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Digital Marketing</CardTitle>
                <CardDescription>
                  Strategic marketing solutions to grow your online presence
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">Social Media</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">Content Strategy</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">Analytics & Reports</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose Digerati?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                With over a decade of experience in digital transformation, we've helped hundreds of businesses 
                achieve their goals through innovative technology solutions.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                      <Users className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Expert Team</h3>
                    <p className="text-gray-600">
                      Our team consists of industry experts with years of experience in their respective fields.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                      <Zap className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Fast Delivery</h3>
                    <p className="text-gray-600">
                      We understand time is money. Our agile approach ensures quick turnaround times.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                      <Shield className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Secure & Reliable</h3>
                    <p className="text-gray-600">
                      Security is our priority. We implement best practices to protect your data and systems.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-2xl">
                <div className="bg-gradient-to-br from-purple-600 to-blue-600 w-full h-96 rounded-lg flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-6xl font-bold mb-4">10+</div>
                    <div className="text-xl">Years of Excellence</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg text-gray-600">
              Don't just take our word for it - hear from our satisfied customers
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
                  "Digerati transformed our online presence completely. Our sales have increased by 200% since launching our new website."
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                  <div>
                    <div className="font-semibold">Sarah Johnson</div>
                    <div className="text-sm text-gray-600">CEO, TechCorp</div>
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
                  "The mobile app they developed for us exceeded all expectations. User engagement has never been higher!"
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                  <div>
                    <div className="font-semibold">Michael Chen</div>
                    <div className="text-sm text-gray-600">Founder, StartupX</div>
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
                  "Professional, innovative, and reliable. Digerati is our go-to partner for all digital initiatives."
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                  <div>
                    <div className="font-semibold">Emily Davis</div>
                    <div className="text-sm text-gray-600">CTO, Innovation Labs</div>
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
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-gray-100 mb-8">
            Let's discuss how we can help you achieve your digital goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100" data-testid="button-cta-consultation">
              Schedule Free Consultation
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600" data-testid="button-cta-portfolio">
              View Portfolio <ChevronRight className="ml-2 h-5 w-5" />
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
                Get in Touch
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Have a project in mind? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>

              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="h-6 w-6 text-purple-600 mr-3" />
                  <span className="text-gray-700">hello@digerati.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-6 w-6 text-purple-600 mr-3" />
                  <span className="text-gray-700">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-6 w-6 text-purple-600 mr-3" />
                  <span className="text-gray-700">123 Tech Street, Digital City, DC 12345</span>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors" data-testid="social-twitter">
                    <Twitter className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors" data-testid="social-facebook">
                    <Facebook className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors" data-testid="social-linkedin">
                    <Linkedin className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors" data-testid="social-instagram">
                    <Instagram className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>We'll get back to you within 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <Input placeholder="Your Name" data-testid="input-contact-name" />
                  <Input type="email" placeholder="Email Address" data-testid="input-contact-email" />
                  <Input placeholder="Subject" data-testid="input-contact-subject" />
                  <Textarea placeholder="Your Message" rows={5} data-testid="textarea-contact-message" />
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
                Digerati
              </h3>
              <p className="text-gray-400">
                Your partner in digital transformation and innovation.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Web Development</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Mobile Apps</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Digital Marketing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Consulting</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Portfolio</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Digerati. All rights reserved. | Designed with ❤️ by Digerati Team
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};