import NextAuth, { Account, Profile, User } from "next-auth";
import Providers from "next-auth/providers";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { UPDATE_USER } from "graphql/queries";
import { client } from "../../_app";

const prisma = new PrismaClient();

const GOOGLE_AUTHORIZATION_URL =
  "https://accounts.google.com/o/oauth2/v2/auth?" +
  new URLSearchParams({
    prompts: "consent",
    access_types: "offline",
    response_type: "code",
  });

const refreshAccessToken = async (token: any) => {
  try {
    const url =
      "https://oauth2.googleapis.com/token?" +
      new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID ?? "",
        client_secret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      });
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    });
    const refreshedTokens = await res.json();
    localStorage.setItem("token", refreshedTokens);
    if (!res.ok) {
      throw refreshedTokens;
    }
    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshedToken: refreshedTokens.refresh_token ?? token.refreshToken,
    };
  } catch (err) {
    console.log({ err });
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
};

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOLGE_CLIENT_SECRET,
      // authorizationUrl: GOOGLE_AUTHORIZATION_URL,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  database: process.env.DATABASE_URL,
  secret: process.env.SECRET,
  session: { jwt: true },
  debug: true,
  callbacks: {
    async signIn(user, account, profile) {
      try {
        console.log({ user, account, profile });
        const res = await client.mutate({
          mutation: UPDATE_USER,
          variables: { user: { role: "USER" }, id: user.id },
          errorPolicy: "all",
        });
        console.log({ res });
      } catch (err) {
        console.log(JSON.stringify(err, null, 2));
      }
      return true;
    },
    async redirect(url, baseUrl) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    async session(session, token) {
      // @ts-ignore
      session.user = token.userData;
      session.jwtToken = token.jwtToken;
      session.accountToken = token.accountToken;
      session.error = token.error;
      return session;
    },
    async jwt(token, user, account) {
      user && (token.userData = user);
      account && (token.jwtToken = account.id_token);
      if (account && user) {
        return {
          accountToken: account.accessToken,
          accessTokenExpires: Date.now() + Number(account.expires_in) * 1000,
          refreshToken: account.refreshToken,
          userData: user,
          jwtToken: account.idToken,
        };
      }
      if (Date.now() < (token as any).accessTokenExpires) {
        return token;
      }

      return refreshAccessToken(token);
    },
  },
});
