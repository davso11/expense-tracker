import { z } from 'zod';

export const UserInfo = z.object({
  firstName: z.string().min(1, { message: 'Le nom est requis' }),
  lastName: z.string().min(1, { message: 'Le prénom est requis' }),
});

export const NewPassword = z.object({
  currentPassword: z
    .string()
    .min(1, { message: 'Le mot de passe actuel est requis' }),
  newPassword: z.string().min(6, {
    message: 'Le nouveau mot de passe doit contenir au moins 6 caractères',
  }),
});

export type UserInfo = z.infer<typeof UserInfo>;
export type NewPassword = z.infer<typeof NewPassword>;
