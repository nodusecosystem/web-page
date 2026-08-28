'use client'

import { Inter } from 'next/font/google'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

const STRINGS = {
  es: {
    title: 'Página no encontrada',
    description:
      'La página que buscas no existe o ha sido movida. Vuelve al inicio para seguir explorando.',
    button: 'Volver al inicio',
  },
  en: {
    title: 'Page not found',
    description:
      "The page you're looking for doesn't exist or has been moved. Go back home to keep exploring.",
    button: 'Back to home',
  },
} as const

export const metadata = {
  title: '404 - Página no encontrada | nodus',
  description: 'La página que buscas no existe o ha sido movida.',
}

export default function GlobalNotFound() {
  const pathname = usePathname()
  const locale = pathname?.split('/')[1] === 'en' ? 'en' : 'es'
  const t = STRINGS[locale]

  return (
    <html lang={locale} className={`${inter.className} bg-dark`}>
      <body className="bg-dark font-sans text-white antialiased">
        <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
          <p className="font-display text-7xl font-bold text-teal-light">404</p>
          <h1 className="font-display text-3xl font-bold">{t.title}</h1>
          <p className="max-w-md text-base leading-relaxed text-white/70">{t.description}</p>
          <Link
            href={`/${locale}`}
            className="rounded-full bg-teal-light px-6 py-3 font-semibold text-dark transition-colors hover:bg-white"
          >
            {t.button}
          </Link>
        </main>
      </body>
    </html>
  )
}
