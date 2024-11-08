'use client';

import React, { useEffect, useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import FormInput from './FormInput';
import PrimaryButton from './Buttons/PrimaryButton';
import { useContactStore } from '@/app/stores/contactStores';
import { trpc } from '@/app/utils/trpc';
import { Contact } from '@/app/types';

interface ModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    contactToEdit: Contact | null;
}

export default function PrimaryModal({ open, setOpen, contactToEdit }: ModalProps) {
    const [formValues, setFormValues] = useState({
        first_name: '',
        last_name: '',
        number: '',
        email: '',
    });

    const addContact = useContactStore((state) => state.addContact);
    const setContacts = useContactStore((state) => state.setContacts);

    const addContactMutation = trpc.addContact.useMutation({
        onSuccess: (newContact) => {
            addContact({ ...newContact, deleted_at: null });
            setOpen(false);
            resetForm();
        },
        onError: (error) => {
            console.error('Error adding contact:', error);
            alert(`Error: ${error.message}`);
        },
    });

    const updateContactMutation = trpc.updateContact.useMutation({
        onSuccess: (updatedContact) => {
            setContacts((prevContacts: Contact[]) =>
                prevContacts.map((contact) =>
                    contact.id === updatedContact.id ? updatedContact : contact
                )
            );
            setOpen(false);
            resetForm();
        },
        onError: (error) => {
            console.error('Error updating contact:', error);
            alert(`Error: ${error.message}`);
        },
    });

    useEffect(() => {
        if (contactToEdit) {
            setFormValues({
                first_name: contactToEdit.first_name,
                last_name: contactToEdit.last_name,
                number: contactToEdit.number ?? '',
                email: contactToEdit.email ?? '',
            });
        } else {
            resetForm();
        }
    }, [contactToEdit]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = () => {
        if (contactToEdit) {
            updateContactMutation.mutate({
                id: contactToEdit.id,
                first_name: formValues.first_name,
                last_name: formValues.last_name,
                number: formValues.number,
                email: formValues.email,
            });
        } else {
            addContactMutation.mutate({
                first_name: formValues.first_name,
                last_name: formValues.last_name,
                number: formValues.number,
                email: formValues.email,
            });
        }
    };

    const resetForm = () => {
        setFormValues({
            first_name: '',
            last_name: '',
            number: '',
            email: '',
        });
    };

    return (
        <Dialog open={open} onClose={() => setOpen(false)} className="relative z-10">
            <DialogBackdrop className="fixed inset-0 backdrop-blur-sm bg-gray-900/50 transition-opacity" />
            <div className="fixed inset-0 z-10 flex items-center justify-center p-4 overflow-y-auto">
                <DialogPanel className="relative bg-gray-800 ring-1 ring-inset ring-gray-700 transform overflow-hidden rounded-xl px-4 pb-4 pt-5 text-left transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                    <div>
                        <div className="text-center">
                            <DialogTitle as="h3" className="text-xl font-semibold text-gray-200 mb-6">
                                {contactToEdit ? 'Edit Contact' : 'Add a new contact'}
                            </DialogTitle>
                            <div className="flex flex-col gap-4">
                                <FormInput label="First Name" id="first_name" name="first_name" placeholder="John" value={formValues.first_name} onChange={handleInputChange} />
                                <FormInput label="Last Name" id="last_name" name="last_name" placeholder="Doe" value={formValues.last_name} onChange={handleInputChange} />
                                <FormInput label="Number" id="number" name="number" placeholder="000-0000-000" type="tel" value={formValues.number} onChange={handleInputChange} />
                                <FormInput label="Email" id="email" name="email" placeholder="johndoe@email.com" type="email" value={formValues.email} onChange={handleInputChange} />
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <PrimaryButton icon={<ArrowDownTrayIcon className="h-5 w-5" aria-hidden="true" />} onClick={handleSubmit}>
                            {contactToEdit ? 'Update Contact' : 'Save Contact'}
                        </PrimaryButton>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
}
