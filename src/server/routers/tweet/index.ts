import { createRouter } from 'src/server/createRouter';
import { z } from 'zod';
import { deleteTweet } from './deleteTweet';
import { postTweet } from './postTweet';
import { userLookup } from './userLookup';

export const tweetrouter = createRouter()
  .mutation('lookup', {
    input: z.object({
      username: z.string(),
      token: z.unknown().optional(),
    }),
    async resolve({ input }) {
      return await userLookup(input.username, input.token);
    },
  })
  .mutation('post', {
    input: z.object({
      tweetbody: z.string(),
      token: z.string(),
    }),
    async resolve({ input }) {
      return await postTweet(input.tweetbody, input.token);
    },
  })
  .mutation('delete', {
    input: z.object({
      tweetID: z.string(),
      token: z.string(),
    }),
    async resolve({ input }) {
      return await deleteTweet(input.tweetID, input.token);
    },
  });
