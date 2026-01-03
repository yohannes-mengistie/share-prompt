import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectedToDB } from "@utils/database";
import User from "../../../../models/user";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      username?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      httpOptions: {
        timeout: 10000,
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please provide both email and password");
        }

        await connectedToDB();

        const user = await User.findOne({ email: credentials.email });
        if (!user || !user.password) {
          throw new Error("Invalid Credentials");
        }
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) {
          throw new Error("Invalid Credentials");
        }

        return {
          id: user._id.toString(),
          name: user.name,
          username: user.username,
          email: user.email,
          image: user.image,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "credentials") {
        return true;
      }

      if (account?.provider === "google") {
        try {
          await connectedToDB();

          const userExists = await User.findOne({
            email: profile?.email,
          });

          if (!userExists) {
            await User.create({
              email: profile?.email,
              name: profile?.name || profile?.email?.split("@")[0],
              username: profile?.name?.replace(/\s+/g, "").toLowerCase(),
              image: (profile as any)?.picture,
              provider: "google",
            });
          }

          return true;
        } catch (error) {
          console.log("Google sign-in error:", error);
          return false;
        }
      }

      return false;
    },

    async session({ session, token }) {
      if (session.user?.email) {
        await connectedToDB();
        const sessionUser = await User.findOne({
          email: session.user.email,
        }).select("_id name username email image");

        if (sessionUser) {
          session.user.id = sessionUser._id.toString();
          session.user.name = sessionUser.name;
          session.user.username = sessionUser.username;
          session.user.image = sessionUser.image || null;
        }
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };