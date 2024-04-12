import { useMutation } from '@tanstack/react-query';
import { NewPassword, UserInfo } from '@/schemas/users';
import * as actions from '@/api/users';

export function useUserActions(
  _options?: Partial<{
    enabled: boolean;
  }>,
) {
  const updateInfoMutation = useMutation({
    mutationFn: (data: UserInfo) => actions.updateInfo(data),
  });

  const updatePasswordMutation = useMutation({
    mutationFn: (data: NewPassword) => actions.updatePassword(data),
  });

  return {
    updateInfoMutation,
    updatePasswordMutation,
  };
}
