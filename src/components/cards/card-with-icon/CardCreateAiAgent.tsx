import React from "react";
import { CardDescription, CardTitle } from "../../ui/card";
import { LucideIcon } from "lucide-react";
type CardIconOneProps = {
  title?: string;
  cardDescription?: string;
  cardIcon?: LucideIcon;
};
export default function CardIconOne(CardIconOneProps: CardIconOneProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
      <div>
        <div className="mb-5 flex h-14 max-w-14 items-center justify-center rounded-[10.5px] bg-brand-50 text-brand-500 dark:bg-brand-500/10">
          {CardIconOneProps.cardIcon && (
            <CardIconOneProps.cardIcon className="h-6 w-6" aria-hidden="true" />
          )}
        </div>
        <CardTitle>{CardIconOneProps?.title}</CardTitle>
        <CardDescription>{CardIconOneProps?.cardDescription}</CardDescription>
      </div>
    </div>
  );
}
