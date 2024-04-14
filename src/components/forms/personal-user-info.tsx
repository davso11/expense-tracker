import { useState } from 'react';
import { useAuth } from '@/contexts/auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { UserInfo } from '@/schemas/users';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useUserActions } from '@/hooks/users';

export function PersonalUserInfo() {
  const { user } = useAuth();
  const { updateInfoMutation } = useUserActions();
  const [success, setSuccess] = useState<string>();
  const [error, setError] = useState<string>();

  const form = useForm<UserInfo>({
    resolver: zodResolver(UserInfo),
    defaultValues: {
      firstName: user!.firstName ?? '',
      lastName: user!.lastName ?? '',
    },
  });

  const submitHandler = form.handleSubmit((data) => {
    setSuccess(undefined);
    setError(undefined);

    updateInfoMutation.mutate(data, {
      onSuccess: (res) => {
        setSuccess('Vos informations ont été mises à jour avec succès.');
        form.reset({
          firstName: res.firstName ?? '',
          lastName: res.lastName ?? '',
        });
      },
      onError: () => {
        setError(
          "Une erreur s'est produite lors de la mise à jour de vos informations. Veuillez réessayer ultérieurement.",
        );
      },
      onSettled: () => {
        setTimeout(() => {
          setError(undefined);
          setSuccess(undefined);
        }, 10000);
      },
    });
  });

  return (
    <Form {...form}>
      <form onSubmit={submitHandler}>
        <div className="flex flex-col items-center gap-5 sm:flex-row">
          <FormField
            name="lastName"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="firstName"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Prénoms</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormItem className="mt-5">
          <FormLabel>Email</FormLabel>
          <Input
            disabled
            readOnly
            value={user!.email}
          />
        </FormItem>

        {!!error && (
          <Alert
            variant="destructive"
            className="mt-5"
          >
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {!!success && (
          <Alert
            variant="success"
            className="mt-5"
          >
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        <Button
          size="sm"
          className="mt-5"
          pending={updateInfoMutation.isPending}
          disabled={
            !form.formState.isDirty ||
            !form.formState.isValid ||
            updateInfoMutation.isPending
          }
        >
          Mettre à jour
        </Button>
      </form>
    </Form>
  );
}
