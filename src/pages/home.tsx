import { DailyExpenseList } from '@/components/daily-expense-list';
import { TotalMonthlyExpenseCard } from '@/components/total-monthly-expense-card';

export function HomePage() {
  return (
    <>
      <TotalMonthlyExpenseCard />
      <DailyExpenseList />
    </>
  );
}
