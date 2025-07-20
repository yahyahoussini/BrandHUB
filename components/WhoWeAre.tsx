

import React, { useState, useRef } from 'react';
import { useTranslations } from '../hooks/useTranslations';
import type { CoreValue } from '../types';
import { InnovationIcon, PartnershipIcon, ImpactIcon } from './icons';

const valuesData: CoreValue[] = [
  { id: 'innovation', titleKey: 'value_innovation_title', descriptionKey: 'value_innovation_desc', icon: <InnovationIcon /> },
  { id: 'partnership', titleKey: 'value_partnership_title', descriptionKey: 'value_partnership_desc', icon: <PartnershipIcon /> },
  { id: 'impact', titleKey: 'value_impact_title', descriptionKey: 'value_impact_desc', icon: <ImpactIcon /> },
];

const ValueCard: React.FC<{ value: CoreValue }> = ({ value }) => {
    const { t } = useTranslations();
    const cardRef = useRef<HTMLDivElement>(null);
    const [style, setStyle] = useState({});

    const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const { clientX, clientY } = e;
        const { left, top, width, height } = cardRef.current.getBoundingClientRect();
        const x = (clientX - left - width / 2) / 15;
        const y = (clientY - top - height / 2) / 15;
        setStyle({
            transform: `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg) scale3d(1.05, 1.05, 1.05)`,
        });
    };

    const onMouseLeave = () => {
        setStyle({
            transform: `perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)`,
        });
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            style={style}
            className="group relative h-full transition-transform duration-500 ease-out"
        >
            <div className="absolute -inset-px bg-gradient-to-r from-neon-lime via-deep-purple to-neon-lime rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-500 animate-background-pan" style={{ backgroundSize: '200%' }}></div>
            <div className="relative bg-white/50 dark:bg-deep-purple/20 border border-deep-purple/10 dark:border-transparent rounded-2xl p-8 flex flex-col items-center text-center h-full" style={{ transformStyle: 'preserve-3d' }}>
                <div className="text-deep-purple dark:text-neon-lime mb-4 transition-all duration-300 group-hover:text-neon-lime dark:group-hover:text-neon-lime" style={{ transform: 'translateZ(50px)' }}>
                    {React.cloneElement(value.icon, {
                        className: "w-16 h-16 transition-transform duration-300 group-hover:scale-110"
                    })}
                </div>
                <h3 className="text-2xl font-bold text-charcoal-black dark:text-soft-lavender mb-2" style={{ transform: 'translateZ(30px)' }}>{t(value.titleKey)}</h3>
                <p className="text-charcoal-black/80 dark:text-soft-lavender/80" style={{ transform: 'translateZ(20px)' }}>{t(value.descriptionKey)}</p>
            </div>
        </div>
    );
};


const WhoWeAre: React.FC<{ id: string }> = ({ id }) => {
  const { t } = useTranslations();
  return (
    <section id={id} className="relative py-20 md:py-32 bg-soft-lavender/90 dark:bg-charcoal-black/90 backdrop-blur-sm overflow-hidden">
      <div className="absolute inset-0 animated-grid-background opacity-50"></div>
      <div className="relative z-10 container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-charcoal-black dark:text-soft-lavender">
            {t('who_we_are_title')}
          </h2>
          <p className="text-xl md:text-2xl text-neon-lime mt-4 font-bold">{t('who_we_are_subtitle')}</p>
        </div>
        
        <p className="text-lg md:text-xl text-center text-charcoal-black/80 dark:text-soft-lavender/80 max-w-4xl mx-auto mb-16">
            {t('who_we_are_story')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {valuesData.map(value => (
            <ValueCard key={value.id} value={value} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
