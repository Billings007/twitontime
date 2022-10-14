import { UserLookupSchema } from 'src/data/schemas/UserSchemas';
import { Client } from 'twitter-api-sdk';

export async function userLookup(input: UserLookupSchema) {
  const twitterClient = new Client(input.token as string);
  const user = await twitterClient.users.findUserByUsername(input.username);
  console.log(user.data);
  return user.data;
}
