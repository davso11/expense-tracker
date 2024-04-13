import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
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
import { setAccessToken } from '@/lib/auth';
import { useAuth } from '@/contexts/auth';
import { cn } from '@/lib/utils';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'form'>) {
  const { signInMutation } = useAuthActions();
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useAuth();
  const qc = useQueryClient();

  const from = location.state?.from?.pathname || '/';

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

    signInMutation.mutate(data, {
      onError: async (e) => {
        if (e instanceof HTTPError) {
          if (e.response.status === 400) {
            setError('Email ou mot de passe incorrect.');
            return;
          }
        }

        setError('Une erreur est survenue. Veuillez réessayer plus tard.');
      },
      onSuccess: async (res) => {
        if (res !== 'done') {
          setUser(res.user);
          setAccessToken(res.accessToken);
          setSuccess('Vous êtes connecté. Vous allez être redirigé...');
          await qc.invalidateQueries();
          setTimeout(() => {
            navigate(from, { replace: true });
          }, 2000);
        } else {
          setSuccess(
            "Vous devez vérifier votre email avant d'avoir accès à votre espace. Un lien de confirmation vient d'être envoyé à votre boîte de réception.",
          );
        }
      },
    });
  };

  return (
    <Form {...form}>
      <div className="mb-10">
        <h2 className="text-2xl font-medium">Connexion</h2>
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
          pending={signInMutation.isPending}
          disabled={
            !form.formState.isDirty ||
            !form.formState.isValid ||
            signInMutation.isPending
          }
        >
          Se connecter
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm">
          Vous n'avez pas de compte ?{' '}
          <Link
            to="/register"
            className="underline"
          >
            Inscrivez-vous
          </Link>
        </p>
      </div>
    </Form>
  );
}
