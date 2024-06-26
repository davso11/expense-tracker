import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import { APP_NAME } from '@/constants';

export function AuthLayout() {
  const { user } = useAuth();

  if (user) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  return (
    <div className="center-flex h-screen">
      {/* TODO: ... */}
      <div className="hidden h-full flex-1 bg-gradient-to-r from-slate-50 to-slate-200 dark:from-slate-700 dark:to-slate-800 lg:block">
        <div className="center-flex size-full">
          <h1 className="text-5xl font-bold">{APP_NAME}</h1>
        </div>
      </div>

      <div className="center-flex h-full flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
}
