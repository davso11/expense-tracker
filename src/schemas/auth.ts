import { z } from 'zod';

export const RegisterInput = z.object({
  email: z
    .string()
    .min(1, {
      message: "L'email est requis",
    })
    .email({
      message: "L'email n'est pas valide",
    }),
  password: z.string().min(6, {
    message: 'Le mot de passe doit contenir au moins 6 caractères',
  }),
});

export const LoginInput = z.object({
  email: z
    .string()
    .min(1, {
      message: "L'email est requis",
    })
    .email({
      message: "L'email n'est pas valide",
    }),
  password: z.string().min(6, {
    message: 'Le mot de passe doit contenir au moins 6 caractères',
  }),
});

export type RegisterInput = z.infer<typeof RegisterInput>;
export type LoginInput = z.infer<typeof LoginInput>;
