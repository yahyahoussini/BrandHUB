

import React from 'react';

export type Language = 'fr' | 'en' | 'ar';
export type Theme = 'light' | 'dark';

export interface Translations {
  [key: string]: {
    [lang in Language]: string;
  };
}

export interface Service {
  id: string;
  titleKey: string;
  descriptionKey: string;
  icon: React.ReactElement<{ className?: string }>;
}

export interface Project {
  id: string;
  titleKey: string;
  categoryKey: string;
  image: string;
}

export interface CoreValue {
  id: string;
  titleKey: string;
  descriptionKey: string;
  icon: React.ReactElement<{ className?: string }>;
}

export interface ProcessStep {
  id: string;
  titleKey: string;
  descriptionKey: string;
  icon: React.ReactElement<{ className?: string }>;
}

export interface Testimonial {
  id: string;
  type: 'quote' | 'video';
  nameKey: string;
  companyKey: string;
  photoUrl: string; // Used for client photo in quote, or video thumbnail in video
  logoUrl?: string; // Optional, for client company logo
  quoteKey?: string; // Optional, only for quotes
  videoId?: string; // Optional, only for videos
}

export interface TeamMember {
  id: string;
  nameKey: string;
  roleKey: string;
  photoUrl: string;
}

export interface BlogPost {
  id: string;
  titleKey: string;
  summaryKey: string;
  contentKey: string;
  authorKey: string;
  dateKey: string;
  imageUrl: string;
}

export interface TranslationContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

export interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

export interface NavLinkItem {
    id: string;
    translationKey: string;
    sectionId: string;
}