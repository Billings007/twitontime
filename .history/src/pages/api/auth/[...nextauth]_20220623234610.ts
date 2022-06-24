import NextAuth from 'next-auth';
import TwitterProvider from 'next-auth/providers/twitter';

const options = {
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_KEY as string,
      clientSecret: process.env.TWITTER_SECRET as string,
      version: '2.0',
    }),
  ],
};

export default NextAuth(options);
