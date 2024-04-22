import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { DailyExpenseCard } from '@/components/daily-expense-card';
import { DailyExpenseCardLoader } from '@/components/loaders/daily-expense-card-loader';
import { Separator } from '@/components/ui/separator';
import { useExpenses } from '@/hooks/expenses';
import { Expense } from '@/types';
import { cn } from '@/lib/utils';

export function DailyExpensesPage() {
  const { expensesQuery } = useExpenses({
    queries: {
      date: 'today',
      q: 'category',
    },
  });

  const expenses = expensesQuery.data as Expense[] | undefined;

  return (
    <section className="container">
      <h2 className="subtitle mb-8">
        Vos dépenses d'aujourd'hui
        {expenses && expenses.length > 0 ? ` (${expenses.length})` : ''}
      </h2>

      <div>
        {/* ERROR */}
        {expensesQuery.isError && (
          <div className="pt-3 text-red-500">
            <span>Erreur survenue.</span>
          </div>
        )}

        {/* LOADING */}
        {expensesQuery.isPending && (
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
        {expensesQuery.isSuccess &&
          (expenses!.length > 0 ? (
            <div className="flex flex-col">
              {expenses!.map((expense, idx) => (
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
          ) : (
            <p className="pt-3">Aucune dépense enregistrée aujourd'hui.</p>
          ))}
      </div>
    </section>
  );
}
