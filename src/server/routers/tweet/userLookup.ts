import { Client } from 'twitter-api-sdk';

export async function userLookup(username: string, token: string | unknown | undefined) {
  const twitterClient = new Client(token as string);
  const user = await twitterClient.users.findUserByUsername(username);
  console.log(user.data);
  return user.data;
}
