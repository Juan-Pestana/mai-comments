'use client'

import { SessionProvider } from 'next-auth/react'
import type { Session } from 'next-auth'

export const Providers = ({
  children,
  session,
}: React.PropsWithChildren<{ session: Session | null }>) => {
  if (!session) return null

  return <SessionProvider session={session}>{children}</SessionProvider>
}
