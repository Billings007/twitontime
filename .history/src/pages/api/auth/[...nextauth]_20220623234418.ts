import { auth } from 'twitter-api-sdk';

const authClient = new auth.OAuth2User({
  client_id: process.env.CLIENT_ID as string,
  client_secret: process.env.CLIENT_SECRET as string,
  callback: 'http://127.0.0.1:3000/callback',
  scopes: ['tweet.read', 'users.read', 'offline.access'],
});

export default authClient;
