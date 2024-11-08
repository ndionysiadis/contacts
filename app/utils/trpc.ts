import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@/server/router';
import { httpBatchLink } from '@trpc/client';

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
    links: [
        httpBatchLink({
            url: process.env.NODE_ENV === 'development'
                ? 'http://localhost:3000/api/trpc'
                : '/api/trpc',
        }),
    ],
});