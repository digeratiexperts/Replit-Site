import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Building2, ChevronDown, Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { portalGet } from "@/lib/portalApi";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface Tenant {
  id: string;
  companyName: string;
  type: "msp" | "client";
}

interface TenantsResponse {
  tenants: Tenant[];
  mspCount: number;
  clientCount: number;
}

interface TenantSelectorProps {
  currentTenant: { id: string; companyName: string } | null;
  onTenantChange?: () => void;
}

export function TenantSelector({ currentTenant, onTenantChange }: TenantSelectorProps) {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const { data: tenantsData, isLoading } = useQuery<TenantsResponse>({
    queryKey: ["/api/portal/admin/tenants"],
    queryFn: () => portalGet<TenantsResponse>("/api/portal/admin/tenants"),
  });

  const impersonateMutation = useMutation({
    mutationFn: async (companyId: string) => {
      return await apiRequest("/api/portal/admin/impersonate", "POST", { companyId });
    },
    onSuccess: (data: any) => {
      localStorage.setItem("portalToken", data.token);
      localStorage.setItem("impersonatingCompany", JSON.stringify(data.company));
      toast({ 
        title: "Switched Tenant", 
        description: `Now viewing as ${data.company.companyName}` 
      });
      setIsOpen(false);
      if (onTenantChange) {
        onTenantChange();
      } else {
        window.location.reload();
      }
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.message || "Failed to switch tenant", 
        variant: "destructive" 
      });
    },
  });

  const stopImpersonationMutation = useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem("portalToken");
      const response = await fetch("/api/portal/admin/stop-impersonation", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to stop impersonation");
      return response.json();
    },
    onSuccess: (data: any) => {
      localStorage.setItem("portalToken", data.token);
      localStorage.removeItem("impersonatingCompany");
      toast({ 
        title: "Switched to Admin View", 
        description: "Back to Digerati Experts admin view" 
      });
      setIsOpen(false);
      if (onTenantChange) {
        onTenantChange();
      } else {
        window.location.reload();
      }
    },
    onError: (error: any) => {
      toast({ 
        title: "Error", 
        description: error.message || "Failed to switch view", 
        variant: "destructive" 
      });
    },
  });

  const tenants = tenantsData?.tenants || [];
  const mspTenants = tenants.filter(t => t.type === "msp");
  const clientTenants = tenants.filter(t => t.type === "client");

  const handleSelectTenant = (tenant: Tenant) => {
    if (currentTenant?.id === tenant.id) {
      setIsOpen(false);
      return;
    }
    
    if (tenant.type === "msp" && currentTenant) {
      stopImpersonationMutation.mutate();
    } else {
      impersonateMutation.mutate(tenant.id);
    }
  };

  const displayName = currentTenant 
    ? currentTenant.companyName 
    : "Digerati Experts";

  const isPending = impersonateMutation.isPending || stopImpersonationMutation.isPending;

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="gap-2 min-w-[200px] justify-between bg-white/5 border-white/20 text-white hover:bg-white/10"
          disabled={isLoading || isPending}
          data-testid="dropdown-tenant-selector"
        >
          <div className="flex items-center gap-2">
            {currentTenant ? (
              <Users className="h-4 w-4 text-violet-400" />
            ) : (
              <Shield className="h-4 w-4 text-violet-400" />
            )}
            <span className="truncate max-w-[150px]">
              {isPending ? "Switching..." : displayName}
            </span>
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-[280px] max-h-[400px] overflow-y-auto"
      >
        <DropdownMenuLabel className="flex items-center gap-2 text-violet-600">
          <Shield className="h-4 w-4" />
          Internal
        </DropdownMenuLabel>
        {mspTenants.map((tenant) => (
          <DropdownMenuItem
            key={tenant.id}
            onClick={() => handleSelectTenant(tenant)}
            className={`cursor-pointer ${!currentTenant ? "bg-violet-50 dark:bg-violet-900/20" : ""}`}
            data-testid={`tenant-${tenant.id}`}
          >
            <Shield className="h-4 w-4 mr-2 text-violet-500" />
            <span className="truncate">{tenant.companyName}</span>
            {!currentTenant && (
              <span className="ml-auto text-xs text-violet-600">(Current)</span>
            )}
          </DropdownMenuItem>
        ))}
        
        <DropdownMenuSeparator />
        
        <DropdownMenuLabel className="flex items-center gap-2 text-slate-600">
          <Building2 className="h-4 w-4" />
          Client Companies ({clientTenants.length})
        </DropdownMenuLabel>
        {clientTenants.map((tenant) => (
          <DropdownMenuItem
            key={tenant.id}
            onClick={() => handleSelectTenant(tenant)}
            className={`cursor-pointer ${currentTenant?.id === tenant.id ? "bg-violet-50 dark:bg-violet-900/20" : ""}`}
            data-testid={`tenant-${tenant.id}`}
          >
            <Building2 className="h-4 w-4 mr-2 text-slate-500" />
            <span className="truncate">{tenant.companyName}</span>
            {currentTenant?.id === tenant.id && (
              <span className="ml-auto text-xs text-violet-600">(Current)</span>
            )}
          </DropdownMenuItem>
        ))}
        
        {clientTenants.length === 0 && (
          <div className="px-2 py-4 text-center text-sm text-slate-500">
            No client companies yet
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
