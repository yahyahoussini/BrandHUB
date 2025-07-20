
import React from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { SocialIcon } from './icons';

const Footer: React.FC = () => {
    const { t } = useTranslations();
    const year = new Date().getFullYear();

    return (
        <footer className="bg-soft-lavender dark:bg-charcoal-black border-t border-charcoal-black/10 dark:border-deep-purple/20 py-12">
            <div className="container mx-auto px-6 text-center text-charcoal-black/60 dark:text-soft-lavender/60">
                <div className="flex justify-center items-center space-x-6 mb-8">
                    <SocialIcon href="https://instagram.com" aria-label="Instagram">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069s-3.585-.011-4.85-.069c-3.252-.149-4.771-1.664-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919C8.415 2.175 8.796 2.163 12 2.163zm0 1.802c-3.141 0-3.492.011-4.71.068-2.61.12-3.834 1.34-3.953 3.953-.057 1.218-.067 1.569-.067 4.71s.01 3.492.067 4.71c.119 2.613 1.343 3.833 3.953 3.953.584.028 1.86.052 4.71.052s4.126-.024 4.71-.052c2.61-.12 3.834-1.34 3.953-3.953.057-1.218.067-1.569.067-4.71s-.01-3.492-.067-4.71c-.119-2.613-1.343-3.833-3.953-3.953C15.492 3.976 15.141 3.965 12 3.965zM12 7.188c-2.649 0-4.812 2.163-4.812 4.812s2.163 4.812 4.812 4.812 4.812-2.163 4.812-4.812S14.649 7.188 12 7.188zm0 7.812c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3zm6.406-7.938c-.781 0-1.418.636-1.418 1.418s.637 1.418 1.418 1.418 1.418-.636 1.418-1.418S19.187 7.062 18.406 7.062z"></path></svg>
                    </SocialIcon>
                    <SocialIcon href="https://linkedin.com" aria-label="LinkedIn">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"></path></svg>
                    </SocialIcon>
                    <SocialIcon href="https://behance.net" aria-label="Behance">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22 5.892h-7.113v1.446h7.113zM14.887 11.21c0-2.613-1.59-4.1-4.14-4.1H3v11.783h7.942c2.478 0 3.945-1.47 3.945-3.837zm-2.064.123c0 1.396-.8 2.185-2.022 2.185H5.064v-4.46h5.75c1.192 0 2.008.73 2.008 2.275zM19.018 10.95h-2.27V9.013h2.27z"></path></svg>
                    </SocialIcon>
                </div>
                <div className="flex items-center justify-center animate-float animation-delay-[-2s] mb-4">
                    <div className="w-1 h-1 bg-neon-lime rounded-full mx-1"></div>
                    <div className="w-10 h-10 border-2 border-deep-purple rounded-full p-1">
                        <div className="w-full h-full border-2 border-neon-lime/50 rounded-full"></div>
                    </div>
                     <div className="w-1 h-1 bg-neon-lime rounded-full mx-1"></div>
                </div>
                <p className="text-sm">
                    &copy; {year} Agence Créative. {t('footer_rights')}
                </p>
            </div>
        </footer>
    );
};

export default Footer;