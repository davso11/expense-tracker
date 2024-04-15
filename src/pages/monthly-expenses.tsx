import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { DailyExpenseCard } from '@/components/daily-expense-card';
import { DailyExpenseCardLoader } from '@/components/loaders/daily-expense-card-loader';
import { Separator } from '@/components/ui/separator';
import { useMonthlyExpenses } from '@/hooks/expenses';
import { dayjs } from '@/lib/dayjs';
import { cn } from '@/lib/utils';

export function MonthlyExpensesPage() {
  const { data: result, status } = useMonthlyExpenses({
    queries: {
      q: 'category',
    },
  });

  return (
    <section className="container">
      <h2 className="subtitle mb-8">
        Vos dépenses de ce mois
        {!!result && ` (${result.count})`}
      </h2>

      <div>
        {/* ERROR */}
        {status === 'error' && (
          <div className="pt-3 text-red-500">
            <span>Erreur survenue.</span>
          </div>
        )}

        {/* LOADING */}
        {status === 'pending' && (
          <div className="flex flex-col space-y-9">
            {Array.from({ length: 2 }).map((_, idx) => (
              <div key={idx}>
                <Skeleton className="mb-3 h-5 w-24" />
                {Array.from({ length: 3 }).map((_, idx) => (
                  <div key={idx}>
                    <DailyExpenseCardLoader />
                    <Separator
                      className={cn('my-1 bg-slate-100', idx === 2 && 'hidden')}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* SUCCESS */}
        {status === 'success' &&
          (result.data.length > 0 ? (
            <div className="flex flex-col space-y-9">
              {result.data.map(({ date, expenses }) => (
                <div key={date}>
                  <h3 className="mb-3 inline-block text-sm font-semibold capitalize">
                    {dayjs(date).format('LL')}
                  </h3>
                  {expenses.map((expense, idx) => (
                    <div key={expense.id}>
                      <Button
                        variant="ghost"
                        className="flex h-auto rounded-xl py-3 pl-1.5 pr-2.5 hover:bg-slate-50"
                        asChild
                      >
                        <Link to={`/expenses/${expense.id}`}>
                          <DailyExpenseCard expense={expense} />
                        </Link>
                      </Button>

                      <Separator
                        className={cn(
                          'my-1 bg-slate-100',
                          idx === expenses!.length - 1 && 'hidden',
                        )}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <p className="pt-2">Aucune dépense enregistrée ce mois.</p>
          ))}
      </div>
    </section>
  );
}
