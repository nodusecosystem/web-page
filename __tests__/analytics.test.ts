import { beforeEach, describe, expect, it } from 'vitest'
import { getGtag, trackLead } from '@/lib/analytics'

type GtagWindow = Window & { dataLayer?: unknown[]; gtag?: unknown }

const pushedEntries = (): unknown[][] =>
  ((window as GtagWindow).dataLayer ?? []).map((entry) => {
    expect(Object.prototype.toString.call(entry)).toBe('[object Arguments]')
    return Array.from(entry as ArrayLike<unknown>)
  })

describe('analytics', () => {
  beforeEach(() => {
    ;(window as GtagWindow).dataLayer = []
    delete (window as GtagWindow).gtag
  })

  it('reuses the gtag function defined by the GA snippet', () => {
    const calls: unknown[][] = []
    ;(window as GtagWindow).gtag = (...args: unknown[]) => calls.push(args)
    trackLead('call')
    expect(calls).toEqual([['event', 'schedule_call', { lead_channel: 'call' }]])
  })

  it('queues events as arguments objects when gtag.js has not loaded yet', () => {
    trackLead('form', { booked_call: 'yes' })
    trackLead('whatsapp', { placement: 'floating_button' })
    expect(pushedEntries()).toEqual([
      ['event', 'generate_lead', { lead_channel: 'form', booked_call: 'yes' }],
      ['event', 'whatsapp_click', { lead_channel: 'whatsapp', placement: 'floating_button' }],
    ])
  })

  it('returns the same gtag instance on later calls', () => {
    expect(getGtag()).toBe(getGtag())
  })
})
