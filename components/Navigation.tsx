
import React from 'react';
import { useTranslations } from '../hooks/useTranslations';
import type { NavLinkItem } from '../types';

interface NavigationProps {
    isOpen: boolean;
    onClose: () => void;
    sectionIds: { [key: string]: string };
}

const navLinks: NavLinkItem[] = [
    { id: 'nav1', translationKey: 'nav_who_we_are', sectionId: 'whoWeAre' },
    { id: 'nav2', translationKey: 'nav_services', sectionId: 'services' },
    { id: 'nav3', translationKey: 'nav_portfolio', sectionId: 'portfolio' },
    { id: 'nav4', translationKey: 'nav_process', sectionId: 'process' },
    { id: 'nav5', translationKey: 'nav_testimonials', sectionId: 'testimonials' },
    { id: 'nav6', translationKey: 'nav_blog', sectionId: 'blog' },
    { id: 'nav7', translationKey: 'nav_contact', sectionId: 'contact' },
];

const Navigation: React.FC<NavigationProps> = ({ isOpen, onClose, sectionIds }) => {
    const { t, dir } = useTranslations();
    
    const handleLinkClick = (sectionKey: string) => {
        const id = sectionIds[sectionKey];
        if (id) {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }
        onClose();
    };

    return (
        <div
            className={`fixed inset-0 z-50 bg-deep-purple dark:bg-charcoal-black transition-transform duration-500 ease-in-out ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
            style={{ direction: dir }}
        >
            <div className="flex flex-col items-center justify-center h-full">
                <nav>
                    <ul className="flex flex-col items-center space-y-6 text-center">
                        {navLinks.map((link, index) => (
                            <li
                                key={link.id}
                                className="transform transition-all duration-500 ease-out"
                                style={{ 
                                    transitionDelay: `${index * 100}ms`,
                                    transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
                                    opacity: isOpen ? 1 : 0
                                }}
                            >
                                <button
                                    onClick={() => handleLinkClick(link.sectionId)}
                                    className="text-4xl md:text-5xl font-black text-soft-lavender hover:text-neon-lime transition-colors duration-300"
                                >
                                    {t(link.translationKey)}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Navigation;
