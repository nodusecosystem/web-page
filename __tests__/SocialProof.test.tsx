import { render, screen, within } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { SocialProof } from '@/views/SocialProof'
import esDict from '@/lib/i18n/es.json'

vi.mock('next/root-params', () => ({
  lang: () => Promise.resolve('es'),
}))

describe('SocialProof', () => {
  it('renders the client names', async () => {
    render(await SocialProof())
    const clients = screen.getByRole('list', { name: esDict.socialProof.clientsAriaLabel })

    for (const client of esDict.socialProof.clients) {
      expect(within(clients).getByText(client)).toBeInTheDocument()
    }
  })

  it('renders each case with its business result and campaign details', async () => {
    render(await SocialProof())

    for (const caseStudy of esDict.socialProof.cases) {
      expect(screen.getByRole('heading', { name: caseStudy.client })).toBeInTheDocument()
      expect(screen.getByText(caseStudy.result)).toBeInTheDocument()
      expect(screen.getByText(`“${caseStudy.testimonial}”`)).toBeInTheDocument()

      for (const detail of caseStudy.details) {
        expect(screen.getAllByText(detail.label).length).toBeGreaterThan(0)
        expect(screen.getAllByText(detail.value).length).toBeGreaterThan(0)
      }
    }
  })
})
