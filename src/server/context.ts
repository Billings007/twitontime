import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { unstable_getServerSession } from 'next-auth';
import { authOptions as nextAuthOptions } from 'src/pages/api/auth/[...nextauth]';

export const createContext = async (opts?: trpcNext.CreateNextContextOptions) => {
  const req = opts?.req;
  const res = opts?.res;

  /**
   * Uses faster "getServerSession" in next-auth v4 that avoids a fetch request to /api/auth.
   * This function also updates the session cookie whereas getSession does not
   * Note: If no req -> SSG is being used -> no session exists (null)
   * @link https://github.com/nextauthjs/next-auth/issues/1535
   */
  const session = opts && (await unstable_getServerSession(opts.req, opts.res, nextAuthOptions));

  // for API-response caching see https://trpc.io/docs/caching
  return {
    req,
    res,
    session,
  };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
