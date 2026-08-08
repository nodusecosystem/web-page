# nodus: digital strategy

Landing page de conversión de la agencia de estrategia digital **nodus: digital strategy**, construida con Next.js 16 (App Router), TypeScript strict, Tailwind CSS v4 y Framer Motion.

## Requisitos

- Node.js 20.9+ (probado con Node 24)
- npm 11+

## Comandos

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm start` | Servir el build de producción |
| `npm run lint` | ESLint (flat config) |
| `npm run typecheck` | `tsc --noEmit` (strict) |
| `npm test` | Vitest + React Testing Library |

**Regla de oro:** no cerrar ninguna entrega sin pasar `lint`, `typecheck` y `test` con cero errores y cero warnings.

## Estructura

```
src/
├── app/              # Rutas (/, /nosotros, /servicios, /contacto), layout, not-found, sitemap.ts, robots.ts
├── components/
│   ├── ui/           # Button, Card, Container, Section, Badge, Input, Textarea, Logo, FAQSection, TechStack, FloatingWhatsApp, ScrollToTop
│   ├── animations/   # 'use client' — FadeIn, StaggerChildren/StaggerItem
│   └── layout/       # Header ('use client'), Footer (server)
├── views/            # Hero, Services, ContactForm, AboutHero, ServiceDetails, CallScheduler, ...
├── lib/
│   ├── constants/    # Datos mock por sección (site, navigation, services, methodology, social-proof, contact, about, faq, tech-stack, schema)
│   ├── cn.ts
│   ├── types.ts
│   └── validation.ts
└── styles/           # globals.css con tokens de diseño (@theme)
```

## Contenido editable

Todo el copy, los casos de éxito y los datos de contacto (placeholder) viven en `src/lib/constants/` — editar esos archivos, nunca el código de las vistas.

Para el detalle completo de convenciones y reglas de calidad, ver `AGENTS.md`. Para reutilizar el proyecto como plantilla, ver `PROMPT.md`.
