import { Container } from '@/components/ui/Container'
import { getDictionary } from '@/lib/i18n/dictionaries'

export default async function Loading() {
  const dict = await getDictionary()

  return (
    <Container className="grid min-h-[60vh] place-items-center pt-24">
      <div className="w-full max-w-3xl text-center" role="status">
        <span className="sr-only">{dict.loading.label}</span>
        <div className="mx-auto mb-8 h-14 w-14 animate-spin rounded-full border-2 border-teal-light/20 border-t-teal-light" />
        <div className="mx-auto h-8 w-2/3 animate-pulse rounded-full bg-teal-light/10" />
        <div className="mx-auto mt-4 h-4 w-1/2 animate-pulse rounded-full bg-teal-light/5" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className="h-44 animate-pulse rounded-2xl bg-teal-light/5" />
          ))}
        </div>
      </div>
    </Container>
  )
}
