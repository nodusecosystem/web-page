import { ClipboardCheck, FileText, Gauge, Rocket, Target } from 'lucide-react'
import type { MethodologyStep } from '@/lib/types'

export const METHODOLOGY_STEPS: MethodologyStep[] = [
  {
    id: 'diagnostico',
    step: '01',
    title: 'Diagnóstico',
    description:
      'Auditamos tu presencia digital, analizamos a tu competencia y detectamos las oportunidades de mayor impacto.',
    duration: 'Semana 1',
    icon: ClipboardCheck,
  },
  {
    id: 'plan',
    step: '02',
    title: 'Plan de acción',
    description:
      'Definimos objetivos, KPIs y un plan mensual accionable, alineado con tu negocio y tu presupuesto.',
    duration: 'Semanas 1-2',
    icon: Target,
  },
  {
    id: 'ejecucion',
    step: '03',
    title: 'Ejecución',
    description:
      'Lanzamos campañas, contenido y desarrollos con un foco claro en la conversión y el crecimiento.',
    duration: 'Semanas 2-3',
    icon: Rocket,
  },
  {
    id: 'optimizacion',
    step: '04',
    title: 'Optimización',
    description:
      'Iteramos con datos reales: potenciamos lo que funciona y corregimos rápido lo que no.',
    duration: 'Semanas 3-4',
    icon: Gauge,
  },
  {
    id: 'reporte',
    step: '05',
    title: 'Reporte y revisión',
    description:
      'Te entregamos un reporte claro y ajustamos la estrategia del siguiente ciclo en una llamada de revisión.',
    duration: 'Cada mes',
    icon: FileText,
  },
]
