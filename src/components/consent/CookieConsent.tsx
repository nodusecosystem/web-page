'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  OPEN_CONSENT_EVENT,
  readStoredConsent,
  storeConsent,
  updateAnalyticsConsent,
  type ConsentValue,
} from '@/lib/consent'
import { localePath } from '@/lib/format'

type CookieConsentStrings = {
  ariaLabel: string
  message: string
  policyLabel: string
  accept: string
  reject: string
}

type CookieConsentProps = {
  strings: CookieConsentStrings
  locale: string
}

export function CookieConsent({ strings, locale }: Readonly<CookieConsentProps>) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsVisible(readStoredConsent() === null)

    const handleOpen = () => setIsVisible(true)
    window.addEventListener(OPEN_CONSENT_EVENT, handleOpen)
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, handleOpen)
  }, [])

  const decide = (value: ConsentValue) => {
    storeConsent(value)
    updateAnalyticsConsent(value)
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <section
      aria-label={strings.ariaLabel}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-dark/95 px-4 py-4 text-white backdrop-blur sm:px-6"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <p className="max-w-2xl text-sm leading-relaxed text-white/80">
          {strings.message}{' '}
          <Link
            href={localePath(locale, '/politica-de-cookies')}
            className="font-semibold text-teal-light underline-offset-2 hover:underline"
          >
            {strings.policyLabel}
          </Link>
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => decide('denied')}
            className="rounded-full border border-teal-light px-5 py-2 text-sm font-semibold text-teal-light transition-colors hover:bg-teal-light/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-light"
          >
            {strings.reject}
          </button>
          <button
            type="button"
            onClick={() => decide('granted')}
            className="rounded-full bg-teal-light px-5 py-2 text-sm font-semibold text-dark transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-light"
          >
            {strings.accept}
          </button>
        </div>
      </div>
    </section>
  )
}
