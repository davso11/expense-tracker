import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';

export function RequireAuth() {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        replace
        to="/login"
        state={{ from: location }}
      />
    );
  }

  // TODO: Check if email is verified
  // if (!user.emailVerified) {
  //   return (
  //    <Navigate
  //      replace
  //      to="/confirm-email"
  //    />;
  //   )
  // }

  return <Outlet />;
}
