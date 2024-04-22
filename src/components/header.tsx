import {
  Home,
  Monitor,
  Moon,
  MoreVertical,
  Plus,
  PackagePlus,
  Sun,
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
import { Separator } from './ui/separator';
import { NewCategorieForm } from './forms/new-category';
import { useNewCategoryDialog } from '@/contexts/category-dialog';
import { useAuthActions } from '@/hooks/auth';
import { setAccessToken } from '@/lib/auth';
import { useTheme } from '@/contexts/theme';
import { useAuth } from '@/contexts/auth';
import { APP_NAME } from '@/constants';
import { cn } from '@/lib/utils';

export function Header({
  className,
  ...props
}: React.ComponentProps<'header'>) {
  const { open, setOpen } = useNewCategoryDialog();
  const { signOutMutation } = useAuthActions();
  const { setTheme } = useTheme();
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await toast.promise(signOutMutation.mutateAsync(), {
        loading: 'Déconnexion...',
        success() {
          setUser(null);
          setAccessToken(null);
          setTimeout(() => {
            navigate('/login', { replace: true });
          }, 1000);
          return 'Vous êtes déconnecté(e).';
        },
        error: 'Erreur survenue.',
      });
    } catch (e) {
      console.error(e);
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
          <h1 className="title">{APP_NAME}</h1>
        </Link>

        {/* NAV LINKS */}
        <div className="ml-auto flex items-center">
          <div className="space-x-3">
            <Button
              pill
              size="icon"
              variant="secondary"
              tooltip="Accueil"
              asChild
            >
              <NavLink to="/">
                <Home size={18} />
              </NavLink>
            </Button>

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
                <DropdownMenuItem onClick={() => navigate('/account/settings')}>
                  Réglages
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>
                  Déconnexion
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Separator className="mx-4 h-6 w-px" />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                pill
                variant="outline"
                size="icon"
              >
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Changer le thème</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme('light')}>
                <Sun className="mr-2 h-4 w-4" /> Clair
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>
                <Moon className="mr-2 h-4 w-4" /> Sombre
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>
                <Monitor className="mr-2 h-4 w-4" /> Système
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
