import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Outlet } from 'react-router-dom';
import { useRefreshToken, useUserInfo } from '@/hooks/auth';
import { setAccessToken } from '@/lib/auth';
import { useAuth } from '@/contexts/auth';

export function PersistAuth() {
  const { data, status } = useRefreshToken();
  const { refetch: getUser } = useUserInfo({ enabled: false });
  const [done, setDone] = useState(false);
  const { setUser } = useAuth();

  useEffect(() => {
    if (status === 'error') {
      setUser(null);
      setAccessToken(null);
      setDone(true);
    } else if (status === 'success') {
      setAccessToken(data.accessToken);
      getUser().then(({ data, status }) => {
        if (status === 'success') setUser(data);
        setDone(true);
      });
    }
  }, [status, data, setUser]);

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
