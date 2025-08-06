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

const loadTranslations = async (lang: Language): Promise<Translations> => {
  const response = await fetch(`/locales/${lang}.json`);
  if (!response.ok) throw new Error(`Failed to load translations for ${lang}`);
  return response.json();
};

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(
    () => (localStorage.getItem('language') as Language) || 'ru'
  );
  const [translations, setTranslations] = useState<Translations>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    loadTranslations(language)
      .then(setTranslations)
      .catch((err) => {
        console.error(err);
        setTranslations({});
      })
      .finally(() => setTimeout(() => setIsLoading(false), 200));
  }, [language]);

  const setLanguage = (lang: Language) => {
    if (lang !== language) {
      localStorage.setItem('language', lang);
      setLanguageState(lang);
      document.documentElement.lang = lang;
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[key] || key;
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
