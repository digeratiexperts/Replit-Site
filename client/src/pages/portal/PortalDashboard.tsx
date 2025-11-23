import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PortalLayout } from "./PortalLayout";
import { AlertCircle, CheckCircle2, Clock, Ticket, Package, FileText, TrendingUp, ArrowRight } from "lucide-react";
import { Link } from "wouter";

interface DashboardStats {
  openTickets: number;
  resolvedTickets: number;
  activeServices: number;
  pendingInvoices: number;
  recentTickets: any[];
  services: any[];
}

export default function PortalDashboard() {
  const { data: stats, isLoading } = useQuery<DashboardStats>({
    queryKey: ["/api/portal/dashboard"],
  });

  return (
    <PortalLayout title="Dashboard">
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Open Tickets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-orange-500" />
                <span className="text-2xl font-bold" data-testid="stat-open-tickets">
                  {stats?.openTickets || 0}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Resolved Tickets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span className="text-2xl font-bold" data-testid="stat-resolved-tickets">
                  {stats?.resolvedTickets || 0}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Active Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-blue-500" />
                <span className="text-2xl font-bold" data-testid="stat-active-services">
                  {stats?.activeServices || 0}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Pending Invoices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-red-500" />
                <span className="text-2xl font-bold" data-testid="stat-pending-invoices">
                  {stats?.pendingInvoices || 0}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Tickets */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Support Tickets</CardTitle>
                  <CardDescription>Your latest ticket activity</CardDescription>
                </div>
                <Link href="/portal/tickets">
                  <a className="text-[#5034ff] hover:underline text-sm font-medium">
                    View All
                  </a>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-12 bg-gray-200 dark:bg-slate-800 rounded animate-pulse" />
                  ))}
                </div>
              ) : stats?.recentTickets && stats.recentTickets.length > 0 ? (
                <div className="space-y-3">
                  {stats.recentTickets.map((ticket) => (
                    <div
                      key={ticket.id}
                      className="flex items-center justify-between p-3 border rounded-lg dark:border-slate-700"
                      data-testid={`ticket-${ticket.id}`}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-gray-900 dark:text-white truncate">
                          {ticket.subject}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {ticket.ticketNumber}
                        </p>
                      </div>
                      <Badge
                        className={
                          ticket.status === "open"
                            ? "bg-orange-100 text-orange-800 dark:bg-orange-900/30"
                            : "bg-green-100 text-green-800 dark:bg-green-900/30"
                        }
                      >
                        {ticket.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400 py-8 text-center">
                  No recent tickets
                </p>
              )}
            </CardContent>
          </Card>

          {/* Active Services */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Your Services</CardTitle>
                  <CardDescription>Currently active services</CardDescription>
                </div>
                <Link href="/portal/services">
                  <a className="text-[#5034ff] hover:underline text-sm font-medium">
                    View All
                  </a>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-12 bg-gray-200 dark:bg-slate-800 rounded animate-pulse" />
                  ))}
                </div>
              ) : stats?.services && stats.services.length > 0 ? (
                <div className="space-y-3">
                  {stats.services.map((service) => (
                    <div
                      key={service.id}
                      className="flex items-center justify-between p-3 border rounded-lg dark:border-slate-700"
                      data-testid={`service-${service.id}`}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-gray-900 dark:text-white truncate">
                          {service.serviceName}
                        </p>
                        {service.userCount && (
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {service.userCount} users
                          </p>
                        )}
                      </div>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30">
                        Active
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400 py-8 text-center">
                  No active services
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-gradient-to-r from-[#5034ff]/10 to-blue-500/10 border-[#5034ff]/20">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/portal/tickets?new=true">
                <a>
                  <Button
                    variant="outline"
                    className="w-full border-[#5034ff]/30 hover:bg-[#5034ff]/10"
                    data-testid="button-new-ticket"
                  >
                    <Ticket className="h-4 w-4 mr-2" />
                    Create Ticket
                  </Button>
                </a>
              </Link>
              <Link href="/portal/kb">
                <a>
                  <Button
                    variant="outline"
                    className="w-full border-[#5034ff]/30 hover:bg-[#5034ff]/10"
                    data-testid="button-view-kb"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Browse KB
                  </Button>
                </a>
              </Link>
              <Link href="/portal/invoices">
                <a>
                  <Button
                    variant="outline"
                    className="w-full border-[#5034ff]/30 hover:bg-[#5034ff]/10"
                    data-testid="button-view-invoices"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    View Invoices
                  </Button>
                </a>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  );
}
