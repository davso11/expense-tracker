import { z } from 'zod';

// TODO: regex MM-DD-YYYY ([1-12]-[1-31]-[0-∞])
// export const Date = z.string().regex();

export const ExpenseCategoryInput = z.object({
  name: z.string().min(1, { message: 'Le nom est requis' }),
  emoji: z
    .string()
    .regex(/^[\p{Emoji}]{1}$/u, { message: "L'emoji est requis" }), // Only one emoji
});

export const ExpenseInput = z.object({
  amount: z.coerce.number().min(1, { message: 'Le montant est requis' }),
  description: z.string().optional(),
  date: z.coerce.date(),
  categoryId: z.string().min(1, { message: 'La catégorie est requise' }),
});

export type ExpenseCategoryInput = z.infer<typeof ExpenseCategoryInput>;
export type ExpenseInput = z.infer<typeof ExpenseInput>;
