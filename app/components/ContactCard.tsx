'use client';

import React from 'react';
import { trpc } from '@/app/utils/trpc';
import SoftButton from '@/app/components/Buttons/SoftButton';
import DeleteButton from '@/app/components/Buttons/DeleteButton';
import { PencilIcon } from '@heroicons/react/20/solid';
import { useContactStore } from '@/app/stores/contactStores';
import { Contact } from '@/app/types';

interface ContactCardProps {
    contact: Contact;
    setIsModalOpen: (open: boolean) => void;
    setContactToEdit: (contact: Contact | null) => void;
}

export default function ContactCard({ contact, setIsModalOpen, setContactToEdit }: ContactCardProps) {
    const setContacts = useContactStore((state) => state.setContacts);

    const deleteContact = trpc.deleteContact.useMutation({
        onSuccess: () => {
            setContacts((prevContacts: Contact[]) => prevContacts.filter((c) => c.id !== contact.id));
        },
        onError: (error) => {
            console.error('Failed to delete contact:', error.message);
        },
    });

    const handleDelete = () => {
        deleteContact.mutate({ id: contact.id });
    };

    const handleEdit = () => {
        setContactToEdit(contact);
        setIsModalOpen(true);
    };

    return (
        <div className="p-4 bg-gray-800 rounded-lg ring-1 ring-inset ring-gray-700 group relative motion-preset-slide-down">
            <div className="group-hover:blur-sm transition duration-150 ease-in-out">
                <h3 className="text-lg font-semibold text-gray-200">
                    {contact.first_name} {contact.last_name}
                </h3>
                <p className="text-gray-400">Number: {contact.number}</p>
                <p className="text-gray-400">Email: {contact.email}</p>
            </div>
            <div className="motion-preset-blur-down hidden group-hover:flex items-center gap-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <SoftButton
                    icon={<PencilIcon className="h-5 w-5" aria-hidden="true" />}
                    onClick={handleEdit}
                >
                    Edit Contact
                </SoftButton>

                <DeleteButton onClick={handleDelete} />
            </div>
        </div>
    );
}
