import { Toaster } from 'react-hot-toast';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/contexts/auth';
import { ConfigProvider } from 'antd';
import { App } from '@/app';
import '@/global.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});
const PRIMARY_COLOR = 'hsl(214.3 31.8% 91.4%)';

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ConfigProvider
        theme={{
          components: {
            DatePicker: {
              activeBorderColor: PRIMARY_COLOR,
              activeShadow: `0 0 0 0px ${PRIMARY_COLOR}`,
              hoverBorderColor: PRIMARY_COLOR,
              // TODO: ...
            },
            Button: {
              // TODO: Add custom button styles
            },
          },
        }}
      >
        <App />
        <Toaster
          toastOptions={{
            duration: 4000,
          }}
        />
      </ConfigProvider>
    </AuthProvider>
  </QueryClientProvider>,
);
