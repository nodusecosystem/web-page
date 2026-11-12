import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import TiltedCard from '@/components/ui/reactbits/TiltedCard'

const renderCard = () =>
  render(
    <TiltedCard
      imageSrc="data:image/svg+xml,"
      altText="Servicio"
      scaleOnHover={1.03}
      rotateAmplitude={8}
      overlayContent={<p>Contenido</p>}
    />,
  )

describe('TiltedCard', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders the overlay content over the image, untransformed at rest', () => {
    const { container } = renderCard()
    expect(screen.getByRole('img', { name: 'Servicio' })).toBeInTheDocument()
    expect(screen.getByText('Contenido')).toBeInTheDocument()
    const tilt = container.querySelector('figure')?.firstElementChild as HTMLElement
    expect(tilt.style.transform).toBe('none')
  })

  it('tilts towards the pointer and scales up on hover, with the framer-motion transform format', async () => {
    const { container } = renderCard()
    const figure = container.querySelector('figure') as HTMLElement
    vi.spyOn(figure, 'getBoundingClientRect').mockReturnValue({
      x: 0,
      y: 0,
      top: 0,
      left: 0,
      right: 200,
      bottom: 100,
      width: 200,
      height: 100,
      toJSON: () => ({}),
    } as DOMRect)
    const tilt = figure.firstElementChild as HTMLElement

    fireEvent.mouseEnter(figure)
    fireEvent.mouseMove(figure, { clientX: 200, clientY: 0 })

    await waitFor(() => {
      expect(tilt.style.transform).toMatch(/^scale\([\d.]+\) rotateX\([\d.]+deg\) rotateY\([\d.]+deg\)$/)
    })
  })
})
