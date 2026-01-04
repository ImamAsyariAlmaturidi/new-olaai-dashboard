"use client";

import { BusinessProvider, useBusinessContext } from "@/context/BusinessContext";
import AppHeader from "@/layout/AppHeader";
import AppSidebar from "@/layout/AppSidebar";
import Backdrop from "@/layout/Backdrop";
import React from "react";

function LayoutWithStatus({ children }: { children: React.ReactNode }) {
  const { loading, error } = useBusinessContext();
  const mainContentPadding = "pl-0 lg:pl-[90px]";

  return (
    <div className="min-h-screen xl:flex relative overflow-x-hidden">
      <AppSidebar />
      <Backdrop />
      <div className="flex-1 min-w-0">
        <div className={`flex min-h-screen flex-col transition-all duration-300 ease-in-out ${mainContentPadding}`}>
          <AppHeader />
          <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
            {children}
          </div>
        </div>
      </div>
      {(loading || error) && (
        <div className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-white/80 dark:bg-black/80">
          <div className="text-center space-y-3">
            {loading ? (
              <>
                <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-t-brand-500 border-gray-200"></div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Mengambil data bisnis...
                </p>
              </>
            ) : (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-5 text-center text-sm text-red-600 dark:border-red-700 dark:bg-red-500/10">
                <p className="font-semibold">Konteks bisnis gagal dimuat</p>
                <p className="pt-1">{error}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BusinessProvider>
      <LayoutWithStatus>
        <>{children}</>
      </LayoutWithStatus>
    </BusinessProvider>
  );
}
