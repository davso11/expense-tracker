import { createBrowserRouter } from 'react-router-dom';

// Layouts
import { HomeLayout } from '@/layouts/home';
import { RequireAuth } from '@/layouts/require-auth';
import { PersistAuth } from '@/layouts/persist-auth';
import { AuthLayout } from '@/layouts/auth';

// Pages
import { HomePage } from '@/pages/home';
import { LoginPage } from '@/pages/auth/login';
import { RegistrationPage } from '@/pages/auth/register';
import { NewExpensePage } from '@/pages/expenses/new';
import { ExpensePage } from '@/pages/expenses/expense';
import { SettingsPage } from '@/pages/account/settings';
import { ConfirmEmailPage } from '@/pages/auth/confirm-email';
import { DailyExpensesPage } from '@/pages/daily-expenses';
import { MonthlyExpensesPage } from '@/pages/monthly-expenses';
import { ExpenseCategoriesPage } from '@/pages/expenses-categories';
import { NotFound } from '@/pages/not-found';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PersistAuth />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: 'login',
            element: <LoginPage />,
          },
          {
            path: 'register',
            element: <RegistrationPage />,
          },
          {
            path: 'confirm-email',
            element: <ConfirmEmailPage />,
          },
        ],
      },
      {
        element: <RequireAuth />,
        children: [
          {
            element: <HomeLayout />,
            children: [
              {
                index: true,
                element: <HomePage />,
              },
              {
                path: 'expenses',
                children: [
                  {
                    path: 'new',
                    element: <NewExpensePage />,
                  },
                  {
                    path: ':id',
                    element: <ExpensePage />,
                  },
                ],
              },
              {
                path: 'account',
                children: [
                  {
                    path: 'settings',
                    element: <SettingsPage />,
                  },
                ],
              },
              {
                path: 'daily-expenses',
                element: <DailyExpensesPage />,
              },
              {
                path: 'monthly-expenses',
                element: <MonthlyExpensesPage />,
              },
              {
                path: 'expense-categories',
                element: <ExpenseCategoriesPage />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
