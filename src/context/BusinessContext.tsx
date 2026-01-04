"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { doLogout } from "@/app/actions/auth";

type Business = {
  id: string;
  name: string;
  slug: string;
  timezone: string;
  createdAt: string;
};

type BusinessContextValue = {
  businesses: Business[];
  roles: { id: string; name: string }[];
  loading: boolean;
  error?: string;
  user?: {
    id: string;
    email?: string;
    name?: string;
    phoneNumber?: string;
    businessName?: string;
  };
  refresh: () => void;
};

const BusinessContext = createContext<BusinessContextValue | undefined>(undefined);

export const BusinessProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [roles, setRoles] = useState<{ id: string; name: string }[]>([]);
  const [user, setUser] = useState<BusinessContextValue["user"]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const [refreshKey, setRefreshKey] = useState(0);
  const [didAuthRedirect, setDidAuthRedirect] = useState(false);

  const fetchBusinesses = async () => {
    setLoading(true);
    setError(undefined);
    try {
      const response = await fetch("/api/admin/businesses/me", {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok && response.status === 401 && !didAuthRedirect) {
        const payload = await response
          .json()
          .catch(async () => ({ error: await response.text() }));
        const message =
          typeof payload?.error === "string"
            ? payload.error
            : typeof payload?.message === "string"
              ? payload.message
              : "";

        if (
          message.includes("Authentication required") ||
          message.toLowerCase().includes("unauthorized") ||
          message.toLowerCase().includes("token")
        ) {
          setDidAuthRedirect(true);
          await doLogout();
          router.replace("/signin");
          return;
        }
      }

      if (!response.ok) {
        const payload = await response.text();
        throw new Error(payload || "Failed to fetch businesses");
      }

      const payload = await response.json().catch(() => null);
      const maybeBusinesses = Array.isArray(payload?.businesses)
        ? payload.businesses
        : [];
      const maybeRoles = Array.isArray(payload?.roles) ? payload.roles : [];

      const userFromPayload =
        payload && typeof payload.user === "object"
          ? {
              id: payload.user.id,
              email: payload.user.email,
              name: payload.user.name,
              phoneNumber: payload.user.phoneNumber,
              businessName: payload.user.businessName,
            }
          : undefined;

      setUser(userFromPayload);

      if (!maybeBusinesses.length && userFromPayload?.businessName) {
        maybeBusinesses.push({
          id: userFromPayload.id,
          name: userFromPayload.businessName,
          slug: userFromPayload.businessName
            .toLowerCase()
            .replace(/\s+/g, "-"),
          timezone: "UTC",
          createdAt: new Date().toISOString(),
        });
      }

      setBusinesses(maybeBusinesses);
      setRoles(maybeRoles);
    } catch (err) {
      console.error("fetchBusinesses error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load businesses at the moment"
      );
      setBusinesses([]);
      setRoles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleRefresh = () => setRefreshKey((prev) => prev + 1);
    window.addEventListener("businessRefresh", handleRefresh);

    return () => window.removeEventListener("businessRefresh", handleRefresh);
  }, []);

  useEffect(() => {
    fetchBusinesses();
  }, [refreshKey]);

  const value = useMemo(
    () => ({
      businesses,
      roles,
      loading,
      error,
      user,
      refresh: fetchBusinesses,
    }),
    [businesses, error, loading, roles, user]
  );

  return (
    <BusinessContext.Provider value={value}>
      {children}
    </BusinessContext.Provider>
  );
};

export const useBusinessContext = () => {
  const ctx = useContext(BusinessContext);
  if (!ctx) {
    throw new Error("useBusinessContext must be used within BusinessProvider");
  }
  return ctx;
};
