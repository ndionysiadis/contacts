import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { prisma } from '../prisma';

const t = initTRPC.create();

export const updateContactProcedure = t.procedure
    .input(
        z.object({
            id: z.number(),
            first_name: z.string(),
            last_name: z.string(),
            email: z.string().email(),
            number: z.string(),
        })
    )
    .mutation(async ({ input }) => {
        const { id, ...data } = input;

        try {
            return await prisma.contact.update({
                where: { id },
                data: {
                    ...data,
                    updated_at: new Date(),
                },
            });
        } catch (error) {
            console.error('Error updating contact:', error);
            throw new Error('Failed to update contact');
        }
    });
