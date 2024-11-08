import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { prisma } from '../prisma';

const t = initTRPC.create();

export const addContactProcedure = t.procedure
    .input(
        z.object({
            first_name: z.string(),
            last_name: z.string(),
            email: z.string().optional(),
            number: z.string().optional(),
        })
    )
    .mutation(async ({ input }) => {
        try {
            return await prisma.contact.create({
                data: {
                    first_name: input.first_name,
                    last_name: input.last_name,
                    email: input.email ?? '',
                    number: input.number ?? '',
                },
            });
        } catch (error) {
            throw new Error('Failed to add new contact');
        }
    });
