/**
 * Data layer types for Personal Finance.
 */

export type TransactionType = "income" | "expense";

export type TransactionCategory =
  | "Food"
  | "Transport"
  | "Utilities"
  | "Entertainment"
  | "Shopping"
  | "Health"
  | "Tech"
  | "Other";

export interface Transaction {
  id: string;
  amount: number;
  date: string;
  type: TransactionType;
  category: TransactionCategory;
  description: string;
}

export interface FinancialSummary {
  totalBalance: number;
  monthlySpending: number;
  /** Percentage change vs previous month (e.g. 5 = 5% up, -10 = 10% down). */
  percentageComparisonToLastMonth: number;
}

export type AIAdviceSeverity = "low" | "medium" | "high";

export interface AIAdvice {
  id: string;
  message: string;
  severity: AIAdviceSeverity;
}
