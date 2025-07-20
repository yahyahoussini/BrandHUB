
import React, { useState, useRef, useEffect } from 'react';
import { useTranslations } from '../hooks/useTranslations';
import type { Testimonial } from '../types';
import { PlayIcon, QuoteIcon, CloseIcon } from './icons';

const testimonialsData: Testimonial[] = [
  {
    id: 't1',
    type: 'quote',
    nameKey: 'client1_name',
    companyKey: 'client1_company',
    quoteKey: 'client1_quote',
    photoUrl: 'https://i.pravatar.cc/150?u=amina',
    logoUrl: 'https://logo.clearbit.com/aura.com'
  },
  {
    id: 't2',
    type: 'video',
    nameKey: 'video_client_name',
    companyKey: 'video_client_company',
    photoUrl: 'https://picsum.photos/seed/video-thumb/500/300',
    videoId: 'dQw4w9WgXcQ' // Example YouTube Video ID
  },
  {
    id: 't3',
    type: 'quote',
    nameKey: 'client2_name',
    companyKey: 'client2_company',
    quoteKey: 'client2_quote',
    photoUrl: 'https://i.pravatar.cc/150?u=youssef',
    logoUrl: 'https://logo.clearbit.com/tech-innov.io'
  },
   {
    id: 't4',
    type: 'quote',
    nameKey: 'client3_name',
    companyKey: 'client3_company',
    quoteKey: 'client3_quote',
    photoUrl: 'https://i.pravatar.cc/150?u=fatima',
    logoUrl: 'https://logo.clearbit.com/novastyle.com'
  },
];

const VideoModal: React.FC<{ videoId: string; onClose: () => void }> = ({ videoId, onClose }) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'auto';
        };
    }, [onClose]);

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal-black/90 backdrop-blur-sm animate-fly-in"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <div className="relative w-full max-w-4xl aspect-video m-4" onClick={e => e.stopPropagation()}>
                <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg shadow-2xl shadow-neon-lime/20"
                ></iframe>
                 <button 
                    onClick={onClose} 
                    className="absolute -top-4 -right-4 w-10 h-10 flex items-center justify-center bg-charcoal-black/50 text-white rounded-full hover:bg-neon-lime hover:text-charcoal-black transition-colors duration-300 border-2 border-soft-lavender"
                    aria-label="Close video"
                >
                    <CloseIcon />
                </button>
            </div>
        </div>
    );
};

const TestimonialCard: React.FC<{ testimonial: Testimonial; onVideoClick: (videoId: string) => void }> = ({ testimonial, onVideoClick }) => {
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
            transform: `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg) scale3d(1.02, 1.02, 1.02)`,
        });
    };

    const onMouseLeave = () => {
        setStyle({
            transform: `perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)`,
        });
    };

    if (testimonial.type === 'video') {
        return (
            <div 
                className="group relative w-full h-[22rem] rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => testimonial.videoId && onVideoClick(testimonial.videoId)}
            >
                <img src={testimonial.photoUrl} alt={`Video testimonial from ${t(testimonial.nameKey)}`} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-charcoal-black/40 group-hover:bg-charcoal-black/60 transition-colors duration-300 flex flex-col items-center justify-center p-6">
                    <div className="w-20 h-20 flex items-center justify-center bg-neon-lime/80 rounded-full text-charcoal-black group-hover:scale-110 group-hover:bg-neon-lime transition-all duration-300">
                        <PlayIcon className="w-10 h-10 ml-1" />
                    </div>
                    <div className="absolute bottom-6 text-center text-white">
                        <p className="font-bold text-xl">{t(testimonial.nameKey)}</p>
                        <p className="text-md opacity-80">{t(testimonial.companyKey)}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div 
            ref={cardRef}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            style={style}
            className="group relative w-full h-[22rem] transition-transform duration-500 ease-out">
            <div className="absolute -inset-px bg-gradient-to-r from-neon-lime via-deep-purple to-neon-lime rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-500 animate-background-pan" style={{ backgroundSize: '200%' }}></div>
            <div className="relative w-full h-full bg-white/70 dark:bg-deep-purple/20 border border-deep-purple/10 dark:border-transparent rounded-2xl flex flex-col items-center text-center p-6 overflow-hidden" style={{ transformStyle: 'preserve-3d' }}>
                <div className="absolute top-6 right-6 w-16 h-16 text-deep-purple/10 dark:text-soft-lavender/10" style={{ transform: 'translateZ(10px)' }}>
                    <QuoteIcon className="w-full h-full" />
                </div>
                <div className="relative z-10 flex-grow flex items-center" style={{ transform: 'translateZ(40px)' }}>
                    <p className="text-lg italic text-charcoal-black/90 dark:text-soft-lavender/90">"{t(testimonial.quoteKey!)}"</p>
                </div>
                <div className="relative z-10 flex items-center mt-6 pt-6 border-t border-deep-purple/10 dark:border-soft-lavender/10 w-full" style={{ transform: 'translateZ(20px)' }}>
                    <img src={testimonial.photoUrl} alt={t(testimonial.nameKey)} className="w-14 h-14 rounded-full object-cover border-2 border-deep-purple dark:border-neon-lime" />
                    <div className="ml-4 text-left">
                        <p className="font-bold text-charcoal-black dark:text-soft-lavender">{t(testimonial.nameKey)}</p>
                        <p className="text-sm text-charcoal-black/70 dark:text-soft-lavender/70">{t(testimonial.companyKey)}</p>
                    </div>
                    {testimonial.logoUrl && <img src={testimonial.logoUrl} alt={`${t(testimonial.companyKey)} logo`} className="w-10 h-10 ml-auto object-contain filter grayscale dark:invert-[0.9] dark:brightness-200 opacity-60" />}
                </div>
            </div>
        </div>
    );
};


const Testimonials: React.FC<{ id: string }> = ({ id }) => {
    const { t } = useTranslations();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentVideoId, setCurrentVideoId] = useState<string | null>(null);

    const handleVideoClick = (videoId: string) => {
        setCurrentVideoId(videoId);
        setIsModalOpen(true);
    };

    return (
        <section id={id} className="py-20 md:py-32 bg-soft-lavender dark:bg-charcoal-black">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-charcoal-black dark:text-soft-lavender">
                        {t('testimonials_title')}
                    </h2>
                    <p className="text-xl md:text-2xl text-neon-lime mt-4 font-bold">{t('testimonials_subtitle')}</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {testimonialsData.map(testimonial => (
                        <TestimonialCard key={testimonial.id} testimonial={testimonial} onVideoClick={handleVideoClick} />
                    ))}
                </div>
            </div>
            {isModalOpen && currentVideoId && <VideoModal videoId={currentVideoId} onClose={() => setIsModalOpen(false)} />}
        </section>
    );
};

export default Testimonials;