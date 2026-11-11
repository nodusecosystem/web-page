import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { CRM_URL } from '@/lib/constants/site'
import { SERVICE_PAGE_IDS, servicePagePath } from '@/lib/constants/services'
import esDict from '@/lib/i18n/es.json'
import { ServiceLanding } from '@/views/ServiceLanding'

vi.mock('next/root-params', () => ({
  lang: () => Promise.resolve('es'),
}))

const breadcrumbsFor = (id: (typeof SERVICE_PAGE_IDS)[number]) => [
  { name: 'Inicio', path: '' },
  { name: 'Servicios', path: '/services' },
  { name: esDict.servicePages.items[id].navLabel, path: servicePagePath(id, 'es') },
]

describe('ServiceLanding', () => {
  it.each(SERVICE_PAGE_IDS)('renders the %s landing with a single h1 and its content', async (id) => {
    const page = esDict.servicePages.items[id]
    render(await ServiceLanding({ id, breadcrumbs: breadcrumbsFor(id) }))

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    expect(screen.getByRole('heading', { level: 2, name: page.definition.heading })).toBeInTheDocument()
    for (const item of page.includes) {
      expect(screen.getByRole('heading', { level: 3, name: item.title })).toBeInTheDocument()
    }
    for (const item of page.audience.items) {
      expect(screen.getByText(item)).toBeInTheDocument()
    }
  })

  it('renders a breadcrumb with the current page marked', async () => {
    render(await ServiceLanding({ id: 'pauta-digital', breadcrumbs: breadcrumbsFor('pauta-digital') }))
    const nav = screen.getByRole('navigation', { name: esDict.servicePages.common.breadcrumbLabel })
    expect(nav).toHaveTextContent('Inicio')
    expect(screen.getByText(esDict.servicePages.items['pauta-digital'].navLabel, { selector: '[aria-current="page"]' })).toBeInTheDocument()
  })

  it('links related services with their translated landing URLs', async () => {
    render(await ServiceLanding({ id: 'automatizacion-ia', breadcrumbs: breadcrumbsFor('automatizacion-ia') }))

    expect(screen.getByRole('link', { name: /CRM y ARM/ })).toHaveAttribute('href', '/es/services/crm-arm')
    expect(screen.getByRole('link', { name: /Pauta digital/ })).toHaveAttribute('href', '/es/services/pauta-digital')
  })

  it('shows the Nodus CRM platform link only on the CRM/ARM landing', async () => {
    const { unmount } = render(await ServiceLanding({ id: 'crm-arm', breadcrumbs: breadcrumbsFor('crm-arm') }))
    expect(screen.getByRole('link', { name: esDict.servicePages.crmPlatform.linkLabel })).toHaveAttribute('href', CRM_URL)
    unmount()

    render(await ServiceLanding({ id: 'desarrollo-web', breadcrumbs: breadcrumbsFor('desarrollo-web') }))
    expect(screen.queryByRole('link', { name: esDict.servicePages.crmPlatform.linkLabel })).not.toBeInTheDocument()
  })
})
