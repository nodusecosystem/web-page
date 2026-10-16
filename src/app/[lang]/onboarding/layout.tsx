import { lang } from 'next/root-params'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Logo } from '@/components/ui/Logo'
import { SITE_NAME } from '@/lib/constants/site'
import { getDictionary, LOCALES } from '@/lib/i18n/dictionaries'
import { cn } from '@/lib/cn'

export default async function OnboardingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const dict = await getDictionary()
  const locale = await lang()

  return (
    <>
      <div className="bg-dark text-white">
        <Container className="flex h-16 items-center justify-between gap-4">
          <span className="inline-flex items-center gap-2.5">
            <Logo variant="isotipo" theme="dark" className="h-8 w-auto" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase">{SITE_NAME}</span>
          </span>
          <nav aria-label={dict.layout.langToggle.ariaLabel}>
            <ul className="flex items-center gap-1 rounded-full border border-white/15 p-1">
              {LOCALES.map((code) => {
                const isActive = code === locale
                return (
                  <li key={code}>
                    <Link
                      href={`/${code}/onboarding`}
                      aria-current={isActive ? 'true' : undefined}
                      className={cn(
                        'block rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors',
                        isActive
                          ? 'bg-teal-light text-dark'
                          : 'text-white/70 hover:bg-white/10 hover:text-white',
                      )}
                    >
                      {dict.layout.langToggle[code]}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </Container>
      </div>
      <main id="main-content" className="relative bg-white">
        {children}
      </main>
    </>
  )
}
