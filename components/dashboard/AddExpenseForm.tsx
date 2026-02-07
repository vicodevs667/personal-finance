"use client";

import type { Transaction, TransactionCategory } from "@/types";
import { TRANSACTION_CATEGORIES } from "@/lib/mockData";
import { GlassCard } from "@/components/ui/GlassCard";

type AddExpenseFormProps = {
  amount: string;
  category: TransactionCategory;
  date: string;
  description: string;
  onAmountChange: (value: string) => void;
  onCategoryChange: (value: TransactionCategory) => void;
  onDateChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onSubmit: (transaction: Omit<Transaction, "id">) => void;
};

export const AddExpenseForm = ({
  amount,
  category,
  date,
  description,
  onAmountChange,
  onCategoryChange,
  onDateChange,
  onDescriptionChange,
  onSubmit,
}: AddExpenseFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !description.trim()) return;
    onSubmit({
      amount: parseFloat(amount),
      date,
      type: "expense",
      category,
      description: description.trim(),
    });
  };

  return (
    <GlassCard className="p-6 sm:p-8">
      <h2
        className="text-lg font-semibold text-white"
        style={{ fontFamily: "var(--font-syne)" }}
      >
        Add expense
      </h2>
      <form
        onSubmit={handleSubmit}
        className="mt-6 space-y-4"
        aria-label="Add new expense"
      >
        <div>
          <label
            htmlFor="amount"
            className="block text-xs font-medium uppercase tracking-wider text-slate-500"
          >
            Amount
          </label>
          <input
            id="amount"
            type="number"
            step="0.01"
            min="0"
            required
            value={amount}
            onChange={(e) => onAmountChange(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 backdrop-blur-sm transition-colors focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
            placeholder="0.00"
            aria-required
          />
        </div>
        <div>
          <label
            htmlFor="category"
            className="block text-xs font-medium uppercase tracking-wider text-slate-500"
          >
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => onCategoryChange(e.target.value as TransactionCategory)}
            className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white backdrop-blur-sm transition-colors focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 [&>option]:bg-slate-900 [&>option]:text-white"
            aria-label="Expense category"
          >
            {TRANSACTION_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="date"
            className="block text-xs font-medium uppercase tracking-wider text-slate-500"
          >
            Date
          </label>
          <input
            id="date"
            type="date"
            required
            value={date}
            onChange={(e) => onDateChange(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white backdrop-blur-sm transition-colors focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 [color-scheme:dark]"
            aria-required
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-xs font-medium uppercase tracking-wider text-slate-500"
          >
            Description
          </label>
          <input
            id="description"
            type="text"
            required
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 backdrop-blur-sm transition-colors focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
            placeholder="e.g. Coffee shop"
            aria-required
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-xl bg-gradient-to-r from-violet-500 via-fuchsia-500/90 to-cyan-500 px-4 py-3.5 font-semibold text-white shadow-lg shadow-violet-500/20 transition-all hover:shadow-violet-500/30 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:ring-offset-[#030712]"
          aria-label="Submit new expense"
        >
          Add expense
        </button>
      </form>
    </GlassCard>
  );
};
