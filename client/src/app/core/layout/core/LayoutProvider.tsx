import { FC, createContext, useContext, useState, useEffect } from 'react';

// Define layout config types
export interface LayoutConfig {
  darkMode: boolean;
  headerFixed: boolean;
  contentWidth: 'fluid' | 'fixed';
  illustrations?: {
    set: string,
  };
}

// Default layout configuration
const defaultLayoutConfig: LayoutConfig = {
  darkMode: false,
  headerFixed: true,
  contentWidth: 'fluid',
  illustrations: {
    set: 'default',
  },
};

// Create layout context
const LayoutContext = createContext<{
  config: LayoutConfig;
  setConfig: (config: LayoutConfig) => void;
}>({
  config: defaultLayoutConfig,
  setConfig: () => { },
});

// Layout Provider props interface
interface LayoutProviderProps {
  children: React.ReactNode;
}

// Layout Provider component
export const LayoutProvider: FC<LayoutProviderProps> = ({ children }) => {
  const [config, setConfig] = useState<LayoutConfig>(defaultLayoutConfig);

  return (
    <LayoutContext.Provider value={{ config, setConfig }}>
      {children}
    </LayoutContext.Provider>
  );
};

// Custom hook for accessing layout context
export const useLayout = () => useContext(LayoutContext); 