import {createNextApiHandler} from '@trpc/server/adapters/next';
import {appRouter} from '@/server/router';
import {prisma} from '@/server/prisma';

export const config = {
    runtime: 'nodejs',
};

export default createNextApiHandler({
    router: appRouter,
    createContext: () => ({prisma}),
    onError({error}) {
        console.error('tRPC API Error:', error);
    },
});
