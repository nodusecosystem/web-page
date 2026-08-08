import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const LOCALES = ['es', 'en']
const DEFAULT_LOCALE = 'es'

function getLocale(request: NextRequest): string {
  const header = request.headers.get('accept-language') ?? ''
  const preferred = header
    .split(',')
    .map((part) => part.split(';')[0]?.trim().toLowerCase() ?? '')
    .map((lang) => lang.slice(0, 2))
    .find((lang) => LOCALES.includes(lang))

  return preferred ?? DEFAULT_LOCALE
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  )

  if (pathnameHasLocale) return

  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    '/((?!_next|images|favicon\\.ico|icon\\.png|robots\\.txt|sitemap\\.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif)$).*)',
  ],
}
