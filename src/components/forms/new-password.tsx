import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { Alert, AlertDescription } from '@/components/ui/alert';
import { PasswordInput } from '@/components/auth/password-input';
import { Button } from '@/components/ui/button';
import { NewPassword } from '@/schemas/users';
import { useUserActions } from '@/hooks/users';

export function NewPasswordForm() {
  const { updatePasswordMutation } = useUserActions();
  const [success, setSuccess] = useState<string>();
  const [error, setError] = useState<string>();

  const form = useForm<NewPassword>({
    resolver: zodResolver(NewPassword),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
    },
  });

  const submitHandler = form.handleSubmit((data) => {
    setSuccess(undefined);
    setError(undefined);

    updatePasswordMutation.mutate(data, {
      onSuccess() {
        setSuccess('Mot de passe a été mise à jour avec succès.');
        form.reset();
      },
      onError(e) {
        if (e instanceof HTTPError) {
          if (e.response.status === 400) {
            setError('Le mot de passe fourni est incorrect.');
            return;
          }
        }
        setError(
          "Une erreur s'est produite lors de la mise à jour de votre mot de passe. Veuillez réessayer ultérieurement.",
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
      <form
        onSubmit={submitHandler}
        className="space-y-5"
      >
        <FormField
          name="currentPassword"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mot de passe actuel</FormLabel>
              <FormControl>
                <PasswordInput {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="newPassword"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nouveau mot de passe</FormLabel>
              <FormControl>
                <PasswordInput {...field} />
              </FormControl>
              <FormDescription>Au moins 6 caractères.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {!!error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {!!success && (
          <Alert variant="success">
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        <Button
          type="submit"
          size="sm"
          pending={updatePasswordMutation.isPending}
          disabled={
            !form.formState.isDirty ||
            !form.formState.isValid ||
            updatePasswordMutation.isPending
          }
        >
          Mettre à jour
        </Button>
      </form>
    </Form>
  );
}
