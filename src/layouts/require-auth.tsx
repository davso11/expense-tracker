import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { getAccessToken } from '@/lib/auth';

export function RequireAuth() {
  const token = getAccessToken();
  const location = useLocation();

  if (!token) {
    return (
      <Navigate
        replace
        to="/login"
        state={{ from: location }}
      />
    );
  }

  return <Outlet />;
}
