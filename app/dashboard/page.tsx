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

ChartJS.register(ArcElement, Tooltip, Legend);

type Expense = {
  id: string;
  amount: number;
  category: string;
  date: string;
  description: string;
};

const CATEGORIES = [
  "Food",
  "Transport",
  "Utilities",
  "Entertainment",
  "Shopping",
  "Health",
  "Other",
];

const COLORS = [
  "#6366f1", // indigo
  "#22c55e", // green
  "#f59e0b", // amber
  "#ef4444", // red
  "#8b5cf6", // violet
  "#06b6d4", // cyan
  "#64748b", // slate
];

const DUMMY_EXPENSES: Expense[] = [
  {
    id: "1",
    amount: 85.5,
    category: "Food",
    date: "2025-02-01",
    description: "Weekly groceries",
  },
  {
    id: "2",
    amount: 45.0,
    category: "Transport",
    date: "2025-02-02",
    description: "Gas station",
  },
  {
    id: "3",
    amount: 120.0,
    category: "Utilities",
    date: "2025-02-03",
    description: "Electric bill",
  },
  {
    id: "4",
    amount: 29.99,
    category: "Entertainment",
    date: "2025-02-04",
    description: "Streaming subscription",
  },
  {
    id: "5",
    amount: 65.0,
    category: "Shopping",
    date: "2025-02-05",
    description: "Household items",
  },
  {
    id: "6",
    amount: 42.0,
    category: "Food",
    date: "2025-02-06",
    description: "Restaurant dinner",
  },
];

const DUMMY_MONTHLY_INCOME = 4200;

export default function PersonalFinanceDashboard() {
  const [expenses, setExpenses] = useState<Expense[]>(DUMMY_EXPENSES);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [date, setDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [description, setDescription] = useState("");

  const chartData = useMemo(() => {
    const byCategory: Record<string, number> = {};
    expenses.forEach((e) => {
      byCategory[e.category] = (byCategory[e.category] ?? 0) + e.amount;
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
          backgroundColor: chartData.map((_, i) => COLORS[i % COLORS.length]),
          borderColor: "transparent",
          borderWidth: 0,
        },
      ],
    }),
    [chartData]
  );

  const doughnutOptions: ChartOptions<"doughnut"> = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "bottom" },
        tooltip: {
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

  const totalExpenses = useMemo(
    () => expenses.reduce((sum, e) => sum + e.amount, 0),
    [expenses]
  );

  const monthlySpending = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    return expenses
      .filter((e) => {
        const d = new Date(e.date);
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
      })
      .reduce((sum, e) => sum + e.amount, 0);
  }, [expenses]);

  const totalBalance = DUMMY_MONTHLY_INCOME - totalExpenses;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!amount || !description.trim()) return;
    const newExpense: Expense = {
      id: crypto.randomUUID(),
      amount: parseFloat(amount),
      category,
      date,
      description: description.trim(),
    };
    setExpenses((prev) => [newExpense, ...prev]);
    setAmount("");
    setCategory(CATEGORIES[0]);
    setDate(new Date().toISOString().slice(0, 10));
    setDescription("");
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Personal Finance Dashboard
          </h1>
          <p className="mt-1 text-slate-600 dark:text-slate-400">
            Track expenses and view insights
          </p>
        </header>

        {/* Summary cards */}
        <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Total Balance
            </p>
            <p
              className={`mt-1 text-2xl font-semibold ${
                totalBalance >= 0
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              ${totalBalance.toFixed(2)}
            </p>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              Income − expenses
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Monthly Spending
            </p>
            <p className="mt-1 text-2xl font-semibold text-slate-900 dark:text-white">
              ${monthlySpending.toFixed(2)}
            </p>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              This month
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:col-span-2 lg:col-span-1">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Total Expenses
            </p>
            <p className="mt-1 text-2xl font-semibold text-slate-900 dark:text-white">
              ${totalExpenses.toFixed(2)}
            </p>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              All time
            </p>
          </div>
        </section>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Form + Chart */}
          <div className="lg:col-span-2 space-y-8">
            {/* Add expense form */}
            <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Add new expense
              </h2>
              <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="amount"
                      className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                    >
                      Amount ($)
                    </label>
                    <input
                      id="amount"
                      type="number"
                      step="0.01"
                      min="0"
                      required
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                    >
                      Category
                    </label>
                    <select
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="date"
                      className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                    >
                      Date
                    </label>
                    <input
                      id="date"
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                    >
                      Description
                    </label>
                    <input
                      id="description"
                      type="text"
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
                      placeholder="e.g. Coffee shop"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 font-medium text-white shadow-sm transition-colors hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 sm:w-auto sm:min-w-[140px]"
                >
                  Add expense
                </button>
              </form>
            </section>

            {/* Doughnut chart (Chart.js) */}
            <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Expenses by category
              </h2>
              <div className="mt-4 h-80">
                {chartData.length > 0 ? (
                  <Doughnut
                    data={doughnutChartData}
                    options={doughnutOptions}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center rounded-lg border border-dashed border-slate-300 dark:border-slate-600">
                    <p className="text-slate-500 dark:text-slate-400">
                      Add expenses to see the chart
                    </p>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar: AI Advisor + Recent list */}
          <div className="space-y-8">
            {/* AI Financial Advisor */}
            <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white">
                <span className="text-xl" aria-hidden>
                  💡
                </span>
                AI Financial Advisor
              </h2>
              <div className="mt-4 rounded-lg bg-amber-50 p-4 dark:bg-amber-950/30">
                <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  Your spending this month is within a healthy range. Consider
                  setting a budget of $1,200 for discretionary categories (Food,
                  Entertainment, Shopping) and automate savings by moving 20% of
                  income to a separate account on payday. Review subscriptions
                  monthly—small recurring charges add up quickly.
                </p>
              </div>
            </section>

            {/* Recent expenses list */}
            <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Recent expenses
              </h2>
              <ul className="mt-4 space-y-2 max-h-64 overflow-y-auto">
                {expenses.slice(0, 8).map((exp) => (
                  <li
                    key={exp.id}
                    className="flex items-center justify-between rounded-lg border border-slate-100 py-2 px-3 dark:border-slate-800"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-slate-900 dark:text-white">
                        {exp.description}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {exp.category} · {exp.date}
                      </p>
                    </div>
                    <span className="ml-2 shrink-0 font-medium text-slate-900 dark:text-white">
                      ${exp.amount.toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
