"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  FileText,
  Globe,
  HelpCircle,
  Settings,
  Plus,
  Bold,
  Italic,
  ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  ChevronLeft,
  ChevronRight,
  Search,
  Upload,
  Undo,
  Redo,
} from "lucide-react";

export default function KnowledgeTab() {
  const [activeSubTab, setActiveSubTab] = useState("text");
  const [textContent, setTextContent] = useState("");
  const [linkMode, setLinkMode] = useState("batch"); // "batch" or "single"
  const [linkUrl, setLinkUrl] = useState("");

  const subTabs = [
    { id: "text", label: "Text", icon: FileText },
    { id: "website", label: "Website", icon: Globe },
    { id: "file", label: "File", icon: FileText },
    { id: "qa", label: "Q&A", icon: HelpCircle },
    { id: "product", label: "Product", icon: Settings },
  ];

  const stats = {
    files: 0,
    textInputCharacters: textContent.length,
    links: 0,
    qa: 0,
    totalDetectedCharacters: textContent.length,
  };

  const renderTextTab = () => (
    <div className="space-y-4">
      {/* Tab Navigation */}
      <div className="flex items-center gap-2 mb-4">
        <Button variant="outline" size="sm">
          <Plus className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="sm" className="bg-blue-500 text-white">
          Default
        </Button>
        <div className="ml-auto flex gap-2">
          <Button variant="outline" size="sm">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Text Editor */}
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardContent className="p-0">
          {/* Toolbar */}
          <div className="border-b border-gray-200 dark:border-gray-600 p-3 flex gap-2">
            <Button variant="ghost" size="sm">
              <Undo className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Redo className="w-4 h-4" />
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <Button variant="ghost" size="sm">
              <Bold className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Italic className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <ImageIcon className="w-4 h-4" />
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <Button variant="ghost" size="sm">
              <AlignLeft className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <AlignCenter className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <AlignRight className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <AlignJustify className="w-4 h-4" />
            </Button>
          </div>

          {/* Editor Area */}
          <div className="p-4 min-h-[400px]">
            <textarea
              className="w-full h-full min-h-[350px] border-none outline-none resize-none bg-transparent text-gray-900 dark:text-gray-100"
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              placeholder="Start typing..."
            />
          </div>

          {/* Character Count */}
          <div className="border-t border-gray-200 dark:border-gray-600 p-3 text-sm text-gray-500 dark:text-gray-400">
            {textContent.length} Characters
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderWebsiteTab = () => (
    <div className="space-y-6">
      {/* Provide Link Section */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Provide Link</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Provide a link to the page you want the AI to learn from.
        </p>

        {/* Link Mode Tabs */}
        <div className="flex gap-2 mb-4">
          <Button
            variant={linkMode === "batch" ? "default" : "outline"}
            size="sm"
            onClick={() => setLinkMode("batch")}
          >
            Batch Link
          </Button>
          <Button
            variant={linkMode === "single" ? "default" : "outline"}
            size="sm"
            onClick={() => setLinkMode("single")}
          >
            Single Link
          </Button>
        </div>

        {/* Web Link Collector or Add Single Link */}
        {linkMode === "batch" ? (
          <div>
            <h4 className="font-medium mb-2">Web Link Collector</h4>
            <div className="flex gap-2 mb-2">
              <Input
                placeholder="Link URL"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                className="flex-1"
              />
              <Button className="bg-blue-500 hover:bg-blue-600">Collect Link</Button>
            </div>
            <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 mb-4">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              Start with URL and this tool will gather up to <strong>30 unique</strong> links from
              the site, excluding any files
            </div>
          </div>
        ) : (
          <div>
            <h4 className="font-medium mb-2">Add Single Link</h4>
            <div className="flex gap-2 mb-2">
              <Input
                placeholder="Link URL"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                className="flex-1"
              />
              <Button className="bg-blue-500 hover:bg-blue-600">Add Link</Button>
            </div>
            <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 mb-4">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              Submit a single link to explore its content directly
            </div>
          </div>
        )}
      </div>

      {/* Trained Link Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Trained Link</h3>
        <div className="flex items-center gap-2 mb-4">
          <input type="checkbox" id="select-all" className="rounded" />
          <label htmlFor="select-all" className="text-sm text-blue-600 dark:text-blue-400">
            Select
          </label>
          <div className="flex items-center gap-2 ml-4">
            <Search className="w-4 h-4 text-gray-400" />
            <Input placeholder="Search Links" className="w-48" />
          </div>
        </div>

        {/* Empty state */}
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No trained links available
        </div>
      </div>
    </div>
  );

  const renderFileTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Files</h3>

        {/* Drag & Drop Area */}
        <Card className="border-2 border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800">
          <CardContent className="p-8 text-center">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              Drag & drop your files here or click to select files
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Supported File Type: pdf
            </p>
            <Button variant="outline">Choose Files</Button>
          </CardContent>
        </Card>

        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
          If you are uploading a PDF, make sure you can{" "}
          <span className="text-blue-600 dark:text-blue-400 underline cursor-pointer">
            highlight the text
          </span>
        </p>

        {/* File Lists */}
        <div className="mt-6 space-y-4">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-gray-100">
              Already Included Files: -
            </h4>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 dark:text-gray-100">To be added: -</h4>
          </div>
        </div>
      </div>
    </div>
  );

  const renderQATab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Q&A</h3>
        <Button className="bg-blue-500 hover:bg-blue-600">Add New Q&A</Button>
      </div>

      {/* Empty state */}
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        No Q&A pairs available
      </div>
    </div>
  );

  const renderProductTab = () => (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="text-center max-w-md">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Create a Product First
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          You haven&apos;t created any products yet. Create one first to proceed with import.
        </p>
        <Button className="bg-blue-500 hover:bg-blue-600">
          <Plus className="w-4 h-4 mr-2" />
          Create Product
        </Button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSubTab) {
      case "text":
        return renderTextTab();
      case "website":
        return renderWebsiteTab();
      case "file":
        return renderFileTab();
      case "qa":
        return renderQATab();
      case "product":
        return renderProductTab();
      default:
        return renderTextTab();
    }
  };

  return (
    <div className="flex gap-6">
      {/* Main Content */}
      <div className="flex-1">
        {/* Sub Tab Navigation */}
        <div className="flex gap-2 mb-6">
          {subTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <Button
                key={tab.id}
                variant={isActive ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveSubTab(tab.id)}
                className={isActive ? "bg-blue-500 text-white" : ""}
              >
                <Icon className="w-4 h-4 mr-2" />
                {tab.label}
              </Button>
            );
          })}
        </div>

        {/* Content */}
        {renderContent()}
      </div>

      {/* Stats Sidebar */}
      <div className="w-64 flex-shrink-0">
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-4 space-y-4">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Files</div>
              <div className="text-2xl font-bold dark:text-gray-300">{stats.files}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Text Input Characters</div>
              <div className="text-2xl font-bold dark:text-gray-300">
                {stats.textInputCharacters}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Links</div>
              <div className="text-2xl font-bold dark:text-gray-300">{stats.links}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Q&A</div>
              <div className="text-2xl font-bold dark:text-gray-300">{stats.qa}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Total Detected Characters
              </div>
              <div className="text-2xl font-bold dark:text-gray-300">
                {stats.totalDetectedCharacters}
              </div>
            </div>
            <Button className="w-full bg-blue-500 hover:bg-blue-600 mt-6">Save</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
