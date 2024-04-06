import { z } from 'zod';
import emojiRegex from 'emoji-regex';

// TODO: regex MM-DD-YYYY ([1-12]-[1-31]-[0-∞])
// export const Date = z.string().regex();

export const ExpenseCategoryInput = z.object({
  name: z.string().min(1, { message: 'Le nom est requis' }),
  emoji: z.string().regex(emojiRegex(), { message: "L'emoji est requis" }), // Only one emoji
});

export const ExpenseInput = z.object({
  amount: z.coerce
    .string()
    .min(1, { message: 'Le montant est requis' })
    .regex(/^(?!0+(\.0+)?$)[1-9]\d*(\.\d\d?)?$/, {
      message: 'Le montant est invalide',
    }),
  description: z.string().optional(),
  date: z.coerce.date(),
  time: z.coerce.date(),
  categoryId: z.string().min(1, { message: 'La catégorie est requise' }),
});

export const UpdateExpenseInput = ExpenseInput.omit({
  date: true,
  time: true,
}).merge(z.object({ id: z.string().optional() }));

export type ExpenseCategoryInput = z.infer<typeof ExpenseCategoryInput>;
export type ExpenseInput = z.infer<typeof ExpenseInput>;
export type UpdateExpenseInput = z.infer<typeof UpdateExpenseInput>;
