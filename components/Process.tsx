
import React, { useState, useRef } from 'react';
import { useTranslations } from '../hooks/useTranslations';
import type { ProcessStep } from '../types';
import { DiscoveryIcon, DesignIcon, DevelopmentIcon, LaunchIcon } from './icons';

const processStepsData: ProcessStep[] = [
  { id: 'discover', titleKey: 'process_step1_title', descriptionKey: 'process_step1_desc', icon: <DiscoveryIcon /> },
  { id: 'design', titleKey: 'process_step2_title', descriptionKey: 'process_step2_desc', icon: <DesignIcon /> },
  { id: 'develop', titleKey: 'process_step3_title', descriptionKey: 'process_step3_desc', icon: <DevelopmentIcon /> },
  { id: 'launch', titleKey: 'process_step4_title', descriptionKey: 'process_step4_desc', icon: <LaunchIcon /> },
];

const ProcessStepCard: React.FC<{ step: ProcessStep }> = ({ step }) => {
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
            className="group relative flex flex-col items-center text-center p-4 z-10 transition-transform duration-500 ease-out"
        >
             <div className="absolute -inset-px bg-gradient-to-r from-neon-lime to-deep-purple rounded-full blur-lg opacity-0 group-hover:opacity-50 transition duration-500 animate-background-pan" style={{ backgroundSize: '200%', top: '0', height: '6rem' }}></div>
            <div className="relative flex items-center justify-center w-24 h-24 bg-soft-lavender dark:bg-charcoal-black rounded-full border-4 border-deep-purple/30 dark:border-deep-purple transition-all duration-300" style={{ transformStyle: 'preserve-3d' }}>
                <div style={{ transform: 'translateZ(30px)' }}>
                    {React.cloneElement(step.icon, {
                        className: "w-12 h-12 text-deep-purple dark:text-soft-lavender transition-colors duration-300 group-hover:text-neon-lime"
                    })}
                </div>
            </div>
            <div className="mt-6">
                <h3 className="text-xl font-bold text-charcoal-black dark:text-soft-lavender mb-2">{t(step.titleKey)}</h3>
                <p className="text-charcoal-black/80 dark:text-soft-lavender/80 max-w-xs mx-auto">{t(step.descriptionKey)}</p>
            </div>
        </div>
    );
};

const Process: React.FC<{ id: string }> = ({ id }) => {
  const { t } = useTranslations();
  return (
    <section id={id} className="py-20 md:py-32 bg-soft-lavender dark:bg-charcoal-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-charcoal-black dark:text-soft-lavender">
            {t('process_title')}
          </h2>
          <p className="text-xl md:text-2xl text-neon-lime mt-4 font-bold">{t('process_subtitle')}</p>
        </div>

        <div className="relative">
             {/* Timeline Connector for desktop */}
             <div className="hidden md:block absolute top-12 left-0 w-full h-1 bg-deep-purple/30 dark:bg-deep-purple/70"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-16 md:gap-x-8">
                {processStepsData.map((step) => (
                    <ProcessStepCard key={step.id} step={step} />
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
