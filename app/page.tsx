'use client';

import React, { useState, useEffect } from 'react';
import { trpc } from '@/app/utils/trpc';
import { useContactStore } from '@/app/stores/contactStores';
import PrimaryModal from './components/PrimaryModal';
import PrimaryButton from './components/Buttons/PrimaryButton';
import EmptyState from './components/EmptyState';
import ContactCard from './components/ContactCard';
import { PlusIcon, ArrowUpIcon } from '@heroicons/react/20/solid';
import { Contact } from '@/app/types';

export default function HomePage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [contactToEdit, setContactToEdit] = useState<Contact | null>(null);
    const [showBackToTop, setShowBackToTop] = useState(false);
    const contacts = useContactStore((state) => state.contacts);
    const setContacts = useContactStore((state) => state.setContacts);

    const { isLoading } = trpc.getContacts.useQuery(undefined, {
        onSuccess: (fetchedContacts) => {
            setContacts(fetchedContacts as Contact[]);
        },
    });

    const handleAddContact = () => {
        setContactToEdit(null);
        setIsModalOpen(true);
    };

    const handleScroll = () => {
        if (window.scrollY > 300) {
            setShowBackToTop(true);
        } else {
            setShowBackToTop(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div>
            <div className="relative isolate overflow-hidden rounded-2xl bg-gray-900 px-6 py-24 sm:py-32 lg:px-8 mb-4">
                <img
                    alt=""
                    src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
                    className="absolute inset-0 -z-10 h-full w-full object-cover"
                />
                <div
                    aria-hidden="true"
                    className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
                >
                    <div
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                        className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
                    />
                </div>
                <div
                    aria-hidden="true"
                    className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
                >
                    <div
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                        className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
                    />
                </div>
                <div className="mx-auto max-w-2xl text-center flex flex-col gap-4">
                    <h2 className="text-5xl font-semibold tracking-tight text-white sm:text-7xl">Ve2max Contacts</h2>
                    <p className="text-pretty text-lg font-medium text-gray-400 sm:text-xl/8">
                        This is my test assignment for Ve2max, with TypeScript, Prisma, TRPC, and Zustand.
                        The application will be a full-stack CRUD application with
                        both frontend and backend implemented within NextJS.
                    </p>

                    {Array.isArray(contacts) && contacts.length > 0 && (
                        <div className="flex items-center justify-end motion-preset-slide-down">
                            <PrimaryButton
                                icon={<PlusIcon className="h-5 w-5" aria-hidden="true" />}
                                onClick={handleAddContact}
                            >
                                Add New Contact
                            </PrimaryButton>
                        </div>
                    )}
                </div>
            </div>

            <PrimaryModal open={isModalOpen} setOpen={setIsModalOpen} contactToEdit={contactToEdit} />

            {isLoading ? (
                <div className="flex items-center justify-center min-h-screen">
                    <p className="text-gray-400">Loading...</p>
                </div>
            ) : Array.isArray(contacts) && contacts.length === 0 ? (
                <EmptyState
                    action={
                        <PrimaryButton
                            icon={<PlusIcon className="h-5 w-5" aria-hidden="true" />}
                            onClick={handleAddContact}
                        >
                            Add New Contact
                        </PrimaryButton>
                    }
                />
            ) : (
                <div className="space-y-4">
                    {Array.isArray(contacts) &&
                        contacts.map((contact) => (
                            <ContactCard
                                key={contact.id}
                                contact={contact}
                                setIsModalOpen={setIsModalOpen}
                                setContactToEdit={setContactToEdit}
                            />
                        ))}
                </div>
            )}

            {showBackToTop && (
                <button
                    onClick={scrollToTop}
                    className="motion-preset-blur-up fixed bottom-8 right-8 z-50 p-3 rounded-full bg-pink-600 text-white hover:bg-indigo-700 transition duration-300 ease-in-out"
                >
                    <ArrowUpIcon className="h-6 w-6" />
                </button>
            )}
        </div>
    );
}