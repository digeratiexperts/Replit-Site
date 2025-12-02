import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PortalLayout } from "./PortalLayout";
import { Shield, Download, CheckCircle, AlertCircle, Monitor, Smartphone, Globe, Key, RefreshCw } from "lucide-react";

interface VPNConnection {
  id: string;
  device: string;
  location: string;
  lastConnected: string;
  status: "connected" | "disconnected";
}

const connections: VPNConnection[] = [
  { id: "1", device: "Work Laptop", location: "Phoenix, AZ", lastConnected: "Currently connected", status: "connected" },
  { id: "2", device: "Home Desktop", location: "Chandler, AZ", lastConnected: "2 hours ago", status: "disconnected" },
  { id: "3", device: "iPhone 15", location: "Gilbert, AZ", lastConnected: "Yesterday", status: "disconnected" },
];

export default function PortalVPN() {
  const [isRegenerating, setIsRegenerating] = useState(false);

  const handleRegenerateConfig = () => {
    setIsRegenerating(true);
    setTimeout(() => {
      setIsRegenerating(false);
      alert("New VPN configuration generated! Check your email for the updated config file.");
    }, 2000);
  };

  return (
    <PortalLayout title="VPN Access">
      <div className="space-y-6">
        {/* Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">VPN Status</p>
                  <p className="text-xl font-bold text-green-600">Active</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Monitor className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Connected Devices</p>
                  <p className="text-xl font-bold">1 / 5</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <Globe className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Server Location</p>
                  <p className="text-xl font-bold">Phoenix, AZ</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Download Clients */}
        <Card>
          <CardHeader>
            <CardTitle>Download VPN Client</CardTitle>
            <CardDescription>Install the VPN client on your devices to securely connect to company resources</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2" data-testid="button-download-windows">
                <Monitor className="h-8 w-8" />
                <span>Windows</span>
                <span className="text-xs text-gray-500">v2.5.1</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2" data-testid="button-download-mac">
                <Monitor className="h-8 w-8" />
                <span>macOS</span>
                <span className="text-xs text-gray-500">v2.5.1</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2" data-testid="button-download-mobile">
                <Smartphone className="h-8 w-8" />
                <span>iOS / Android</span>
                <span className="text-xs text-gray-500">App Store</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Configuration */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>VPN Configuration</CardTitle>
                <CardDescription>Your personal VPN configuration file</CardDescription>
              </div>
              <Button 
                variant="outline" 
                onClick={handleRegenerateConfig}
                disabled={isRegenerating}
                data-testid="button-regenerate-config"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isRegenerating ? 'animate-spin' : ''}`} />
                {isRegenerating ? "Regenerating..." : "Regenerate Config"}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800 rounded-lg">
              <div className="flex items-center gap-3">
                <Key className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium">digerati-vpn-config.ovpn</p>
                  <p className="text-sm text-gray-500">Generated: Jan 15, 2025</p>
                </div>
              </div>
              <Button data-testid="button-download-config">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Connected Devices */}
        <Card>
          <CardHeader>
            <CardTitle>Connected Devices</CardTitle>
            <CardDescription>Devices authorized to use your VPN connection</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {connections.map((conn) => (
                <div 
                  key={conn.id}
                  className="flex items-center justify-between p-4 border dark:border-slate-700 rounded-lg"
                  data-testid={`device-${conn.id}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${conn.status === 'connected' ? 'bg-green-100 dark:bg-green-900/30' : 'bg-gray-100 dark:bg-slate-800'}`}>
                      {conn.device.includes("iPhone") || conn.device.includes("Android") ? (
                        <Smartphone className={`h-5 w-5 ${conn.status === 'connected' ? 'text-green-600' : 'text-gray-500'}`} />
                      ) : (
                        <Monitor className={`h-5 w-5 ${conn.status === 'connected' ? 'text-green-600' : 'text-gray-500'}`} />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{conn.device}</p>
                      <p className="text-sm text-gray-500">{conn.location}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={conn.status === 'connected' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-800 dark:bg-slate-800 dark:text-gray-400'}>
                      {conn.status === 'connected' ? (
                        <><CheckCircle className="h-3 w-3 mr-1" /> Connected</>
                      ) : (
                        <><AlertCircle className="h-3 w-3 mr-1" /> Disconnected</>
                      )}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">{conn.lastConnected}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Help */}
        <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-900/30">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium text-blue-900 dark:text-blue-100">Need help connecting?</p>
                <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                  Check our <a href="/portal/kb" className="underline">Knowledge Base</a> for step-by-step setup guides, 
                  or <a href="/portal/tickets" className="underline">submit a support ticket</a> if you're experiencing issues.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  );
}
