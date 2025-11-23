import { PortalLayout } from "./PortalLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Package, Truck } from "lucide-react";

export default function PortalShipCenter() {
  const shipmentHistory = [
    { id: "SHIP-001", status: "Delivered", date: "Nov 20, 2024", items: 3, tracking: "1Z999AA10123456784" },
    { id: "SHIP-002", status: "In Transit", date: "Nov 18, 2024", items: 5, tracking: "1Z999AA10123456785" },
    { id: "SHIP-003", status: "Processing", date: "Nov 15, 2024", items: 2, tracking: "1Z999AA10123456786" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300";
      case "In Transit":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300";
      case "Processing":
        return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300";
      default:
        return "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300";
    }
  };

  return (
    <PortalLayout title="Ship Center">
      <div className="space-y-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card data-testid="card-active-shipments">
            <CardHeader>
              <CardTitle className="text-lg">Active Shipments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-[#5034ff]">2</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Currently in transit</p>
            </CardContent>
          </Card>

          <Card data-testid="card-total-shipments">
            <CardHeader>
              <CardTitle className="text-lg">Total Shipments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-[#030228] dark:text-white">47</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">All time</p>
            </CardContent>
          </Card>
        </div>

        {/* Shipment History */}
        <Card data-testid="card-shipment-history">
          <CardHeader>
            <CardTitle>Shipment History</CardTitle>
            <CardDescription>Track your recent shipments and orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {shipmentHistory.map((shipment) => (
                <div
                  key={shipment.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700"
                  data-testid={`row-shipment-${shipment.id}`}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="p-2 bg-[#5034ff]/10 rounded-lg">
                      <Truck className="h-5 w-5 text-[#5034ff]" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{shipment.id}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {shipment.date} • {shipment.items} items
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={`${getStatusColor(shipment.status)}`}>{shipment.status}</Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      data-testid={`button-track-${shipment.id}`}
                    >
                      Track
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card data-testid="card-create-shipment">
            <CardHeader>
              <CardTitle className="text-lg">Create New Shipment</CardTitle>
              <CardDescription>Schedule a new shipment for your business</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-[#5034ff] hover:bg-[#5034ff]/90 text-white" data-testid="button-create-shipment">
                <Package className="h-4 w-4 mr-2" />
                New Shipment
              </Button>
            </CardContent>
          </Card>

          <Card data-testid="card-contact-logistics">
            <CardHeader>
              <CardTitle className="text-lg">Logistics Support</CardTitle>
              <CardDescription>Need help with your shipment?</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" data-testid="button-contact-logistics">
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </PortalLayout>
  );
}
