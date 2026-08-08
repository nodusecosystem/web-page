import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center gap-6 pt-24 text-center">
      <p className="font-display text-7xl font-bold text-deep-blue">404</p>
      <h1 className="font-display text-3xl font-bold">Página no encontrada</h1>
      <p className="max-w-md text-navy/60">
        La página que buscas no existe o ha sido movida. Vuelve al inicio para seguir explorando.
      </p>
      <Button href="/">Volver al inicio</Button>
    </Container>
  )
}
