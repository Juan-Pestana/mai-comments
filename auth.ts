import NextAuth from 'next-auth'
import type { NextAuthConfig, User } from 'next-auth'

import GitHub from 'next-auth/providers/github'

declare module 'next-auth' {
  interface Session {
    user: {
      picture?: string
    } & Omit<User, 'id'>
  }
}

export const authConfig = {
  debug: true,
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    authorized(params) {
      return !!params.auth?.user
    },
  },
  session: {
    strategy: 'jwt',
  },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)
