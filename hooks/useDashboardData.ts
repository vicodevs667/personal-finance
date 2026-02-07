"use client";

import { useState, useMemo, useCallback } from "react";
import type { Transaction, TransactionCategory, AIAdvice } from "@/types";
import {
  mockTransactions,
  mockFinancialSummary,
  mockAIAdvice,
  TRANSACTION_CATEGORIES,
} from "@/lib/mockData";
import { DEFAULT_MONTHLY_BUDGET } from "@/lib/constants";
import type { ChartDataItem } from "@/components/dashboard";

type UseDashboardDataReturn = {
  transactions: Transaction[];
  expenses: Transaction[];
  incomeTransactions: Transaction[];
  totalExpenses: number;
  totalIncome: number;
  totalBalance: number;
  monthlySpending: number;
  monthlyIncome: number;
  spendingPercent: number;
  chartData: ChartDataItem[];
  recentTransactions: Transaction[];
  primaryAdvice: AIAdvice | null;
  summary: typeof mockFinancialSummary;
  handleAddExpense: (data: Omit<Transaction, "id">) => void;
  formState: {
    amount: string;
    category: TransactionCategory;
    date: string;
    description: string;
  };
  setAmount: (value: string) => void;
  setCategory: (value: TransactionCategory) => void;
  setDate: (value: string) => void;
  setDescription: (value: string) => void;
};

const getCurrentMonthYear = () => {
  const now = new Date();
  return { month: now.getMonth(), year: now.getFullYear() };
};

const filterByCurrentMonth = (dateStr: string) => {
  const { month, year } = getCurrentMonthYear();
  const d = new Date(dateStr);
  return d.getMonth() === month && d.getFullYear() === year;
};

export const useDashboardData = (): UseDashboardDataReturn => {
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

  const monthlySpending = useMemo(
    () => expenses.filter((t) => filterByCurrentMonth(t.date)).reduce((sum, t) => sum + t.amount, 0),
    [expenses]
  );
  const monthlyIncome = useMemo(
    () =>
      incomeTransactions
        .filter((t) => filterByCurrentMonth(t.date))
        .reduce((sum, t) => sum + t.amount, 0),
    [incomeTransactions]
  );

  const spendingPercent = Math.min(
    100,
    (monthlySpending / DEFAULT_MONTHLY_BUDGET) * 100
  );

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

  const handleAddExpense = useCallback((data: Omit<Transaction, "id">) => {
    const newTransaction: Transaction = {
      ...data,
      id: crypto.randomUUID(),
    };
    setTransactions((prev) => [newTransaction, ...prev]);
    setAmount("");
    setCategory(TRANSACTION_CATEGORIES[0]);
    setDate(new Date().toISOString().slice(0, 10));
    setDescription("");
  }, []);

  const recentTransactions = useMemo(() => {
    return [...transactions]
      .sort((a, b) => {
        if (b.date !== a.date) return b.date > a.date ? 1 : -1;
        return a.id.localeCompare(b.id);
      })
      .slice(0, 8);
  }, [transactions]);
  const primaryAdvice = mockAIAdvice[0] ?? null;

  return {
    transactions,
    expenses,
    incomeTransactions,
    totalExpenses,
    totalIncome,
    totalBalance,
    monthlySpending,
    monthlyIncome,
    spendingPercent,
    chartData,
    recentTransactions,
    primaryAdvice,
    summary,
    handleAddExpense,
    formState: { amount, category, date, description },
    setAmount,
    setCategory,
    setDate,
    setDescription,
  };
};
