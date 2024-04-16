import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { Smile } from 'lucide-react';
import { useState } from 'react';
import { HTTPError } from 'ky';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ExpenseCategoryInput } from '@/schemas/expenses';
import { useExpenseCategories } from '@/hooks/expense-categories';
import { Alert, AlertDescription } from '../ui/alert';
import { cn } from '@/lib/utils';

type Props = React.ComponentProps<'form'> & {
  setOpenCatDialog?: React.Dispatch<React.SetStateAction<boolean>>;
};

export function NewCategorieForm({
  className,
  setOpenCatDialog,
  ...props
}: Props) {
  const qc = useQueryClient();
  const [error, setError] = useState<string>();
  const [openEmojis, setOpenEmojis] = useState(false);
  const { saveMutation } = useExpenseCategories({ enabled: false });

  const form = useForm<ExpenseCategoryInput>({
    resolver: zodResolver(ExpenseCategoryInput),
    defaultValues: {
      name: '',
      emoji: '',
    },
  });

  const submitHandler = (values: ExpenseCategoryInput) => {
    setError(undefined);

    saveMutation.mutate(values, {
      onError(error) {
        if (error instanceof HTTPError) {
          console.log('HTTPError');
          setError('Erreur inattendue. Veuillez réessayer plus tard.');
          return;
        }

        if (error instanceof TypeError) {
          console.log('TypeError');
          setError('Erreur inattendue. Veuillez réessayer plus tard.');
          return;
        }

        setError(error.message);
      },
      onSuccess() {
        form.reset();
        toast.success('Catégorie enregistrée.');
        qc.invalidateQueries({
          queryKey: ['expense-categories'],
        });
        setOpenCatDialog?.(false);
      },
    });
  };

  return (
    <Form {...form}>
      <form
        className={cn(className)}
        onSubmit={form.handleSubmit(submitHandler)}
        {...props}
      >
        <div className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nom de la catégorie"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="emoji"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Emoji</FormLabel>
                {/* MOBILE */}
                <div className="w-full sm:hidden">
                  <FormControl>
                    <Input
                      max={1}
                      placeholder="Choisissez un emoji"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="mt-2">
                    Choisissez-en un seul.
                  </FormDescription>
                </div>

                {/* TABLET & DESKTOP */}
                <div className="hidden w-full sm:block">
                  <Popover
                    open={openEmojis}
                    onOpenChange={setOpenEmojis}
                  >
                    <PopoverTrigger
                      className="w-full"
                      asChild
                    >
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            'pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value ? (
                            field.value
                          ) : (
                            <span>Choisissez un emoji</span>
                          )}
                          <Smile className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-full p-0"
                      align="start"
                    >
                      <Picker
                        data={data}
                        locale="fr"
                        set="native"
                        previewEmoji="tada" // 🎉
                        onEmojiSelect={(emoji: {
                          [key: string]: any;
                          native: string;
                        }) => {
                          field.onChange(emoji.native);
                          setOpenEmojis(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          className="mt-6 w-full"
          disabled={saveMutation.isPending || !form.formState.isValid}
          pending={saveMutation.isPending}
        >
          Enregister
        </Button>
      </form>
    </Form>
  );
}
