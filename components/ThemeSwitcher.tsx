
import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { SunIcon, MoonIcon } from './icons';

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      className="flex items-center justify-center w-10 h-10 p-2 rounded-full transition-colors duration-300 bg-white/50 dark:bg-charcoal-black/50 backdrop-blur-sm text-charcoal-black dark:text-soft-lavender hover:bg-black/10 dark:hover:bg-white/10 border border-charcoal-black/10 dark:border-soft-lavender/20"
    >
      {theme === 'light' ? (
        <MoonIcon className="w-6 h-6" />
      ) : (
        <SunIcon className="w-6 h-6 text-neon-lime" />
      )}
    </button>
  );
};

export default ThemeSwitcher;
