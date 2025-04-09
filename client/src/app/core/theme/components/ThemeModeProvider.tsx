import { FC, createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../theme';

// Interface for theme mode context
interface ThemeModeContextProps {
  mode: 'light' | 'dark';
  toggleThemeMode: () => void;
}

// Create context with default values
const ThemeModeContext = createContext<ThemeModeContextProps>({
  mode: 'light',
  toggleThemeMode: () => {},
});

// Props for ThemeModeProvider
interface ThemeModeProviderProps {
  children: React.ReactNode;
}

// ThemeModeProvider component
export const ThemeModeProvider: FC<ThemeModeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  // Toggle between light and dark mode
  const toggleThemeMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeModeContext.Provider value={{ mode, toggleThemeMode }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
};

// Custom hook to use theme mode
export const useThemeMode = () => useContext(ThemeModeContext); 