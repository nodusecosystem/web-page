import { lang } from 'next/root-params'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { FloatingWhatsApp } from '@/components/ui/FloatingWhatsApp'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import { buildWhatsAppLink } from '@/lib/constants/site'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { localePath } from '@/lib/format'

export default async function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const dict = await getDictionary()
  const locale = await lang()

  return (
    <>
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
      <main id="main-content" className="relative bg-white">
        {children}
      </main>
      <Footer />
      <FloatingWhatsApp
        href={buildWhatsAppLink(dict.site.whatsappMessage)}
        ariaLabel={dict.floatingWhatsApp.ariaLabel}
        tooltip={dict.floatingWhatsApp.tooltip}
      />
      <ScrollToTop ariaLabel={dict.scrollToTop.ariaLabel} />
    </>
  )
}
