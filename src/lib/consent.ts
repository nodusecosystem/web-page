export const CONSENT_STORAGE_KEY = 'nodus-cookie-consent'
export const OPEN_CONSENT_EVENT = 'nodus:open-cookie-consent'

export type ConsentValue = 'granted' | 'denied'

type WindowWithDataLayer = Window & { dataLayer?: unknown[] }

export function readStoredConsent(): ConsentValue | null {
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY)
    return value === 'granted' || value === 'denied' ? value : null
  } catch {
    return null
  }
}

export function storeConsent(value: ConsentValue): void {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, value)
  } catch {
    return
  }
}

export function updateAnalyticsConsent(value: ConsentValue): void {
  const target = window as WindowWithDataLayer
  target.dataLayer = target.dataLayer ?? []
  target.dataLayer.push([
    'consent',
    'update',
    {
      analytics_storage: value,
      ad_storage: value,
      ad_user_data: value,
      ad_personalization: value,
    },
  ])
}

export function openConsentBanner(): void {
  window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))
}
