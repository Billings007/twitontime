import Client from 'next-auth/providers/twitter';
import { auth } from 'twitter-api-sdk';
import dotenv from dotenv;

dotenv.config()

const authClient = new auth.OAuth2User({
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  callback: 'http://127.0.0.1:3000/callback',
  scopes: ['tweet.read', 'users.read', 'offline.access'],
});

const client = new Client(authClient);

export default client;
