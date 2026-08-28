'use client'

import { ArrowRight, Check } from 'lucide-react'
import TiltedCard from '@/components/ui/reactbits/TiltedCard'
import { SERVICE_ICONS } from '@/lib/constants/icons'

const ISOTIPO_PATHS =
  '<path d="M198.258,928.478L143.72,876.217L143.956,835.097L218.471,906.285C223.991,911.638 231.531,913.198 238.663,910.717C246.183,908.1 250.946,901.411 251.036,893.401L251.235,875.68L251.316,755.811L281.605,755.794L281.523,865.335L281.099,893.99C280.865,909.76 274.094,923.551 261.226,932.488C252.457,938.577 242.886,941.627 232.038,941.524C219.487,941.405 207.741,937.565 198.258,928.478Z"/><path d="M125.648,790.581C116.664,794.067 113.339,801.68 113.311,810.474L113.15,861.705L113.007,939.819L82.76,911.372L82.855,859.876L83.302,803.392C85.909,780.651 102.501,762.832 125.117,759.168C130.813,758.245 136.503,758.674 142.197,759.063C150.659,760.702 157.775,764.191 164.014,770.132L221.159,824.544L220.991,866.725L200.291,846.434L146.321,794.294C140.762,788.924 132.496,787.925 125.648,790.581Z"/>'

const CARD_BACKGROUND = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 520"><rect width="540" height="520" fill="#000F13"/><g transform="translate(-35 -25) scale(1.12)" fill="rgba(91,199,208,0.10)"><rect width="531" height="496" fill="none"/><g transform="translate(-15 -20)">' +
    ISOTIPO_PATHS +
    '</g></g></svg>',
)}`

type GridService = {
  id: string
  title: string
  description: string
  features: string[]
}

type ServicesGridProps = {
  services: GridService[]
  ctaLink: string
}

function ServiceCardContent({ service, ctaLink }: Readonly<{ service: GridService; ctaLink: string }>) {
  const Icon = SERVICE_ICONS[service.id] ?? Check
  return (
    <div className="relative flex h-full w-full flex-col gap-4 overflow-hidden rounded-2xl bg-dark/95 p-6 text-white">
      <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-light/10 text-teal-light">
        {Icon ? <Icon aria-hidden className="h-6 w-6" /> : null}
      </span>
      <h3 className="font-display text-lg font-bold">{service.title}</h3>
      <p className="line-clamp-4 text-sm leading-relaxed text-white/70">{service.description}</p>
      <ul className="flex flex-col gap-2 border-t border-teal-light/15 pt-4">
        {service.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-white/75">
            <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-teal-light" />
            {feature}
          </li>
        ))}
      </ul>
      <a
        href="#contacto"
        className="mt-auto inline-flex shrink-0 items-center gap-1.5 pt-3 text-sm font-semibold text-teal-light transition-colors hover:text-white"
      >
        {ctaLink}
        <ArrowRight aria-hidden className="h-4 w-4" />
      </a>
    </div>
  )
}

export function ServicesGrid({ services, ctaLink }: Readonly<ServicesGridProps>) {
  return (
    <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
      {services.map((service, index) => (
        <div
          key={service.id}
          className={index === 3 ? 'h-130 lg:col-start-2' : 'h-130'}
        >
          <TiltedCard
            imageSrc={CARD_BACKGROUND}
            altText={service.title}
            containerHeight="100%"
            containerWidth="100%"
            imageHeight="100%"
            imageWidth="100%"
            scaleOnHover={1.03}
            rotateAmplitude={8}
            showMobileWarning={false}
            showTooltip={false}
            overlayContent={<ServiceCardContent service={service} ctaLink={ctaLink} />}
            displayOverlayContent
          />
        </div>
      ))}
    </div>
  )
}
