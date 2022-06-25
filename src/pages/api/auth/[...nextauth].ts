import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import NextAuth from 'next-auth';
import TwitterProvider from 'next-auth/providers/twitter';

const prisma = new PrismaClient();

const options = {
  adapter: PrismaAdapter(prisma),
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID as string,
      clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
      version: '2.0',
    }),
  ],

  secret: process.env.SECRET,

  session: { jwt: true },

  pages: {
    //to fill with sign in, error, and new user page
  },

  callbacks: {
    async redirect(url, baseurl) {
      return 'http://localhost:3000/';
    },
  },
};

export default NextAuth(options);
