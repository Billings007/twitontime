import { UserStreamSchema } from 'src/data/schemas/UserSchemas'
import { Client } from 'twitter-api-sdk'

export async function userStream(input: UserStreamSchema) {
  const twitterClient = new Client(input.token as string)
  const stream = twitterClient.tweets.sampleStream({
    'tweet.fields': ['author_id'],
  })
  return stream
}
