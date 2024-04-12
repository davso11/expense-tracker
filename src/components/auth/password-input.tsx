import { forwardRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Props = React.ComponentPropsWithoutRef<'input'> & {
  containerProps?: React.ComponentProps<'div'>;
};

export const PasswordInput = forwardRef<HTMLInputElement, Props>(
  ({ containerProps, className, ...props }, ref) => {
    const [visible, setVisible] = useState(false);

    return (
      <div
        {...containerProps}
        className={cn(
          'flex h-10 w-full items-center rounded-md border border-input pl-3 pr-1 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
          containerProps?.className,
        )}
      >
        <input
          ref={ref}
          type={visible ? 'text' : 'password'}
          className={cn(
            'w-full border-none bg-background pr-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none',
            className,
          )}
          {...props}
        />
        <Button
          size="icon"
          type="button"
          variant="ghost"
          className="focus-visible:bg-accent focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent"
          onClick={() => setVisible((prev) => !prev)}
        >
          {visible ? (
            <EyeOff
              size={16}
              className="text-zinc-500"
            />
          ) : (
            <Eye
              size={16}
              className="text-zinc-500"
            />
          )}
        </Button>
      </div>
    );
  },
);
