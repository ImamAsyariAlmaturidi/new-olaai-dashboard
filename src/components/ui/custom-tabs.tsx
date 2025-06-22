"use client"

import type React from "react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface Tab {
  id: string
  label: string
  icon?: React.ComponentType<{ className?: string }>
  content: React.ReactNode
  color?: string
  description?: string
}

interface CustomTabsProps {
  tabs: Tab[]
  defaultTab?: string
  className?: string
  variant?: "pills" | "underline" | "cards" | "sidebar"
}

export function CustomTabs({ tabs, defaultTab, className, variant = "pills" }: CustomTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id)

  const activeTabData = tabs.find((tab) => tab.id === activeTab)

  if (variant === "sidebar") {
    return (
      <div className={cn("flex gap-6", className)}>
        {/* Sidebar */}
        <div className="w-80 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <h3 className="font-semibold text-slate-900">Navigation</h3>
            </div>
            <nav className="p-2">
              {tabs.map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "w-full text-left p-4 rounded-xl mb-2 transition-all duration-300 group",
                      isActive
                        ? `bg-gradient-to-r ${tab.color || "from-blue-500 to-indigo-600"} text-white shadow-lg`
                        : "hover:bg-slate-50 text-slate-700",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      {Icon && <Icon className={cn("w-5 h-5", isActive ? "text-white" : "text-slate-600")} />}
                      <div>
                        <div className={cn("font-medium", isActive ? "text-white" : "text-slate-900")}>{tab.label}</div>
                        {tab.description && (
                          <div className={cn("text-sm mt-1", isActive ? "text-white/80" : "text-slate-500")}>
                            {tab.description}
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">{activeTabData?.content}</div>
        </div>
      </div>
    )
  }

  if (variant === "cards") {
    return (
      <div className={cn("space-y-6", className)}>
        {/* Tab Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "p-6 rounded-2xl border-2 transition-all duration-300 text-center group",
                  isActive
                    ? "border-blue-500 bg-blue-50 shadow-lg scale-105"
                    : "border-slate-200 hover:border-slate-300 hover:shadow-md",
                )}
              >
                {Icon && (
                  <Icon
                    className={cn(
                      "w-8 h-8 mx-auto mb-3 transition-colors",
                      isActive ? "text-blue-600" : "text-slate-600",
                    )}
                  />
                )}
                <div className={cn("font-medium", isActive ? "text-blue-900" : "text-slate-900")}>{tab.label}</div>
                {tab.description && (
                  <div className={cn("text-sm mt-1", isActive ? "text-blue-700" : "text-slate-500")}>
                    {tab.description}
                  </div>
                )}
              </button>
            )
          })}
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">{activeTabData?.content}</div>
      </div>
    )
  }

  if (variant === "underline") {
    return (
      <div className={cn("space-y-6", className)}>
        {/* Tab Navigation */}
        <div className="border-b border-slate-200">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200",
                    isActive
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300",
                  )}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Content */}
        <div>{activeTabData?.content}</div>
      </div>
    )
  }

  // Default pills variant
  return (
    <div className={cn("space-y-6", className)}>
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 p-1 bg-slate-100 rounded-2xl">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-all duration-200",
                isActive
                  ? "bg-white text-slate-900 shadow-md"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/50",
              )}
            >
              {Icon && <Icon className="w-4 h-4" />}
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Content */}
      <div>{activeTabData?.content}</div>
    </div>
  )
}
