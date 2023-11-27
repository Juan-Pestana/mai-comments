'use client'
import React, { useState, useEffect } from 'react'
import { getSession, signIn, useSession } from 'next-auth/react'
import {} from '@/components/providers'

const hasCookiesEnabled = async () => {
  if (document.hasStorageAccess) {
    return await document
      .hasStorageAccess()
      .then((hasAccess) => hasAccess)

      .catch((_) => {
        return false
      })
  }
  return window.navigator.cookieEnabled
}

const handleLogin = () => {
  const newWindow = window.open(
    `${process.env.NEXT_PUBLIC_URL}/login?callbackUrl=${window.location.href}`,
    '_blank'
  )
  try {
    newWindow?.focus()
  } catch {
    alert(
      'Pop-up Blocker is enabled! Please add this site to your exception list.'
    )
    //or change state to display something different on the page
  }
}

const useBrowser = () => {
  if (typeof window === 'undefined') return null

  let browser
  const userAgent = window.navigator.userAgent
  if (userAgent.indexOf('Firefox') > -1) {
    browser = 'Firefox'
  } else if (userAgent.indexOf('Opera') > -1 || userAgent.indexOf('OPR') > -1) {
    browser = 'Opera'
  } else if (userAgent.indexOf('Trident') > -1) {
    browser = 'Internet Explorer'
  } else if (userAgent.indexOf('Edge') > -1) {
    browser = 'Edge'
  } else if (userAgent.indexOf('Chrome') > -1) {
    browser = 'Chrome'
  } else if (userAgent.indexOf('Safari') > -1) {
    browser = 'Safari'
  } else {
    browser = 'Unknown'
  }

  return browser
}

export default function Login() {
  const browser = useBrowser()

  const { data: session, status, update } = useSession()

  const [checking, setChecking] = useState(true)
  const [hasCookieAccess, setHasCookieAccess] = useState(false)

  //check if we can request storage access else notify the user to allow cookies via settings
  const handleCookieAccess = async () => {
    if (document.requestStorageAccess) {
      await document.requestStorageAccess().then(
        () => {
          //now we have access and reload the page to see if we have a session or have to login
          location.reload()
        },
        () => {
          alert('Cookie access denied. Please allow!')
          //or change state to display something on the page
        }
      )
    } else {
      alert('Please allow cookies in your settings')
      //or change state to display something on the page
    }
  }

  useEffect(() => {
    async function checkCookieAccess() {
      await hasCookiesEnabled().then((enabled) => {
        if (enabled) {
          setHasCookieAccess(true)
        }
      })
      setChecking(false)
    }
    checkCookieAccess()
  }, [])

  useEffect(() => {
    const thisWindow = window.self
    if (session) {
      window.opener.location.reload()
      thisWindow.close()
    }
  }, [session])

  //show loading indicator on initialization
  if (typeof window === 'undefined' || status === 'loading' || checking) {
    return <div>Loading 1111...</div>
  }

  //if we have no cookie access let the user do an interaction to allow cookies
  //si tengo cookie access
  if (!hasCookieAccess) {
    return (
      <button onClick={handleCookieAccess}>
        We need cookies to work! Please click here to allow
      </button>
    )
  }

  //if the user is not logged in check if we are not in an iframe or that the browser dont need first party context then redirect inside the iframe else let the user do an interaction to open oauth in new tab
  if (!session && browser) {
    if (
      window.top === window.self ||
      !['Safari', 'Firefox', 'Edge', 'Unknown'].includes(browser) //In this browsers we have to set cookies in first-party context, therefore we are not able to redirect without user interaction
    ) {
      // console.log('nos logamos')
      signIn('github', { callbackUrl: 'http://127.0.0.1:5500/index.html' }) //start oauth for my custom provider

      return <div>Loading...con </div>
    } else {
      return <button onClick={handleLogin}>Login</button>
    }
  }

  //if this page was opened by our iframe we were able to set cookies. so we have to reload the iframe and the user is logged in. finally close the tab.
  if (window.opener) {
    return <div>Loading.2222..</div>
  }

  return <div>signin page</div>
}
