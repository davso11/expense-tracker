import { Link } from 'react-router-dom';
import { useExpenses } from '@/hooks/expenses';
import { DailyExpenseCard } from '@/components/daily-expense-card';
import { DailyExpenseCardLoader } from '@/components/loaders/daily-expense-card-loader';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { SeeAll } from '@/components/see-all';
import { Expense } from '@/types';
import { cn } from '@/lib/utils';

const EXPENSE_COUNT = 10;

export function DailyExpenseList() {
  const { expensesQuery } = useExpenses({
    queries: {
      date: 'today',
      q: 'category',
      limit: EXPENSE_COUNT.toString(),
    },
  });

  const expenses = expensesQuery.data as Expense[] | undefined;

  return (
    <section className="container">
      <div className="mb-4 flex items-center">
        <h2 className="subtitle">Dépenses récentes</h2>

        <SeeAll
          to="/daily-expenses"
          className="ml-auto"
        />
      </div>

      <div>
        {/* ERROR */}
        {expensesQuery.status === 'error' && (
          <div className="pt-3 text-red-500">
            <span>Erreur survenue</span>
          </div>
        )}

        {/* LOADING */}
        {expensesQuery.status === 'pending' && (
          <div className="flex flex-col">
            {[1, 2, 3].map((key, idx) => (
              <div key={key}>
                <DailyExpenseCardLoader />
                <Separator
                  className={cn('my-1 bg-accent', idx === 2 && 'hidden')}
                />
              </div>
            ))}
          </div>
        )}

        {/* SUCCESS */}
        {expensesQuery.status === 'success' &&
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
