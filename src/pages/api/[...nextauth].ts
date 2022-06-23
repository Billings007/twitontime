import NextAuth from 'next-auth';
import TwitterProvider from 'next-auth/providers/twitter';

const options = {
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_KEY,
      clientSecret: process.env.TWITTER_SECRET,
      version: '2.0',
    }),
  ],
};

export default NextAuth(options);
