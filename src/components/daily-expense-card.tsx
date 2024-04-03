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
        <div className="mr-4 inline-flex items-center">
          <div className="center-flex size-10 rounded-full bg-slate-100">
            <span className="text-2xl">{expense.category!.emoji}</span>
          </div>
          <span className="ml-2 line-clamp-1">
            <span className="capitalize">{expense.category!.name}</span>
            {!!expense.description && (
              <span className="text-muted-foreground">
                {' '}
                - {expense.description}
              </span>
            )}
          </span>
        </div>

        {/* EXPENSE */}
        <span className="ml-auto shrink-0">
          {formatCurrency(expense.amount, { symbol: true })}
        </span>
      </div>
    </div>
  );
}
