import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { CookieConsent } from '@/components/consent/CookieConsent'
import { CONSENT_STORAGE_KEY, openConsentBanner } from '@/lib/consent'
import esDict from '@/lib/i18n/es.json'

type WindowWithDataLayer = Window & { dataLayer?: unknown[][] }

const strings = esDict.cookieConsent

const getDataLayer = (): unknown[][] => (window as WindowWithDataLayer).dataLayer ?? []

const getBanner = () => screen.queryByRole('region', { name: strings.ariaLabel })

describe('CookieConsent', () => {
  beforeEach(() => {
    window.localStorage.clear()
    ;(window as WindowWithDataLayer).dataLayer = []
  })

  afterEach(() => {
    window.localStorage.clear()
  })

  it('shows the banner when no consent has been stored', () => {
    render(<CookieConsent strings={strings} locale="es" />)
    expect(getBanner()).toBeInTheDocument()
  })

  it('stays hidden when consent was already stored', () => {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, 'granted')
    render(<CookieConsent strings={strings} locale="es" />)
    expect(getBanner()).not.toBeInTheDocument()
  })

  it('stores acceptance and updates Consent Mode', () => {
    render(<CookieConsent strings={strings} locale="es" />)
    fireEvent.click(screen.getByRole('button', { name: strings.accept }))

    expect(window.localStorage.getItem(CONSENT_STORAGE_KEY)).toBe('granted')
    expect(getDataLayer()).toContainEqual([
      'consent',
      'update',
      expect.objectContaining({
        analytics_storage: 'granted',
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
      }),
    ])
    expect(getBanner()).not.toBeInTheDocument()
  })

  it('stores rejection and keeps every consent signal denied', () => {
    render(<CookieConsent strings={strings} locale="es" />)
    fireEvent.click(screen.getByRole('button', { name: strings.reject }))

    expect(window.localStorage.getItem(CONSENT_STORAGE_KEY)).toBe('denied')
    expect(getDataLayer()).toContainEqual([
      'consent',
      'update',
      expect.objectContaining({
        analytics_storage: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      }),
    ])
    expect(getBanner()).not.toBeInTheDocument()
  })

  it('reopens when the preferences event is dispatched', () => {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, 'denied')
    render(<CookieConsent strings={strings} locale="es" />)
    expect(getBanner()).not.toBeInTheDocument()

    act(() => openConsentBanner())
    expect(getBanner()).toBeInTheDocument()
  })

  it('links to the localized cookie policy', () => {
    render(<CookieConsent strings={strings} locale="en" />)
    expect(screen.getByRole('link', { name: strings.policyLabel })).toHaveAttribute(
      'href',
      '/en/politica-de-cookies',
    )
  })
})
