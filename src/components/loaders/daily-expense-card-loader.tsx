import { cn } from '@/lib/utils';
import { Skeleton } from '../ui/skeleton';

export function DailyExpenseCardLoader({
  className,
}: React.ComponentProps<'div'>) {
  return (
    <div className={cn('py-3 pl-1.5 pr-2.5', className)}>
      <div className="flex items-center">
        {/* CATEGORY GROUP */}
        <div className="inline-flex items-center">
          <Skeleton className="size-10 rounded-full" />
          <Skeleton className="ml-2 h-6 w-[7.5rem] rounded-full" />
        </div>

        {/* AMOUNT */}
        <Skeleton className="ml-auto h-6 w-20 rounded-full" />
      </div>
    </div>
  );
}
