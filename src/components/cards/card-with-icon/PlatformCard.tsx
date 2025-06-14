import { CardDescription, CardTitle } from "../../ui/card";
import type { LucideIcon } from "lucide-react";

type PlatformCardProps = {
  title?: string;
  icon?: LucideIcon;
  mainMetric?: string;
  metricChange?: string;
  metricLabel?: string;
  comments?: string;
  likes?: string;
  isPositive?: boolean;
};

export default function PlatformCard({
  title,
  icon: Icon,
  mainMetric = "8,481",
  metricChange = "+6.48%",
  metricLabel = "Followers",
  comments = "4,507",
  likes = "1,254.58",
  isPositive = true,
}: PlatformCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-gray-100 p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      {/* Platform Header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
          {Icon && (
            <Icon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          )}
        </div>
        <CardTitle>{title}</CardTitle>
      </div>

      {/* Main Metric */}
      <div className="mb-2 flex items-baseline gap-3">
        <span className="text-3xl font-bold text-gray-900 dark:text-white">
          {mainMetric}
        </span>
        <span
          className={`rounded-full px-2 py-1 text-sm font-medium ${
            isPositive
              ? "bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
              : "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400"
          }`}
        >
          {metricChange}
        </span>
      </div>

      <CardDescription>{metricLabel}</CardDescription>

      <div className="p-4 border-t-4 border-gray-100 dark:border-gray-800 sm:p-6"></div>

      <div className="flex justify-between">
        <div>
          <CardDescription>Comments</CardDescription>
          <span className="text-lg font-semibold text-gray-900 dark:text-white">
            {comments}
          </span>
        </div>
        <div>
          <CardDescription>Likes</CardDescription>
          <span className="text-lg font-semibold text-gray-900 dark:text-white">
            {likes}
          </span>
        </div>
      </div>
    </div>
  );
}
