import { postTweetSchema } from 'src/data/schemas/TweetSchemas';
import { protectedProcedure, router } from '../../trpc';
import { postTweet } from './tweetFunction';

export const tweetRouter = router({
  postTweet: protectedProcedure.input(postTweetSchema).mutation(async ({ input }) => {
    return await postTweet(input);
  }),

  // deleteTweet: publicProcedure
  //   .input(deleteTweetSchema)
  // .mutation
});

//   .mutation('deleteTweet', {
//     input: deleteTweetSchema,
//     async resolve({ input }) {
//       return await deleteTweet(input)
//     },
//   })
// }
