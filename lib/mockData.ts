import type { Transaction, FinancialSummary, AIAdvice } from "@/types";

export const TRANSACTION_CATEGORIES = [
  "Food",
  "Transport",
  "Utilities",
  "Entertainment",
  "Shopping",
  "Health",
  "Tech",
  "Other",
] as const;

export const mockTransactions: Transaction[] = [
  {
    id: "1",
    amount: 4200,
    date: "2025-02-01",
    type: "income",
    category: "Other",
    description: "Monthly salary",
  },
  {
    id: "2",
    amount: 85.5,
    date: "2025-02-01",
    type: "expense",
    category: "Food",
    description: "Weekly groceries",
  },
  {
    id: "3",
    amount: 45.0,
    date: "2025-02-02",
    type: "expense",
    category: "Transport",
    description: "Gas station",
  },
  {
    id: "4",
    amount: 120.0,
    date: "2025-02-03",
    type: "expense",
    category: "Utilities",
    description: "Electric bill",
  },
  {
    id: "5",
    amount: 29.99,
    date: "2025-02-04",
    type: "expense",
    category: "Entertainment",
    description: "Streaming subscription",
  },
  {
    id: "6",
    amount: 65.0,
    date: "2025-02-05",
    type: "expense",
    category: "Shopping",
    description: "Household items",
  },
  {
    id: "7",
    amount: 42.0,
    date: "2025-02-06",
    type: "expense",
    category: "Food",
    description: "Restaurant dinner",
  },
  {
    id: "8",
    amount: 99.0,
    date: "2025-02-05",
    type: "expense",
    category: "Tech",
    description: "Cloud storage annual",
  },
  {
    id: "9",
    amount: 35.0,
    date: "2025-02-04",
    type: "expense",
    category: "Health",
    description: "Pharmacy",
  },
  {
    id: "10",
    amount: 18.5,
    date: "2025-02-06",
    type: "expense",
    category: "Transport",
    description: "Public transit pass",
  },
];

export const mockFinancialSummary: FinancialSummary = {
  totalBalance: 3660.01,
  monthlySpending: 539.99,
  percentageComparisonToLastMonth: -12.5,
};

export const mockAIAdvice: AIAdvice[] = [
  {
    id: "advice-1",
    message:
      "Your spending this month is within a healthy range. Consider setting a budget of $1,200 for discretionary categories (Food, Entertainment, Shopping) and automate savings by moving 20% of income to a separate account on payday. Review subscriptions monthly—small recurring charges add up quickly.",
    severity: "low",
  },
];
