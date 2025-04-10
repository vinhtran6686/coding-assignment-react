import { FC, useMemo } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useLayout } from '../layout/core/LayoutProvider';
import { WithChildren } from '../utils/helpers';
import { lightTheme, darkTheme } from './themes';
import FontLoader from './FontLoader';

const MuiThemeProvider: FC<WithChildren> = ({ children }) => {
  const { config } = useLayout();
  
  const theme = useMemo(() => {
    const baseTheme = config.darkMode ? darkTheme : lightTheme;
    return createTheme(baseTheme);
  }, [config.darkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FontLoader>
        {children}
      </FontLoader>
    </ThemeProvider>
  );
};

export default MuiThemeProvider; 