
import React from 'react';

interface MenuToggleProps {
    onToggle: () => void;
    isOpen: boolean;
}

const MenuToggle: React.FC<MenuToggleProps> = ({ onToggle, isOpen }) => {
    return (
        <button
            onClick={onToggle}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            className="flex items-center justify-center w-10 h-10 p-2 rounded-full transition-colors duration-300 bg-white/50 dark:bg-charcoal-black/50 backdrop-blur-sm text-charcoal-black dark:text-soft-lavender hover:bg-black/10 dark:hover:bg-white/10 border border-charcoal-black/10 dark:border-soft-lavender/20"
        >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span
                    className={`block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${
                        isOpen ? 'rotate-45 translate-y-px' : '-translate-y-1'
                    }`}
                ></span>
                <span
                    className={`block h-0.5 w-6 bg-current mt-1 transform transition duration-300 ease-in-out ${
                        isOpen ? '-rotate-45 -translate-y-px' : 'translate-y-1'
                    }`}
                ></span>
            </div>
        </button>
    );
};

export default MenuToggle;
