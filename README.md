# nodus: digital strategy

Web bilingüe (es/en) de la agencia de estrategia digital **nodus: digital strategy**, construida con Next.js 16 (App Router), TypeScript strict, Tailwind CSS v4 y Framer Motion.

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
├── app/
│   ├── [lang]/       # Rutas bilingües: /, /about, /services, /contact y páginas legales
│   ├── robots.ts, sitemap.ts, global-not-found.tsx
├── components/
│   ├── ui/           # Button, Card, Container, Section, Badge, Input, Textarea, Logo, FAQSection,
│   │   │             # TechStack, FloatingWhatsApp, ScrollToTop, BookingCalendar, GlowCursor, ServicesGrid
│   │   ├── brand/    # Logos SVG inline
│   │   └── reactbits/# Efectos GSAP/WebGL
│   ├── animations/   # 'use client' — FadeIn, StaggerChildren, AnimatedHeading, AnimatedCounter, HeroBackground
│   └── layout/       # Header ('use client'), Footer (server)
├── views/            # Hero, Services, ContactForm, AboutHero, ServiceDetails, CallScheduler, LegalPage, ...
├── lib/
│   ├── i18n/         # es.json, en.json, dictionaries.ts
│   ├── constants/    # site.ts, contact.ts, icons.ts, tech-stack.ts
│   ├── schema.ts     # JSON-LD
│   ├── legal.ts      # Rutas y metadata de las páginas legales
│   ├── cn.ts, format.ts, types.ts, validation.ts, emailjs.ts, booking-store.ts, use-mobile.ts
├── proxy.ts          # Redirección a /es o /en según Accept-Language
└── styles/           # globals.css con tokens de diseño (@theme)
```

## Contenido editable

- **Copy bilingüe:** `src/lib/i18n/es.json` y `src/lib/i18n/en.json` (mismas claves en ambos).
- **Contacto y redes:** `src/lib/constants/site.ts`.
- **Formulario:** `src/lib/constants/contact.ts` y `src/lib/validation.ts`.
- **Páginas legales:** los documentos se pegan en `legal.*` de los JSON; mientras estén en preparación se sirven con `noindex`.

Editar esos archivos, nunca el código de las vistas.

Para el detalle completo de convenciones y reglas de calidad, ver `AGENTS.md`. Para reutilizar el proyecto como plantilla, ver `PROMPT.md`.
