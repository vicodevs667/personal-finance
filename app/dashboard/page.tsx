"use client";

import { useState, useMemo } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import type { Transaction, TransactionCategory } from "../../types";
import {
  mockTransactions,
  mockFinancialSummary,
  mockAIAdvice,
  TRANSACTION_CATEGORIES,
} from "../../lib/mockData";

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

function GlassCard({
  children,
  className = "",
  glow = false,
}: {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}) {
  return (
    <div
      className={`
        relative overflow-hidden rounded-3xl border border-white/[0.08]
        bg-white/[0.04] shadow-2xl shadow-black/20
        backdrop-blur-2xl transition-all duration-300
        hover:border-white/[0.12] hover:bg-white/[0.06]
        ${glow ? "shadow-[0_0_60px_-12px_var(--glow-violet)]" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default function PersonalFinanceDashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<TransactionCategory>(TRANSACTION_CATEGORIES[0]);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [description, setDescription] = useState("");

  const summary = mockFinancialSummary;
  const expenses = useMemo(
    () => transactions.filter((t) => t.type === "expense"),
    [transactions]
  );
  const incomeTransactions = useMemo(
    () => transactions.filter((t) => t.type === "income"),
    [transactions]
  );

  const totalExpenses = useMemo(
    () => expenses.reduce((sum, t) => sum + t.amount, 0),
    [expenses]
  );
  const totalIncome = useMemo(
    () => incomeTransactions.reduce((sum, t) => sum + t.amount, 0),
    [incomeTransactions]
  );
  const totalBalance = totalIncome - totalExpenses;

  const monthlySpending = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    return expenses
      .filter((t) => {
        const d = new Date(t.date);
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
      })
      .reduce((sum, t) => sum + t.amount, 0);
  }, [expenses]);

  const monthlyIncome = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    return incomeTransactions
      .filter((t) => {
        const d = new Date(t.date);
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
      })
      .reduce((sum, t) => sum + t.amount, 0);
  }, [incomeTransactions]);

  const spendingPercent = Math.min(100, (monthlySpending / 2000) * 100);

  const chartData = useMemo(() => {
    const byCategory: Record<string, number> = {};
    expenses.forEach((t) => {
      byCategory[t.category] = (byCategory[t.category] ?? 0) + t.amount;
    });
    return Object.entries(byCategory).map(([name, value]) => ({
      name,
      value: Math.round(value * 100) / 100,
    }));
  }, [expenses]);

  const doughnutChartData = useMemo(
    () => ({
      labels: chartData.map((d) => d.name),
      datasets: [
        {
          data: chartData.map((d) => d.value),
          backgroundColor: chartData.map((_, i) => CHART_COLORS[i % CHART_COLORS.length]),
          borderColor: "rgba(3, 7, 18, 0.9)",
          borderWidth: 3,
          hoverOffset: 8,
        },
      ],
    }),
    [chartData]
  );

  const doughnutOptions: ChartOptions<"doughnut"> = useMemo(
    () => ({
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
            label: (ctx) =>
              ` ${ctx.label}: $${(ctx.raw as number).toFixed(2)} (${(
                ((ctx.raw as number) /
                  (ctx.dataset.data as number[]).reduce((a, b) => a + b, 0)) *
                100
              ).toFixed(0)}%)`,
          },
        },
      },
    }),
    []
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!amount || !description.trim()) return;
    const newTransaction: Transaction = {
      id: crypto.randomUUID(),
      amount: parseFloat(amount),
      date,
      type: "expense",
      category,
      description: description.trim(),
    };
    setTransactions((prev) => [newTransaction, ...prev]);
    setAmount("");
    setCategory(TRANSACTION_CATEGORIES[0]);
    setDate(new Date().toISOString().slice(0, 10));
    setDescription("");
  }

  const recentTransactions = useMemo(
    () => [...transactions].sort((a, b) => (b.date > a.date ? 1 : -1)).slice(0, 8),
    [transactions]
  );
  const primaryAdvice = mockAIAdvice[0] ?? null;

  const currentMonthLabel = new Date().toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Ambient background */}
      <div
        className="fixed inset-0 -z-10"
        aria-hidden
      >
        <div className="absolute top-[-40%] left-[-20%] w-[80%] aspect-square rounded-full bg-violet-500/20 blur-[128px] pointer-events-none" />
        <div className="absolute top-[-20%] right-[-10%] w-[60%] aspect-square rounded-full bg-cyan-500/15 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-30%] left-[30%] w-[50%] aspect-square rounded-full bg-fuchsia-500/10 blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[#030712]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/30 to-cyan-500/30 border border-white/10 backdrop-blur-xl">
              <span className="text-lg font-bold text-white" style={{ fontFamily: "var(--font-syne)" }}>
                P
              </span>
            </div>
            <span className="text-xl font-bold tracking-tight text-white" style={{ fontFamily: "var(--font-syne)" }}>
              Personal Finance
            </span>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl">
            <span className="text-sm font-medium text-slate-400">{currentMonthLabel}</span>
          </div>
        </header>

        {/* Hero: Available balance */}
        <section className="mb-8">
          <GlassCard className="p-8 sm:p-10" glow>
            <p className="text-sm font-medium uppercase tracking-widest text-slate-400">
              Available balance
            </p>
            <p className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <span
                className={`tabular-nums text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl ${
                  totalBalance >= 0 ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {totalBalance < 0 && "−"}
                ${Math.abs(totalBalance).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              {totalBalance < 0 && (
                <span className="text-base font-medium text-red-400/90 sm:text-lg">over budget</span>
              )}
            </p>
            <p className="mt-3 text-sm text-slate-500">
              Income ${totalIncome.toLocaleString("en-US", { minimumFractionDigits: 2 })} − expenses ${totalExpenses.toFixed(2)}
            </p>
          </GlassCard>
        </section>

        {/* Bento: Metric cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <GlassCard className="p-6">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Income</p>
            <p className="mt-2 text-2xl font-bold text-white" style={{ fontFamily: "var(--font-syne)" }}>
              ${monthlyIncome.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </p>
            <p className="mt-0.5 text-xs text-slate-500">This month</p>
          </GlassCard>
          <GlassCard className="p-6">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Monthly spending</p>
            <p className="mt-2 text-2xl font-bold text-white" style={{ fontFamily: "var(--font-syne)" }}>
              ${monthlySpending.toFixed(2)}
            </p>
            {summary.percentageComparisonToLastMonth !== 0 && (
              <p className={`mt-0.5 text-xs ${summary.percentageComparisonToLastMonth < 0 ? "text-emerald-400" : "text-amber-400"}`}>
                {summary.percentageComparisonToLastMonth > 0 ? "+" : ""}{summary.percentageComparisonToLastMonth}% vs last month
              </p>
            )}
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 transition-all duration-500"
                style={{ width: `${spendingPercent}%` }}
              />
            </div>
          </GlassCard>
          <GlassCard className="p-6">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Total expenses</p>
            <p className="mt-2 text-2xl font-bold text-white" style={{ fontFamily: "var(--font-syne)" }}>
              ${totalExpenses.toFixed(2)}
            </p>
            <p className="mt-0.5 text-xs text-slate-500">All time</p>
          </GlassCard>
        </div>

        {/* Bento: Chart + Add expense */}
        <div className="mb-8 grid gap-6 lg:grid-cols-3">
          <GlassCard className="lg:col-span-2 p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-white" style={{ fontFamily: "var(--font-syne)" }}>
              Spending by category
            </h2>
            <div className="mt-6 h-72 sm:h-80">
              {chartData.length > 0 ? (
                <Doughnut data={doughnutChartData} options={doughnutOptions} />
              ) : (
                <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02]">
                  <p className="text-slate-500">Add expenses to see the breakdown</p>
                </div>
              )}
            </div>
          </GlassCard>

          <GlassCard className="p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-white" style={{ fontFamily: "var(--font-syne)" }}>
              Add expense
            </h2>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label htmlFor="amount" className="block text-xs font-medium uppercase tracking-wider text-slate-500">
                  Amount
                </label>
                <input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 backdrop-blur-sm transition-colors focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label htmlFor="category" className="block text-xs font-medium uppercase tracking-wider text-slate-500">
                  Category
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as TransactionCategory)}
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white backdrop-blur-sm transition-colors focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 [&>option]:bg-slate-900 [&>option]:text-white"
                >
                  {TRANSACTION_CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="date" className="block text-xs font-medium uppercase tracking-wider text-slate-500">
                  Date
                </label>
                <input
                  id="date"
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white backdrop-blur-sm transition-colors focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 [color-scheme:dark]"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-xs font-medium uppercase tracking-wider text-slate-500">
                  Description
                </label>
                <input
                  id="description"
                  type="text"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 backdrop-blur-sm transition-colors focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                  placeholder="e.g. Coffee shop"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-violet-500 via-fuchsia-500/90 to-cyan-500 px-4 py-3.5 font-semibold text-white shadow-lg shadow-violet-500/20 transition-all hover:shadow-violet-500/30 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:ring-offset-[#030712]"
              >
                Add expense
              </button>
            </form>
          </GlassCard>
        </div>

        {/* Bento: Recent + AI */}
        <div className="grid gap-6 lg:grid-cols-3">
          <GlassCard className="lg:col-span-2 p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-white" style={{ fontFamily: "var(--font-syne)" }}>
              Recent transactions
            </h2>
            <ul className="mt-6 space-y-2">
              {recentTransactions.map((tx) => (
                <li
                  key={tx.id}
                  className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-3.5 transition-colors hover:bg-white/[0.06] hover:border-white/10"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-white">{tx.description}</p>
                    <p className="text-xs text-slate-500">
                      {tx.category} · {new Date(tx.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </p>
                  </div>
                  <span
                    className={`ml-4 shrink-0 font-semibold ${tx.type === "income" ? "text-emerald-400" : "text-white"}`}
                  >
                    {tx.type === "income" ? "+" : "−"}${tx.amount.toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          </GlassCard>

          <GlassCard className="p-6 sm:p-8">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-white" style={{ fontFamily: "var(--font-syne)" }}>
              <span className="text-2xl" aria-hidden>◇</span>
              Insight
            </h2>
            {primaryAdvice ? (
              <div
                className={`mt-6 rounded-2xl border p-5 backdrop-blur-sm ${
                  primaryAdvice.severity === "high"
                    ? "border-amber-500/30 bg-amber-500/5"
                    : primaryAdvice.severity === "medium"
                      ? "border-violet-500/20 bg-gradient-to-br from-violet-500/10 via-transparent to-cyan-500/10"
                      : "border-white/10 bg-gradient-to-br from-violet-500/10 via-transparent to-cyan-500/10"
                }`}
              >
                <p className="text-sm leading-relaxed text-slate-400">{primaryAdvice.message}</p>
              </div>
            ) : (
              <p className="mt-6 text-sm text-slate-500">No insights at the moment.</p>
            )}
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
