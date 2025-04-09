import { FC, useMemo } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useLayout } from '../layout/core/LayoutProvider';
import { WithChildren } from '../utils/helpers';
import { lightTheme, darkTheme } from './themes';

const MuiThemeProvider: FC<WithChildren> = ({ children }) => {
  const { config } = useLayout();
  
  const theme = useMemo(() => {
    const baseTheme = config.darkMode ? darkTheme : lightTheme;
    return createTheme(baseTheme);
  }, [config.darkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MuiThemeProvider; 