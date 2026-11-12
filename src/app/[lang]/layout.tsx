import type { Metadata, Viewport } from 'next'
import { lang } from 'next/root-params'
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics'
import { CookieConsent } from '@/components/consent/CookieConsent'
import { SITE_NAME, SITE_URL } from '@/lib/constants/site'
import { fontVariables } from '@/lib/fonts'
import { getDictionary, getLocale } from '@/lib/i18n/dictionaries'
import { buildPageMetadata, samePath, siteVerification } from '@/lib/seo/metadata'
import '@/styles/globals.css'
import '@/styles/glass-button.css'

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary()
  const locale = await getLocale()

  return {
    ...buildPageMetadata({
      locale,
      paths: samePath(''),
      title: { absolute: dict.metadata.home.title },
      description: dict.site.description,
    }),
    metadataBase: new URL(SITE_URL),
    title: {
      default: dict.metadata.home.title,
      template: `%s | ${SITE_NAME}`,
    },
    applicationName: SITE_NAME,
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
    verification: siteVerification(),
    manifest: '/site.webmanifest',
    icons: {
      icon: [
        { url: '/favicon-32x32-v2.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon-16x16-v2.png', sizes: '16x16', type: 'image/png' },
      ],
      apple: [{ url: '/icon.png', sizes: '180x180', type: 'image/png' }],
      other: [
        { url: '/android-chrome-192x192-v2.png', sizes: '192x192', type: 'image/png' },
        { url: '/android-chrome-512x512-v2.png', sizes: '512x512', type: 'image/png' },
      ],
    },
  }
}

export const viewport: Viewport = {
  themeColor: '#000F13',
}

export async function generateStaticParams() {
  return [{ lang: 'es' }, { lang: 'en' }]
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const dict = await getDictionary()
  const locale = await lang()

  return (
    <html lang={locale} className={fontVariables}>
      <body className="bg-white font-sans text-dark antialiased">
        <link rel="describedby" href="/llms.txt" type="text/markdown" />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-full focus:bg-teal-light focus:px-4 focus:py-2 focus:font-semibold focus:text-dark"
        >
          {dict.layout.skipToContent}
        </a>
        {children}
        <CookieConsent strings={dict.cookieConsent} locale={locale} />
        <GoogleAnalytics />
      </body>
    </html>
  )
}
