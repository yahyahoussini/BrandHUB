
import React, { useMemo } from 'react';
import type { Service } from '../types';
import { useTranslations } from '../hooks/useTranslations';
import { 
    BrandingIcon, 
    WebCreationIcon, 
    VideoCreationIcon, 
    SocialMediaIcon, 
    AdCreationIcon, 
    AdManagementIcon, 
    SeoIcon, 
    StrategyIcon,
    Design3DIcon
} from './icons';

const servicesData: Service[] = [
  { id: 'branding', titleKey: 'service_branding_title', descriptionKey: 'service_branding_desc', icon: <BrandingIcon /> },
  { id: 'web_creation', titleKey: 'service_web_creation_title', descriptionKey: 'service_web_creation_desc', icon: <WebCreationIcon /> },
  { id: '3d', titleKey: 'service_3d_title', descriptionKey: 'service_3d_desc', icon: <Design3DIcon /> },
  { id: 'video_creation', titleKey: 'service_video_creation_title', descriptionKey: 'service_video_creation_desc', icon: <VideoCreationIcon /> },
  { id: 'social_media', titleKey: 'service_social_media_title', descriptionKey: 'service_social_media_desc', icon: <SocialMediaIcon /> },
  { id: 'ad_creation', titleKey: 'service_ad_creation_title', descriptionKey: 'service_ad_creation_desc', icon: <AdCreationIcon /> },
  { id: 'ad_management', titleKey: 'service_ad_management_title', descriptionKey: 'service_ad_management_desc', icon: <AdManagementIcon /> },
  { id: 'seo', titleKey: 'service_seo_title', descriptionKey: 'service_seo_desc', icon: <SeoIcon /> },
  { id: 'strategy', titleKey: 'service_strategy_title', descriptionKey: 'service_strategy_desc', icon: <StrategyIcon /> },
];

const Particle: React.FC<{ style: React.CSSProperties }> = ({ style }) => (
    <div className="absolute rounded-full bg-deep-purple/50 dark:bg-neon-lime/30 animate-particle-drift" style={style}></div>
);

const ParticleBackground: React.FC = React.memo(() => {
    const particles = useMemo(() => {
        const particleArray = [];
        const numParticles = 50;
        for (let i = 0; i < numParticles; i++) {
            const size = Math.random() * 3 + 1;
            const style: React.CSSProperties & { [key: string]: any } = {
                width: `${size}px`,
                height: `${size}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 20 + 15}s`,
                animationDelay: `-${Math.random() * 20}s`,
                '--particle-end-x': `${(Math.random() - 0.5) * 50}px`,
                '--particle-end-y': `${-Math.random() * 150}px`
            };
            particleArray.push(<Particle key={i} style={style} />);
        }
        return particleArray;
    }, []);

    return <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">{particles}</div>;
});

const ServiceCard: React.FC<{ service: Service }> = ({ service }) => {
  const { t } = useTranslations();

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const whatsAppNumber = '212703026422';
    const serviceName = t(service.titleKey);
    const messageBody = `${t('whatsapp_service_inquiry')} ${serviceName}.`;
    const encodedMessage = encodeURIComponent(messageBody);
    const url = `https://wa.me/${whatsAppNumber}?text=${encodedMessage}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="group perspective w-full h-80">
      <div
        className="relative w-full h-full preserve-3d transition-transform duration-700 ease-in-out group-hover:rotate-y-180"
      >
        {/* FRONT */}
        <div className="absolute w-full h-full backface-hidden bg-white/50 dark:bg-deep-purple/20 border border-deep-purple/10 dark:border-transparent rounded-2xl p-8 flex flex-col items-center justify-center text-center">
          <div className="mb-4 text-deep-purple dark:text-neon-lime">
            {React.cloneElement(service.icon, { className: 'w-16 h-16' })}
          </div>
          <h3 className="text-2xl font-bold text-charcoal-black dark:text-soft-lavender">{t(service.titleKey)}</h3>
        </div>
        
        {/* BACK */}
        <div className="absolute w-full h-full backface-hidden bg-deep-purple dark:bg-charcoal-black/90 border border-neon-lime/20 rounded-2xl p-6 flex flex-col items-center justify-between text-center rotate-y-180">
          <p className="text-soft-lavender/90">{t(service.descriptionKey)}</p>
          <button
            onClick={handleWhatsAppClick}
            className="mt-4 bg-neon-lime text-charcoal-black font-bold py-3 px-6 rounded-full transition-transform duration-300 transform hover:scale-105"
          >
            {t('service_cta_whatsapp')}
          </button>
        </div>
      </div>
    </div>
  );
};

const Services: React.FC<{ id: string }> = ({ id }) => {
    const { t } = useTranslations();
    return (
        <section id={id} className="relative py-20 md:py-32 bg-soft-lavender dark:bg-charcoal-black overflow-hidden">
            <ParticleBackground />
            <div className="relative z-10 container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-charcoal-black dark:text-soft-lavender">
                        {t('services_title')}
                    </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {servicesData.map(service => (
                        <ServiceCard key={service.id} service={service} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;