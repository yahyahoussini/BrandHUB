
import React from 'react';
import { useTranslations } from '../hooks/useTranslations';
import type { Language } from '../types';

const LANGUAGES: { code: Language; label: string }[] = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
  { code: 'ar', label: 'AR' },
];

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useTranslations();

  return (
    <div className="flex items-center space-x-2 bg-white/50 dark:bg-charcoal-black/50 backdrop-blur-sm p-1 rounded-full border border-charcoal-black/10 dark:border-soft-lavender/20">
      {LANGUAGES.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => setLanguage(code)}
          className={`px-3 py-1 rounded-full text-sm font-bold transition-all duration-300 ${
            language === code
              ? 'bg-neon-lime text-charcoal-black'
              : 'text-charcoal-black dark:text-soft-lavender hover:bg-black/10 dark:hover:bg-white/10'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;