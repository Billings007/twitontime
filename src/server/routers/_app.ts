import { createRouter } from '../createRouter';
import { router as auth } from './auth';
import { tweetrouter } from './tweet';

export const appRouter = createRouter().merge('auth.', auth).merge(tweetrouter);

export type AppRouter = typeof appRouter;
