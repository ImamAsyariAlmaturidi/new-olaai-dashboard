import Link from "next/link";

export const metadata = {
  title: "Dashboard",
  description: "A gateway for the dashboard subpages",
};

export default function DashboardRootPage() {
  return (
    <div className="min-h-[70vh] p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p>This is the main dashboard entry point.</p>
      <div className="flex flex-col gap-3"></div>
    </div>
  );
}
