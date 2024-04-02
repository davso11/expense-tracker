import { Link, NavLink } from 'react-router-dom';
import { MoreVertical, PieChart, Plus, LucideIcon } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

const NAV_ITEMS: ReadonlyArray<{
  Icon: LucideIcon;
  tooltip: string;
  href: string;
}> = [
  {
    Icon: Plus,
    href: '/expenses/new',
    tooltip: 'Ajouter une dépense',
  },
  {
    Icon: PieChart,
    href: '/stats',
    tooltip: 'Voir les statistiques',
  },
] as const;

export function Header({
  className,
  ...props
}: React.ComponentProps<'header'>) {
  return (
    <header
      className={cn('pb-4 pt-4 sm:pt-8', className)}
      {...props}
    >
      <div className="container flex items-center">
        {/* TITLE */}
        <Link to="/">
          <h1 className="title">Xtrac.</h1>
        </Link>

        {/* NAV LINKS */}
        <div className="ml-auto space-x-2">
          {NAV_ITEMS.map(({ href, Icon, tooltip }, idx) => (
            <Button
              pill
              key={idx}
              size="icon"
              variant="secondary"
              tooltip={tooltip}
              asChild
            >
              <NavLink
                to={href}
                className={({ isActive }) => {
                  if (isActive) return 'bg-slate-300 hover:bg-slate-300';
                  return '';
                }}
              >
                <Icon size={18} />
              </NavLink>
            </Button>
          ))}

          <Button
            pill
            size="icon"
            variant="secondary"
            tooltip="Plus"
            disabled
          >
            <MoreVertical size={18} />
          </Button>
        </div>
      </div>
    </header>
  );
}
