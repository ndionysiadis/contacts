import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    icon?: React.ReactNode;
    onClick?: () => void;
}

export default function Button({ children, icon, onClick }: ButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="inline-flex w-full text-center justify-center items-center gap-x-2 rounded-lg ring-1 ring-inset ring-pink-500 bg-pink-500/50 px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600 transition duration-150 ease-in-out"
        >
            {icon && <span className="flex-shrink-0">{icon}</span>}
            {children}
        </button>
    );
}
