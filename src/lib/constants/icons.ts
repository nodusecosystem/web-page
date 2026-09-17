import {
  BarChart3,
  ClipboardCheck,
  Code2,
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

export const HERO_STAT_ICONS: Record<string, LucideIcon> = {
  crecimiento: TrendingUp,
  ads: Megaphone,
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
  'rigor-analitico': BarChart3,
  'transparencia-propiedad': ShieldCheck,
  'agilidad-iteracion': Zap,
  'alineacion-incentivos': Handshake,
}

export const PHILOSOPHY_ICONS: Record<string, LucideIcon> = {
  'metricas-negocio': BarChart3,
  'ecosistemas-integrados': Workflow,
  'entregables-impacto': Gauge,
  'socios-crecimiento': Handshake,
}
