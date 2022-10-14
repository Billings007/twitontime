import superjson from 'superjson';
import { createRouter } from './context';

import { tweetRouter } from './tweet';
import { userRouter } from './user';

export const appRouter = createRouter().transformer(superjson).merge(tweetRouter).merge(userRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
