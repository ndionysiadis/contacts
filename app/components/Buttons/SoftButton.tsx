import React from 'react';

interface ButtonProps {
    children?: React.ReactNode;
    icon?: React.ReactNode;
    onClick?: () => void;
}

export default function Button({ children, icon, onClick }: ButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="flex flex-shrink-0 text-center justify-center items-center gap-x-2 rounded-lg ring-1 ring-inset ring-gray-50/50 bg-white/20 px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-gray-50/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600 transition duration-150 ease-in-out"
        >
            {icon && <span className="flex-shrink-0 -ml-1">{icon}</span>}
            {children}
        </button>
    );
}
