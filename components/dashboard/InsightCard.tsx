"use client";

import type { AIAdvice } from "@/types";
import { GlassCard } from "@/components/ui/GlassCard";

type InsightCardProps = {
  advice: AIAdvice | null;
};

const getInsightStyles = (severity: AIAdvice["severity"]) => {
  if (severity === "high") {
    return "border-amber-500/30 bg-amber-500/5";
  }
  if (severity === "medium") {
    return "border-violet-500/20 bg-gradient-to-br from-violet-500/10 via-transparent to-cyan-500/10";
  }
  return "border-white/10 bg-gradient-to-br from-violet-500/10 via-transparent to-cyan-500/10";
};

export const InsightCard = ({ advice }: InsightCardProps) => {
  return (
    <GlassCard className="p-6 sm:p-8">
      <h2
        className="flex items-center gap-2 text-lg font-semibold text-white"
        style={{ fontFamily: "var(--font-syne)" }}
      >
        <span className="text-2xl" aria-hidden>
          ◇
        </span>
        Insight
      </h2>
      {advice ? (
        <div
          className={`mt-6 rounded-2xl border p-5 backdrop-blur-sm ${getInsightStyles(advice.severity)}`}
        >
          <p className="text-sm leading-relaxed text-slate-400">{advice.message}</p>
        </div>
      ) : (
        <p className="mt-6 text-sm text-slate-500">No insights at the moment.</p>
      )}
    </GlassCard>
  );
};
