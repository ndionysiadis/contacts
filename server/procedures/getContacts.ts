import { initTRPC } from '@trpc/server';
import { prisma } from '../prisma';

const t = initTRPC.create();

export const getContactsProcedure = t.procedure.query(async () => {
    try {
        return await prisma.contact.findMany({
            where: { deleted_at: null },
        });
    } catch (error) {
        throw new Error('Failed to fetch contacts');
    }
});
