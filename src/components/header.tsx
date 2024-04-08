import {
  MoreVertical,
  PieChart,
  Plus,
  LucideIcon,
  PackagePlus,
  TicketPlus,
} from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { NewCategorieForm } from './forms/new-category';
import { useNewCategoryDialog } from '@/contexts/category-dialog';
import { cn } from '@/lib/utils';

const NAV_ITEMS: ReadonlyArray<{
  Icon: LucideIcon;
  tooltip: string;
  href: string;
}> = [
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
  const { open, setOpen } = useNewCategoryDialog();

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
          <Dialog
            open={open}
            onOpenChange={setOpen}
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  pill
                  size="icon"
                  variant="secondary"
                >
                  <Plus size={18} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-32">
                <DropdownMenuItem asChild>
                  <Link to="/expenses/new">
                    <TicketPlus
                      className="mr-1.5"
                      size={16}
                    />
                    <span>Dépense</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DialogTrigger asChild>
                  <DropdownMenuItem>
                    <PackagePlus
                      className="mr-1.5"
                      size={16}
                    />
                    <span>Catégorie</span>
                  </DropdownMenuItem>
                </DialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent className="w-[25.25rem]">
              <DialogHeader>
                <DialogTitle>Nouvelle catégorie</DialogTitle>
              </DialogHeader>

              {/* NEW EXPENSE FORM */}
              <NewCategorieForm
                id="new-category-form"
                setOpenCatDialog={setOpen}
              />
            </DialogContent>
          </Dialog>

          {NAV_ITEMS.map(({ href, Icon, tooltip }, idx) => (
            <Button
              pill
              key={idx}
              size="icon"
              variant="secondary"
              tooltip={tooltip}
              asChild
            >
              <NavLink to={href}>
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
