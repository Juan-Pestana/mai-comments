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

const cookiePrefix = process.env.NODE_ENV === 'production' ? '__Secure-' : ''
const hostPrefix = process.env.NODE_ENV === 'production' ? '__Host-' : ''

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
  useSecureCookies: true,
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
  },

  cookies: {
    sessionToken: {
      // name: `__Secure-next-auth.session-token`,
      name:
        process.env.NODE_ENV === 'production'
          ? `${cookiePrefix}next-auth.session-token`
          : 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'none',
        path: '/',
        partitioned: true,
        secure: true,
      },
    },
    callbackUrl: {
      name:
        process.env.NODE_ENV === 'production'
          ? `${cookiePrefix}next-auth.callback-url`
          : 'next-auth.callback-url',
      options: {
        sameSite: 'none',
        path: '/',
        partitioned: true,
        secure: true,
      },
    },
    csrfToken: {
      name:
        process.env.NODE_ENV === 'production'
          ? `${hostPrefix}next-auth.csrf-token`
          : 'next-auth.csrf-token',
      options: {
        httpOnly: true,
        sameSite: 'none',
        path: '/',
        partitioned: true,
        secure: true,
      },
    },
    pkceCodeVerifier: {
      name:
        process.env.NODE_ENV === 'production'
          ? `${cookiePrefix}next-auth.pkce.code_verifier`
          : 'next-auth.pkce.code_verifier',
      options: {
        httpOnly: true,
        sameSite: 'none',
        path: '/',
        partitioned: true,
        secure: true,
      },
    },
  },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)
