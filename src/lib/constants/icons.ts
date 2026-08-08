import {
  BarChart3,
  ClipboardCheck,
  Code2,
  Compass,
  FileText,
  Gauge,
  Handshake,
  Megaphone,
  Rocket,
  ShieldCheck,
  Target,
  TrendingUp,
  Workflow,
  Zap,
  type LucideIcon,
} from 'lucide-react'

export const SERVICE_ICONS: Record<string, LucideIcon> = {
  estrategia: BarChart3,
  'pauta-digital': Megaphone,
  desarrollo: Code2,
  automatizacion: Workflow,
}

export const METHODOLOGY_ICONS: Record<string, LucideIcon> = {
  diagnostico: ClipboardCheck,
  plan: Target,
  ejecucion: Rocket,
  optimizacion: Gauge,
  reporte: FileText,
}

export const ABOUT_VALUE_ICONS: Record<string, LucideIcon> = {
  datos: BarChart3,
  transparencia: ShieldCheck,
  velocidad: Zap,
  crecimiento: TrendingUp,
}

export const PHILOSOPHY_ICONS: Record<string, LucideIcon> = {
  datos: BarChart3,
  estrategia: Compass,
  resultados: Gauge,
  partner: Handshake,
}
