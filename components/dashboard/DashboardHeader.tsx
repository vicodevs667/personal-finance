"use client";

import { BrandHeader } from "@/components/ui/BrandHeader";

type DashboardHeaderProps = {
  currentMonthLabel: string;
};

export const DashboardHeader = ({ currentMonthLabel }: DashboardHeaderProps) => {
  const rightElement = (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl">
      <span className="text-sm font-medium text-slate-400" aria-label="Current period">
        {currentMonthLabel}
      </span>
    </div>
  );
  return (
    <header className="mb-10">
      <BrandHeader rightElement={rightElement} />
    </header>
  );
};
