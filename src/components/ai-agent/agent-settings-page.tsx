"use client";

import { useState } from "react";
import type { Agent } from "@/app/(dashboard)/ai-agent/page";
import {
  ArrowLeft,
  Settings,
  FileText,
  Zap,
  Clock,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import Button from "../ui/button/Button";
import GeneralTab from "./tabs/general-tab";
import KnowledgeTab from "./tabs/knowledge-tab";
import IntegrationsTab from "./tabs/integrations-tab";
import FollowupsTab from "./tabs/followups-tab";

interface AgentSettingsPageProps {
  agent: Agent | null;
  onBackClick: () => void;
}

export default function AgentSettingsPage({
  agent,
  onBackClick,
}: AgentSettingsPageProps) {
  const [activeTab, setActiveTab] = useState("general");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  if (!agent) {
    return <div className="p-4 text-center">No agent selected</div>;
  }

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
  const Icon = currentTab?.icon || Settings;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <Button
              variant="outline"
              size="sm"
              onClick={onBackClick}
              className="shadow-sm hover:shadow-md transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="hidden xs:inline">Back</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="shadow-sm hover:shadow-md transition-all duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
              <span className="ml-2 hidden xs:inline">Menu</span>
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl flex items-center justify-center text-white font-bold text-sm sm:text-base shadow-lg">
              {agent.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent truncate">
                {agent.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 truncate">
                {agent.template}
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Tab Pills */}
        <div className="px-4 pb-3">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg whitespace-nowrap transition-all duration-300 ${
                    isActive
                      ? `bg-gradient-to-r ${tab.color} text-white shadow-md`
                      : "bg-white border border-slate-200 text-slate-700 hover:shadow-sm"
                  }`}
                >
                  <TabIcon
                    className={`w-4 h-4 ${
                      isActive ? "text-white" : "text-slate-600"
                    }`}
                  />
                  <span
                    className={`text-sm font-medium ${
                      isActive ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {tab.shortLabel || tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
          <div className="fixed inset-x-0 top-0 bg-white border-b border-slate-200 max-h-screen overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-900">
                  Navigation
                </h3>
                <Button size="sm" onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-3">
                {tabs.map((tab) => {
                  const TabIcon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                        isActive
                          ? `bg-gradient-to-r ${tab.color} text-white shadow-lg`
                          : "hover:bg-slate-50 text-slate-700 border border-slate-200"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`p-2 rounded-lg ${
                            isActive ? "bg-white/20" : tab.bgColor
                          }`}
                        >
                          <TabIcon
                            className={`w-5 h-5 ${
                              isActive ? "text-white" : "text-slate-600"
                            }`}
                          />
                        </div>
                        <div className="flex-1">
                          <div
                            className={`font-medium ${
                              isActive ? "text-white" : "text-slate-900"
                            }`}
                          >
                            {tab.label}
                          </div>
                          <div
                            className={`text-sm mt-1 ${
                              isActive ? "text-white/80" : "text-slate-500"
                            }`}
                          >
                            {tab.description}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="p-3 sm:p-6">
        {/* Desktop Header */}
        <div className="hidden lg:flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={onBackClick}
              className="shadow-sm hover:shadow-md transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Agents
            </Button>
            <div className="h-6 w-px bg-slate-300" />
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                {agent.name}
              </h1>
              <p className="text-slate-600 text-sm">
                Configure your AI agent settings
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-12 gap-8">
            {/* Desktop Sidebar Navigation */}
            <div className="col-span-3 xl:col-span-3">
              <div className="sticky top-6">
                <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                  <div className="p-6 border-b border-slate-100">
                    <h3 className="font-semibold text-slate-900 mb-1">
                      Settings
                    </h3>
                    <p className="text-sm text-slate-500">
                      Manage your AI agent configuration
                    </p>
                  </div>
                  <nav className="p-2">
                    {tabs.map((tab) => {
                      const TabIcon = tab.icon;
                      const isActive = activeTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`w-full text-left p-4 rounded-xl mb-2 transition-all duration-300 group relative overflow-hidden ${
                            isActive
                              ? `bg-gradient-to-r ${tab.color} text-white shadow-lg transform scale-[1.02]`
                              : "hover:bg-slate-50 text-slate-700 hover:shadow-md"
                          }`}
                        >
                          <div className="flex items-center gap-3 relative z-10">
                            <div
                              className={`p-2 rounded-lg transition-all duration-300 ${
                                isActive
                                  ? "bg-white/20"
                                  : `${tab.bgColor} ${tab.borderColor} border`
                              }`}
                            >
                              <TabIcon
                                className={`w-4 h-4 transition-colors duration-300 ${
                                  isActive ? "text-white" : "text-slate-600"
                                }`}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div
                                className={`font-medium text-sm transition-colors duration-300 ${
                                  isActive ? "text-white" : "text-slate-900"
                                }`}
                              >
                                {tab.label}
                              </div>
                              <div
                                className={`text-xs mt-0.5 transition-colors duration-300 line-clamp-2 ${
                                  isActive ? "text-white/80" : "text-slate-500"
                                }`}
                              >
                                {tab.description}
                              </div>
                            </div>
                            <ChevronRight
                              className={`w-4 h-4 transition-all duration-300 ${
                                isActive
                                  ? "text-white transform rotate-90"
                                  : "text-slate-400 group-hover:text-slate-600"
                              }`}
                            />
                          </div>
                          {isActive && (
                            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-50" />
                          )}
                        </button>
                      );
                    })}
                  </nav>
                </div>

                {/* Desktop Agent Info Card */}
                <div className="mt-6 bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-slate-600 to-slate-700 rounded-2xl flex items-center justify-center text-white font-bold text-xl mx-auto mb-4 shadow-lg">
                      {agent.avatar}
                    </div>
                    <h4 className="font-semibold text-slate-900 mb-1 truncate">
                      {agent.name}
                    </h4>
                    <p className="text-sm text-slate-500 mb-3 truncate">
                      {agent.template}
                    </p>
                    <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      Active
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Main Content */}
            <div className="col-span-9 xl:col-span-9">
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 min-h-[600px]">
                {/* Desktop Tab Header */}
                <div className="border-b border-slate-100 p-6">
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-r ${currentTab?.color} shadow-lg flex-shrink-0`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="text-2xl font-bold text-slate-900 truncate">
                        {currentTab?.label}
                      </h2>
                      <p className="text-slate-600 line-clamp-2">
                        {currentTab?.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Desktop Tab Content */}
                <div className="p-6">
                  <div className="animate-in fade-in-0 duration-300">
                    {renderTabContent()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile/Tablet Layout */}
          <div className="lg:hidden">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 min-h-[500px]">
              {/* Mobile Tab Header */}
              <div className="border-b border-slate-100 p-4 sm:p-6">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 sm:p-3 rounded-xl bg-gradient-to-r ${currentTab?.color} shadow-lg flex-shrink-0`}
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-lg sm:text-2xl font-bold text-slate-900 truncate">
                      {currentTab?.label}
                    </h2>
                    <p className="text-sm text-slate-600 hidden sm:block line-clamp-2">
                      {currentTab?.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Mobile Tab Content */}
              <div className="p-4 sm:p-6">
                <div className="animate-in fade-in-0 duration-300">
                  {renderTabContent()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
