'use client'

import { openConsentBanner } from '@/lib/consent'

type CookiePreferencesButtonProps = {
  label: string
}

export function CookiePreferencesButton({ label }: Readonly<CookiePreferencesButtonProps>) {
  return (
    <button
      type="button"
      onClick={openConsentBanner}
      className="text-left text-sm text-white/70 transition-colors hover:text-teal-light"
    >
      {label}
    </button>
  )
}
