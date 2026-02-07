"use client";

import { useMemo } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { GlassCard } from "@/components/ui/GlassCard";

ChartJS.register(ArcElement, Tooltip, Legend);

const CHART_COLORS = [
  "#a78bfa",
  "#22d3ee",
  "#34d399",
  "#f472b6",
  "#fbbf24",
  "#60a5fa",
  "#c084fc",
];

export type ChartDataItem = { name: string; value: number };

type SpendingChartProps = {
  chartData: ChartDataItem[];
};

const doughnutOptions: ChartOptions<"doughnut"> = {
  responsive: true,
  maintainAspectRatio: false,
  layout: { padding: 16 },
  cutout: "68%",
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        color: "#94a3b8",
        font: { family: "var(--font-inter)", size: 11 },
        padding: 20,
        usePointStyle: true,
      },
    },
    tooltip: {
      backgroundColor: "rgba(15, 23, 42, 0.95)",
      titleColor: "#f8fafc",
      bodyColor: "#e2e8f0",
      borderColor: "rgba(255, 255, 255, 0.1)",
      borderWidth: 1,
      padding: 14,
      cornerRadius: 12,
      callbacks: {
        label: (ctx) => {
          const total = (ctx.dataset.data as number[]).reduce((a, b) => a + b, 0);
          const pct = total > 0 ? ((ctx.raw as number) / total) * 100 : 0;
          return ` ${ctx.label}: $${(ctx.raw as number).toFixed(2)} (${pct.toFixed(0)}%)`;
        },
      },
    },
  },
};

export const SpendingChart = ({ chartData }: SpendingChartProps) => {
  const doughnutChartData = useMemo(
    () => ({
      labels: chartData.map((d) => d.name),
      datasets: [
        {
          data: chartData.map((d) => d.value),
          backgroundColor: chartData.map(
            (_, i) => CHART_COLORS[i % CHART_COLORS.length]
          ),
          borderColor: "rgba(3, 7, 18, 0.9)",
          borderWidth: 3,
          hoverOffset: 8,
        },
      ],
    }),
    [chartData]
  );

  return (
    <GlassCard className="lg:col-span-2 p-6 sm:p-8">
      <h2
        className="text-lg font-semibold text-white"
        style={{ fontFamily: "var(--font-syne)" }}
      >
        Spending by category
      </h2>
      <div className="mt-6 h-72 sm:h-80">
        {chartData.length > 0 ? (
          <Doughnut data={doughnutChartData} options={doughnutOptions} />
        ) : (
          <div
            className="flex h-full items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02]"
            aria-live="polite"
          >
            <p className="text-slate-500">Add expenses to see the breakdown</p>
          </div>
        )}
      </div>
    </GlassCard>
  );
};
