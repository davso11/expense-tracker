import { Skeleton } from '../ui/skeleton';

export function CategoryCardLoader() {
  return (
    <div>
      <Skeleton className="size-16" />
      <Skeleton className="mt-1 h-4 w-16" />
    </div>
  );
}
