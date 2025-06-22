"use client";

import { useState } from "react";
import { ArrowLeft, Settings, FileText, Zap, Clock } from "lucide-react";
import GeneralTab from "@/components/ai-agent/tabs/general-tab";
import KnowledgeTab from "@/components/ai-agent/tabs/knowledge-tab";
import IntegrationsTab from "@/components/ai-agent/tabs/integrations-tab";
import FollowupsTab from "@/components/ai-agent/tabs/followups-tab";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AgentSettingsPage = () => {
  const [activeTab, setActiveTab] = useState("general");
  const router = useRouter();
  // const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const tabs = [
    {
      id: "general",
      label: "General",
      icon: Settings,
      description: "Basic AI configuration and behavior settings",
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      id: "knowledge",
      label: "Knowledge Sources",
      shortLabel: "Knowledge",
      icon: FileText,
      description: "Manage training data and knowledge base",
      color: "from-emerald-500 to-teal-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
    },
    {
      id: "integrations",
      label: "Integrations",
      icon: Zap,
      description: "Connect with third-party apps and services",
      color: "from-purple-500 to-violet-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
    },
    {
      id: "followups",
      label: "Followups",
      icon: Clock,
      description: "Automated follow-up messages and sequences",
      color: "from-orange-500 to-red-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return <GeneralTab />;
      case "knowledge":
        return <KnowledgeTab />;
      case "integrations":
        return <IntegrationsTab />;
      case "followups":
        return <FollowupsTab />;
      default:
        return <GeneralTab />;
    }
  };

  const currentTab = tabs.find((tab) => tab.id === activeTab);
  // const Icon = currentTab?.icon || Settings;

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Page Header - Fixed */}
      <div className="flex-shrink-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10 w-full">
        <div className="px-4 sm:px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/ai-agent">
              {" "}
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.back()}
                className="flex items-center gap-2 flex-shrink-0 dark:border-gray-600 dark:hover:bg-gray-700"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back to Agents</span>
                <span className="sm:hidden">Back</span>
              </Button>
            </Link>

            <div className="h-6 w-px bg-gray-300 dark:bg-gray-600 hidden sm:block" />

            <div className="flex items-center gap-3 min-w-0">
              {/* <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl flex items-center justify-center text-white font-bold shadow-lg flex-shrink-0">
                HR
              </div> */}
              <div className="min-w-0">
                <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 truncate">
                  HR
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic,
                  doloribus?
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation - Responsive */}
        <div className="px-4 sm:px-6 overflow-hidden">
          <div className="flex gap-1 overflow-x-auto scrollbar-hide pb-px">
            {tabs.map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-3 border-b-2 whitespace-nowrap transition-colors flex-shrink-0 ${
                    isActive
                      ? "border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                      : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                >
                  <TabIcon className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tab Content - Scrollable */}
      <div className="flex-1 overflow-auto mt-4">
        {" "}
        {/* Added margin-top to avoid content overlap */}
        <div className="p-4 sm:p-6 h-full">
          <div className="max-w-7xl mx-auto h-full">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 h-full flex flex-col">
              {/* Content Header */}
              <div className="flex-shrink-0 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg bg-gradient-to-r ${currentTab?.color} flex-shrink-0`}
                  >
                    {currentTab?.icon && (
                      <currentTab.icon className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {currentTab?.label}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 hidden sm:block">
                      {currentTab?.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Content - Scrollable */}
              <div className="flex-1 overflow-auto">
                <div className="p-4 sm:p-6">{renderTabContent()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentSettingsPage;
