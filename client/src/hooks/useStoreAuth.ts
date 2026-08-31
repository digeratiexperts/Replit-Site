import { useState, useEffect, useCallback, useMemo } from "react";
import type { ClientType } from "@/data/storeProducts";
import { portalLoginWithReturn } from "@/lib/portalUrls";
import { marketplaceReturnTo } from "@shared/portalReturnTo";

// Store role types for RBAC
export type StoreRole = 'public' | 'prospect' | 'managed' | 'comanaged' | 'admin';

export interface PortalUser {
  id: string;
  email: string;
  username: string;
  fullName: string;
  role: string;
  storeRole?: StoreRole;
  clientId?: string | null;
}

export interface ClientPricing {
  productId: string;
  customPrice: number;
  discountPercent: number;
}

export interface StoreAuthState {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: PortalUser | null;
  token: string | null;
  clientType: ClientType;
  clientId: string | null;
  storeRole: StoreRole;
  clientPricing: ClientPricing[];
  canPurchase: boolean;
  isAdmin: boolean;
  loginRedirect: () => void;
  logout: () => void;
  refreshPricing: () => Promise<void>;
  getProductPrice: (productId: string, basePrice: number) => { price: number; hasDiscount: boolean; discountPercent: number };
}

const PORTAL_USER_KEY = "portalUser";
const PORTAL_TOKEN_KEY = "portalToken";

export function useStoreAuth(): StoreAuthState {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<PortalUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [clientType, setClientType] = useState<ClientType>("public");
  const [clientPricing, setClientPricing] = useState<ClientPricing[]>([]);

  const fetchClientInfo = useCallback(async (authToken: string) => {
    try {
      const response = await fetch("/api/store/client-info", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setClientType(data.clientType || "public");
        return data.clientType as ClientType;
      }
      setClientType("public");
    } catch (error) {
      console.error("Failed to fetch client info:", error);
      setClientType("public");
    }
    return "public" as ClientType;
  }, []);

  const fetchClientPricing = useCallback(async (authToken: string) => {
    try {
      const response = await fetch("/api/store/client-pricing", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setClientPricing(Array.isArray(data.pricing) ? data.pricing : []);
        return;
      }
      setClientPricing([]);
    } catch (error) {
      console.error("Failed to fetch client pricing:", error);
      setClientPricing([]);
    }
  }, []);

  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      try {
        const storedUser = localStorage.getItem(PORTAL_USER_KEY);
        const storedToken = localStorage.getItem(PORTAL_TOKEN_KEY);

        if (storedUser && storedToken) {
          const parsedUser = JSON.parse(storedUser) as PortalUser;
          setUser(parsedUser);
          setToken(storedToken);

          await fetchClientInfo(storedToken);
          await fetchClientPricing(storedToken);
        } else {
          setUser(null);
          setToken(null);
          setClientType("public");
          setClientPricing([]);
        }
      } catch (error) {
        console.error("Failed to initialize store auth:", error);
        setUser(null);
        setToken(null);
        setClientType("public");
        setClientPricing([]);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === PORTAL_USER_KEY || e.key === PORTAL_TOKEN_KEY) {
        initAuth();
      }
    };
    // storage events only fire in other tabs; in-page sign-in (DE Desk login
    // card) announces itself with this custom event instead.
    const handleAuthChange = () => initAuth();

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("de-portal-auth-changed", handleAuthChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("de-portal-auth-changed", handleAuthChange);
    };
  }, [fetchClientInfo, fetchClientPricing]);

  const loginRedirect = useCallback(() => {
    const currentPath = window.location.pathname;
    localStorage.setItem("storeRedirectAfterLogin", currentPath);
    // Absolute portal host — apex /portal/login is mangled by Cloudflare to //login
    window.location.href = portalLoginWithReturn(marketplaceReturnTo(currentPath));
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(PORTAL_USER_KEY);
    localStorage.removeItem(PORTAL_TOKEN_KEY);
    setUser(null);
    setToken(null);
    setClientType("public");
    setClientPricing([]);
  }, []);

  const refreshPricing = useCallback(async () => {
    if (token) {
      await fetchClientPricing(token);
    } else {
      setClientPricing([]);
    }
  }, [token, fetchClientPricing]);

  const getProductPrice = useCallback(
    (productId: string, basePrice: number) => {
      const pricing = clientPricing.find((p) => p.productId === productId);
      if (pricing) {
        return {
          price: pricing.customPrice,
          hasDiscount: true,
          discountPercent: pricing.discountPercent,
        };
      }
      return {
        price: basePrice,
        hasDiscount: false,
        discountPercent: 0,
      };
    },
    [clientPricing]
  );

  const isLoggedIn = useMemo(() => !!user && !!token, [user, token]);
  const clientId = useMemo(() => user?.clientId || null, [user]);
  
  // Derive store role from user data - defaults to 'public' for unauthenticated
  const storeRole: StoreRole = useMemo(() => {
    if (!user) return 'public';
    return user.storeRole || 'prospect';
  }, [user]);
  
  // Check if user can purchase (comanaged or admin only)
  const canPurchase = useMemo(() => {
    return storeRole === 'comanaged' || storeRole === 'admin';
  }, [storeRole]);
  
  // Check if user is admin
  const isAdmin = useMemo(() => storeRole === 'admin', [storeRole]);

  return {
    isLoggedIn,
    isLoading,
    user,
    token,
    clientType,
    clientId,
    storeRole,
    clientPricing,
    canPurchase,
    isAdmin,
    loginRedirect,
    logout,
    refreshPricing,
    getProductPrice,
  };
}
