import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { AlertTriangle, Smile, Trash2 } from 'lucide-react';
import { useRef, useState } from 'react';
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
import { Alert, AlertDescription } from '@/components/ui/alert';
import { UpdateExpenseCategoryInput } from '@/schemas/expenses';
import { useExpenseCategories } from '@/hooks/expense-categories';
import { ExpenseCategory } from '@/types';
import { cn } from '@/lib/utils';

export function UpdateCategoryForm({
  category,
  setOpenDialog,
  ...props
}: React.ComponentProps<'form'> & {
  category: ExpenseCategory;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [error, setError] = useState<string>();
  const [delReady, setDelReady] = useState(false);
  const [openEmojis, setOpenEmojis] = useState(false);
  const delConfirmCount = useRef(0);
  const qc = useQueryClient();

  const { deleteMutation, updateMutation } = useExpenseCategories({
    enabled: false,
  });

  const form = useForm<UpdateExpenseCategoryInput>({
    resolver: zodResolver(UpdateExpenseCategoryInput),
    defaultValues: {
      name: category.name,
      emoji: category.emoji || '',
    },
  });

  const submitHandler = (values: UpdateExpenseCategoryInput) => {
    setError(undefined);

    updateMutation.mutate(
      {
        ...values,
        id: category.id,
      },
      {
        onError(e) {
          // FIXME: Handle error
          if (e instanceof HTTPError) {
            setError(e.message);
            return;
          }

          setError("Une erreur s'est produite. Veuillez réessayer.");
        },
        onSuccess() {
          toast.success('Catégorie mise à jour.');
          qc.invalidateQueries({ queryKey: ['expenses'] });
          qc.invalidateQueries({ queryKey: ['expense-categories'] });
          setOpenDialog(false);
        },
      },
    );
  };

  const deleteHandler = () => {
    setError(undefined);
    deleteMutation.mutate(category.id, {
      onError(e) {
        // FIXME: Handle error
        if (e instanceof HTTPError) {
          setError(e.message);
          return;
        }

        setError("Une erreur s'est produite. Veuillez réessayer.");
      },
      onSuccess() {
        toast.success('Catégorie supprimée.');
        qc.invalidateQueries({ queryKey: ['expenses'] });
        qc.invalidateQueries({ queryKey: ['expense-categories'] });
        setOpenDialog(false);
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitHandler)}
        {...props}
      >
        <div className="space-y-4">
          {/* ALERT */}
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
                          ref={field.ref}
                          name={field.name}
                          disabled={field.disabled}
                          onBlur={field.onBlur}
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

        {/* BUTTONS GROUPS */}
        <div className="mt-6 flex gap-2">
          <Button
            type="submit"
            className="w-full"
            pending={updateMutation.isPending}
            disabled={
              updateMutation.isPending ||
              deleteMutation.isPending ||
              !form.formState.isValid ||
              !form.formState.isDirty
            }
          >
            Mettre à jour
          </Button>
          <Button
            type="button"
            variant={delReady ? 'destructive' : 'outline'}
            className="w-full"
            pending={deleteMutation.isPending}
            disabled={deleteMutation.isPending || updateMutation.isPending}
            onClick={() => {
              if (delReady) {
                deleteHandler();
                return;
              }

              if (delConfirmCount.current === 0) {
                delConfirmCount.current += 1;
                setDelReady(true);
              }
            }}
          >
            {delReady ? (
              <AlertTriangle
                className="mr-2"
                size={16}
              />
            ) : (
              <Trash2
                className="mr-2"
                size={16}
              />
            )}
            <span>{delReady ? 'Confirmer' : 'Supprimer'}</span>
          </Button>
        </div>
      </form>
    </Form>
  );
}
