import type { Metadata } from 'next'
import { lang } from 'next/root-params'
import { AnimatedHeading } from '@/components/animations/AnimatedHeading'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { localePath } from '@/lib/format'

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary()

  return {
    title: dict.notFound.title,
    description: dict.notFound.description,
  }
}

export default async function NotFound() {
  const dict = await getDictionary()
  const locale = await lang()

  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center gap-6 pt-24 text-center">
      <p className="font-sans text-7xl font-bold text-dark">404</p>
      <h2 className="font-display">
        <AnimatedHeading
          line1={dict.notFound.title}
          fontSize={48}
          dark
          align="center"
          className="text-3xl font-bold"
        />
      </h2>
      <p className="max-w-md text-dark/60">{dict.notFound.description}</p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button href={`/${locale}`} size="lg" variant="solid">
          {dict.notFound.button}
        </Button>
        <Button href={localePath(locale, '/contact')} size="lg" variant="ghost">
          {dict.notFound.contactLink}
        </Button>
      </div>
    </Container>
  )
}
