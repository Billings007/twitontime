/* eslint-disable @typescript-eslint/no-non-null-assertion */
import NextAuth, { NextAuthOptions } from 'next-auth';
import TwitterProvider from 'next-auth/providers/twitter';

const authOptions: NextAuthOptions = {
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
      version: '2.0',
      authorization: {
        url: 'https://twitter.com/i/oauth2/authorize',
        params: {
          scope:
            'users.read tweet.read offline.access tweet.write tweet.moderate.write follows.read',
        },
      },
    }),
  ],
  secret: process.env.SECRET,
  pages: {
    signIn:"/signin"
  },
  callbacks: {
    jwt: async ({ token, account }) => {
      account && (token.user = account);
      return token;
    },
    session: async ({ session, token, user }) => {
      session.accessToken = token.accessToken;
      return session;
    },
  },
});

      return session;
    },
  },
};

export default NextAuth(authOptions);
