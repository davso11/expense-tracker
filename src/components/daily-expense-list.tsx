import { Expense } from '@/types';
import { useExpenses } from '@/hooks/expenses';
import { DailyExpenseCard } from './daily-expense-card';
import { DailyExpenseCardLoader } from './loaders/daily-expense-card-loader';

export function DailyExpenseList() {
  const { expensesQuery } = useExpenses({
    queries: {
      date: 'today',
      q: 'category',
      limit: '20',
    },
  });

  const expenses = expensesQuery.data as Expense[] | undefined;

  // console.log(expenses);

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

        {/* PENDING */}
        {expensesQuery.status === 'pending' && (
          <div className="flex flex-col divide-y divide-gray-100">
            {[1, 2, 3].map((key) => (
              <DailyExpenseCardLoader key={key} />
            ))}
          </div>
        )}

        {/* SUCCESS */}
        {expensesQuery.status === 'success' &&
          (expenses!.length > 0 ? (
            <div className="flex flex-col divide-y divide-gray-100">
              {expenses!.map((expense) => (
                <DailyExpenseCard
                  key={expense.id}
                  expense={expense}
                />
              ))}
            </div>
          ) : (
            <span>Rien à signaler</span>
          ))}
      </div>
    </section>
  );
}
