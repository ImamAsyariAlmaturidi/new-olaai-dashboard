import React from "react";
import ComponentCard from "../common/ComponentCard";
import { InstagramConnectCard, InstagramConnectionGuide } from "./connect-card";
import { CardDescription } from "../ui/card";
const ConnectPage = () => {
  return (
    <div>
      <div className="rounded-2xl border  border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <ComponentCard title="Connect Instagram Account" className="p-6">
          <CardDescription>
            Link your Instagram business account to manage comments, messages,
            and analytics
          </CardDescription>

          <InstagramConnectCard />
        </ComponentCard>
      </div>
      <div className="mt-6">
        <InstagramConnectionGuide />
      </div>
    </div>
  );
};

export default ConnectPage;
