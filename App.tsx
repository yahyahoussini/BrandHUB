

import React, { useState, lazy } from 'react';
import { TranslationProvider } from './hooks/useTranslations';
import { ThemeProvider } from './hooks/useTheme';
import Hero from './components/Hero';
import LanguageSwitcher from './components/LanguageSwitcher';
import ThemeSwitcher from './components/ThemeSwitcher';
import { BrandIcon, WhatsAppIcon } from './components/icons';
import { useTranslations } from './hooks/useTranslations';
import Navigation from './components/Navigation';
import MenuToggle from './components/MenuToggle';
import LazyComponent from './components/LazyComponent';

const WhoWeAre = lazy(() => import('./components/WhoWeAre'));
const Team = lazy(() => import('./components/Team'));
const About = lazy(() => import('./components/About'));
const Animation3D = lazy(() => import('./components/Animation3D'));
const Services = lazy(() => import('./components/Services'));
const Portfolio = lazy(() => import('./components/Portfolio'));
const BeforeAfter = lazy(() => import('./components/BeforeAfter'));
const Journey = lazy(() => import('./components/Journey'));
const Process = lazy(() => import('./components/Process'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Blog = lazy(() => import('./components/Blog'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

const StickyElements = ({ onMenuToggle, isMenuOpen }: { onMenuToggle: () => void; isMenuOpen: boolean }) => {
    const { t } = useTranslations();
    return (
        <>
            <div 
                className="fixed top-4 left-4 md:top-6 md:left-6 z-50 flex items-center space-x-2 md:space-x-3 cursor-pointer"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                aria-label="Scroll to top"
            >
                <BrandIcon className="w-8 h-8 md:w-10 md:h-10" />
                <span className="font-black text-lg md:text-xl text-charcoal-black dark:text-soft-lavender tracking-tighter">BrandHub</span>
            </div>
            <div className="fixed top-4 right-4 md:top-6 md:right-6 z-[60] flex items-center space-x-2">
                <ThemeSwitcher />
                <LanguageSwitcher />
                <MenuToggle onToggle={onMenuToggle} isOpen={isMenuOpen} />
            </div>
            <a
                href="https://wa.me/212703026422" // Updated WhatsApp number
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('whatsapp_cta')}
                className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 group"
            >
                <div className="relative">
                    <div className="absolute -inset-0.5 bg-neon-lime rounded-full blur-lg opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse-glow"></div>
                    <button className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-neon-lime rounded-full text-charcoal-black transform transition-transform group-hover:scale-110 duration-300">
                        <WhatsAppIcon className="w-7 h-7 md:w-8 md:h-8" />
                    </button>
                </div>
            </a>
        </>
    );
};

const SectionFallback = () => (
    <div className="h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-deep-purple"></div>
    </div>
);

const AppContent = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const sectionIds = {
        whoWeAre: 'who-we-are',
        services: 'services',
        portfolio: 'portfolio',
        process: 'process',
        testimonials: 'testimonials',
        blog: 'blog',
        contact: 'contact',
        team: 'team',
        animation: 'animation',
        beforeAfter: 'before-after',
    };
    
    return (
        <main>
            <StickyElements onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} isMenuOpen={isMenuOpen} />
            <Navigation isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} sectionIds={sectionIds} />
            <Hero />
            <div id="content" className="relative z-10">
                <LazyComponent fallback={<SectionFallback />}>
                    <WhoWeAre id={sectionIds.whoWeAre} />
                </LazyComponent>
                <LazyComponent fallback={<SectionFallback />}>
                    <About />
                </LazyComponent>
                <LazyComponent fallback={<SectionFallback />}>
                    <Services id={sectionIds.services} />
                </LazyComponent>
                <LazyComponent fallback={<SectionFallback />}>
                    <Process id={sectionIds.process} />
                </LazyComponent>
                <LazyComponent fallback={<SectionFallback />}>
                    <Animation3D id={sectionIds.animation} />
                </LazyComponent>
                <LazyComponent fallback={<SectionFallback />}>
                    <Portfolio id={sectionIds.portfolio} />
                </LazyComponent>
                <LazyComponent fallback={<SectionFallback />}>
                    <BeforeAfter id={sectionIds.beforeAfter} />
                </LazyComponent>
                <LazyComponent fallback={<SectionFallback />}>
                    <Testimonials id={sectionIds.testimonials} />
                </LazyComponent>
                <LazyComponent fallback={<SectionFallback />}>
                    <Journey sectionIds={sectionIds} />
                </LazyComponent>
                <LazyComponent fallback={<SectionFallback />}>
                    <Contact id={sectionIds.contact} />
                </LazyComponent>
                <LazyComponent fallback={<SectionFallback />}>
                    <Blog id={sectionIds.blog} />
                </LazyComponent>
                <LazyComponent fallback={<SectionFallback />}>
                    <Team id={sectionIds.team} />
                </LazyComponent>
                <LazyComponent fallback={<SectionFallback />}>
                    <Footer />
                </LazyComponent>
            </div>
        </main>
    );
};


export default function App() {
  return (
    <ThemeProvider>
        <TranslationProvider>
            <AppContent />
        </TranslationProvider>
    </ThemeProvider>
  );
}