import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PortalLayout } from "./PortalLayout";
import { ShoppingCart, Eye, Package, Clock, CheckCircle } from "lucide-react";
import { Link } from "wouter";
import { portalGet } from "@/lib/portalApi";

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  total: string;
  createdAt: string;
  itemCount: number;
  billingName?: string;
}

interface OrdersResponse {
  orders: Order[];
  message?: string;
}

export default function PortalOrders() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  
  const { data, isLoading, isError, error } = useQuery<OrdersResponse>({
    queryKey: ["/api/portal/orders", statusFilter],
    queryFn: () => portalGet<OrdersResponse>(`/api/portal/orders${statusFilter !== "all" ? `?status=${statusFilter}` : ""}`),
  });

  const orders = data?.orders || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "paid":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "processing":
      case "provisioning":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
      case "pending":
      case "awaiting_payment":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
      case "cancelled":
      case "refunded":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      case "paid":
      case "processing":
      case "provisioning":
        return <Package className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const formatStatus = (status: string) => {
    return status.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <PortalLayout title="Order History">
      <div className="space-y-6">
        {isError && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 rounded-lg">
            <p className="text-sm text-red-800 dark:text-red-300">
              Failed to load orders: {error instanceof Error ? error.message : "Unknown error"}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold">Order History</h2>
            <p className="text-gray-600 dark:text-gray-400">
              View and track your orders
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]" data-testid="select-status-filter">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold" data-testid="stat-total-orders">
                {orders.length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Pending
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-amber-600" data-testid="stat-pending-orders">
                {orders.filter((o) => ["pending", "awaiting_payment"].includes(o.status)).length}
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
              <p className="text-2xl font-bold text-blue-600" data-testid="stat-paid-orders">
                {orders.filter((o) => o.status === "paid").length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-600" data-testid="stat-completed-orders">
                {orders.filter((o) => o.status === "completed").length}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Orders</CardTitle>
            <CardDescription>
              {orders.length} order{orders.length !== 1 ? "s" : ""}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="h-20 bg-gray-200 dark:bg-slate-800 rounded animate-pulse"
                  />
                ))}
              </div>
            ) : orders.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b dark:border-slate-700">
                      <th className="text-left font-semibold py-3 px-3">Order #</th>
                      <th className="text-left font-semibold py-3 px-3">Date</th>
                      <th className="text-left font-semibold py-3 px-3">Items</th>
                      <th className="text-left font-semibold py-3 px-3">Total</th>
                      <th className="text-left font-semibold py-3 px-3">Status</th>
                      <th className="text-left font-semibold py-3 px-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr
                        key={order.id}
                        className="border-b dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors"
                        data-testid={`order-row-${order.id}`}
                      >
                        <td className="py-4 px-3 font-medium">
                          {order.orderNumber}
                        </td>
                        <td className="py-4 px-3">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-3">
                          {order.itemCount} item{order.itemCount !== 1 ? "s" : ""}
                        </td>
                        <td className="py-4 px-3 font-medium">
                          ${parseFloat(order.total).toFixed(2)}
                        </td>
                        <td className="py-4 px-3">
                          <Badge className={`flex items-center gap-1 w-fit ${getStatusColor(order.status)}`}>
                            {getStatusIcon(order.status)}
                            {formatStatus(order.status)}
                          </Badge>
                        </td>
                        <td className="py-4 px-3">
                          <Link href={`/portal/orders/${order.id}`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center gap-2"
                              data-testid={`button-view-order-${order.id}`}
                            >
                              <Eye className="h-4 w-4" />
                              View Details
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="py-12 text-center">
                <ShoppingCart className="h-12 w-12 text-gray-300 dark:text-slate-600 mx-auto mb-3" />
                <p className="text-gray-500 dark:text-gray-400 mb-2">No orders found</p>
                <p className="text-sm text-gray-400 dark:text-gray-500">
                  {statusFilter !== "all" ? "Try a different filter or " : ""}
                  <Link href="/store" className="text-[#5034ff] hover:underline">
                    browse our store
                  </Link>
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  );
}
