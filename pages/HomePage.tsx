import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';
import WhoWeAre from '../components/WhoWeAre';
import Team from '../components/Team';
import About from '../components/About';
import Animation3D from '../components/Animation3D';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import BeforeAfter from '../components/BeforeAfter';
import Journey from '../components/Journey';
import Process from '../components/Process';
import Testimonials from '../components/Testimonials';
import Blog from '../components/Blog';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import LanguageSwitcher from '../components/LanguageSwitcher';
import ThemeSwitcher from '../components/ThemeSwitcher';
import { BrandIcon, WhatsAppIcon } from '../components/icons';
import { useTranslations } from '../hooks/useTranslations';
import Navigation from '../components/Navigation';
import MenuToggle from '../components/MenuToggle';
import { CONTACT_PHONE_NUMBER } from '../config';

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
                href={`https://wa.me/${CONTACT_PHONE_NUMBER}`}
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

export default function HomePage() {
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
            <Helmet>
                <title>Expert Brand Building & Branding Services in Morocco | BrandHUB</title>
                <meta name="description" content="BrandHUB is a leading creative agency in Morocco specializing in brand building, branding, and 3D interactive experiences. We help businesses in Morocco and the Middle East build strong, memorable brands." />

                {/*
                  Hreflang tags are crucial for international SEO.
                  These links tell Google that you have different versions of your page for different languages and regions.
                  You should replace 'https://brand-hub-4o1a.vercel.app' with your actual domain and create these language-specific URLs.
                */}
                <link rel="alternate" href="https://brand-hub-4o1a.vercel.app/en-ma" hreflang="en-MA" />
                <link rel="alternate" href="https://brand-hub-4o1a.vercel.app/fr-ma" hreflang="fr-MA" />
                <link rel="alternate" href="https://brand-hub-4o1a.vercel.app/ar-ma" hreflang="ar-MA" />
                <link rel="alternate" href="https://brand-hub-4o1a.vercel.app/" hreflang="x-default" />

                <script type="application/ld+json">
                    {`
                      {
                        "@context": "https://schema.org",
                        "@type": "Organization",
                        "name": "BrandHUB",
                        "url": "https://brand-hub-4o1a.vercel.app/",
                        "logo": "https://brand-hub-4o1a.vercel.app/logo.png", // Replace with your actual logo URL
                        "contactPoint": {
                          "@type": "ContactPoint",
                          "telephone": "+212-522-000-000", // Replace with your actual phone number
                          "contactType": "customer service"
                        },
                        "address": {
                          "@type": "PostalAddress",
                          "streetAddress": "123 Main Street", // Replace with your actual address
                          "addressLocality": "Casablanca",
                          "addressRegion": "CAS",
                          "postalCode": "20000",
                          "addressCountry": "MA"
                        },
                        "sameAs": [
                          "https://www.facebook.com/your-profile", // Replace with your actual social media URLs
                          "https://www.twitter.com/your-profile",
                          "https://www.linkedin.com/company/your-company"
                        ]
                      }
                    `}
                </script>
            </Helmet>
            <StickyElements onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} isMenuOpen={isMenuOpen} />
            <Navigation isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} sectionIds={sectionIds} />
            <Hero />
            <div id="content" className="relative z-10">
                <WhoWeAre id={sectionIds.whoWeAre} />
                <About />
                <Services id={sectionIds.services} />
                <Process id={sectionIds.process} />
                <Animation3D id={sectionIds.animation} />
                <Portfolio id={sectionIds.portfolio} />
                <BeforeAfter id={sectionIds.beforeAfter} />
                <Testimonials id={sectionIds.testimonials} />
                <Journey sectionIds={sectionIds} />
                <Contact id={sectionIds.contact} />
                <Blog id={sectionIds.blog} />
                <Team id={sectionIds.team} />
                <Footer />
            </div>
        </main>
    );
};
