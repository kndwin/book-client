import NextAuth, { Account, Profile, User } from "next-auth";
import Providers from "next-auth/providers";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { client as apollo } from "pages/_app";
import { AUTHORIZE_USER, GET_BOOKS } from "graphql/queries";

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOLGE_CLIENT_SECRET,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  database: process.env.DATABASE_URL,
  secret: process.env.SECRET,
  session: { jwt: true },
  debug: true,
  callbacks: {
    async signIn(user, account, profile) {
      // console.log({ user, account, profile });
      const { id_token: token } = account;
      console.log({ token });
      const res = await apollo.query({
        query: AUTHORIZE_USER,
        variables: { authorizeToken: token },
      });
      console.log(res.data);
      return true;
    },
    async redirect(url, baseUrl) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    async session(session, user) {
      // @ts-ignore
      session.user = user.userData;
      return session;
    },
    async jwt(token, user) {
      user && (token.userData = user);
      return token;
    },
  },
});
