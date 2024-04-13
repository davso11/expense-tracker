import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { PasswordInput } from './password-input';
import { RegisterInput } from '@/schemas/auth';
import { useAuthActions } from '@/hooks/auth';
import { cn } from '@/lib/utils';

export function RegistrationForm({
  className,
  ...props
}: React.ComponentProps<'form'>) {
  const { signUpMutation } = useAuthActions();
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();

  const form = useForm<RegisterInput>({
    resolver: zodResolver(RegisterInput),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const submitHandler = (data: RegisterInput) => {
    setError(undefined);
    setSuccess(undefined);

    signUpMutation.mutate(data, {
      onError: (e) => {
        if (e instanceof HTTPError) {
          if (e.response.status === 400) {
            setError('Cette adresse email est déjà utilisée.');
            return;
          }
        }

        setError('Une erreur est survenue. Veuillez réessayer.');
      },
      onSuccess: () => {
        setSuccess(
          'Un email de confirmation vous a été envoyé! Veuillez consulter votre boîte de réception.',
        );
      },
    });
  };

  return (
    <Form {...form}>
      <div className="mb-10">
        <h2 className="text-2xl font-medium">Inscription</h2>
      </div>

      <form
        onSubmit={form.handleSubmit(submitHandler)}
        className={cn(className)}
        {...props}
      >
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Votre email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mt-6">
              <FormLabel>Mot de passe</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Votre mot de passe"
                  {...field}
                />
              </FormControl>
              <FormDescription>Au moins 6 caractères.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {!!error && (
          <Alert
            className="mt-6"
            variant="destructive"
          >
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {!!success && (
          <Alert
            className="mt-6"
            variant="success"
          >
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        <Button
          type="submit"
          className="mt-6 w-full"
          pending={signUpMutation.isPending}
          disabled={
            !form.formState.isDirty ||
            !form.formState.isValid ||
            signUpMutation.isPending
          }
        >
          S'inscrire
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm">
          Vous avez déjà un compte ?{' '}
          <Link
            to="/login"
            className="underline"
          >
            Connectez-vous
          </Link>
        </p>
      </div>
    </Form>
  );
}
