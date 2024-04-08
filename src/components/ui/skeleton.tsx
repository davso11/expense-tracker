import { cn } from '@/lib/utils';

function Skeleton({
  className,
  pill = true,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  pill?: boolean;
}) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-muted',
        pill && 'rounded-full',
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
