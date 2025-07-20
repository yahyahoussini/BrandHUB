import React, { useState, useRef } from 'react';
import { useTranslations } from '../hooks/useTranslations';
import type { TeamMember } from '../types';

const teamData: TeamMember[] = [
  { id: 'tm1', nameKey: 'yahya_name', roleKey: 'yahya_role', photoUrl: 'https://i.pravatar.cc/300?u=yahya' },
  { id: 'tm2', nameKey: 'ayoub_name', roleKey: 'ayoub_role', photoUrl: 'https://i.pravatar.cc/300?u=ayoub' },
];

const TeamMemberCard: React.FC<{ member: TeamMember }> = ({ member }) => {
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
            className="group relative transition-transform duration-500 ease-out"
        >
            <div className="absolute -inset-px bg-gradient-to-r from-neon-lime via-deep-purple to-neon-lime rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-500 animate-background-pan" style={{ backgroundSize: '200%' }}></div>
            <div
                className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden"
                style={{ transformStyle: 'preserve-3d' }}
            >
                <img 
                    src={member.photoUrl} 
                    alt={t(member.nameKey)} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500"
                    style={{ transform: 'translateZ(-20px) scale(1.15)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-black/90 via-charcoal-black/40 to-transparent" style={{ transform: 'translateZ(0px)' }}></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white text-center" style={{ transform: 'translateZ(40px)' }}>
                    <div className="transition-all duration-500 transform translate-y-10 group-hover:translate-y-0">
                        <h3 className="text-2xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">{t(member.nameKey)}</h3>
                        <p className="text-neon-lime opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-300">{t(member.roleKey)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};


const Team: React.FC<{ id: string }> = ({ id }) => {
  const { t } = useTranslations();
  return (
    <section id={id} className="py-20 md:py-32 bg-soft-lavender dark:bg-charcoal-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-charcoal-black dark:text-soft-lavender">
            {t('team_title')}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {teamData.map(member => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;