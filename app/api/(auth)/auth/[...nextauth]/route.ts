import { prisma } from "@/src/lib/prisma"
import NextAuth from "next-auth"
import type { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ user, account }: { user: any; account: any }) {
      if (account?.provider === "google") {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
        })

        if (!existingUser) {
          await prisma.user.create({
            data: {
              email: user.email!,
              name: user.name,
              imageUrl: user.image,
              verifiedUser: true,
              provider: "google",
              providerId: account.providerAccountId,
            },
          })
        }
      }
      return true
    },

    async jwt({ token, user }: { token: any; user: any }) {
      // Ensure we always have our Prisma `userId` in the token.
      if (!token.userId) {
        const email = user?.email
        if (email) {
          const existingUser = await prisma.user.findUnique({ where: { email } })
          if (existingUser) token.userId = existingUser.id
        }
      }
      return token
    },

    async session({ session, token }: { session: any; token: any }) {
      ;(session as any).userId = token.userId
      return session
    },
  },

  session: {
    strategy: "jwt" as const,
  },

  // In dev, NextAuth will warn if secret is missing; fall back to avoid session reads failing.
  // In production you should set `NEXTAUTH_SECRET`.
  secret: process.env.NEXTAUTH_SECRET ?? "dev-nextauth-secret",
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }