import { lang } from 'next/root-params'
import { notFound } from 'next/navigation'

const dictionaries = {
  es: () => import('./es.json').then((module) => module.default),
  en: () => import('./en.json').then((module) => module.default),
}

export type Locale = keyof typeof dictionaries
export type Dictionary = Awaited<ReturnType<(typeof dictionaries)[Locale]>>

export const LOCALES: Locale[] = ['es', 'en']
export const DEFAULT_LOCALE: Locale = 'es'

export const hasLocale = (locale: string): locale is Locale => locale in dictionaries

export async function getDictionary(): Promise<Dictionary> {
  const locale = await lang()
  if (!hasLocale(locale)) notFound()
  return dictionaries[locale]()
}

export async function getLocale(): Promise<Locale> {
  const locale = await lang()
  return hasLocale(locale) ? locale : DEFAULT_LOCALE
}
