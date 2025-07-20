
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useTranslations } from '../hooks/useTranslations';

const BeforeAfter: React.FC<{ id: string }> = ({ id }) => {
    const { t } = useTranslations();
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMove = useCallback((clientX: number) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        const percent = (x / rect.width) * 100;
        setSliderPosition(percent);
    }, []);
    
    const handleInteractionStart = () => {
        setIsDragging(true);
    };

    const handleInteractionEnd = useCallback(() => {
        setIsDragging(false);
    }, []);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if(isDragging) handleMove(e.clientX);
    }, [isDragging, handleMove]);
    
    const handleTouchMove = useCallback((e: TouchEvent) => {
        if(isDragging) handleMove(e.touches[0].clientX);
    }, [isDragging, handleMove]);

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleInteractionEnd);
        window.addEventListener('touchmove', handleTouchMove);
        window.addEventListener('touchend', handleInteractionEnd);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleInteractionEnd);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleInteractionEnd);
        };
    }, [handleMouseMove, handleInteractionEnd, handleTouchMove]);

    return (
        <section id={id} className="py-20 md:py-32 bg-soft-lavender/90 dark:bg-charcoal-black/90">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-charcoal-black dark:text-soft-lavender">
                        {t('before_after_title')}
                    </h2>
                    <p className="text-xl md:text-2xl text-neon-lime mt-4 font-bold">{t('before_after_subtitle')}</p>
                </div>

                <div 
                    ref={containerRef}
                    className="relative w-full max-w-4xl mx-auto aspect-video rounded-2xl overflow-hidden cursor-e-resize select-none border-4 border-deep-purple/20 dark:border-deep-purple/80 shadow-2xl"
                >
                    {/* After Image */}
                    <img 
                        src="asset/Generated Image July 15, 2025 - 12_34PM.jpeg"
                        alt={t('after_label')}
                        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    />

                    {/* Before Image container */}
                    <div
                        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
                        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                    >
                        <img
                            src="https://picsum.photos/seed/beforeeffect/1280/720"
                            alt={t('before_label')}
                            className="absolute inset-0 w-full h-full object-cover pointer-events-none filter grayscale blur-sm"
                        />
                    </div>
                    
                    {/* Labels */}
                    <div className="absolute top-4 left-4 px-4 py-2 bg-charcoal-black/50 text-white font-bold rounded-lg backdrop-blur-sm pointer-events-none opacity-90">
                        {t('before_label')}
                    </div>
                     <div className="absolute top-4 right-4 px-4 py-2 bg-charcoal-black/50 text-white font-bold rounded-lg backdrop-blur-sm pointer-events-none opacity-90">
                        {t('after_label')}
                    </div>

                    {/* Slider Handle */}
                    <div
                        className="absolute top-0 bottom-0 w-1 bg-neon-lime shadow-lg cursor-ew-resize pointer-events-none"
                        style={{ left: `calc(${sliderPosition}% - 2px)` }}
                    >
                        <div
                            onMouseDown={handleInteractionStart}
                            onTouchStart={handleInteractionStart}
                            role="slider"
                            aria-valuenow={sliderPosition}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-label="Before/After Image Slider"
                            className="absolute top-1/2 -translate-y-1/2 -left-5 w-10 h-10 rounded-full bg-neon-lime border-4 border-soft-lavender dark:border-charcoal-black flex items-center justify-center cursor-ew-resize pointer-events-auto shadow-2xl shadow-neon-lime/30 transform hover:scale-110 transition-transform"
                        >
                            <svg className="w-5 h-5 text-charcoal-black rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BeforeAfter;
