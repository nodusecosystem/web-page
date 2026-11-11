import { Mail, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'
import { CookiePreferencesButton } from '@/components/consent/CookiePreferencesButton'
import { LanguageLinks } from '@/components/layout/LanguageLinks'
import { LogoFull } from '@/components/ui/brand/LogoFull'
import { Container } from '@/components/ui/Container'
import { FacebookIcon, InstagramIcon, LinkedInIcon } from '@/components/ui/social-icons'
import type { ComponentType, SVGProps } from 'react'
import { SERVICE_PAGE_IDS, servicePagePath } from '@/lib/constants/services'
import { CONTACT_EMAIL, CONTACT_PHONE, SITE_NAME, SOCIAL_LINKS } from '@/lib/constants/site'
import { format, localePath } from '@/lib/format'
import { getDictionary, getLocale, LOCALES } from '@/lib/i18n/dictionaries'

type SocialIcon = {
  label: string
  href: string
  Icon: ComponentType<SVGProps<SVGSVGElement>>
}

const SOCIAL_ICONS: SocialIcon[] = [
  { label: 'LinkedIn', href: SOCIAL_LINKS.linkedin, Icon: LinkedInIcon },
  { label: 'Instagram', href: SOCIAL_LINKS.instagram, Icon: InstagramIcon },
  { label: 'Facebook', href: SOCIAL_LINKS.facebook, Icon: FacebookIcon },
]

export async function Footer() {
  const dict = await getDictionary()
  const locale = await getLocale()
  const { footer, nav } = dict.layout
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark text-white">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-5">
            <LogoFull theme="dark" className="h-42 w-auto" />
            <p className="max-w-xs text-sm leading-relaxed text-white/70">{footer.description}</p>
            <address className="flex flex-col gap-2 text-sm text-white/70 not-italic">
              <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex items-center gap-2 hover:text-teal-light">
                <Mail aria-hidden className="h-4 w-4 text-teal-light" />
                {CONTACT_EMAIL}
              </a>
              <a
                href={`tel:${CONTACT_PHONE.replace(/\s/g, '')}`}
                className="inline-flex items-center gap-2 hover:text-teal-light"
              >
                <Phone aria-hidden className="h-4 w-4 text-teal-light" />
                {CONTACT_PHONE}
              </a>
              <span className="inline-flex items-start gap-2">
                <MapPin aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-teal-light" />
                {footer.serviceArea}
              </span>
            </address>
            <ul className="flex gap-3">
              {SOCIAL_ICONS.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={format(footer.socialAria, { platform: label, name: SITE_NAME })}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-teal-light hover:text-dark"
                  >
                    <Icon />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label={footer.navHeading}>
            <h2 className="font-display text-sm font-bold tracking-wider uppercase text-white/90">
              {footer.navHeading}
            </h2>
            <ul className="mt-5 flex flex-col gap-3">
              {nav.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={localePath(locale, link.href)}
                    className="text-sm text-white/70 transition-colors hover:text-teal-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-sm font-bold tracking-wider uppercase text-white/90">
              {footer.servicesHeading}
            </h2>
            <ul className="mt-5 flex flex-col gap-3">
              {SERVICE_PAGE_IDS.map((id) => (
                <li key={id}>
                  <Link
                    href={localePath(locale, servicePagePath(id, locale))}
                    className="text-sm text-white/70 transition-colors hover:text-teal-light"
                  >
                    {dict.servicePages.items[id].navLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-sm font-bold tracking-wider uppercase text-white/90">
              {footer.legalHeading}
            </h2>
            <ul className="mt-5 flex flex-col gap-3">
              {footer.legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={localePath(locale, link.href)}
                    className="text-sm text-white/70 transition-colors hover:text-teal-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <CookiePreferencesButton label={dict.cookieConsent.preferencesLabel} />
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm text-white/60">
            © {currentYear} {SITE_NAME}. {footer.rightsSuffix}
          </p>
          <LanguageLinks
            label={footer.languageLabel}
            currentLocale={locale}
            options={LOCALES.map((code) => ({ code, label: dict.layout.langToggle[code] }))}
          />
          <p className="text-sm text-white/60">{footer.madeWith}</p>
        </div>
      </Container>
    </footer>
  )
}
