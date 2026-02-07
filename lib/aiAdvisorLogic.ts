import type { Transaction } from "@/types";

const getCurrentMonthYear = () => {
  const now = new Date();
  return { month: now.getMonth(), year: now.getFullYear() };
};

const filterByCurrentMonth = (dateStr: string) => {
  const { month, year } = getCurrentMonthYear();
  const d = new Date(dateStr);
  return d.getMonth() === month && d.getFullYear() === year;
};

/** Threshold: Food > 40% of total spending triggers dining advice. */
const FOOD_HIGH_PERCENT = 40;
/** Threshold: Transport considered "high" when > 25% of spending. */
const TRANSPORT_HIGH_PERCENT = 25;

/**
 * Analyzes expenses and returns a single piece of contextual advice (mock AI).
 * Uses current-month expenses only.
 */
export function getAIAdviceFromExpenses(expenses: Transaction[]): string {
  const currentMonthExpenses = expenses.filter(
    (t) => t.type === "expense" && filterByCurrentMonth(t.date)
  );
  const total = currentMonthExpenses.reduce((sum, t) => sum + t.amount, 0);

  if (total <= 0) {
    return "Add some expenses this month to get personalized advice.";
  }

  const byCategory: Record<string, number> = {};
  currentMonthExpenses.forEach((t) => {
    byCategory[t.category] = (byCategory[t.category] ?? 0) + t.amount;
  });

  const foodTotal = byCategory["Food"] ?? 0;
  const transportTotal = byCategory["Transport"] ?? 0;
  const foodPercent = (foodTotal / total) * 100;
  const transportPercent = (transportTotal / total) * 100;

  if (foodPercent > FOOD_HIGH_PERCENT) {
    return "Your dining expenses are high this month. Consider meal prepping.";
  }
  if (transportPercent >= TRANSPORT_HIGH_PERCENT) {
    return "Transport costs are peaking. Have you looked into monthly passes?";
  }
  return "Great job keeping expenses balanced! You're on track to save 20%.";
}
