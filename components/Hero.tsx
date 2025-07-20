import React, { useState, useEffect, useMemo } from 'react';
import { useTranslations } from '../hooks/useTranslations';

const Star = ({ style }: { style: React.CSSProperties }) => (
    <div className="absolute rounded-full bg-soft-lavender/70 animate-pulse" style={style}></div>
);

const Planet = ({ style, colorClass }: { style: React.CSSProperties, colorClass: string }) => (
     <div className={`absolute rounded-full ${colorClass} filter blur-xl opacity-40 dark:opacity-60 animate-float`} style={style}></div>
);

const CelestialBackground = React.memo(() => {
    const elements = useMemo(() => {
        const els = [];
        // Stars
        for (let i = 0; i < 80; i++) {
            const size = Math.random() * 2 + 0.5;
            const style = {
                width: `${size}px`,
                height: `${size}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 3 + 2}s`,
                animationDelay: `${Math.random() * 3}s`,
            };
            els.push(<Star key={`star-${i}`} style={style} />);
        }
        // Planets
        const planets = [
            { size: '250px', top: '15%', left: '10%', color: 'bg-deep-purple', duration: '15s' },
            { size: '150px', top: '65%', left: '80%', color: 'bg-neon-lime', duration: '12s' },
            { size: '200px', top: '75%', left: '20%', color: 'bg-deep-purple', duration: '18s' },
        ];
        planets.forEach((p, i) => {
            const style:React.CSSProperties = {
                width: p.size,
                height: p.size,
                top: p.top,
                left: p.left,
                animationDuration: p.duration,
                animationDelay: `-${i * 5}s`
            };
             els.push(<Planet key={`planet-${i}`} style={style} colorClass={p.color} />);
        });

        return els;
    }, []);

    return <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">{elements}</div>;
});


const Hero: React.FC = () => {
  const { t } = useTranslations();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 2; // -1 to 1
      const y = (clientY / innerHeight - 0.5) * 2; // -1 to 1
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const parallaxStyle = (factor: number) => ({
    transform: `translate3d(${mousePos.x * factor}px, ${mousePos.y * factor}px, 0)`
  });

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-soft-lavender dark:bg-charcoal-black text-charcoal-black dark:text-soft-lavender" style={{ perspective: '1000px' }}>
      <div className="absolute inset-0 z-0">
        <CelestialBackground />
      </div>
      
      <div className="absolute z-10 w-64 h-64 animate-float animation-delay-[-1s]" style={{ ...parallaxStyle(-20), transformStyle: 'preserve-3d' }}>
         {/* Outer Rings */}
        <div className="absolute inset-0 rounded-full border-2 border-deep-purple/50 animate-spin" style={{ animationDuration: '20s', animationTimingFunction: 'linear' }}></div>
        <div className="absolute inset-4 rounded-full border border-deep-purple/30 animate-spin" style={{ animationDuration: '25s', animationDirection: 'reverse', animationTimingFunction: 'linear', transform: 'rotateY(60deg)' }}></div>
        {/* Inner Rings */}
        <div className="absolute inset-8 rounded-full border-2 border-neon-lime/50 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse', transform: 'rotateX(70deg)' }}></div>
        <div className="absolute inset-12 rounded-full border border-neon-lime/30 animate-spin" style={{ animationDuration: '18s', animationTimingFunction: 'linear', transform: 'rotateX(70deg) rotateZ(45deg)' }}></div>
        {/* Core */}
        <div className="absolute inset-20 rounded-full bg-neon-lime/20 animate-pulse-glow" style={{ transform: 'translateZ(-10px)'}}>
            <div className="w-full h-full rounded-full bg-deep-purple/50 shadow-inner"></div>
        </div>
      </div>

      <div className="relative z-20 text-center transition-transform duration-300 ease-out" style={{ transformStyle: 'preserve-3d', transform: `rotateX(${mousePos.y * -5}deg) rotateY(${mousePos.x * 5}deg)` }}>
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter"
            style={{ 
                transformStyle: 'preserve-3d',
                textShadow: `${mousePos.x * 15}px ${mousePos.y * 15}px 20px rgba(50, 48, 53, 0.6)`
            }}>
          <span className="block" style={{ transform: 'translateZ(20px)' }}>{t('hero_line1')}</span>
          <span className="block text-deep-purple" style={{ transform: 'translateZ(60px)' }}>{t('hero_line2')}</span>
          <span className="block text-neon-lime text-glow-and-lift" style={{ transform: 'translateZ(100px)' }}>{t('hero_line3')}</span>
        </h1>
        <p className="mt-4 text-xl md:text-2xl font-bold text-charcoal-black dark:text-soft-lavender tracking-wider" style={{ transform: 'translateZ(50px)' }}>
            {t('hero_subtitle')}
        </p>
      </div>
      
      <div className="absolute bottom-10 z-30 flex flex-col items-center animate-bounce">
        <span className="text-neon-lime uppercase tracking-widest text-sm animate-text-shimmer">{t('scroll_enter')}</span>
        <svg className="w-6 h-6 text-neon-lime mt-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
      </div>
    </section>
  );
};

export default Hero;