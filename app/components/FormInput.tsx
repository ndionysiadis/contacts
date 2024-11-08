import React from 'react';

interface InputProps {
    label: string;
    id: string;
    name: string;
    type?: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputField({ label, id, name, type = 'text', placeholder = '', value, onChange }: InputProps) {
    return (
        <div className="relative">
            <label
                htmlFor={id}
                className="absolute -top-2 left-2 inline-block bg-gray-800 px-1 text-xs font-medium text-gray-200"
            >
                {label}
            </label>
            <input
                id={id}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="block w-full rounded-lg border-0 py-1.5 text-gray-200 bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-500 sm:text-sm/6"
            />
        </div>
    );
}
