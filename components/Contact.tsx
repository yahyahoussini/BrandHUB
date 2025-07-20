

import React, { useState } from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { CheckIcon } from './icons';

const FloatingLabelInput: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label: string }> = ({ label, ...props }) => {
    const id = props.id || props.name || 'input';
    return (
        <div className="relative">
            <input
                {...props}
                id={id}
                placeholder=" "
                className="block w-full px-4 py-3 bg-soft-lavender/50 dark:bg-charcoal-black/50 border-2 border-deep-purple/50 rounded-lg appearance-none focus:outline-none focus:ring-0 focus:border-neon-lime peer transition-all duration-300 text-charcoal-black dark:text-soft-lavender focus:shadow-2xl focus:shadow-neon-lime/20"
            />
            <label
                htmlFor={id}
                className="absolute text-charcoal-black/70 dark:text-soft-lavender/70 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white/50 dark:bg-charcoal-black/50 px-2 peer-focus:px-2 peer-focus:text-neon-lime peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
                {label}
            </label>
        </div>
    );
};

const FloatingLabelTextarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }> = ({ label, ...props }) => {
    const id = props.id || props.name || 'textarea';
    return (
        <div className="relative">
            <textarea
                {...props}
                id={id}
                rows={5}
                placeholder=" "
                className="block w-full px-4 py-3 bg-soft-lavender/50 dark:bg-charcoal-black/50 border-2 border-deep-purple/50 rounded-lg appearance-none focus:outline-none focus:ring-0 focus:border-neon-lime peer transition-all duration-300 text-charcoal-black dark:text-soft-lavender focus:shadow-2xl focus:shadow-neon-lime/20"
            />
            <label
                htmlFor={id}
                className="absolute text-charcoal-black/70 dark:text-soft-lavender/70 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white/50 dark:bg-charcoal-black/50 px-2 peer-focus:px-2 peer-focus:text-neon-lime peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-6 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
                {label}
            </label>
        </div>
    );
};

const Contact: React.FC<{ id: string }> = ({ id }) => {
    const { t } = useTranslations();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
        
        const whatsAppNumber = '212703026422';
        const messageBody = `
${t('form_name')}: ${name}
${t('form_email')}: ${email}
${t('form_message')}: ${message}
        `.trim();
        const encodedMessage = encodeURIComponent(messageBody);
        const url = `https://wa.me/${whatsAppNumber}?text=${encodedMessage}`;

        setTimeout(() => {
            window.open(url, '_blank', 'noopener,noreferrer');
        }, 800);
    };

    return (
        <section id={id} className="py-20 md:py-32 bg-soft-lavender/95 dark:bg-charcoal-black/95">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-charcoal-black dark:text-soft-lavender">
                        {t('contact_title')}
                    </h2>
                    <p className="text-xl md:text-2xl text-neon-lime mt-4 font-bold">{t('contact_subtitle')}</p>
                </div>
                
                <div className="relative w-full max-w-lg mx-auto h-96" style={{ perspective: '1200px' }}>
                    <form
                        onSubmit={handleSubmit}
                        className={`w-full space-y-6 transition-all duration-500 bg-white/50 dark:bg-charcoal-black/50 p-8 rounded-2xl border border-deep-purple/20 dark:border-deep-purple/50 ${isSubmitted ? 'animate-flip-out' : ''}`}
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        <FloatingLabelInput label={t('form_name')} name="name" type="text" value={name} onChange={e => setName(e.target.value)} required />
                        <FloatingLabelInput label={t('form_email')} name="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                        <FloatingLabelTextarea label={t('form_message')} name="message" value={message} onChange={e => setMessage(e.target.value)} required />
                        <button type="submit" className="w-full group relative overflow-hidden bg-deep-purple text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
                             <span className="absolute inset-0 animated-gradient-border opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-background-pan"></span>
                             <span className="relative">{t('form_submit')}</span>
                        </button>
                    </form>
                    
                    {isSubmitted && (
                         <div className="absolute inset-0 flex flex-col items-center justify-center bg-deep-purple p-8 rounded-2xl animate-fly-in opacity-0">
                            <CheckIcon className="w-20 h-20 text-neon-lime mb-4" />
                            <h3 className="text-3xl font-bold text-neon-lime mb-2">{t('contact_success_title')}</h3>
                            <p className="text-soft-lavender text-center">{t('contact_success_subtitle')}</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Contact;