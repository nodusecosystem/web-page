<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# nodus: digital strategy — Guía para Agentes

Web de la agencia de estrategia digital **nodus: digital strategy**. Landing page de conversión en Next.js 16 (App Router) + TypeScript strict + Tailwind CSS v4.

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

- **Next.js 16.x** (App Router) — leer `node_modules/next/dist/docs/` antes de tocar APIs de Next. Hay cambios breaking respecto a versiones anteriores.
- React 19, TypeScript 5 (strict), Tailwind CSS v4 (CSS-first, sin `tailwind.config.ts`).
- `lucide-react` (iconos), `framer-motion` (solo en componentes cliente), `clsx` + `tailwind-merge` (utility `cn`).
- Vitest + React Testing Library + jest-dom.

## Arquitectura

```
src/
├── app/              # Rutas (/, /nosotros, /servicios, /contacto), layout, sitemap.ts, robots.ts, not-found.tsx
├── components/       # UI kit y componentes reutilizables
│   ├── ui/           # Button, Card, Container, Section, Badge, Input, Textarea, Logo, FAQSection, TechStack, FloatingWhatsApp, ScrollToTop
│   ├── animations/   # 'use client' — FadeIn, StaggerChildren/StaggerItem
│   └── layout/       # Header ('use client'), Footer (server)
├── views/            # Secciones complejas (Hero, Services, ContactForm, ...) — siempre Server Components
├── lib/              # cn, types, validation y constants (datos mock por sección)
└── styles/           # globals.css con los tokens de diseño (@theme)
```

## Reglas de React y Rendimiento

1. **Server Components por defecto.** `'use client'` solo en hojas finales interactivas: `Header` (menú móvil), `ContactForm` (formulario) y los wrappers de `animations/`.
2. **Las vistas (views/) SIEMPRE son Server Components.** Las animaciones se aplican anidando wrappers cliente (`FadeIn`, `StaggerItem`) — nunca marques una vista entera como `'use client'`.
3. Componentes pequeños, sin lógica compleja en el render. Complejidad cognitiva baja (Sonar).
4. `next/image` con `width`/`height` (o `fill`), alt descriptivo y `sizes` explícito.

### Imágenes y LCP (Next 16)

- **`priority` está DEPRECADO en Next 16** → usar la prop `preload` de `next/image` para la imagen LCP (hero). Solo aplica a imágenes raster; los logos ya son SVG inline.
- **Los logos son SVG inline** (`src/components/ui/brand/`: `IsotipoLogo`, `HorizontalLogo` + wrapper `Logo`). No usar `next/image` para logos — sin requests, crisp en cualquier resolución.
- No usar `unoptimized` salvo que se introduzca un SVG inline o una imagen remota que Next no deba optimizar.
- Formatos modernos: Next 16 sirve WebP/AVIF automáticamente.

## Tokens de diseño (kit de marca)

Definidos en `src/styles/globals.css` (`@theme`). **No** inventar colores fuera de esta paleta:

| Token | Hex | Uso |
|---|---|---|
| `teal-light` | `#5BC7D0` | Acentos, CTAs, highlights, bordes glassmorphism |
| `dark` | `#000F13` | Fondos oscuros, texto principal, navbar |
| `white` | `#ffffff` | Fondos claros, texto sobre oscuro |

Tipografías: **Montserrat** (titulares → `font-display`) e **Inter** (cuerpo → `font-sans`), cargadas con `next/font` en `src/app/layout.tsx`.

Utilities custom: `text-gradient-brand`, `bg-grid-pattern` y `glass-panel*` (definidas con `@utility`).

## Datos mock — dónde editarlos

Todo el contenido editable vive en `src/lib/constants/`, un archivo por sección:

| Archivo | Contenido |
|---|---|
| `site.ts` | Nombre, URL (placeholder), email, teléfono, RRSS, WhatsApp (TODO: reemplazar placeholders) |
| `navigation.ts` | Links del header/footer |
| `services.ts` | Los 4 servicios con iconos, features y deliverables |
| `methodology.ts` | Pasos del proceso mensual |
| `social-proof.ts` | Stats, casos de éxito y clientes (mock) |
| `about.ts` | Historia, misión, visión, valores y filosofía |
| `faq.ts` | Preguntas frecuentes + JSON-LD FAQPage |
| `tech-stack.ts` | Tecnologías del marquee |
| `contact.ts` | Configuración del formulario (longitudes, regex, presupuestos, horarios) |
| `schema.ts` | JSON-LD (ProfessionalService, FAQPage, páginas internas) |

Para cambiar copias, casos o datos de contacto: **editar solo estos archivos**, nunca el código de las vistas.

## SEO Técnico

- Metadata API en `src/app/layout.tsx` (title template, description, openGraph, twitter, canonical) y metadata propia por página (`/nosotros`, `/servicios`, `/contacto`).
- JSON-LD inyectado por página: `ProfessionalService` (home), `FAQPage` (FAQSection), `AboutPage`, `ContactPage`, `ItemList` de servicios.
- `src/app/sitemap.ts` (4 rutas) y `src/app/robots.ts` presentes.
- HTML semántico estricto: `<main>` único, jerarquía h1 → h2 → h3, `<section>` con `id` para anclas, `aria-label` en navs, skip-link al inicio del `<main>`.
- Los cambios de copy/URL deben mantener un único `h1` (Hero) por página.

## Testing

- Tests en `__tests__/*.test.tsx` (Vitest + RTL + jest-dom).
- Imports explícitos desde `vitest` (`describe`, `it`, `expect`, `vi`) — sin globals.
- El setup (`vitest.setup.ts`) mockea IntersectionObserver/ResizeObserver/matchMedia para framer-motion.
- Tests de componentes críticos: Button, Header, ContactForm, Hero, Footer, Input, Textarea, FAQSection, TechStack, FloatingWhatsApp, ScrollToTop. Añadir tests al crear UI nueva.

## Política de calidad (Sonar / ESLint)

- **Cero `any`** (explícito o implícito), cero imports/variables sin usar (`noUnusedLocals`/`noUnusedParameters`).
- Accesibilidad: labels asociados, `aria-invalid`/`aria-describedby` en errores de formulario, `aria-hidden` en iconos decorativos, foco visible (`focus-visible`).
- Botones con `type` explícito; anchors con `href` real; iconos importados como `Icon` y renderizados con `aria-hidden`.
- Evitar `dangerouslySetInnerHTML` salvo el JSON-LD (patrón estándar).
- No añadir comentarios de código salvo que aporten información no deducible del propio código.
