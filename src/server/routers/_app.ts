import { createRouter } from '../createRouter';
import { router as auth } from './auth';
import { tweetrouter, userRouter } from './tweet';

export const appRouter = createRouter().merge('auth.', auth).merge(tweetrouter).merge(userRouter);

export type AppRouter = typeof appRouter;
