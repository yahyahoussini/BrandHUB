
import React, { useState, useRef, useMemo } from 'react';
import { useTranslations } from '../hooks/useTranslations';

const Sparkle: React.FC = () => {
  const style = useMemo(() => {
    const size = Math.random() * 4 + 2;
    const duration = Math.random() * 1 + 0.5;
    const angle = Math.random() * 360;
    const radius = Math.random() * 80 + 50;
    const finalX = Math.cos(angle * Math.PI / 180) * radius;
    const finalY = Math.sin(angle * Math.PI / 180) * radius;
    return {
      width: `${size}px`,
      height: `${size}px`,
      left: '50%',
      top: '50%',
      '--sparkle-end-x': `${finalX}px`,
      '--sparkle-end-y': `${finalY}px`,
      animation: `sparkle-fade-in-out ${duration}s ease-in-out forwards`,
    };
  }, []);

  return <div className="absolute rounded-full bg-neon-lime" style={style}></div>;
};


const Animation3D: React.FC<{ id: string }> = ({ id }) => {
  const { t } = useTranslations();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = event;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((clientX - left) / width - 0.5) * 2;
    const y = ((clientY - top) / height - 0.5) * 2;
    setMousePos({ x, y });
  };
  
  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
    setIsHovering(false);
  };

  return (
    <section id={id} className="relative py-20 md:py-32 bg-soft-lavender/95 dark:bg-charcoal-black/95 overflow-hidden backdrop-blur-sm">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <div className="text-center md:text-left" dir="auto">
            <h2 className="text-4xl md:text-5xl font-black text-charcoal-black dark:text-soft-lavender mb-4">
              {t('animation_title')}
            </h2>
            <p className="text-xl md:text-2xl text-neon-lime mb-6 font-bold">{t('animation_subtitle')}</p>
            <p className="text-lg text-charcoal-black/80 dark:text-soft-lavender/80">
              {t('animation_text')}
            </p>
          </div>
          
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => setIsHovering(true)}
            className="group relative flex items-center justify-center h-80 md:h-96" 
            style={{ perspective: '1200px' }}
          >
            <div 
              className="relative w-64 h-64 md:w-80 md:h-80 animate-float transition-transform duration-300 ease-out group-hover:scale-110" 
              style={{ transformStyle: 'preserve-3d', transform: `rotateX(${-mousePos.y * 10}deg) rotateY(${mousePos.x * 10}deg)` }}
            >
              <div className="absolute inset-0 animate-spin" style={{ transform: `translateZ(${-mousePos.y * 15}px)`, animationDuration: '40s', animationTimingFunction: 'linear' }}>
                <div className="absolute w-full h-full border-2 border-deep-purple/50 rounded-2xl" style={{ transform: 'rotateY(0deg) translateZ(100px)' }}></div>
                <div className="absolute w-full h-full border-2 border-deep-purple/50 rounded-2xl" style={{ transform: 'rotateY(60deg) translateZ(100px)' }}></div>
                <div className="absolute w-full h-full border-2 border-deep-purple/50 rounded-2xl" style={{ transform: 'rotateY(120deg) translateZ(100px)' }}></div>
              </div>
              <div className="absolute inset-12 animate-spin" style={{ transform: `translateZ(${mousePos.x * 20}px)`, animationDuration: '30s', animationDirection: 'reverse', animationTimingFunction: 'linear' }}>
                <div className="absolute w-full h-full border-2 border-neon-lime/50 rounded-full" style={{ transform: 'rotateX(70deg) rotateZ(20deg) ' }}></div>
                <div className="absolute w-full h-full border-2 border-neon-lime/50 rounded-full" style={{ transform: 'rotateX(70deg) rotateZ(140deg)' }}></div>
              </div>
              <div className="absolute inset-8 animate-spin group-hover:animate-pulse" style={{ transform: `translateZ(${-mousePos.x * 10}px)`, animationDuration: '25s', animationDirection: 'reverse', animationTimingFunction: 'ease-in-out' }}>
                <div className="w-full h-full bg-neon-lime/20 rounded-full shadow-2xl shadow-neon-lime/30 flex items-center justify-center transition-all duration-500 group-hover:bg-neon-lime/40">
                    <div className="w-1/2 h-1/2 bg-neon-lime rounded-full blur-xl group-hover:blur-2xl transition-all"></div>
                </div>
              </div>
               <div className="absolute inset-20" style={{ transform: `translateZ(${mousePos.y * 25}px)` }}>
                <div className="w-full h-full bg-deep-purple rounded-full shadow-2xl shadow-deep-purple/50 transition-transform duration-500 group-hover:scale-125">
                   {isHovering && Array.from({ length: 15 }).map((_, i) => <Sparkle key={i} />)}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      <div className="absolute top-0 left-0 -translate-x-1/3 -translate-y-1/3 w-96 h-96 bg-deep-purple/30 rounded-full filter blur-3xl opacity-30 dark:opacity-50"></div>
      <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-96 h-96 bg-neon-lime/20 rounded-full filter blur-3xl opacity-20 dark:opacity-30"></div>
    </section>
  );
};

export default Animation3D;
