import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PortalLayout } from "./PortalLayout";
import { FileText, Download, Eye, CreditCard } from "lucide-react";
import { Link } from "wouter";

interface Invoice {
  id: string;
  invoiceNumber: string;
  amount: string;
  status: string;
  issueDate: string;
  dueDate: string;
  description?: string;
}

export default function PortalInvoices() {
  const { data: invoices = [], isLoading, isError, error } = useQuery<Invoice[]>({
    queryKey: ["/api/portal/invoices"],
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 dark:bg-green-900/30";
      case "overdue":
        return "bg-red-100 text-red-800 dark:bg-red-900/30";
      case "draft":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30";
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30";
    }
  };

  return (
    <PortalLayout title="Invoices">
      <div className="space-y-6">
        {/* Error State */}
        {isError && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 rounded-lg">
            <p className="text-sm text-red-800 dark:text-red-300">
              Failed to load invoices: {error instanceof Error ? error.message : "Unknown error"}
            </p>
          </div>
        )}

        {/* Header */}
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">Invoices</h2>
          <p className="text-gray-600 dark:text-gray-400">
            View and download your invoices
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Invoices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold" data-testid="stat-total-invoices">
                {invoices.length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Paid
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold" data-testid="stat-paid-invoices">
                {invoices.filter((i) => i.status === "paid").length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Outstanding
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-red-600" data-testid="stat-outstanding">
                {invoices.filter((i) => i.status !== "paid").length}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Invoices Table */}
        <Card>
          <CardHeader>
            <CardTitle>Invoice List</CardTitle>
            <CardDescription>
              {invoices.length} invoice{invoices.length !== 1 ? "s" : ""}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="h-16 bg-gray-200 dark:bg-slate-800 rounded animate-pulse"
                  />
                ))}
              </div>
            ) : invoices.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b dark:border-slate-700">
                      <th className="text-left font-semibold py-3 px-3">Invoice #</th>
                      <th className="text-left font-semibold py-3 px-3">Amount</th>
                      <th className="text-left font-semibold py-3 px-3">Issue Date</th>
                      <th className="text-left font-semibold py-3 px-3">Due Date</th>
                      <th className="text-left font-semibold py-3 px-3">Status</th>
                      <th className="text-left font-semibold py-3 px-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((invoice) => (
                      <tr
                        key={invoice.id}
                        className="border-b dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors"
                        data-testid={`invoice-row-${invoice.id}`}
                      >
                        <td className="py-3 px-3 font-medium">{invoice.invoiceNumber}</td>
                        <td className="py-3 px-3">
                          ${parseFloat(invoice.amount).toFixed(2)}
                        </td>
                        <td className="py-3 px-3">
                          {new Date(invoice.issueDate).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-3">
                          {new Date(invoice.dueDate).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-3">
                          <Badge className={getStatusColor(invoice.status)}>
                            {invoice.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              data-testid={`button-view-${invoice.id}`}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              data-testid={`button-download-${invoice.id}`}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            {(invoice.status === "sent" || invoice.status === "overdue") && (
                              <Link href={`/portal/invoices/${invoice.id}/pay`}>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 text-[#5034ff] hover:bg-[#5034ff]/10"
                                  data-testid={`button-pay-${invoice.id}`}
                                >
                                  <CreditCard className="h-4 w-4" />
                                </Button>
                              </Link>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="py-12 text-center">
                <FileText className="h-12 w-12 text-gray-300 dark:text-slate-600 mx-auto mb-3" />
                <p className="text-gray-500 dark:text-gray-400">No invoices found</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  );
}
