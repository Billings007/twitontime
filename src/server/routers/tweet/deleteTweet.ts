import { Client } from 'twitter-api-sdk';

export async function deleteTweet(tweetID: string, token: string) {
  const twitterClient = new Client(token as string);
  return await twitterClient.tweets.deleteTweetById(tweetID);
}
