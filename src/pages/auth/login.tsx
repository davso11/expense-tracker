import { LoginForm } from '@/components/auth/login-form';
import { APP_NAME } from '@/constants';

export function LoginPage() {
  return (
    <div className="center-flex h-screen">
      {/* TODO: ... */}
      <div className="hidden h-full flex-1 bg-gradient-to-r from-slate-50 to-slate-200 lg:block">
        <div className="center-flex size-full">
          <h1 className="text-5xl font-bold">{APP_NAME}</h1>
        </div>
      </div>

      <div className="center-flex h-full flex-1 p-4">
        <div className="w-full max-w-screen-xs">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
