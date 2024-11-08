import { initTRPC } from '@trpc/server';
import { getContactsProcedure } from './procedures/getContacts';
import { addContactProcedure } from './procedures/addContact';
import { updateContactProcedure } from './procedures/updateContact';
import { deleteContactProcedure } from './procedures/deleteContact';

const t = initTRPC.create();

export const appRouter = t.router({
    getContacts: getContactsProcedure,
    addContact: addContactProcedure,
    updateContact: updateContactProcedure,
    deleteContact: deleteContactProcedure,
});

export type AppRouter = typeof appRouter;
