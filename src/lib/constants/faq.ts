import type { FAQItem } from '@/lib/types'

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'plan-mensual',
    question: '¿Cómo funciona el plan mensual?',
    answer:
      'Cada mes activamos un ciclo de diagnóstico, planificación, ejecución, optimización y reporte. El plan incluye estrategia, ejecución y un reporte claro de resultados: tú eliges el alcance y lo escalas cuando quieras.',
  },
  {
    id: 'permanencia',
    question: '¿Hay permanencia o contratos largos?',
    answer:
      'No. Trabajamos mes a mes, sin cláusulas de permanencia. Si en cualquier momento no estás viendo el valor que esperas, cancelas sin coste ni burocracia.',
  },
  {
    id: 'tiempos',
    question: '¿En cuánto tiempo veré resultados?',
    answer:
      'La primera semana verás la auditoría y el plan de acción. Los primeros resultados medibles llegan entre el primer y segundo mes: pauta optimizada, embudos activos y mejoras de conversión en tu web.',
  },
  {
    id: 'primera-semana',
    question: '¿Qué incluye la primera semana?',
    answer:
      'Auditoría completa de tu presencia digital, análisis de competencia, definición de KPIs y un plan mensual accionable. Al terminar la semana sabrás exactamente qué vamos a hacer y por qué.',
  },
  {
    id: 'garantia',
    question: '¿Qué garantía tenéis?',
    answer:
      'Garantía de calidad y transparencia: si un entregable acordado no llega, no se factura. Además, el primer reporte mensual incluye una revisión conjunta donde validamos los resultados antes de renovar.',
  },
  {
    id: 'cancelacion',
    question: '¿Qué pasa si quiero cancelar?',
    answer:
      'Solo tienes que avisarnos antes de renovar el siguiente ciclo. Te entregamos la documentación de todo lo implementado y una guía de continuidad para que no pierdas el trabajo realizado.',
  },
  {
    id: 'equipo',
    question: '¿Quién ejecuta el plan?',
    answer:
      'Un equipo dedicado: estratega, especialista en pauta, desarrollador y automatizador. Trabajamos con herramientas compartidas para que veas el avance en tiempo real, sin intermediarios.',
  },
  {
    id: 'equipo-interno',
    question: '¿Trabajáis con nuestro equipo interno?',
    answer:
      'Sí, es nuestra modalidad favorita. Nos integramos con tu equipo, documentamos procesos y te formamos para que cada vez dependas menos de nosotros y puedas crecer con nuestras herramientas.',
  },
]

export const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
} as const
