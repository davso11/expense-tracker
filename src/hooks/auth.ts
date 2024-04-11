import { useMutation, useQuery } from '@tanstack/react-query';
import { LoginInput, RegisterInput } from '@/schemas/auth';
import * as actions from '@/api/auth';

export function useAuthActions() {
  const signUpMutation = useMutation({
    mutationFn: (data: RegisterInput) => actions.signUp(data),
  });

  const signInMutation = useMutation({
    mutationFn: (data: LoginInput) => actions.signIn(data),
  });

  const signOutMutation = useMutation({
    mutationFn: () => actions.signOut(),
  });

  return {
    signUpMutation,
    signInMutation,
    signOutMutation,
  };
}

export function useUserInfo(options?: Partial<{ enabled: boolean }>) {
  return useQuery({
    queryKey: ['user'],
    queryFn: actions.fetchUser,
    enabled: options?.enabled ?? true,
    staleTime: Infinity,
  });
}

export function useRefreshToken(options?: Partial<{ enabled: boolean }>) {
  return useQuery({
    queryKey: ['refresh-token'],
    queryFn: actions.refreshToken,
    enabled: options?.enabled ?? true,
    staleTime: Infinity,
  });
}
