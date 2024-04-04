import { createBrowserRouter } from 'react-router-dom';

// Layouts
import { HomeLayout } from '@/layouts/home';

// Pages
import { HomePage } from '@/pages/home';
import { LoginPage } from '@/pages/login';
import { RegistrationPage } from '@/pages/register';
import { NewExpensePage } from '@/pages/expenses/new';
import { ExpensePage } from '@/pages/expenses/expense';
import { NotFound } from '@/pages/not-found';

export const router = createBrowserRouter([
  {
    path: 'login',
    element: <LoginPage />,
  },
  {
    path: 'register',
    element: <RegistrationPage />,
  },
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
  {
    path: '*',
    element: <NotFound />,
  },
]);
