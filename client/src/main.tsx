import { createRoot } from 'react-dom/client';
import axios from 'axios';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { AppRoutes } from './app/routing/AppRoutes';
import { setupAxios, AuthProvider } from './app/modules/auth';
import './styles.css';
import { LayoutProvider } from './app/core/layout/core/LayoutProvider';
import MuiThemeProvider from './app/core/theme/MuiThemeProvider';

// Set up axios interceptors
setupAxios(axios);

const queryClient = new QueryClient();
const container = document.getElementById('root');
if (container) {
  createRoot(container).render(
    <QueryClientProvider client={queryClient}>
      <LayoutProvider>
        <MuiThemeProvider>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </MuiThemeProvider>
      </LayoutProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
