import { createContext, FC, useContext, useState } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';

const SplashScreenContext = createContext<{
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}>({
  isLoading: false,
  setIsLoading: () => {},
});

const SplashScreenWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 2000,
  backgroundColor: theme.palette.background.default,
}));

interface SplashScreenProviderProps {
  children: React.ReactNode;
}

export const SplashScreenProvider: FC<SplashScreenProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <SplashScreenContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </SplashScreenContext.Provider>
  );
};

export const LayoutSplashScreen: FC = () => {
  // You can add any UI you want, like a fancy loading animation
  return (
    <SplashScreenWrapper>
      <CircularProgress size={60} thickness={4} />
    </SplashScreenWrapper>
  );
};

export const useSplashScreen = () => useContext(SplashScreenContext); 