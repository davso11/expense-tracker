import { useMonthlyExpensesCtx } from '@/contexts/monthly-expenses';
import { useAllExpenseCategories } from '@/hooks/expense-categories';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

export function MonthlyExpensesHeader({ count }: { count?: number }) {
  const { data: categories, status } = useAllExpenseCategories();
  const { query, updateQuery } = useMonthlyExpensesCtx();

  return (
    <div>
      <h2 className="subtitle mb-8">
        Vos dépenses de ce mois
        {!!count && ` (${count})`}
      </h2>

      {/* CATEGORIES SCROLL BOX */}
      {/* ERROR */}
      {status === 'error' && (
        <div className="text-red-500">
          <span>Erreur survenue.</span>
        </div>
      )}

      {/* LOADING */}
      {status === 'pending' && (
        <div className="flex space-x-4 overflow-x-auto">
          {Array.from({ length: 4 }).map((_, idx) => (
            <Skeleton
              key={idx}
              className="h-8 w-24"
            />
          ))}
        </div>
      )}

      {/* SUCCESS */}
      {status === 'success' && (
        <div className="scrollbar-hide flex w-full space-x-4 overflow-x-auto">
          <Badge
            size="lg"
            variant={
              !query ||
              query === 'all' ||
              !categories.some(
                (c) => c.name.toLowerCase() === query.toLowerCase(),
              )
                ? 'default'
                : 'outline'
            }
            className="shrink-0 cursor-pointer text-nowrap capitalize"
            onClick={() => updateQuery('all')}
          >
            Toutes
          </Badge>

          {categories.map(({ id, name, emoji }) => (
            <div
              key={id}
              className="flex flex-col items-center"
            >
              <Badge
                size="lg"
                variant={
                  query?.toLowerCase() === name.toLowerCase()
                    ? 'default'
                    : 'outline'
                }
                className="shrink-0 cursor-pointer text-nowrap capitalize"
                onClick={() => updateQuery(name)}
              >
                <span>{emoji}</span>
                <span className="hidden sm:ml-1.5 sm:inline">{name}</span>
              </Badge>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
