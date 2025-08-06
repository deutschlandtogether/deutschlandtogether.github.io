import ru from '../locales/ru.json';
import ua from '../locales/ua.json';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'ru' | 'ua';
type Translations = { [key: string]: string };

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isLoading: boolean;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const allTranslations: Record<Language, Translations> = { ru, ua };

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(
    () => (localStorage.getItem('language') as Language) || 'ru'
  );
  const [isLoading, setIsLoading] = useState(false);

  const setLanguage = (lang: Language) => {
    if (lang !== language) {
      setIsLoading(true);
      setTimeout(() => {
        localStorage.setItem('language', lang);
        setLanguageState(lang);
        setIsLoading(false);
      }, 200);
      document.documentElement.lang = lang;
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return allTranslations[language][key] || key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t, isLoading }}>
    {children}
    </I18nContext.Provider>
  );
};

export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
