export function format(template: string, params: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in params ? String(params[key]) : match,
  )
}

export function localePath(locale: string, path: string): string {
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path
  if (path === '/') return `/${locale}`
  if (path.startsWith(`/${locale}`)) return path
  return `/${locale}${path}`
}
