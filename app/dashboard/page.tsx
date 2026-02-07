"use client";

import { useState, useCallback } from "react";
import { useDashboardData } from "@/hooks/useDashboardData";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlassModal } from "@/components/ui/GlassModal";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleAddExpenseAndClose = useCallback(
    (data: Parameters<typeof handleAddExpense>[0]) => {
      handleAddExpense(data);
      setIsModalOpen(false);
    },
    [handleAddExpense]
  );

  const handleOpenModal = useCallback(() => setIsModalOpen(true), []);
  const handleCloseModal = useCallback(() => setIsModalOpen(false), []);

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

  const addExpenseButton = (
    <button
      type="button"
      onClick={handleOpenModal}
      className="inline-flex h-11 items-center justify-center rounded-xl bg-gradient-to-r from-violet-500 via-fuchsia-500/90 to-cyan-500 px-5 font-semibold text-white shadow-lg shadow-violet-500/20 transition-all hover:shadow-violet-500/30 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:ring-offset-[#030712]"
      aria-label="Add expense"
    >
      Add expense
    </button>
  );

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
              action={addExpenseButton}
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

        <section className="mb-8">
          <SpendingChart chartData={chartData} />
        </section>

        <section className="mb-8">
          <RecentTransactions transactions={recentTransactions} />
        </section>

        <section>
          <InsightCard advice={primaryAdvice} />
        </section>
      </div>

      <GlassModal
        open={isModalOpen}
        onClose={handleCloseModal}
        title="Add expense"
      >
        <AddExpenseForm
          amount={formState.amount}
          category={formState.category}
          date={formState.date}
          description={formState.description}
          onAmountChange={setAmount}
          onCategoryChange={setCategory}
          onDateChange={setDate}
          onDescriptionChange={setDescription}
          onSubmit={handleAddExpenseAndClose}
          wrapInCard={false}
        />
      </GlassModal>
    </div>
  );
}
