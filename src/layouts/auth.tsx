import { Navigate, Outlet } from 'react-router-dom';
import { getAccessToken } from '@/lib/auth';

export function AuthLayout() {
  const token = getAccessToken();

  if (!!token) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  return <Outlet />;
}
