import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';

import { LayoutProvider, LayoutSplashScreen } from './core/layout/core';
import { AuthInit } from './modules/auth';
import { ThemeModeProvider } from './core/theme/components/ThemeModeProvider';

const App = () => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <LayoutProvider>
        <ThemeModeProvider>
          <AuthInit>
            <Outlet />
          </AuthInit>
        </ThemeModeProvider>
      </LayoutProvider>
    </Suspense>
  );
};

export default App;
