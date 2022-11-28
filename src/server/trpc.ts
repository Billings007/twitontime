import { initTRPC, TRPCError } from '@trpc/server';
import { Context } from './routers/context';
import superjson from 'superjson'

const t = initTRPC.context<Context>().create({
    transformer: superjson,
});

const isAuthed = t.middleware(({ next, ctx }) => {
  if (!ctx.session?.user?.email) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
    });
  }
  return next({
    ctx: {
      // Infers the `session` as non-nullable
      session: ctx.session,
    },
  });
});

export const middleware = t.middleware;
export const router = t.router;

/**
 * Unprotected procedure
 **/
export const publicProcedure = t.procedure;

/**
 * Protected procedure
 **/
export const protectedProcedure = t.procedure.use(isAuthed);
