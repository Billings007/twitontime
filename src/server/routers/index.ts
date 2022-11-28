import { router } from '../trpc';
import { tweetRouter } from './tweet';

// export const appRouter = createRouter().transformer(superjson).merge(tweetRouter).merge(userRouter);

export const appRouter = router({
  tweet: tweetRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
