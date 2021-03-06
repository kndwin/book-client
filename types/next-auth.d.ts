import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `Provider` React Context
   */
  interface Session extends Session {
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
      role?: "TEACHER" | "STUDENT";
    };
  }
}
