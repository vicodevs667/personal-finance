"use client";

import { useDashboardData } from "@/hooks/useDashboardData";
import { GlassCard } from "@/components/ui/GlassCard";
import {
  AmbientBackground,
  DashboardHeader,
  BalanceHero,
  MetricCard,
  SpendingChart,
  AddExpenseForm,
  RecentTransactions,
  InsightCard,
} from "@/components/dashboard";

export default function PersonalFinanceDashboard() {
  const {
    totalBalance,
    totalIncome,
    totalExpenses,
    monthlyIncome,
    monthlySpending,
    spendingPercent,
    chartData,
    recentTransactions,
    primaryAdvice,
    summary,
    handleAddExpense,
    formState,
    setAmount,
    setCategory,
    setDate,
    setDescription,
  } = useDashboardData();

  const currentMonthLabel = new Date().toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const monthlySpendingSubtitle =
    summary.percentageComparisonToLastMonth !== 0
      ? `${summary.percentageComparisonToLastMonth > 0 ? "+" : ""}${summary.percentageComparisonToLastMonth}% vs last month`
      : undefined;
  const monthlySpendingSubtitleClassName =
    summary.percentageComparisonToLastMonth !== 0
      ? summary.percentageComparisonToLastMonth < 0
        ? "text-emerald-400"
        : "text-amber-400"
      : undefined;

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AmbientBackground />

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <DashboardHeader currentMonthLabel={currentMonthLabel} />

        <section className="mb-8">
          <GlassCard className="p-8 sm:p-10" glow>
            <BalanceHero
              totalBalance={totalBalance}
              totalIncome={totalIncome}
              totalExpenses={totalExpenses}
            />
          </GlassCard>
        </section>

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <MetricCard
            label="Income"
            value={monthlyIncome.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            subtitle="This month"
          />
          <MetricCard
            label="Monthly spending"
            value={monthlySpending.toFixed(2)}
            subtitle={monthlySpendingSubtitle}
            subtitleClassName={monthlySpendingSubtitleClassName}
            progressPercent={spendingPercent}
          />
          <MetricCard
            label="Total expenses"
            value={totalExpenses.toFixed(2)}
            subtitle="All time"
          />
        </div>

        <div className="mb-8 grid gap-6 lg:grid-cols-3">
          <SpendingChart chartData={chartData} />
          <AddExpenseForm
            amount={formState.amount}
            category={formState.category}
            date={formState.date}
            description={formState.description}
            onAmountChange={setAmount}
            onCategoryChange={setCategory}
            onDateChange={setDate}
            onDescriptionChange={setDescription}
            onSubmit={handleAddExpense}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <RecentTransactions transactions={recentTransactions} />
          <InsightCard advice={primaryAdvice} />
        </div>
      </div>
    </div>
  );
}
