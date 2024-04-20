import { useMutation, useQuery } from '@tanstack/react-query';
import { ExpenseInput, UpdateExpenseInput } from '@/schemas/expenses';
import * as actions from '@/api/expenses';

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
    enabled: !options?.id && (options?.enabled ?? true),
    staleTime: Infinity,
  });

  const expenseQuery = useQuery({
    queryKey: ['expense', options?.id],
    queryFn: () => actions.fetchOne(options?.id!, { q: options?.queries?.q }),
    enabled: (!!options?.id && (options.enabled ?? true)) ?? false,
  });

  const saveMutation = useMutation({
    mutationFn: (data: ExpenseInput) => actions.post(data),
  });

  const updateMutation = useMutation({
    mutationFn: (data: UpdateExpenseInput) => {
      return actions.update(data);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => actions.remove(id),
  });

  return {
    expensesQuery,
    expenseQuery,
    saveMutation,
    updateMutation,
    deleteMutation,
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
    staleTime: Infinity,
  });

  const monthlyTotalQuery = useQuery({
    queryKey: ['expenses', 'total', { type: 'monthly' }],
    queryFn: () =>
      actions.getMonthlyTotal({ month: options?.month, year: options?.year }),
    enabled: type === 'monthly' && (options?.enabled ?? true),
    staleTime: Infinity,
  });

  return {
    dailyTotalQuery,
    monthlyTotalQuery,
  };
}

export function useMonthlyExpenses(
  options?: Partial<{
    enabled: boolean;
    queries?: Partial<{
      q: string;
    }>;
  }>,
) {
  return useQuery({
    queryKey: ['expenses', 'monthly'],
    queryFn: () =>
      actions.getMonthlyExpenses({
        q: `category${options?.queries?.q ? `:${options.queries.q}` : ''}`,
      }),
    enabled: options?.enabled ?? true,
    staleTime: Infinity,
  });
}
