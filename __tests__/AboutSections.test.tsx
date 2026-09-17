import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { MissionVisionValues } from '@/views/MissionVisionValues'
import { Philosophy } from '@/views/Philosophy'
import esDict from '@/lib/i18n/es.json'

vi.mock('next/root-params', () => ({
  lang: () => Promise.resolve('es'),
}))

describe('MissionVisionValues', () => {
  it('renders the section heading, mission and vision', async () => {
    render(await MissionVisionValues())
    const { purpose } = esDict.about

    expect(screen.getByRole('heading', { name: purpose.heading })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: purpose.missionTitle })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: purpose.visionTitle })).toBeInTheDocument()
    expect(screen.getByText(purpose.mission)).toBeInTheDocument()
    expect(screen.getByText(purpose.vision)).toBeInTheDocument()
  })

  it('renders every value with its title and description', async () => {
    render(await MissionVisionValues())

    for (const value of esDict.about.purpose.values) {
      expect(screen.getByRole('heading', { name: value.title })).toBeInTheDocument()
      expect(screen.getByText(value.description)).toBeInTheDocument()
    }
  })
})

describe('Philosophy', () => {
  it('renders the manifesto heading, every pillar and the closing quote', async () => {
    render(await Philosophy())
    const { philosophy } = esDict.about

    expect(screen.getByRole('heading', { name: philosophy.heading })).toBeInTheDocument()
    for (const point of philosophy.points) {
      expect(screen.getByRole('heading', { name: point.title })).toBeInTheDocument()
      expect(screen.getByText(point.description)).toBeInTheDocument()
    }
    expect(screen.getByText(philosophy.quote)).toBeInTheDocument()
  })
})
