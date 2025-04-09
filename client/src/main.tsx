import { createRoot } from 'react-dom/client';
import axios from 'axios';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { AppRoutes } from './app/routing/AppRoutes';
import { setupAxios, AuthProvider } from './app/modules/auth';
import './styles.css';
import { theme } from './app/core/theme/theme';

// Set up axios interceptors
setupAxios(axios);

const queryClient = new QueryClient();
const container = document.getElementById('root');
if (container) {
  createRoot(container).render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
