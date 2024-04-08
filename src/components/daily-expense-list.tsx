import { Link } from 'react-router-dom';
import { useExpenses } from '@/hooks/expenses';
import { DailyExpenseCard } from './daily-expense-card';
import { DailyExpenseCardLoader } from './loaders/daily-expense-card-loader';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { Expense } from '@/types';
import { cn } from '@/lib/utils';

export function DailyExpenseList() {
  const { expensesQuery } = useExpenses({
    queries: {
      date: 'today',
      q: 'category',
      limit: '20',
    },
  });

  const expenses = expensesQuery.data as Expense[] | undefined;

  return (
    <section className="container">
      <h2 className="subtitle mb-4">
        Dépenses du jours
        {expenses && expenses.length > 0 ? ` (${expenses.length})` : ''}
      </h2>

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
                  className={cn('my-1 bg-slate-100', idx === 2 && 'hidden')}
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
                    className="flex h-auto rounded-xl py-3 pl-1.5 pr-2.5 hover:bg-slate-50"
                    asChild
                  >
                    <Link to={`expenses/${expense.id}`}>
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
            <span>Rien à signaler</span>
          ))}
      </div>
    </section>
  );
}
