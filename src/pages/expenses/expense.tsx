import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useExpenses } from '@/hooks/expenses';
import { UpdateExpenseInput } from '@/schemas/expenses';
import { useExpenseCategories } from '@/hooks/expense-categories';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { dayjs } from '@/lib/dayjs';

export function ExpensePage() {
  const [error, setError] = useState<string>();
  const [openDelDialog, setOpenDelDialog] = useState(false);
  const [anyValueChanged, setAnyValueChanged] = useState(false);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const qc = useQueryClient();

  const { categoriesQuery } = useExpenseCategories();
  const { expenseQuery, deleteMutation, updateMutation } = useExpenses({
    id,
    queries: { q: 'categoryId' },
  });

  const form = useForm<UpdateExpenseInput>({
    resolver: zodResolver(UpdateExpenseInput),
    defaultValues: {
      amount: '0',
      categoryId: '',
      description: '',
    },
  });

  useEffect(() => {
    if (form.formState.isDirty) {
      setAnyValueChanged(true);
    }
  }, [form.formState.isDirty]);

  useEffect(() => {
    if (expenseQuery.data) {
      form.reset({
        amount: expenseQuery.data.amount,
        categoryId: expenseQuery.data.categoryId,
        description: expenseQuery.data.description ?? '',
      });
    }
  }, [expenseQuery.data]);

  const submitHandler = (values: UpdateExpenseInput) => {
    const data = {
      ...values,
      userId: 'cc4ca204-2179-4fb0-95e2-8b45066bbffb',
      id,
    };

    updateMutation.mutate(data, {
      onError(error) {
        setError(error.message);
      },
      async onSuccess() {
        toast.success('Dépense créée avec succès');
        await qc.invalidateQueries({ queryKey: ['expenses'] });
        navigate('/');
      },
    });
  };

  const deleteHandler = () => {
    console.log('Deleting expense...');

    deleteMutation.mutateAsync(id!, {
      onError(error) {
        setError(error.message);
      },
      async onSuccess() {
        toast.success('Dépense supprimée avec succès');
        setOpenDelDialog(false);
        await qc.invalidateQueries({ queryKey: ['expenses'] });
        navigate('/');
      },
    });
  };

  if (expenseQuery.status === 'error') {
    return (
      <div className="container">
        <p>Erreur survenue.</p>
      </div>
    );
  }

  if (expenseQuery.status === 'pending' || !categoriesQuery.data) {
    return (
      <div className="container">
        <p>Chargement...</p>
      </div>
    );
  }

  return (
    <section className="container">
      <h1 className="subtitle mb-8">Détails sur la dépense</h1>

      <Form {...form}>
        {error && (
          <Alert
            variant="destructive"
            className="mb-6"
          >
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Dialog
          open={openDelDialog}
          onOpenChange={setOpenDelDialog}
        >
          <form
            onSubmit={form.handleSubmit(submitHandler)}
            className="space-y-4"
          >
            <div className="flex flex-col gap-4 xs:flex-row">
              {/* MONTANT */}
              <FormField
                name="amount"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Montant (FCFA)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="XXXXXXXX"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* CATÉGORIE */}
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Catégorie</FormLabel>
                    <Select
                      defaultValue={expenseQuery.data.categoryId}
                      disabled={!categoriesQuery.data || field.disabled}
                      onValueChange={field.onChange}
                      name={field.name}
                    >
                      <FormControl>
                        <SelectTrigger
                          onBlur={field.onBlur}
                          ref={field.ref}
                        >
                          <SelectValue
                            placeholder={
                              categoriesQuery.data
                                ? categoriesQuery.data.length > 0
                                  ? 'Selectionnez une catégorie'
                                  : 'Aucune catégorie trouvée'
                                : 'Erreur survenue'
                            }
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categoriesQuery.data?.map(({ id, name, emoji }) => (
                          <SelectItem
                            key={id}
                            value={id}
                          >
                            <div className="inline-flex items-center">
                              <span className="mr-2 text-base">{emoji}</span>
                              <span className="capitalize">{name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* DATE */}
            <div className="flex flex-col gap-4 xs:flex-row">
              <FormItem className="w-full">
                <FormLabel htmlFor="date">Date</FormLabel>
                <FormControl>
                  <Input
                    id="date"
                    readOnly
                    value={dayjs(expenseQuery.data.date).format('LL')}
                    disabled
                  />
                </FormControl>
              </FormItem>

              <FormItem className="w-full">
                <FormLabel htmlFor="time">Heure</FormLabel>
                <FormControl>
                  <Input
                    id="time"
                    readOnly
                    value={dayjs(expenseQuery.data.time).format('HH:mm:ss')}
                    disabled
                  />
                </FormControl>
              </FormItem>
            </div>

            {/* DESCRIPTION */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Motif de la dépense"
                      className="min-h-32 resize-y"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2">
              <Button
                type="submit"
                pending={form.formState.isSubmitting}
                disabled={
                  !anyValueChanged ||
                  !form.formState.isValid ||
                  !form.formState.isDirty ||
                  form.formState.isSubmitting
                }
              >
                Mettre à jour
              </Button>

              {/* REMOVE  */}
              <DialogTrigger asChild>
                <Button variant="destructive">Supprimer</Button>
              </DialogTrigger>
            </div>
          </form>

          {/* CONFIRMATION DIALOG */}
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmation</DialogTitle>
            </DialogHeader>

            <DialogDescription>
              Cette action ne peut pas être annulée. Cela supprimera
              définitivement la dépense de votre compte.
            </DialogDescription>

            <DialogFooter className="flex-col-reverse justify-end">
              <DialogClose asChild>
                <Button
                  variant="secondary"
                  className="w-full sm:w-auto"
                  disabled={deleteMutation.isPending}
                >
                  Annuler
                </Button>
              </DialogClose>

              <Button
                variant="destructive"
                onClick={deleteHandler}
                disabled={deleteMutation.isPending}
                pending={deleteMutation.isPending}
              >
                Supprimer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Form>
    </section>
  );
}
