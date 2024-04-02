import { cn } from '@/lib/utils';

export function DailyExpenseCardLoader({
  className,
}: React.ComponentProps<'div'>) {
  return (
    <div className={cn('py-3', className)}>
      {/* CIRCLE */}
      <div className="flex items-center">
        <div className="inline-flex items-center">
          <div className="size-10 rounded-full bg-slate-100" />
          <div className="ml-2 h-6 w-16 rounded-full bg-slate-100" />
        </div>

        {/* AMOUNT */}
        <div className="ml-auto h-6 w-20 rounded-full bg-slate-100" />
      </div>
    </div>
  );
}
