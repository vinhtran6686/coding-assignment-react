import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';

import { I18nProvider } from '../mui-theme/i18n/I18nProvider';
import { LayoutProvider, LayoutSplashScreen } from '../mui-theme/layout/core';
import { AuthInit } from './modules/auth';
import { ThemeModeProvider } from '../mui-theme/partials';

const App = () => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <I18nProvider>
        <LayoutProvider>
          <ThemeModeProvider>
            <AuthInit>
              <Outlet />
            </AuthInit>
          </ThemeModeProvider>
        </LayoutProvider>
      </I18nProvider>
    </Suspense>
  );
};

export default App;
