import { useMutation, useQuery } from '@tanstack/react-query';
import * as actions from '@/api/expenses';
import { ExpenseInput } from '@/schemas/expenses';

export function useExpenses(
  options?: Partial<{
    id: string;
    enabled: boolean;
    queries: Partial<{
      date: string;
      limit: string;
      q: string;
    }>;
  }>,
) {
  const expensesQuery = useQuery({
    queryKey: ['expenses'],
    queryFn: () => actions.fetchMany(options?.queries),
    enabled: options?.enabled ?? true,
  });

  const expenseQuery = useQuery({
    queryKey: ['expense', options?.id],
    queryFn: () => actions.fetchOne(options?.id!, { q: options?.queries?.q }),
    enabled: (!!options?.id && (options.enabled ?? true)) ?? false,
  });

  const saveMutation = useMutation({
    mutationFn: (data: ExpenseInput) => actions.post(data),
  });

  return {
    expensesQuery,
    expenseQuery,
    saveMutation,
  };
}

export function useTotalExpenses(
  type: 'daily' | 'monthly',
  options?: Partial<{
    date: string;
    month: string;
    year: string;
    enabled: boolean;
  }>,
) {
  const dailyTotalQuery = useQuery({
    queryKey: ['expenses', 'total', { type: 'daily' }],
    queryFn: () => actions.getDailyTotal(options?.date),
    enabled: type === 'daily' && (options?.enabled ?? true),
  });

  const monthlyTotalQuery = useQuery({
    queryKey: ['expenses', 'total', { type: 'monthly' }],
    queryFn: () =>
      actions.getMonthlyTotal({ month: options?.month, year: options?.year }),
    enabled: type === 'monthly' && (options?.enabled ?? true),
  });

  return {
    dailyTotalQuery,
    monthlyTotalQuery,
  };
}
