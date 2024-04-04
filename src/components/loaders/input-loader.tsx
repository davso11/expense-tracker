import { Loader2, LucideProps } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = React.ComponentProps<'div'> & {
  loader?: LucideProps;
};

export function InputLoader({ className, loader, ...props }: Props) {
  return (
    <div
      className={cn('center-flex h-10 w-full rounded-md border bg-white')}
      {...props}
    >
      <Loader2
        size={18}
        {...loader}
        className={cn(
          'animate-spin-fast text-muted-foreground',
          loader?.className,
        )}
      />
    </div>
  );
}
