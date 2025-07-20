
import React, { useState, useRef } from 'react';
import type { Project } from '../types';
import { useTranslations } from '../hooks/useTranslations';

const portfolioData: Project[] = [
  { id: 'p1', titleKey: 'project_1_title', categoryKey: 'project_1_cat', image: 'https://picsum.photos/seed/p1/600/600' },
  { id: 'p2', titleKey: 'project_2_title', categoryKey: 'project_2_cat', image: 'https://picsum.photos/seed/p2/600/600' },
  { id: 'p3', titleKey: 'project_3_title', categoryKey: 'project_3_cat', image: 'https://picsum.photos/seed/p3/600/600' },
  { id: 'p4', titleKey: 'project_4_title', categoryKey: 'project_4_cat', image: 'https://picsum.photos/seed/p4/600/600' },
];

const OfficeAnimation: React.FC = () => (
    <div className="relative mx-auto mt-12 w-64 h-48">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-40">
            {/* Desk */}
            <div className="absolute bottom-0 w-full h-2 bg-charcoal-black/80 dark:bg-deep-purple/80 rounded-t-sm"></div>
            <div className="absolute bottom-0 left-2 w-2 h-24 bg-charcoal-black/80 dark:bg-deep-purple/80"></div>
            <div className="absolute bottom-0 right-2 w-2 h-24 bg-charcoal-black/80 dark:bg-deep-purple/80"></div>

            {/* Chair */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-12 bg-charcoal-black/70 dark:bg-soft-lavender/20 rounded-t-lg"></div>
            <div className="absolute bottom-0 left-1/2 -translate-x-[18px] w-2 h-8 bg-charcoal-black/70 dark:bg-soft-lavender/20"></div>

            {/* Person */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-12 h-16 bg-deep-purple dark:bg-soft-lavender/80 rounded-t-full animate-typing" style={{ animationDelay: '0.2s' }}>
                {/* Head */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-10 h-10 bg-deep-purple dark:bg-soft-lavender/80 rounded-full animate-head-bob">
                    <div className="absolute top-3 left-1 w-5 h-2 bg-charcoal-black/20 dark:bg-charcoal-black/40 rounded-full"></div> {/* Hair */}
                </div>
            </div>

            {/* Computer */}
            <div className="absolute bottom-2 left-1/2 -translate-x-[calc(50%+12px)] w-28 h-20">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-charcoal-black/40 dark:bg-soft-lavender/40 rounded-sm"></div>
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-2 h-4 bg-charcoal-black/40 dark:bg-soft-lavender/40"></div>
                <div className="absolute bottom-5 w-full h-16 bg-charcoal-black/90 dark:bg-charcoal-black rounded-lg border-2 border-charcoal-black/50 dark:border-soft-lavender/20">
                    <div className="w-full h-full bg-neon-lime/10 dark:bg-neon-lime/20 animate-screen-flicker p-2">
                        <div className="w-3/4 h-1 bg-neon-lime/50 rounded-full mb-2"></div>
                        <div className="w-1/2 h-1 bg-neon-lime/50 rounded-full mb-2"></div>
                        <div className="w-2/3 h-1 bg-neon-lime/50 rounded-full"></div>
                    </div>
                </div>
            </div>

            {/* Coffee Cup */}
            <div className="absolute bottom-2 right-4 w-6 h-8">
                <div className="absolute bottom-0 w-full h-6 bg-white dark:bg-deep-purple/50 rounded-sm border-2 border-charcoal-black/50 dark:border-soft-lavender/50"></div>
                <div className="absolute top-1/2 -translate-y-1/2 -right-1.5 w-2 h-3 border-2 border-charcoal-black/50 dark:border-soft-lavender/50 rounded-r-full"></div>
                {/* Steam */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-1 h-3 bg-white/50 dark:bg-soft-lavender/30 rounded-full animate-steam-rise" style={{ animationDelay: '0s' }}></div>
                <div className="absolute -top-3 left-1/2 -translate-x-1/4 w-1 h-3 bg-white/50 dark:bg-soft-lavender/30 rounded-full animate-steam-rise" style={{ animationDelay: '1s' }}></div>
                <div className="absolute -top-2 left-1/2 -translate-x-3/4 w-1 h-2 bg-white/50 dark:bg-soft-lavender/30 rounded-full animate-steam-rise" style={{ animationDelay: '2s' }}></div>
            </div>
        </div>
    </div>
);


const PortfolioCard: React.FC<{ project: Project }> = ({ project }) => {
  const { t } = useTranslations();
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({});

    const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const { clientX, clientY } = e;
        const { left, top, width, height } = cardRef.current.getBoundingClientRect();
        const x = (clientX - left - width / 2) / 20;
        const y = (clientY - top - height / 2) / 20;
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
      className="group relative cursor-pointer transition-transform duration-500 ease-out"
    >
      <div className="absolute -inset-px bg-gradient-to-r from-neon-lime to-deep-purple rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-500 animate-background-pan" style={{ backgroundSize: '200%' }}></div>
      <div 
        className="relative w-full aspect-square rounded-2xl overflow-hidden"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <img src={project.image} alt={t(project.titleKey)} className="absolute w-full h-full object-cover transition-transform duration-500" style={{ transform: 'translateZ(-20px) scale(1.15)' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-black/80 to-transparent flex flex-col justify-end p-8">
          <h3 className="text-3xl font-bold text-soft-lavender transition-transform duration-500" style={{ transform: 'translateZ(40px)' }}>{t(project.titleKey)}</h3>
          <p className="text-neon-lime transition-transform duration-500" style={{ transform: 'translateZ(20px)' }}>{t(project.categoryKey)}</p>
        </div>
      </div>
    </div>
  );
};

const Portfolio: React.FC<{ id: string }> = ({ id }) => {
  const { t } = useTranslations();
  return (
    <section id={id} className="py-20 md:py-32 bg-soft-lavender dark:bg-charcoal-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-charcoal-black dark:text-soft-lavender">
            {t('portfolio_title')}
          </h2>
          <OfficeAnimation />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {portfolioData.map(project => (
            <PortfolioCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
