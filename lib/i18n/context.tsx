'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, translations } from './translations';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, options?: { returnObjects?: boolean }) => string | any;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('language') as Language | null;
    if (saved && translations[saved]) {
      setLanguageState(saved);
    } else {
      setLanguageState('en');
      localStorage.setItem('language', 'en');
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    document.documentElement.dir = 'ltr';
  };

  const translationsObj = translations[language];

  const t = (key: string, options?: { returnObjects?: boolean }): string | any => {
    try {
      const keys = key.split('.');
      let value: any = translationsObj;

      for (const k of keys) {
        if (value === null || value === undefined) {
          value = undefined;
          break;
        }
        value = value[k];
      }

      if (value === undefined || value === null) {
        value = translations.en;
        for (const k of keys) {
          if (value === null || value === undefined) {
            value = undefined;
            break;
          }
          value = value[k];
        }
      }

      if (value === undefined || value === null) {
        return key;
      }

      if (options?.returnObjects) {
        return value;
      }

      return typeof value === 'string' ? value : (typeof value === 'object' ? key : String(value));
    } catch (error) {
      console.error('Translation error for key:', key, error);
      return key;
    }
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    const defaultT = (key: string, options?: { returnObjects?: boolean }): string | any => {
      try {
        const keys = key.split('.');
        let value: any = translations.en;
        for (const k of keys) {
          if (value === null || value === undefined) {
            break;
          }
          value = value[k];
        }
        if (value === undefined || value === null) {
          return key;
        }
        if (options?.returnObjects) {
          return value;
        }
        return typeof value === 'string' ? value : (typeof value === 'object' ? key : String(value));
      } catch (error) {
        console.error('Translation error for key:', key, error);
        return key;
      }
    };
    return {
      language: 'en' as Language,
      setLanguage: () => { },
      t: defaultT,
    };
  }
  return context;
}
