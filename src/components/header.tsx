import {
  MoreVertical,
  Plus,
  LucideIcon,
  PackagePlus,
  TicketPlus,
} from 'lucide-react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
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
import { useAuthActions } from '@/hooks/auth';
import { setAccessToken } from '@/lib/auth';
import { useAuth } from '@/contexts/auth';
import { cn } from '@/lib/utils';

const NAV_ITEMS: ReadonlyArray<{
  Icon: LucideIcon;
  tooltip: string;
  href: string;
}> = [] as const;

export function Header({
  className,
  ...props
}: React.ComponentProps<'header'>) {
  const { open, setOpen } = useNewCategoryDialog();
  const { signOutMutation } = useAuthActions();
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await signOutMutation.mutateAsync();
      setUser(null);
      setAccessToken(null);
      toast.success('Vous êtes déconnecté(e).');
      navigate('/login', { replace: true });
    } catch (e) {
      console.error(e);
      toast.error('Erreur survenue.');
    }
  };

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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                pill
                size="icon"
                variant="secondary"
              >
                <MoreVertical size={18} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem disabled>Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={logout}>Déconnexion</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
