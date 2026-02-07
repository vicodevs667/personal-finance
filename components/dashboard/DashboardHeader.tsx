"use client";

import { BrandHeader } from "@/components/ui/BrandHeader";

type DashboardHeaderProps = {
  currentMonthLabel: string;
  /** Optional right-side content (e.g. New Transaction button + month). If not provided, only the month pill is shown. */
  rightElement?: React.ReactNode;
};

export const DashboardHeader = ({
  currentMonthLabel,
  rightElement,
}: DashboardHeaderProps) => {
  const defaultRight = (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl">
      <span className="text-sm font-medium text-slate-400" aria-label="Current period">
        {currentMonthLabel}
      </span>
    </div>
  );
  return (
    <header className="mb-10">
      <BrandHeader rightElement={rightElement ?? defaultRight} />
    </header>
  );
};
