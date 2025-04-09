import { FC, createContext, useContext, useState, useEffect } from 'react';

// Define layout config types
export interface LayoutConfig {
  darkMode: boolean;
  sidebarOpen: boolean;
  headerFixed: boolean;
  contentWidth: 'fluid' | 'fixed';
  illustrations?: {
    set: string,
  };
}

// Default layout configuration
const defaultLayoutConfig: LayoutConfig = {
  darkMode: false,
  sidebarOpen: true,
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
  toggleSidebar: () => void;
}>({
  config: defaultLayoutConfig,
  setConfig: () => { },
  toggleSidebar: () => { },
});

// Layout Provider props interface
interface LayoutProviderProps {
  children: React.ReactNode;
}

// Layout Provider component
export const LayoutProvider: FC<LayoutProviderProps> = ({ children }) => {
  const [config, setConfig] = useState<LayoutConfig>(defaultLayoutConfig);

  const toggleSidebar = () => {
    setConfig({
      ...config,
      sidebarOpen: !config.sidebarOpen,
    });
  }; 

  return (
    <LayoutContext.Provider value={{ config, setConfig, toggleSidebar }}>
      {children}
    </LayoutContext.Provider>
  );
};

// Custom hook for accessing layout context
export const useLayout = () => useContext(LayoutContext); 