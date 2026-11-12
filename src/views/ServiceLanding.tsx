import { ArrowRight, Check, ChevronRight, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { AnimatedHeading } from '@/components/animations/AnimatedHeading'
import { HeroBackground } from '@/components/animations/HeroBackground'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SERVICE_PAGE_ICONS } from '@/lib/constants/icons'
import {
  SERVICE_PAGE_IDS,
  servicePagePath,
  type ServicePageId,
} from '@/lib/constants/services'
import { CRM_URL } from '@/lib/constants/site'
import { localePath } from '@/lib/format'
import { getDictionary, getLocale, type Dictionary, type Locale } from '@/lib/i18n/dictionaries'
import type { Breadcrumb } from '@/lib/seo/breadcrumbs'

type ServicePage = Dictionary['servicePages']['items'][ServicePageId]
type ServiceCommon = Dictionary['servicePages']['common']

const isServicePageId = (value: string): value is ServicePageId =>
  (SERVICE_PAGE_IDS as readonly string[]).includes(value)

function Breadcrumbs({
  locale,
  label,
  items,
}: Readonly<{ locale: Locale; label: string; items: Breadcrumb[] }>) {
  return (
    <nav aria-label={label}>
      <ol className="flex flex-wrap items-center justify-center gap-1 text-sm text-white/70">
        {items.map((crumb, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={crumb.path} className="flex items-center gap-1">
              {isLast ? (
                <span aria-current="page" className="text-white">
                  {crumb.name}
                </span>
              ) : (
                <>
                  <Link href={localePath(locale, crumb.path || '/')} className="hover:text-teal-light">
                    {crumb.name}
                  </Link>
                  <ChevronRight aria-hidden className="h-4 w-4" />
                </>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

function LandingHero({
  page,
  common,
  locale,
  breadcrumbs,
}: Readonly<{ page: ServicePage; common: ServiceCommon; locale: Locale; breadcrumbs: Breadcrumb[] }>) {
  return (
    <section className="relative overflow-hidden bg-dark text-white">
      <HeroBackground />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 h-120 w-120 rounded-full bg-teal-light/25 blur-3xl"
      />
      <Container className="relative pt-32 pb-20 sm:pt-40 sm:pb-24">
        <div>
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
            <Breadcrumbs locale={locale} label={common.breadcrumbLabel} items={breadcrumbs} />
            <h1 className="font-display">
              <AnimatedHeading
                line1={page.titleStart}
                line2={page.titleAccent}
                fontSize={72}
                align="center"
                className="text-4xl leading-tight font-bold tracking-tight sm:text-5xl xl:text-6xl"
              />
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-white/70">{page.intro}</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button href={localePath(locale, '/contact')} size="lg" variant="solid">
                {common.ctaPrimary}
                <ArrowRight aria-hidden className="h-4 w-4" />
              </Button>
              <Button href={localePath(locale, '/services')} size="lg" variant="outline">
                {common.ctaSecondary}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

function Definition({ page, platform }: Readonly<{ page: ServicePage; platform?: Dictionary['servicePages']['crmPlatform'] }>) {
  return (
    <Section className="bg-white">
      <Container className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <div>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{page.definition.heading}</h2>
          {page.definition.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-5 text-lg leading-relaxed text-dark/70">
              {paragraph}
            </p>
          ))}
        </div>
        {platform ? (
          <Card variant="glass" className="flex flex-col gap-4 self-start">
            <h3 className="font-display text-xl font-bold">{platform.heading}</h3>
            <p className="text-sm leading-relaxed text-white/80">{platform.text}</p>
            <a
              href={CRM_URL}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-light hover:text-white"
            >
              {platform.linkLabel}
              <ExternalLink aria-hidden className="h-4 w-4" />
            </a>
          </Card>
        ) : null}
      </Container>
    </Section>
  )
}

function Includes({ page, heading }: Readonly<{ page: ServicePage; heading: string }>) {
  return (
    <Section className="bg-teal-light/5">
      <Container>
        <h2 className="text-center font-display text-3xl font-bold tracking-tight sm:text-4xl">{heading}</h2>
        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {page.includes.map((item) => (
            <li key={item.title}>
              <Card variant="plain" className="flex h-full flex-col gap-3">
                <div className="flex items-start gap-3">
                  <Check aria-hidden className="mt-1 h-5 w-5 shrink-0 text-teal-light" />
                  <h3 className="font-display text-lg font-bold">{item.title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-dark/70">{item.description}</p>
              </Card>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}

function Process({ page, heading }: Readonly<{ page: ServicePage; heading: string }>) {
  return (
    <Section className="bg-white">
      <Container>
        <h2 className="text-center font-display text-3xl font-bold tracking-tight sm:text-4xl">{heading}</h2>
        <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {page.process.map((step, index) => (
            <li key={step.title} className="flex flex-col gap-3 rounded-2xl border border-dark/10 p-6">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-dark font-sans text-sm font-bold text-teal-light"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-lg font-bold">{step.title}</h3>
              </div>
              <p className="text-sm leading-relaxed text-dark/70">{step.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  )
}

function Audience({ page, heading }: Readonly<{ page: ServicePage; heading: string }>) {
  return (
    <Section className="bg-dark text-white">
      <Container className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{heading}</h2>
          <p className="mt-5 text-lg leading-relaxed text-white/70">{page.audience.text}</p>
        </div>
        <ul className="flex flex-col gap-4">
          {page.audience.items.map((item) => (
            <li key={item} className="flex items-start gap-3 text-base text-white/85">
              <Check aria-hidden className="mt-1 h-5 w-5 shrink-0 text-teal-light" />
              {item}
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}

function RelatedServices({
  ids,
  dict,
  locale,
}: Readonly<{ ids: ServicePageId[]; dict: Dictionary; locale: Locale }>) {
  const { common, items } = dict.servicePages

  return (
    <Section className="bg-white">
      <Container>
        <h2 className="text-center font-display text-3xl font-bold tracking-tight sm:text-4xl">
          {common.relatedHeading}
        </h2>
        <ul className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
          {ids.map((id) => {
            const Icon = SERVICE_PAGE_ICONS[id] ?? Check
            return (
              <li key={id}>
                <Link
                  href={localePath(locale, servicePagePath(id, locale))}
                  className="group flex h-full items-center gap-4 rounded-2xl border border-dark/10 p-6 transition-colors hover:border-teal-light focus-visible:outline-2 focus-visible:outline-teal-light"
                >
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-dark text-teal-light">
                    <Icon aria-hidden className="h-6 w-6" />
                  </span>
                  <span className="flex flex-col">
                    <span className="font-display text-lg font-bold">{items[id].navLabel}</span>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-dark/70 group-hover:text-dark">
                      {common.relatedLink}
                      <ArrowRight aria-hidden className="h-4 w-4" />
                    </span>
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </Container>
    </Section>
  )
}

type ServiceLandingProps = {
  id: ServicePageId
  breadcrumbs: Breadcrumb[]
}

export async function ServiceLanding({ id, breadcrumbs }: Readonly<ServiceLandingProps>) {
  const dict = await getDictionary()
  const locale = await getLocale()
  const { common, crmPlatform } = dict.servicePages
  const page = dict.servicePages.items[id]

  return (
    <>
      <LandingHero page={page} common={common} locale={locale} breadcrumbs={breadcrumbs} />
      <Definition page={page} platform={id === 'crm-arm' ? crmPlatform : undefined} />
      <Includes page={page} heading={common.includesHeading} />
      <Process page={page} heading={common.processHeading} />
      <Audience page={page} heading={common.audienceHeading} />
      <RelatedServices ids={page.related.filter(isServicePageId)} dict={dict} locale={locale} />
    </>
  )
}
