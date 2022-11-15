import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GoogleProvider from 'next-auth/providers/google';
import prisma from '../../../prisma/prisma';

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 30,
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 30,
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/acounts/login',
    signOut: '/acounts/logout',
    error: '/acounts/error', // Error code passed in query string as ?error=
    verifyRequest: '/acounts/verify-request', // (used for check email message)
    newUser: '/', // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log(user);
      return true;
    },
    // async redirect({ url, baseUrl }) {
    //   return baseUrl;
    // },
    async session({ session, user, token }) {
      // console.log(session, user, token, 'nexauth');
      session.userId = token.sub;
      return session;
    },
    // async jwt({ token, user, account, profile, isNewUser }) {
    //   console.log(isNewUser, 'token');
    //   return token;
    // },
  },
  // debug: true,
});
