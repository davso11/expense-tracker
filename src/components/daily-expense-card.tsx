import { Expense } from '@/types';
import { cn, formatCurrency } from '@/lib/utils';

type Props = React.ComponentProps<'div'> & {
  expense: Expense;
};

export function DailyExpenseCard({ expense, className, ...props }: Props) {
  return (
    <div
      className={cn('py-3', className)}
      {...props}
    >
      <div className="flex items-center">
        {/* CATEGORY */}
        <div className="inline-flex items-center">
          <div className="center-flex size-10 rounded-full bg-slate-100">
            <span className="text-2xl">{expense.category?.emoji}</span>
          </div>
          <span className="ml-2 capitalize">{expense.category?.name}</span>
        </div>

        {/* EXPENSE */}
        <span className="ml-auto">
          {formatCurrency(expense.amount, { symbol: true })}
        </span>
      </div>
    </div>
  );
}
