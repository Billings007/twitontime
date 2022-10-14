import { DeleteTweetSchema, PostTweetSchema } from 'src/data/schemas/TweetSchemas'
import Client from 'twitter-api-sdk'

export async function postTweet(input: PostTweetSchema) {
  const twitterClient = new Client(input.token as string)
  return await twitterClient.tweets.createTweet({
    text: input.tweetBody,
  })
}

export async function deleteTweet(input: DeleteTweetSchema) {
  const twitterClient = new Client(input.token as string)
  const response = await twitterClient.tweets.deleteTweetById(input.tweetId)
  if (response.errors && response.errors[0]) {
    return response.errors[0].detail
  }
  if (!response.data?.deleted) {
    return 'Tweet already deleted'
  }
  if (response.data?.deleted) {
    return response.data?.deleted
  } else {
    return 'Something went wrong'
  }
}
