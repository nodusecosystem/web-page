import type { Dictionary } from '@/lib/i18n/dictionaries'

export type Breadcrumb = { name: string; path: string }

export const navLabel = (dict: Dictionary, href: string): string =>
  dict.layout.nav.links.find((link) => link.href === href)?.label ?? href

export const buildBreadcrumbs = (dict: Dictionary, trail: Breadcrumb[]): Breadcrumb[] => [
  { name: navLabel(dict, '/'), path: '' },
  ...trail,
]
