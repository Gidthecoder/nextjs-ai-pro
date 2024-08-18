import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    })
  ],
  secret: process.env.NEXTAUTH_SECRET as string,
  session: {
    strategy: 'jwt',
    maxAge: 60 * 2 //expires 2 minutes after the last request
  },
};
