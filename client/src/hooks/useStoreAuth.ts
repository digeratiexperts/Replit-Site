import { useState, useEffect, useCallback, useMemo } from "react";
import type { ClientType } from "@/data/storeProducts";

export interface PortalUser {
  id: string;
  email: string;
  username: string;
  fullName: string;
  role: string;
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
  clientPricing: ClientPricing[];
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
    } catch (error) {
      console.error("Failed to fetch client info:", error);
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
        setClientPricing(data.pricing || []);
      }
    } catch (error) {
      console.error("Failed to fetch client pricing:", error);
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

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [fetchClientInfo, fetchClientPricing]);

  const loginRedirect = useCallback(() => {
    const currentPath = window.location.pathname;
    localStorage.setItem("storeRedirectAfterLogin", currentPath);
    window.location.href = "/portal/login";
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

  return {
    isLoggedIn,
    isLoading,
    user,
    token,
    clientType,
    clientId,
    clientPricing,
    loginRedirect,
    logout,
    refreshPricing,
    getProductPrice,
  };
}
