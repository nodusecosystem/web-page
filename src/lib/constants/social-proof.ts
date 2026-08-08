import type { CaseStudy, Stat } from '@/lib/types'

export const HERO_STATS: Stat[] = [
  { value: '+40%', label: 'ROI promedio en campañas' },
  { value: '98%', label: 'Retención de clientes' },
  { value: '12+', label: 'Industrias digitalizadas' },
  { value: '24/7', label: 'Automatizaciones activas' },
]

export const CLIENT_NAMES: string[] = [
  'TechNova',
  'Clínica Sonríe',
  'Café Altura',
  'UrbanFit',
  'Grupo Andino',
  'Hotel Miramar',
]

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'clinica-sonrie',
    client: 'Clínica Sonríe',
    industry: 'Salud',
    description:
      'Triplicamos las citas online en cuatro meses combinando campañas de Meta Ads con un embudo de recordatorios automatizado.',
    testimonial:
      'Pasamos de depender del boca a boca a tener una agenda llena cada mes. Los reportes mensuales nos dejaban claro dónde estaba cada euro.',
    metrics: [
      { value: '+320%', label: 'citas online' },
      { value: '-45%', label: 'no-shows' },
    ],
  },
  {
    id: 'cafe-altura',
    client: 'Café Altura',
    industry: 'Retail y Food',
    description:
      'Plan de contenido, tienda online y automatización de email que convirtieron una marca local en un ecommerce rentable.',
    testimonial:
      'La web que nos montaron carga en segundos y las campañas nos traen clientes cada semana. Por fin entendemos los números del negocio.',
    metrics: [
      { value: '+180%', label: 'ventas online' },
      { value: '3.2x', label: 'ROAS en Meta' },
    ],
  },
  {
    id: 'grupo-andino',
    client: 'Grupo Andino',
    industry: 'B2B / Construcción',
    description:
      'Automatización del CRM y estrategia de contenido B2B que acortó el ciclo de venta y multiplicó los leads calificados.',
    testimonial:
      'El CRM automatizado respondía a los leads antes de que nosotros supiéramos que existían. El equipo comercial vende, no persigue.',
    metrics: [
      { value: '+65%', label: 'leads calificados' },
      { value: '-30%', label: 'tiempo de respuesta' },
    ],
  },
]
