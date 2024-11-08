import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { prisma } from '../prisma';

const t = initTRPC.create();

export const deleteContactProcedure = t.procedure
    .input(
        z.object({
            id: z.number(),
        })
    )
    .mutation(async ({ input }) => {
        try {
            return await prisma.contact.update({
                where: { id: input.id },
                data: { deleted_at: new Date() },
            });
        } catch (error) {
            throw new Error('Failed to delete contact');
        }
    });
