import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_NAME } from '@/lib/constants/site'
import { fontVariables } from '@/lib/fonts'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: `404 - Página no encontrada | ${SITE_NAME}`,
  description: 'La página que buscas no existe o ha sido movida.',
  robots: { index: false, follow: true },
}

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

export default function GlobalNotFound() {
  return (
    <html lang="es" className={`${fontVariables} bg-dark`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `document.addEventListener('DOMContentLoaded',function(){try{var en=window.location.pathname.split('/')[1]==='en';document.documentElement.lang=en?'en':'es';document.querySelectorAll('[data-lang]').forEach(function(n){n.hidden=n.getAttribute('data-lang')!==(en?'en':'es')})}catch(e){}});`,
          }}
        />
      </head>
      <body className="bg-dark font-sans text-white antialiased">
        <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
          <p className="font-sans text-7xl font-bold text-teal-light">404</p>
          <h1 className="font-display text-3xl font-bold">
            <span data-lang="es">{STRINGS.es.title}</span>
            <span data-lang="en" lang="en" hidden>
              {STRINGS.en.title}
            </span>
          </h1>
          <div data-lang="es" className="flex flex-col items-center gap-6">
            <p className="max-w-md text-base leading-relaxed text-white/70">{STRINGS.es.description}</p>
            <Link
              href="/es"
              className="rounded-full bg-teal-light px-6 py-3 font-semibold text-dark transition-colors hover:bg-white"
            >
              {STRINGS.es.button}
            </Link>
          </div>
          <div data-lang="en" lang="en" hidden className="flex flex-col items-center gap-6">
            <p className="max-w-md text-base leading-relaxed text-white/70">{STRINGS.en.description}</p>
            <Link
              href="/en"
              className="rounded-full bg-teal-light px-6 py-3 font-semibold text-dark transition-colors hover:bg-white"
            >
              {STRINGS.en.button}
            </Link>
          </div>
        </main>
      </body>
    </html>
  )
}
