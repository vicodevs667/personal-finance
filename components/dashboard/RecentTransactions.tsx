"use client";

import type { Transaction } from "@/types";
import { GlassCard } from "@/components/ui/GlassCard";

type RecentTransactionsProps = {
  transactions: Transaction[];
};

/** Format YYYY-MM-DD for display. Uses date parts only to avoid server/client timezone hydration mismatch. */
const formatDate = (dateStr: string) => {
  const [y, m, d] = dateStr.split("-").map(Number);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[(m ?? 1) - 1]} ${d ?? 0}, ${y ?? 0}`;
};

export const RecentTransactions = ({ transactions }: RecentTransactionsProps) => {
  return (
    <GlassCard className="p-6 sm:p-8">
      <h2
        className="text-lg font-semibold text-white"
        style={{ fontFamily: "var(--font-syne)" }}
      >
        Recent transactions
      </h2>
      <ul className="mt-6 space-y-2" aria-label="Recent transactions list">
        {transactions.map((tx) => (
          <li
            key={tx.id}
            className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-3.5 transition-colors hover:bg-white/[0.06] hover:border-white/10"
          >
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-white">{tx.description}</p>
              <p className="text-xs text-slate-500">
                {tx.category} · {formatDate(tx.date)}
              </p>
            </div>
            <span
              className={`ml-4 shrink-0 font-semibold ${
                tx.type === "income" ? "text-emerald-400" : "text-white"
              }`}
            >
              {tx.type === "income" ? "+" : "−"}${tx.amount.toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
    </GlassCard>
  );
};
