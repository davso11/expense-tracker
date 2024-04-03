import { useQuery } from '@tanstack/react-query';
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

  return {
    categoriesQuery,
    categoryQuery,
  };
}
