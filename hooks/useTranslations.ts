
import React, { createContext, useState, useContext, useEffect, useCallback, ReactNode } from 'react';
import type { Language, TranslationContextType } from '../types';
import { translations } from '../content/translations';

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');
  const [dir, setDir] = useState<'ltr' | 'rtl'>('ltr');

  useEffect(() => {
    const browserLang = navigator.language.split('-')[0];
    if (browserLang === 'en' || browserLang === 'ar') {
      setLanguage(browserLang);
    } else {
      setLanguage('fr'); // Default to French
    }
  }, []);

  useEffect(() => {
    const newDir = language === 'ar' ? 'rtl' : 'ltr';
    setDir(newDir);
    document.documentElement.lang = language;
    document.documentElement.dir = newDir;
    
    // Manage font classes on body
    document.body.classList.remove('font-sans', 'font-arabic');
    document.body.classList.add(language === 'ar' ? 'font-arabic' : 'font-sans');

  }, [language]);

  const t = useCallback((key: string): string => {
    return translations[key]?.[language] || key;
  }, [language]);

  const value = { language, setLanguage, t, dir };

  return React.createElement(TranslationContext.Provider, { value: value }, children);
};

export const useTranslations = (): TranslationContextType => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslations must be used within a TranslationProvider');
  }
  return context;
};