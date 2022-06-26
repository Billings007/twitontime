/*import { NextApiRequest, NextApiResponse } from 'next';
import Client, { auth } from 'twitter-api-sdk';
import { OAuth2User } from 'twitter-api-sdk/dist/OAuth2User';*/
import prisma from '@libs/clients/prisma';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth from 'next-auth';
import TwitterProvider from 'next-auth/providers/twitter';

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID as string,
      clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
      version: '2.0',
      authorization: {
        url: 'https://twitter.com/i/oauth2/authorize',
        params: {
          scopes: [
            'tweet.read',
            'tweet.write',
            'tweet.moderate.write',
            'users.read',
            'offline.access',
          ],
        },
      },
    }),
  ],
  secret: process.env.SECRET,
});

/*
const STATE = 'my-state';
let authClient: OAuth2User;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.method);
  if (req.method === 'POST') {
    authClient = new auth.OAuth2User({
      client_id: process.env.CLIENT_ID as string,
      client_secret: process.env.CLIENT_SECRET as string,
      callback: 'http://localhost:3000/api/auth/callback/',
      scopes: ['tweet.read', 'tweet.write', 'tweet.moderate.write', 'users.read', 'offline.access'],
    });
    const authURL = authClient.generateAuthURL({
      state: STATE,
      code_challenge_method: 's256',
    });
    res.redirect(authURL);
  } else if (req.method === 'GET') {
    const { code, state } = req.query;
    if (state !== STATE) return res.status(500).send("State isn't matching");
    await authClient.requestAccessToken(code);
    const client = new Client(authClient);
    console.log(authClient.token);
    const tweets = await client.tweets.findTweetById('20');
    console.log(tweets);
    res.redirect(
      `/?token=${authClient.token.access_token}&expires_at=${authClient.token.expires_at}`
    );
  }
};
*/
