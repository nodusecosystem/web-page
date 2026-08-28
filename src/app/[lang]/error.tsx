'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import esDict from '@/lib/i18n/es.json'
import enDict from '@/lib/i18n/en.json'

export default function ErrorPage({
  error,
  reset,
}: Readonly<{ error: Error & { digest?: string }; reset: () => void }>) {
  const params = useParams()
  const locale = typeof params?.lang === 'string' ? params.lang : 'es'
  const dict = locale === 'en' ? enDict : esDict

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center gap-6 pt-24 text-center">
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-light/10 text-teal-light">
        <AlertTriangle aria-hidden className="h-7 w-7" />
      </span>
      <h1 className="font-display text-4xl leading-tight font-bold tracking-tight sm:text-5xl">
        {dict.error.title}
      </h1>
      <p className="max-w-md text-lg leading-relaxed text-dark/60">{dict.error.description}</p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button onClick={reset} size="lg" variant="solid">
          {dict.error.retry}
        </Button>
        <Button href={`/${locale}`} size="lg" variant="outline">
          {dict.error.backHome}
        </Button>
      </div>
    </Container>
  )
}
