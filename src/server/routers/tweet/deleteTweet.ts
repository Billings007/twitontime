import { Client } from 'twitter-api-sdk';

export async function deleteTweet(tweetID: string, token: string) {
  const twitterClient = new Client(token as string);
  const response = await twitterClient.tweets.deleteTweetById(tweetID);
  if (response.errors) {
    return response.errors[0].detail;
  }
  if (!response.data?.deleted) {
    return 'Tweet already deleted';
  }
  if (response.data?.deleted) {
    return response.data?.deleted;
  } else {
    return 'Something went wrong';
  }
}
