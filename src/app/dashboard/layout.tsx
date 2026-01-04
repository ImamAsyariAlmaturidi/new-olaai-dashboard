"use client";

import { BusinessProvider } from "@/context/BusinessContext";
import AppHeader from "@/layout/AppHeader";
import AppSidebar from "@/layout/AppSidebar";
import Backdrop from "@/layout/Backdrop";
import React from "react";

function DashboardLayoutInner({
  children,
}: {
  children: React.ReactNode;
}) {
  const mainContentPadding = "pl-0 lg:pl-[90px]";

  return (
    <div className="min-h-screen xl:flex overflow-x-hidden">
      <AppSidebar />
      <Backdrop />
      <div className={`flex-1 transition-all duration-300 ease-in-out ${mainContentPadding}`}>
        <AppHeader />
        <div className="mx-auto">{children}</div>
      </div>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BusinessProvider>
      <DashboardLayoutInner>{children}</DashboardLayoutInner>
    </BusinessProvider>
  );
}
