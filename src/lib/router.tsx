import { createBrowserRouter } from 'react-router-dom';

// Layouts
import { HomeLayout } from '@/layouts/home';

// Pages
import { HomePage } from '@/pages/home';
import { LoginPage } from '@/pages/login';
import { RegistrationPage } from '@/pages/register';
import { NotFound } from '@/pages/not-found';
import { NewExpensePage } from '@/pages/expenses/new';

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
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
