import Client from 'twitter-api-sdk';

export async function postTweet(tweetbody: string, token: string) {
  const twitterClient = new Client(token as string);
  return await twitterClient.tweets.createTweet({
    text: tweetbody,
  });
}
