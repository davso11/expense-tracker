import { useQuery, useMutation } from '@tanstack/react-query';
import * as schemas from '@/schemas/expenses';
import * as actions from '@/api/expense-categories';

export function useExpenseCategories(
  options?: Partial<{
    id: string;
    enabled: boolean;
    queries: Partial<{
      q: string;
      limit: string;
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
    mutationFn: (data: schemas.ExpenseCategoryInput) => actions.post(data),
  });

  const updateMutation = useMutation({
    mutationKey: ['update-expense-category'],
    mutationFn: (data: schemas.UpdateExpenseCategoryInput) =>
      actions.update(data),
  });

  const deleteMutation = useMutation({
    mutationKey: ['delete-expense-category'],
    mutationFn: (id: string) => actions.remove(id),
  });

  return {
    categoriesQuery,
    categoryQuery,
    saveMutation,
    updateMutation,
    deleteMutation,
  };
}

export function useAllExpenseCategories() {
  return useQuery({
    queryKey: ['expense-categories', 'all'],
    queryFn: () => actions.fetchMany(),
    staleTime: Infinity,
  });
}
