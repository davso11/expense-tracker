import { MonthlyExpensesHeader } from '@/components/monthly-expenses-header';
import { MonthlyExpensesList } from '@/components/monthly-expenses-list';
import { MonthlyExpensesProvider } from '@/contexts/monthly-expenses';

export function MonthlyExpensesPage() {
  return (
    <MonthlyExpensesProvider>
      <section className="container">
        <MonthlyExpensesHeader />
        <MonthlyExpensesList />
      </section>
    </MonthlyExpensesProvider>
  );
}
