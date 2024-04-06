export type APIResponse<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

export type User = {
  id: string;
  email: string;
  password: string;
  firstName: string | null;
  lastName: string | null;
  createdAt?: string;
  updatedAt?: string;
  expenses?: Array<Expense>;
};

export type ExpenseCategory = {
  id: string;
  name: string;
  emoji: string | null;
  createdAt?: string;
  updatedAt?: string;
  expenses?: Array<Expense>;
};

export type Expense = {
  id: string;
  amount: string;
  date: string;
  time: string;
  description: string | null;
  updatedAt?: string;
  categoryId?: string;
  category?: ExpenseCategory;
  userId?: string;
};
