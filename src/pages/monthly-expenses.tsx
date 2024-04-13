import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { DailyExpenseCard } from '@/components/daily-expense-card';
import { DailyExpenseCardLoader } from '@/components/loaders/daily-expense-card-loader';
import { Separator } from '@/components/ui/separator';
import { useMonthlyExpenses } from '@/hooks/expenses';
import { cn } from '@/lib/utils';

export function MonthlyExpensesPage() {
  const { data: expenses, status } = useMonthlyExpenses({
    queries: {
      q: 'category',
    },
  });

  return (
    <section className="container">
      <h2 className="subtitle mb-8">
        Vos dépenses de ce mois
        {expenses && expenses.length > 0 ? ` (${expenses.length})` : ''}
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
          <div className="flex flex-col">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx}>
                <DailyExpenseCardLoader />
                <Separator
                  className={cn('my-1 bg-slate-100', idx === 2 && 'hidden')}
                />
              </div>
            ))}
          </div>
        )}

        {/* SUCCESS */}
        {status === 'success' &&
          (expenses!.length > 0 ? (
            <div className="flex flex-col">
              {expenses!.map((expense, idx) => (
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
          ) : (
            <p className="pt-3">Aucune dépense enregistrée ce mois.</p>
          ))}
      </div>
    </section>
  );
}
