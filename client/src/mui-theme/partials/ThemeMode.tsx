import { FC, createContext, useContext, useState, useEffect } from 'react';
import { PaletteMode } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme as baseTheme } from '../theme';

// Create theme mode context
const ThemeModeContext = createContext<{
  mode: PaletteMode;
  toggleThemeMode: () => void;
}>({
  mode: 'light',
  toggleThemeMode: () => {},
});

// Theme mode provider props interface
interface ThemeModeProviderProps {
  children: React.ReactNode;
}

// Load theme preference from local storage
const getThemePreference = (): PaletteMode => {
  const savedMode = localStorage.getItem('themeMode');
  return (savedMode as PaletteMode) || 'light';
};

// Theme Mode Provider component
export const ThemeModeProvider: FC<ThemeModeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<PaletteMode>(getThemePreference());

  // Create theme based on mode
  const theme = createTheme({
    ...baseTheme,
    palette: {
      ...baseTheme.palette,
      mode,
    },
  });

  // Toggle between light and dark mode
  const toggleThemeMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('themeMode', newMode);
  };

  // Apply dark mode class to body
  useEffect(() => {
    document.body.classList.toggle('dark-mode', mode === 'dark');
  }, [mode]);

  return (
    <ThemeModeContext.Provider value={{ mode, toggleThemeMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
};

// Custom hook for accessing theme mode context
export const useThemeMode = () => useContext(ThemeModeContext); 