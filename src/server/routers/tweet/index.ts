import { createRouter } from 'src/server/createRouter';
import { z } from 'zod';
import deleteTweet from './deleteTweet';
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

export const deleterouter = createRouter().mutation('delete', {
  input: z.object({
    tweetID: z.string(),
    token: z.string(),
  }),
  async resolve({ input }) {
    return await deleteTweet(input.tweetID, input.token);
  }
})