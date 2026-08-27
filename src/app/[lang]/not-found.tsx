import { lang } from 'next/root-params'
import { AnimatedHeading } from '@/components/animations/AnimatedHeading'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { getDictionary } from '@/lib/i18n/dictionaries'

export default async function NotFound() {
  const dict = await getDictionary()
  const locale = await lang()

  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center gap-6 pt-24 text-center">
      <p className="font-display text-7xl font-bold text-dark">404</p>
      <h1 className="font-display">
        <AnimatedHeading
          line1={dict.notFound.title}
          fontSize={48}
          dark
          align="center"
          className="text-3xl font-bold"
        />
      </h1>
      <p className="max-w-md text-dark/60">{dict.notFound.description}</p>
      <Button href={`/${locale}`}>{dict.notFound.button}</Button>
    </Container>
  )
}
