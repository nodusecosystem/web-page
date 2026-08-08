import { BarChart3, Compass, Gauge, Handshake, ShieldCheck, TrendingUp, Zap } from 'lucide-react'
import type { FeatureItem, Stat } from '@/lib/types'

export const ABOUT_MISSION =
  'Acelerar el crecimiento digital de empresas ambiciosas con estrategia basada en datos, ejecución mensual y tecnología que escala con su negocio.'

export const ABOUT_VISION =
  'Ser el partner de aceleración digital de referencia para pymes y scaleups que quieren competir con los grandes sin depender de una agencia tradicional.'

export const ABOUT_VALUES: FeatureItem[] = [
  {
    id: 'datos',
    title: 'Decisiones con datos',
    description: 'Ninguna decisión importante se toma por intuición: cada euro invertido está justificado por una métrica.',
    icon: BarChart3,
  },
  {
    id: 'transparencia',
    title: 'Transparencia total',
    description: 'Reportes claros, acceso a las cuentas y sin letra pequeña. Sabes siempre qué hacemos y por qué.',
    icon: ShieldCheck,
  },
  {
    id: 'velocidad',
    title: 'Velocidad de ejecución',
    description: 'Iteramos en semanas, no en trimestres. En un mercado que no espera, la velocidad es una ventaja.',
    icon: Zap,
  },
  {
    id: 'crecimiento',
    title: 'Crecimiento conjunto',
    description: 'Ganamos cuando tu negocio gana: trabajamos como un equipo interno, no como un proveedor externo.',
    icon: TrendingUp,
  },
]

export const PHILOSOPHY_POINTS: FeatureItem[] = [
  {
    id: 'datos',
    title: 'Datos sobre opiniones',
    description: 'Medimos cada acción y cada campaña. Si no se puede medir, no se puede mejorar.',
    icon: BarChart3,
  },
  {
    id: 'estrategia',
    title: 'Estrategia sobre publicación',
    description: 'No publicamos por publicar: cada contenido y cada anuncio responde a un objetivo de negocio.',
    icon: Compass,
  },
  {
    id: 'resultados',
    title: 'Resultados sobre actividad',
    description: 'No vendemos horas ni tareas: vendemos resultados mensuales, medibles y acordados desde el día uno.',
    icon: Gauge,
  },
  {
    id: 'partner',
    title: 'Partner sobre proveedor',
    description: 'Nos sentamos a tu lado, entendemos tu negocio y defendemos tus intereses como si fueran nuestros.',
    icon: Handshake,
  },
]

export const ABOUT_STATS: Stat[] = [
  { value: '+40', label: 'empresas aceleradas' },
  { value: '98%', label: 'retención de clientes' },
  { value: '12+', label: 'industrias digitalizadas' },
  { value: '3.2x', label: 'ROAS medio en pauta' },
]
