import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import locale from 'antd/es/date-picker/locale/fr_FR';
import { useQueryClient } from '@tanstack/react-query';
import { CalendarIcon, CircleX, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { TimePicker } from 'antd';
import { HTTPError } from 'ky';

import {
  Form,
  FormControl,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription } from '../ui/alert';
import { useAllExpenseCategories } from '@/hooks/expense-categories';
import { useExpenses } from '@/hooks/expenses';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { InputLoader } from '../loaders/input-loader';
import { ExpenseInput } from '@/schemas/expenses';
import { dayjs } from '@/lib/dayjs';
import { cn } from '@/lib/utils';

export function NewExpenseForm() {
  const categoriesQuery = useAllExpenseCategories();
  const categories = categoriesQuery.data ?? undefined;
  const { saveMutation } = useExpenses({ enabled: false });
  const [showDatePop, setShowDatePop] = useState(false);
  const [error, setError] = useState<string>();
  const navigate = useNavigate();
  const qc = useQueryClient();

  const form = useForm<ExpenseInput>({
    resolver: zodResolver(ExpenseInput),
    defaultValues: {
      amount: '0',
      date: new Date(),
      time: new Date(),
      categoryId: '',
      description: '',
    },
  });

  const submitHandler = (data: ExpenseInput) => {
    setError(undefined);

    saveMutation.mutate(data, {
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
        toast.success('Dépense créée avec succès');
        qc.invalidateQueries({
          queryKey: ['expenses'],
        });
        navigate('/');
      },
    });
  };

  return (
    <Form {...form}>
      {error && (
        <Alert
          variant="destructive"
          className="mb-6"
        >
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form
        onSubmit={form.handleSubmit(submitHandler)}
        className="space-y-4"
      >
        <div className="flex flex-col gap-4 xs:flex-row">
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

          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Catégorie</FormLabel>
                <div className="relative">
                  <Select
                    onValueChange={field.onChange}
                    disabled={!categories || field.disabled}
                    name={field.name}
                  >
                    <FormControl>
                      <SelectTrigger
                        onBlur={field.onBlur}
                        ref={field.ref}
                      >
                        <SelectValue
                          placeholder={
                            categories
                              ? categories.length > 0
                                ? 'Selectionnez une catégorie'
                                : 'Aucune catégorie trouvée'
                              : 'Erreur survenue'
                          }
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories?.map(({ id, name, emoji }) => (
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

                  {categoriesQuery.isPending && (
                    <InputLoader className="absolute top-0" />
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-4 xs:flex-row">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel>Date</FormLabel>
                <Popover
                  open={showDatePop}
                  onOpenChange={setShowDatePop}
                >
                  <PopoverTrigger asChild>
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
                          dayjs(field.value).format('LL')
                        ) : (
                          <span>Choisissez une date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 text-zinc-500 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => {
                        if (date) {
                          field.onChange(date);
                          setShowDatePop(false);
                          return;
                        }

                        field.onChange(new Date());
                      }}
                      disabled={(date) =>
                        date > new Date() || date < new Date('1900-01-01')
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="time"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel>Heure</FormLabel>
                <FormControl>
                  <TimePicker
                    ref={field.ref}
                    locale={locale}
                    name={field.name}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm transition-none focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
                    placeholder="Choisissez une heure"
                    defaultValue={field.value ? dayjs(field.value) : null}
                    onChange={(time) =>
                      field.onChange(time?.toDate() ?? undefined)
                    }
                    disabled={field.disabled}
                    onBlur={field.onBlur}
                    suffixIcon={<Clock size={18} />}
                    onOk={(time) => field.onChange(time.toDate())}
                    allowClear={{
                      clearIcon: (
                        <CircleX
                          size={18}
                          className="fill-muted"
                        />
                      ),
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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

        <Button
          type="submit"
          disabled={saveMutation.isPending || !form.formState.isValid}
          pending={saveMutation.isPending}
        >
          Créer
        </Button>
      </form>
    </Form>
  );
}
