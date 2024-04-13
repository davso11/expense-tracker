import { HTTPError } from 'ky';
import { useEffect, useState } from 'react';
import { Loader2, Mail } from 'lucide-react';
import { Link, Navigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuthActions } from '@/hooks/auth';
import { cn } from '@/lib/utils';

export function ConfirmEmailPage() {
  const [params] = useSearchParams();
  const [done, setDone] = useState<boolean>();
  const [showResendLinkButton, setShowResendLinkButton] = useState(false);
  const [error, setError] = useState<string>();
  const { confirmEmailMutation } = useAuthActions();
  const token = params.get('token');

  const confirmEmail = () => {
    setDone(undefined);
    setError(undefined);

    confirmEmailMutation.mutate(token!, {
      onError(e) {
        const defaultMsg =
          "Une erreur s'est produite lors de vérification de votre email. Veuillez réessayer utlérieurement.";

        if (e instanceof HTTPError) {
          if (e.response.status === 403) {
            setError('Votre lien de expiré.');
            setShowResendLinkButton(true);
          } else if (e.response.status === 401) {
            setError(
              "Votre email a déjà fait l'objet d'une vérification. Vous pouvez dès maintenant accéder à votre compte.",
            );
          } else {
            setError(defaultMsg);
          }
        } else {
          setError(e.message);
        }

        setDone(false);
      },
      onSuccess() {
        setDone(true);
      },
    });
  };

  useEffect(() => {
    if (token) confirmEmail();
  }, []);

  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return (
    <div className="center-flex w-full max-w-screen-xs flex-col">
      <h2
        className={cn(
          'subtitle text-2xl',
          done && 'text-emerald-500',
          done === false && 'text-red-500',
        )}
      >
        {done === undefined
          ? 'Confirmation en cours'
          : done === false
            ? 'Confirmation échouée'
            : 'Confirmé'}
      </h2>

      <div className="mt-6">
        {done === undefined ? (
          <Loader2
            size={32}
            strokeWidth={3}
            className="animate-spin-fast"
          />
        ) : done === false ? (
          <p className="text-center text-base text-muted-foreground">{error}</p>
        ) : (
          <p className="text-center text-base text-muted-foreground">
            Votre email a été vérifiée avec succès. Vous pouvez maintenant vous
            connecter.
          </p>
        )}
      </div>

      <div className="mt-6 flex flex-col items-center gap-3">
        {showResendLinkButton && (
          <Button
            size="sm"
            disabled // TODO: Implement
          >
            <Mail
              size={16}
              className="mr-2"
            />
            <span>Renvoyer le lien</span>
          </Button>
        )}

        <Link
          to="/login"
          className="text-sm underline-offset-2 hover:underline"
        >
          Connexion
        </Link>
      </div>
    </div>
  );
}
