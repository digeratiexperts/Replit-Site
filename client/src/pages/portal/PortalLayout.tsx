import { useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LogOut, Menu, X, LayoutDashboard, Ticket, Package, FileText, BookOpen, Settings, Activity, GraduationCap, MessageCircle, Download, Truck, ShoppingCart, ClipboardList, CheckSquare, FileStack, Upload, Users, Calendar, Shield, Phone, Building2, AlertTriangle } from "lucide-react";
import { useState } from "react";
import logoImage from "@assets/DE-Logo-new_1762461524794.webp";
import { TenantSelector } from "@/components/portal/TenantSelector";

interface PortalLayoutProps {
  children: React.ReactNode;
  title: string;
}

const navItems = [
  { href: "/portal/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/portal/tickets", label: "Support Tickets", icon: Ticket },
  { href: "/portal/chat", label: "Live Chat", icon: MessageCircle },
  { href: "/portal/questionnaires", label: "DE Questionnaires", icon: Calendar },
  { href: "/portal/forms", label: "Request Forms", icon: ClipboardList },
  { href: "/portal/surveys", label: "Surveys", icon: CheckSquare },
  { href: "/portal/approvals", label: "Approvals", icon: FileStack },
  { href: "/portal/services", label: "My Services", icon: Package },
  { href: "/portal/billing", label: "Billing", icon: FileText },
  { href: "/portal/company", label: "Company", icon: Building2 },
  { href: "/portal/files", label: "Files & Downloads", icon: FileText },
  { href: "/portal/invoices", label: "Invoices", icon: FileText },
  { href: "/portal/vpn", label: "VPN Access", icon: Shield },
  { href: "/portal/cytracom", label: "ControlOne Phone", icon: Phone },
  { href: "/portal/ship-center", label: "Ship Center", icon: Truck },
  { href: "/portal/procurement", label: "Procurement Store", icon: ShoppingCart },
  { href: "/portal/kb", label: "Knowledge Base", icon: BookOpen },
  { href: "/portal/status", label: "System Status", icon: Activity },
  { href: "/portal/learning", label: "Learning", icon: GraduationCap },
  { href: "/portal/agent", label: "Desktop Agent", icon: Download },
  { href: "/portal/settings", label: "Settings", icon: Settings },
];

const adminItems = [
  { href: "/portal/admin/companies", label: "Companies", icon: Building2 },
  { href: "/portal/admin/import", label: "Data Import", icon: Upload },
  { href: "/portal/admin/agents", label: "Manage Agents", icon: Users },
  { href: "/portal/admin/openai", label: "OpenAI Billing", icon: Settings },
];

export function PortalLayout({ children, title }: PortalLayoutProps) {
  const [location] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = localStorage.getItem("portalUser")
    ? JSON.parse(localStorage.getItem("portalUser")!)
    : null;
  const impersonatingCompany = localStorage.getItem("impersonatingCompany")
    ? JSON.parse(localStorage.getItem("impersonatingCompany")!)
    : null;

  const handleStopImpersonation = async () => {
    try {
      const token = localStorage.getItem("portalToken");
      const response = await fetch("/api/portal/admin/stop-impersonation", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("portalToken", data.token);
        localStorage.removeItem("impersonatingCompany");
        window.location.href = "/portal/admin/companies";
      }
    } catch (error) {
      console.error("Failed to stop impersonation:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("portalUser");
    localStorage.removeItem("portalToken");
    window.location.href = "/portal/login";
  };

  return (
    <div className="flex h-screen bg-white dark:bg-slate-950">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-[#030228] to-[#0f0d2e] border-r border-white/10 transform transition-transform duration-200 ease-in-out z-50 md:static md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-white/10">
            <img
              src={logoImage}
              alt="Digerati Experts"
              className="h-8 w-auto"
            />
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.href;
              return (
                <Link 
                  key={item.href} 
                  href={item.href}
                  asChild
                >
                  <button
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                      isActive
                        ? "bg-[#5034ff] text-white"
                        : "text-gray-300 hover:bg-white/10"
                    }`}
                    onClick={() => setSidebarOpen(false)}
                    data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                </Link>
              );
            })}

            {/* Admin Section */}
            {user?.role === "admin" && (
              <>
                <div className="pt-4 mt-4 border-t border-white/10">
                  <p className="text-xs uppercase text-gray-400 px-4 py-2 font-semibold">Administration</p>
                  {adminItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location === item.href;
                    return (
                      <Link 
                        key={item.href} 
                        href={item.href}
                        asChild
                      >
                        <button
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                            isActive
                              ? "bg-[#5034ff] text-white"
                              : "text-gray-300 hover:bg-white/10"
                          }`}
                          onClick={() => setSidebarOpen(false)}
                          data-testid={`nav-admin-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          <Icon className="h-5 w-5" />
                          <span className="text-sm font-medium">{item.label}</span>
                        </button>
                      </Link>
                    );
                  })}
                </div>
              </>
            )}
          </nav>

          {/* User and Logout */}
          <div className="p-4 border-t border-white/10 space-y-3">
            <div className="px-4 py-3 bg-white/10 rounded-lg">
              <p className="text-xs text-gray-400">Signed in as</p>
              <p className="text-sm font-medium text-white truncate" data-testid="text-username">
                {user?.fullName}
              </p>
            </div>
            <Button
              onClick={handleLogout}
              className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20"
              data-testid="button-logout"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Impersonation Banner */}
        {impersonatingCompany && (
          <div className="bg-amber-500 text-amber-900 px-4 py-2 flex items-center justify-between" data-testid="banner-impersonation">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm font-medium">
                Viewing as: <strong>{impersonatingCompany.companyName}</strong>
              </span>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={handleStopImpersonation}
              className="bg-white/20 border-amber-700 text-amber-900 hover:bg-white/30"
              data-testid="button-stop-impersonation"
            >
              Exit View
            </Button>
          </div>
        )}

        {/* Header */}
        <header className="bg-gradient-to-r from-[#030228] to-[#0f0d2e] border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 hover:bg-white/10 rounded-lg text-white"
              data-testid="button-toggle-sidebar"
            >
              {sidebarOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
            <h1 className="text-xl font-bold text-white">{title}</h1>
          </div>
          <div className="flex items-center gap-4">
            {user?.role === "admin" && (
              <TenantSelector 
                currentTenant={impersonatingCompany}
              />
            )}
            <span className="text-sm text-white/70 hidden sm:inline">
              Welcome, {user?.fullName?.split(" ")[0]}
            </span>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>

      {/* Close sidebar on larger screens when clicking content */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
