
import React from 'react';
import { useTranslations } from '../hooks/useTranslations';

interface JourneyProps {
    sectionIds: {
        services: string;
        portfolio: string;
        contact: string;
        blog: string;
    };
}

const Journey: React.FC<JourneyProps> = ({ sectionIds }) => {
    const { t } = useTranslations();

    const scrollToSection = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const paths = [
        { key: 'journey_path1', targetId: sectionIds.services },
        { key: 'journey_path2', targetId: sectionIds.portfolio },
        { key: 'journey_path4', targetId: sectionIds.blog },
        { key: 'journey_path3', targetId: sectionIds.contact },
    ];

    return (
        <section className="py-20 md:py-32 bg-soft-lavender/95 dark:bg-charcoal-black/95">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl md:text-5xl font-black text-charcoal-black dark:text-soft-lavender mb-4">{t('journey_title')}</h2>
                <p className="text-lg md:text-xl text-charcoal-black/80 dark:text-soft-lavender/80 max-w-3xl mx-auto mb-16">{t('journey_desc')}</p>
                <div className="flex flex-col md:flex-row justify-center items-center gap-8">
                    {paths.map((path, index) => (
                        <React.Fragment key={path.key}>
                            <button
                                onClick={() => scrollToSection(path.targetId)}
                                className="w-full md:w-auto text-center px-8 py-6 bg-white/50 dark:bg-deep-purple/30 border-2 border-deep-purple/20 dark:border-deep-purple rounded-2xl backdrop-blur-sm transition-all duration-300 ease-in-out hover:bg-deep-purple hover:border-neon-lime hover:scale-105 hover:-translate-y-2 group"
                            >
                                <span className="text-xl font-bold text-deep-purple dark:text-soft-lavender group-hover:text-neon-lime transition-colors duration-300">{t(path.key)}</span>
                            </button>
                            {index < paths.length - 1 && (
                                <div className="hidden md:block w-16 h-1 bg-deep-purple/20 dark:bg-deep-purple/50 rounded-full"></div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Journey;