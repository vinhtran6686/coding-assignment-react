import { FC, createContext, useContext, useState } from 'react';

// Available languages
export const languages = [
  {
    name: 'English',
    code: 'en',
  },
  {
    name: 'Spanish',
    code: 'es',
  },
  {
    name: 'French',
    code: 'fr',
  },
];

// Default language
const defaultLanguage = languages[0];

// Create i18n context
const I18nContext = createContext<{
  currentLanguage: typeof defaultLanguage;
  setLanguage: (lang: typeof defaultLanguage) => void;
  translate: (key: string) => string;
}>({
  currentLanguage: defaultLanguage,
  setLanguage: () => {},
  translate: (key) => key,
});

// I18n provider props interface
interface I18nProviderProps {
  children: React.ReactNode;
}

// A very basic implementation of i18n
// In a real application, you would use a library like i18next or react-intl
export const I18nProvider: FC<I18nProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(defaultLanguage);

  // Set language
  const setLanguage = (lang: typeof defaultLanguage) => {
    setCurrentLanguage(lang);
    localStorage.setItem('language', lang.code);
  };

  // Translate function (very basic implementation)
  const translate = (key: string): string => {
    // In a real app, this would look up translations from language files
    return key;
  };

  return (
    <I18nContext.Provider value={{ currentLanguage, setLanguage, translate }}>
      {children}
    </I18nContext.Provider>
  );
};

// Custom hook for accessing i18n context
export const useI18n = () => useContext(I18nContext); 