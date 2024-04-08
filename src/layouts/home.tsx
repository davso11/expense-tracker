import { Outlet } from 'react-router-dom';
import { Header } from '@/components/header';
import { NewCategoryDialogProvider } from '@/contexts/category-dialog';

export function HomeLayout() {
  return (
    <NewCategoryDialogProvider>
      <Header />
      <main className="space-y-10 py-8">
        <Outlet />
      </main>
    </NewCategoryDialogProvider>
  );
}
