type Gtag = (...args: unknown[]) => void
type GtagWindow = Window & { dataLayer?: unknown[]; gtag?: Gtag }

export function getGtag(): Gtag {
  const target = window as GtagWindow
  if (target.gtag) return target.gtag
  const dataLayer = (target.dataLayer = target.dataLayer ?? [])
  // gtag.js only processes `arguments` objects pushed to dataLayer, never plain arrays.
  target.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    dataLayer.push(arguments)
  }
  return target.gtag
}

export const LEAD_EVENTS = {
  form: 'generate_lead',
  whatsapp: 'whatsapp_click',
  call: 'schedule_call',
} as const

export type LeadChannel = keyof typeof LEAD_EVENTS

export function trackLead(channel: LeadChannel, params: Record<string, string> = {}): void {
  getGtag()('event', LEAD_EVENTS[channel], { lead_channel: channel, ...params })
}
