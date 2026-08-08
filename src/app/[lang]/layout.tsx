import type { Metadata, Viewport } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import { lang } from 'next/root-params'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { FloatingWhatsApp } from '@/components/ui/FloatingWhatsApp'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import { SITE_NAME, SITE_URL, buildWhatsAppLink } from '@/lib/constants/site'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { localePath } from '@/lib/format'
import '@/styles/globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary()
  const locale = await lang()

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: SITE_NAME,
      template: `%s | ${SITE_NAME}`,
    },
    description: dict.site.description,
    applicationName: SITE_NAME,
    alternates: {
      canonical: `/${locale}`,
      languages: { es: '/es', en: '/en' },
    },
    openGraph: {
      type: 'website',
      url: `${SITE_URL}/${locale}`,
      siteName: SITE_NAME,
      title: SITE_NAME,
      description: dict.site.description,
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      images: [
        {
          url: '/images/og-image.png',
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: SITE_NAME,
      description: dict.site.description,
      images: ['/images/og-image.png'],
    },
    robots: {
      index: true,
      follow: true,
    },
    icons: {
      icon: '/favicon.ico',
      apple: '/icon.png',
    },
  }
}

export const viewport: Viewport = {
  themeColor: '#0a1f3b',
}

export async function generateStaticParams() {
  return [{ lang: 'es' }, { lang: 'en' }]
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const dict = await getDictionary()
  const locale = await lang()

  return (
    <html lang={locale} className={`${inter.variable} ${montserrat.variable}`}>
      <body className="bg-white font-sans text-navy antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-full focus:bg-turquoise focus:px-4 focus:py-2 focus:font-semibold focus:text-navy"
        >
          {dict.layout.skipToContent}
        </a>
        <Header
          links={dict.layout.nav.links.map((link) => ({
            ...link,
            href: localePath(locale, link.href),
          }))}
          cta={{
            ...dict.layout.nav.cta,
            href: localePath(locale, dict.layout.nav.cta.href),
          }}
          ariaLabels={dict.layout.header}
          homeHref={localePath(locale, '/')}
          currentLocale={locale}
          langToggle={dict.layout.langToggle}
        />
        <main id="main-content">{children}</main>
        <Footer />
        <FloatingWhatsApp
          href={buildWhatsAppLink(dict.site.whatsappMessage)}
          ariaLabel={dict.floatingWhatsApp.ariaLabel}
          tooltip={dict.floatingWhatsApp.tooltip}
        />
        <ScrollToTop ariaLabel={dict.scrollToTop.ariaLabel} />
      </body>
    </html>
  )
}
