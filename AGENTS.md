<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# nodus: digital strategy — Guía para Agentes

Web bilingüe (es/en) de la agencia de estrategia digital **nodus: digital strategy**. Landing page de conversión en Next.js 16 (App Router) + TypeScript strict + Tailwind CSS v4.

## Comandos

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción (validación final) |
| `npm run lint` | ESLint (flat config, eslint-config-next) |
| `npm run typecheck` | `tsc --noEmit` (strict + noUnusedLocals/Parameters) |
| `npm test` | Vitest + React Testing Library (jsdom) |
| `npm run test:watch` | Vitest en modo watch |

**Regla de oro:** ningún PR/entrega queda cerrado sin pasar `npm run lint`, `npm run typecheck` y `npm test` con **cero errores y cero warnings**. Además, `npm run build` debe completar sin errores.

## Stack y versiones

- **Next.js 16.x** (App Router, Turbopack) — leer `node_modules/next/dist/docs/` antes de tocar APIs de Next. Hay cambios breaking respecto a versiones anteriores.
- React 19, TypeScript 5 (strict), Tailwind CSS v4 (CSS-first, sin `tailwind.config.ts`).
- `lucide-react` (iconos), `framer-motion` (solo cliente), `gsap` (efectos reactbits), `ogl` (WebGL), `zustand` (booking store), `@emailjs/browser` (envío del formulario), `clsx` + `tailwind-merge` (utility `cn`).
- **i18n sin librerías**: diccionarios en `src/lib/i18n/{es,en}.json`, lectura con `lang()` de `next/root-params` y redirección por `Accept-Language` en `src/proxy.ts`.
- Vitest + React Testing Library + jest-dom.

## Arquitectura

```
src/
├── app/
│   ├── [lang]/              # Rutas bilingües: /, /about, /services, /contact,
│   │   │                    # /aviso-legal, /politica-de-privacidad, /politica-de-cookies
│   │   ├── fonts/           # Modica + Century Gothic (next/font/local)
│   │   └── layout.tsx       # Metadata global, Header, Footer, WhatsApp, ScrollToTop
│   ├── robots.ts, sitemap.ts, global-not-found.tsx
├── components/
│   ├── ui/                  # Button, Card, Container, Section, Badge, Input, Textarea,
│   │   │                    # Logo, FAQSection, TechStack, FloatingWhatsApp, ScrollToTop,
│   │   │                    # BookingCalendar, GlowCursor, ServicesGrid
│   │   ├── brand/           # IsotipoLogo, HorizontalLogo, LogoFull (SVG inline)
│   │   └── reactbits/       # Efectos GSAP/WebGL (StrokeText, SpecularButton, CursorGrid, GlassSurface…)
│   ├── animations/          # 'use client' — FadeIn, StaggerChildren, AnimatedHeading, AnimatedCounter, HeroBackground
│   └── layout/              # Header ('use client'), Footer (server)
├── views/                   # Secciones complejas (Hero, Services, ContactForm…) — siempre Server Components
├── lib/
│   ├── i18n/                # es.json, en.json, dictionaries.ts (getDictionary, LOCALES, Locale)
│   ├── constants/           # site.ts (contacto/RRSS), contact.ts (formulario), icons.ts, tech-stack.ts
│   ├── schema.ts            # JSON-LD
│   ├── legal.ts             # Rutas + metadata de las páginas legales
│   └── cn.ts, format.ts (format, localePath), types.ts, validation.ts, emailjs.ts, booking-store.ts, use-mobile.ts
├── proxy.ts                 # Redirección a /es o /en
└── styles/globals.css       # Tokens de diseño (@theme)
```

## Reglas de React y Rendimiento

1. **Server Components por defecto.** `'use client'` solo en hojas finales interactivas: `Header`, `ContactForm`, `BookingCalendar`, `GlowCursor` y los wrappers de `animations/`/`reactbits/`.
2. **Las vistas (views/) SIEMPRE son Server Components.** Las animaciones se aplican anidando wrappers cliente (`FadeIn`, `StaggerItem`) — nunca marques una vista entera como `'use client'`.
3. Componentes pequeños, sin lógica compleja en el render. Complejidad cognitiva baja (Sonar).
4. Los enlaces internos se construyen con `localePath(locale, path)`; `SpecularButton` renderiza `next/link` para rutas internas y `<a>` para externas/anclas.

### Core Web Vitals (medido con Lighthouse)

- **El contenido crítico del hero no se oculta en SSR.** `FadeIn` acepta `immediate` para renderizar sin animación de entrada (evita que el LCP dependa de la hidratación); `Hero` lo usa en la columna de texto.
- `AnimatedHeading` reserva la altura de línea en SSR con `md:h-[var(--heading-line-height)]` y `minHeight` en cliente, para que el swap a `StrokeText` (canvas/SVG) no produzca CLS. En móvil el texto se renderiza natural.
- Los efectos WebGL (`CursorGrid`, `SpecularFx`, `GlowCursor`) solo se montan en desktop (`useIsMobile`) y tras idle/visibilidad; `HeroBackground` los difiere.
- `Section` usa `content-visibility: auto` con `contain-intrinsic-size`.

### Imágenes

- La UI no usa imágenes raster: los logos son SVG inline (`components/ui/brand/`) y el hero es CSS/canvas. El único raster es `public/images/og-image.jpg` (1200×630) para Open Graph/Twitter.
- Si se añade una imagen LCP: `next/image` con `width`/`height`, `sizes`, alt descriptivo y `preload` (en Next 16 `priority` está deprecado).

## Tokens de diseño (kit de marca)

Definidos en `src/styles/globals.css` (`@theme`). **No** inventar colores fuera de esta paleta:

| Token | Hex | Uso |
|---|---|---|
| `teal-light` | `#5BC7D0` | Acentos, CTAs, highlights, bordes glassmorphism |
| `dark` | `#000F13` | Fondos oscuros, texto principal, navbar |
| `white` | `#ffffff` | Fondos claros, texto sobre oscuro |

Tipografías: **Modica** (titulares → `font-display`) y **Century Gothic** (cuerpo → `font-sans`), cargadas con `next/font/local` en `src/app/[lang]/layout.tsx`.

Utilities custom: `text-gradient-brand`, `bg-grid-pattern` y `glass-panel*` (definidas con `@utility`).

## Contenido y datos — dónde editarlos

- **Copy bilingüe:** `src/lib/i18n/es.json` y `src/lib/i18n/en.json`. Ambos comparten claves: si añades una, añádela en los dos. Metadata de cada página en `metadata.*` y documentos legales en `legal.*` (estructura `sections: [{ heading, paragraphs }]`).
- **Contacto y redes:** `src/lib/constants/site.ts` (email, teléfono, WhatsApp, RRSS).
- **Formulario:** `src/lib/constants/contact.ts` + `src/lib/validation.ts` (los mensajes viven en el JSON).
- **JSON-LD:** `src/lib/schema.ts`.
- **Analítica:** GA4 en `src/components/analytics/GoogleAnalytics.tsx` (ID en `src/lib/constants/site.ts`), cargado con `next/script` (`afterInteractive`) solo en producción.
- **Páginas legales:** rutas y metadata en `src/lib/legal.ts`; hoy se sirven con `noindex` y con un contenido provisional hasta que se peguen los documentos definitivos.

Para cambiar copias, casos o datos de contacto: **editar los JSON/constants**, nunca el código de las vistas.

## SEO Técnico

- Metadata global en `src/app/[lang]/layout.tsx` (title template, description, openGraph, twitter, manifest, icons) y metadata por página con canonical y `hreflang` (es, en y `x-default`) en cada `page.tsx`.
- JSON-LD inyectado por página: `ProfessionalService` (home), `FAQPage` (FAQSection), `AboutPage`, `ContactPage`, `ItemList` de servicios.
- `src/app/sitemap.ts` (4 rutas × 2 idiomas con alternates) y `src/app/robots.ts`; las páginas legales quedan fuera del sitemap y llevan `noindex`.
- HTML semántico estricto: `<main>` único, **un solo `h1` por página** (incluidas `/services`, 404 y error), `<section>` con `id` para anclas, `aria-label` en navs, skip-link al inicio del `<main>`.
- El matcher de `src/proxy.ts` excluye `_next` y cualquier ruta con extensión (estáticos, `site.webmanifest`, `robots.txt`, `sitemap.xml`).

## Testing

- Tests en `__tests__/*.test.tsx` (Vitest + RTL + jest-dom).
- Imports explícitos desde `vitest` (`describe`, `it`, `expect`, `vi`) — sin globals.
- `next/root-params` se mockea en los tests de server components: `vi.mock('next/root-params', () => ({ lang: () => Promise.resolve('es') }))`.
- El setup (`vitest.setup.ts`) mockea IntersectionObserver/ResizeObserver/matchMedia y el contexto de canvas para framer-motion/GSAP/OGL.
- Tests de componentes críticos: Button, Header, ContactForm, Hero, Footer, Input, Textarea, FAQSection, TechStack, FloatingWhatsApp, ScrollToTop, BookingFlow, LegalPage, PageCtas. Añadir tests al crear UI nueva.

## Política de calidad (Sonar / ESLint)

- **Cero `any`** (explícito o implícito), cero imports/variables sin usar (`noUnusedLocals`/`noUnusedParameters`).
- Accesibilidad: contraste mínimo 4.5:1 en texto normal y 3:1 en texto grande — no usar `text-dark/40` o `/50` para texto pequeño sobre fondos claros; labels asociados; `aria-invalid`/`aria-describedby` en errores de formulario; `aria-hidden` en iconos decorativos; foco visible (`focus-visible`).
- Botones con `type` explícito; anchors con `href` real; iconos importados como `Icon` y renderizados con `aria-hidden`.
- Evitar `dangerouslySetInnerHTML` salvo el JSON-LD (patrón estándar).
- No añadir comentarios de código salvo que aporten información no deducible del propio código.
