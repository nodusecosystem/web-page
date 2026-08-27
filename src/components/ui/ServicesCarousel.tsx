'use client'

import { ArrowRight, Check } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import DepthCarousel from '@/components/ui/reactbits/DepthCarousel'
import { SERVICE_ICONS } from '@/lib/constants/icons'
import { useIsMobile } from '@/lib/use-mobile'

type CarouselService = {
  id: string
  title: string
  description: string
  features: string[]
}

type ServicesCarouselProps = {
  services: CarouselService[]
  ctaLink: string
}

function ServiceCardContent({ service, ctaLink }: { service: CarouselService; ctaLink: string }) {
  const Icon = SERVICE_ICONS[service.id] ?? Check
  return (
    <div className="flex h-full flex-col gap-4 overflow-y-auto rounded-2xl p-6 text-white">
      <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-light/10 text-teal-light">
        {Icon ? <Icon aria-hidden className="h-6 w-6" /> : null}
      </span>
      <h3 className="font-display text-lg font-bold">{service.title}</h3>
      <p className="text-sm leading-relaxed text-white/70">{service.description}</p>
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

export function ServicesCarousel({ services, ctaLink }: ServicesCarouselProps) {
  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <div className="mt-16 grid gap-6 sm:grid-cols-2">
        {services.map((service) => (
          <Card key={service.id} variant="glass" className="flex h-full flex-col">
            <ServiceCardContent service={service} ctaLink={ctaLink} />
          </Card>
        ))}
      </div>
    )
  }

  const items = services.map((service) => ({
    alt: service.title,
    content: <ServiceCardContent service={service} ctaLink={ctaLink} />,
  }))

  return (
    <div className="relative mt-16 h-[580px]">
      <DepthCarousel
        items={items}
        depth={220}
        spread={90}
        tilt={22}
        tiltDirection="right"
        perspective={1400}
        visibleCards={4}
        falloff={0.2}
        blur={6}
        autoplay
        loop
        cardWidth={330}
        cardHeight={480}
      />
    </div>
  )
}
