import { NewPasswordForm } from '@/components/forms/new-password';
import { PersonalUserInfo } from '@/components/forms/personal-user-info';

export function SettingsPage() {
  return (
    <>
      {/*  */}
      <section className="container">
        <h1 className="subtitle mb-8">Informations personnelles</h1>
        <PersonalUserInfo />
      </section>

      {/*  */}
      <section className="container">
        <h1 className="subtitle mb-8">Réinitialiser le mot de passe</h1>
        <NewPasswordForm />
      </section>
    </>
  );
}
