import { BarChart3, Code2, Megaphone, Workflow } from 'lucide-react'
import type { Service } from '@/lib/types'

export const SERVICES: Service[] = [
  {
    id: 'estrategia',
    title: 'Estrategia Digital y Branding',
    description:
      'Analizamos tu mercado, tu competencia y tus datos para definir el rumbo: posicionamiento, mensajes y un plan mensual de contenido y SEO que genera resultados.',
    icon: BarChart3,
    features: [
      'Auditoría digital completa',
      'Posicionamiento y branding',
      'Plan mensual de contenidos',
      'SEO on-page y técnico',
    ],
    deliverables: [
      'Documento de estrategia y plan mensual',
      'Guía de marca y mensajes clave',
      'Calendario editorial mensual',
      'Reporte de KPIs y rendimiento',
    ],
  },
  {
    id: 'pauta-digital',
    title: 'Campañas y Pauta Digital',
    description:
      'Diseñamos y optimizamos campañas en Meta Ads y Google Ads que convierten: segmentación correcta, creativos adecuados y presupuesto bien invertido.',
    icon: Megaphone,
    features: [
      'Campañas Meta Ads',
      'Campañas Google Ads',
      'Segmentación avanzada',
      'A/B testing y optimización',
    ],
    deliverables: [
      'Estructura de cuentas y campañas',
      'Creativos y textos publicitarios',
      'Landing pages de campaña',
      'Optimización semanal y reportes',
    ],
  },
  {
    id: 'desarrollo',
    title: 'Desarrollo Web & Software',
    description:
      'Construimos experiencias digitales rápidas y convertidoras con Next.js y arquitecturas escalables: desde landing pages de alto rendimiento hasta software a medida.',
    icon: Code2,
    features: [
      'Landing pages de conversión',
      'Tiendas y sitios web',
      'Software a medida',
      'Performance y SEO técnico',
    ],
    deliverables: [
      'Web o landing page funcional',
      'Diseño responsive y accesible',
      'Optimización Core Web Vitals',
      'Mantenimiento y soporte mensual',
    ],
  },
  {
    id: 'automatizacion',
    title: 'Automatización e Integraciones',
    description:
      'Automatizamos procesos repetitivos para que tu equipo venda más y trabaje mejor: leads respondidos en segundos y tareas en piloto automático.',
    icon: Workflow,
    features: [
      'Embudos de venta automáticos',
      'CRM y email marketing',
      'Integraciones y workflows',
      'Atención al cliente 24/7',
    ],
    deliverables: [
      'Flujos de automatización activos',
      'CRM configurado e integrado',
      'Secuencias de email marketing',
      'Documentación y soporte',
    ],
  },
]
