import { AuthedUser } from '@/types/auth';
import { createContext, useContext, useState } from 'react';

type TAuthCtx = {
  user: AuthedUser | null;
  setUser: React.Dispatch<React.SetStateAction<AuthedUser | null>>;
};

const ctx = createContext<TAuthCtx>({} as TAuthCtx);

const useAuth = () => {
  if (!ctx) throw new Error('AuthProvider not found');
  return useContext(ctx);
};

const AuthProvider = (
  props: Readonly<{
    children: React.ReactNode;
  }>,
) => {
  const [user, setUser] = useState<AuthedUser | null>(null);

  return (
    <ctx.Provider
      value={{ user, setUser }}
      {...props}
    />
  );
};

export { AuthProvider, useAuth };
