import AddItemsCard from "@/components/common/AddItemsCard";
import ComponentCard from "@/components/common/ComponentCard";
import { RefreshCw } from "lucide-react";
import { Youtube, Twitter, Instagram } from "lucide-react";

import { Metadata } from "next";
import PlatformCard from "../cards/card-with-icon/PlatformCard";

type ConnectedPlatformProps = {
  connectedPlatforms: string[];
};

export const metadata: Metadata = {
  title: "OLA AI CONNECTED PLATFORMS | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Carousel page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

export default function ConnectedPlatform({
  connectedPlatforms,
}: ConnectedPlatformProps) {
  return (
    <div>
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2 xl:gap-6">
        <div className="flex flex-col gap-5 xl:gap-6">
          <ComponentCard title="Overview" className=" w-[550px]">
            {connectedPlatforms.length === 0 ? (
              <div>
                <AddItemsCard />
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm my-2 dark:text-white">
                    Connected Accounts
                  </p>
                  <span className="flex items-center justify-around w-48">
                    <p className="text-xs font-thin dark:text-white">
                      Refreshed 20 sec ago
                    </p>
                    <RefreshCw className="w-4 dark:text-white" />
                    <button className="text-xs text-brand-500 hover:text-brand-600 dark:text-brand-400">
                      Refresh
                    </button>
                  </span>
                </div>

                <span
                  className="grid gap-3"
                  style={{
                    gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
                  }}
                >
                  <PlatformCard
                    title="YouTube"
                    icon={Youtube}
                    mainMetric="8,481"
                    metricChange="+6.48%"
                    metricLabel="Subscribers"
                    comments="4,507"
                    likes="1,254.58"
                    isPositive={true}
                  />

                  <PlatformCard
                    title="Twitter"
                    icon={Twitter}
                    mainMetric="8,481"
                    metricChange="+6.48%"
                    metricLabel="Followers"
                    comments="4,507"
                    likes="1,254.58"
                    isPositive={true}
                  />

                  <PlatformCard
                    title="Instagram"
                    icon={Instagram}
                    mainMetric="8,481"
                    metricChange="+6.48%"
                    metricLabel="Followers"
                    comments="4,507"
                    likes="1,254.58"
                    isPositive={true}
                  />
                </span>
                <div className="col-span-3 xl:col-span-3 my-4">
                  <AddItemsCard />
                </div>
              </div>
            )}
          </ComponentCard>
        </div>
      </div>
    </div>
  );
}
