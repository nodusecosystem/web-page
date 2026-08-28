import { Inter } from 'next/font/google'
import Link from 'next/link'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: '404 - Página no encontrada | nodus',
  description: 'La página que buscas no existe o ha sido movida.',
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
    <html lang="es" className={`${inter.className} bg-dark`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var p=window.location.pathname.split('/')[1];var en=p==='en';document.documentElement.lang=en?'en':'es';document.getElementById('block-es').hidden=en;document.getElementById('block-en').hidden=!en}catch(e){}})();`,
          }}
        />
      </head>
      <body className="bg-dark font-sans text-white antialiased">
        <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
          <p className="font-sans text-7xl font-bold text-teal-light">404</p>
          <div id="block-es" className="flex flex-col items-center gap-6">
            <h2 className="font-display text-3xl font-bold">{STRINGS.es.title}</h2>
            <p className="max-w-md text-base leading-relaxed text-white/70">{STRINGS.es.description}</p>
            <Link
              href="/es"
              className="rounded-full bg-teal-light px-6 py-3 font-semibold text-dark transition-colors hover:bg-white"
            >
              {STRINGS.es.button}
            </Link>
          </div>
          <div id="block-en" hidden className="flex flex-col items-center gap-6">
            <h2 className="font-display text-3xl font-bold">{STRINGS.en.title}</h2>
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
