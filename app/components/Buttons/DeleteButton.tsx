import React from 'react';
import {TrashIcon} from '@heroicons/react/20/solid';

interface ButtonProps {
    children?: React.ReactNode;
    icon?: React.ReactNode;
    onClick?: () => void;
}

export default function Button({ onClick }: ButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="inline-flex w-full text-center justify-center items-center gap-x-2 rounded-lg ring-1 ring-inset ring-red-500 bg-red-500 px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600 transition duration-150 ease-in-out"
        >
            <TrashIcon className="w-5 h-5"/>
        </button>
    );
}
