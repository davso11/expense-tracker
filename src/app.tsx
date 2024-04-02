import { RouterProvider } from 'react-router-dom';
import { router } from '@/lib/router';

export function App() {
  return <RouterProvider router={router} />;
}
