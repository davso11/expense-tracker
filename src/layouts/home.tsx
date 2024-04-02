import { Outlet } from 'react-router-dom';
import { Header } from '@/components/header';

export function HomeLayout() {
  return (
    <>
      <Header />
      <main className="space-y-10 py-8">
        <Outlet />
      </main>
    </>
  );
}
