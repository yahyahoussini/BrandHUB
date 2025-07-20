
import React, { useState } from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { generateAgencyManifesto } from '../services/geminiService';

const About: React.FC = () => {
  const { t, language } = useTranslations();
  const [manifesto, setManifesto] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleGenerateClick = async () => {
    setIsLoading(true);
    setError('');
    setManifesto('');
    try {
      const result = await generateAgencyManifesto(language);
      setManifesto(result);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative py-20 md:py-32 bg-soft-lavender dark:bg-charcoal-black overflow-hidden">
      <div className="absolute inset-0 animated-grid-background opacity-50"></div>
      <div className="relative z-10 container mx-auto px-6 max-w-4xl text-center">
        <h2 className="text-4xl md:text-5xl font-black text-charcoal-black dark:text-soft-lavender mb-4">
          {t('about_title')}
        </h2>
        <p className="text-xl md:text-2xl text-neon-lime mb-8 font-bold">{t('about_subtitle')}</p>
        <p className="text-lg md:text-xl text-charcoal-black/80 dark:text-soft-lavender/80 mb-12">
          {t('about_text')}
        </p>
        
        <div className="bg-white/50 dark:bg-charcoal-black/50 border border-deep-purple/20 dark:border-deep-purple/50 rounded-lg p-6 md:p-8 mt-12">
            <h3 className="text-2xl font-bold text-neon-lime mb-4">{t('generate_ideas')}</h3>
            <button 
                onClick={handleGenerateClick}
                disabled={isLoading}
                className="group relative overflow-hidden bg-deep-purple text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
                 <span className="absolute inset-0 animated-gradient-border opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-background-pan"></span>
                <span className="relative">{isLoading ? t('generating') : t('generate_ideas')}</span>
            </button>
            {manifesto && (
                <div className="mt-6 p-4 border-l-4 border-neon-lime bg-soft-lavender dark:bg-charcoal-black rounded-r-lg text-left">
                    <p className="text-charcoal-black dark:text-soft-lavender italic">{manifesto}</p>
                </div>
            )}
            {error && (
                <div className="mt-6 p-4 bg-red-900/50 text-red-300 rounded-lg">
                    <p>{error}</p>
                </div>
            )}
        </div>
      </div>
    </section>
  );
};

export default About;
