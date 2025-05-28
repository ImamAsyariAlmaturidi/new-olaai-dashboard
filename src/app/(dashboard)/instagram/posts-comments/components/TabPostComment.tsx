"use client";

import { TabButton } from "@/components/ui/tabs/TabWithUnderline";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import TabContentPostComment from "./TabContentPostComment";

const tabData = [
  {
    id: "all",
    label: "Semua",
  },
  {
    id: "foto",
    label: "Foto",
  },
  {
    id: "video",
    label: "Video",
  },
];

const TabPostComment = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParams = searchParams.get("tab");

  useEffect(() => {
    if (!searchParams.get("tab")) {
      const params = new URLSearchParams(searchParams.toString());

      params.set("tab", "all");
      router.replace(`/instagram/posts-comments?${params.toString()}`);
    }
  }, [router, searchParams]);

  const handleChangeTab = (newTab: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", newTab);
    router.replace(`/instagram/posts-comments?${params.toString()}`);
  };

  return (
    <div>
      <div className="border-b border-gray-200 dark:border-gray-800">
        <nav className="flex space-x-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-600">
          {tabData.map((tab) => (
            <TabButton
              key={tab.id}
              {...tab}
              isActive={tabParams === tab.id}
              onClick={() => handleChangeTab(tab.id)}
            />
          ))}
        </nav>
      </div>

      <div className="p-3">
        <TabContentPostComment active={tabParams || ""} />
      </div>
    </div>
  );
};

export default TabPostComment;
