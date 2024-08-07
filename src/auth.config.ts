import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import prisma from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
import { type NextAuthConfig } from "next-auth";
import bcryptjs from "bcryptjs";

export default {
  providers: [
    Google({
      clientId: process.env.NEXTAUTH_GOOGLE_ID as string,
      clientSecret: process.env.NEXTAUTH_GOOGLE_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
        tokenId: { label: "Token", type: "uuid" },
      },
      async authorize(credentials) {
        if (!credentials?.tokenId) {
          if (!credentials?.username || !credentials?.password) {
            throw new Error("Username and password are required");
          }
        }

        const { username, password, tokenId } = credentials;

        if (tokenId && !username) {
          throw new Error("Username is required");
        }

        const user = await prisma.user.findUnique({
          where: {
            username: (username as string).toLowerCase(),
          },
        });

        if (!user) {
          throw new Error("No user found");
        }

        if (tokenId) {
          if (!user.oneTimePassword) {
            throw new Error("User has not set a one time password");
          }
          const valid = user.oneTimePassword == tokenId;

          if (!valid) {
            throw new Error("Invalid token");
          }

          await prisma.user.update({
            where: {
              id: user.id,
            },
            data: {
              oneTimePassword: uuidv4(),
            },
          });

          return user as any;
        } else {
          if (!user.password) {
            throw new Error("User has not set a password");
          }
          const valid = await bcryptjs.compare(
            password as string,
            user.password
          );

          if (!valid) {
            throw new Error("Invalid username or password");
          }

          return user as any;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.username = user.username;
        //@ts-ignore
        token.role = user.role as Role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.username = token.username;
        session.user.role = token.role;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
