"use client";

type BalanceHeroProps = {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
};

export const BalanceHero = ({
  totalBalance,
  totalIncome,
  totalExpenses,
}: BalanceHeroProps) => {
  const isOverBudget = totalBalance < 0;

  return (
    <section className="mb-8" aria-label="Available balance">
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
          $
          {Math.abs(totalBalance).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
        {isOverBudget && (
          <span className="text-base font-medium text-red-400/90 sm:text-lg">
            over budget
          </span>
        )}
      </p>
      <p className="mt-3 text-sm text-slate-500">
        Income ${totalIncome.toLocaleString("en-US", { minimumFractionDigits: 2 })} −
        expenses ${totalExpenses.toFixed(2)}
      </p>
    </section>
  );
};
