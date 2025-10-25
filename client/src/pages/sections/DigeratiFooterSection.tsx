export const DigeratiFooterSection = (): JSX.Element => {
  return (
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
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 rounded px-1">Managed Security</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 rounded px-1">Managed IT</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 rounded px-1">Compliance Services</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 rounded px-1">Incident Response</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 rounded px-1">Security Training</a></li>
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
  );
};