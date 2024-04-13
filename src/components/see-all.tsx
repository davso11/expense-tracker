import { Link } from 'react-router-dom';
import { MoveRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type Props = React.ComponentProps<typeof Link> & {
  button?: React.ComponentProps<typeof Badge>;
};

export function SeeAll({ className, ...props }: Props) {
  return (
    <Link
      className={cn('group', className)}
      {...props}
    >
      <Badge
        variant="secondary"
        {...props.button}
      >
        <span>Voir tout</span>
        <MoveRight
          size={14}
          className="ml-0 w-0 transition-all group-hover:ml-1 group-hover:w-3.5"
        />
      </Badge>
    </Link>
  );
}
