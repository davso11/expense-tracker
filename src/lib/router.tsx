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
                    index: true,
                    element: <section className="container">🤷🏾‍♂️</section>,
                  },
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
