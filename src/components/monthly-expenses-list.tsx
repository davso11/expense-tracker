import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { DailyExpenseCard } from '@/components/daily-expense-card';
import { DailyExpenseCardLoader } from '@/components/loaders/daily-expense-card-loader';
import { useMonthlyExpensesCtx } from '@/contexts/monthly-expenses';
import { useMonthlyExpenses } from '@/hooks/expenses';
import { cn, formatCurrency } from '@/lib/utils';
import { dayjs } from '@/lib/dayjs';
import { Badge } from './ui/badge';

export function MonthlyExpensesList() {
  const { query } = useMonthlyExpensesCtx();
  const { data: result, status } = useMonthlyExpenses();

  const filteredResult = useMemo(() => {
    if (status !== 'success') return undefined;
    if (!query || query === 'all') return result;
    return {
      count: result.count,
      data: result.data
        .filter(({ expenses }) => {
          return expenses.some(
            (e) =>
              e.category?.name.toLowerCase() ===
              decodeURIComponent(query).toLowerCase(),
          );
        })
        .map(({ date, expenses }) => ({
          date,
          expenses: expenses.filter(
            (e) =>
              e.category?.name.toLowerCase() ===
              decodeURIComponent(query).toLowerCase(),
          ),
        })),
    };
  }, [query, result, status]);

  const totalAmount = useMemo(() => {
    if (status !== 'success' || !filteredResult) return 0;
    return filteredResult.data.reduce((acc, { expenses }) => {
      return (
        acc + expenses.reduce((acc, { amount }) => acc + parseFloat(amount), 0)
      );
    }, 0);
  }, [filteredResult]);

  return (
    <div className="mt-10">
      {/* ERROR */}
      {status === 'error' && (
        <div className="pt-3 text-red-500">
          <span>Erreur survenue.</span>
        </div>
      )}

      {/* LOADING */}
      {status === 'pending' && (
        <>
          <div className="mb-8 flex items-center justify-between">
            <Skeleton className="h-[42px] w-60 bg-emerald-50 dark:bg-emerald-950/80" />
          </div>

          <div className="flex flex-col space-y-9">
            {Array.from({ length: 2 }).map((_, idx) => (
              <div key={idx}>
                <Skeleton className="mb-3 h-5 w-56" />
                {Array.from({ length: 3 }).map((_, idx) => (
                  <div key={idx}>
                    <DailyExpenseCardLoader />
                    <Separator
                      className={cn('my-1 bg-accent', idx === 2 && 'hidden')}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </>
      )}

      {/* SUCCESS */}
      {status === 'success' &&
        (filteredResult!.data.length > 0 ? (
          <>
            <div className="mb-8 flex items-center justify-between">
              <Badge
                size="lg"
                variant="success"
                className="cursor-default text-lg font-semibold"
              >
                Total:{' '}
                {formatCurrency(totalAmount.toString(), { symbol: true })}
              </Badge>
            </div>

            <div className="flex flex-col space-y-9">
              {filteredResult!.data.map(({ date, expenses }) => (
                <div key={date}>
                  <h3 className="mb-3 inline-block text-sm font-semibold capitalize">
                    {dayjs(date).format('LL')}
                  </h3>
                  {expenses.map((expense, idx) => (
                    <div key={expense.id}>
                      <Button
                        variant="ghost"
                        className="flex h-auto rounded-xl py-3 pl-1.5 pr-2.5 hover:bg-secondary/50"
                        asChild
                      >
                        <Link to={`/expenses/${expense.id}`}>
                          <DailyExpenseCard expense={expense} />
                        </Link>
                      </Button>

                      <Separator
                        className={cn(
                          'my-1 bg-accent',
                          idx === expenses!.length - 1 && 'hidden',
                        )}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </>
        ) : (
          <p>Aucune dépense enregistrée ce mois.</p>
        ))}
    </div>
  );
}
