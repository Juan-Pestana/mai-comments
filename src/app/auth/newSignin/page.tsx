'use client'

import React, { useEffect } from 'react'
import withAuth from '@/lib/withAuthIframe'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'

function NewLogin() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  useEffect(() => {
    if (typeof window === 'undefined') return
    signIn('github', {
      callbackUrl,
    })
  }, [])

  return <div>Loading...</div>
}

export default withAuth(NewLogin)
