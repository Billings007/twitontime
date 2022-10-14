import * as trpc from '@trpc/server'
import { deleteTweetSchema, postTweetSchema } from 'src/data/schemas/TweetSchemas'
import { deleteTweet, postTweet } from './tweetFunction'

export const tweetRouter = trpc
  .router()
  .mutation('postTweet', {
    input: postTweetSchema,
    async resolve({ input }) {
      return await postTweet(input)
    },
  })
  .mutation('deleteTweet', {
    input: deleteTweetSchema,
    async resolve({ input }) {
      return await deleteTweet(input)
    },
  })
