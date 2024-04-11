import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Outlet } from 'react-router-dom';
import { useRefreshToken } from '@/hooks/auth';
import { setAccessToken } from '@/lib/auth';
import { useAuth } from '@/contexts/auth';

export function PersistAuth() {
  const { data, status } = useRefreshToken();
  const [done, setDone] = useState(false);
  const { setUser } = useAuth();

  useEffect(() => {
    if (status === 'error') {
      setUser(null);
      setAccessToken(null);
      setDone(true);
    } else if (status === 'success') {
      setAccessToken(data.accessToken);
      setDone(true);
    }
  }, [data, status]);

  if (status === 'pending' || !done) {
    return (
      <div className="center-flex h-screen w-full">
        <Loader2
          size={32}
          className="animate-spin-fast"
        />
      </div>
    );
  }

  return <Outlet />;
}
