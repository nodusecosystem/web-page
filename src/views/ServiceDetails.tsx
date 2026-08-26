import Link from 'next/link'
import { lang } from 'next/root-params'
import { ArrowRight, Check, FileCheck2 } from 'lucide-react'
import { FadeIn } from '@/components/animations/FadeIn'
import { Badge } from '@/components/ui/Badge'
import { Container } from '@/components/ui/Container'
import { GlowPanel } from '@/components/ui/GlowPanel'
import { Section } from '@/components/ui/Section'
import { SERVICE_ICONS } from '@/lib/constants/icons'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { localePath } from '@/lib/format'
import { cn } from '@/lib/cn'

export async function ServiceDetails() {
  const dict = await getDictionary()
  const locale = await lang()
  const { details } = dict.servicesPage

  return (
    <Section id="detalle" className="bg-white">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Badge>{details.badge}</Badge>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {details.heading}
          </h2>
          <p className="mt-4 text-lg text-dark/60">{details.subheading}</p>
        </div>

        <div className="mt-16 flex flex-col gap-16 lg:gap-20">
          {dict.services.items.map((service, index) => {
            const Icon = SERVICE_ICONS[service.id] ?? Check
            return (
              <FadeIn key={service.id}>
                <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
                  <div
                    className={cn(
                      'flex flex-col items-start gap-5',
                      index % 2 === 1 && 'lg:order-2',
                    )}
                  >
                    <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-light/10 text-teal-light">
                      <Icon aria-hidden className="h-7 w-7" />
                    </span>
                    <h3 className="font-display text-2xl font-bold tracking-tight">
                      {service.title}
                    </h3>
                    <p className="text-base leading-relaxed text-dark/60">{service.description}</p>
                    <Link
                      href={localePath(locale, '/contact')}
                      className="inline-flex items-center gap-1.5 font-semibold text-dark transition-colors hover:text-teal-light"
                    >
                      {details.ctaLink}
                      <ArrowRight aria-hidden className="h-4 w-4" />
                    </Link>
                  </div>

                  <div className={cn('grid gap-6 sm:grid-cols-2', index % 2 === 1 && 'lg:order-1')}>
                    <div className="rounded-2xl border border-dark/10 bg-white p-6">
                      <h4 className="font-display text-sm font-bold tracking-wider text-dark/50 uppercase">
                        {details.includesTitle}
                      </h4>
                      <ul className="mt-4 flex flex-col gap-3">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2 text-sm text-dark/70">
                            <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-teal-light" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <GlowPanel borderRadius={16} className="p-6">
                      <h4 className="font-display flex items-center gap-2 text-sm font-bold tracking-wider text-teal-light uppercase">
                        <FileCheck2 aria-hidden className="h-4 w-4" />
                        {details.deliverablesTitle}
                      </h4>
                      <ul className="mt-4 flex flex-col gap-3">
                        {service.deliverables.map((deliverable) => (
                          <li key={deliverable} className="flex items-start gap-2 text-sm text-white/80">
                            <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-teal-light" />
                            {deliverable}
                          </li>
                        ))}
                      </ul>
                    </GlowPanel>
                  </div>
                </div>
              </FadeIn>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
