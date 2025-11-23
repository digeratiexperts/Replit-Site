import { PortalLayout } from "./PortalLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, ShoppingCart, Building2 } from "lucide-react";

export default function PortalProcurementStore() {
  const distributors = [
    {
      name: "Griffin IT",
      url: "https://shop.griffin-it.com/",
      description: "Comprehensive IT solutions and equipment distributor",
      categories: ["Hardware", "Software", "Networking"],
      logo: "🏢",
      featured: true,
    },
    {
      name: "Sherweb",
      url: "https://www.sherweb.com/",
      description: "Cloud solutions and Microsoft partner services",
      categories: ["Cloud Services", "Microsoft Products", "Licensing"],
      logo: "☁️",
      featured: true,
    },
    {
      name: "Pax8",
      url: "https://www.pax8.com/",
      description: "Cloud marketplace for IT service providers",
      categories: ["Cloud Products", "Security", "Management"],
      logo: "🛡️",
      featured: true,
    },
    {
      name: "ClimbCS",
      url: "https://www.climbcs.com/",
      description: "Managed services and IT solutions partner",
      categories: ["Managed Services", "Support", "Solutions"],
      logo: "🚀",
      featured: true,
    },
  ];

  const internalProducts = [
    {
      id: "INT-001",
      name: "Premium Support Package",
      description: "24/7 managed IT support and monitoring",
      price: "$299/month",
      category: "Services",
    },
    {
      id: "INT-002",
      name: "Security Audit Service",
      description: "Comprehensive security assessment and reporting",
      price: "$1,999",
      category: "Consulting",
    },
    {
      id: "INT-003",
      name: "Disaster Recovery Plan",
      description: "Full DR setup and testing included",
      price: "$2,499",
      category: "Services",
    },
    {
      id: "INT-004",
      name: "Compliance Training",
      description: "Employee security and compliance training",
      price: "$799",
      category: "Training",
    },
  ];

  return (
    <PortalLayout title="Procurement Store">
      <div className="space-y-8">
        {/* Internal Products Section */}
        <section data-testid="section-internal-products">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Digerati Experts Products & Services</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Our exclusive managed services and solutions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {internalProducts.map((product) => (
              <Card
                key={product.id}
                className="hover:border-[#5034ff]/50 transition-colors cursor-pointer"
                data-testid={`card-product-${product.id}`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                      <Badge variant="secondary" className="mt-2">
                        {product.category}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold text-[#5034ff]">{product.price}</p>
                    <Button size="sm" className="bg-[#5034ff] hover:bg-[#5034ff]/90" data-testid={`button-add-${product.id}`}>
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Partner Distributors Section */}
        <section data-testid="section-partner-distributors">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Partner Distributors</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Access products and services from our trusted partners</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {distributors.map((distributor) => (
              <Card
                key={distributor.name}
                className="hover:border-[#5034ff]/50 transition-colors"
                data-testid={`card-distributor-${distributor.name.toLowerCase()}`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="text-3xl">{distributor.logo}</div>
                    {distributor.featured && (
                      <Badge className="bg-[#FFCC00] text-[#030228]">Featured</Badge>
                    )}
                  </div>
                  <CardTitle>{distributor.name}</CardTitle>
                  <CardDescription>{distributor.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-2">Categories</p>
                      <div className="flex flex-wrap gap-2">
                        {distributor.categories.map((category) => (
                          <Badge key={category} variant="outline" className="text-xs">
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button
                      className="w-full bg-[#5034ff] hover:bg-[#5034ff]/90 text-white"
                      onClick={() => window.open(distributor.url, "_blank")}
                      data-testid={`button-visit-${distributor.name.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Visit Store
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Info Box */}
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900/30 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-300">
            <strong>Procurement Support:</strong> Need help finding the right product or service? Contact our procurement team at procurement@digerati-experts.com or use the support chat.
          </p>
        </div>
      </div>
    </PortalLayout>
  );
}
