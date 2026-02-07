"use client";

import { GlassCard } from "@/components/ui/GlassCard";

type MetricCardProps = {
  label: string;
  value: string;
  subtitle?: string;
  subtitleClassName?: string;
  progressPercent?: number;
};

export const MetricCard = ({
  label,
  value,
  subtitle,
  subtitleClassName,
  progressPercent,
}: MetricCardProps) => {
  return (
    <GlassCard className="p-6">
      <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
        {label}
      </p>
      <p
        className="mt-2 text-2xl font-bold text-white"
        style={{ fontFamily: "var(--font-syne)" }}
      >
        {value}
      </p>
      {subtitle !== undefined && (
        <p className={`mt-0.5 text-xs ${subtitleClassName ?? "text-slate-500"}`}>
          {subtitle}
        </p>
      )}
      {progressPercent !== undefined && (
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
            role="progressbar"
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      )}
    </GlassCard>
  );
};
