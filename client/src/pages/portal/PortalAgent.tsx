import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PortalLayout } from "./PortalLayout";
import { Download, Monitor, Clock, MessageSquare, Zap, Settings, AlertCircle } from "lucide-react";

export default function PortalAgent() {
  const systemRequirements = [
    { label: "OS", value: "Windows 10/11" },
    { label: "RAM", value: "512 MB minimum" },
    { label: "Disk Space", value: "50 MB" },
    { label: "Internet", value: "Required for live chat" },
  ];

  const features = [
    {
      icon: MessageSquare,
      title: "Quick Ticket Submission",
      description: "Submit support tickets directly from the system tray without opening a browser",
    },
    {
      icon: Clock,
      title: "Real-time Chat",
      description: "Connect with support team instantly while working on your computer",
    },
    {
      icon: Zap,
      title: "Quick Access",
      description: "One-click access to ticket status and support chat from anywhere on your desktop",
    },
    {
      icon: AlertCircle,
      title: "Instant Notifications",
      description: "Get notified immediately when support responds to your tickets",
    },
  ];

  const handleDownload = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      // Generate secure token for agent authentication
      const email = localStorage.getItem("userEmail") || "user@company.com";
      const tokenResponse = await fetch("/api/portal/auth/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: "portal-auth" }),
      });

      if (!tokenResponse.ok) throw new Error("Failed to generate token");
      const { token } = await tokenResponse.json();

      // Request installer package from backend
      const installerResponse = await fetch("/api/portal/agent/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          token: token,
          serverUrl: window.location.origin,
        }),
      });

      if (!installerResponse.ok) throw new Error("Failed to generate installer");

      // Download the ZIP file
      const blob = await installerResponse.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "DigeratiExpertsAgent-Setup.zip";
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 100);

      alert("✓ Installer downloaded successfully!\n\nSteps to install:\n1. Extract the ZIP file\n2. Right-click 'install.bat' and select 'Run as administrator'\n3. Follow the installation prompts\n\nYour secure token is embedded in the installer and will expire in 24 hours.");
    } catch (error) {
      console.error("Error downloading agent:", error);
      alert("Failed to download installer. Please try again.");
    }
  };

  const handleAlternativeDownload = () => {
    // Alternative download method
    window.open("#", "_blank");
  };

  return (
    <PortalLayout title="Desktop Agent">
      <div className="space-y-6">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#5034ff]/10 to-blue-500/10 border border-[#5034ff]/20 rounded-lg p-8">
          <div className="flex items-center gap-4">
            <Monitor className="h-12 w-12 text-[#5034ff]" />
            <div>
              <h2 className="text-2xl font-bold mb-1">Digerati Experts Desktop Agent</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Submit tickets and chat with support directly from your desktop notification area
              </p>
            </div>
          </div>
        </div>

        {/* Download Section */}
        <Card className="border-2 border-[#5034ff]/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5 text-[#5034ff]" />
              Download Desktop Agent
            </CardTitle>
            <CardDescription>Windows 10/11 Compatible</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Button
                onClick={handleDownload}
                className="w-full bg-[#5034ff] hover:bg-[#5034ff]/90 text-white h-12 text-base"
                data-testid="button-download-agent"
              >
                <Download className="h-5 w-5 mr-2" />
                Download Installer (v1.0.0) - Windows
              </Button>
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                Safe & verified. No malware. HTTPS encrypted download.
              </p>
            </div>

            {/* Installation Instructions */}
            <div className="space-y-3 pt-4 border-t dark:border-slate-700">
              <h4 className="font-semibold text-sm">Installation Instructions:</h4>
              <ol className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex gap-2">
                  <span className="font-bold text-[#5034ff]">1.</span>
                  <span>Click the download button above - a secure token will be generated</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-[#5034ff]">2.</span>
                  <span>Run "DigeratiExpertsAgent-Setup.exe" with admin privileges</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-[#5034ff]">3.</span>
                  <span>The installer will automatically use your secure authentication token</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-[#5034ff]">4.</span>
                  <span>Complete the installation wizard (typical duration: 2-3 minutes)</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-[#5034ff]">5.</span>
                  <span>Look for the purple Digerati icon in your notification area (system tray)</span>
                </li>
              </ol>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <div>
          <h3 className="text-lg font-bold mb-4">Agent Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title}>
                  <CardContent className="pt-6">
                    <div className="flex gap-3">
                      <Icon className="h-6 w-6 text-[#5034ff] flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold mb-1">{feature.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* System Requirements */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">System Requirements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {systemRequirements.map((req) => (
                <div key={req.label}>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">{req.label}</p>
                  <p className="font-semibold">{req.value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900/30">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2 text-green-900 dark:text-green-100">
              <Settings className="h-5 w-5" />
              Secure Installation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm text-green-900 dark:text-green-300">
              <h4 className="font-semibold mb-2">🔐 Security Features:</h4>
              <ul className="space-y-2">
                <li className="flex gap-2">
                  <span>✓</span>
                  <span>JWT token authentication (24-hour expiration)</span>
                </li>
                <li className="flex gap-2">
                  <span>✓</span>
                  <span>HTTPS encrypted communication</span>
                </li>
                <li className="flex gap-2">
                  <span>✓</span>
                  <span>End-to-end encrypted WebSocket chat</span>
                </li>
                <li className="flex gap-2">
                  <span>✓</span>
                  <span>Rate limiting to prevent abuse</span>
                </li>
                <li className="flex gap-2">
                  <span>✓</span>
                  <span>Secure credential storage in Windows Credential Manager</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Settings & Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Settings className="h-5 w-5" />
              After Installation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <h4 className="font-semibold text-sm mb-2">Configure Your Preferences:</h4>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex gap-2">
                  <span>•</span>
                  <span>Enable desktop notifications for ticket updates</span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span>Set auto-start on Windows startup (stays in system tray)</span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span>Customize notification sounds and privacy settings</span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span>View system status and support queue without opening portal</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Help */}
        <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-900/30">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Need Help?</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Having trouble installing or using the desktop agent?
              </p>
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#5034ff]/30 hover:bg-[#5034ff]/10"
                  data-testid="button-view-guide"
                >
                  View Installation Guide
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#5034ff]/30 hover:bg-[#5034ff]/10"
                  data-testid="button-contact-support"
                >
                  Contact Support
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  );
}
