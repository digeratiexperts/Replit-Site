import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PortalLayout } from "./PortalLayout";
import { CreditCard, FileText, Calendar, DollarSign, ArrowRight, Download, CheckCircle, Clock, AlertCircle, RefreshCcw } from "lucide-react";
import { Link } from "wouter";
import { portalGet } from "@/lib/portalApi";

interface Subscription {
  subscription_id: string;
  subscription_number: string;
  name: string;
  status: string;
  plan: {
    plan_code: string;
    name: string;
    price: number;
  };
  next_billing_at: string;
  current_term_ends_at: string;
  amount: number;
}

interface Invoice {
  invoice_id: string;
  invoice_number: string;
  status: string;
  invoice_date: string;
  due_date: string;
  total: number;
  balance: number;
  currency_code: string;
}

interface BillingData {
  subscription: Subscription | null;
  invoices: Invoice[];
  zohoConnected: boolean;
}

const statusStyles: Record<string, string> = {
  live: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  active: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  paid: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  unpaid: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  overdue: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  cancelled: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300",
  expired: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300",
};

const statusIcons: Record<string, typeof CheckCircle> = {
  live: CheckCircle,
  active: CheckCircle,
  paid: CheckCircle,
  unpaid: AlertCircle,
  overdue: AlertCircle,
  pending: Clock,
  cancelled: AlertCircle,
};

export default function PortalBilling() {
  const { data, isLoading, error, refetch } = useQuery<BillingData>({
    queryKey: ["/api/portal/billing"],
    queryFn: () => portalGet<BillingData>("/api/portal/billing"),
    retry: 1,
  });

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatCurrency = (amount: number, currency = "USD") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(amount);
  };

  return (
    <PortalLayout title="Billing & Subscription">
      <div className="space-y-6">
        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 rounded-lg flex items-center justify-between">
            <p className="text-sm text-red-800 dark:text-red-300">
              Failed to load billing data. Please try again.
            </p>
            <Button variant="outline" size="sm" onClick={() => refetch()} data-testid="button-retry-billing">
              <RefreshCcw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          </div>
        )}

        {!data?.zohoConnected && !isLoading && (
          <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/30 rounded-lg">
            <p className="text-sm text-amber-800 dark:text-amber-300">
              Billing integration is being configured. Some features may be limited.
            </p>
          </div>
        )}

        {/* Current Subscription */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-violet-500" />
                  Current Subscription
                </CardTitle>
                <CardDescription>Your active service plan</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                <div className="h-8 w-48 bg-gray-200 dark:bg-slate-800 rounded animate-pulse" />
                <div className="h-4 w-32 bg-gray-200 dark:bg-slate-800 rounded animate-pulse" />
              </div>
            ) : data?.subscription ? (
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {data.subscription.plan?.name || data.subscription.name}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                      Subscription #{data.subscription.subscription_number}
                    </p>
                  </div>
                  <Badge className={statusStyles[data.subscription.status?.toLowerCase()] || statusStyles.pending}>
                    {data.subscription.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-gray-50 dark:bg-slate-800/50 rounded-lg">
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-1">
                      <DollarSign className="h-4 w-4" />
                      Monthly Amount
                    </div>
                    <p className="text-xl font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(data.subscription.amount || data.subscription.plan?.price || 0)}
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 dark:bg-slate-800/50 rounded-lg">
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-1">
                      <Calendar className="h-4 w-4" />
                      Next Billing
                    </div>
                    <p className="text-xl font-semibold text-gray-900 dark:text-white">
                      {formatDate(data.subscription.next_billing_at)}
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 dark:bg-slate-800/50 rounded-lg">
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-1">
                      <Calendar className="h-4 w-4" />
                      Term Ends
                    </div>
                    <p className="text-xl font-semibold text-gray-900 dark:text-white">
                      {formatDate(data.subscription.current_term_ends_at)}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="border-violet-500/30 text-violet-700 dark:text-violet-300 hover:bg-violet-50 dark:hover:bg-violet-900/20" data-testid="button-manage-subscription">
                    Manage Subscription
                  </Button>
                  <Button variant="outline" data-testid="button-update-payment">
                    Update Payment Method
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">No active subscription found</p>
                <Button className="mt-4 bg-violet-600 hover:bg-violet-700" data-testid="button-view-plans">
                  View Plans
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Invoices */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-violet-500" />
                  Recent Invoices
                </CardTitle>
                <CardDescription>Your billing history</CardDescription>
              </div>
              <Link href="/portal/invoices">
                <Button variant="outline" size="sm" data-testid="button-view-all-invoices">
                  View All
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-16 bg-gray-200 dark:bg-slate-800 rounded animate-pulse" />
                ))}
              </div>
            ) : data?.invoices && data.invoices.length > 0 ? (
              <div className="divide-y dark:divide-slate-700">
                {data.invoices.slice(0, 5).map((invoice) => {
                  const StatusIcon = statusIcons[invoice.status?.toLowerCase()] || Clock;
                  return (
                    <div
                      key={invoice.invoice_id}
                      className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
                      data-testid={`invoice-row-${invoice.invoice_id}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-gray-100 dark:bg-slate-800 rounded-lg">
                          <FileText className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {invoice.invoice_number}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {formatDate(invoice.invoice_date)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {formatCurrency(invoice.total, invoice.currency_code)}
                          </p>
                          {invoice.balance > 0 && (
                            <p className="text-sm text-red-500">
                              Balance: {formatCurrency(invoice.balance, invoice.currency_code)}
                            </p>
                          )}
                        </div>
                        <Badge className={statusStyles[invoice.status?.toLowerCase()] || statusStyles.pending}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {invoice.status}
                        </Badge>
                        <Button variant="ghost" size="sm" data-testid={`button-download-${invoice.invoice_id}`}>
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">No invoices found</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-violet-500" />
              Payment Methods
            </CardTitle>
            <CardDescription>Manage your payment options</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 border dark:border-slate-700 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-gray-100 dark:bg-slate-800 rounded-lg">
                  <CreditCard className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Card on file</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Managed through Zoho Billing
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" data-testid="button-update-card">
                Update
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  );
}
