import { create } from 'zustand';
import { Contact } from '@/app/types';

interface ContactState {
    contacts: Contact[];
    isModalOpen: boolean;
    addContact: (contact: Contact) => void;
    setContacts: (contacts: Contact[] | ((prevContacts: Contact[]) => Contact[])) => void;
    setIsModalOpen: (isOpen: boolean) => void;
}

export const useContactStore = create<ContactState>((set) => ({
    contacts: [],
    isModalOpen: false,
    addContact: (contact) => set((state) => ({ contacts: [...state.contacts, contact] })),
    setContacts: (contacts) =>
        set((state) => ({
            contacts: typeof contacts === 'function' ? contacts(state.contacts) : contacts,
        })),
    setIsModalOpen: (isOpen) => set({ isModalOpen: isOpen }),
}));
