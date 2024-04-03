import { useQuery, useMutation } from '@tanstack/react-query';
import { ExpenseCategoryInput } from '@/schemas/expenses';
import * as actions from '@/api/expense-categories';

export function useExpenseCategories(
  options?: Partial<{
    id: string;
    enabled: boolean;
    queries: Partial<{
      q: string;
    }>;
  }>,
) {
  const categoriesQuery = useQuery({
    queryKey: ['expense-categories'],
    queryFn: () => actions.fetchMany(options?.queries),
    enabled: options?.enabled ?? true,
    staleTime: Infinity,
  });

  const categoryQuery = useQuery({
    queryKey: ['expense-categories', options?.id],
    queryFn: () => actions.fetchOne(options?.id!, { q: options?.queries?.q }),
    enabled: (!!options?.id && (options.enabled ?? true)) ?? false,
  });

  const saveMutation = useMutation({
    mutationKey: ['save-expense-category'],
    mutationFn: (data: ExpenseCategoryInput) => actions.post(data),
  });

  return {
    categoriesQuery,
    categoryQuery,
    saveMutation,
  };
}
