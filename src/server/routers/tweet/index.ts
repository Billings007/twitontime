import { createRouter } from 'src/server/createRouter';
import { z } from 'zod';
import { postTweet } from './postTweet';

export const tweetrouter = createRouter().mutation('post', {
  input: z.object({
    tweetbody: z.string(),
    token: z.string(),
  }),
  async resolve({ input }) {
    return await postTweet(input.tweetbody, input.token);
  },
});
