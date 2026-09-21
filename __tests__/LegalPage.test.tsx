import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import esDict from '@/lib/i18n/es.json'
import { LegalPage } from '@/views/LegalPage'

vi.mock('next/root-params', () => ({
  lang: () => Promise.resolve('es'),
}))

const LEGAL_DOCUMENTS = ['notice', 'privacy', 'cookies'] as const

describe('LegalPage', () => {
  it.each(LEGAL_DOCUMENTS)('renders the %s document with its sections', async (documentKey) => {
    render(await LegalPage({ documentKey }))
    const legalDocument = esDict.legal[documentKey]

    expect(
      screen.getByRole('heading', { level: 1, name: legalDocument.title }),
    ).toBeInTheDocument()
    expect(screen.getByText(legalDocument.lastUpdated)).toBeInTheDocument()

    for (const section of legalDocument.sections) {
      expect(screen.getByRole('heading', { name: section.heading })).toBeInTheDocument()
      for (const paragraph of section.paragraphs) {
        expect(screen.getByText(paragraph)).toBeInTheDocument()
      }
    }
  })
})
